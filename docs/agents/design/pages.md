# Narrative page design

Surface detail split from [DESIGN.md](../../../DESIGN.md), which holds the identity, tokens, and rules for every page and wins on conflict. Read this file when changing this surface.

## AI, Web3, and biography pages

The `/ai`, `/web3`, and `/bio` pages are editorial portfolio narratives, not diagram pages. They use coherent prose introductions, selected project evidence, authentic photography, and deliberate image/text compositions. Diagrams, decorative flowcharts, repetitive timeline widgets, and diagram substitutes are not used on these routes. Featured projects may use large horizontal compositions aligned with the homepage design system. Long-form career content should not be forced into repeated two-column grids. Project media is sourced from the canonical project image registry, so asset updates do not require page-specific changes. Blog diagram guidance below does not apply to these three routes; diagrams remain appropriate in technical articles when they explain something text alone cannot.

Use the homepage shell, monochrome type, turquoise links, hairline borders, and `rounded-lg` media. Introductions are one left-aligned block (`PageIntro` `narrative`): `heroTitle`, then every intro paragraph through `PageLead` at the intro role (see [DESIGN.md](../../../DESIGN.md#page-introductions)). Body copy after the introduction uses `narrativeCopy`. Section headings sit `headingSpacing` (16px) above their description. No second text column and no intro image. The first section uses `narrativeIntroGap` (56px mobile, 80px desktop). Later sections use `sectionGap` (64px mobile, 96px desktop). Whitespace separates chapters. Do not rule every chapter.

`/ai` and `/web3` present LegalAgent and ZTX with `EditorialWorkCard` `layout="feature"` (about 40% copy and 60% media, full shell width). Masterbots, Bitlauncher, Bitcash, Opyn, and RareMint use `layout="landscape"` in a two-up grid. `/web3` protocols are `ProjectTextRow` links, not image cards. The editorial description lives in the card. Do not repeat it beside a thumbnail. `/bio` renders its four chapters with `BioTimeline`, every chapter with its media on the right at `lg+` (see Career story below); it uses no `EditorialWorkCard` layouts. Covers come from `resolveProjectImage`. Use `object-cover` and adjust focal position when a frame would letterbox; do not edit the asset.

End these pages with résumé and conversation links. Do not repeat `LetsConnect` above the footer. Open Graph for `/ai` and `/web3` uses their generated landing cards (see [docs/agents/images.md](../images.md#landing-og)).

## Contact (`/contact`)

`InnerPageHero` stays full width, same display scale as the other inner pages. The page is one full-width column: the invitation line with context links, then the form. There is no hire-terms paragraph. The form is part of the server render, so the first paint includes the fields. Email and a call link sit under the title.

## Career story (`/bio`)

`/bio` stays on `siteColumn` and does not use the `/ai` or `/web3` card sequence. `PageIntro` (`narrative`) opens with the “My journey” lede and no portrait. `BioTimeline` renders four chronological chapters from `lib/bio/chapters.ts`: a left rail (year and category) at `lg+` (below `lg` the rail hides and the period line carries the marker, period, and category), center narrative (summary paragraphs, then the chapter's project links; there is no “Read the full story” disclosure, the expanded text stays in the llms and career-timeline sources), and registry or authentic photography on the right at `lg+`. Hairline dividers and flat turquoise markers only — no glow, card chrome, or decorative gradients. Do not route `/bio` through `CapabilityPage`.

### GenUI career timeline

`TimelineExperience` (`chapter-stack`) wraps the same `BioTimeline` composite as `/bio` via `components/genui/career-timeline.tsx`. Canonical chapter copy and media paths live in `lib/bio/chapters.ts`; project descriptions in expanded GenUI states remain package-owned. A four-stop chapter index, expandable stories, and grounded project evidence follow the same presentation rules as the page. No glow, shadow, animated scroll sequence, or new typeface.
