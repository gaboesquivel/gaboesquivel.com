# 0002. One full-screen search overlay on every route

Status: proposed (2026-11-03). Supersedes the presentations in [spec 001](../specs/001-site-design-ux-search.md#shared-search-contract) "Shared search contract" (inline on `/`, modal elsewhere).

## Context

Spec 001 shipped one state machine in two presentations. On `/` the nav icon scrolls to the inline field; elsewhere it opens a 150ms zoom dialog. The owner expects one search that behaves identically everywhere: click, and the input animates to a fixed position at the top of a full-screen search.

## Decision

All triggers (homepage "Ask me something" field, nav icon, Cmd/Ctrl+K) open one full-screen search overlay with a fixed input at the top. The homepage field is a trigger, not a separate surface. Results render in the overlay.

Motion is professional and Netflix-style: the field moves from its resting spot to the top as a shared element (FLIP with CSS and Web Animations, no new library), about 250ms on the site curve, while the scrim fades in and results stagger in below. Closing reverses it. Reduced motion means no movement, a short opacity change at most. One entry is added to the DESIGN.md motion budget.

## Rationale

One surface removes the disagreement spec 001 set out to fix and gives one animation to tune and test.

## Consequences

- Update DESIGN.md, `docs/agents/design/home.md`, `docs/agents/motion.md` and the spec 001 contract rows (Trigger, Layout, Motion) when built.
- Homepage SSR sections below the prompt stop being replaced inline by results.
- Build on or after `task/001-16-agent-search`, which edits the same search files.
