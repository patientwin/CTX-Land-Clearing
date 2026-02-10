# SEO Delta Report

## Guardrails Confirmed
- URL structure and parity routes were preserved.
- Core copy and factual claims were not rewritten.
- Changes were limited to metadata quality, internal linking, CTA placement, form friction, image handling, and schema accuracy.

## Second-Pass SEO/CRO Changes

| Area | Change | Why | Impact | Risk |
| --- | --- | --- | --- | --- |
| Metadata | Refined homepage and core service meta descriptions with stronger CTA language and local intent | Improve click-through without changing page claims | High | Low |
| Metadata | Added `og:site_name`, `og:locale`, and `theme-color` | Better social/link preview consistency and browser UI polish | Medium | Low |
| Internal linking | Added contextual links between service pages and grading/areas/contact endpoints | Strengthen crawl pathways and service cluster relevance | High | Low |
| CTA placement | Added dual CTA groups on service pages and additional lower-funnel CTA row on homepage | Reduce drop-off after initial read and improve conversion path clarity | High | Low |
| Schema accuracy | Added stable `@id` for LocalBusiness and linked `Service.provider.@id`; added `Service.@id`/`serviceType` | Improve entity consistency and reduce schema ambiguity | Medium | Low |
| Image optimization | Added lazy/async-decoded, dimensioned service images in service cards | Improve visual scanning while keeping low rendering cost | Medium | Low-Medium |
| Form friction | Added concise time/expectation helper text and phone/address input hints (`inputmode`, `autocomplete`) | Increase completion confidence and mobile form speed | High | Low |
| Validation UX | Improved field-label based inline error mapping for required fields | More precise errors, especially for project address field | Medium | Low |

## Title/Meta Delta Snapshot

| Page | Before | After | Intent Effect |
| --- | --- | --- | --- |
| `/` | Generic estimate CTA in meta | Added direct call option + estimate CTA | Higher local CTR intent |
| `/services/land-clearing-austin-tx/` | Service relevance only | Added call + estimate in meta | Stronger action intent |
| `/services/forestry-mulching-austin-tx/` | Service benefits only | Added free estimate CTA language | Better SERP conversion pull |

## Residual SEO Risks
- New service-card imagery currently uses lightweight placeholders; replace with real compressed project photos before launch.
- Staging domain remains in canonical/schema base config and must be switched at production cutover.
