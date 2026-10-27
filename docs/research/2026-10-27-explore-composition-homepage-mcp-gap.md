# Explore: composition-runtime, homepage-genui, mcp-app vs `main` (2026-10-27)

**Skill:** `explore`. **Does not authorize new implementation.**

## PR / branch status

GitHub has **no open PRs** on `gaboesquivel.com`, `flow-skills`, `flow-next`, or `flow-mono`. Dogfood and OU-08 land on **`main`** (`9c4787a7` and earlier).

## composition-runtime

| Spec area | On `main` | Gap vs CR-* |
| --- | --- | --- |
| `/api/genui/compose`, streaming events | `app/api/genui/compose/`, `lib/genui/compose.ts` | CR-05 supersession/cancel — covered in `use-genui-composition.ts` + tests; formal CR matrix not one file |
| Tier 0 / curated / intent | `deterministic.ts`, `query-intent.ts`, `compose.ts` telemetry `tier` | CR-01: **task planner** (`semantic-plan.ts`, `task-plan.ts`) extends spec’s Jev-only Tier 1; Jev still in `decisions.ts` |
| Semantic generation | `semantic-plan.ts`, Eve/OpenUI path in `compose.ts` | CR-03 Jev timeout → semantic: implemented in compose routing; not re-audited line-by-line |
| Budgets / limits | `ARCHITECTURE.md` § task planning; `compose-planned.ts` | Match spec proposal; ADR `ADR-genui-task-planning.md` is authority |
| Tests / evals | `lib/genui/*.test.ts`, `tests/genui/evals/`, `eval:genui:offline` in CI | CR-08 telemetry redaction — `telemetry.ts`; live p75 targets **not** recorded |
| No composition cache | compose path | Assumed met; no Redis memoization observed in explore |

**Verdict:** **Largely implemented** with spec drift (planner/tasks vs original “Jev decision only” wording). Remaining: formal CR acceptance audit, published performance measurements, gateway model pin verification.

## homepage-genui

| Spec area | On `main` | Gap vs HP-* |
| --- | --- | --- |
| SSR first paint + lazy renderer | `ARCHITECTURE.md`, `app/page.tsx`, dynamic OpenUI load | HP-01 met in architecture + browser tests |
| Sticky prompt, reset, replace region | `homepage-shell.tsx`, `generated-region.tsx`, `prompt-field.tsx` | HP-02–HP-05 behavior in functional specs (`homepage-genui.spec.ts`) |
| Drafts / receipts | `genui-draft-context`, `genui-interaction-context` | HP-06 partial — connect receipts on `/ask` path merged to `/` |
| `/ask` redirect | `app/ask/page.tsx`, `next.config.js` | HP-09 redirect met; json-render removal met (OU-08) |
| Nav sheet → `/ask` | Still links to `/ask` (lands on `/`) | Minor UX doc drift only |

**Verdict:** **Largely implemented.** Remaining: explicit DESIGN.md motion budget (spec open question), bundle baseline report (HP performance note), full HP matrix sign-off.

## mcp-app

| Spec area | On `main` | Gap |
| --- | --- | --- |
| `/mcp` route, nine tools | `app/mcp/route.ts`, `lib/capabilities/registry.ts` | Spec migration section still describes Eve ownership — **stale** |
| MCP Apps resource / harness | `tests/genui/mcp-apps/`, public protocol tests | Live ChatGPT/Claude gate still manual |
| `/mcp/cv` retirement | `app/mcp/cv/route.ts` returns **410** with migration message | Met |

**Verdict:** **Largely implemented** on protocol surface; update SPEC migration narrative and complete live host gate.

## Recommended next (when authorized)

1. **Docs:** Mark module statuses in SPECs + capability map (this pass).
2. **Manual:** Live MCP host smoke per `docs/testing/mcp-apps-host-release-gate.md`.
3. **Optional implement:** Nav sheet link directly to `/` with anchor, or retire `/mcp/cv` if still exposed.
4. **Formal:** Partial automated record — [2026-10-27-acceptance-automated-record.md](./2026-10-27-acceptance-automated-record.md). Live MCP and a11y suite still open.
