# Accessibility QA

## WCAG AA Checklist
- Semantic landmarks (`header`, `main`, `footer`) used.
- One H1 per page.
- Sufficient text contrast on CTA and body content.

## Keyboard and Focus Checks
- Skip link present.
- All interactive controls reachable by keyboard.
- Visible focus ring via `:focus-visible`.

## Form A11y Checks
- Explicit labels for inputs.
- Error messages tied by field name and rendered with `aria-live`.
- Required fields indicated in label text.

## Color and Contrast Checks
- Brand red CTA with white text targets AA contrast.
- Body text on white/warm background set to dark neutral.
