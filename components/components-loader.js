(() => {
  // Resolve base path for components using data-root on the script tag
  const currentScript = document.currentScript || document.querySelector('script[data-root]');
  const base = (currentScript && currentScript.dataset.root) || '.';

  // Theme bootstrap: read from localStorage or prefers-color-scheme
  const storageKey = 'theme';
  const rootEl = document.documentElement;
  const saved = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = saved || (prefersDark ? 'dark' : 'light');
  rootEl.setAttribute('data-theme', initialTheme);

  function setTheme(next) {
    rootEl.setAttribute('data-theme', next);
    try { localStorage.setItem(storageKey, next); } catch (_) {}
  }

  async function inject(id, url) {
    const host = document.getElementById(id);
    if (!host) return;
    try {
      const res = await fetch(url, { cache: 'no-store' });
      const html = await res.text();
      host.innerHTML = html;
    } catch (err) {
      // Silent fail to keep pages usable without server
    }
  }

  function markActiveNav() {
    const here = location.pathname.replace(/\/index\.html$/, '/');
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    nav.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const hrefNorm = href.replace(/\/index\.html$/, '/');
      if (here === hrefNorm || (here.endsWith('/') && here === new URL(href, location.origin).pathname.replace(/\/index\.html$/, '/'))) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  function wireHeaderInteractions() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('site-nav');
    const themeBtn = document.getElementById('theme-toggle');

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('open');
      });
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = rootEl.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        setTheme(next);
      });
    }

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // Inject header and footer, then wire events
  (async () => {
    await inject('app-header', `${base}/components/header.html`);
    await inject('app-footer', `${base}/components/footer.html`);
    markActiveNav();
    wireHeaderInteractions();
  })();
})();

