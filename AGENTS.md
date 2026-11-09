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

## Context

Where each kind of fact lives across this site, the `gaboesquivel` package, and `gaboesquivel-skills`: [docs/agents/ownership.md](docs/agents/ownership.md).

Read the matching document before editing:

- **Product** — page jobs, routes, metadata, blog links, keyword owners, or discoverability: [PRODUCT.md](PRODUCT.md).
- **Images** — editorial images, social assets, or OG images: [docs/agents/images.md](docs/agents/images.md).
- **Checks** — what to run for a change: [docs/agents/checks.md](docs/agents/checks.md).
- **Content** — editing copy, a landing page, or a blog post: [docs/agents/content.md](docs/agents/content.md).
- **Propagation** — adding, renaming, or re-scoping a page, or changing hire terms, identity facts, or the featured set: [docs/agents/propagation.md](docs/agents/propagation.md).
- **Package** — project, technology, employment, or CV facts, or project-card copy: [docs/agents/package.md](docs/agents/package.md).
- **Ask** — the Eve agent, `/ask`, Jev slots, bookings, notes, or `/mcp`: [docs/agents/ask.md](docs/agents/ask.md).
- **GenUI / MCP quality** — contract, fixture lab, evals, protocol, or MCP Apps host tests: [docs/testing/README.md](docs/testing/README.md).
- **Setup** — install, the dev server, or certificate trust: [README.md](README.md).

## Git

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject` (for example `docs: add PRODUCT.md`, `content(ai): align page copy`). Common types: `docs`, `content`, `feat`, `fix`, `chore`.
