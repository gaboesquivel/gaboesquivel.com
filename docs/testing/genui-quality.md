# GenUI quality foundation

Index: [testing README](README.md). Test map: [inventory.md](inventory.md). CI: [ci-genui-quality.md](ci-genui-quality.md).

## Architecture

GenUI quality is split into independent layers:

1. **Contract** — `lib/genui/contract/` (`compileExperience`, shared schemas, serialization).
2. **Composition runtime** — `lib/genui/compose.ts`, decisions, deterministic builders (Bun unit/integration tests).
3. **Renderer** — `components/genui/` with scoped `GenuiRecordProvider` (Playwright fixture lab).
4. **Evals** — curated cases, offline runner, Promptfoo adapter (`eval:genui:*`).
5. **MCP** — protocol and simulated MCP Apps host harness; production GenUI-in-host and external hosts are separate gates ([mcp-apps-host-release-gate.md](mcp-apps-host-release-gate.md)).
6. **CI** — `.github/workflows/genui-quality.yml` ([ci-genui-quality.md](ci-genui-quality.md)).

## Commands

Authoritative definitions: `package.json`. Summary:

| Command | Purpose |
| --- | --- |
| `bun run test:genui` | Unit + MCP apps + functional browser |
| `bun run test:genui:unit` | Bun: `lib/genui`, contracts, unit, MCP protocol test |
| `bun run test:genui:mcp-apps` | MCP protocol + simulated host Playwright |
| `bun run test:genui:browser` | Playwright functional fixture lab |
| `bun run test:genui:visual` | Visual snapshots (not default CI) |
| `bun run test:genui:a11y` | axe + fixture pages |
| `bun run eval:genui:offline` | Deterministic offline eval (tier 0 in CI) |
| `bun run eval:genui:live` | Promptfoo live; requires `GENUI_EVAL_LIVE=1` |

## Fixture lab

Local-only route: `/__genui__/fixtures/[fixtureId]` (rewritten to `app/genui-lab/fixtures/…` because App Router ignores `_`-prefixed segments) when `GENUI_FIXTURE_LAB=1` and not on Vercel. Fixture IDs are defined in `lib/genui/fixtures/registry.ts` (no query-parameter documents).

Playwright starts Next on port **3199** with `GENUI_FIXTURE_LAB=1` (`playwright.config.ts`).

## Snapshots

Generate baselines in the same Linux/Chromium environment as CI. Do not widen diff thresholds to mask regressions. Review PNG updates deliberately.

## Telemetry

`lib/genui/telemetry.ts` emits OpenTelemetry-style span events via `emitComposeSpan`. Optional Langfuse export uses `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`, and optional `LANGFUSE_BASE_URL` — never required for local dev or CI.

## Live evaluation

Live model quality is opt-in only. Missing credentials must not produce a misleading green CI result.

## MCP Apps

See [mcp-apps-host-release-gate.md](mcp-apps-host-release-gate.md) and the MCP sections of [inventory.md](inventory.md). `MCP_APP_GENUI_UI_READY` remains `false` until the real MCP App resource renders shared GenUI fixtures.

## Adding a composite

1. Implement rendering in `ProjectCompositeView`, `WritingCompositeView`, or the owning experience.
2. Add the name to `contract/catalog.ts` allowlists for that experience.
3. Extend shared Zod props in `contract/schemas.ts`.
4. Add fixture + contract + browser coverage.

## Adding an eval case

Add a row to `tests/genui/evals/datasets/curated-cases.ts`, then run `bun scripts/export-genui-eval-jsonl.ts` to refresh JSONL exports.

## Troubleshooting

- **Fixture 404** — set `GENUI_FIXTURE_LAB=1` for the Next server.
- **Playwright cannot reach app** — default lab port is `3199`; set `PLAYWRIGHT_BASE_URL` or free the port.
- **Contract failures** — run `bun test tests/genui/contracts` for the exact `CompileErrorCode`.
