# gaboesquivel.com — product

## Purpose

Personal site for founders and technical or product leaders evaluating Gabo Esquivel for direct hire, international hire, or contracting through Blockmatic Labs LLC. It combines narrative landing pages, project and stack evidence, writing, a printable CV, and contact — without duplicating the `gaboesquivel` package as the fact source.

## Audience

Primary: founders and technical or product leads checking whether the work is real and relevant. Recruiters: concise paths to `/cv` and `/connect`. The site is not an alternate resume on every route; only `/bio` carries the full career arc.

## Information architecture (implemented)

**Primary nav** (`components/layout/navbar.tsx`): `/`, `/work`, `/ai`, `/web3`, `/bio`, `/blog` (labeled “writing”), `/connect`.

**Also shipped**

- `/explore` — sitemap-style directory of pages (`noindex`, footer link). Job: help visitors find the right page; not a narrative page. Featured row uses a 3-column grid (exception documented in `DESIGN.md`).
- `/project/[slug]`, `/work/[type]`, `/tech`, `/tech/[category]`, `/tech/[slug]` (per category routing), `/blog/[slug]`, `/blog/category/[category]`, `/cv`, `/cv?focus=ai|web3|fullstack`

**Standing boundaries**

- Do not restructure `/work` or `/project/[slug]` templates unless the task is explicitly about those surfaces.
- Blog posts from 2012–2019 are a period archive; do not rewrite them unless asked.
- `/cv` stays the printable CV; do not turn it into narrative copy.

## Worldview (single home)

On `/bio` only, grounded in Wink: technology should expand access rather than create new gatekeepers. Do not deliberately restate or paraphrase this on capability or project pages.

## Page jobs

One page, one job. Do not use a personal-connection intro or chronological career template unless the page is `/bio`.

### `/`

- Visitor: founder or product or technical lead
- Question: who is Gabo, and is the work real?
- Message: I build software products that make complex technology useful.
- Evidence: `legal-agent`, `wink`, `ztx`, `bitlauncher`
- Order: positioning, proof, projects, focus, bio preview, writing, `/connect`

### `/bio`

- Job: the only complete career narrative
- Spine: interfaces → products → complex systems → intelligent interfaces
- Chapter evidence: `costa-rica-js`, `wink`, Web3 projects, `legal-agent`
- State the access worldview once, grounded in Wink
- End in the present and link to `/connect`

### `/ai`

- Job: production AI product capability
- Primary evidence: `legal-agent`
- Supporting evidence: `masterbots`, Bitlauncher AI work
- Lower weight: `wizard-world`
- Do not retell the career or invent users
- CTA: `/connect`

### `/web3`

- Job: Web3 and financial-systems depth, not a biography
- Evidence: `knowledge-io`, `eos-costa-rica`, `chaingraph`, `bitcashbank`, `ztx`, `raremint`, `opyn`, `bitlauncher`
- Use American Express and `wink` only as a short financial-systems origin
- CTA: `/connect`

### `/work` and `/project/[slug]`

Template and structure changes only when the task targets those routes.

### Capability pages

Routes: `/fullstack`, `/frontend`, `/backend`, `/mobile`, `/startups`, `/institutions`, `/lead`.

- Open with a short capability thesis
- Use only relevant package projects as evidence
- Do not include a career chronology
- CTA: `/work`
- `/lead` title: Technical Leadership

### `/connect`

Use only facts already present in `LetsConnect`: direct hire, international hire, contracting through Blockmatic Labs LLC, cannot work under W-2, Costa Rica, and US Mountain Time.

### `/blog`

- Job: recent writing on shipping software — not a second bio or capability page
- Visitor: founder or technical lead checking whether the writing is specific and current
- Message: notes on AI, Web3, and engineering from real implementation work
- Evidence: current-era posts in the masonry; archive posts stay visible and dated
- Category pages name the writing slice only — do not target capability keywords owned by `/`, `/ai`, or `/web3`. `/blog/category/product` is writing about product work, not the “product engineer” capability claim owned by `/`
- CTA: read a post, then `/connect` via site chrome

