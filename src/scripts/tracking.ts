declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const fired = new Set<string>();

function utm() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source') || '',
    utm_medium: p.get('utm_medium') || '',
    utm_campaign: p.get('utm_campaign') || '',
    utm_term: p.get('utm_term') || '',
    utm_content: p.get('utm_content') || ''
  };
}

export function trackEvent(event: string, payload: Record<string, unknown> = {}) {
  const body = {
    event,
    path: window.location.pathname,
    referrer: document.referrer || '',
    timestamp: new Date().toISOString(),
    ...utm(),
    ...payload
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(body);
  window.dispatchEvent(new CustomEvent('ctx-track', { detail: body }));
}

function setupScroll() {
  window.addEventListener(
    'scroll',
    () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.round((window.scrollY / total) * 100);
      [50, 90].forEach((n) => {
        const key = `scroll_${n}`;
        if (pct >= n && !fired.has(key)) {
          fired.add(key);
          trackEvent(key);
        }
      });
    },
    { passive: true }
  );
}

export function initTracking() {
  document.querySelectorAll<HTMLElement>('[data-track="call_click"]').forEach((el) => {
    el.addEventListener('click', () => trackEvent('call_click'));
  });

  document.querySelectorAll<HTMLElement>('[data-track="service_cta_click"]').forEach((el) => {
    el.addEventListener('click', () => trackEvent('service_cta_click', { label: el.dataset.label || '' }));
  });

  document.querySelectorAll<HTMLFormElement>('form[data-track-form="true"]').forEach((form) => {
    let started = false;
    form.addEventListener('focusin', () => {
      if (!started) {
        started = true;
        trackEvent('form_start', { form: form.name });
      }
    });

    form.addEventListener('submit', () => {
      trackEvent('form_submit_success', { form: form.name });
    });
  });

  setupScroll();
}
