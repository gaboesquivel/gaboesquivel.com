# Content changes

Read [PRODUCT.md](../../PRODUCT.md) for the page's job before editing copy. Voice, identity, and claims follow the installed `gabo` skill.

## Scope

- A content pass edits copy. Leave the Next.js version and the visual system unchanged.
- `/cv` stays the printable CV. `/work` and project-page templates stay as they are unless the task is explicitly about them.
- Blog MDX may be edited for voice alignment with landing pages. Posts from 2012–2019 are a period archive: rewrite one only when the task asks for that post. A landing-page pass leaves existing blog MDX unchanged.

When researching, one agent writes. Other agents, spawned read-only and in parallel, look up facts. They do not write, rewrite, outline, or search for a better voice.

## AI, Web3, and biography

`/ai`, `/web3`, and `/bio` are diagram-free editorial pages. Do not add diagrams through components, SVGs, images, or embedded content. Use real photography and project screenshots only where they support the nearby narrative; see [DESIGN.md](../../DESIGN.md#ai-web3-and-biography-pages).

Preserve substantive approved/live copy during layout work. Avoid repeating the same project description in prose and a card. `/bio` owns chronology and worldview; `/ai` and `/web3` explain their respective capabilities through verified work.

## Single blog post

Start with the brief, the `gabo` skill's relevant guidance, and PRODUCT's blog conventions and internal linking rules. Draft once the article's claims are supported. Look up only specific missing facts. For related posts, search titles, descriptions, or topic keywords and read only promising matches, stopping when useful links are supported. A single article does not require a whole-site scan.

**Hero image (optional).** The editorial 16:9 artwork for a post is its hero image. Set it with optional frontmatter `image` (path under `public/images/`, usually WebP). Omit `image` when the post has no hero yet; publishing does not require one. In-article SVG diagrams and screenshots are separate assets and do not substitute for a hero. Production rules live in [DESIGN.md](../../DESIGN.md#editorial-images) and [images.md](images.md). Do not generate or block shipping on a hero unless the task explicitly asks for one.

**Open Graph (blog).** Social previews use build-time title-led images (`public/images/og/blog/{slug}.png`), not the hero `image`. Optional frontmatter `ogImage` overrides that path when a post needs a dedicated social asset.

**In-article diagrams.** Store explanatory SVGs under `public/images/diagrams/`. In MDX, wrap each diagram in `<figure className="mx-auto max-w-3xl">` with a `<figcaption>`, one blank line before and after the figure block, and no `overflow-x-auto`. The post scales diagrams to the content column; see [DESIGN.md](../../DESIGN.md#editorial-images).

For a draft-only request, deliver the draft. When adding MDX to the repository, inspect the content schema or one existing post only as needed for publishing conventions, then run the applicable checks in [checks.md](checks.md). Read framework code, design guidance, or export implementations only when the task changes their behavior.

Done when the edit serves that page's job, archive posts are untouched unless the task named them, and a published post has passed the content checks.
