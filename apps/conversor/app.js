(() => {
  // Tabs
  const tabBtns = document.querySelectorAll('.tabs button');
  const panels = {
    moeda: document.getElementById('tab-moeda'),
    temp: document.getElementById('tab-temp'),
    medida: document.getElementById('tab-medida')
  };
  tabBtns.forEach(btn => btn.addEventListener('click', () => {
    tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    Object.values(panels).forEach(p => p.hidden = true);
    panels[btn.dataset.tab].hidden = false;
  }));

  // Moeda: taxa fixa exemplo (1 USD = 5.00 BRL)
  const RATE = 5.0;
  const brl = document.getElementById('brl');
  const usd = document.getElementById('usd');
  function setVal(el, v) { el.value = Number.isFinite(v) ? Number(v.toFixed(2)) : ''; }
  brl?.addEventListener('input', () => {
    const n = Number(brl.value);
    setVal(usd, !Number.isNaN(n) ? n / RATE : NaN);
  });
  usd?.addEventListener('input', () => {
    const n = Number(usd.value);
    setVal(brl, !Number.isNaN(n) ? n * RATE : NaN);
  });

  // Temperatura
  const c = document.getElementById('celsius');
  const f = document.getElementById('fahrenheit');
  c?.addEventListener('input', () => {
    const n = Number(c.value);
    setVal(f, !Number.isNaN(n) ? (n * 9/5) + 32 : NaN);
  });
  f?.addEventListener('input', () => {
    const n = Number(f.value);
    setVal(c, !Number.isNaN(n) ? (n - 32) * 5/9 : NaN);
  });

  // Medidas
  const m = document.getElementById('m');
  const km = document.getElementById('km');
  m?.addEventListener('input', () => {
    const n = Number(m.value);
    setVal(km, !Number.isNaN(n) ? n / 1000 : NaN);
  });
  km?.addEventListener('input', () => {
    const n = Number(km.value);
    setVal(m, !Number.isNaN(n) ? n * 1000 : NaN);
  });
})();

