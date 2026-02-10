# Decisions Log

## 2026-02-09

### Decision: Introduce `services/*-austin-tx` URLs while preserving legacy content routes
- Reason: improve local intent matching for priority keyword themes.
- Impact: better relevance for target terms; requires redirect governance and parity checks.

### Decision: Preserve core old-site copy in hero/about/service intros
- Reason: protect topical continuity and reduce migration risk.
- Impact: high parity with controlled UX modernization.

### Decision: Minor copy edits for readability and grammar
- Edited: punctuation and sentence flow in long-form service intros.
- Reason: improve clarity without changing claim intent.
- Impact: low SEO risk, better readability.

### Decision: Use Netlify static forms with hidden blueprint forms
- Reason: reliable form detection in static builds.
- Impact: no backend requirement for launch; webhook path available as optional enhancement.

### Decision: Best-effort crawl baseline due environment constraints
- Reason: restricted environment prevented full automated crawl execution with dependencies.
- Impact: inventory and parity baselines include explicit coverage-gap notes and should be re-run in CI/local networked environment.

### 2026-02-09: Homepage copy-parity restoration with modern visual system
- Decision: restore legacy homepage section sequence and parity intent while keeping current metadata/schema/form and accessibility improvements.
- Why: migration safety requirement to preserve ranking continuity and content familiarity.
- Tradeoff: some long-form legacy copy condensed into card/explainer blocks due unavailable complete source extraction in crawl artifacts.
- Guardrail check: no URL changes, no fabricated claims, one H1 maintained.
