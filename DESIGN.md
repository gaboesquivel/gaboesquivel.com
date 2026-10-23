---
name: gaboesquivel.com
description: Dark reading column for a product-engineer portfolio. Agents must reuse existing primitives; do not invent a new identity.
colors:
  primary: "#000000"
  secondary: "#ffffff"
  tertiary: "#5cded6"
  muted: "#737373"
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
  md: 8px
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

## Colors

| Token | Value | Use |
| --- | --- | --- |
| Canvas / primary | `#000000` (`bg-black`) | Page background |
| Text / secondary | `#ffffff` (`text-white`) | Body and headings |
| Accent / tertiary | `#5cded6` (`accent`, `text-accent`, `bg-accent`) | Top bar, active nav, `ctaLink`, focus rings |
| Muted | Tailwind `neutral-400` / `neutral-500` | Meta, URLs, secondary labels |
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
  - **Family C — Articles:** `/blog/[slug]` uses `ArticleShell`: `articleLayoutRegion` (`max-w-6xl`) with a **two-track** grid (prose up to `52rem` + TOC `14–17rem` at `xl` / 1280px). No ghost left column. Below `xl`, desktop TOC hides (`ArticleTocNav`), inline TOC shows (`ArticleTocInline`, collapsed by default). Paragraphs stay ~`65ch` (`.blog-content`); `BlogImage` modes `prose` / `wide` / `breakout` in `app/global.css`.
  - **Family D — Utility reading:** `/docs`, `/privacy`, `/about` use `ReadingPageShell` (reading measure inside `siteColumn`, no breakout canvas). `/cv` print unchanged.
- **Section spacing ownership:** `EditorialSection` and standalone `SplitSection` apply `interiorSectionGap`. Nested splits pass `sectionSpacing={false}` to avoid double major gaps.
- Post figures and code may exceed prose measure within the article column; breakout figures must not overlap the TOC rail or cause horizontal scroll. Hire lines in `LetsConnect` stay full shell, matching the homepage. The résumé document stays `max-w-4xl` on screen. `h-0.5 bg-accent` top bar. CV print stays `print:max-w-none`.
- Mobile first: one column below `md`. Default card grids go two-up at `md` (`twoColGrid` / `blockGrid`, `md:grid-cols-2`) — not bento
- **Exception:** `/explore` featured row uses `md:grid-cols-3` in `app/explore/page.tsx`; do not spread 3-up card grids elsewhere without an explicit task. The footer's three link columns are not a card grid.
- Homepage H1: all-white “Software for humans and agents.”, display scale in `heroTitle`; signature immediately beneath, name muted and current role turquoise. Do not restyle that hero. `/work`, `/ai`, `/web3`, `/bio`, `/blog`, capability routes, `/explore`, `/tech`, `/about`, and `/contact` open with `InnerPageHero` at the same display scale and `heroPitch`. Filtered work, writing categories, technology pages, and project pages use the compact `pageTitle` form. `/ask`, `/cv`, `/docs`, and `/privacy` keep their own title treatments.
- The primary nav wraps onto more lines on narrow screens (`flex-wrap`); there is no menu toggle. The items are `gabo`, `work`, `ai`, `web3`, `bio`, and `writing` (`components/layout/navbar.tsx`). `/ask` stays out of this nav while that experience is in progress (`PRODUCT.md`)
- `/ask` is the chat. The page shell matches every other route. The transcript and composer sit in a centered `max-w-3xl` column so the thread does not stretch across the shell. Header (accent bar + nav) scrolls with the page; footer hidden on that route only via `body:has([data-connect])`; viewport-locked body so the transcript scrolls and the composer stays at the bottom; suggestions wrap
- Footer link lists use two columns below `sm`; the hire note spans the full width until `sm`, then the footer is three columns
- Page and project media: 16:9, `rounded-lg`, via `PageImage` or `projectMedia`. Optional blog hero images and social exports follow the image rules below; do not bake rounded corners into image files.

## AI, Web3, and biography pages

The `/ai`, `/web3`, and `/bio` pages are editorial portfolio narratives, not diagram pages. They use coherent prose introductions, selected project evidence, authentic photography, and deliberate image/text compositions. Diagrams, decorative flowcharts, repetitive timeline widgets, and diagram substitutes are not used on these routes. Featured projects may use large horizontal compositions aligned with the homepage design system. Long-form career content should not be forced into repeated two-column grids. Project media is sourced from the canonical project image registry, so asset updates do not require page-specific changes. Blog diagram guidance below does not apply to these three routes; diagrams remain appropriate in technical articles when they explain something text alone cannot.

