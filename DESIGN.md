---
name: gaboesquivel.com
description: Dark reading column for a product-engineer portfolio. Agents must reuse existing primitives; do not invent a new identity.
colors:
  primary: "#000000"
  secondary: "#ffffff"
  tertiary: "#5cded6"
  muted: "#a3a3a3"
  border: "rgba(255, 255, 255, 0.14)"
  hover-fill: "#262626"
typography:
  body:
    fontFamily: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
    fontSize: 1rem
    fontWeight: 400
  page-title:
    fontFamily: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
    fontSize: 1.5rem
    fontWeight: 700
    letterSpacing: -0.05em
  section-title:
    fontFamily: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
    fontSize: 1.5rem
    fontWeight: 600
    letterSpacing: -0.025em
rounded:
  sm: 6px
  md: 8px
  lg: 10px
spacing:
  block: 2rem
  section: 3rem
  title: 1.5rem
  heading-row: 2rem
  grid-gap: 1rem
---

# gaboesquivel.com design

## Overview

Dark reading column, not a marketing landing kit. Black canvas, white type, one turquoise accent (`#5cded6`), 2px accent top bar, lowercase mono nav, one `max-w-6xl` shell on every route. Photography is evidence (real workshop/project shots), not decoration. Feel: precise, thoughtful, quietly playful — whitespace and hierarchy over chrome.

Voice and identity facts live in the installed `gabo` skill. UI microcopy: sentence case, plain verbs, no marketing CTAs. Do not duplicate biography or hire terms here.

## Surfaces

Everything in this file applies to every page. Detail for one surface lives in its own file; read it when you change that surface:

- Homepage (portrait hero, editorial homepage): [docs/agents/design/home.md](docs/agents/design/home.md)
- Work index: [docs/agents/design/work.md](docs/agents/design/work.md)
- `/ai`, `/web3`, `/bio`, and `/contact`: [docs/agents/design/pages.md](docs/agents/design/pages.md)
- Editorial images: [docs/agents/design/editorial-images.md](docs/agents/design/editorial-images.md)
- GenUI booking and contact forms (homepage search and the search dialog): [docs/agents/design/ask.md](docs/agents/design/ask.md)

## Colors

| Token | Value | Use |
| --- | --- | --- |
| Canvas / primary | `#000000` (`bg-black`) | Page background |
| Text / secondary | `#ffffff` (`text-white`) | Body and headings |
| Accent / tertiary | `#5cded6` (`accent`, `text-accent`, `bg-accent`) | Top bar, active nav, `ctaLink`, focus rings |
| Muted | Tailwind `neutral-400` (`#a3a3a3`) | Meta, URLs, secondary labels. Not `neutral-500` for text (see Accessibility) |
| Hairline / border | `rgba(255, 255, 255, 0.14)` (`hairline`, `border-hairline`) | Cards, form fields, code blocks |
| Hover fill | `neutral-100` / `neutral-800` (`#262626`) | Card and path-link hover |

The turquoise accent is chosen to match the homepage portrait’s linework, keeping the interface, diagrams, and social artwork visually consistent.

One accent only. Hairline is the surface border. Prefer `neutral-*` over `zinc-*`, `gray-*`, or `slate-*` for new classes.

`<html>` always has the `dark` class (`app/layout.tsx`), and `dark:` is class-based (`app/global.css`), so on screen the `dark:` value of a light/dark pair is the one that renders: borders are `border-hairline`, hover fill is `neutral-800`. A light half, when a pair still has one, is `border-neutral-200`. `/cv` print has its own black-on-white styles. The active nav item stays `text-accent`, along with the top bar and `ctaLink`.

## Typography

Live face is system mono at normal weight: `html` uses `font-mono font-normal` in `app/layout.tsx` and `app/global-error.tsx`. Body is 400. Page titles stay `font-bold` (700). Section titles stay `font-semibold` (600).

`tailwind.config.mts` maps `font-sans` to `var(--font-graphik)`, but Graphik is **not loaded** in source. Do not “restore” Graphik, pair a display serif, or invent a second typeface unless the task explicitly loads a font.

Type scale and spacing tokens live in [`components/shared/spacing.ts`](components/shared/spacing.ts) (`pageTitle`, `sectionTitle`, `proseClass`, `blockSpacing`, `sectionSpacing`, grids). Theme colors live in [`tailwind.config.mts`](tailwind.config.mts): `accent` is `#5cded6`, `hairline` is `rgba(255, 255, 255, 0.14)`. Nav: lowercase mono, `tracking-tight`; no all-caps or display face.

## Layout and responsive behavior

Source: [`app/layout.tsx`](app/layout.tsx) and [`components/shared/spacing.ts`](components/shared/spacing.ts).

