<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# gaboesquivel.com

Narrative site. Voice, identity, and claims: installed `gabo` skill, which outranks any other writing skill on those three. Its source is `skills/gabo/` in [gaboesquivel/gaboesquivel](https://github.com/gaboesquivel/gaboesquivel), the same repo as the `gaboesquivel` package; change identity, positioning, or voice there, not here.

`skills-lock.json` pins it for coding agents (`.claude/skills` links to the ignored `.agents/skills`). The site agent cannot read that install, so `agent/skills/gabo/` commits a runtime copy of `SKILL.md` and `references/`. After a skill change lands upstream, run `bunx skills@latest update gabo -p -y`, then `cp .agents/skills/gabo/SKILL.md agent/skills/gabo/` and `cp .agents/skills/gabo/references/*.md agent/skills/gabo/references/`, and commit the lock and the copy together.

Prefer a CLI to interact with a product or service. Use MCP when no CLI covers the operation.

## `__dev`

`__dev/` holds local temporary files only (gitignored). Never reference it from anything that ships, commit it, or treat it as a source of truth.

## Decisions

If a proposed change conflicts with or modifies an established documented decision, request approval before implementing it. Otherwise, proceed autonomously.

Update the owning document in the same change. For **new** consequential rationale, prefer a numbered record in `docs/decisions/NNN-short-name.md` ([0001](docs/decisions/0001-flow-adopter-docs.md)). Existing `docs/pdr/` and `docs/adr/` records remain valid; add to those trees only when extending prior work already filed there. Include context, decision, rationale, consequences, and status. Canonical documents hold current direction. Create a record only when that rationale cannot be inferred from the code.

## Specification storage

For **new** bounded work, prefer flat `docs/specs/NNN-short-name.md` ([0001](docs/decisions/0001-flow-adopter-docs.md)). Existing feature folders stay authoritative for work already there — especially `docs/specs/homepage-genui/` (capability map and `SPEC-<module-id>.md` modules).

## Context

Read the matching document before editing:

- **Product** — page jobs, routes, metadata, blog links, keyword owners, or discoverability: [PRODUCT.md](PRODUCT.md).
- **Setup** — install, the dev server, or certificate trust: [README.md](README.md).

## Git

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject` (for example `docs: add PRODUCT.md`, `content(ai): align page copy`). Common types: `docs`, `content`, `feat`, `fix`, `chore`.
