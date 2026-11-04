# Motion and view transitions

The motion budget, status, and web-platform policy for this site. [DESIGN.md](../../DESIGN.md) § Motion holds the rule and its reason; this file holds the values.

## Budget

The budget is: color/underline transitions, project-card image hover via `imageHover` in `components/shared/motion.ts` (`1.02` scale, `motion-safe:`), `→` nudge with `motion-safe:` (cards, path links, and the writing index), the `/contact` form status (`starting:` fade + scale via `enter` in the same file), the GenUI result reveal (M-I: the `enter` values — 200ms, opacity 0→1, scale 0.97→1, site curve — on each generated block as it mounts, keyed by request, in a scoped `@starting-style` block of `app/global.css`; 120ms opacity only under reduced motion; not `<ViewTransition>`), the search Stop control, `Button`, filter chips, path links, the nav search button (M-J), and the print button `:active` scale (`press` in the same file), the `siteCardInteractive` `:active` scale, the card-to-detail cover morph (M-B: 240ms view-transition group), and the `/bio` story disclosure (M-H: 240ms height via `::details-content`, 200ms arrow rotate). The current nav item is `text-accent` with `aria-current="page"` and has no underline. Press scale is `0.97` on the site curve `cubic-bezier(0.23, 1, 0.32, 1)`. No page-load sequences, scroll hijack, or new signature motion.

Reduced motion: the `cardArrow` nudge, the `/contact` form status, `press`, and `siteCardInteractive` use `motion-safe:` / `motion-reduce:`. Cover imagery uses `imageHover` (`1.02` under `motion-safe:` only). View-transition groups, including the cover morph, run at 0s under reduced motion; the `/bio` disclosure opens instantly and its arrow does not animate.

## Status

**Status (2026-11-03):** Work category navigation uses React `<ViewTransition name="work-filter-indicator">` on the active filter chip (`components/work/work-filter-nav.tsx`), with 180ms easing scoped in `app/global.css`; the active label stays above the indicator during the morph (`view-transition-class: work-filter-label`, Chromium 137+ and Safari 18.4). Project covers morph between the editorial/featured card and the project hero (`<ViewTransition name={projectViewTransitionName(slug)} share="morph" default="none">`, `lib/work/project-view-transition.ts`; 240ms on the site curve). `default="none"` keeps filter clicks to the indicator only. Browser Back/Forward does not morph: React renders popstate traversals synchronously, so no view transition starts. The `/bio` story disclosure animates `::details-content` block size (240ms) under `prefers-reduced-motion: no-preference`, scoped to `details[data-bio-disclosure]`; unsupported browsers open instantly. The root crossfade runs 180ms on the site curve, and `::view-transition { pointer-events: none }` keeps clicks reaching the page during a transition. Elsewhere, motion stays the budget (CSS transitions, Tailwind `starting:` / `motion-safe:`, and `components/shared/motion.ts`). The search "Composing results…" shimmer uses CSS in `app/global.css` (`components/ai-elements/shimmer.tsx`). No `document.startViewTransition()` or global `@view-transition { navigation: auto; }`. No runtime animation libraries in site-authored code.

**Compatibility:** React `19.3.1` and Next.js App Router (`^16.4`) expose `<ViewTransition>` from `react`. Unsupported browsers keep route updates and active styling without animating the indicator. Transition types and `view-transition-class` need Chromium 125+ and recent Safari/Firefox; verify Safari when changing Work filter motion.

**Future candidates (not implemented):** Relocating the homepage GenUI prompt (`docs/specs/homepage-genui/`), directional route transitions, list reorder identity, and Suspense loading reveals — each must pass the motion budget gate and `prefers-reduced-motion`. Homepage generation itself is active.

## Tokens (`components/shared/motion.ts`)

| Token | Use |
| --- | --- |
| Search overlay | Scrim and panel fade in 200ms (150ms out) on the site curve; the field bar glides from its trigger (`translateY`, 320ms, Web Animations API, `SiteSearchPanel`). Reduced motion: none |
| `press` | Buttons, chips, filter links, nav search — 160ms press scale `0.97` (transitions `scale`) |
| `enter` | Mount / reveal — 200ms `@starting-style` fade + scale |
| Title opening word | Shared `<ViewTransition name="title-lead-<word>" share="title-lead" default="none">` (`components/shared/title-lead.tsx`): old snapshot hidden, new one unanimated (`::view-transition-*(.title-lead)` in `app/global.css`), so a matching word (`/` and `/work`: "Software") never moves or fades. Proof: `title-geometry.spec.ts` |
| `imageHover` | Cover imagery — 500ms hover scale `1.02`, site curve |

Related: `cardArrow` (200ms nudge, site curve) and `siteCardInteractive` in `components/shared/spacing.ts`.

Easing for site-authored motion: `cubic-bezier(0.23, 1, 0.32, 1)`. View-transition groups and the root crossfade: 180ms; the project cover morph (`.morph`, `lib/work/project-view-transition.ts`): 240ms; the `/bio` disclosure (`details[data-bio-disclosure]::details-content`): 240ms block size, motion-safe only (see `app/global.css`).

Shared-element names: one mounted `<ViewTransition name>` per name per page, and always pair `default="none"` with an explicit `share`. Browser Back/Forward starts no view transition (React renders popstate synchronously), so only link navigations morph.

## Stack

1. **CSS** — transitions, keyframes, `@starting-style`, Tailwind `motion-safe:` / `motion-reduce:`.
2. **View Transitions** — React `<ViewTransition>` from `react`; name helpers under `lib/**/view-transition*.ts`; scoped `::view-transition-*` rules in `app/global.css`.
3. **Loading shimmer** — `.text-shimmer` (connect copy) and `@utility shimmer` (UI pending states) in `app/global.css`. No `motion` / Framer / GSAP in app code.

Vendor `components/ui/**` keeps shadcn / `tw-animate-css` animations; do not rewrite in routine passes.

## Adding motion

Default to standards that work across browsers and deployment targets without tying behavior to one framework or animation library.

- Micro-interactions: modern CSS (`transition`, `animation`, `@starting-style`, named `transition` properties, Tailwind `starting:` / `motion-safe:`); extend or reuse the tokens above and stay inside the budget.
- Structural continuity: React `<ViewTransition>` with transition-scoped updates (`startTransition`, Suspense, `useDeferredValue`, Next navigations), in scoped `::view-transition-*` blocks. Read Next’s bundled guide at `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md` first. No `document.startViewTransition()` or global `@view-transition { navigation: auto; }` unless the product and DESIGN.md approve; Next `transitionTypes` only for product-approved directional navigation; cross-document transitions are out of scope until specified.
- Other native APIs (Web Animations, `IntersectionObserver`, Popover / `dialog`, scroll-driven animations) before polyfills or packages. No animation libraries (Framer Motion, GSAP) for effects CSS or view transitions can carry; existing documented exceptions stay.
- Progressive enhancement: layout and interaction work with motion off, unsupported browsers update instantly, and `prefers-reduced-motion` is always respected. Preserve SSR, accessibility, performance, and SEO; never block paint for decorative motion.

## Checks

```bash
bun run check:motion
```

Runs with `bun run verify`. Fails on forbidden animation-library imports under `app/`, `components/` (except `components/ui/`), and `lib/`, and on a `motion` package dependency.
