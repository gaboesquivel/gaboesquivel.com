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

Dark reading column, not a marketing landing kit. Black canvas, white type, one mint accent (`#54e8b3`), sticky 2px top bar, lowercase mono nav, `max-w-4xl` content. Photography is evidence (real workshop/project shots), not decoration. Feel: precise, thoughtful, quietly playful — whitespace and hierarchy over chrome.

Voice and identity facts live in the installed `gabo` skill. UI microcopy: sentence case, plain verbs, no marketing CTAs. Do not duplicate biography or hire terms here.

## Colors

| Token | Value | Use |
| --- | --- | --- |
| Canvas / primary | `#000000` (`bg-black`) | Page background |
| Text / secondary | `#ffffff` (`text-white`) | Body and headings |
| Accent / tertiary | `#54e8b3` (`accent`, `text-accent`, `bg-accent`) | Top bar, active nav, `.cta-link`, focus rings |
| Muted | Tailwind `neutral-400` / `neutral-500` | Meta, URLs, secondary labels |
| Hairline / border | `rgba(255, 255, 255, 0.14)` (`hairline`, `border-hairline`) | Cards, form fields, code blocks |
| Hover fill | `neutral-100` / `neutral-800` (`#262626`) | Card and path-link hover |

One accent only. Hairline is the surface border. Prefer `neutral-*` over `zinc-*`, `gray-*`, or `slate-*` for new classes.

`<html>` always has the `dark` class (`app/layout.tsx`), and `dark:` is class-based (`app/global.css`), so on screen the `dark:` value of a light/dark pair is the one that renders: borders are `border-hairline`, hover fill is `neutral-800`. A light half, when a pair still has one, is `border-neutral-200`. `/cv` print has its own black-on-white styles. The active nav item stays `text-accent`, along with the top bar and `.cta-link`.

## Typography

Live face is system mono at normal weight: `html` uses `font-mono font-normal` in `app/layout.tsx` and `app/global-error.tsx`. Body is 400. Page titles stay `font-bold` (700). Section titles stay `font-semibold` (600).

`tailwind.config.mts` maps `font-sans` to `var(--font-graphik)`, but Graphik is **not loaded** in source. Do not “restore” Graphik, pair a display serif, or invent a second typeface unless the task explicitly loads a font.

Type scale and spacing tokens live in [`components/shared/spacing.ts`](components/shared/spacing.ts) (`pageTitle`, `sectionTitle`, `proseClass`, `blockSpacing`, `sectionSpacing`, grids). Theme colors live in [`tailwind.config.mts`](tailwind.config.mts): `accent` is `#54e8b3`, `hairline` is `rgba(255, 255, 255, 0.14)`. Nav: lowercase mono, `tracking-tight`; no all-caps or display face.

## Layout and responsive behavior

Source: [`app/layout.tsx`](app/layout.tsx) and [`components/shared/spacing.ts`](components/shared/spacing.ts).

- Column: `siteColumn` in [`components/shared/spacing.ts`](components/shared/spacing.ts) (`max-w-4xl` with `px-4 sm:px-6` gutters) on nav and `main`, sticky `h-0.5 bg-accent` top bar
- Mobile first: one column below `md`. Default card grids go two-up at `md` (`twoColGrid` / `blockGrid`, `md:grid-cols-2`) — not bento
- **Exception:** `/explore` featured row uses `md:grid-cols-3` in `app/explore/page.tsx`; do not spread 3-up card grids elsewhere without an explicit task. The footer's three link columns are not a card grid.
- Page titles step up one size at `sm` (`pageTitle`). On `/`, the `h1` breaks after the name below `md` (`Gabo Esquivel` / `Agentic Product Engineer`); from `md` up it is one line with an em dash
- The primary nav wraps onto more lines on narrow screens (`flex-wrap`); there is no menu toggle. The last item is labeled `ask` so a phone-width row can stay on one line
- `/ask` is the chat. Same `siteColumn` as every page (no inner max-width); sticky header (accent bar + nav); footer hidden on that route only via `body:has([data-connect])`; viewport-locked body so the transcript scrolls and the composer stays at the bottom; suggestions wrap
- Footer link lists use two columns below `sm`; the hire note spans the full width until `sm`, then the footer is three columns
- Images: 16:9, `rounded-lg`, via `PageImage` or `projectMedia`

## Elevation & Depth