Use the homepage shell, monochrome type, turquoise links, hairline borders, and `rounded-lg` media. Introductions are one left-aligned block (`PageIntro` `narrative`): `heroTitle`, then `narrativeLead`, then supporting `narrativeCopy`. No second text column and no intro image. The first section uses `narrativeIntroGap` (56px mobile, 80px desktop). Later sections use `narrativeSectionGap` (64px mobile, 96px desktop). Whitespace separates chapters. Do not rule every chapter.

`/ai` and `/web3` present LegalAgent and ZTX with `EditorialWorkCard` `layout="feature"` (about 40% copy and 60% media, full shell width). Masterbots, Bitlauncher, Bitcash, Opyn, and RareMint use `layout="landscape"` in a two-up grid. `/web3` protocols are `ProjectTextRow` links, not image cards. The editorial description lives in the card. Do not repeat it beside a thumbnail. `/bio` uses `BioChapter` only for section spacing. NodeSchool is a full-width photograph at its real aspect ratio. Wink is media-left, about 55–58% of the row. The 2017 chapter is text-left with `gabo-coding.jpg` on the right. The 2024 chapter ends with `layout="banner"`, quieter than the `/ai` feature. Covers come from `resolveProjectImage`. Use `object-cover` and adjust focal position when a frame would letterbox; do not edit the asset.

End these pages with résumé and conversation links. Do not repeat `LetsConnect` above the footer. Open Graph for `/ai` and `/web3` keeps the package PNG paths in route metadata.

## Editorial images

Every editorial image communicates a specific idea from its article. Technical images show meaningful structures and relationships. Reflective images express the central experience through a clear visual metaphor. Both use the same palette, drawing style, spacing, and compositional discipline.

The approved direction is flat, diagram-like editorial illustration: pure black canvas, white and neutral-gray shapes and lines, and turquoise `#5cded6` marking the important relationship or subject. Use sparse, recognizable objects, clear boundaries, generous negative space, and consistent strokes. No dimensional rendering, shadows, glow, glass, grain, gradients, futuristic offices, robots, decorative code, or technology-logo collages. Organic subjects such as grass and trails use the same simplified drawing language. Photography and real project screenshots remain evidence and retain their original character.

Choose the visual structure from the content:

- Technical explanation: components, boundaries, connections, or flow.
- Engineering perspective: a comparison, tradeoff, progression, or feedback loop.
- Personal reflection: a concrete visual metaphor grounded in the author's account. Do not turn personal experience into a scientific causal claim.

Use image generation for conceptual artwork. Construct exact diagrams, arrows, labels, and factual relationships with SVG or another controlled layout tool. Add any typography after generation; never rely on generated text. In-article diagrams in `public/images/diagrams/` use this palette and the site monospace, and the page scales them to the content column width so they stay readable without horizontal scroll. Hero images do not contain the article title, logos, or a signature. No new triangle mark or monogram is approved. Social assets may use the author's name or domain as typeset attribution.

A **hero image** is the optional editorial raster for a blog post (`image` in MDX frontmatter). Posts may ship without one; listings omit the hero when `image` is omitted. Open Graph uses build-time title-led images at `public/images/og/blog/{slug}.png` (optional `ogImage` frontmatter overrides). In-article diagrams stay SVG or evidence imagery and are not hero images.

Produce blog hero images at 1600 × 900 and OG compositions at 1200 × 630. Recompose for other formats; do not stretch or blindly crop. The palette and geometry stay consistent across the website, LinkedIn, and X. Existing assets are not automatically approved references, and this policy does not authorize a bulk replacement of older images or changes to listing layouts.

Production specifications, the fixed generation brief, and the first three hero-image briefs live in [docs/agents/images.md](docs/agents/images.md). This is the current direction for new editorial imagery; existing assets migrate only in explicitly scoped tasks.

## Elevation & Depth

None. No shadows, glows, glass, or grain. Hover is background fill or a 1px border shift, not elevation. Project-card image scale on hover is the one existing image motion; do not add new signature motion.

## Shapes

