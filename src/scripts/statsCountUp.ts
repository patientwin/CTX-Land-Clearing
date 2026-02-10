function parseCountValue(raw: string) {
  const value = raw.trim();
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return null;
  return {
    prefix: match[1] || '',
    target: Number(match[2] || 0),
    suffix: match[3] || ''
  };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function animate(el: HTMLElement, target: number, prefix: string, suffix: string, duration = 1100) {
  const start = performance.now();

  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = easeOutCubic(t);
    const current = Math.round(target * eased);
    el.textContent = `${prefix}${current}${suffix}`;
    if (t < 1) requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

export function initStatsCountUp() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-countup-value]'));
  if (nodes.length === 0) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const seen = new WeakSet<HTMLElement>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        if (seen.has(el)) return;

        const parsed = parseCountValue(el.dataset.countupValue || el.textContent || '');
        if (!parsed) return;

        seen.add(el);
        animate(el, parsed.target, parsed.prefix, parsed.suffix);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  nodes.forEach((el) => observer.observe(el));
}
