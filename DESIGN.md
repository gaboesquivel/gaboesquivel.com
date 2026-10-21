---
name: gaboesquivel.com
description: Dark reading column for a product-engineer portfolio. Agents must reuse existing primitives; do not invent a new identity.
colors:
  primary: "#000000"
  secondary: "#ffffff"
  tertiary: "#54e8b3"
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

Dark reading column, not a marketing landing kit. Black canvas, white type, one mint accent (`#54e8b3`), 2px accent top bar, lowercase mono nav, `max-w-4xl` content. Photography is evidence (real workshop/project shots), not decoration. Feel: precise, thoughtful, quietly playful — whitespace and hierarchy over chrome.

Voice and identity facts live in the installed `gabo` skill. UI microcopy: sentence case, plain verbs, no marketing CTAs. Do not duplicate biography or hire terms here.

## Colors

| Token | Value | Use |
| --- | --- | --- |
| Canvas / primary | `#000000` (`bg-black`) | Page background |
| Text / secondary | `#ffffff` (`text-white`) | Body and headings |
| Accent / tertiary | `#54e8b3` (`accent`, `text-accent`, `bg-accent`) | Top bar, active nav, `ctaLink`, focus rings |
| Muted | Tailwind `neutral-400` / `neutral-500` | Meta, URLs, secondary labels |
| Hairline / border | `rgba(255, 255, 255, 0.14)` (`hairline`, `border-hairline`) | Cards, form fields, code blocks |
| Hover fill | `neutral-100` / `neutral-800` (`#262626`) | Card and path-link hover |

One accent only. Hairline is the surface border. Prefer `neutral-*` over `zinc-*`, `gray-*`, or `slate-*` for new classes.

`<html>` always has the `dark` class (`app/layout.tsx`), and `dark:` is class-based (`app/global.css`), so on screen the `dark:` value of a light/dark pair is the one that renders: borders are `border-hairline`, hover fill is `neutral-800`. A light half, when a pair still has one, is `border-neutral-200`. `/cv` print has its own black-on-white styles. The active nav item stays `text-accent`, along with the top bar and `ctaLink`.

## Typography

Live face is system mono at normal weight: `html` uses `font-mono font-normal` in `app/layout.tsx` and `app/global-error.tsx`. Body is 400. Page titles stay `font-bold` (700). Section titles stay `font-semibold` (600).

`tailwind.config.mts` maps `font-sans` to `var(--font-graphik)`, but Graphik is **not loaded** in source. Do not “restore” Graphik, pair a display serif, or invent a second typeface unless the task explicitly loads a font.

Type scale and spacing tokens live in [`components/shared/spacing.ts`](components/shared/spacing.ts) (`pageTitle`, `sectionTitle`, `proseClass`, `blockSpacing`, `sectionSpacing`, grids). Theme colors live in [`tailwind.config.mts`](tailwind.config.mts): `accent` is `#54e8b3`, `hairline` is `rgba(255, 255, 255, 0.14)`. Nav: lowercase mono, `tracking-tight`; no all-caps or display face.

## Layout and responsive behavior

Source: [`app/layout.tsx`](app/layout.tsx) and [`components/shared/spacing.ts`](components/shared/spacing.ts).

- Column: `siteColumn` in [`components/shared/spacing.ts`](components/shared/spacing.ts) (`max-w-4xl` with `px-4 sm:px-6` gutters) on nav and `main`, `h-0.5 bg-accent` top bar
- Mobile first: one column below `md`. Default card grids go two-up at `md` (`twoColGrid` / `blockGrid`, `md:grid-cols-2`) — not bento
- **Exception:** `/explore` featured row uses `md:grid-cols-3` in `app/explore/page.tsx`; do not spread 3-up card grids elsewhere without an explicit task. The footer's three link columns are not a card grid.
- Page titles step up one size at `sm` (`pageTitle`). On `/`, the `h1` breaks after the name below `md` (`Gabo Esquivel` / `Agentic Product Engineer`); from `md` up it stays one line with an em dash (`Gabo Esquivel — Agentic Product Engineer`)
- The primary nav wraps onto more lines on narrow screens (`flex-wrap`); there is no menu toggle. The items are `gabo`, `work`, `ai`, `web3`, `bio`, and `writing` (`components/layout/navbar.tsx`). `/ask` stays out of this nav while that experience is in progress (`PRODUCT.md`)
- `/ask` is the chat. Same `siteColumn` as every page (no inner max-width); header (accent bar + nav) scrolls with the page; footer hidden on that route only via `body:has([data-connect])`; viewport-locked body so the transcript scrolls and the composer stays at the bottom; suggestions wrap
- Footer link lists use two columns below `sm`; the hire note spans the full width until `sm`, then the footer is three columns
- Page and project media: 16:9, `rounded-lg`, via `PageImage` or `projectMedia`. Optional blog hero images and social exports follow the image rules below; do not bake rounded corners into image files.

## Editorial images

Every editorial image communicates a specific idea from its article. Technical images show meaningful structures and relationships. Reflective images express the central experience through a clear visual metaphor. Both use the same palette, drawing style, spacing, and compositional discipline.

The approved direction is flat, diagram-like editorial illustration: pure black canvas, white and neutral-gray shapes and lines, and mint `#54e8b3` marking the important relationship or subject. Use sparse, recognizable objects, clear boundaries, generous negative space, and consistent strokes. No dimensional rendering, shadows, glow, glass, grain, gradients, futuristic offices, robots, decorative code, or technology-logo collages. Organic subjects such as grass and trails use the same simplified drawing language. Photography and real project screenshots remain evidence and retain their original character.

Choose the visual structure from the content:

- Technical explanation: components, boundaries, connections, or flow.
- Engineering perspective: a comparison, tradeoff, progression, or feedback loop.
- Personal reflection: a concrete visual metaphor grounded in the author's account. Do not turn personal experience into a scientific causal claim.

Use image generation for conceptual artwork. Construct exact diagrams, arrows, labels, and factual relationships with SVG or another controlled layout tool. Add any typography after generation; never rely on generated text. In-article diagrams in `public/images/diagrams/` use this palette and the site monospace, and the page scales them to the content column width so they stay readable without horizontal scroll. Hero images do not contain the article title, logos, or a signature. No new triangle mark or monogram is approved. Social assets may use the author's name or domain as typeset attribution.

A **hero image** is the optional editorial raster for a blog post (`image` in MDX frontmatter). Posts may ship without one; listings and Open Graph fall back to the site default when `image` is omitted. In-article diagrams stay SVG or evidence imagery and are not hero images.

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
| Section | `PageSection` | `components/shared/page-layout.tsx` |
| Body paragraph | `Prose` | `components/shared/page-layout.tsx` |
| Photo | `PageImage` (requires `alt`) | `components/shared/page-layout.tsx` |
| Filter | `FilterNav` (`Button` as `Link`) | `components/shared/page-layout.tsx`, `components/ui/button.tsx` |
| Text / route card | `PageCard` / `SiteCardLink` on `Card` | `components/shared/page-card.tsx`, `components/shared/site-card-link.tsx` |
| Project with image | `ProjectCard` on `SiteCardLink` | `components/work/project-card.tsx` |
| Chat project row | `ProjectMedia` / `ProjectMediaStack` on `Card` | `components/work/project-media.tsx` |
| Capability route shell | `CapabilityPage` | `components/work/capability-page.tsx` |
| Section CTA | `ctaLink` / `sectionAction` | `components/shared/spacing.ts` |
| In-prose link | `proseLink` | `components/shared/spacing.ts` |
| Card grids | `CardGrid` or `blockGrid` | `components/shared/card-grid.tsx`, `spacing.ts` |
| Forms | `Field`, `Input`, `Textarea`; hairline + mint focus via `siteFieldClass` | `components/ui/field.tsx`, `app/contact/contact-form.tsx`, `app/connect/connect-fields.tsx` |
| Connect generative cards | `ConnectCard` (`Card`), `Button` (`siteAccent` / `siteQuiet`), `ToggleGroup` chips | `app/connect/connect-gen-ui.tsx` |

`PathLink` and `PageCard` use `SiteCardLink` and share the `cardArrow` nudge in `spacing.ts`.

Icons: Lucide only where already used (contact, print). Do not add icon-led feature rows.

Motion budget: color/underline transitions, project-card image scale, `→` nudge with `motion-safe:`, connect status, approval card, and connect generative cards (`starting:` fade + scale via `enter` in `components/shared/motion.ts`), connect starter, Send, Stop, and approval `:active` scale, and `siteCardInteractive` `:active` scale (`press` in the same file). The current nav item is `text-accent` with `aria-current="page"` and has no underline. Use `emil-design-eng` for easing and press scale (`0.97`, `cubic-bezier(0.23, 1, 0.32, 1)`) inside this budget only — no page-load sequences or scroll hijack. If we add `:active` scale, use `0.97`, not `better-ui`'s `0.96`.

## `/ask` generative UI

Conversation carries intent; interactive cards carry data entry and confirmation. The model calls `list_slots`, `book`, and `send`; React owns layout, validation, and local UI state without extra chat turns for ordinary picker navigation.

**Principles**

- One card surface per workflow step: shadcn `Card`, hairline border, `rounded-lg`, `p-4`, `max-w-md`, `gap-3`, mono type, mint focus rings — see `ConnectCard` in `app/connect/connect-gen-ui.tsx`.
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
- Reduced motion: the `cardArrow` nudge, connect status, approval card, slot picker, starter and send press, and `siteCardInteractive` press use `motion-safe:` / `motion-reduce:` (gentler scale or opacity-only, not off). The `ProjectCard` image zoom runs regardless.
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
- Display serif, cream/terracotta defaults, broadsheet chrome, or acid-green redesigns of the mint bar

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

The homepage uses a single transparent WebP background composition with the real portrait, mint gradient, circle, grid, and small discipline labels. This approved homepage exception permits the subtle gradient and decorative photography in the supplied mockup; editorial image rules remain unchanged. The PNG master is `public/images/bio/gabo-hero.png`; the homepage ships the full composition as `public/images/gaboesquivel-homepage.webp` (with `gabo-hero.webp` in the same bio directory as a cropped portrait derivative). All artwork is baked into the image to preserve relative alignment.

[`app/page.tsx`](app/page.tsx) lays out the hero with Tailwind utilities: the title spans the full reading column (`relative z-[1] w-full max-w-none`); from `md` up the portrait is a right-aligned background (`md:bg-[url('/images/gaboesquivel-homepage.webp')]`, `md:bg-size-[47%_auto]`, `md:bg-position-[100%_top]`) and the copy block keeps `md:pr-[45%]`. Below `md`, the background and inset are absent; the same WebP renders as a full-width image (`md:hidden`) directly under the page title, then the copy block follows. The existing `max-w-4xl` column, copy, navigation, and sections remain. A plain, keyboard-focusable “Contact me” link opens `/contact` at every width. No filled hero CTA.

Source: the real circular portrait preview in the supplied conversation attachment `Zight 2026-10-21 at 11.37.26 AM.jpg`. The PNG preserves source RGB pixels inside a manually traced transparency mask, with a lower-edge fade; no face generation or reconstruction. The source preview already crops the hair and shoulders and limits image detail. WebP is a compressed delivery derivative. A full-resolution original can replace this source later.