- Surfaces and images: `rounded-lg` (8px)
- Filter chips: `rounded-md`
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
| Photo | `PageImage` (requires `alt`) | `components/shared/page-layout.tsx` |
| Filter | `FilterNav` (`Button` as `Link`) | `components/shared/page-layout.tsx`, `components/ui/button.tsx` |
| Text / route card | `PageCard` / `SiteCardLink` on `Card` | `components/shared/page-card.tsx`, `components/shared/site-card-link.tsx` |
| Project with image | `EditorialProjectCard` (cover frame) or bordered `ProjectCard` | `components/work/editorial-project-card.tsx`, `components/work/project-card.tsx` |
| Narrative project evidence | `ProjectFigure` (caption link, no card description) | `components/work/project-figure.tsx` |
| Editorial feature, landscape, and banner | `EditorialWorkCard` | `components/work/editorial-work-card.tsx` |
| Registry cover frame | `ProjectCover` | `components/work/editorial-work-card.tsx` |
| Text-first project row | `ProjectTextRow` | `components/interior/project-text-row.tsx` |
| Work flagship | `FeaturedProjectCard` | `components/work/featured-project-card.tsx` |
| Work featured gallery | `WorkProjectGallery` | `components/work/work-project-gallery.tsx` |
| Chat project row | `ProjectMedia` / `ProjectMediaStack` on `Card` | `components/work/project-media.tsx` |
| Capability route shell | `CapabilityPage` | `components/work/capability-page.tsx` |
| Interior editorial shell | `InteriorPageShell` | `components/interior/interior-page-shell.tsx` |
| Editorial intro | `PageIntro` (`narrative` on `/ai`, `/web3`, `/bio`) | `components/interior/page-intro.tsx` |
| Text/media split (12-col) | `SplitSection` + `SplitSectionContent` / `SplitSectionMedia` | `components/interior/split-section.tsx` |
| Article + sticky TOC | `ArticleShell`, `ArticleTocNav`, `ArticleTocInline` | `components/interior/article-shell.tsx` |
| Utility / legal reading | `ReadingPageShell` | `components/interior/reading-page-shell.tsx` |
| Writing lists (home, related, work, etc.) | `WritingPostsSection`, `LatestPosts` (`variant="editorial"`), `EditorialBlogList` | `components/blog/writing-posts-section.tsx`, `latest-posts.tsx`, `editorial-blog-list.tsx` |
| Writing index | `WritingIndex`, `WritingFeaturedPost`, `WritingRecentList` | `components/blog/writing-*.tsx` |
| Project case study | `ProjectCaseStudy` | `components/work/project-case-study.tsx` |
| In-post image width | `BlogImage` `layout="prose" \| "wide" \| "breakout"` | `components/mdx.tsx`, `app/global.css` |
| Section CTA | `ctaLink` / `sectionAction` | `components/shared/spacing.ts` |
| In-prose link | `proseLink` | `components/shared/spacing.ts` |
| Card grids | `CardGrid` or `blockGrid` | `components/shared/card-grid.tsx`, `spacing.ts` |
| Forms | `Field`, `Input`, `Textarea`; hairline + turquoise focus via `siteFieldClass` | `components/ui/field.tsx`, `app/contact/contact-form.tsx`, `app/connect/connect-fields.tsx` |
| Connect generative cards | `ConnectCard` (`Card`), `Button` (`siteAccent` / `siteQuiet`), `ToggleGroup` chips | `app/connect/connect-gen-ui.tsx` |

`PathLink` and `PageCard` use `SiteCardLink` and share the `cardArrow` nudge in `spacing.ts`.

Icons: Lucide only where already used (contact, print). Do not add icon-led feature rows.

Motion budget: color/underline transitions, project-card image scale, `→` nudge with `motion-safe:` (cards, path links, and the writing index), connect status, approval card, and connect generative cards (`starting:` fade + scale via `enter` in `components/shared/motion.ts`), connect starter, Send, Stop, approval, filter chips, and the CV download `:active` scale, and `siteCardInteractive` `:active` scale (`press` in the same file). The current nav item is `text-accent` with `aria-current="page"` and has no underline. Use `emil-design-eng` for easing and press scale (`0.97`, `cubic-bezier(0.23, 1, 0.32, 1)`) inside this budget only — no page-load sequences or scroll hijack. If we add `:active` scale, use `0.97`, not `better-ui`'s `0.96`.

