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
    fontFamily: IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
    fontSize: 1rem
    fontWeight: 400
  article-paragraph:
    fontFamily: Geist, system-ui, sans-serif
  page-title:
    fontFamily: IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
    fontSize: 1.5rem
    fontWeight: 700
    letterSpacing: -0.05em
  section-title:
    fontFamily: IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
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

Dark reading column, not a marketing landing kit. Black canvas, white type, one turquoise accent (`#5cded6`), 2px accent top bar, lowercase mono nav, one `max-w-6xl` shell on every route. Photography is evidence, not decoration. Feel: precise, thoughtful, quietly playful; whitespace and hierarchy over chrome.

Voice and identity facts live in the installed `gabo` skill. UI microcopy: sentence case, plain verbs, no marketing CTAs. Do not duplicate biography or hire terms here.

Each rule below says why it exists and how it is enforced: **checked** means `bun run check:design` (part of `bun run verify`) fails on a violation in site-authored code (`app/`, `components/` except `components/ui/`, `lib/`); **look** means someone checks the rendered page ([docs/agents/verify.md](docs/agents/verify.md)).

## Detail files

This file applies to every page and wins on conflict. Read the matching file when you change that area:

- Layout, shells, heroes, nav, footer, media frames: [docs/agents/design/layout.md](docs/agents/design/layout.md)
- Component primitives (which one for which job): [docs/agents/design/components.md](docs/agents/design/components.md)
- Motion budget, tokens, view transitions: [docs/agents/motion.md](docs/agents/motion.md)
- Homepage: [docs/agents/design/home.md](docs/agents/design/home.md)
- Work index: [docs/agents/design/work.md](docs/agents/design/work.md)
- `/ai`, `/web3`, `/bio`, `/contact`: [docs/agents/design/pages.md](docs/agents/design/pages.md)
- Editorial images: [docs/agents/design/editorial-images.md](docs/agents/design/editorial-images.md)
- GenUI booking and contact forms: [docs/agents/design/ask.md](docs/agents/design/ask.md)

## Colors

| Token | Value | Use |
| --- | --- | --- |
| Canvas / primary | `#000000` (`bg-black`) | Page background |
| Text / secondary | `#ffffff` (`text-white`) | Body and headings |
| Accent / tertiary | `#5cded6` (`accent`) | Top bar, active nav, `ctaLink`, focus rings |
| Muted | `neutral-400` (`#a3a3a3`) | Meta, URLs, secondary labels |
| Hairline / border | `rgba(255, 255, 255, 0.14)` (`hairline`) | Cards, form fields, code blocks |
| Hover fill | `neutral-800` (`#262626`) | Card and path-link hover |

- One accent. The turquoise matches the homepage portrait's linework, so interface, diagrams, and social art stay one system. Other chromatic Tailwind palettes and arbitrary hex classes are **checked**; red stays allowed for error states only.
- `neutral-*` for new classes; `zinc`/`gray`/`slate` drifted in before and read as a second gray. **Checked.**
- `<html>` always has the `dark` class and `dark:` is class-based, so the `dark:` half of a pair is what renders. `/cv` print is a separate black-on-white surface.

Theme colors live in [`tailwind.config.mts`](tailwind.config.mts).

## Typography

- IBM Plex Mono is the site face for navigation, titles, interface copy, code, and diagram labels. The site serves local regular (400), medium (500), semibold (600), and bold (700) files. Display headings requesting 800 use the bold face.
- Blog article paragraphs use locally hosted Geist Sans for long-form reading. Article titles, metadata, and inline code use IBM Plex Mono. Font tokens and assets are wired in [app/global.css](app/global.css).
- Nav: lowercase mono, `tracking-tight`. No all-caps or wide tracking anywhere, because those make eyebrow labels. **Checked** (`uppercase`, `tracking-wider`, `tracking-widest`).

Type scale and spacing tokens live in [`components/shared/spacing.ts`](components/shared/spacing.ts).

## Layout

One `max-w-6xl` shell (`homeColumn` / `siteColumn`) on every route, with nav and footer at the same width, so the site reads as one column. Four interior families (index, editorial, article, utility reading) and the hero rules are in [layout.md](docs/agents/design/layout.md). Card grids are two-up at `md`, not bento; `/explore` is the one 3-up exception. Media is 16:9 `rounded-lg` via `projectMedia`; never bake corners or crops into image files. All **look**.

## Elevation and shapes

