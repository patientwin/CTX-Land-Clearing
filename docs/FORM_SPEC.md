# Form Specification

## Forms
- `quick-estimate` (hero, 5 fields)
- `full-estimate` (contact/lower funnel, 7 fields)

## Field Definitions
Quick:
- `name` (required)
- `phone` (required)
- `email` (required, email format)
- `service` (required select)
- `message` (optional)

Full:
- `name` (required)
- `phone` (required)
- `email` (required, email format)
- `project_address` (required)
- `service` (required)
- `acreage` (optional)
- `message` (required)

Hidden:
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `landing_path`
- `bot_field` honeypot

## Validation Rules
- Required fields checked client-side with friendly inline errors.
- Email format validation via regex.
- Honeypot non-empty value blocks submission.

## Submission Flow
- Static Netlify form submit with `action="/thank-you/"`.
- Local dev fallback redirects to `/thank-you/` for smoke tests.

## Spam Protection
- Honeypot (`bot_field`) on both forms.
- Server-side spam filtering expected at platform layer.

## UTM Handling
- UTM params read from query string and persisted into hidden fields.
- `landing_path` captures source page path.

## Notification Routing
- Netlify dashboard notifications enabled per form.
- Optional webhook bridge via `netlify/functions/lead-webhook.mjs`.
