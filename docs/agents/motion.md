# Motion and view transitions

Canonical product gate: [DESIGN.md](../../DESIGN.md) § Motion & View Transitions. Policy: [AGENTS.md](../../AGENTS.md) § Web platform (motion and interactivity).

## Tokens (`components/shared/motion.ts`)

| Token | Use |
| --- | --- |
| `press` | Buttons, chips, filter links, nav search — 160ms press scale `0.97` (transitions `scale`) |
| `enter` | Mount / reveal — 200ms `@starting-style` fade + scale |
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

- Micro-interactions: extend tokens or reuse them; stay inside the DESIGN motion budget.
- Structural continuity: read Next’s bundled `view-transitions` guide under `node_modules/next/dist/docs/` and the motion section of this file.
- Always degrade: unsupported View Transition API, `prefers-reduced-motion`, and SSR must leave UX usable.

## Checks

```bash
bun run check:motion
```

Runs with `bun run verify`. Fails on forbidden animation-library imports under `app/`, `components/` (except `components/ui/`), and `lib/`, and on a `motion` package dependency.
