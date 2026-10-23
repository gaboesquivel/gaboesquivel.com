# PDR: Interior editorial layout and article TOC

**Status:** Implemented (2026-10-22); composition refinement (2026-10-22)  
**Context:** Interior routes felt document-narrow on wide viewports with unresolved horizontal space. Homepage DS v2 is the brand reference and stays locked.

## Decision

Introduce a shared **interior composition layer** (`components/interior/`) with a breakout canvas, 12-column split primitives, and an **article grid** with build-time TOC from MDX headings (h2/h3, `github-slugger` aligned with `rehype-slug`). Nav and footer remain on the existing `siteColumn` shell; interior pages opt in via `InteriorPageShell`.

### Refinement (2026-10-22)

- Editorial canvas cap reduced from `100rem` to **`92rem`** (`interiorEditorialMax`) to avoid ultrawide emptiness.
- Article layout replaced the three-track grid (ghost left `1fr` column) with a **two-track** grid inside `articleLayoutRegion` (`max-w-6xl`): main prose (max `52rem`) + TOC rail. Reading position stays left-anchored across the `xl` breakpoint.
- `ReadingPageShell` no longer uses `InteriorPageShell`; utility routes stay on reading measure inside `siteColumn`.
- `SplitSection` gains `sectionSpacing` so nested editorial sections do not double `interiorSectionGap`.
- Blog **related writing** continues on `InteriorPageShell` with a hairline section break aligned to the article canvas.

### Refinement (2026-10-22, single column)

- Removed `interiorBreakout` / `interiorEditorialMax`; editorial and article interiors use the same `siteColumn` width as home and nav. `InteriorPageShell` is a full-width wrapper inside root `SiteWidth` only.

## Rationale

- Composition—not a wider prose `max-width` alone—fills desktop canvas without SaaS-style feature sections.
- Article TOC uses right-rail space while keeping paragraph measure ~52rem.
- Primitives avoid per-section one-off components (Biography section 1, 2, …).

## Consequences

- [DESIGN.md](../../DESIGN.md) documents interior widths and primitives; homepage `max-w-6xl` unchanged.
- [SITE-WIDE-IMPLEMENTATION-PLAN.md](../specs/design-system-v2/SITE-WIDE-IMPLEMENTATION-PLAN.md) P5 “blocked” is superseded for TOC by this PDR.
- Velite blog schema gains a `toc` field computed at content build.
- Interior shell applies to biography, capabilities, writing index, project case studies, contact/explore, and AI/Web3 narratives. Utility reading (`/docs`, `/privacy`, `/about`) uses `ReadingPageShell` only. `/`, `/ask`, and `/cv` stay on their existing shells.

### Refinement (2026-10-22, narrative pages)

- **Status:** accepted, explicitly requested in the AI/Web3/bio layout correction.
- **Context:** repeated project-card copy, narrow prose columns, and doubled nested spacing interrupted these narratives. Diagrams added visual weight without improving their page jobs.
- **Decision:** `/ai`, `/web3`, and `/bio` prohibit diagrams in any format. Retain the homepage design tokens and live narrative copy; use selected project figures and real photography beside readable prose.
- **Rationale:** evidence and typography should carry these pages; system explanations belong in relevant writing or project details.
- **Consequences:** project links remain available through figure captions and contextual links. Nested biography splits disable their own spacing. Blog illustration rules and the homepage remain unchanged.
