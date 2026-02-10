# Stats Rollover Spec

## Component
- `src/components/StatsRollover.astro`
- Data source: `src/data/stats.ts`

## Data Items
- `200+ / Projects Done`
- `89+ / Satisfied Clients`
- `10+ / Years of Experience`

## Visual States

### Default
- Red circular card
- White value text
- Uppercase supporting label
- Soft static shadow

### Hover / Focus-visible
- Lift: `translateY(-5px)`
- Scale: `scale(1.045)`
- Shadow bloom increase
- Border/ring accent shift toward warm accent
- Value micro-lift and label emphasis via letter-spacing/position transition

### Active (Touch/Tap)
- Reduced lift and scale for tactile response (`translateY(-1px) scale(1.02)`).

## Timing and Easing
- Easing token: `--ease-premium: cubic-bezier(0.22, 0.61, 0.36, 1)`
- Duration tokens:
- `--dur-fast: 220ms`
- `--dur-med: 300ms`

## Accessibility Behavior
- Each stat circle is keyboard-focusable (`tabindex="0"`).
- Focus-visible triggers the same visual effect as hover.
- `aria-label` provides combined value + label context.

## Reduced Motion
- Under `prefers-reduced-motion: reduce`, transitions/transforms are effectively disabled.
- Visual feedback falls back to minimal non-motion style change.

## Performance Notes
- CSS-only transitions (no JS animation library).
- No layout shift: circle dimensions are fixed and transform-only animations are used.