## Motion & View Transitions

**Status (2026-10-22):** Stack prepared; **no** React `<ViewTransition>` wrappers, view-transition CSS, or `document.startViewTransition()` calls are in the app yet. Today’s motion stays the budget above (CSS transitions, Tailwind `starting:` / `motion-safe:`, and existing `components/shared/motion.ts` helpers). The site `motion` package dependency serves current connect UI only; native view transitions are not a reason to add animation libraries.

**Compatibility:** React `19.3.1` and Next.js App Router (`^16.4`) already expose `<ViewTransition>` from `react`, `startTransition`, and `addTransitionType`. Next documents App Router view transitions with **no** `experimental.viewTransition` flag. Unsupported browsers render updates without animation. Transition types and `view-transition-class` need Chromium 125+ and recent Safari/Firefox; treat Safari timing as a verify target when we implement.

**Agent guidance:** Install and use the `vercel-react-view-transitions` skill (`skills-lock.json`) for future implementation work. Follow Next’s bundled guide at `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`.

**Preferred future approach (not implemented):** Native browser View Transitions via React’s declarative `<ViewTransition>` — shared-element morphs between cards and detail pages, route navigation transitions, homepage search relocation when GenUI ships (`docs/specs/homepage-genui/`), declarative in-route content replacement, list reorder/filter identity, and Suspense loading reveals. Each addition must stay inside the motion budget gate in this file and respect `prefers-reduced-motion`.

**Principles when we implement:**

- Prefer native browser and React APIs over imperative DOM or third-party animation libraries unless a future requirement clearly needs one.
- Prefer declarative `<ViewTransition>` + transition-scoped updates (`startTransition`, Suspense, `useDeferredValue`; Next navigations count) over manual lifecycle orchestration.
- Keep simple micro-interactions on CSS where they already fit the budget.
- Respect `prefers-reduced-motion`; degrade to instant updates where the API allows.
- Preserve SSR, accessibility, performance, and SEO; do not block paint for decorative motion.
- Use Next `Link` / `useRouter` `transitionTypes` only when directional navigation is product-approved; cross-document (MPA) transitions follow browser support and are out of scope until explicitly specified.

## `/ask` generative UI

Conversation carries intent; interactive cards carry data entry and confirmation. The model calls `list_slots`, `book`, and `send`; React owns layout, validation, and local UI state without extra chat turns for ordinary picker navigation.

**Principles**

- One card surface per workflow step: shadcn `Card`, hairline border, `rounded-lg`, `p-4`, `max-w-md`, `gap-3`, mono type, turquoise focus rings — see `ConnectCard` in `app/connect/connect-gen-ui.tsx`.
- Progressive disclosure: booking shows duration, visitor time zone, and the next few starts before an in-place expand for week navigation and a responsive time grid (`app/connect/slot-picker.tsx`, logic in `lib/connect/slot-display.ts`).
- Stateful flows: availability → details → approval → receipt. Contact fields persist when the visitor changes time. The discussion field is never prefilled from chat history.
- Shared fields and actions: `connect-fields.tsx`, `ConnectPrimaryButton` / `ConnectSecondaryButton`, `DurationToggle` chips with `aria-pressed` and accent border when selected.
- Approval: `ConnectApprovalForm` edits name, email, and topic once more; primary label names the action (`Book …`, `Send email`).
- Receipts: compact `BookReceipt` and `NoteReceipt` cards with shimmer while pending, neutral or red status text when settled, definition lists for summary fields. After a slot is chosen, the picker collapses to a read-only summary (`picker-lock.ts`); approval and receipt cards disable repeat submission.
- Responsive: generative cards stay `max-w-md` in the chat column; expanded time grids use two columns on narrow viewports and three from `sm` up. Verify with `agent-browser set viewport <w> <h>`.
- Motion: existing `enter` on card mount only; no decorative animation. Loading uses `Shimmer` on status lines.
- Time zones: IANA identifiers in a native `select`; slots rebucket client-side when the display zone changes. Business hours stay America/Denver server-side.
- Accessibility: grouped times with `role="group"` and `aria-label`, keyboard-focusable chips and buttons, `tabular-nums` on times, reduced motion via existing `motion-safe` / `motion-reduce` on press styles. After the visitor leaves the empty state, `/ask` keeps a screen-reader-only `h1` (`connect-chat.tsx`) so the page still has a level-one heading.

