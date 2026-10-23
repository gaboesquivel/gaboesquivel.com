# Work index navigation

## Status

Implemented (2026-10-23).

## Context

Work category routes (`/work` and `/work/[type]`) used different hero treatments: Featured used the large display hero while filtered routes used a compact `InnerPageHero`. Filter navigation was not sticky. Switching filters changed heading geometry and vertical position of the filter bar, producing layout shift and a disjointed index experience.

## Decision

Introduce a persistent nested Work layout (`app/work/layout.tsx`) with client chrome (`WorkPageChrome`) that owns a single `WorkIndexHero`, sticky `WorkFilterNav`, and a stable results region. Editorial copy and pathname resolution live in `lib/work-types.ts`. Project listings remain server-rendered in each route page.

## Rationale

- Continuity when moving between categories without remounting the shell.
- Predictable display typography and reserved two-line descriptions on every route.
- Sticky Work-only filters keep category context while project content scrolls.
- Native React `<ViewTransition>` for the active filter indicator without new animation dependencies.

## Consequences

- Work-specific client components (`work-page-chrome.tsx`, `work-index-hero.tsx`, `work-filter-nav.tsx`) and scoped CSS in `app/global.css`.
- Generic `FilterNav` unchanged for other site areas.
- `components/work/projects.tsx` removed; Work pages no longer share the old hero/filter assembly.
- Playwright coverage for geometry, sticky behavior, navigation, accessibility, and reduced motion.
