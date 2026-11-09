# Editorial image production

Read [DESIGN.md](design/editorial-images.md) for the canonical direction. Read the complete target article before making its image. This guide governs production, not article copy or page layout.

## Hero images (blog)

A post **hero image** is an optional cinematic editorial photograph referenced by MDX frontmatter `image`. Omit `image` when there is no hero yet; do not treat hero production as a prerequisite for adding or shipping a post. **In-article diagrams** (SVG under `public/images/diagrams/`, screenshots, and similar) explain the article and follow the diagram rules below; they are not hero images.

## Hero direction

A hero is a cinematic, photographic illustration of the article's idea. **Color is the only fixed constant**; scene, subject, setting, and metaphor change with every post. Past heroes range from a rocket launch and a futuristic city to a trading floor and a real photo, and that variety is intended. Do not default to "a person at a desk looking at glowing panels": use it only when the article is about that work, and never twice in a row.

- **Idea first.** Start from the article's central claim and find a concrete, visual metaphor for it: a place, an object, an action, or a moment someone could photograph. A reader who knows the title should get the connection without a caption. Prefer surprising and specific over generic tech imagery.
- **Palette (fixed).** Night or low light. Near-black, charcoal, and deep teal-green shadows; the site turquoise `#5cded6` as the light that marks the article's key element; one warm amber light (a lamp, a window, a doorway) as the only warm accent. No daylight, no other saturated hues, no blue or purple sci-fi light.
- **Look.** Photographic detail, cinematic lighting, shallow depth of field. One clear focal point, with the turquoise element on it.
- **People and machines.** People are optional and never Gabo or a recognizable real person. Show agents as light, motion, or objects rather than humanoid robots, unless the article is about robots.
- **No text.** No legible or pseudo text, signage, numbers, logos, or brand UI anywhere. Image models garble text; the Context Engineering hero's headings are the failure to avoid.
- **Framing.** Keep the focal element clear of the outer 6% so listing thumbnails keep it.

## Production

