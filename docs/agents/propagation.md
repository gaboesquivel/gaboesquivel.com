# Propagation

Page lists, identity facts, and the featured set are repeated in code. Update every copy in the same change.

- Site page added, renamed, or re-scoped: `PRODUCT.md`, `components/layout/navbar.tsx` (primary nav only), `lib/landing-pages.ts` (`/explore`), `app/sitemap.ts`, `scripts/llms/routes.ts`, `scripts/llms/corpus.ts`, `scripts/llms/pages.ts`, and `scripts/llms/authority.ts` if its place in the authority order changes. An ordinary blog post using the existing blog template is excluded unless it changes route architecture or export behavior.
- Hire terms or identity facts (location, time zone, languages): the `gabo` skill's Identity first, then `PRODUCT.md` (`/ask`), `components/shared/lets-connect.tsx`, `scripts/llms/pages.ts`, `scripts/llms/corpus.ts`, and `scripts/llms/authority.ts`.
- Featured projects: the package's `featured` allowlist first, then `scripts/llms/projects.ts` and `scripts/llms/authority.ts`.

Done when every file in the matching list has been updated or explicitly checked and left unchanged because that copy does not include the fact.
