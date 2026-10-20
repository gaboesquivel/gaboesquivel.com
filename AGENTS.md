<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# gaboesquivel.com

Narrative site. Voice, identity, and claims: installed `gabo` skill, which outranks any other writing skill on those three.

Prefer a CLI to interact with a product or service. Use MCP when no CLI covers the operation.

## Decisions

If a proposed change conflicts with or modifies an established documented decision, request approval before implementing it. Otherwise, proceed autonomously.

Update the owning document in the same change. Use a PDR in `docs/pdr/` for a consequential product decision and an ADR in `docs/adr/` for a consequential architectural decision. Include context, decision, rationale, consequences, and status. Canonical documents hold current direction. Decision records hold rationale worth keeping. Create a record only when that rationale cannot be inferred from the code. Create `docs/pdr/` or `docs/adr/` with the first record.

## Lifecycle

Explore → Specify → Plan → Build → Review → Ship. Use the stages proportionally. A small change does not need research, a specification, a plan, or a decision record.

Explore, Specify, and Plan stay in the conversation until a decision or an acceptance criterion is needed. Build, Review, and Ship follow these steps:

1. Inspect the current diff and the relevant source. Load the documents and skills this file points at for the task. Leave unrelated work unchanged.
2. State observable acceptance criteria.
3. Implement the scoped change and update the document that owns any changed decision.
4. Run the checks in [docs/agents/checks.md](docs/agents/checks.md) that match the changed behavior. For UI, layout, or interaction changes, complete [docs/agents/verify.md](docs/agents/verify.md). Fix failures and recheck the affected behavior.
5. Report what changed, the checks actually run and their results, and any remaining blockers or unverified behavior. A proposed check is not verification evidence. The task is done when the owning documents match the change and that report names the commands and results.

## Context

Read the matching document before editing:

- **Product** — page jobs, routes, metadata, blog links, keyword owners, or discoverability: [PRODUCT.md](PRODUCT.md).
- **Design** — visual design, layout, motion, or components: [DESIGN.md](DESIGN.md).
- **Architecture** — data flow, integrations, generated outputs, or system boundaries: [ARCHITECTURE.md](ARCHITECTURE.md).
- **Glossary** — a project term's meaning is unclear: [GLOSSARY.md](GLOSSARY.md).
- **Content** — editing copy, a landing page, or a blog post: [docs/agents/content.md](docs/agents/content.md).
- **Propagation** — adding, renaming, or re-scoping a page, or changing hire terms, identity facts, or the featured set: [docs/agents/propagation.md](docs/agents/propagation.md).
- **Package** — project, technology, employment, or CV facts, or project-card copy: [docs/agents/package.md](docs/agents/package.md).
- **Ask** — the Eve agent, `/ask`, Jev slots, bookings, notes, or `/mcp`: [docs/agents/ask.md](docs/agents/ask.md).
- **Skills** — adding, updating, or removing a development skill, or changing voice: [docs/agents/skills.md](docs/agents/skills.md).
- **Setup** — install, the dev server, or certificate trust: [README.md](README.md).
- **Research** — background evidence in [docs/research/](docs/research/). Current direction stays in the root documents.

## Git

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject` (for example `docs: add PRODUCT.md`, `content(ai): align page copy`). Common types: `docs`, `content`, `feat`, `fix`, `chore`.
