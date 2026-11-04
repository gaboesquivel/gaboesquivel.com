# Development skills

Skills come from `skills-lock.json` (`bun run skills:install` or `bun run skills:update`). Author skills in their source repository. Do not copy a `SKILL.md` into this repository. This repository commits the lock.

## Flow Skills (methodology)

The lock also pins the [Flow Skills](https://github.com/gaboesquivel/flow-skills) catalog (`gaboesquivel/flow-skills`; current list in its [docs/skills.md](https://github.com/gaboesquivel/flow-skills/blob/main/docs/skills.md)), except `domain-modeling`, which stays on `mattpocock/skills`. Say a phrase from the Flow block in [AGENTS.md](../../AGENTS.md) to load a Flow skill; Flow skills do not replace the installed `gabo` skill for voice, identity, or claims. The `flow` skill aligns this site's `PRODUCT.md`, `DESIGN.md`, `ARCHITECTURE.md`, and `GLOSSARY.md` after meaningful changes — it does not copy Flow's product identity from flow-skills. New specs and decisions follow [docs/decisions/0001-flow-adopter-docs.md](../decisions/0001-flow-adopter-docs.md); existing `docs/specs/homepage-genui/` and PDR/ADR trees stay in place. This site's lifecycle in [AGENTS.md](../../AGENTS.md) remains authoritative for checks and verification.

The `gabo` lock entry uses `gaboesquivel/gaboesquivel-skills`, so restoration does not depend on a sibling checkout. Change voice in `gaboesquivel-skills`, then run `bunx skills@latest update gabo -p -y` and commit the lock.

Add, update, and remove skills with the skills CLI so `.agents/skills/` matches the lock. `.agents/` is gitignored; the lock is the committed source.

Use each skill's name as it appears in the lock. Do not invent a `-vN` folder.

Basilic `/w-*` playbooks and third-party TDD skills (`tdd`, `test-driven-development`) are not installed; Flow's `build` and `review` own test practice, under the checks in this site's lifecycle.

Every listed skill's description loads in every session, so the lock keeps one skill per job and only skills for tools this repository uses (Flow spec 056, 2026-11-03). Not installed, and why:

- Covered by a Flow skill or this file's lifecycle: `spec-driven-development`, `planning-and-task-breakdown`, `idea-refine`, `interview-me`, `incremental-implementation`, `code-review-and-quality`, `code-simplification`, `api-and-interface-design`, `doubt-driven-development`, `debugging-and-error-recovery`, `diagnosing-bugs`, `shipping-and-launch`, `git-workflow-and-versioning`, `ci-cd-and-automation`, `documentation-and-adrs`, `context-engineering`, `using-agent-skills`, `source-driven-development`, `constraint-driven-development`, `deprecation-and-migration`, `observability-and-instrumentation`, `performance-optimization` (`vercel-optimize` and `vercel-react-best-practices` stay).
- Overlap with a kept skill: `design-taste-frontend` (Flow `design`; [DESIGN.md](../../DESIGN.md) locks the identity), `tailwind-css-patterns` (`tailwind-design-system`), `frontend-ui-engineering` (`frontend-design`, `building-components`, `web-design-guidelines`), `nextjs` (`next-dev-loop` and Next's bundled docs), `browser-testing-with-devtools` (`agent-browser`, which [verify.md](verify.md) uses).
- Design critics [DESIGN.md](../../DESIGN.md) does not rely on: `better-ui` (its press scale and shadow advice conflict with the site), `emilkowal-animations` (Framer-first), `find-animation-opportunities` (proposes motion beyond the budget).
- No matching dependency: `core` and `react` (json-render), `nuqs`, `vitest`, `upstash-ratelimit-js`. `upstash-redis-js` is dropped even though `@upstash/redis` is used: its description is over the 1,024-character limit, and third-party skill bodies are not edited here.

Before adding a skill, check that no installed skill covers the same job; measure with `node <flow-skills>/scripts/context.mjs --repo .` (listing budget ~4,000 tokens).

`.agents/skills/` is for repository work and changes through the lock. `agent/skills/` is the Eve runtime (`SKILL.md` and `references/` only). Do not copy catalog evals into `agent/skills/`. Edit that tree only when the task is about the running agent. The boundary is in [ARCHITECTURE.md](../../ARCHITECTURE.md).

Done when `skills-lock.json` and `.agents/skills/` name the same development skills, and `agent/skills/` changed only when the task was about the runtime agent.
