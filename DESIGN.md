---
name: gaboesquivel.com
description: Dark reading column for a product-engineer portfolio. Agents must reuse existing primitives; do not invent a new identity.
colors:
  primary: "#000000"
  secondary: "#ffffff"
  tertiary: "#54e8b3"
  muted: "#737373"
  border: "#262626"
  hover-fill: "#262626"
typography:
  body:
    fontFamily: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
    fontSize: 1rem
    fontWeight: 100
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
| Border | `neutral-200` / `neutral-800` | Cards and chips |
| Hover fill | `neutral-100` / `neutral-800` | Card and path-link hover |

One accent only. Prefer `neutral-*` over `zinc-*`, `gray-*`, or `slate-*` for new classes.

`<html>` always has the `dark` class (`app/layout.tsx`), and `dark:` is class-based (`app/global.css`), so on screen the `dark:` value of a light/dark pair is the one that renders: borders and hover fill are `neutral-800`. `/cv` print has its own black-on-white styles.

## Typography

Live face is system mono: `html` uses `font-mono font-thin` in `app/layout.tsx`. That is the shipped type.

`tailwind.config.mts` maps `font-sans` to `var(--font-graphik)`, but Graphik is **not loaded** in source. Do not “restore” Graphik, pair a display serif, or invent a second typeface unless the task explicitly loads a font.

Type scale and spacing tokens live in [`components/shared/spacing.ts`](components/shared/spacing.ts) (`pageTitle`, `sectionTitle`, `proseClass`, `blockSpacing`, `sectionSpacing`, grids). Accent color: `accent` in [`tailwind.config.mts`](tailwind.config.mts) (`#54e8b3`). Nav: lowercase mono, `tracking-tight`; no all-caps or display face.

## Layout and responsive behavior

Source: [`app/layout.tsx`](app/layout.tsx) and [`components/shared/spacing.ts`](components/shared/spacing.ts).

- Column: `max-w-4xl` with `px-4 sm:px-6` gutters, sticky `h-0.5 bg-accent` top bar
- Mobile first: one column below `md`. Default card grids go two-up at `md` (`twoColGrid` / `blockGrid`, `md:grid-cols-2`) — not bento
- **Exception:** `/explore` featured row uses `md:grid-cols-3` in `app/explore/page.tsx`; do not spread 3-up card grids elsewhere without an explicit task. The footer's three link columns are not a card grid.
- Page titles step up one size at `sm` (`pageTitle`). On `/`, the `h1` breaks after the name below `md` (`Gabo Esquivel` / `Agentic Product Engineer`); from `md` up it is one line with an em dash
- The primary nav wraps onto more lines on narrow screens (`flex-wrap`), including `connect`; there is no menu toggle
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
| Forms | Match `/connect`: transparent fields, `border`, `focus:ring-accent` | `app/connect/contact-form.tsx` |

Homepage `PathLink` is a borderless variant of the card pattern; leave both until an explicit converge task.

Icons: Lucide only where already used (contact, print). Do not add icon-led feature rows.

Motion budget: color/underline transitions, project-card image scale, `→` nudge with `motion-safe:`, connect status banner entrance (`starting:` fade + scale), connect send `:active` scale, and `cardLink` `:active` scale. Active nav underline is CSS only (no `layoutId` spring). Use `emil-design-eng` for easing and press scale (`0.97`, `cubic-bezier(0.23, 1, 0.32, 1)`) inside this budget only — no page-load sequences or scroll hijack. If we add `:active` scale, use `0.97`, not `better-ui`'s `0.96`.

## Accessibility

- Contrast: text needs 4.5:1 on the black canvas (WCAG AA). `neutral-400` is about 8:1. `neutral-500` (the `muted` token) is about 4.4:1, just under; it colors inactive nav items and meta text in `navbar.tsx`, `page-card.tsx`, `path-link.tsx`, `project-card.tsx`, `tech-stack.tsx`, and `app/blog/[slug]/page.tsx`. See Open questions.
- Focus: `cardLink` cards and `/connect` fields draw an accent ring; other links (nav, `PathLink`, `ProjectCard`) keep the browser's default outline. Do not remove an outline without adding the accent ring.
- Navigation: the primary nav has `aria-label="Primary navigation"` and marks the current page with `aria-current="page"`.
- Images: `PageImage` requires `alt`; describe what the photo shows.
- Reduced motion: the `PathLink` arrow nudge, connect status banner, send button press, and `cardLink` press use `motion-safe:` / `motion-reduce:` (gentler scale or opacity-only, not off). The `ProjectCard` image zoom runs regardless.
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

Intended color family is `neutral-*`. Existing exceptions: `zinc` on `components/work/project-card.tsx`, `gray` on `components/layout/footer.tsx`, and some code-block `slate`/`#333` in `app/global.css`. Do not spread those. Do not bulk-rewrite them in a design-docs pass.

## Open questions

- `muted` text (`neutral-500`) is just under AA on black. Move it to `neutral-400`, or keep `neutral-500` for non-essential labels only?
- The `ProjectCard` image zoom (`group-hover:scale-110`) is the one image motion, but it is not behind `motion-safe:`. Gate it, or leave it as is?
