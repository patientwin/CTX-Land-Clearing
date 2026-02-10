# Tech Stack Decision

## Why Astro + Tailwind v4
- Astro static output minimizes JS by default and supports content-first SEO pages.
- Tailwind v4 enables tokenized styling with low CSS overhead and fast iteration.
- TypeScript strict mode reduces migration regressions in route and form logic.

## Why Netlify First
- Native static form handling supports no-backend lead capture.
- Predictable static hosting and deploy previews for migration validation.
- Easy redirect management for SEO migration maps.

## Cloudflare Fallback Plan
- Cloudflare Pages can host `dist` static output.
- Added Pages Function example (`functions/api/lead.js`) for webhook-style ingest.
- Deploy config documented in `wrangler.toml` and runbook.

## Tradeoffs and Risks
- Google Fonts are still external; self-hosting can further improve consistency.
- Maintaining both legacy and new URL structures requires clear canonical/redirect policy.
- Form reliability depends on deploy-time Netlify detection; blueprint forms included to reduce risk.
