# CTX Land Clearing Migration Build

Static-first Astro + Tailwind v4 rebuild for SEO-safe migration of `https://ctxlandclearing.com`.

## Quickstart

1. Install dependencies:
```bash
npm install
```
2. Run local dev:
```bash
npm run dev
```
3. Build for production:
```bash
npm run build
npm run preview
```

## QA Commands

```bash
npm run lint
npm run typecheck
npm run test:smoke
npm run qa:links
npm run qa:lighthouse
npm run parity:report
```

## Crawl + Parity Baseline

```bash
npm run crawl:old
```

Artifacts:
- `audit/url-inventory.json`
- `audit/raw-html/`
- `docs/URL_INVENTORY.md`
- `docs/CONTENT_INVENTORY.md`
- `docs/META_PARITY_REPORT.md`

## Deploy

- Netlify primary: build command `npm run build`, publish dir `dist`
- Cloudflare Pages fallback: build command `npm run build`, output dir `dist`

See `docs/DEPLOYMENT_RUNBOOK.md` for full release steps.
