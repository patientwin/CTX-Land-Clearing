function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function initWhoCtxMotion() {
  const section = document.querySelector<HTMLElement>('[data-who-ctx-section]');
  const machine = document.querySelector<HTMLElement>('[data-who-machine]');
  if (!section || !machine) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    machine.style.setProperty('--who-progress', '1');
    return;
  }

  let ticking = false;

  const update = () => {
    const rect = section.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;

    // Progress starts before the section fully enters and completes around mid-viewport.
    const start = viewport * 0.98;
    const end = viewport * 0.2;
    const progress = clamp((start - rect.top) / (start - end), 0, 1);

    machine.style.setProperty('--who-progress', progress.toFixed(3));
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}
