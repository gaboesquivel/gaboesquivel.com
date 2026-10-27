# Flow dogfood kickoff (2026-10-27)

**Product:** gaboesquivel.com (`develop` at dogfood start).

**Ecosystem readiness:** [flow-skills smoke record](https://github.com/gaboesquivel/flow-skills/blob/main/tests/smoke/2026-10-27-ecosystem-dogfood-readiness.md) — templates and interop cleanup merged before this kickoff.

## Setup

- Installed Flow Skills into the project lock: `bunx skills@latest add gaboesquivel/flow-skills -y -p` (15 skills; see [docs/agents/skills.md](../agents/skills.md)).
- Did not modify `AGENTS.md` or other adopter instruction files (Flow boundary).

## Active product context

- **Homepage GenUI initiative** — specs under `docs/specs/homepage-genui/`; capability map owns module order.
- **Current module plan:** [tasks/plan.md](../../tasks/plan.md) — `public-capabilities` (proposed; awaiting review before task breakdown).
- **Recent implementation on `develop`:** GenUI planning, bio timeline, curated compose (commits through `b1569c24`).

## Skills to use next (explicit)

| Intent                                             | Skill        |
| -------------------------------------------------- | ------------ |
| Stress-test `public-capabilities` plan before PC-A | `grill`      |
| Turn approved plan into tasks                      | `to-tickets` |
| Implement PC-A after plan approval                 | `implement`  |
| Align root docs after a shipped slice              | `flow`       |

## Not started in this pass

- PC-A implementation (plan not yet approved for build).
- Live second-agent-host verification (open in flow-skills scenario status).
