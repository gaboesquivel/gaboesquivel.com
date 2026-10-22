# PDR: Interior editorial layout and article TOC

**Status:** Implemented (2026-10-22)  
**Context:** Interior routes felt document-narrow on wide viewports with unresolved horizontal space. Homepage DS v2 is the brand reference and stays locked.

## Decision

Introduce a shared **interior composition layer** (`components/interior/`) with a breakout canvas (~100rem max), 12-column split primitives, and an **article grid** with build-time TOC from MDX headings (h2/h3, `github-slugger` aligned with `rehype-slug`). Nav and footer remain on the existing `siteColumn` shell; interior pages opt in via `InteriorPageShell`.

## Rationale

- Composition—not a wider prose `max-width` alone—fills desktop canvas without SaaS-style feature sections.
- Article TOC uses right-rail space while keeping paragraph measure ~52rem.
- Primitives avoid per-section one-off components (Biography section 1, 2, …).

## Consequences

- [DESIGN.md](../../DESIGN.md) documents interior widths and primitives; homepage `max-w-6xl` unchanged.
- [SITE-WIDE-IMPLEMENTATION-PLAN.md](../specs/design-system-v2/SITE-WIDE-IMPLEMENTATION-PLAN.md) P5 “blocked” is superseded for TOC by this PDR.
- Velite blog schema gains a `toc` field computed at content build.
- Interior shell applies to biography, capabilities, writing index, project case studies, about/contact/explore, AI/Web3 narratives, and narrow utility pages (`ReadingPageShell`). `/`, `/ask`, and `/cv` stay on their existing shells.
