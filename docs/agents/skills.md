# Development skills

Skills come from `skills-lock.json` (`bun run skills:install` or `bun run skills:update`). Author skills in their source repository. Do not copy a `SKILL.md` into this repository. This repository commits the lock.

## Flow Skills (methodology)

The lock also pins the [Flow Skills](https://github.com/gaboesquivel/flow-skills) catalog (`gaboesquivel/flow-skills`; current list in its [docs/skills.md](https://github.com/gaboesquivel/flow-skills/blob/main/docs/skills.md)), except `domain-modeling`, which stays on `mattpocock/skills`. Say a phrase from the Flow block in [AGENTS.md](../../AGENTS.md) to load a Flow skill; Flow skills do not replace the installed `gabo` skill for voice, identity, or claims. The `flow` skill aligns this site's `PRODUCT.md`, `DESIGN.md`, `ARCHITECTURE.md`, and `GLOSSARY.md` after meaningful changes — it does not copy Flow's product identity from flow-skills. New specs and decisions follow [docs/decisions/0001-flow-adopter-docs.md](../decisions/0001-flow-adopter-docs.md); existing `docs/specs/homepage-genui/` and PDR/ADR trees stay in place. This site's lifecycle in [AGENTS.md](../../AGENTS.md) remains authoritative for checks and verification.

Change voice in `gaboesquivel-skills`, then run `bunx skills@latest update gabo -p -y` and commit the lock.

Add, update, and remove skills with the skills CLI so `.agents/skills/` matches the lock. `.agents/` is gitignored; the lock is the committed source.

Use each skill's name as it appears in the lock. Do not invent a `-vN` folder.

Basilic `/w-*` playbooks and third-party TDD skills (`tdd`, `test-driven-development`) are not installed; Flow's `build` and `review` own test practice, under the checks in this site's lifecycle.

`.agents/skills/` is for repository work and changes through the lock. `agent/skills/` is the Eve runtime (`SKILL.md` and `references/` only). Do not copy catalog evals into `agent/skills/`. Edit that tree only when the task is about the running agent. The boundary is in [ARCHITECTURE.md](../../ARCHITECTURE.md).

Done when `skills-lock.json` and `.agents/skills/` name the same development skills, and `agent/skills/` changed only when the task was about the runtime agent.
