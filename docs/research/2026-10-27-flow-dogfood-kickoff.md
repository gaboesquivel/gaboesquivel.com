# Flow dogfood kickoff (2026-10-27)

**Product:** gaboesquivel.com (`develop` at dogfood start).

**Ecosystem readiness:** [flow-skills smoke record](https://github.com/gaboesquivel/flow-skills/blob/main/tests/smoke/2026-10-27-ecosystem-dogfood-readiness.md) — templates and interop cleanup merged before this kickoff.

## Setup

- Installed Flow Skills into the project lock: `bunx skills@latest add gaboesquivel/flow-skills -y -p` (15 skills; see [docs/agents/skills.md](../agents/skills.md)).
- Did not modify `AGENTS.md` or other adopter instruction files (Flow boundary).

## Active product context

- **Homepage GenUI initiative** — specs under `docs/specs/homepage-genui/`; capability map owns module order.
- **`grill` (2026-10-27):** `public-capabilities` was already implemented (`lib/capabilities/`, 9 tests pass). Stale “proposed plan” docs corrected; see [tasks/plan.md](../../tasks/plan.md).
- **Recent implementation on `develop`:** GenUI planning, bio timeline, curated compose; Flow Skills lock at `3f661dd0`.

## Skills to use next (explicit)

| Intent | Skill |
| --- | --- |
| OU-08 json-render removal or live MCP evidence | `grill` then `to-spec` — see [explore gap](2026-10-27-explore-openui-experiences-gap.md) |
| Plan the next module delta only | `to-spec` / `to-tickets` after review |
| Implement a bounded slice | `implement` |
| Align ARCHITECTURE after doc correction | `flow` |

## Not started in this pass

- Formal `openui-experiences` module plan in `tasks/plan.md`.
- Live second-agent-host verification (open in flow-skills scenario status).