### `/cv` and `/tech`

- `/cv`: default five-role product-engineering CV (AI + Web3)
- `/cv?focus=ai|web3|fullstack`: specialized variants in package `content/cv/`; site `app/cv/variants.ts` adds print page breaks and PDF paths. Five roles each plus one dated closing paragraph. Employment facts stay in package `content/experience`; variants select roles and override bullets only. Canonical stays `/cv`
- `/tech`: grouped stack index; preserve existing category URLs
- `/tech/[slug]`: implementation evidence and named projects; not a capability thesis page

### `/explore`

- Job: grouped links to every major page (capabilities, context, about)
- Not indexed for search; follow links allowed
- Copy is utilitarian; no capability thesis

## Repetition across pages

A project may appear on multiple pages when each occurrence serves that page's job. Reframe around the decision, system boundary, implementation detail, or evidence relevant to that page. Never copy-paste the same explanation across pages.

Example, LegalAgent:

- **Homepage:** what the product is.
- **AI:** model, retrieval, and voice tradeoffs.
- **Mobile:** Expo and native/realtime implementation.
- **Full stack:** the boundary between the client and administration system.
- **Backend:** retrieval categories, prompts as data, application services.
- **Bio:** where the work sits in the career arc.
- **CV:** verified responsibilities and technologies.
- **Project page:** complete implementation evidence.

If two pages would say the same sentence, one of them is probably doing the wrong job.

## SEO and metadata

Metadata must describe the page's actual job and verified evidence.

Keyword owners:

- `/`: Gabo Esquivel, agentic product engineer
- `/ai`: AI product engineering
- `/web3`: Web3 and blockchain product engineering
- `/fullstack`: full-stack product engineering
- `/frontend`: frontend engineering
- `/backend`: backend engineering
- `/mobile`: mobile engineering
- `/startups`: startup product engineering
- `/institutions`: institutional software engineering
- `/lead`: technical leadership
- `/bio`: Gabo Esquivel career story
- `/work`: selected software projects
- `/project/[slug]`: the named project
- `/connect`: work with Gabo Esquivel
- `/cv`: Senior Product Engineer CV
- `/tech`: technology stack
- `/blog`: writing and engineering notes

Do not make multiple narrative pages target the same career-story intent. Blog category pages name a writing slice only.

- Give every rewritten page a specific `title` and `description`.
- Put the page's keyword owner in the title naturally.
- Describe concrete capability or evidence. Do not list unrelated keywords.
- Keep Open Graph title and description aligned with page metadata.
- Use existing project images for project Open Graph data.

## Blog internal linking

Apply when authoring a new post. Do not open or edit existing posts solely to retrofit links.

Link to the most useful next step: domain capability (`/ai`, `/web3`, `/fullstack`, `/frontend`, `/backend`, `/mobile`, `/lead`, `/startups`, `/institutions`), named project (`/project/[slug]`), named technology (`/tech/[technology-slug]`), or `/connect`.

- Add only links that clarify or extend the current sentence.
- Use one link per destination in a post.
- Link a project only when the project is explicitly named.
- Link only to projects that existed by the post's publication date.
- Verify every route exists before linking.
- Prefer a domain page for a broad concept and a project or technology page for a specific implementation.
- Keep total contextual internal links to roughly three to five.
- Use descriptive anchor text. Do not force keywords.

## Non-goals

- Owning structured project/tech/CV facts (the `gaboesquivel` package).
- Replacing package project descriptions with separate essays on site pages.
- Visual identity or component invention (see `DESIGN.md`).

## When to update this file

Update `PRODUCT.md` when a page's job, evidence set, audience, keyword owner, or site-wide narrative rule changes. Update `DESIGN.md` for visual or interaction conventions. Update `AGENTS.md` for repo workflow, skills install, and agent process.
