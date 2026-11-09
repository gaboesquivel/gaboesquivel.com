# CI

CI runs code quality only. [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) runs on every pull request: `bunx oxlint` and `bunx oxfmt --check`, using a sparse checkout without raster images and PDFs under `public/`.

Nothing else is gated in CI: no content build, design or motion checks, unit or contract tests, GenUI or MCP suites, Playwright, or evals. Run those locally when a change touches them:

| Area | Command |
| --- | --- |
| Content, lint, motion, design | `bun run verify` |
| Site tests | `bun run test:llms` |
| GenUI unit and contracts | `bun run prepare:generated && bun run test:genui:unit` |
| MCP and capabilities | `bun test lib/mcp/public-server.test.ts lib/mcp/cv-app.test.ts lib/capabilities/published-copy.test.ts lib/connect/calendar-lazy.test.ts` |
| Fixture lab and MCP host (browser) | `bun run test:genui:browser`, `bun run test:genui:mcp-apps:host` |
| Offline eval | `bun run eval:genui:offline` |