- No shadows, glows, glass, or grain: depth comes from hierarchy, and these effects read as a template. Hover is a background fill or a 1px border shift. `shadow-*` and `backdrop-blur` are **checked**; glows and grain are **look**.
- Radii derive from `--radius: 0.625rem`: surfaces and images `rounded-lg` (10px); the search overlay is full screen (no radius); chips, fields, buttons `rounded-md` (8px). `rounded-xl` and larger are **checked**. Blog chips may stay `rounded-full`; no new pill surfaces (**look**).

## Components

Reuse or extend primitives in [`components/shared/page-layout.tsx`](components/shared/page-layout.tsx), [`components/shared/spacing.ts`](components/shared/spacing.ts), and `components/ui/` (shadcn Base UI) before writing page-local markup, so titles, cards, and sections stay identical across routes. The job-to-primitive table is in [components.md](docs/agents/design/components.md). Lucide icons only where already used. **Look.**

## Motion

Motion is a fixed budget, listed with its values in [docs/agents/motion.md](docs/agents/motion.md): color and underline transitions, press scale `0.97`, `enter` reveals, the cover image hover, the named view transitions, and the search overlay (a 200ms fade in, 150ms out, and the field bar gliding 320ms from its trigger). Site curve `cubic-bezier(0.23, 1, 0.32, 1)`. No page-load sequences, scroll hijack, or new signature motion, because motion here confirms an action and never decorates. Animation libraries are **checked** by `bun run check:motion`; inline `viewTransitionName` is **checked**; staying inside the budget is **look**. Every motion respects `prefers-reduced-motion`.

## Accessibility

- Text contrast 4.5:1 on black. `neutral-400` (about 8:1) is the floor; `neutral-500` (about 4.4:1) fails AA. `text-neutral-500` is **checked**.
- Focus: cards and fields draw an accent ring; nav links and the search button a 2px accent outline on `focus-visible`. Nav targets 44px on coarse pointers, 36px on fine.
- External links in content open in a new tab with `newTabProps` and `NewTabCue` (`components/shared/new-tab-cue.tsx`); site chrome, `mailto:`, anchors, and site-relative links stay in the same tab.
- First tab stop is "Skip to content" to `<main id="main">`; the footer sits after `<main>`. `<html>` sets `scheme-dark`. Every `next/image` has a descriptive `alt`. The top bar, nav, and footer are `print:hidden`.

All **look** except the contrast rule.

## Do's and Don'ts

Which routes may be restyled, and in which passes: [docs/agents/content.md](docs/agents/content.md).

**Do:** improve hierarchy, spacing on the existing scale, focus, contrast, and empty or error states; reuse or extend the shared primitives; tighten `zinc`/`gray` drift in files already being edited; keep `/cv` print styles separate.

**Don't (identity bans).** Each would replace this site's identity with a generic template.

| Ban | Enforced |
| --- | --- |
| Gradients (`bg-gradient-*`, `bg-linear-*`, `bg-radial-*`, `bg-conic-*`, CSS `*-gradient()`) | checked |
| Numbered 01/02/03 markers (string literals, JSX text, `(i + 1).padStart(2…)`) | checked |
| Eyebrow labels (`uppercase`, wide tracking) | checked |
| Second accent (chromatic Tailwind palette other than red, arbitrary hex color classes) | checked |
| Display serif (`font-serif`) | checked |
| Shadows, glass, `rounded-xl`+, `zinc`/`gray`/`slate`, `text-neutral-500` | checked |
| Icon-led feature rows, stat strips | look |
| New palette, type pairing, or signature element; cream or terracotta defaults; broadsheet chrome; acid-green redesigns of the top bar | look |

## Skills

This file and its detail files carry the values; no skill is needed to apply them. Skills critique inside them:

- `frontend-design`: anti-slop critic; it must not invent palette, type, or a signature.
- `emil-design-eng`: motion critic; where it differs, [motion.md](docs/agents/motion.md) wins (press scale `0.97`).
- `review-animations`: user-invoked review against the budget; it does not expand it.
- `tailwind-design-system`: CSS and token architecture, not a page restyle.

## Drift

Existing exceptions, and the only ones `check:design` allows: the shimmer and text-reveal gradients, `gray`/`slate` uses, and code-block hex colors in `app/global.css`; the vendor tweet theme in `components/tweet.css`; the edge-fade mask in `components/work/work-filter-nav.tsx`; the `/cv` print heading color in `components/shared/contact-info.tsx`. Leave them during a design-docs pass and do not spread them. Fix one by removing it from the script's allowlist in the same change.
