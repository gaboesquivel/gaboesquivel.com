# Automated acceptance record (2026-10-27)

Local run on `main` after module reconciliation (`0ba9bfae`). **Not** a substitute for live ChatGPT/Claude MCP gate.

## Environment

- Machine: maintainer dev (darwin)
- Commands from repo root with `bun`

## Results

| Gate | Command | Outcome |
| --- | --- | --- |
| Capabilities | `bun test lib/capabilities/capabilities.test.ts` | 9/9 pass (included in GenUI unit batch) |
| Connect / OU-08 | `bun test lib/connect/gate.test.ts lib/connect/note-form-visible.test.ts` | 15/15 pass |
| GenUI unit + contracts | `bun test lib/genui …` + `tests/genui/contracts` + `tests/genui/unit` | 158/158 pass (22 files) |
| Offline eval (tier 0) | `bun run eval:genui:offline` | 5/5 composition + routing; 0 unauthorized writes |
| Public MCP protocol | `bun run test:genui:mcp-apps:protocol` | 9/9 pass |
| Browser functional (HP/fixtures) | `bun run test:genui:browser` | **60/60 pass** (~45s) |
| Simulated MCP host | `bun run test:genui:mcp-apps:host` | **8 pass**, 1 skipped (`production GenUI MCP App` iframe) |
| Accessibility (OU-07 sample) | `bun run test:genui:a11y` | **1/1 pass** (`cv-full` fixture, no serious axe violations) |

## Mapping to spec IDs (partial)

| Spec | IDs with automated signal | Still manual |
| --- | --- | --- |
| openui-experiences | Fixture lab + compiler tests; OU-08 via connect tests | OU-01–OU-07 matrix, live MCP |
| composition-runtime | Offline eval, tier telemetry in compose tests | CR p75 latency targets, full CR labeled set |
| homepage-genui | `homepage-genui.spec.ts`, career prompt live compose | HP bundle baseline, full HP sign-off |
| mcp-app | Protocol + simulated host | ChatGPT/Claude per release gate |

## Local pitfall

If port **3199** is still bound after a Playwright run, `test:genui:mcp-apps:host` may fail with `EADDRINUSE`. Free the port or wait for the prior webserver to exit before chaining browser and MCP host suites.

## Open

- Expand a11y coverage beyond the single `cv-full` fixture if OU-07 needs full matrix evidence.
- Record live MCP smoke in `docs/testing/` when performed.
