# Deployment Runbook

## Netlify (Primary)
1. Connect repo in Netlify.
2. Set build command: `npm run build`.
3. Set publish directory: `dist`.
4. Deploy and confirm build success.
5. Verify logs show Netlify form detection for `quick-estimate` and `full-estimate`.
6. Submit both forms on deployed URL and confirm submissions in Netlify Forms dashboard.
7. Validate redirects from `public/_redirects` are active.

## Environment Variables
- `PUBLIC_FORM_ENDPOINT` (optional; only if using webhook endpoint instead of native Netlify forms)
- `LIGHTHOUSE_URL` (optional for CI Lighthouse command)

## Cloudflare Pages (Fallback)
1. Create Pages project and connect repo.
2. Build command: `npm run build`.
3. Build output directory: `dist`.
4. Confirm `wrangler.toml` compatibility date is current.
5. If webhook handling needed, deploy Pages Function from `functions/api/lead.js`.
6. Re-test forms using Cloudflare-compatible strategy (static form post or custom endpoint).

## Rollback Instructions
1. Keep previous production deploy pinned.
2. If severe SEO or conversion regression appears, restore last known-good deployment immediately.
3. Reapply DNS alias to previous deployment if required.
4. Keep redirect map intact during rollback unless it causes routing failure.
