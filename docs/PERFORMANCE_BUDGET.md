# Performance Budget

## CWV Targets
- LCP <= 2.5s (mobile p75)
- INP <= 200ms
- CLS <= 0.1

## Asset Budgets
- Home JS shipped: < 70KB gzipped target
- CSS: < 100KB gzipped target
- Hero image: < 120KB next-gen format when production assets are added
- Service card images: width/height-set, `loading=\"lazy\"`, `decoding=\"async\"`
- Non-critical media: lazy loaded
- OG image: static SVG currently; if replaced with raster, target < 200KB

## Font Budget
- Max two webfont families currently used.
- Future optimization: self-host subsetted WOFF2.

## Second-Pass Performance Notes
- No new JS frameworks or client islands were introduced.
- Added only HTML-level image optimizations and metadata improvements.
- Form UX changes were attribute-level and do not add runtime payload.

## Pre-Launch Checklist
- Run `npm run build`
- Run `npm run qa:links`
- Run `npm run qa:lighthouse`
- Validate no unexpected third-party script blocking render
- Replace placeholder service images with production-compressed assets (AVIF/WebP + responsive sources if available).