- Generate with an image model at its nearest 16:9 size, then resize to 1600 × 900; never stretch. Opaque sRGB, no baked corner radius, frame, or watermark.
- Deliver WebP at the path in frontmatter `image` (`public/images/YYYY/MM/<slug>.webp`), at most 300 KB with no visible banding in the dark areas.
- Generate two or three different concepts per post, not variations of one, and pick with the author.
- Social previews keep the title-led blog OG card; a hero does not become the OG image unless the post sets `ogImage`.
- In-article diagrams follow the flat SVG rules in [editorial-images.md](design/editorial-images.md#in-article-diagrams), not this direction.

## Fixed generation instruction

Write a `Scene:` paragraph for the concept, then append this instruction unchanged. Do not attach earlier heroes as references; they pull every image toward the same composition.

> Cinematic photographic illustration, 16:9 landscape. Night or low light. Palette: near-black, charcoal, and deep teal-green shadows; soft mint turquoise light (#5cded6) on the key element of the scene; one warm amber light source as the only warm accent. Photographic detail, shallow depth of field, one clear focal point. Absolutely no readable text, letters, numbers, signage, logos, or user interface text anywhere. No daylight, no blue or purple light, no humanoid robots.

### Example: Building for Agents

Source: [article](../../content/2026-11-building-for-agents.mdx). Destination: `public/images/2026/11/building-for-agents.webp`.

Meaning: agents are a new kind of customer; the same business serves people through its front door and agents through a door built for them.

> Scene: a small shop on a quiet street at night, seen from across the road. On the left, a warm amber front door with a window display, a person walking in. On the right side of the same building, a narrow service hatch outlined in turquoise light, where small floating points of turquoise light arrive and leave carrying tiny parcels. Both openings lead into the same lit interior.

## Review and integration

1. Check the output against the article's meaning and the `Scene:` paragraph. Reject legible or pseudo text, extra light colors, off-topic imagery, and clutter.
2. View it at full size and at 320 × 180. The palette should match the site, the idea should still read small, and the scene should differ from the last few heroes.
3. Preview the 1200 × 630 center crop and confirm the focal element survives it.
4. Set frontmatter `image` and, when the post shows the hero in the body, the same path in an image with alt text that describes the scene and the idea.
5. Follow [checks.md](checks.md) and [verify.md](verify.md) for the post. Report actual checks; do not claim generation or visual verification without evidence.

## Homepage/default OG

Approved composition for the site default social image (not per-post hero images).

**Copy (mirrors the homepage hero):**

- `Software for` / `humans and` / `agents.` — the homepage H1, white, three lines so it clears the portrait
- `Gabo Esquivel` — name, gray
- `Agentic Software Engineer` — role, turquoise
- `gaboesquivel.com` — URL, gray, bottom left

A turquoise bar runs across the top edge. Right-side artwork: the live homepage portrait (`public/images/gabo-portrait.webp`), scaled uniformly, right-aligned, and blended with `lighten` so its black backdrop never covers the type. The hero linework is drawn from the same geometry as the site (`lib/portrait-overlay.ts`), with labels outlined in IBM Plex Mono. Flat editorial palette (`#000000`, `#ffffff`, `#a3a3a3`, `#5cded6`).

**Assets**

| Output              | Path                          |
| ------------------- | ----------------------------- |
| PNG (file-based OG) | `app/opengraph-image.png`     |
| Alt text            | `app/opengraph-image.alt.txt` |

**Dimensions:** 1200 × 630, opaque sRGB, pure black background.

**Font:** IBM Plex Mono Regular in `assets/fonts/ibm-plex-mono/` (SIL Open Font License in `LICENSE.txt`). Text is converted to outlines; generation does not request remote fonts.

**Generation:** `bun run og:generate` (`scripts/generate-og.ts`). Reproduces the personal PNG, per-post editorial blog OG images under `public/images/og/blog/`, and project OG derivatives under `public/images/og/projects/`. Also runs in `bun run build` after Velite.

**Serving:** `app/og/route.ts` returns the bytes of `app/opengraph-image.png` at `/og` without remote fetch or secondary rendering. The homepage and the `pageMetadata` fallback point at `/og`. The file-based `app/opengraph-image.png` only reaches routes that set no Open Graph images of their own; do not rely on it, because `next dev` resolves it against the request host (localhost) rather than `metadataBase`.

## Which route uses which OG source

Every route emits `og:image` and `twitter:image` as an absolute `https://gaboesquivel.com` URL to a 1200 × 630 PNG.

| Route | Source |
| --- | --- |
| `/` | Personal card at `/og` |
| `/work`, `/work/[type]`, `/ai`, `/web3`, `/bio`, `/blog`, `/blog/category/[category]`, capability pages, `/tech`, `/tech/[category]`, `/explore`, `/about`, `/contact`, `/privacy`, `/docs`, `/cv` (every `focus`) | Landing card at `public/images/og/pages/{path}.png` ([Landing OG](#landing-og)) |
| `/blog/[slug]` | Frontmatter `ogImage`, else `public/images/og/blog/{slug}.png` ([Blog OG](#blog-og)) |
| `/project/[slug]` | `public/images/og/projects/{slug}.png` when the project has an `image`, else `/og` |
| Any other `pageMetadata` page | Explicit `images`, else its landing card, else `/og` |

`lib/page-metadata.ts` applies that order; `lib/og/resolve.ts` builds the blog and project URLs.

## Landing OG

Every landing page except the homepage gets the homepage card layout with its own headline in place of the H1: `/blog` reads "Blog", `/work/ai` reads "Applied AI.", `/tech/react` reads "React", and so on. `lib/og/landing.ts` lists every path and its headline; the dynamic sets (work types, blog categories, tech categories, and technologies) come from the same data as their routes' `generateStaticParams`. The headline is as large as fits the left column (72px over 2 lines, then 60, 48, and 40px over 3 lines). `pageMetadata` uses the page's card when the page passes no `images`; `/cv` reads it directly. `lib/og/landing.test.ts` fails when a static route has no card.

`bun run og:generate` writes the cards to `public/images/og/pages/` (about 100 cards, 27 MB). That folder is gitignored and is regenerated in every `bun run build`; run `og:generate` locally to preview a card. When adding a page, add its path and headline to `lib/og/landing.ts`.

## Blog OG

Every post without `ogImage` gets the same 1200 × 630 card from `lib/og/generate-article.ts`: an 8px turquoise top bar; the title in white IBM Plex Mono, as large as fits without truncation (84px over 2 lines, then 72, 60, and 52px over 3 lines, truncated with an ellipsis only at 52px); the frontmatter `summary` in gray at 28px, up to 3 lines with an ellipsis; and a footer with `Gabo Esquivel` in gray on the left and `gaboesquivel.com` in turquoise on the right. Posts do not get per-post diagrams.

## Homepage portrait hero

Photographic hero composition (exception to flat editorial hero rules). Source: `assets/homepage/v2/gabo-portrait.png`. Replace that PNG, then run `bun run hero:optimize` to write `public/images/gabo-portrait.webp` (full size, WebP quality 90) and `bun run og:generate` to refresh the personal OG. When the source dimensions change, update `portraitWidth` and `portraitHeight` in `lib/portrait-overlay.ts`. The homepage and the personal OG read the portrait path and size from that module. Layout and delivery: [DESIGN.md](design/home.md#homepage-portrait-hero). The legacy URL `/images/gaboesquivel-homepage.webp` redirects to the current portrait.

## Project images

Project card and hero images come from each package project’s `image` URL (canonical host `https://gaboesquivel.com`; the site strips that origin to a path under `public/`). Update the WebP or PNG in `public/images/work/` and the package `image` field together when art changes. After editing linked package markdown, run `bun run build` in `gaboesquivel` so `dist/` matches `content/`; `generate` alone does not refresh what Next imports.
