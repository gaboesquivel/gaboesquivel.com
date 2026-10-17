<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# gaboesquivel.com

Narrative site. Voice and identity: installed `gabo` skill. Optional second pass: `human-writing`; `gabo` wins conflicts.

## Documentation

| Doc | Read when |
| --- | --- |
| [PRODUCT.md](PRODUCT.md) | Routes, narrative, metadata, SEO, blog linking, page jobs and evidence |
| [DESIGN.md](DESIGN.md) | Visual layout, components, motion, accessibility inside the existing system |

Update `PRODUCT.md` when page jobs, evidence, or keyword owners change. Update `DESIGN.md` when tokens, primitives, motion budget, or responsive/accessibility conventions change.

## Skills

Skills come from `skills-lock.json` (`bun run skills:install` or `bun run skills:update`). Never author, copy, or commit `SKILL.md` here. Change voice in `gaboesquivel-skills`, then update the lock.

Use each skill's name as it appears in the lock; do not invent a `-vN` folder. From `blockmatic/basilic-skills`, install only `workflow` (Basilic `/w-*` playbooks); tech and craft skills live in other catalogs per the lock.

## Two-repo workflow

The `gaboesquivel` package owns structured project, tech, experience, and CV variant data. This site owns narrative, routes, presentation, and print layout. Do not mix repositories in one commit or edit generated package output.

Package copy or types change: edit package → `bun run generate` and `bun run build` → `bun link` in the package → `bun link gaboesquivel` here → then edit site pages.

Use package descriptions for project cards. Do not write separate project essays on site pages.

Do not restyle or upgrade Next.js in a content pass. `/cv` stays the printable CV. `/work` and project-page templates are off-limits unless the task is explicitly about them.

Blog MDX may be edited for voice alignment with landing pages. Do not rewrite 2012–2019 posts unless asked; they are a period archive. NEVER rewrite existing blog MDX in a landing-page pass.

When researching, spawn read-only agents in parallel for lookups that do not invent copy. One agent writes. Do not spawn to write, rewrite, outline, or find a better voice.

## Commands

- `bun run dev` — Velite watch + Next.js on port **3099**
- `bun run verify` — content build + lint
- `bun run verify:routes` — route sanity script

Other scripts: `package.json`.

## Git

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject` (for example `docs: add PRODUCT.md`, `content(ai): align page copy`). Common types: `docs`, `content`, `feat`, `fix`, `chore`. One logical change per commit. Do not mix gaboesquivel package changes in the same commit.

## Design (summary)

Before visual or UX changes, read [DESIGN.md](DESIGN.md). Reuse `components/shared/spacing.ts` and `page-layout.tsx`. No new palette, type pairing, or signature element unless the task explicitly allows it. No restyle of `/work`, `/project/[slug]`, or `/cv` during a content pass.
