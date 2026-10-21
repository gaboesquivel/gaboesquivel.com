# Editorial image production

Read [DESIGN.md](../../DESIGN.md#editorial-images) for the canonical direction. Read the complete target article before making its image. This guide governs production, not article copy or page layout.

## Hero images (blog)

A post **hero image** is optional editorial raster art referenced by MDX frontmatter `image`. Omit `image` when there is no hero yet; do not treat hero production as a prerequisite for adding or shipping a post. **In-article diagrams** (SVG under `public/images/diagrams/`, screenshots, and similar) explain the article and follow the diagram rules below; they are not hero images.

## Fixed production specification

- Hero master: 1600 × 900, opaque sRGB, pure black `#000000` background, no outer frame or baked corner radius.
- OG export: 1200 × 630. Recompose from the master; preserve all meaningful objects. Social post variants may be square or portrait when requested. Profile banners require their own platform-specific layout and avatar-safe area.
- Artwork colors: white `#ffffff`, gray `#a3a3a3`, dark gray `#404040`, and mint `#54e8b3`. Antialiasing may introduce intermediate edge pixels. No other intentional colors.
- At 1600 × 900: 4px primary strokes, 2px secondary strokes, round caps and joins, 12px radius for rectangular containers. Scale these proportionally for other exports. Generated approximations must be visually consistent; use controlled vector construction when exact geometry is required.
- Keep meaningful content inside an 80px inset on all sides. Leave at least one third of the canvas empty. Separate unrelated elements by at least 40px. Use a front-facing, flat view with no perspective or simulated depth.
- One focal relationship per hero image, at most five principal objects or groups. Mint highlights that relationship or the subject; it is not an overall color wash. White carries primary structure; gray carries supporting detail.
- No text, article titles, numbers, logos, watermarks, signature, or full-bleed decorative grid in generated hero artwork. No humans, robots, brains, cityscapes, floating dashboards, photorealism, 3D objects, shadows, bloom, grain, gradients, or extra accent colors.
- Exact diagrams use SVG or controlled layout, with manually specified connections and labels. Use the site's monospace stack for SVG text. In-article diagrams live in `public/images/diagrams/` and scale to the content column width (no horizontal scroll), not as 16:9 cover crops. Raster typography must use one explicitly selected installed monospace face consistently across the batch. Never ask the image model to typeset labels.
- Preserve source artwork when available. Deliver WebP hero images at the paths referenced by frontmatter `image`, targeting at most 300 KB without visibly damaged edges. PNG may be used as an intermediate. Inspect the output; do not merely rename another format to `.webp`.

## Fixed generation instruction

Use this instruction unchanged, followed by exactly one approved composition below. Attach the first accepted hero image as a style reference for subsequent hero images; do not use the older cinematic hero artwork as style references.

> Create a flat editorial illustration for Gabo Esquivel's website. Landscape 16:9, target 1600 × 900. Pure black background. Use only white, neutral gray, dark gray, and mint #54e8b3. Clean vector-like outlines, consistent round-ended strokes, sparse flat shapes, no perspective, no depth effects. At the target size use 4px primary strokes and 2px secondary strokes. Leave an 80px outer safe area and at least one third of the canvas empty. Mint identifies the main relationship or subject. Follow the supplied composition exactly. Draw only the specified objects. No text, letters, numbers, titles, logos, watermarks, people, robots, brains, cityscapes, dashboards, decorative code, grids, photography, 3D rendering, shadows, glow, glass, grain, gradients, or additional colors. Do not invent supporting objects or change the composition.

These are text-free editorial metaphors, not substitutes for explanatory diagrams. Generation must not fabricate technical connections. If a requested image requires accurate labels or topology, build that portion deterministically.

## First batch: three hero images

Generate in this order. Coordinates refer to the 1600 × 900 master. They specify object placement, not text to render. Keep the same stroke treatment and visual density across all three.

### 1. Context Engineering

Source: [article](../../content/2026-09-context-engineering.mdx). Destination: `public/images/2026/09/context-engineering.webp`.

Meaning: the harness selects useful material for the model's current context; available information is not all included automatically.

Composition: three small outlined document sheets form one source group at x=200–450, y=280–620. The top and bottom sheets are gray; the middle sheet is white. Each sheet has two short abstract horizontal strokes, no writing. A large white outlined rounded rectangle occupies x=650–1120, y=250–650 and represents the working context. Inside it, draw two small white document sheets neatly aligned. A single mint path runs from the middle source sheet through a mint opening in the rectangle's left boundary and ends at the first internal sheet. The unused source sheets have no connections. Leave the rightmost portion of the canvas empty. No arrows, additional nodes, or implied model-to-tool connections.

Do not change the existing in-article harness diagram (`public/images/diagrams/2026-09-context-harness.svg`).

### 2. Agentic Domain-Driven Design

Source: [article](../../content/2026-10-domain-driven-design.mdx). Destination: `public/images/2026/10/domain-driven-design.webp`.

Meaning: distinct contexts maintain their own internal models and connect through an explicit boundary.

Composition: two equally sized white outlined rounded rectangles at x=260–660 and x=940–1340, both y=280–620. Inside the left rectangle place three small white circles in a triangle arrangement. Inside the right rectangle place three small white squares in a vertical arrangement. Use gray internal connections within each group. At the midpoint of each facing boundary, create one small mint port. Connect these two ports with exactly one straight horizontal mint line across the gap. No other connection crosses either boundary. No arrows, labels, enclosing third container, or extra modules.

This is a boundary metaphor, not a literal architecture from a shipped project.

### 3. Touch Grass, Activate Clarity

Source: [article](../../content/2024-09-touch-grass.mdx). Destination: `public/images/2024/09/touch-grass.webp`.

Meaning: deliberately leaving the screen for a morning walk creates space for reflection.

Composition: one small gray outlined monitor with a black, empty screen and a simple stand at x=220–480, y=370–570. A single mint trail starts beneath and just to the right of the monitor at x=500, y=620, curves gently through x=800, y=560, and rises toward x=1120, y=400. Draw three sparse mint grass tufts beside the trail between x=820 and x=1180. Each tuft has three short strokes. Add one short gray curved hill contour near the trail's far end and one small white semicircle sun above that contour at approximately x=1190, y=320. Leave the upper half mostly empty. No desk, room, human figure, mountains, trees, arrows, productivity indicators, or return loop.

The sunrise and trail come from the author's morning hike. Do not imply a medical outcome or a measured performance improvement.

## Review and integration

1. Check each hero image against its article and exact composition. Reject invented objects, misleading relationships, incorrect palette, inconsistent strokes, clutter, and any generated text.
2. Inspect all three together at full size and at 320 × 180. Objects and the principal relationship must remain recognizable; the three hero images must feel related without becoming interchangeable.
3. Produce a 1200 × 630 OG crop preview for each, keeping every meaningful object visible. This preview verifies crop safety; do not add new metadata fields or exports to the site during this batch.
4. Replace only the three destination WebP files after review. Their existing frontmatter and inline references already point to those paths. Leave article text, diagrams, dates, metadata, routes, and listing components unchanged.
5. Follow [checks.md](checks.md) and [verify.md](verify.md) for the affected pages. Confirm image dimensions, format, size, browser rendering, and social crop previews. Report actual checks and any unavailable generation or browser capability; do not claim generation or visual verification succeeded without evidence.

This batch establishes the first reusable visual references. Profile banners, logos, and additional post replacements require separate briefs.

## Homepage/default OG

Approved composition for the site default social image (not per-post hero images).

**Copy (exact, unwrapped):**

- `Gabo Esquivel` — primary name, white
- `Agentic Product Engineer` — role, gray
- `gaboesquivel.com` — URL, mint

Right-side artwork: product-interface panel, two system component squares, mint and gray connector paths with two mint ports. Conceptual product engineering across interfaces and systems; flat editorial palette only (`#000000`, `#ffffff`, `#a3a3a3`, `#404040`, `#54e8b3`). No gradients, glow, or extra symbols.

**Assets**

| Output              | Path                          |
| ------------------- | ----------------------------- |
| SVG source          | `public/images/og/home.svg`   |
| PNG (file-based OG) | `app/opengraph-image.png`     |
| Alt text            | `app/opengraph-image.alt.txt` |

**Dimensions:** 1200 × 630, opaque sRGB, pure black background.

**Font:** IBM Plex Mono Regular in `assets/fonts/ibm-plex-mono/` (SIL Open Font License in `LICENSE.txt`). Text is converted to outlines in the SVG; generation does not request remote fonts.

**Generation:** `bun run og:generate` (`scripts/generate-home-og.ts`). Reproduces the SVG and PNG offline. Not part of `build` or content export.

**Serving:** Next.js file-based metadata uses `app/opengraph-image.png`. `app/og/route.ts` returns the same PNG bytes at `/og` for Twitter default (`summary_large_image`) without remote fetch or secondary rendering.
