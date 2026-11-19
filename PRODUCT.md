# gaboesquivel.com product

## Purpose

Gabo Esquivel's personal site. It shows founders and technical or product leaders what Gabo has shipped, so they can decide whether to hire him directly, hire him internationally, or contract through Blockmatic Labs LLC. Project, technology, employment, and CV facts come from the `gaboesquivel` package, and identity, positioning, and voice from the `gabo` skill in the same repo; the site owns narrative, routes, presentation, and print layout.

## Measurement

All on free tiers. Target markets are the US and Latin America; compare them against everyone else.

### Primary metric

**Contact actions per month**: a visitor starting a conversation about work. The site exists to bring in paid work, which cannot be measured automatically; reaching out is the closest automatic signal of that decision. Pageviews show reach, not value, so they only explain changes in this number.

Counted as Umami Cloud (free Hobby plan) events, sent server-side so ad blockers cannot hide them:

- `contact_sent`: the contact route handler, after Resend accepts the message.
- `cal_click`: `/cal` is a route handler that records the click, then redirects to Calendly (a `next.config` redirect runs no code).
- `booking`: a Calendly `invitee.created` webhook (free plan).
- `send_note` and `book_call` successes, from MCP or the homepage booking and note flow, attributed by channel (`mcp` or `site`).

Each event also increments an Upstash Redis counter by month, event, channel and country (`x-vercel-ip-country`), because Umami's free plan has no API and the dashboard needs the numbers.

Quarterly ground truth, by hand: how many contacts became paid work. Baseline and target: unknown until the events have a month of data.

### Supporting signals

Watched to explain the primary metric, never optimized on their own:

- Umami: country, referrers, visit duration, scroll depth, and which pages lead to `/contact`.
- Microsoft Clarity: recordings, heatmaps and scroll maps, to see why visitors stop before `/contact`. Loaded lazily; EEA, UK and Swiss visitors get its cookieless mode unless they opt in. `/privacy` discloses it.
- Vercel Web Analytics and Speed Insights: quick traffic view and real-user speed (short Hobby history).

### Quality guardrails

Regressions block; scores are not goals.

- Lighthouse on every pull request against the Vercel preview: median of 5 mobile runs; accessibility, best practices and SEO fail below 95; performance warns below 85 until a baseline exists.
- Weekly scheduled job: PageSpeed Insights (mobile and desktop) and CrUX field data when the site qualifies, plus the is-agentic.com score from its read-only report API, appended to history in the repo. is-agentic.com was 100/100 on 2026-11-09; a drop is the signal.

### Dashboard

`/analytics` is a private owner page, not part of the public site: Basic Auth with a password from an environment variable, `noindex`, and left out of the sitemap, search, `/explore`, the llms corpus and Markdown negotiation. It is a summary that links out:

- Contact actions this month and last, by event, with the US and Latin America apart from the rest (Redis counters).
- Latest Lighthouse scores with a short trend, and the current is-agentic.com score.
- Links to Umami, Clarity, Vercel and Calendly for engagement, recordings and traffic. Their charts are not rebuilt here.

## Audience

- **Founders and technical or product leads** check whether the work is real and relevant. Landing pages answer with named, verified projects.
- **Recruiters** need dates, titles, and a PDF: `/cv`, then `/contact`.
- **AI agents and LLM tools** read `/llms.txt` and `/llms-full.txt` (also served under `/.well-known/`), a plain-text corpus built from the same pages, projects, technologies, CVs, and current posts.

Only `/bio` tells the full career story. Other pages are not alternate resumes.

The current brand headline is **Agentic Software Engineer**. Historical employment/CV titles remain source-owned. The nav Search button and Cmd/Ctrl+K open the full-screen search overlay with a fixed input at the top on every route; the homepage "Ask me something" field is inline and opens the same overlay only when the visitor searches. `/ask` redirects to `/`. The overlay is the public generative surface.

## Implemented surfaces

