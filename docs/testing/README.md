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
| Search and agent-surface states (lab, no model calls) | `bunx playwright test tests/genui/browser/functional/lab-states.spec.ts` |
| Offline eval (tier 0 compose, no API keys) | `bun run eval:genui:offline` |
| Prompt matrix (deterministic cases, no API keys) | `bun run eval:genui:matrix` |
| Live Promptfoo eval | `bun run eval:genui:live` (requires `GENUI_EVAL_LIVE=1`) |

Optional / not gated in CI by default: `test:genui:browser`, `test:genui:mcp-apps:host` (manual workflow dispatch), `test:genui:visual`, `test:genui:a11y`, `test:genui:mcp-apps:basic-host`, `mcp-apps:ensure-basic-host`, `mcp-apps:test-server`.

## Local prerequisites

- **Fixture lab:** `GENUI_FIXTURE_LAB=1` on the Next server (Playwright sets this via `playwright.config.ts`).
- **Playwright:** default dev URL `http://localhost:3199` (`PLAYWRIGHT_PORT`, `PLAYWRIGHT_BASE_URL`, `PLAYWRIGHT_SKIP_WEBSERVER`).
- **Site dev:** production-style dev remains port `3099`; do not confuse with the GenUI Playwright port. The fixture lab builds into `.next-genui-lab` (`NEXT_DIST_DIR`), so Playwright runs beside a running `bun run dev` without stopping it.
- **Generated inputs:** `generated/*.json` is gitignored. `bun run prepare:generated` (Velite + `scripts/export-llms.ts`) creates it; CI and the Playwright web server run it first.
- **Contract states in the lab:** `/__genui__/fixtures/search-composing`, `search-streaming`, `search-empty`, `search-error`, `search-timed-out`, `search-rate-limited`, `search-staged` (a stage label beside Stop) and `search-stopped` show each shared search state with a lab field; Try again and example chips refocus it and record the query instead of calling compose. Write failure is `contact-hire?writes=failure` or `booking-hire?writes=failure`. `functional/lab-states.spec.ts` asserts copy (`lib/search/copy.ts`), one live-region announcement per state, and the focus target; live-surface flows stay in `search-contract.spec.ts` and `genui-writes.spec.ts`.
- **Planner paraphrases:** add a row to `lib/genui/planner-paraphrases.test.ts` for every new planner keyword rule, including a query it must not capture.
