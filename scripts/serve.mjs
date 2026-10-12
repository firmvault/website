import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff': 'font/woff', '.txt': 'text/plain', '.xml': 'application/xml' };
const port = Number(process.env.PORT || 4173);
const server = http.createServer(async (request, response) => {
  try {
    const relative = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(/^\/+/, '');
    let target = path.resolve(root, relative);
    if (target !== root && !target.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
    try { if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html'); }
    catch { if (!path.extname(target)) target += '.html'; }
    const content = await readFile(target);
    response.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(content);
  } catch {
    const content = await readFile(path.join(root, '404.html')).catch(() => 'Not found');
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(content);
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
