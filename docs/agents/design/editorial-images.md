# Editorial images

Surface detail split from [DESIGN.md](../../../DESIGN.md), which holds the identity, tokens, and rules for every page and wins on conflict. Read this file when changing this surface.

## Editorial images

Every editorial image communicates a specific idea from its article. There are two kinds, each with one style.

**Hero images** are cinematic, photographic illustrations of the article's idea. Color is the one constant: night or low light, near-black and deep teal shadows, the site turquoise `#5cded6` on the key element, and one warm amber light. Scene, subject, and metaphor change with every post, and the series is meant to vary; a person at a desk with glowing panels is one option, not the template. No legible or pseudo text, logos, daylight, or other saturated colors.

**In-article diagrams** are flat and exact: pure black canvas, white and gray structure, turquoise for the one important relationship, and the site monospace for labels, as specified below. Photography and real project screenshots remain evidence and retain their original character.

Use image generation for hero images. Construct exact diagrams, arrows, labels, and factual relationships with SVG or another controlled layout tool. Add any typography after generation; never rely on generated text. In-article diagrams in `public/images/diagrams/` use this palette and the site monospace, and the page scales them to the content column width so they stay readable without horizontal scroll. Hero images do not contain the article title, logos, or a signature. No new triangle mark or monogram is approved. Social assets may use the author's name or domain as typeset attribution.

## In-article diagrams

A diagram is read inside the article, so its type sits next to the body text (16px) and the caption (14px), never above them as a poster. The image scales to the 768px content column, so every SVG unit renders at `768 / viewBox width` pixels. Size each diagram by its rendered type:

- Canvas: `viewBox="0 0 W H"` with W between 640 and 768 (640 is the default), matching `width` and `height` attributes, and a full-canvas `#000000` background rect. A narrow drawing widens its canvas and centers the content; it never shrinks the viewBox, because the page would scale its labels up.
- Type: IBM Plex Mono through the site monospace stack, regular weight, three sizes only. 16 for node titles in white `#ffffff` (about 19px rendered), 13 for supporting lines in gray `#a3a3a3` (about 16px), 12 for edge labels in gray chips (about 14px). Turquoise text marks the single focal node. Wrap a supporting line onto a second line rather than shrinking it.
- Nodes: `#111111` fill, `#555555` 1.5 stroke, 8 radius; the focal node takes a turquoise stroke. Primary flow uses 2-unit turquoise lines with open chevron markers; secondary flow uses 1.5-unit gray `#a3a3a3`. Edge labels sit on a black chip (22 high, 4 radius) over the line.
- Height: aim for no more than about 720 rendered pixels (H ≤ 600 at W 640) so the diagram and its caption fit in one desktop viewport. Prefer a wider layout over a taller one.
- Include `<title>` and `<desc>` describing the relationships, not the shapes.

`lib/diagrams.test.ts` enforces the canvas width, the three sizes, and the accessible name. On phones the diagram still scales down to the column, so keep labels short and a diagram to three columns at most.

A **hero image** is the optional editorial raster for a blog post (`image` in MDX frontmatter). Posts may ship without one; listings omit the hero when `image` is omitted. Open Graph uses build-time title-led images at `public/images/og/blog/{slug}.png` (optional `ogImage` frontmatter overrides): one layout for every post, with a turquoise top bar, a large white title, the post `summary` in gray, and the author and domain in the footer. No per-post diagrams. In-article diagrams stay SVG or evidence imagery and are not hero images.

Produce blog hero images at 1600 × 900 and OG compositions at 1200 × 630. Recompose for other formats; do not stretch or blindly crop. The palette and geometry stay consistent across the website, LinkedIn, and X. Existing assets are not automatically approved references, and this policy does not authorize a bulk replacement of older images or changes to listing layouts.

The hero direction, production specification, fixed generation instruction, and a worked brief live in [docs/agents/images.md](../images.md). This is the current direction for new editorial imagery; existing assets migrate only in explicitly scoped tasks.
