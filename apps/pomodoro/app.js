(() => {
  const STORAGE_KEY = 'pomodoro-cycles-v1';
  const DISPLAY = document.getElementById('time');
  const MODE = document.getElementById('mode');
  const CYCLES = document.getElementById('cycles');
  const btnStart = document.getElementById('start');
  const btnPause = document.getElementById('pause');
  const btnReset = document.getElementById('reset');

  let timer = null;
  let mode = 'focus'; // 'focus' | 'break'
  let remaining = 25 * 60; // seconds
  let cycles = 0;

  try { cycles = Number(localStorage.getItem(STORAGE_KEY) || '0') || 0; } catch {}
  CYCLES.textContent = String(cycles);

  function fmt(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateDisplay() {
    DISPLAY.textContent = fmt(remaining);
    MODE.textContent = mode === 'focus' ? 'Foco' : 'Pausa';
  }

  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine'; o.frequency.value = 880; g.gain.value = 0.1;
      o.start(); setTimeout(() => { o.stop(); ctx.close(); }, 450);
    } catch {}
  }

  function step() {
    if (remaining > 0) {
      remaining -= 1;
      updateDisplay();
      return;
    }
    // switch mode
    beep();
    if (mode === 'focus') {
      mode = 'break';
      remaining = 5 * 60;
      cycles += 1; CYCLES.textContent = String(cycles);
      try { localStorage.setItem(STORAGE_KEY, String(cycles)); } catch {}
    } else {
      mode = 'focus';
      remaining = 25 * 60;
    }
    updateDisplay();
  }

  function start() { if (!timer) { timer = setInterval(step, 1000); } }
  function pause() { if (timer) { clearInterval(timer); timer = null; } }
  function reset() {
    pause();
    mode = 'focus'; remaining = 25 * 60; updateDisplay();
  }

  btnStart.addEventListener('click', start);
  btnPause.addEventListener('click', pause);
  btnReset.addEventListener('click', reset);

  updateDisplay();
})();

