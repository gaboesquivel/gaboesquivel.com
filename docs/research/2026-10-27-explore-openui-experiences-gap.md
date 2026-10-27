# Explore: openui-experiences vs shipped GenUI (2026-10-27)

**Skill:** `explore` (Flow dogfood). **Does not authorize implementation.**

## Question

How much of [SPEC-openui-experiences.md](../specs/homepage-genui/SPEC-openui-experiences.md) is already on `develop`, and what remains for a honest module plan?

## Known facts (code)

| Spec area | Shipped evidence |
| --- | --- |
| OpenUI library + renderer | `components/genui/genui-library.tsx`, `openui-renderer.tsx`, `genui-experience-views.tsx` |
| Contract / validation | `lib/genui/contract/` (compiler, catalog, schemas); `lib/genui/openui.test.ts`, `tests/genui/contracts/` |
| Eight core experiences (+ stack) | `lib/genui/experience-contract.ts` — includes spec names plus `TimelineExperience`, `CapabilityShowcaseExperience` |
| 48rem container layouts | `@min-[48rem]` in experience views and project showcase; DESIGN.md documents 48rem editorial grid |
| Homepage compose path | `/api/genui/compose`, task planning (`lib/genui/task-plan.ts`, `semantic-plan.ts`, `compose-planned.ts`) per ARCHITECTURE.md |
| Capability-backed actions | Booking/contact flows use `lib/capabilities/` via interaction context; picker tests in `lib/connect/` |
| Fixture lab + browser tests | `lib/genui/fixtures/registry.ts`, `tests/genui/browser/`, `docs/testing/genui-quality.md` |
| MCP Apps harness | `tests/genui/mcp-apps/`; simulated host passes in CI; live ChatGPT/Claude documented as manual gate |

## Gaps vs spec acceptance (OU)

| ID | Status | Notes |
| --- | --- | --- |
| OU-01 | **Mostly met** | Fixtures cover project, writing, contact, booking, CV, timeline, mixed-task; explicit “all eight” OU-01 matrix not named in one test file |
| OU-02 | **Partially verified** | Same renderer path for homepage and MCP lab; embedded narrow-in-wide host called out in spec, not fully evidenced here |
| OU-03 | **Partially met** | Hire-split layouts at 48rem; dedicated OU-03 browser assertions not traced in this pass |
| OU-04 | **Met in contract tests** | Compiler rejects bad records/components; `compiler-acceptance.test.ts` |
| OU-05 | **Partially met** | Streaming/compose tests exist; full supersession gate not audited line-by-line |
| OU-06 | **Met by architecture** | Post-compose interactions use capabilities; planner is pre-compose only |
| OU-07 | **Partially met** | `test:genui:a11y` exists; not run in this explore pass |
| OU-08 | **Met** (2026-10-27) | Connect picker/note form are plain React; `list_slots` returns `slotState`; json-render deps and Eve skills removed |

## Spec drift

- Spec paths cite `lib/genui/openui.ts`; implementation lives under `lib/genui/contract/` and `components/genui/`.
- Spec lists eight experiences; production catalog adds **TimelineExperience** and **CapabilityShowcaseExperience** (documented in ARCHITECTURE.md).
- **composition-runtime** and **homepage-genui** modules overlap shipped behavior (task planning, homepage shell) — capability map should not treat openui-experiences as “not started.”

## Unresolved (needs product choice)

1. **Module boundary:** Close `openui-experiences` as “implemented with documented deltas” vs keep “draft” until OU-08 and live MCP gates pass.
2. **JSON Render removal (OU-08):** Scope is `app/connect` booking/note paths and Eve thread — not homepage GenUI. Likely its own slice, not a full module replan.
3. **Live MCP acceptance:** Still manual per [mcp-apps-host-release-gate.md](../testing/mcp-apps-host-release-gate.md).

## Recommended next activities (authorized only when you ask)

| Priority | Activity | Flow skill |
| --- | --- | --- |
| 1 | `grill` whether OU-08 can ship before declaring openui-experiences complete | `grill` |
| 2 | Update SPEC + capability map status to “implemented with outstanding OU-08 / live MCP” (docs only) | `flow` / manual |
| 3 | `to-spec` a bounded slice: migrate connect booking/note off json-render | `to-spec` then `implement` |
| 4 | Run `test:genui:a11y` + record results for OU-07 evidence | manual + doc |

**Implementation remains unauthorized** from this explore pass.
