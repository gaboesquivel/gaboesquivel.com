# gaboesquivel.com product

## Purpose

Gabo Esquivel's personal site. It shows founders and technical or product leaders what Gabo has shipped, so they can decide whether to hire him directly, hire him internationally, or contract through Blockmatic Labs LLC. Project, technology, employment, and CV facts come from the `gaboesquivel` package; the site owns narrative, routes, presentation, and print layout.

## Audience

- **Founders and technical or product leads** check whether the work is real and relevant. Landing pages answer with named, verified projects.
- **Recruiters** need dates, titles, and a PDF: `/cv`, then `/contact`.
- **AI agents and LLM tools** read `/llms.txt` and `/llms-full.txt` (also served under `/.well-known/`), a plain-text corpus built from the same pages, projects, technologies, CVs, and current posts.

Only `/bio` tells the full career story. Other pages are not alternate resumes.

## Implemented surfaces

- Primary nav (`components/layout/navbar.tsx`): `/` (labeled “gabo”), `/work`, `/ai`, `/web3`, `/bio`, `/blog` (labeled “writing”)
- Capability and context pages: `/fullstack`, `/frontend`, `/backend`, `/mobile`, `/startups`, `/institutions`, `/lead`
- Projects: `/work`, `/work/[type]`, `/project/[slug]`
- Technologies: `/tech` and `/tech/[category]`, which serves both category pages and single-technology pages (`/tech/[slug]`). A technology with no project evidence redirects to `/tech`.
- Writing: `/blog`, `/blog/[slug]`, `/blog/category/[category]` (categories in `lib/blog-taxonomy.ts`). Posts before 2020 are the archive.
- CV: `/cv` and `/cv?focus=ai|web3|fullstack`, each with a PDF in `public/`
- `/explore`: directory of pages, linked from the footer
- Missing URLs (`app/not-found.tsx`) and failed pages (`app/error.tsx`, `app/global-error.tsx`) keep the site nav and link to `/` and `/explore`. They are not in the primary nav or `/explore` directory. Public HTML pages negotiate Markdown via `Accept: text/markdown` (and optional `.md` siblings such as `/index.md`) per [acceptmarkdown.com](https://acceptmarkdown.com/); HTML responses advertise the sibling with `Link: rel="alternate"` and page metadata. Missing paths with `Accept: text/markdown` receive HTTP 404 and a Markdown body with links to `/`, `/explore`, `/llms.txt`, and the sitemap
- Trust and integration pages (`/about`, `/contact`, `/privacy`, `/docs`): public identity, contact paths, privacy policy, and MCP integration docs for the site agent. `/connect` permanently redirects to `/contact`. Linked from the footer; not in the primary nav or `/explore` (`/docs` appears on `/explore` in the About group)
- `/ask`: Eve chat for notes and bookings; route stays available but is not in the primary nav, `/explore`, or the sitemap while the experience is in progress
- llms corpus: `/llms.txt`, `/llms-full.txt`, and their `/.well-known/` copies, built by `scripts/llms/`
- Redirects (`next.config.js`): `/cal` to Calendly, `/blog/tech/*` to `/tech/[slug]`, plus the Edge Config `redirects` list

## Page jobs

One page, one job. Do not use a personal-connection intro or chronological career template unless the page is `/bio`.

### `/`

- Visitor: founder or product or technical lead
- Question: who is Gabo, and is the work real?
- Message: I build useful and delightful software products (the `gabo` core line); current focus is agentic AI and onchain finance.
- Evidence: `legal-agent`, `wink`, `ztx`, `bitlauncher`
- Order: positioning, proof, projects, focus, bio preview, writing, `/contact`
- Hero: real portrait on desktop and an understated “Contact me” link to `/contact` at all widths.

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

- Job: human outreach — hire framing and the contact form (name, email, subject, message via Resend to contact@gaboesquivel.com)
- Visitor: founder, product or technical lead, or recruiter ready to write
- Message: same hire facts as `LetsConnect` (direct hire, international hire, Blockmatic Labs LLC, cannot work under W-2, Costa Rica, US Mountain Time); also email, `/cal`, and `/work`
- Not the site agent; `/ask` and `/mcp` remain documented on `/docs` and in the llms corpus

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

The page is the chat. People use it to ask, leave a note, or book a 15- or 30-minute call. A CV or resume request shows a download card with the PDF and a link to `/cv`. Other agents start a task at `/mcp` (`agent_start`, then `agent_get`). Notes go to contact@gaboesquivel.com. Bookings insert from the chat or from MCP, cap at 2 a day, then point at `/cal`. No confirm email. The portfolio stays a content site. Hire terms are not printed on the page; the agent and the llms export carry them. A broad experience or shipped-work question shows featured project media cards under the reply; each card opens the project page in a new tab.

Use only facts already present in `LetsConnect`: direct hire, international hire, contracting through Blockmatic Labs LLC, cannot work under W-2, Costa Rica, and US Mountain Time.

### `/docs`

- Job: how another agent calls the Gabo Esquivel MCP server at `/mcp` (`agent_start`, then `agent_get`), uses the published `cv` tool, or connects ChatGPT-style clients to `/mcp/cv` for a CV download card
- Visitor: integrator or coding agent wiring MCP
- Message: public Streamable HTTP endpoint, invocation protocol, what messages can do, limits, CV download surfaces, and what is not offered
- Canonical developer documentation URL; permanent redirects from `/developers`, `/developer`, `/mcp/docs`, and `/docs/mcp`
- Do not duplicate hire terms; link `/ask` and `/privacy`
- Not a second `/ask` page or API reference for unpublished tools

### `/blog`

- Job: recent writing on shipping software — not a second bio or capability page
- Visitor: founder or technical lead checking whether the writing is specific and current
- Message: notes on AI, Web3, and engineering from real implementation work
- Evidence: current-era posts in the masonry; archive posts stay visible and dated
- Hero image: optional per-post editorial art via MDX `image`; not required to publish. In-article diagrams are separate. See [DESIGN.md](DESIGN.md#editorial-images) and [docs/agents/content.md](docs/agents/content.md)
- Category pages name the writing slice only — do not target capability keywords owned by `/`, `/ai`, or `/web3`. `/blog/category/product` is writing about product work, not the “product engineer” capability claim owned by `/`
- CTA: read a post, then `/contact` via site chrome

### `/cv` and `/tech`

- `/cv`: default five-role product-engineering CV (AI + Web3). It stays a CV, not narrative copy.
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

- `/`: Gabo Esquivel, agentic product engineer
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
- `/ask`: work with Gabo Esquivel (chat; not in primary nav while in progress)
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

## Open questions

- `/cv` keyword owner is “Senior Product Engineer CV”, but the live title comes from the package's `content/cv/full.md` metadata: “Gabo Esquivel - Curriculum Vitae”. Decide which is intended; the fix lives in the package.