- Column: `SiteWidth` applies `homeColumn` (`max-w-6xl`, `px-4 sm:px-6 lg:px-8`) on every route, including nav and `main`. `siteColumn` is the same shell. Long-form copy uses `readingMeasure` (`max-w-[65ch]`) inside that shell for narrative blocks inside editorial layouts. `/ai`, `/web3`, and `/bio` keep that shell and set narrative copy to `editorialMeasure` (`max-w-[72ch]`); project panels and photography use the full shell. **Interior layout families** (homepage stays locked; do not widen nav/footer):
  - **Family A — Index:** `/`, `/work`, `/work/[type]`, `/tech`, and similar listings stay on `siteColumn` only.
  - **Family B — Editorial:** `/bio`, capability routes, `/project/[slug]`, `/ai`, `/web3`, writing index, contact, explore. Opt in via `InteriorPageShell` for shared section spacing and 12-column splits (`SplitSection`); content stays inside the same `siteColumn` shell as home—no viewport breakout.
  - **Family C — Articles:** `/blog/[slug]` uses `ArticleShell`: `articleLayoutRegion` (`max-w-6xl`) with a **two-track** grid (prose up to `52rem` + TOC `14–17rem` at `xl` / 1280px). No ghost left column. Below `xl`, desktop TOC hides (`ArticleTocNav`), inline TOC shows (`ArticleTocInline`, collapsed by default). Paragraphs, lists, quotes, and headings match wide figures at `min(52rem, 100%)` (`.blog-content`), so text and diagrams share one edge; `BlogImage` modes `prose` / `wide` / `breakout` in `app/global.css`.
  - **Family D — Utility reading:** `/docs`, `/privacy`, `/about` use `ReadingPageShell` (one left-aligned `readingMeasure` inside `siteColumn`, no per-page width overrides, no breakout canvas). `/cv` print unchanged.
- **Section spacing ownership:** `EditorialSection` and standalone `SplitSection` apply `interiorSectionGap`. Nested splits pass `sectionSpacing={false}` to avoid double major gaps.
- Post figures and code may exceed prose measure within the article column; breakout figures must not overlap the TOC rail or cause horizontal scroll. Hire lines in `LetsConnect` stay full shell, matching the homepage. The résumé document stays `max-w-4xl` on screen. `h-0.5 bg-accent` top bar. CV print stays `print:max-w-none`.
- Mobile first: one column below `md`. Default card grids go two-up at `md` (`twoColGrid` / `blockGrid`, `md:grid-cols-2`) — not bento
- **Exception:** `/explore` featured row uses `md:grid-cols-3` in `app/explore/page.tsx`; do not spread 3-up card grids elsewhere without an explicit task. The footer's three link columns are not a card grid.
- Homepage H1: all-white “Software for humans and agents.”, display scale in `heroTitle`; signature immediately beneath, name muted and current role turquoise. Do not restyle that hero. `/work` and all `/work/[type]` routes share one persistent `WorkIndexHero` (display `heroTitle`, two-line responsive lede, `PageTrail`) inside `app/work/layout.tsx`. `/ai`, `/web3`, `/bio`, `/blog`, capability routes, `/explore`, `/tech`, `/about`, and `/contact` open with `InnerPageHero` at the same display scale and `heroPitch`. Writing categories, technology pages, and project pages use the compact `pageTitle` form. `/cv`, `/docs`, and `/privacy` keep their own title treatments. `/ask` redirects to `/`.
- The primary nav wraps onto more lines on narrow screens (`flex-wrap`); there is no menu toggle. The items are `gabo`, `work`, `ai`, `web3`, `bio`, and `blog` (`components/layout/navbar.tsx`). `/ask` is not a nav item.
- `/ask` redirects to `/`. Booking and contact render as GenUI forms inside homepage search and the search dialog ([docs/agents/design/ask.md](docs/agents/design/ask.md)).
- Footer link lists use two columns below `sm`; the hire note spans the full width until `sm`, then the footer is three columns
- Page and project media: 16:9, `rounded-lg`, via `projectMedia`. Covers, project heroes, cards, GenUI project cards, and `/bio` chapter media use `object-cover`; per-slug focal positions and the intrinsic-width cap for small legacy sources live in `lib/work/project-cover.ts`. Adjust the focal position when a frame would crop the subject; do not edit the asset. The one `object-contain` frame is the project-page Artifacts gallery (`components/work/project-case-study.tsx`), which shows full screenshots on `bg-black`. Optional blog hero images and social exports follow the image rules below; do not bake rounded corners into image files.

## Elevation & Depth

None. No shadows, glows, glass, or grain. Hover is background fill or a 1px border shift, not elevation. Project-card image scale on hover is the one existing image motion; do not add new signature motion.