## Accessibility

- Contrast: text needs 4.5:1 on the black canvas (WCAG AA). `neutral-400` is about 8:1. `neutral-500` (the `muted` token) is about 4.4:1, just under. Inactive nav items use `neutral-400` (`navbar.tsx`). Some meta text still uses `neutral-500`. See Open questions.
- Focus: `SiteCardLink` surfaces (`PageCard`, `PathLink`, `ProjectCard`, blog cards) and `/ask` fields draw an accent ring via `siteCardInteractive` or field primitives. Primary nav links keep the browser's default outline.
- Navigation: the primary nav has `aria-label="Primary navigation"` and marks the current page with `aria-current="page"`.
- Images: `PageImage` requires `alt`; describe what the photo shows.
- Reduced motion: the `cardArrow` nudge, connect status, approval card, slot picker, starter and send press, and `siteCardInteractive` press use `motion-safe:` / `motion-reduce:`. Editorial and flagship covers scale to `1.02` only under `motion-safe:`. The bordered `ProjectCard` image zoom (`scale-110`) still runs without that gate.
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

**Skills**

- `frontend-design` is a critic inside this brief (anti-slop, restraint). It must not invent palette, type, or a signature — this file wins.
- `better-ui` is a polish critic (concentric radius, optical alignment, named `transition` properties, icon stroke). Veto shadows, glows, grain, and new image outlines. Hover stays fill or a 1px border shift.
- `emil-design-eng` is the motion-value source inside the budget above. `emilkowal-animations` stays installed for Tailwind v4 mappings; do not cite it as authority.
- `review-animations` and `find-animation-opportunities` are user-invoked. Do not auto-expand motion; this file's budget is the gate.
- `tailwind-design-system` is for CSS/token architecture, not a page restyle.

## Drift

Intended surface border is `border-hairline`. Intended color family otherwise is `neutral-*`. Existing exceptions in `app/global.css`: `::selection` uses `bg-gray-800`, and some code blocks use `slate` / `#333`. Leave those in place during a design-docs pass. Do not spread them.

## Open questions

- `muted` text (`neutral-500`) is just under AA on black. Move it to `neutral-400`, or keep `neutral-500` for non-essential labels only?
- The `ProjectCard` image zoom (`group-hover:scale-110`) is the one image motion, but it is not behind `motion-safe:`. Gate it, or leave it as is?

## Homepage portrait hero

The homepage portrait ships as `public/images/gabo-portrait.webp` (1433×1098; edit the file in place, no facial retouch). Provenance and hash live in `assets/homepage/v2/manifest.json`. `PortraitMedia` overlays crisp SVG geometry in empty background coordinates only: a partial arc, sparse grid and dot reticle, vertical axis with PRODUCT, DESIGN, ENGINEERING, and DELIVERY, and a small plus near the collar. No glow, bloom, shadow, or decorative gradient.

The split layout uses normal grid flow. The left column contains the white H1, muted name/turquoise role, and an end-to-end pitch. The full-width search sits beneath both columns. Mobile stacks without clipping. The older master remains the independent personal OG source; no project OG or hero is replaced by homepage covers.

## Editorial homepage

`homeColumn`, `homeSection`, `editorialGrid`, `editorialLink`, `heroTitle` and `heroPitch` extend the existing spacing system. `SiteWidth` applies that homepage shell on every route. It does not import page content into a client graph. Navigation, main and footer share width. Narrative copy stays on `readingMeasure`. The résumé keeps its screen measure. CV print width stays unchanged.

Selected work is LegalAgent, Wink, ZTX and Bitlauncher in `EditorialProjectList`. The grid is one column until the editorial container is `48rem` wide, then two columns. `EditorialProjectCard` shows the registry cover when one exists, otherwise the package image in the same frame, plus name, verified `role`, and description in `projectCardDescription` (`line-clamp-3`, shared with `FeaturedProjectCard` and filtered work grids). Package facts remain authoritative. `lib/work/project-cover.ts` owns reusable media presentation, with reproducible 16:9 derivatives and provenance under `assets/work/covers/`. ZTX uses the existing Genesis Home Mint screenshot until a verified purple character asset is supplied; the character direction remains approved, not fabricated.

