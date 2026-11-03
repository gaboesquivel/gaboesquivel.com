# Components

Detail split from [DESIGN.md](../../../DESIGN.md), which holds the identity, tokens, and rules for every page and wins on conflict. Read this file before adding or changing a component.

Reuse or extend primitives in [`components/shared/page-layout.tsx`](../../../components/shared/page-layout.tsx) and [`components/shared/spacing.ts`](../../../components/shared/spacing.ts). Interactive surfaces use shadcn Base UI (`base-nova`, [`components.json`](../../../components.json)) in [`components/ui/`](../../../components/ui/). Site tokens (`siteCardSurface`, `siteCardInteractive`, `siteFieldClass`) live in `spacing.ts`. If a pattern is missing, add it there or in the relevant `components/ui` primitive first — do not invent a parallel title, card, or section on a page.

| Job | Primitive | Source |
| --- | --- | --- |
| Primary nav | `<nav>` of `Link` rows (wrap, lowercase, `aria-current`) | `components/layout/navbar.tsx` |
| Page h1 | `PageTitle` / `IndexHeading` | `components/shared/page-layout.tsx` |
| Inner-page hero | `InnerPageHero` (`heroTitle` or compact `pageTitle`) | `components/shared/inner-page-hero.tsx` |
| Location / breadcrumb | `PageTrail` (slash-separated, mono meta; parent links only) | `components/shared/page-trail.tsx` |
| Section | `PageSection` | `components/shared/page-layout.tsx` |
| Body paragraph | `Prose` | `components/shared/page-layout.tsx` |
| Filter | `FilterNav` (plain `Link` with `aria-current`) | `components/shared/page-layout.tsx` |
| Text / route card | `PageCard` / `SiteCardLink` on `Card` | `components/shared/page-card.tsx`, `components/shared/site-card-link.tsx` |
| Project with image | `EditorialProjectCard` (cover frame) or bordered `ProjectCard` | `components/work/editorial-project-card.tsx`, `components/work/project-card.tsx` |
| Editorial feature, landscape, and banner | `EditorialWorkCard` | `components/work/editorial-work-card.tsx` |
| Registry cover frame | `ProjectCover` | `components/work/editorial-work-card.tsx` |
| Text-first project row | `ProjectTextRow` | `components/interior/project-text-row.tsx` |
| Work flagship | `FeaturedProjectCard` | `components/work/featured-project-card.tsx` |
| Work featured gallery | `WorkProjectGallery` | `components/work/work-project-gallery.tsx` |
| Capability route shell | `CapabilityPage` | `components/work/capability-page.tsx` |
| Interior editorial shell | `InteriorPageShell` | `components/interior/interior-page-shell.tsx` |
| Editorial intro | `PageIntro` (`narrative` on `/ai`, `/web3`, `/bio`) | `components/interior/page-intro.tsx` |
| Text/media split (12-col) | `SplitSection` + `SplitSectionContent` / `SplitSectionMedia` | `components/interior/split-section.tsx` |
| Article + sticky TOC | `ArticleShell`, `ArticleTocNav`, `ArticleTocInline` | `components/interior/article-shell.tsx` |
| Utility / legal reading | `ReadingPageShell` | `components/interior/reading-page-shell.tsx` |
| Writing lists (home, related, work, etc.) | `WritingPostsSection`, `LatestPosts`, `EditorialBlogList` | `components/blog/writing-posts-section.tsx`, `latest-posts.tsx`, `editorial-blog-list.tsx` |
| Writing index | `WritingIndex`, `WritingFeaturedPost`, `WritingRecentList` | `components/blog/writing-*.tsx` |
| Project case study | `ProjectCaseStudy` | `components/work/project-case-study.tsx` |
| In-post image width | `BlogImage` `layout="prose" \| "wide" \| "breakout"` | `components/mdx.tsx`, `app/global.css` |
| CV focus switcher | `FilterNav` (screen only, `print:hidden`) | `app/cv/page.tsx` |
| Section CTA | `ctaLink` / `sectionAction` | `components/shared/spacing.ts` |
| In-prose link | `proseLink` | `components/shared/spacing.ts` |
| Card grids | `CardGrid` or `blockGrid` | `components/shared/card-grid.tsx`, `spacing.ts` |
| Forms | `Field`, `Input`, `Textarea`; hairline + turquoise focus via `siteFieldClass` | `components/ui/field.tsx`, `app/contact/contact-form.tsx` |
| GenUI booking and contact forms | `GenuiBookingFlow`, `GenuiContactForm`, `WriteError`, `WriteReceiptCard` in a `WriteRail` | `components/genui/genui-booking-flow.tsx`, `genui-contact-form.tsx`, `genui-write-status.tsx` |

`PathLink` and `PageCard` use `SiteCardLink` and share the `cardArrow` nudge in `spacing.ts`.

Icons: Lucide only where already used (contact, print). Do not add icon-led feature rows.
