# Active implementation plan

**No single module plan is active.** Homepage GenUI capability modules are largely shipped on `main`; remaining work is acceptance evidence and doc accuracy, not greenfield implementation.

## Completed module

| Module | Evidence | Historical plan |
| --- | --- | --- |
| `public-capabilities` | Nine operations in `lib/capabilities/registry.ts`; `bun test lib/capabilities` (9 tests); HTTP `/api/capabilities`; public MCP uses the same registry | [PLAN-public-capabilities.md](../docs/specs/homepage-genui/PLAN-public-capabilities.md) |

Do not re-run PC-A–G slices unless a regression or spec gap is found. Record gaps in the spec or an ADR, not by resurrecting this module as “proposed.”

## Explore: openui-experiences (2026-10-27)

[Largely implemented on `main`](../docs/research/2026-10-27-explore-openui-experiences-gap.md). **OU-08** (json-render removed from connect; plain React picker/note form) shipped 2026-10-27. Still open: manual ChatGPT/Claude MCP gate, formal OU-01–OU-07 audit. **composition-runtime** and **homepage-genui** overlap shipped code — reconcile specs before a multi-module task list.

## Initiative status (2026-10-27)

[Explore note](../docs/research/2026-10-27-explore-composition-homepage-mcp-gap.md): **composition-runtime**, **homepage-genui**, and **mcp-app** reconciled to shipped code; SPECs updated. No open PRs in ecosystem repos.

## Suggested next bounded slice

1. **Manual:** Live MCP host smoke ([mcp-apps-host-release-gate.md](../docs/testing/mcp-apps-host-release-gate.md)) — records open OU/MCP gates.
2. **Optional code:** Retire or document `/mcp/cv`; point nav sheet search at `/` instead of `/ask`.
3. **Formal:** CR/HP labeled test audit; file gaps only on failure.
