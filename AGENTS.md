<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# gaboesquivel.com

Narrative site. Voice, identity, and claims: installed `gabo` skill, which outranks any other writing skill on those three.

## Docs

- [PRODUCT.md](PRODUCT.md): read the relevant sections before changing page copy, routes, metadata, or blog links. Page jobs, evidence, keyword owners, and linking rules live there.
- [DESIGN.md](DESIGN.md): read before visual or interaction changes. Tokens, primitives, layout, motion, and accessibility rules live there.
- [README.md](README.md): setup for people.

## Skills

Skills come from `skills-lock.json` (`bun run skills:install` or `bun run skills:update`). Never author, copy, or commit `SKILL.md` here. Change voice in `gaboesquivel-skills`, then run `bunx skills@latest update gabo -p -y` and commit the lock.

Add, update, and remove skills with the skills CLI so `.agents/skills/` matches the lock.

Use each skill's name as it appears in the lock; do not invent a `-vN` folder. From `blockmatic/basilic-skills`, install only `workflow` (Basilic `/w-*` playbooks); tech and craft skills live in other catalogs per the lock.

## Two-repo workflow

The `gaboesquivel` package owns structured project, tech, experience, and CV variant data. This site owns narrative, routes, presentation, and print layout. Do not mix repositories in one commit or edit generated package output.

Package copy or types change: edit the package → `bun run build` there (it runs `generate` first) → `bun link` in the package → `bun link gaboesquivel` here → then edit site pages. Production installs the published npm version, so linked changes go live only after the package is published and the dependency here is updated.

Use package descriptions for project cards. Do not write separate project essays on site pages.

## `/ask` chat

Before changing the Eve agent, Jev slot layout, or chat UI, read the installed `eve`, `ai-sdk`, `core`, `react`, and `typesafe-ai` skills (bundled docs in `node_modules`, not memory). Then read Eve’s Web Chat scaffold source in `node_modules/eve/dist/src/setup/scaffold/create/web-template.js` (`agent-chat.tsx` / `agent-message.tsx` strings).

Credentials (two keys; do not conflate them):

- `AI_GATEWAY_API_KEY` — Eve gateway auth and Jev (`lib/connect/compose.ts`).
- `ANTHROPIC_API_KEY` — BYOK for Haiku on gateway (`lib/connect/haiku-model.ts`, `agent/agent.ts`).

Names are documented in `.env.example`. If a name is missing from `.env`, stop and ask. If it is set locally, use it and do not ask again. Never print values.

On Vercel, chat/book/note caps need Upstash Redis REST credentials. The app reads `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`, or the marketplace pair `KV_REST_API_URL` and `KV_REST_API_TOKEN`. Provision with the [Upstash for Redis](https://vercel.com/marketplace/upstash/upstash-kv) marketplace integration on project `gaboesquivel` (accept marketplace terms in the dashboard if the CLI prompts).

Calendar booking uses a **Google service account** with **domain-wide delegation** impersonating `GOOGLE_CALENDAR_ID` (default `contact@gaboesquivel.com`). Set `GOOGLE_SERVICE_ACCOUNT_JSON` and `GOOGLE_CALENDAR_ID` in `.env` and on Vercel Production and Preview. Provisioning (once): enable Calendar API in GCP project `gabo-esquivel`; create service account `gaboesquivel-ask-booking` and a JSON key (see [scripts/google-service-account.json.example](scripts/google-service-account.json.example)); in Google Admin authorize the service account client id for scopes `calendar.events` and `calendar.freebusy`; redeploy. JWTs use `sub` = the calendar id. No visitor OAuth and no key file at runtime.

Main files: `agent/agent.ts`, `app/connect/connect-chat.tsx`, `app/connect/eve-thread.tsx`, `lib/connect/compose.ts`, `lib/connect/haiku-model.ts`.

## Task scope

- Do not restyle or upgrade Next.js in a content pass.
- `/cv` stays the printable CV. `/work` and project-page templates are off-limits unless the task is explicitly about them.
- Blog MDX may be edited for voice alignment with landing pages. Do not rewrite 2012–2019 posts unless asked; they are a period archive. NEVER rewrite existing blog MDX in a landing-page pass.

When researching, spawn read-only agents in parallel for lookups that do not invent copy. One agent writes. Do not spawn to write, rewrite, outline, or find a better voice.

### Single blog post

Start with the brief, the `gabo` skill's relevant guidance, and PRODUCT's blog conventions and internal linking rules. Draft once the article's claims are supported; look up only specific missing facts. For related posts, search titles, descriptions, or topic keywords and read only promising matches, stopping when useful links are supported. A single article does not require a whole-site scan.

For a draft-only request, deliver the draft. When adding MDX to the repository, inspect the content schema or one existing post only as needed for publishing conventions, then run the applicable checks after the edit. Read framework code, design guidance, or export implementations only when the task changes their behavior.

## When things change

Page lists, identity facts, and the featured set are repeated in code. Update every copy in the same change:

- Site page added, renamed, or re-scoped: `PRODUCT.md`, `components/layout/navbar.tsx` (primary nav only), `lib/landing-pages.ts` (`/explore`), `app/sitemap.ts`, `scripts/llms/routes.ts`, `scripts/llms/corpus.ts`, `scripts/llms/pages.ts`, and `scripts/llms/authority.ts` if its place in the authority order changes. An ordinary blog post using the existing blog template is excluded unless it changes route architecture or export behavior.
- Hire terms or identity facts (location, time zone, languages): the `gabo` skill's Identity first, then `PRODUCT.md` (`/ask`), `components/shared/lets-connect.tsx`, `scripts/llms/pages.ts`, `scripts/llms/corpus.ts`, and `scripts/llms/authority.ts`.
- Featured projects: the package's `featured` allowlist first, then `scripts/llms/projects.ts` and `scripts/llms/authority.ts`.
- Tokens, primitives, layout, motion budget, or accessibility conventions: `DESIGN.md`.

## Checks

- `bun run dev`: Velite watch and Next.js at `https://gaboesquivel.localhost` (Next listens on port 3099). `bun run setup:portless` trusts the local certificate once.
- `bun run verify`: Velite content build and Ultracite (`oxlint` + `oxfmt`).
- `bun run test:llms`: the llms export, blog, and CV page-break tests. Run it after page, blog, or CV changes.
- `bun run verify:routes [base-url]`: curls `/`, the `/cv` variants, `/ask`, sample posts, and the `/cal` redirect. Needs a local content build (`bun run content:build`, or a running `bun run dev`) and a reachable server (default `http://localhost:3099`).
- `bun run verify:calendar`: calls Calendar `freeBusy` using `GOOGLE_SERVICE_ACCOUNT_JSON` and `GOOGLE_CALENDAR_ID` from the environment. Run after Admin delegation is authorized. `sh scripts/sync-google-calendar-vercel.sh` pushes those vars from the environment to Vercel Production and Preview.
- Pre-commit (simple-git-hooks) runs `ultracite fix` on staged files, then when `app/cv/`, `app/global.css`, or `components/shared/contact-info.tsx` is staged, runs `bun run cvs`: the CV PDFs are printed with local Google Chrome (it starts `next dev` on port 3099 if nothing is running), then the PDFs and `app/cv/page-breaks.ts` are staged.

## Git

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject` (for example `docs: add PRODUCT.md`, `content(ai): align page copy`). Common types: `docs`, `content`, `feat`, `fix`, `chore`.
