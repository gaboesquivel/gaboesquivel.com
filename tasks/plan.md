# Active implementation plan

**No single module plan is active.** The prior `public-capabilities` plan is complete on `develop`.

## Completed module

| Module | Evidence | Historical plan |
| --- | --- | --- |
| `public-capabilities` | Nine operations in `lib/capabilities/registry.ts`; `bun test lib/capabilities` (9 tests); HTTP `/api/capabilities`; public MCP uses the same registry | [PLAN-public-capabilities.md](../docs/specs/homepage-genui/PLAN-public-capabilities.md) |

Do not re-run PC-A–G slices unless a regression or spec gap is found. Record gaps in the spec or an ADR, not by resurrecting this module as “proposed.”

## Explore: openui-experiences (2026-10-27)

[Largely implemented on `develop`](../docs/research/2026-10-27-explore-openui-experiences-gap.md). Remaining spec gaps: **OU-08** (remove json-render from connect flows), manual ChatGPT/Claude MCP gate, formal OU audit. **composition-runtime** and **homepage-genui** also overlap shipped code — reconcile specs before writing a multi-module task list.

## Suggested next bounded slice (when authorized)

**OU-08 / connect migration** — replace `@json-render` usage in `app/connect/` and `lib/connect/compose.ts` with OpenUI/capability paths already used on the homepage. Scope with `to-spec` or `grill` before `implement`.

## In-flight work on `develop`

Recent commits extend homepage GenUI (task planning, bio timeline, curated compose). That work tracks **composition-runtime** and **homepage-genui** specs, not the completed provider module. Keep transport and provider boundaries separate when planning the next slice.
