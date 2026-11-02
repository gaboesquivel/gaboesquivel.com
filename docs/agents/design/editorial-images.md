# Editorial images

Surface detail split from [DESIGN.md](../../../../../../DESIGN.md), which holds the identity, tokens, and rules for every page and wins on conflict. Read this file when changing this surface.

## Editorial images

Every editorial image communicates a specific idea from its article. Technical images show meaningful structures and relationships. Reflective images express the central experience through a clear visual metaphor. Both use the same palette, drawing style, spacing, and compositional discipline.

The approved direction is flat, diagram-like editorial illustration: pure black canvas, white and neutral-gray shapes and lines, and turquoise `#5cded6` marking the important relationship or subject. Use sparse, recognizable objects, clear boundaries, generous negative space, and consistent strokes. No dimensional rendering, shadows, glow, glass, grain, gradients, futuristic offices, robots, decorative code, or technology-logo collages. Organic subjects such as grass and trails use the same simplified drawing language. Photography and real project screenshots remain evidence and retain their original character.

Choose the visual structure from the content:

- Technical explanation: components, boundaries, connections, or flow.
- Engineering perspective: a comparison, tradeoff, progression, or feedback loop.
- Personal reflection: a concrete visual metaphor grounded in the author's account. Do not turn personal experience into a scientific causal claim.

Use image generation for conceptual artwork. Construct exact diagrams, arrows, labels, and factual relationships with SVG or another controlled layout tool. Add any typography after generation; never rely on generated text. In-article diagrams in `public/images/diagrams/` use this palette and the site monospace, and the page scales them to the content column width so they stay readable without horizontal scroll. Hero images do not contain the article title, logos, or a signature. No new triangle mark or monogram is approved. Social assets may use the author's name or domain as typeset attribution.

A **hero image** is the optional editorial raster for a blog post (`image` in MDX frontmatter). Posts may ship without one; listings omit the hero when `image` is omitted. Open Graph uses build-time title-led images at `public/images/og/blog/{slug}.png` (optional `ogImage` frontmatter overrides): one layout for every post, with a turquoise top bar, a large white title, the post `summary` in gray, and the author and domain in the footer. No per-post diagrams. In-article diagrams stay SVG or evidence imagery and are not hero images.

Produce blog hero images at 1600 × 900 and OG compositions at 1200 × 630. Recompose for other formats; do not stretch or blindly crop. The palette and geometry stay consistent across the website, LinkedIn, and X. Existing assets are not automatically approved references, and this policy does not authorize a bulk replacement of older images or changes to listing layouts.

Production specifications, the fixed generation brief, and the first three hero-image briefs live in [docs/agents/images.md](../images.md). This is the current direction for new editorial imagery; existing assets migrate only in explicitly scoped tasks.
