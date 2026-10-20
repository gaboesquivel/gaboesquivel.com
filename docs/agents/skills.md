# Development skills

Skills come from `skills-lock.json` (`bun run skills:install` or `bun run skills:update`). Author skills in their source repository. Do not copy a `SKILL.md` into this repository. This repository commits the lock.

Change voice in `gaboesquivel-skills`, then run `bunx skills@latest update gabo -p -y` and commit the lock.

Add, update, and remove skills with the skills CLI so `.agents/skills/` matches the lock. `.agents/` is gitignored; the lock is the committed source.

Use each skill's name as it appears in the lock. Do not invent a `-vN` folder.

Basilic `/w-*` playbooks are not installed.

`.agents/skills/` is for repository work and changes through the lock. `agent/skills/` is the Eve runtime. Edit that tree only when the task is about the running agent. The boundary is in [ARCHITECTURE.md](../../ARCHITECTURE.md).

Done when `skills-lock.json` and `.agents/skills/` name the same development skills, and `agent/skills/` changed only when the task was about the runtime agent.
