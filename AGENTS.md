<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# gaboesquivel.com

Narrative site. Voice, identity, and claims: installed `gabo` skill, which outranks any other writing skill on those three.

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
- **GenUI / MCP quality** — contract, fixture lab, evals, protocol, or MCP Apps host tests: [docs/testing/README.md](docs/testing/README.md).
- **Setup** — install, the dev server, or certificate trust: [README.md](README.md).

## Git

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject` (for example `docs: add PRODUCT.md`, `content(ai): align page copy`). Common types: `docs`, `content`, `feat`, `fix`, `chore`.
