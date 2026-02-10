# AGENTS

## Coding Standards
- Maintain copy parity with old site unless correction is justified.
- Log any meaningful copy changes in `docs/DECISIONS.md`.
- Keep one H1 per page.
- Keep forms accessible: labels, error text, keyboard flow.
- Prefer static Astro output and minimal client JS.

## File Ownership
- `src/pages/*`: route content and parity mapping.
- `src/components/*`: reusable UI and conversion components.
- `src/scripts/*`: browser analytics and form behavior.
- `scripts/*`: migration tooling and QA automation.
- `docs/*`: migration decisions, parity, SEO, QA, and deployment records.

## Workflow
1. Update crawler baseline when old-site content changes.
2. Implement parity-first page updates.
3. Run lint/typecheck/tests.
4. Refresh parity and SEO docs.
5. Append release summary to `progress.md`.
