# CI: GenUI quality workflow

Workflow file: [`.github/workflows/genui-quality.yml`](../../.github/workflows/genui-quality.yml).

## Triggers

- **Pull request** when paths touch GenUI, fixture lab, Playwright config, Promptfoo config, or lockfile (see workflow `paths`).
- **Push to `develop`** on a subset of paths (GenUI + Playwright; narrower than PR).

## Jobs

### `static`

| Step             | Command / action                       |
| ---------------- | -------------------------------------- |
| Install          | `bun install --frozen-lockfile`        |
| Lint + content   | `bun run verify`                       |
| Unit + contracts | `bun run test:genui:unit`              |
| MCP protocol     | `bun run test:genui:mcp-apps:protocol` |
| Offline eval     | `bun run eval:genui:offline`           |

### `browser`

| Step               | Command / action                                       |
| ------------------ | ------------------------------------------------------ |
| Playwright browser | `bunx playwright install chromium --with-deps`         |
| Fixture lab        | `bun run test:genui:browser`                           |
| MCP simulated host | `bun run test:genui:mcp-apps:host`                     |
| On failure         | Upload `tests/genui/browser/report` and `test-results` |

### `mcp`

| Step | Command / action |
| --- | --- |
| MCP module tests | `bun test lib/mcp/public-protocol.test.ts lib/mcp/public-server.test.ts lib/mcp/cv-app.test.ts` |

Note: `public-protocol.test.ts` also runs under `static`; this job adds server and CV MCP coverage.

## Not in this workflow (by design)

| Item | Run locally / separately |
| --- | --- |
| `test:genui` full aggregate | `static` + `browser` + partial overlap with `mcp` |
| Visual snapshots | `bun run test:genui:visual` |
| Accessibility | `bun run test:genui:a11y` |
| Live Promptfoo | `bun run eval:genui:live` with credentials |
| Official basic-host Playwright | `mcp-apps:ensure-basic-host`, `mcp-apps:test-server`, `test:genui:mcp-apps:basic-host` |
| ChatGPT / Claude smoke | [mcp-apps-host-release-gate.md](mcp-apps-host-release-gate.md) |

## Local parity

```bash
bun run verify
bun run test:genui:unit
bun run test:genui:mcp-apps
bun run test:genui:browser
bun run eval:genui:offline
bun test lib/mcp/public-server.test.ts lib/mcp/cv-app.test.ts
```

Equivalent to the three CI jobs without re-running `public-protocol` twice.
