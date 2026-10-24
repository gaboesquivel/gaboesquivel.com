# GenUI and MCP test inventory

What exists on disk and what each layer claims. This is a map, not a substitute for running tests.

## Readiness and placeholders

| Symbol | Location | Meaning |
| --- | --- | --- |
| `MCP_APP_GENUI_UI_READY` | `lib/mcp/mcp-app-readiness.ts` | `false`: production MCP App resource is placeholder HTML only; GenUI-in-host Playwright block must stay skipped |
| Placeholder copy | `lib/mcp/public-server.ts` | Resource `ui://gaboesquivel/app` serves `MCP_APP_PLACEHOLDER_MARKER` text, not shared GenUI fixtures |
| `ExperienceStack` | `lib/genui/contract/` | Accepted by the shared compiler as a flat list of child experiences. Nested stacks are rejected. |

## Bun — `lib/genui`

Colocated unit tests (also picked up by `test:genui:unit` via `bun test lib/genui`):

| File | Focus |
| --- | --- |
| `compose.test.ts` | Composition routing and envelopes |
| `validate-envelope.test.ts` | Envelope validation / compiler delegation |
| `openui.test.ts` | OpenUI document helpers |
| `semantic.test.ts` | Semantic matching |
| `experience-contract.test.ts` | Experience prop policy |
| `compat-gate.test.ts` | Compatibility gates |
| `ndjson-stream.test.ts` | NDJSON stream parsing |
| `telemetry.test.ts` | Span emission |
| `planning.test.ts` | Task plans, catalog operations, coverage, recovery |

## Bun — `tests/genui`

| Path | Focus |
| --- | --- |
| `contracts/compiler-acceptance.test.ts` | `compileExperience`, catalog allowlists, error codes |
| `unit/builders-regression.test.ts` | Deterministic builders |
| `unit/serialize.property.test.ts` | fast-check serialization properties |
| `fixtures/sample-records.ts` | Shared record fixtures for tests |

## Bun — `lib/mcp`

| File | In `test:genui:unit` / protocol script | In CI `mcp` job |
| --- | --- | --- |
| `public-protocol.test.ts` | Yes | Yes |
| `public-server.test.ts` | No (separate) | Yes |
| `cv-app.test.ts` | No | Yes |

`public-protocol.test.ts` covers HTTP JSON-RPC on `handlePublicMcpRequest`, `tools/list` (nine registry tools), `tools/call`, argument validation, and `resources/read` for the MCP App URI.

## Playwright — `tests/genui/browser`

| Path | Script | Notes |
| --- | --- | --- |
| `functional/fixture-lab.spec.ts` | `test:genui:browser` | Declarative fixtures via `/__genui__/fixtures/:id` |
| `functional/homepage-genui.spec.ts` | `test:genui:browser` | Homepage prompt UX + mocked `/api/genui/compose` |
| `functional/mixed-task.spec.ts` | `test:genui:browser` | Narrow mixed comparison + CV fixture, keyboard disclosure, reduced motion |
| `visual/` | `test:genui:visual` | Snapshots; baselines not required in default CI |
| `accessibility/fixture-a11y.spec.ts` | `test:genui:a11y` | axe on fixture pages |

Config: `playwright.config.ts` — `testDir: tests/genui`, port **3199**, `GENUI_FIXTURE_LAB=1`, `next dev` (not `next start`).

## Playwright — MCP Apps harness (`tests/genui/mcp-apps`)

| Path | Script | Notes |
| --- | --- | --- |
| `browser/simulated-host.spec.ts` | `test:genui:mcp-apps:host` | AppBridge lab; see behavior table below |
| `browser/basic-host.spec.ts` | `test:genui:mcp-apps:basic-host` | Skips unless vendor `basic-host` dist exists |
| `browser/harness.ts` | — | `gotoMcpHostLab`, `connectMcpHostLab`, query `capabilities` / `mcp` |

### Simulated-host behaviors (reference view, not production GenUI)

| Area | Covered in CI |
| --- | --- |
| AppBridge init, tool input/result to iframe | Yes |
| Iframe reference view ready + payload | Yes |
| Container resize (no horizontal overflow) | Yes |
| Theme toggle (`applyDocumentTheme`) | Yes |
| Text-only tool path (no iframe) | Yes |
| Disconnect / teardown | Yes |
| Full host capabilities — `openLink` / `sendMessage` probes | Yes (`capabilities=full`) |
| Missing write capabilities | Yes (`capabilities=read-only`) |
| Bad MCP URL surfaces error, no false success | Yes |
| Production GenUI fixture in MCP iframe | **Skipped** until `MCP_APP_GENUI_UI_READY` |

### Harness application code (lab only)

| Path | Role |
| --- | --- |
| `app/genui-lab/mcp-host/page.tsx` | Host lab route; gated by `fixtureLabEnabled()` |
| `app/genui-lab/mcp-reference-view/page.tsx` | Iframe target for reference `App` |
| `components/mcp-apps/mcp-host-lab.tsx` | `AppBridge`, MCP client, text-only mode |
| `components/mcp-apps/mcp-reference-view.tsx` | Minimal `App` + connect retry for host race |
| `lib/mcp/mcp-host-capabilities.ts` | `full` vs `read-only` host capability profiles |
| `lib/mcp/mcp-host-timing.ts` | Browser sleep / race timeout for reference connect |

### Optional official host

| Path | Role |
| --- | --- |
| `scripts/mcp-apps/ensure-basic-host.mjs` | Clone/build ext-apps `basic-host` → `tests/genui/mcp-apps/vendor/basic-host` (gitignored) |
| `scripts/mcp-apps/test-mcp-server.ts` | Standalone `/mcp` on `MCP_TEST_PORT` (default 3101) |

Reuses declarative GenUI fixtures only where the **future** production app will; today’s tests intentionally use the **reference view**, not a duplicate GenUI UI implementation.

## Evals — `tests/genui/evals`

| Path | Role |
| --- | --- |
| `datasets/query-matrix.ts` | Prompt matrix (R/C/L/E/P suites); deterministic cases run in `tests/genui/contracts/query-matrix.test.ts` |
| `fixtures/catalog-ground-truth.ts` | Published projects, posts, CV, and contact URLs from package + Velite |
| `datasets/curated-cases.ts` | Source of truth for eval cases (120 cases in dataset; offline runner filters tier) |
| `datasets/tier0.jsonl`, `routing.jsonl` | Exported JSONL (`bun scripts/export-genui-eval-jsonl.ts`) |
| `graders/routing.ts`, `graders/composition.ts` | Offline grading |
| `promptfoo/provider.mjs`, `assert-tier0.mjs` | Live/offline Promptfoo (`promptfooconfig.yaml`) |
| `scripts/eval-genui-offline.ts` | CI: **tier 0 only**, deterministic `composeQuery` |

Live Promptfoo and full-tier offline compose are **not** default CI gates.

## Fixture lab routes

| Public URL | Implementation |
| --- | --- |
| `/__genui__/fixtures/:fixtureId` | Rewrite → `app/genui-lab/fixtures/[fixtureId]` when `GENUI_FIXTURE_LAB=1` |
| `/genui-lab/mcp-host` | MCP host lab (`?capabilities=read-only`, `?mcp=/path`) |
| `/genui-lab/mcp-reference-view` | Reference MCP App view (iframe `src`) |

Fixture IDs: `lib/genui/fixtures/registry.ts`.
