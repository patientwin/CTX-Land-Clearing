# Parity Diff Report

Baseline: `audit/url-inventory.json`

Current parity status is based on preserved headings, matching service-page intent, and retained core messaging from crawl snapshots.

## Estimated Page-Level Parity

| URL | Heading Parity | Core Copy Parity | Notes |
| --- | --- | --- | --- |
| `/` | High | High | Primary H1 and topsoil message retained. |
| `/about/` vs `/about-us/` | High | High | About statement retained with minor readability cleanup. |
| `/contact/` vs `/contact-us/` | High | Medium-High | Contact intent retained; form improved. |
| `/services/land-clearing-austin-tx/` vs `/lot-clearing-central-texas/` | High | High | Core lot clearing copy preserved and localized. |
| `/services/forestry-mulching-austin-tx/` vs `/forestry-mulching-central-texas/` | High | High | Core mulching copy preserved. |
| `/land-grading-central-texas/` | High | High | Legacy slug and service intent retained. |

## Estimated Overall Parity Score
- **90/100**

## Gaps
- Exact full-text extraction from all old pages was partially constrained by crawl environment.
- Score should be revalidated by running `npm run crawl:old` and `npm run parity:report` in a network-enabled environment.

## Homepage Restoration Delta (Copy-Parity Mode)
- Section-type parity: restored to include all requested original homepage section categories in legacy-like order.
- Service coverage parity: homepage expanded from 3 cards to 6 cards aligned to original service-intent breadth.
- Copy adaptations logged due crawl limitations:
- Kept known original high-signal lines where available.
- Condensed long multi-paragraph service blurbs into card copy for UX scannability.

Estimated homepage parity score after restoration: **95/100** (section order + intent coverage substantially improved).
