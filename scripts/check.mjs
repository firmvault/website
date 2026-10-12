import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve('dist');
async function list(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? list(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const htmlFiles = (await list(root)).filter(file => file.endsWith('.html'));
let references = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  assert.match(html, /<html lang="en">/, `${file}: language missing`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: expected one page heading`);
  assert.match(html, /name="viewport"/, `${file}: responsive viewport missing`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${file}: duplicate ID`);
  for (const [, link] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(link)) continue;
    const [pathname, fragment] = link.split('#');
    const local = pathname ? path.resolve(root, pathname.replace(/^\//, '')) : file;
    const target = pathname.endsWith('/') ? path.join(local, 'index.html') : local;
    await access(target);
    if (fragment && target.endsWith('.html')) {
      const targetHtml = target === file ? html : await readFile(target, 'utf8');
      assert(targetHtml.includes(`id="${fragment}"`), `${file}: missing anchor ${link}`);
    }
    references++;
  }
}

// Exercise actual theme code with system changes, saved preferences, and denied storage.
const themeCode = await readFile('dist/theme.js', 'utf8');
function themeEnvironment(saved, dark, storageUnavailable = false) {
  let systemChange;
  let ready;
  const buttons = ['system', 'light', 'dark'].map(value => ({ dataset: { themeValue: value }, setAttribute() {}, addEventListener() {} }));
  const context = {
    document: {
      documentElement: { dataset: {} },
      querySelector: () => ({ setAttribute() {} }),
      querySelectorAll: selector => selector === '[data-theme-value]' ? buttons : [],
      addEventListener: (name, callback) => { if (name === 'DOMContentLoaded') ready = callback; }
    },
    localStorage: { getItem: () => { if (storageUnavailable) throw Error('Storage blocked'); return saved; } },
    matchMedia: () => media
  };
  const media = { matches: dark, addEventListener: (event, callback) => { systemChange = callback; } };
  vm.runInNewContext(themeCode, context);
  return { dataset: context.document.documentElement.dataset, change: value => { media.matches = value; systemChange(); }, ready: () => ready() };
}
const system = themeEnvironment(null, false);
assert.equal(system.dataset.themePreference, 'system');
assert.equal(system.dataset.theme, 'light');
system.change(true);
assert.equal(system.dataset.theme, 'dark');
system.change(false);
assert.equal(system.dataset.theme, 'light');
for (const preference of ['light', 'dark']) {
  const explicit = themeEnvironment(preference, preference === 'light');
  assert.equal(explicit.dataset.theme, preference);
  explicit.change(preference !== 'light');
  assert.equal(explicit.dataset.theme, preference);
  explicit.ready();
}
assert.equal(themeEnvironment('invalid', true).dataset.themePreference, 'system');
assert.equal(themeEnvironment(null, true, true).dataset.theme, 'dark');

function luminance(hex) {
  const channels = hex.match(/\w\w/g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
function contrast(a, b) { const values = [luminance(a), luminance(b)].sort((a, b) => b - a); return (values[0] + .05) / (values[1] + .05); }
const pairs = [['141414', 'f7f5ef', 4.5], ['62625f', 'f7f5ef', 4.5], ['2448e5', 'ffffff', 4.5], ['f4f2ec', '101114', 4.5], ['a4a6af', '191b20', 4.5], ['3554ef', 'ffffff', 4.5], ['8a8a82', 'f7f5ef', 3], ['757984', '101114', 3]];
for (const [foreground, background, minimum] of pairs) assert(contrast(foreground, background) >= minimum, `Contrast failed: ${foreground} on ${background}`);
const booking = await readFile('dist/book-demo/index.html', 'utf8');
assert.match(booking, /contact@nexosk\.in/);
assert.match(booking, /This opens your email app/);
console.log(`PASS: ${htmlFiles.length} pages, ${references} local references, system and saved theme behavior, blocked storage fallback, ${pairs.length} contrast pairs, and demo disclosure.`);
