# Propagation

Page lists, identity facts, and curated project sets are repeated in code. Update every copy in the same change. See [ownership.md](ownership.md) for which file owns each kind of fact.

- Site page added, renamed, or re-scoped: `PRODUCT.md`, `components/layout/navbar.tsx` (primary nav only), `lib/landing-pages.ts` (`/explore`), `app/sitemap.ts`, `scripts/llms/routes.ts`, `scripts/llms/corpus.ts`, `scripts/llms/pages.ts`, and `scripts/llms/authority.ts` if its place in the authority order changes. An ordinary blog post using the existing blog template is excluded unless it changes route architecture or export behavior.
- Site headline role, homepage pitch, or API tagline: `gaboesquivel-skills` `skills/gabo/references/identity.md`, then `lib/site-identity.ts`, `PRODUCT.md` (`/`), `app/page.tsx`, `app/layout.tsx`, `lib/api/profile.ts`, `lib/home-json-ld.ts`, `lib/og/constants.ts`, `lib/og/svg.ts`, and `scripts/llms/corpus.ts`.
- CV and off-site title: `references/identity.md` (CV and off-site title field), then package `content/cv/*.md` `professionalTitle` and `readme.md` where the profile title appears.
- Hire terms or identity facts (location, time zone, languages, booking URL): `references/identity.md` factual background first, then `lib/hire-terms.ts`, `components/shared/lets-connect.tsx`, `app/contact/page.tsx`, `components/shared/contact-info.tsx`, `components/layout/footer.tsx`, `scripts/llms/pages.ts`, `scripts/llms/corpus.ts`, and `scripts/llms/authority.ts`. `agent/instructions/SOUL.md` should point at `agent/skills/gabo/references/identity.md`, not restate facts.
- Featured project membership (six slugs): package `FEATURED_PROJECT_SLUGS` in `scripts/generate.ts` and each project `type: featured` under `content/projects/`.
- Featured project order on `/work` and llms sorting: `lib/work-types.ts` `featuredProjectSlugs` (must match package membership; `scripts/llms/export-llms.test.ts` guards this).
- Homepage selected work (four slugs): `lib/work/project-cover.ts` `homepageEditorialSlugs` and `PRODUCT.md` `/` evidence.

Done when every file in the matching list has been updated or explicitly checked and left unchanged because that copy does not include the fact.
