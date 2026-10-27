# Active implementation plan

**No single module plan is active.** The prior `public-capabilities` plan is complete on `develop`.

## Completed module

| Module | Evidence | Historical plan |
| --- | --- | --- |
| `public-capabilities` | Nine operations in `lib/capabilities/registry.ts`; `bun test lib/capabilities` (9 tests); HTTP `/api/capabilities`; public MCP uses the same registry | [PLAN-public-capabilities.md](../docs/specs/homepage-genui/PLAN-public-capabilities.md) |

Do not re-run PC-A–G slices unless a regression or spec gap is found. Record gaps in the spec or an ADR, not by resurrecting this module as “proposed.”

## Next module (capability map order)

**`openui-experiences`** — [SPEC-openui-experiences.md](../docs/specs/homepage-genui/SPEC-openui-experiences.md) remains draft. Before replacing this file with a new module plan: review the spec, reconcile with what already ships on `/` (GenUI compose, OpenUI renderer), then run Specify → Plan → Tasks for only the **remaining** delta.

## In-flight work on `develop`

Recent commits extend homepage GenUI (task planning, bio timeline, curated compose). That work tracks **composition-runtime** and **homepage-genui** specs, not the completed provider module. Keep transport and provider boundaries separate when planning the next slice.
