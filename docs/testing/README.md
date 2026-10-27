# Testing (GenUI quality foundation)

Record of automated quality layers for OpenUI composition, the fixture lab, MCP protocol, and MCP Apps host harness. **Command definitions in `package.json` are authoritative**; this folder describes scope, layout, and CI.

## Documents

| Document | Role |
| --- | --- |
| [genui-quality.md](genui-quality.md) | Layered architecture, fixture lab, evals, telemetry, contributor workflows |
| [inventory.md](inventory.md) | Test paths, harness code, readiness flags, what is / is not asserted |
| [ci-genui-quality.md](ci-genui-quality.md) | GitHub Actions workflow jobs and local parity |
| [mcp-apps-host-release-gate.md](mcp-apps-host-release-gate.md) | Deterministic MCP host CI vs manual ChatGPT/Claude gate |
| [live-mcp-host-checklist.md](live-mcp-host-checklist.md) | Blank table for recording ChatGPT/Claude smoke (manual) |

Related elsewhere:

- [docs/adr/ADR-genui-shared-compiler.md](../adr/ADR-genui-shared-compiler.md) — shared compiler decision
- [docs/agents/checks.md](../agents/checks.md) — when to run site-wide checks vs GenUI
- [docs/agents/verify.md](../agents/verify.md) — browser verification for UI changes

## Quick command map

| Goal | Command |
| --- | --- |
| Full GenUI stack (unit + MCP apps + fixture browser) | `bun run test:genui` |
| Contract + composition unit tests | `bun run test:genui:unit` |
| MCP protocol + simulated host | `bun run test:genui:mcp-apps` |
| Fixture lab Playwright only | `bun run test:genui:browser` |
| Offline eval (tier 0 compose, no API keys) | `bun run eval:genui:offline` |
| Prompt matrix (deterministic cases, no API keys) | `bun run eval:genui:matrix` |
| Live Promptfoo eval | `bun run eval:genui:live` (requires `GENUI_EVAL_LIVE=1`) |

Optional / not gated in CI by default: `test:genui:visual`, `test:genui:a11y`, `test:genui:mcp-apps:basic-host`, `mcp-apps:ensure-basic-host`, `mcp-apps:test-server`.

## Local prerequisites

- **Fixture lab:** `GENUI_FIXTURE_LAB=1` on the Next server (Playwright sets this via `playwright.config.ts`).
- **Playwright:** default dev URL `http://localhost:3199` (`PLAYWRIGHT_PORT`, `PLAYWRIGHT_BASE_URL`, `PLAYWRIGHT_SKIP_WEBSERVER`).
- **Site dev:** production-style dev remains port `3099`; do not confuse with the GenUI Playwright port.
