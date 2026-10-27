# MCP Apps host release gate

MCP Apps testing is part of the GenUI quality foundation. **CI scope and file map:** [inventory.md](inventory.md). **Workflow jobs:** [ci-genui-quality.md](ci-genui-quality.md). **Commands:** `package.json` (`test:genui:mcp-apps*`).

## What CI proves (deterministic)

- Public MCP **protocol** over the same handler as production `/mcp` (`lib/mcp/public-protocol.test.ts`).
- **Simulated host** — AppBridge + `PostMessageTransport` against `/genui-lab/mcp-host` and the **reference view** (`tests/genui/mcp-apps/browser/simulated-host.spec.ts`). This is not the production GenUI MCP App.
- Optional locally: **official basic-host** (`tests/genui/mcp-apps/browser/basic-host.spec.ts`) after `bun run mcp-apps:ensure-basic-host`.

Tests gated by `MCP_APP_GENUI_UI_READY` in `lib/mcp/mcp-app-readiness.ts` **must not pass** until the real MCP App resource renders shared GenUI fixtures. The placeholder resource (`ui://gaboesquivel/app`) is infrastructure-only.

## Manual release gate (ChatGPT / Claude)

Not run in CI. Required before claiming external host support:

1. Expose `/mcp` over HTTPS (e.g. `cloudflared` tunnel for local dev).
2. Register the server in Claude and/or ChatGPT per vendor docs.
3. Record host name, version, date, tool invoked, text fallback, iframe render, resize, and (if applicable) read/write outcome.
4. Store evidence in your release checklist (not committed secrets or PII). Automated CI baseline (protocol + simulated host): [acceptance record](../research/2026-10-27-acceptance-automated-record.md).

Failures or untested write paths must be reported explicitly; do not infer parity from simulated-host CI alone.

## Optional local commands

```bash
bun run test:genui:mcp-apps
bun run mcp-apps:ensure-basic-host
bun run mcp-apps:test-server
bun run test:genui:mcp-apps:basic-host
```

`mcp-apps:test-server` serves standalone MCP on port `3101` (`MCP_TEST_PORT`) for basic-host integration.
