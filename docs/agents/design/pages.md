# Narrative page design

Surface detail split from [DESIGN.md](../../../DESIGN.md), which holds the identity, tokens, and rules for every page and wins on conflict. Read this file when changing this surface.

## AI, Web3, and biography pages

The `/ai`, `/web3`, and `/bio` pages are editorial portfolio narratives, not diagram pages. They use coherent prose introductions, selected project evidence, authentic photography, and deliberate image/text compositions. Diagrams, decorative flowcharts, repetitive timeline widgets, and diagram substitutes are not used on these routes. Featured projects may use large horizontal compositions aligned with the homepage design system. Long-form career content should not be forced into repeated two-column grids. Project media is sourced from the canonical project image registry, so asset updates do not require page-specific changes. Blog diagram guidance below does not apply to these three routes; diagrams remain appropriate in technical articles when they explain something text alone cannot.

Use the homepage shell, monochrome type, turquoise links, hairline borders, and `rounded-lg` media. Introductions are one left-aligned block (`PageIntro` `narrative`): `heroTitle`, then `narrativeLead`, then supporting `narrativeCopy`. No second text column and no intro image. The first section uses `narrativeIntroGap` (56px mobile, 80px desktop). Later sections use `narrativeSectionGap` (64px mobile, 96px desktop). Whitespace separates chapters. Do not rule every chapter.

`/ai` and `/web3` present LegalAgent and ZTX with `EditorialWorkCard` `layout="feature"` (about 40% copy and 60% media, full shell width). Masterbots, Bitlauncher, Bitcash, Opyn, and RareMint use `layout="landscape"` in a two-up grid. `/web3` protocols are `ProjectTextRow` links, not image cards. The editorial description lives in the card. Do not repeat it beside a thumbnail. `/bio` renders its four chapters with `BioTimeline`, every chapter with its media on the right at `lg+` (see Career story below); it uses no `EditorialWorkCard` layouts. Covers come from `resolveProjectImage`. Use `object-cover` and adjust focal position when a frame would letterbox; do not edit the asset.

End these pages with résumé and conversation links. Do not repeat `LetsConnect` above the footer. Open Graph for `/ai` and `/web3` uses their generated landing cards (see [docs/agents/images.md](../images.md#landing-og)).

## Contact (`/contact`)

`InnerPageHero` stays full width, same display scale as the other inner pages. From `lg`, the hire facts and the form sit side by side (`1fr` and a 26rem column). The form is part of the server render, so the first paint includes the fields. The message box is `h-44` / `sm:h-52` so the column stays close to the copy. Email and a call link sit under the title. Mobile stacks the hire facts, then the form, then the invitation and context links; from `lg` the form spans both rows beside the facts and the invitation.

## Career story (`/bio`)

`/bio` stays on `siteColumn` and does not use the `/ai` or `/web3` card sequence. `BioHero` opens with the approved `gabo-portrait.webp` (no homepage geometry overlay) and the “My journey” lede. `BioTimeline` renders four chronological chapters from `lib/bio/chapters.ts`: a left rail (year and category) at `lg+` (below `lg` the rail hides and the period line carries the marker, period, and category), center narrative with native `details` progressive disclosure, and registry or authentic photography on the right at `lg+`. Hairline dividers and flat turquoise markers only — no glow, card chrome, or decorative gradients. Do not route `/bio` through `CapabilityPage`.

### GenUI career timeline

`TimelineExperience` (`chapter-stack`) wraps the same `BioTimeline` composite as `/bio` via `components/genui/career-timeline.tsx`. Canonical chapter copy and media paths live in `lib/bio/chapters.ts`; project descriptions in expanded GenUI states remain package-owned. A four-stop chapter index, expandable stories, and grounded project evidence follow the same presentation rules as the page. No glow, shadow, animated scroll sequence, or new typeface.
