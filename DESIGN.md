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

## Typography

Live face is system mono: `html` uses `font-mono font-thin` in `app/layout.tsx`. That is the shipped type.

`tailwind.config.mts` maps `font-sans` to `var(--font-graphik)`, but Graphik is **not loaded** in source. Do not “restore” Graphik, pair a display serif, or invent a second typeface unless the task explicitly loads a font.

Scale (from `components/shared/spacing.ts`):

- Page title: `text-2xl font-bold tracking-tighter sm:text-3xl`
- Section title: `text-2xl font-semibold tracking-tight`
- Body: `prose prose-neutral dark:prose-invert` (line-height ~1.75)
- Meta / href chips: `font-mono text-xs text-neutral-500`
- Nav: lowercase, `tracking-tight` — no all-caps, no display face

## Layout

Source: `app/layout.tsx` and `components/shared/spacing.ts`.

- Column: `max-w-4xl`, `px-4 sm:px-6`, `mt-8` on main
- Sticky accent bar: `h-0.5 bg-accent` at top of body
- Vertical rhythm: block `mt-8`, section `mt-12`, title `mb-6`, heading row `mb-8`
- Grids: `grid-cols-1 md:grid-cols-2 gap-4` (`twoColGrid` / `blockGrid`) — not 3-up, not bento
- Images: 16:9, `rounded-lg`, via `PageImage` or `projectMedia`

## Elevation & Depth

None. No shadows, glows, glass, or grain. Hover is background fill or a 1px border shift, not elevation. Project-card image scale on hover is the one existing image motion; do not add new signature motion.

## Shapes

- Surfaces and images: `rounded-lg` (8px)
- Filter chips: `rounded-md`
- Blog chips may stay `rounded-full`; do not introduce `rounded-2xl` or new full-pill surfaces elsewhere

## Components

Reuse or extend these primitives. If a pattern is missing, add it to `spacing.ts` / `page-layout.tsx` first — do not invent a parallel title, card, or section on a page.

| Job | Primitive |
| --- | --- |
| Page h1 | `PageTitle` / `IndexHeading` |
| Section | `PageSection` |
| Body paragraph | `Prose` |
| Photo | `PageImage` |
| Text / route card | `PageCard` / `cardLink` |
| Project with image | `ProjectCard` |
| Capability route shell | `CapabilityPage` |
| Filter | `FilterNav` |
| Section CTA | `.cta-link` / `sectionAction` |
| In-prose link | `.prose-link` |
| Card grids | `CardGrid` or `blockGrid` |
| Forms | Match `/connect`: transparent fields, `border`, `focus:ring-accent` |

Homepage `PathLink` is a borderless variant of the card pattern; leave both until an explicit converge task.

Icons: Lucide only where already used (contact, print). Do not add icon-led feature rows.

Motion budget: color/underline transitions, nav `layoutId` spring, masonry opacity, project-card image scale, `→` nudge with `motion-safe:`. Use `emilkowal-animations-v1` for easing inside this budget only — no page-load sequences or scroll hijack.

## Do's and Don'ts

**Do (UX inside the system)**

- Improve hierarchy, spacing on the existing scale, focus rings, contrast, empty/error states
- Reuse or extend `page-layout` / `spacing` primitives
- Tighten `zinc`/`gray` drift only in files already being edited
- Keep `/cv` print styles as a separate black-on-white surface (`app/global.css` print block)

**Don't (identity bans)**

- Invent a new palette, type pairing, or “signature” element
- Gradient blobs, numbered 01/02/03 markers, eyebrow labels, icon feature rows, stat strips, second accent
- Display serif, cream/terracotta defaults, broadsheet chrome, or acid-green redesigns of the mint bar
- Restyle `/work`, `/project/[slug]`, or `/cv` unless that is the task
- Restyle during a content/copy pass (see `.cursor/rules/content-strategy.mdc`)

**Skills**

- `frontend-design-v1` is a critic inside this brief (anti-slop, restraint). It must not invent palette, type, or a signature — this file wins.
- `tailwind-design-system-v4` is for CSS/token architecture, not a page restyle.

## Drift

Intended color family is `neutral-*`. Existing exceptions: `zinc` on `components/work/project-card.tsx`, `gray` on `components/layout/footer.tsx`, and some code-block `slate`/`#333` in `app/global.css`. Do not spread those. Do not bulk-rewrite them in a design-docs pass.
