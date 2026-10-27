<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# gaboesquivel.com

Narrative site. Voice, identity, and claims: installed `gabo` skill, which outranks any other writing skill on those three.

Prefer a CLI to interact with a product or service. Use MCP when no CLI covers the operation.

## Web platform (motion and interactivity)

Default to standards that work across browsers and deployment targets without tying behavior to a single framework or animation library.

- Prefer modern CSS for motion and UI state: `transition` / `animation`, `@starting-style`, named `transition` properties, `motion-safe` / `motion-reduce`, and view-transition pseudo-elements where appropriate.
- Prefer the View Transitions API via React `<ViewTransition>` and transition-scoped updates (`startTransition`, Suspense, `useDeferredValue`, framework navigations) over imperative `document.startViewTransition()` or global `navigation: auto` unless product and [DESIGN.md](DESIGN.md) explicitly approve.
- Reach for other native Web APIs (Web Animations API, `IntersectionObserver`, `Popover` / `dialog`, Scroll-driven animations) before polyfills or third-party packages.
- Do not add animation libraries (for example Framer Motion or GSAP) for effects CSS or built-in view transitions can carry. Existing dependencies and [DESIGN.md](DESIGN.md) exceptions (for example connect UI) stay as documented.
- Ship progressive enhancement: interaction and layout must work with motion off; unsupported browsers get instant updates; always respect `prefers-reduced-motion`.
- For new view transitions on this site, read Next’s bundled view-transitions guide under `node_modules/next/dist/docs/` and [docs/agents/motion.md](docs/agents/motion.md). Site-specific motion limits remain in [DESIGN.md](DESIGN.md).

## `__dev`

`__dev/` is a local bucket for temporary files only. Do not reference it from application or library code, imports, routes, or anything that ships. Do not commit its contents (it is gitignored). Do not treat paths under `__dev/` as source of truth for the site.

## Decisions

If a proposed change conflicts with or modifies an established documented decision, request approval before implementing it. Otherwise, proceed autonomously.

Update the owning document in the same change. For **new** consequential rationale, prefer a numbered record in `docs/decisions/NNN-short-name.md` ([0001](docs/decisions/0001-flow-adopter-docs.md)). Existing `docs/pdr/` and `docs/adr/` records remain valid; add to those trees only when extending prior work already filed there. Include context, decision, rationale, consequences, and status. Canonical documents hold current direction. Create a record only when that rationale cannot be inferred from the code.

## Lifecycle

Explore → Specify → Plan → Build → Review → Ship. Use the stages proportionally. A small change does not need research, a specification, a plan, or a decision record.

Explore, Specify, and Plan stay in the conversation until a decision or an acceptance criterion is needed. Build, Review, and Ship follow these steps:

1. Inspect the current diff and the relevant source. Load the documents and skills this file points at for the task. Leave unrelated work unchanged.
2. State observable acceptance criteria.
3. Implement the scoped change and update the document that owns any changed decision.
4. Run the checks in [docs/agents/checks.md](docs/agents/checks.md) that match the changed behavior. For UI, layout, or interaction changes, complete [docs/agents/verify.md](docs/agents/verify.md). Fix failures and recheck the affected behavior.
5. Report what changed, the checks actually run and their results, and any remaining blockers or unverified behavior. A proposed check is not verification evidence. The task is done when the owning documents match the change and that report names the commands and results.

## Specification storage

For **new** bounded work, prefer flat `docs/specs/NNN-short-name.md` ([0001](docs/decisions/0001-flow-adopter-docs.md)). Existing feature folders stay authoritative for work already there — especially `docs/specs/homepage-genui/` (capability map and `SPEC-<module-id>.md` modules). Early idea drafts remain in `docs/ideas/`. Plan and task locations continue to follow the applicable planning workflow.

## Context

Where each kind of fact lives across this site, the `gaboesquivel` package, and `gaboesquivel-skills`: [docs/agents/ownership.md](docs/agents/ownership.md).

Read the matching document before editing:

- **Product** — page jobs, routes, metadata, blog links, keyword owners, or discoverability: [PRODUCT.md](PRODUCT.md).
- **Design** — visual design, layout, motion, components, editorial images, social assets, or OG images: [DESIGN.md](DESIGN.md). Motion tokens and checks: [docs/agents/motion.md](docs/agents/motion.md). For image production, also read [docs/agents/images.md](docs/agents/images.md).
- **Architecture** — data flow, integrations, generated outputs, or system boundaries: [ARCHITECTURE.md](ARCHITECTURE.md).
- **Glossary** — a project term's meaning is unclear: [GLOSSARY.md](GLOSSARY.md).
- **Content** — editing copy, a landing page, or a blog post: [docs/agents/content.md](docs/agents/content.md).
- **Propagation** — adding, renaming, or re-scoping a page, or changing hire terms, identity facts, or the featured set: [docs/agents/propagation.md](docs/agents/propagation.md).
- **Package** — project, technology, employment, or CV facts, or project-card copy: [docs/agents/package.md](docs/agents/package.md).
- **Ask** — the Eve agent, `/ask`, Jev slots, bookings, notes, or `/mcp`: [docs/agents/ask.md](docs/agents/ask.md).
- **GenUI / MCP quality** — contract, fixture lab, evals, protocol, or MCP Apps host tests: [docs/testing/README.md](docs/testing/README.md).
- **Skills** — adding, updating, or removing a development skill, or changing voice: [docs/agents/skills.md](docs/agents/skills.md).
- **Setup** — install, the dev server, or certificate trust: [README.md](README.md).
- **Research** — background evidence in [docs/research/](docs/research/). Current direction stays in the root documents.

## Git

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject` (for example `docs: add PRODUCT.md`, `content(ai): align page copy`). Common types: `docs`, `content`, `feat`, `fix`, `chore`.
