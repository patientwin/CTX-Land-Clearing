# Design Tokens Reference

## Usage Rules
- Use tokens from `src/styles/tokens.css` through shared primitives in `src/styles/global.css`.
- Avoid introducing hardcoded one-off colors/shadows/radii when an existing token can be used.
- Prefer component classes (`btn-*`, `card-*`, `form-shell`, `field-label`, `cta-band`, `pill`) over repeated utility stacks.

## Color Tokens
- `--color-ink-950`, `--color-ink-900`, `--color-ink-800`, `--color-ink-600`
- `--color-surface-0`, `--color-surface-50`, `--color-surface-100`
- `--color-border-soft`, `--color-border-strong`
- `--color-accent-600`, `--color-accent-700`, `--color-accent-300`
- Compatibility aliases:
- `--color-brand-red`, `--color-brand-dark`, `--color-brand-warm`, `--color-brand-accent`
- `--color-text`, `--color-muted`

## Typography Tokens
- Fonts:
- `--font-display`
- `--font-body`
- Scale:
- `--text-display`
- `--text-h1`
- `--text-h2`
- `--text-h3`
- `--text-body`
- `--text-small`

## Spacing Tokens
- `--space-2`, `--space-3`, `--space-4`, `--space-5`, `--space-6`, `--space-8`, `--space-10`, `--space-12`
- `--space-section`

## Radius Tokens
- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--radius-pill`

## Shadow Tokens
- `--shadow-soft`
- `--shadow-card`
- `--shadow-cta`

## Layout Tokens
- `--container-max`
- `--container-reading`

## Tailwind v4 Theme Bridge
Mapped in `@theme` inside `src/styles/global.css`:
- `--color-brand-red`
- `--color-brand-dark`
- `--color-brand-warm`
- `--color-brand-accent`
- `--font-display`
- `--font-body`

## Primitive Class Reference
- Buttons: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`
- Links: `.link-cta`
- Sections: `.section-standard`, `.section-divider`, `.section-callout`
- Cards: `.card`, `.card-service`, `.card-feature`, `.card-faq`
- Forms: `.form-shell`, `.field-label`, `.form-control`, `.field-error`
- Trust cues: `.pill`, `.pill-warm`
- CTA bands: `.cta-band`
- Layout wrappers: `.container-standard`, `.site-header`, `.site-footer`, `.sticky-call`