## Shapes

Radii derive from `--radius: 0.625rem` in `app/global.css` (`--radius-lg: var(--radius)`, `--radius-md` 0.8×, `--radius-sm` 0.6×).

- Surfaces, images, and the search dialog: `rounded-lg` (10px)
- Filter chips, form fields, and buttons: `rounded-md` (8px)
- `rounded-sm` is 6px; `rounded-xl` (14px) and larger are banned in site-authored code (`check:design`)
- Blog chips may stay `rounded-full`; do not introduce `rounded-2xl` or new full-pill surfaces elsewhere

## Components

Reuse or extend primitives in [`components/shared/page-layout.tsx`](components/shared/page-layout.tsx) and [`components/shared/spacing.ts`](components/shared/spacing.ts). Interactive surfaces use shadcn Base UI (`base-nova`, [`components.json`](components.json)) in [`components/ui/`](components/ui/). Site tokens (`siteCardSurface`, `siteCardInteractive`, `siteFieldClass`) live in `spacing.ts`. If a pattern is missing, add it there or in the relevant `components/ui` primitive first — do not invent a parallel title, card, or section on a page.

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

Motion budget: color/underline transitions, project-card image hover via `imageHover` in `components/shared/motion.ts` (`1.02` scale, `motion-safe:`), `→` nudge with `motion-safe:` (cards, path links, and the writing index), the `/contact` form status (`starting:` fade + scale via `enter` in the same file), `Button`, filter chips, path links, and the print button `:active` scale (`press` in the same file), and the `siteCardInteractive` `:active` scale. The current nav item is `text-accent` with `aria-current="page"` and has no underline. Use `emil-design-eng` for easing and press scale (`0.97`, `cubic-bezier(0.23, 1, 0.32, 1)`) inside this budget only — no page-load sequences or scroll hijack. If we add `:active` scale, use `0.97`, not `better-ui`'s `0.96`.

## Motion & View Transitions

**Status (2026-11-02):** Work category navigation uses React `<ViewTransition name="work-filter-indicator">` on the active filter chip (`components/work/work-filter-nav.tsx`), with 180ms easing scoped in `app/global.css`; the active label stays above the indicator during the morph (`view-transition-class: work-filter-label`, Chromium 137+ and Safari 18.4). Covers carry no view-transition names, so filter clicks animate only the indicator; a card-to-detail cover morph is not built. The root crossfade runs 180ms on the site curve, and `::view-transition { pointer-events: none }` keeps clicks reaching the page during a transition. Elsewhere, motion stays the budget above (CSS transitions, Tailwind `starting:` / `motion-safe:`, and `components/shared/motion.ts`). The search "Composing results…" shimmer uses CSS in `app/global.css` (`components/ai-elements/shimmer.tsx`). No `document.startViewTransition()` or global `@view-transition { navigation: auto; }`. No runtime animation libraries in site-authored code.

**Compatibility:** React `19.3.1` and Next.js App Router (`^16.4`) expose `<ViewTransition>` from `react`. Unsupported browsers keep route updates and active styling without animating the indicator. Transition types and `view-transition-class` need Chromium 125+ and recent Safari/Firefox; verify Safari when changing Work filter motion.

**Agent guidance:** Follow Next’s bundled guide at `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md` and [docs/agents/motion.md](docs/agents/motion.md) for new transitions.

**Future candidates (not implemented):** Shared-element morphs between project cards and detail pages, relocating the homepage GenUI prompt (`docs/specs/homepage-genui/`), directional route transitions, list reorder identity, and Suspense loading reveals — each must pass the motion budget gate and `prefers-reduced-motion`. Homepage generation itself is active.

**Principles when we implement:**

- Prefer native browser and React APIs over imperative DOM or third-party animation libraries unless a future requirement clearly needs one. Choose standards (CSS, View Transitions, WAAPI, other platform APIs) so behavior degrades cleanly on any supported browser and stack, not a single vendor runtime.
- Prefer declarative `<ViewTransition>` + transition-scoped updates (`startTransition`, Suspense, `useDeferredValue`; Next navigations count) over manual lifecycle orchestration.
- Keep simple micro-interactions on modern CSS (`transition`, `animation`, `@starting-style`, Tailwind `starting:` / `motion-safe:`) where they already fit the budget; add view-transition CSS only in scoped blocks (see Work filter indicator in `app/global.css`).
- Respect `prefers-reduced-motion`; degrade to instant updates where the API allows.
- Preserve SSR, accessibility, performance, and SEO; do not block paint for decorative motion.
- Use Next `Link` / `useRouter` `transitionTypes` only when directional navigation is product-approved; cross-document (MPA) transitions follow browser support and are out of scope until explicitly specified.

## Accessibility

