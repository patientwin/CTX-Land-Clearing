# Hero Redesign Notes

## What Changed
- Reworked the homepage hero into a true layered background treatment using the existing hero image.
- Introduced the requested structure:
- `hero-shell`
- `hero-media`
- `hero-overlay`
- `hero-content`
- `hero-form-card`
- Kept the same copy intent, CTA intent, and form logic.

## Visual Rationale
- The hero now reads as a premium editorial block with cinematic image depth rather than a simple split layout.
- Multi-layer overlays improve text contrast while retaining image presence.
- The form is presented as a floating elevated card to reinforce conversion priority.
- Spacing and heading scale use `clamp()` for consistent rhythm across viewport sizes.

## Responsive Behavior
- Desktop/tablet:
- Two-column composition with text left and floating form card right.
- Background image remains full-width with tuned focal point.
- Mobile:
- Stacked content followed by form card.
- Overlay shifts to vertical gradient to keep legibility without crowding.
- Above-the-fold CTA visibility is maintained.

## Performance Considerations
- Hero media uses Astro `Picture` optimization with AVIF/WEBP outputs.
- Hero image uses `loading="eager"` and `fetchpriority="high"` only for this primary visual.
- Below-the-fold image behavior remains lazy/async.
- Explicit visual container sizing and stable composition reduce CLS risk.
