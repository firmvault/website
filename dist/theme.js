(() => {
  let preference = 'system';
  try {
    const saved = localStorage.getItem('firmvault-theme');
    if (['system', 'light', 'dark'].includes(saved)) preference = saved;
  } catch {}
  const system = matchMedia('(prefers-color-scheme: dark)');
  function apply(value) {
    preference = value;
    const resolved = value === 'system' ? (system.matches ? 'dark' : 'light') : value;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePreference = value;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolved === 'dark' ? '#101114' : '#f7f5ef');
    document.querySelectorAll('[data-theme-value]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.themeValue === value));
    });
    document.querySelectorAll('[data-theme-label]').forEach(label => label.textContent = value[0].toUpperCase() + value.slice(1));
  }
  apply(preference);
  system.addEventListener('change', () => { if (preference === 'system') apply('system'); });
  document.addEventListener('DOMContentLoaded', () => {
    apply(preference);
    document.querySelectorAll('[data-theme-value]').forEach(button => button.addEventListener('click', () => {
      try { localStorage.setItem('firmvault-theme', button.dataset.themeValue); } catch {}
      apply(button.dataset.themeValue);
      button.closest('.theme-picker').removeAttribute('open');
      button.closest('.theme-picker').querySelector('summary').focus();
    }));
    document.addEventListener('click', event => {
      document.querySelectorAll('.theme-picker[open]').forEach(picker => { if (!picker.contains(event.target)) picker.removeAttribute('open'); });
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      document.querySelectorAll('.theme-picker[open]').forEach(picker => { picker.removeAttribute('open'); picker.querySelector('summary').focus(); });
    });
  });
})();