Focus uses lightly ruled typographic links. Writing uses four latest dated editorial entries. Career uses two compact links. Work together retains the existing hire terms. Footer content stays unchanged.

Search is currently a local published-content index, Enter-only, IME-safe and disabled without JavaScript with browse/contact fallbacks on the homepage inline field. Cmd/Ctrl+K and the nav Search control open the same field on `/` (focus and scroll) or a full-width dialog elsewhere; the homepage shows a fine-pointer `⌘K` / `Ctrl K` hint only. The field keeps the approved conversational placeholder for sighted users; the accessible name and hint describe keyword search over projects, writing, career, and contact, and state that Enter lists matches locally rather than opening live chat. It neither invokes a model nor replaces the initial SSR sections. The future sticky generative behavior remains specified in `docs/specs/homepage-genui/`. The top-right chat button opens an accessible right-side sheet, with an explicit link to the existing conversation on `/ask`; inline chat migration remains deferred. No theme toggle or send control on the search field.

Alternative project arrangements are documented in [the v2 implementation scope](docs/specs/design-system-v2/IMPLEMENTATION.md) for future GenUI use, not competing homepage layouts.

## Work index (`/work`)

`/work` shares the homepage shell width (`homeColumn` via `SiteWidth`). `InnerPageHero` supplies the large white heading, `PageTrail` location line, and pitch; filtered `/work/[type]` routes reuse the same primitive in compact mode with copy from `lib/work-types.ts` and a `work` → type trail. Writing categories, technology categories, technology detail pages, and project pages use that compact hero and the same `PageTrail` primitive.

Featured work is six package slugs in fixed order: LegalAgent flagship (`FeaturedProjectCard`, outside the editorial container), then Wink and ZTX in the editorial two-column grid, Bitlauncher as a wide editorial row, Opyn and EOS Costa Rica in a second two-column row. The pairs switch at a `48rem` container width. Registry covers from `lib/work/project-cover.ts` apply where defined; remaining slugs use package hero imagery with the same `object-cover` framing. Verified `role` uses `projectRole` (turquoise, small): under the title on editorial cards, and between the title and description on project pages. Type filters use the hairline segmented `FilterNav` (unchanged route map). Writing below the grid is three latest editorial entries with a `/blog` action, matching the homepage writing pattern.

Filtered `/work/[type]` pages use the same editorial masonry as `/tech` project lists (`EditorialProjectList` / `EditorialProjectCard`) and the compact hero. Bordered `ProjectCard` remains for capability evidence when `ProjectEvidence` uses `presentation="card"`.

Capability routes that still use `CapabilityPage` share the same shell and `readingMeasure` for narrative blocks. `ProjectEvidence` fills mixed slug lists: `presentation="card"` (bordered), `presentation="registry"` (editorial only when every slug has a `projectCover` entry), or `presentation="editorial"` (editorial cover with package image fallback). Pass `imageSizes` for that shell: `editorialCoverSizes` / `workCoverSizes` for editorial and wide evidence, `projectCardSizes` for two-up cards. Do not use `ProjectEvidence` or `ProjectFigure` for the `/ai`, `/web3`, and `/bio` narratives; those routes use `EditorialWorkCard`, `ProjectCover`, and `ProjectTextRow` as described above. Homepage and `/work` project cards use `object-cover` in their aspect frames; adjust focal position when a crop would clip the subject. Open Graph for `/ai` and `/web3` keeps the package PNG paths in route metadata.

## Contact (`/contact`)

`InnerPageHero` stays full width, same display scale as the other inner pages. From `lg`, the hire facts and the form sit side by side (`1fr` and a 26rem column). The form is part of the server render, so the first paint includes the fields. The message box is `h-44` / `sm:h-52` so the column stays close to the copy. Mobile stacks the facts, then the form.

## Career story (`/bio`)

`/bio` stays on `siteColumn` and does not use the `/ai` or `/web3` card sequence. `BioChapter` only supplies section spacing. It does not draw a rule or force a split. The 2010 chapter is prose, then the NodeSchool photograph at full shell width and its real ratio. The 2015 chapter places the Wink registry cover on the left. The 2017 chapter places `gabo-coding.jpg` on the right. The 2024 chapter ends with one LegalAgent banner. Do not route `/bio` through `CapabilityPage` or add a second project gallery inside a chapter.
