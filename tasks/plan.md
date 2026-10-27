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

[Explore note](../docs/research/2026-10-27-explore-composition-homepage-mcp-gap.md): **composition-runtime**, **homepage-genui**, and **mcp-app** reconciled to shipped code; SPECs updated. No open PRs; [branch merge status](../docs/research/2026-10-27-branch-merge-status.md) (`fix/cv-screen-spacing` not merged — superseded by `main`).

## Automated acceptance (2026-10-27)

[Record](../docs/research/2026-10-27-acceptance-automated-record.md): GenUI unit 158/158, browser 60/60, offline eval 5/5, MCP protocol 9/9, simulated host 8/8 (1 skipped), a11y 1/1. Live ChatGPT/Claude still open.

## Suggested next bounded slice

1. **Manual:** Live MCP host — [checklist](docs/testing/live-mcp-host-checklist.md) + [release gate](docs/testing/mcp-apps-host-release-gate.md).
2. **Automated:** Broaden a11y fixture matrix if required for OU-07 sign-off.
3. **Product:** [Connect surface status](../docs/research/2026-10-27-connect-surface-status.md) (`ConnectChat` not mounted on any route).
