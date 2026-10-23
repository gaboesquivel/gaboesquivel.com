# Motion and view transitions

Canonical product gate: [DESIGN.md](../../DESIGN.md) § Motion & View Transitions. Policy: [AGENTS.md](../../AGENTS.md) § Web platform (motion and interactivity).

## Tokens (`components/shared/motion.ts`)

| Token        | Use                                                     |
| ------------ | ------------------------------------------------------- |
| `press`      | Buttons, chips, filter links — 160ms press scale `0.97` |
| `enter`      | Mount / reveal — 200ms `@starting-style` fade + scale   |
| `imageHover` | Cover imagery — 500ms hover scale `1.02`                |

Related: `cardArrow` and `siteCardInteractive` in `components/shared/spacing.ts`.

Easing for site-authored motion: `cubic-bezier(0.23, 1, 0.32, 1)`. View-transition groups: 180ms (see `app/global.css`).

## Stack

1. **CSS** — transitions, keyframes, `@starting-style`, Tailwind `motion-safe:` / `motion-reduce:`.
2. **View Transitions** — React `<ViewTransition>` from `react`; name helpers under `lib/**/view-transition*.ts`; scoped `::view-transition-*` rules in `app/global.css`.
3. **Loading shimmer** — `.text-shimmer` (connect copy) and `@utility shimmer` (UI pending states) in `app/global.css`. No `motion` / Framer / GSAP in app code.

Vendor `components/ui/**` keeps shadcn / `tw-animate-css` animations; do not rewrite in routine passes.

## Adding motion

- Micro-interactions: extend tokens or reuse them; stay inside the DESIGN motion budget.
- Structural continuity: read Next’s bundled `view-transitions` guide under `node_modules/next/dist/docs/` and the `vercel-react-view-transitions` skill.
- Always degrade: unsupported View Transition API, `prefers-reduced-motion`, and SSR must leave UX usable.

## Checks

```bash
bun run check:motion
```

Runs with `bun run verify`. Fails on forbidden animation-library imports under `app/`, `components/` (except `components/ui/`), and `lib/`, and on a `motion` package dependency.