- Contrast: text needs 4.5:1 on the black canvas (WCAG AA). `neutral-400` (the `muted` token) is about 8:1 and is the floor for text. `neutral-500` is about 4.4:1, just under, so no site-authored text uses it; `check:design` fails on `text-neutral-500`. It may still appear as a border or hover tint.
- Focus: `SiteCardLink` surfaces (`PageCard`, `PathLink`, `ProjectCard`, blog cards) and form fields draw an accent ring via `siteCardInteractive` or field primitives. Primary nav links keep the browser's default outline.
- External links: site chrome (nav, footer, including the footer's GitHub, X, and LinkedIn links) opens in the same tab. In-content external links (MDX posts, project links, technology official links) open in a new tab with `target="_blank"`, `rel="noopener noreferrer"`, and a visually hidden " (opens in new tab)" cue; use `newTabProps` and `NewTabCue` from `components/shared/new-tab-cue.tsx`. `mailto:`, `#` anchors, and site-relative links stay in the same tab.
- Navigation: the primary nav has `aria-label="Primary navigation"` and marks the current page with `aria-current="page"`.
- Skip link and landmarks: the first tab stop on every route is a "Skip to content" link to `<main id="main">` (`app/layout.tsx`). The footer renders after `<main>`, not inside it, so it exposes the `contentinfo` landmark.
- Colour scheme: `<html>` sets `scheme-dark`, so scrollbars and native inputs stay dark under an OS light theme; `components/tweet.css` keys its dark values to `.dark`, not `prefers-color-scheme`.
- Images: every `next/image` needs `alt`; describe what the photo shows.
- Reduced motion: the `cardArrow` nudge, the `/contact` form status, `press`, and `siteCardInteractive` use `motion-safe:` / `motion-reduce:`. Cover imagery uses `imageHover` (`1.02` under `motion-safe:` only).
- Print: the top bar, nav, and footer are `print:hidden`.

## Do's and Don'ts

Which routes may be restyled, and in which passes, is in [docs/agents/content.md](docs/agents/content.md).

**Do (UX inside the system)**

- Improve hierarchy, spacing on the existing scale, focus rings, contrast, empty/error states
- Reuse or extend `page-layout` / `spacing` primitives
- Tighten `zinc`/`gray` drift only in files already being edited
- Keep `/cv` print styles as a separate black-on-white surface (`app/global.css` print block)

**Don't (identity bans)**

- Invent a new palette, type pairing, or “signature” element
- Gradient blobs, numbered 01/02/03 markers, eyebrow labels, icon feature rows, stat strips, second accent
- Display serif, cream/terracotta defaults, broadsheet chrome, or acid-green redesigns of the turquoise bar

**How these are checked.** `bun run check:design` (part of `bun run verify`) fails in site-authored code (`app/`, `components/` except `components/ui/`, and `lib/`) on gradients, `zinc`/`gray`/`slate` classes, `shadow-*` classes, `backdrop-blur`, `rounded-xl`/`rounded-2xl`, display serif, inline `viewTransitionName` styles, and `text-neutral-500`, apart from the exceptions in Drift. The other bans (01/02/03 markers, eyebrow labels, feature rows, stat strips, a second accent, a new signature) need a look at the rendered page ([docs/agents/verify.md](docs/agents/verify.md)).

**Skills**

- `frontend-design` is a critic inside this brief (anti-slop, restraint). It must not invent palette, type, or a signature — this file wins.
- `better-ui` is a polish critic (concentric radius, optical alignment, named `transition` properties, icon stroke). Veto shadows, glows, grain, and new image outlines. Hover stays fill or a 1px border shift.
- `emil-design-eng` is the motion-value source inside the budget above. `emilkowal-animations` stays installed for Tailwind v4 mappings; do not cite it as authority.
- `review-animations` and `find-animation-opportunities` are user-invoked. Do not auto-expand motion; this file's budget is the gate.
- `tailwind-design-system` is for CSS/token architecture, not a page restyle.

## Drift

Intended surface border is `border-hairline`. Intended color family otherwise is `neutral-*`. Existing exceptions in `app/global.css`: `::selection` uses `bg-gray-800`, and some code blocks use `slate` / `#333`. Leave those in place during a design-docs pass. Do not spread them.

`check:design` allows these existing exceptions and no others: the shimmer and text-reveal gradients and the `gray`/`slate` uses in `app/global.css`, the vendor tweet theme in `components/tweet.css`, and the edge-fade mask in `components/work/work-filter-nav.tsx`. Fix one by removing it from the script's allowlist in the same change.

## Open questions

- Resolved (2026-11-03): text uses `neutral-400` or lighter. No site-authored `text-neutral-500` remains, and `check:design` keeps it out.