- Primary nav (`components/layout/navbar.tsx`): `/` (labeled “gabo”), `/work`, `/ai`, `/web3`, `/bio`, `/blog` (labeled “blog”). Omitted on `/cv`, with the accent bar.
- Capability and context pages: `/fullstack`, `/frontend`, `/backend`, `/mobile`, `/startups`, `/institutions`, `/lead`
- Projects: `/work`, `/work/[type]`, `/project/[slug]`
- Technologies: `/tech` and `/tech/[category]`, which serves both category pages and single-technology pages (`/tech/[slug]`). A technology with no project evidence redirects to `/tech`.
- Writing: `/blog`, `/blog/[slug]`, `/blog/category/[category]` (categories in `lib/blog-taxonomy.ts`). Posts before 2020 are the archive.
- CV: `/cv` and `/cv?focus=ai|web3|fullstack`, each with a PDF in `public/`
- `/explore`: directory of pages, linked from the footer
- Missing URLs (`app/not-found.tsx`) and failed pages (`app/error.tsx`, `app/global-error.tsx`) keep the site nav and link to `/` and `/explore`. They are not in the primary nav or `/explore` directory. Public HTML pages negotiate Markdown via `Accept: text/markdown` (and optional `.md` siblings such as `/index.md`) per [acceptmarkdown.com](https://acceptmarkdown.com/); HTML responses advertise the sibling with `Link: rel="alternate"` and page metadata. Missing paths with `Accept: text/markdown` receive HTTP 404 and a Markdown body with links to `/`, `/explore`, `/llms.txt`, and the sitemap
- Trust and integration pages (`/about`, `/contact`, `/privacy`, `/docs`): public identity, contact paths, privacy policy, and docs for the public MCP capability tools at `/mcp`. `/connect` permanently redirects to `/contact`. Linked from the footer; not in the primary nav or `/explore` (`/docs` appears on `/explore` in the About group)
- `/ask`: redirects to `/`. Not a mounted chat page. Not in the primary nav.
- llms corpus: `/llms.txt`, `/llms-full.txt`, and their `/.well-known/` copies, built by `scripts/llms/`
- Redirects (`next.config.js`): `/cal` to Calendly, `/blog/tech/*` to `/tech/[slug]`, plus the Edge Config `redirects` list

## Page jobs

One page, one job. Do not use a personal-connection intro or chronological career template unless the page is `/bio`.

### `/`

- Visitor: founder or product or technical lead
- Question: who is Gabo, and is the work real?
- Message: I build useful and delightful software products (the `gabo` core line); current focus is agentic AI and onchain finance.
- Evidence: `legal-agent`, `wink`, `ztx`, `bitlauncher`
- Order: split hero, full-width search, selected work (LegalAgent lead, then Wink, ZTX, Bitlauncher), an “Explore by focus” row, writing; the footer carries the “Start a conversation” invitation
- Hero: all-white “Software for humans and agents.”, muted “GABO ESQUIVEL” and turquoise “Agentic Software Engineer”, no pitch paragraph (the headline carries the core line; `siteHeroPitch` in `lib/site-identity.ts` feeds the llms exports), real portrait and Product/Design/Engineering/Delivery geometry. A local published-content search (the homepage field, Cmd/Ctrl+K or nav Search all open the same full-screen overlay) submits on Enter and renders a validated GenUI result in the overlay (`/api/genui/compose`); curated suggestions and equivalent canonical queries route deterministically without model calls.

### `/bio`

- Job: the only complete career narrative
- Spine: interfaces → products → complex systems → intelligent interfaces
- Chapter evidence: `costa-rica-js`, `wink`, Web3 projects, `legal-agent`
- Worldview, stated once and grounded in Wink: technology should expand access rather than create new gatekeepers. Capability and project pages do not restate or paraphrase it.
- End in the present and link to `/contact`

### `/ai`

- Job: production AI product capability
- Primary evidence: `legal-agent`
- Supporting evidence: `masterbots`, Bitlauncher AI work
- Lower weight: `wizard-world`
- Do not retell the career or invent users
- CTA: `/contact`

### `/web3`

- Job: Web3 and financial-systems depth, not a biography
- Evidence: `knowledge-io`, `eos-costa-rica`, `chaingraph`, `bitcashbank`, `ztx`, `raremint`, `opyn`, `bitlauncher`
- Use American Express and `wink` only as a short financial-systems origin
- CTA: `/contact`

### `/contact`

- Job: human outreach — a one-line ask and the full-width contact form (name, email, subject, message via Resend to contact@gaboesquivel.com)
- Visitor: founder, product or technical lead, or recruiter ready to write
- Message: what are you building and where is it stuck; also email, `/cal`, `/work`, and `/bio`. The homepage Connect section carries a short hire line and the footer a hire note; the full terms (including that Gabo cannot work under W-2) live in the 1099 post, the CV and the llms index, not here
- `/ask` redirects to `/`; the public MCP tools at `/mcp` are documented on `/docs`

### `/work` and `/project/[slug]`

- `/work`: featured projects (package `type` includes `featured`), a type filter (`/work/[type]`; `all` lists every project), then recent writing
- `/project/[slug]`: complete implementation evidence for one project; title and description come from the package

### Capability pages

Routes: `/fullstack`, `/frontend`, `/backend`, `/mobile`, `/startups`, `/institutions`, `/lead`.

- Open with a short capability thesis
- Use only relevant package projects as evidence
- Do not include a career chronology
- CTA: `/work`
- `/lead` title: Technical Leadership

### `/ask`

The route redirects to `/`. Notes and bookings are the contact form, the homepage booking controls when a visitor asks for them, and the MCP capability tools. The llms export and OpenAPI description point agents at those MCP tools; `lib/capabilities/published-copy.test.ts` fails when agent-facing copy names a tool the registry does not serve.

### `/docs`

- Job: how another agent calls the public MCP capability registry at `/mcp` (`book_call`, `contact_gabo`, `get_cv`, `get_profile`, `list_availability`, `list_projects`, `list_writing`, `search_site`, `send_note`). `/mcp/cv` is retired (410); CV links come from `get_cv` on `/mcp`
- Visitor: integrator or coding agent wiring MCP
- Message: public Streamable HTTP endpoint, invocation protocol, what messages can do, limits, CV download surfaces, and what is not offered
- Canonical developer documentation URL; permanent redirects from `/developers`, `/developer`, `/mcp/docs`, and `/docs/mcp`
- Do not duplicate hire terms; link `/contact` and `/privacy`
- Not a second `/ask` page or API reference for unpublished tools

### `/blog`

- Job: recent writing on shipping software — not a second bio or capability page
- Visitor: founder or technical lead checking whether the writing is specific and current
- Message: notes on AI, Web3, and engineering from real implementation work
- Evidence: current-era posts in the masonry; archive posts stay visible and dated
- Hero image: optional per-post editorial art via MDX `image`; not required to publish. In-article diagrams are separate.
- Category pages name the writing slice only — do not target capability keywords owned by `/`, `/ai`, or `/web3`. `/blog/category/product` is writing about product work, not the “product engineer” capability claim owned by `/`
- CTA: read a post, then `/contact` via site chrome

### `/cv` and `/tech`

- `/cv`: default five-role product-engineering CV (AI + Web3). It stays a CV, not narrative copy. A PDF download sits under the title; the page has no focus switcher. No writing list is appended.
- `/cv?focus=ai|web3|fullstack`: specialized variants in package `content/cv/`; site `app/cv/page-breaks.ts` and `lib/cv-paths.ts` add print breaks and PDF paths. Five roles each plus one dated closing paragraph. Employment facts stay in package `content/experience`; variants select roles and override bullets only. Each variant's page title and description come from its package `metadata`. Canonical stays `/cv`
- `/tech`: grouped stack index; preserve existing category URLs
- `/tech/[slug]`: implementation evidence and named projects; not a capability thesis page

### `/explore`

- Job: every major page in one place: a featured row, then capabilities, context, and about (`lib/landing-pages.ts`)
- Not indexed for search; follow links allowed
- Copy is utilitarian; no capability thesis

### llms corpus

- Job: an authoritative plain-text view of the site for AI tools
- `scripts/llms/authority.ts` sets the authority order and the strongest project evidence. Hire terms appear on `/contact` (form) and `/ask` (agent export); other pages' on-site CTAs point at `/contact`.
- `/llms-full.txt` leaves out pre-2020 posts

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

- `/`: Gabo Esquivel, agentic software engineer
- `/ai`: AI engineering
- `/web3`: Web3 engineering
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
- `/contact`: contact Gabo Esquivel
- `/ask`: redirect to the homepage; not a chat keyword target
- `/docs`: Gabo Esquivel MCP
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

Link to the most useful next step: a related blog post, domain capability (`/ai`, `/web3`, `/fullstack`, `/frontend`, `/backend`, `/mobile`, `/lead`, `/startups`, `/institutions`), named project (`/project/[slug]`), named technology (`/tech/[technology-slug]`), or `/contact`.

- Add only links that clarify or extend the current sentence.
- Use one link per destination in a post.
- Link a project only when the project is explicitly named.
- Link only to projects that existed by the post's publication date.
- Verify each selected route exists using its route or content slug; this does not require auditing other destinations.
- Prefer a domain page for a broad concept and a project or technology page for a specific implementation.
- Roughly three to five contextual internal links is a guideline, not a quota. Use fewer when they sufficiently serve the piece.
- Use descriptive anchor text. Do not force keywords.

## Non-goals

- Owning project, technology, employment, or CV facts. They come from the package, and project cards use package descriptions instead of separate essays.
- A second career narrative outside `/bio`.
- Paid analytics (Vercel Pro, paid Umami or PostHog tiers). Free tiers cover this traffic.
- Google Analytics 4. Heavy script and cookies for no signal the free stack lacks.

## Open questions

- `/cv` keyword owner is “Senior Product Engineer CV”. Package `content/cv/full.md` metadata title is “Gabo Esquivel — Software Engineering CV”. Align keyword owner with that metadata in a dedicated SEO pass if needed.
- Contact-action baseline and target are unknown until the Umami events have a month of data.
- Not verified: whether Umami's free plan shows visit duration, and whether gaboesquivel.com has CrUX field data yet.
