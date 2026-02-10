function setHidden(form: HTMLFormElement, name: string, value: string) {
  const input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
  if (input) input.value = value;
}

function labelText(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  return field.labels?.[0]?.textContent?.replace('*', '').trim().toLowerCase() || 'this field';
}

function validate(form: HTMLFormElement) {
  let valid = true;
  form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((errorEl) => {
    errorEl.textContent = '';
  });

  form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('[required]').forEach((field) => {
    const msg = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
    if (!field.value.trim()) {
      valid = false;
      field.setAttribute('aria-invalid', 'true');
      if (msg) msg.textContent = `Please enter ${labelText(field)}.`;
      return;
    }
    if (field instanceof HTMLInputElement && field.type === 'email') {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      if (!ok) {
        valid = false;
        field.setAttribute('aria-invalid', 'true');
        if (msg) msg.textContent = 'Please use a valid email address.';
        return;
      }
    }
    field.removeAttribute('aria-invalid');
  });

  return valid;
}

export function initForms() {
  const params = new URLSearchParams(window.location.search);
  document.querySelectorAll<HTMLFormElement>('form[data-estimate-form="true"]').forEach((form) => {
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      setHidden(form, key, params.get(key) || '');
    });
    setHidden(form, 'landing_path', window.location.pathname);

    form.addEventListener('submit', (event) => {
      const honey = form.querySelector<HTMLInputElement>('input[name="bot_field"]');
      if (honey?.value) {
        event.preventDefault();
        return;
      }
      if (!validate(form)) {
        event.preventDefault();
        return;
      }
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        event.preventDefault();
        window.location.assign('/thank-you/');
      }
    });
  });
}