None. No shadows, glows, glass, or grain. Hover is background fill or a 1px border shift, not elevation. Project-card image scale on hover is the one existing image motion; do not add new signature motion.

## Shapes

- Surfaces and images: `rounded-lg` (8px)
- Filter chips: `rounded-md`
- Blog chips may stay `rounded-full`; do not introduce `rounded-2xl` or new full-pill surfaces elsewhere

## Components

Reuse or extend primitives in [`components/shared/page-layout.tsx`](components/shared/page-layout.tsx) and `spacing.ts`. If a pattern is missing, add it there first — do not invent a parallel title, card, or section on a page.

| Job | Primitive | Source |
| --- | --- | --- |
| Page h1 | `PageTitle` / `IndexHeading` | `components/shared/page-layout.tsx` |
| Section | `PageSection` | `components/shared/page-layout.tsx` |
| Body paragraph | `Prose` | `components/shared/page-layout.tsx` |
| Photo | `PageImage` (requires `alt`) | `components/shared/page-layout.tsx` |
| Filter | `FilterNav` | `components/shared/page-layout.tsx` |
| Text / route card | `PageCard` / `cardLink` | `components/shared/page-card.tsx`, `spacing.ts` |
| Project with image | `ProjectCard` | `components/work/project-card.tsx` |
| Capability route shell | `CapabilityPage` | `components/work/capability-page.tsx` |
| Section CTA | `.cta-link` / `sectionAction` | `app/global.css`, `spacing.ts` |
| In-prose link | `.prose-link` | `app/global.css` |
| Card grids | `CardGrid` or `blockGrid` | `components/shared/card-grid.tsx`, `spacing.ts` |
| Forms | Match `/ask`: transparent fields, `border-hairline`, `focus-visible:ring-accent` | `app/connect/connect-chat.tsx` |

`PathLink` uses `cardLink`, so it takes the same hairline border.

Icons: Lucide only where already used (contact, print). Do not add icon-led feature rows.

Motion budget: color/underline transitions, project-card image scale, `→` nudge with `motion-safe:`, connect status, approval card, and slot picker entrance (`starting:` fade + scale), connect starter, Send, Stop, and approval `:active` scale, and `cardLink` `:active` scale. The current nav item is `text-accent` with `aria-current="page"` and has no underline. Use `emil-design-eng` for easing and press scale (`0.97`, `cubic-bezier(0.23, 1, 0.32, 1)`) inside this budget only — no page-load sequences or scroll hijack. If we add `:active` scale, use `0.97`, not `better-ui`'s `0.96`.

## Accessibility

- Contrast: text needs 4.5:1 on the black canvas (WCAG AA). `neutral-400` is about 8:1. `neutral-500` (the `muted` token) is about 4.4:1, just under; it colors inactive nav items and meta text in `navbar.tsx`, `page-card.tsx`, `path-link.tsx`, `project-card.tsx`, `tech-stack.tsx`, and `app/blog/[slug]/page.tsx`. See Open questions.
- Focus: `cardLink` cards and `/ask` fields draw an accent ring; other links (nav, `PathLink`, `ProjectCard`) keep the browser's default outline. Do not remove an outline without adding the accent ring.
- Navigation: the primary nav has `aria-label="Primary navigation"` and marks the current page with `aria-current="page"`.
- Images: `PageImage` requires `alt`; describe what the photo shows.
- Reduced motion: the `PathLink` arrow nudge, connect status, approval card, slot picker, starter and send press, and `cardLink` press use `motion-safe:` / `motion-reduce:` (gentler scale or opacity-only, not off). The `ProjectCard` image zoom runs regardless.
- Print: the top bar, nav, and footer are `print:hidden`.

## Do's and Don'ts

Which routes may be restyled, and in which passes, is in `AGENTS.md` (Task scope).

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

Intended surface border is `border-hairline`. Intended color family otherwise is `neutral-*`. Existing exceptions: `gray` on `components/layout/footer.tsx`, and some code-block `slate`/`#333` in `app/global.css`. Do not spread those. Do not bulk-rewrite them in a design-docs pass.

## Open questions

- `muted` text (`neutral-500`) is just under AA on black. Move it to `neutral-400`, or keep `neutral-500` for non-essential labels only?
- The `ProjectCard` image zoom (`group-hover:scale-110`) is the one image motion, but it is not behind `motion-safe:`. Gate it, or leave it as is?
