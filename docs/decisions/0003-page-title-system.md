# 0003. One page-title system and one section gap

Status: accepted (2026-11-04). Amends the homepage-hero line in [docs/agents/design/layout.md](../agents/design/layout.md) ("do not restyle that hero") for its top edge only.

## Context

Measured at 1440px, page h1s shared a font but not a scale or a start: 52px display titles on most routes, 30px on `/privacy`, `/docs`, blog posts and categories; the title started at y=94 on most pages, 130 under a breadcrumb (`/work`, posts) and 142 on the homepage. Section gaps came in three desktop sizes (80px and two 96px tokens). The owner wants titles aligned, and the shared opening word of `/` and `/work` ("Software") must not move or flicker when navigating between them.

## Decision

- Every page h1 is `PageTitle` at the display scale, below one fixed 36px `PageEyebrow` row (breadcrumb or spacer), so all titles share x, y, size and line height. `/cv` (print) and embedded GenUI panels keep the small form.
- The homepage hero is top-aligned to the same edge. Its type, copy and portrait are unchanged.
- The opening word of each title is a `TitleLead` shared view-transition element; a pair with the same word is never faded or moved.
- One `sectionGap` token (64px / 96px) replaces `homeSection`, `narrativeSectionGap` and `interiorSectionGap`.

## Rationale

Identical geometry makes the existing 180ms root crossfade read as the title staying put; pinning the shared word removes the remaining cross-dissolve shimmer. Fewer tokens keep the cadence checkable.

## Consequences

- `/blog`, `/privacy`, `/docs`, blog posts and project pages get larger titles; editorial and split sections get a larger desktop gap (96px, was 80px).
