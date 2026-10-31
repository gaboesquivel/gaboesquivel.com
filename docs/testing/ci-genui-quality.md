# CI: GenUI quality workflow

Workflow file: [`.github/workflows/genui-quality.yml`](../../.github/workflows/genui-quality.yml).

## Triggers

- **Pull request** when paths touch GenUI, fixture lab, MCP, Playwright config, Promptfoo config, scripts, or lockfile (see workflow `paths`): runs `static` only.
- **Manual** (`workflow_dispatch`): runs `static` and `browser`.

No push runs, evals, or model calls.

## Jobs

### `static`

| Step | Command / action |
| --- | --- |
| Install | `bun install --frozen-lockfile` |
| Lint + content | `bun run verify` |
| Unit + contracts | `bun run test:genui:unit` (includes `public-protocol`) |
| MCP and capability module | `bun test lib/mcp/public-server.test.ts lib/mcp/cv-app.test.ts lib/capabilities/published-copy.test.ts lib/connect/calendar-lazy.test.ts` |

### `browser` (manual only)

| Step               | Command / action                                       |
| ------------------ | ------------------------------------------------------ |
| Playwright browser | `bunx playwright install chromium --with-deps`         |
| Fixture lab        | `bun run test:genui:browser`                           |
| MCP simulated host | `bun run test:genui:mcp-apps:host`                     |
| On failure         | Upload `tests/genui/browser/report` and `test-results` |

Run it locally (`bun run test:genui:browser`, `bun run test:genui:mcp-apps:host`) or dispatch the workflow when a change touches fixture lab rendering or the MCP Apps host.

## Not in this workflow (by design)

| Item | Run locally / separately |
| --- | --- |
| `test:genui` full aggregate | `static` + `browser` |
| Offline eval | `bun run eval:genui:offline` |
| Visual snapshots | `bun run test:genui:visual` |
| Accessibility | `bun run test:genui:a11y` |
| Live Promptfoo | `bun run eval:genui:live` with credentials |
| Official basic-host Playwright | `mcp-apps:ensure-basic-host`, `mcp-apps:test-server`, `test:genui:mcp-apps:basic-host` |
| ChatGPT / Claude smoke | [mcp-apps-host-release-gate.md](mcp-apps-host-release-gate.md) |

## Local parity

```bash
bun run verify
bun run test:genui:unit
bun test lib/mcp/public-server.test.ts lib/mcp/cv-app.test.ts lib/capabilities/published-copy.test.ts lib/connect/calendar-lazy.test.ts
bun run test:genui:browser
bun run test:genui:mcp-apps:host
```
