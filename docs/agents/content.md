# Content changes

Read [PRODUCT.md](../../PRODUCT.md) for the page's job before editing copy. Voice, identity, and claims follow the installed `gabo` skill.

## Scope

- A content pass edits copy. Leave the Next.js version and the visual system unchanged.
- `/cv` stays the printable CV. `/work` and project-page templates stay as they are unless the task is explicitly about them.
- Blog MDX may be edited for voice alignment with landing pages. Posts from 2012–2019 are a period archive: rewrite one only when the task asks for that post. A landing-page pass leaves existing blog MDX unchanged.

When researching, one agent writes. Other agents, spawned read-only and in parallel, look up facts. They do not write, rewrite, outline, or search for a better voice.

## Single blog post

Start with the brief, the `gabo` skill's relevant guidance, and PRODUCT's blog conventions and internal linking rules. Draft once the article's claims are supported. Look up only specific missing facts. For related posts, search titles, descriptions, or topic keywords and read only promising matches, stopping when useful links are supported. A single article does not require a whole-site scan.

**Hero image (optional).** The editorial 16:9 artwork for a post is its hero image. Set it with optional frontmatter `image` (path under `public/images/`, usually WebP). Omit `image` when the post has no hero yet; publishing does not require one. In-article SVG diagrams and screenshots are separate assets and do not substitute for a hero. Production rules live in [DESIGN.md](../../DESIGN.md#editorial-images) and [images.md](images.md). Do not generate or block shipping on a hero unless the task explicitly asks for one.

For a draft-only request, deliver the draft. When adding MDX to the repository, inspect the content schema or one existing post only as needed for publishing conventions, then run the applicable checks in [checks.md](checks.md). Read framework code, design guidance, or export implementations only when the task changes their behavior.

Done when the edit serves that page's job, archive posts are untouched unless the task named them, and a published post has passed the content checks.
