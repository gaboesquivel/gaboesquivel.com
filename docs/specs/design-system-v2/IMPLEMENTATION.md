# Design System v2 implementation

Status: complete for default SSR homepage (2026-10-22 scope). Approved 2026-10-22. Scope: default SSR homepage and reusable visual foundations; no OpenUI or MCP migration.

## Audit and decisions

The handoff supersedes the narrow homepage, previous professional headline, Contact me hero link and boxed supporting sections. Existing AGENTS.md changes and public/images/profile-black.png are user work. The latter exactly matches the supplied face-reference.png (SHA-256 bfde3bb096fc097cfb29141552c8400e5e1129904b54d4512f15a4f5ac740439). Use an immutable copy under assets/homepage/v2; no facial edits. Existing master/OG portrait remain separate.

ZTX's repository asset shows Genesis Home Mint, not the proposed purple character. Ship that truthful fallback until approved character source art is supplied. Do not ship generated reference screens. Wink uses its existing white mobile UI source.

## File-level sequence and acceptance

1. `components/shared/spacing.ts`, `components/layout/site-width.tsx`, `app/layout.tsx`: explicit homepage width, SSR pathname-aware wrapper around server children; other routes retain 4xl and print widths.
2. `scripts/prepare-home-assets.ts` (`bun run assets:home`), `assets/homepage/v2/`, `assets/work/covers/`, `lib/work/project-cover.ts`: reproducible derivatives, source hashes, live vector geometry outside face, 16:9 real covers. No OG project changes.
3. `app/page.tsx`, `components/home/`, `components/work/project-card.tsx`, `components/blog/latest-posts.tsx`: exact white H1/signature, full-width prompt, editorial work variant, four latest writing entries and quieter supporting sections. No client fetch of initial content.
4. `components/layout/chat-sidebar.tsx`, `navbar.tsx`: right sidebar using existing dialog primitive; conversation migration remains staged. Search uses a small local source-backed index until GenUI is available, without replacing the SSR content or calling a model.
5. Current identity in metadata, JSON-LD, profile API, OG text and export sources; canonical PRODUCT/DESIGN/ARCHITECTURE and GenUI scope notes updated. Historical/package job titles unchanged.
6. Verification: run `bun run verify`, `bun run test:llms`, and `bun run build`; browser pass at desktop and mobile per [verify.md](../../agents/verify.md). Record results in the change report.

## Open blocker

- **ZTX cover:** Approved purple character-led direction; shipped cover remains Genesis Home Mint from `public/images/work/ztx.png` until verified character source art is supplied.

## Next: site-wide rollout

Executable plan: [SITE-WIDE-IMPLEMENTATION-PLAN.md](./SITE-WIDE-IMPLEMENTATION-PLAN.md). Planning handoff (background): [SITE-WIDE-PLAN-HANDOFF.md](./SITE-WIDE-PLAN-HANDOFF.md).

## Future presentation contracts

Editorial Grid is the sole default. Featured Pair, Horizontal Rail, Stacked Showcase, Minimal List, Editorial Split and Creative Mosaic are future composition patterns, not implemented alternatives. Future OpenUI experiences consume the same project cover registry and editorial primitives; facts remain source-bound. Search's sticky replacement transition, action forms and MCP host rendering stay in the homepage-genui module sequence.

Native React View Transitions (planned, not active): see [DESIGN.md](../../../DESIGN.md#motion--view-transitions) for stack readiness, principles, and future use cases (shared elements, route motion, GenUI search relocation, list/filter identity, Suspense reveals). Implementation waits on a scoped task; zero view-transition CSS or wrappers ship in the preparation pass.
