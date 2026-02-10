# Image Optimization Report

| Component/Section | Asset(s) | Strategy | Loading | Sizes/Format Notes |
| --- | --- | --- | --- | --- |
| Hero visual | hero-bg.jpeg | `Picture` | `eager`, `fetchpriority=high` | AVIF/WEBP generation, widths 480/720/960, sizes `(min-width:768px) 34vw, 100vw` |
| Who Is CTX | who-is-ctx.png | `Picture` | `lazy`, `decoding=async` | AVIF/WEBP, widths 640/960/1280, responsive sizes |
| Services grid cards | 6 service thumbnails | `Picture` in `ServiceCard` | `lazy`, `decoding=async` | AVIF/WEBP, widths 480/720/960, card-appropriate sizes |
| Capability row 1 | construction-site-prep.jpeg | `Picture` | `lazy`, `decoding=async` | AVIF/WEBP, widths 640/960/1280 |
| Capability row 2 | tree-clearing-thumbnail.jpeg | `Picture` | `lazy`, `decoding=async` | AVIF/WEBP, widths 640/960/1280 |
| Benefits cards 1-2 | benefits images | `Picture` | `lazy`, `decoding=async` | AVIF/WEBP, widths 480/720 |
| Existing footer-detail map visual | og-default.svg | `img` (existing) | `lazy`, `decoding=async` | SVG kept as-is; explicit dimensions preserved |

Build safety notes:
- Local raster images route through Astro image pipeline where applied.
- Explicit dimensions/class-constrained heights retained to reduce CLS risk.
- Unsupported fallback behavior remains available via existing `img` branch in `ServiceCard` for non-raster or string-path assets.
