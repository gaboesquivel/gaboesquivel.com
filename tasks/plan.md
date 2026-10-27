# Active implementation plan

**No single module plan is active.** The prior `public-capabilities` plan is complete on `develop`.

## Completed module

| Module | Evidence | Historical plan |
| --- | --- | --- |
| `public-capabilities` | Nine operations in `lib/capabilities/registry.ts`; `bun test lib/capabilities` (9 tests); HTTP `/api/capabilities`; public MCP uses the same registry | [PLAN-public-capabilities.md](../docs/specs/homepage-genui/PLAN-public-capabilities.md) |

Do not re-run PC-A–G slices unless a regression or spec gap is found. Record gaps in the spec or an ADR, not by resurrecting this module as “proposed.”

## Explore: openui-experiences (2026-10-27)

[Largely implemented on `main`](../docs/research/2026-10-27-explore-openui-experiences-gap.md). **OU-08** (json-render removed from connect; plain React picker/note form) shipped 2026-10-27. Still open: manual ChatGPT/Claude MCP gate, formal OU-01–OU-07 audit. **composition-runtime** and **homepage-genui** overlap shipped code — reconcile specs before a multi-module task list.

## Suggested next bounded slice

Live MCP host smoke ([mcp-apps-host-release-gate.md](../docs/testing/mcp-apps-host-release-gate.md)) or reconcile **composition-runtime** / **homepage-genui** specs with `ARCHITECTURE.md`.
