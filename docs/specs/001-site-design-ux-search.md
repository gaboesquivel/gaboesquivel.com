# 001: Site design, UX, motion and search consistency

Status: accepted (2026-11-02). Acceptance covers tasks 01–14 as scoped. Each item under [Needs approval](#needs-approval) still needs its own yes before its task starts.

Evidence: a site-wide audit on 2026-11-02 against `next dev` at `http://localhost:3099`. It covered 31 routes at 1440×900 and 390×844, spot checks at 768, emulated light colour scheme and reduced motion, the fixture lab, and the public MCP endpoint. Each finding below cites its source (`file:line`, a measured value, or a screenshot name from the evidence gallery linked in the pull request). Screenshots stay out of the repository, per [verify.md](../agents/verify.md).

## Problem Statement

A founder, lead or recruiter who opens the site on a phone or desktop should get one coherent reading column, where every page does its job and search works the same way everywhere. Today they get:

- Two search surfaces (the inline homepage prompt and the Cmd/Ctrl+K dialog) that disagree on Escape, reset, focus, error copy and fallback results. An off-topic question dead-ends on a result that promises "pieces … below" that never render.
- Accessibility gaps on every route: no skip link, the footer inside `<main>`, contact errors not tied to their fields, and focus dropped to `body` when the dialog closes.
- Motion that leaks outside the DESIGN.md budget. Every project cover flies across the page on a Work filter click, and the search dialog still zooms under reduced motion.
- Social cards missing on most routes, and inconsistent where they exist.
- Broken rendering on archive and diagram blog posts.
- Agent-facing surfaces whose loading, error and write states are fragile (a booking button can stay disabled forever) and whose MCP results are hard for agents to read.

The documents also describe surfaces that no longer exist (a nav chat sheet, the `/ask` connect cards), so agents keep building against a stale map.

## Solution

One pass that brings the site back inside its own design system rather than adding a new one. DESIGN.md stays the gate: one accent, hairline surfaces, mono type, no glass or shadows, and a small motion budget.

1. **Fix what is broken or inaccessible** on every route (findings V/U below).
2. **One search contract** shared by the homepage prompt and the dialog: one state machine, one copy table, the same focus and Escape rules, the same error and empty states, and one keyword ranker shared with MCP `search_site`.
3. **One agent-surface contract** for what happens after a request: loading, progress, tool results, errors, writes and receipts. It is consistent with search and checkable in the fixture lab.
4. **Motion back on token**: remove the leaks, align easings and durations, and respect reduced motion everywhere. A short list of new motion is proposed for approval, not decided here.
5. **Docs match the code**: remove claims about surfaces that are not mounted, once the user decides what to keep.

## Findings ranked by impact

Legend: **V** visual, **U** UX/a11y, **M** motion, **S** search, **A** agent surfaces. ⚠ means the fix changes a documented decision and is listed under [Needs approval](#needs-approval).

### High

| ID | Finding | Evidence | Fix (inside DESIGN.md unless ⚠) |
| --- | --- | --- | --- |
| S1 | An off-topic question returns "…pieces that I can assemble are below." with nothing below, no Try again, and announces "Results ready." | `d-home-11-freetext-noanswer.png`; `lib/genui/recover-composition.ts:90-93`, `components/genui/generated-region.tsx:117` | An explicit **empty** state (see the search contract) that never announces "ready" |
| U1 | No skip link. The footer renders inside `<main>`, so there is no `contentinfo` landmark and 7 tab stops come before content | `app/layout.tsx:84-91` | Skip link to `#main`; footer becomes a sibling of `<main>` |
| U2 | Contact errors are not tied to their fields: no `aria-invalid`/`aria-describedby`, the Message error is a plain `<span>`, no `required`/`autocomplete`, spellcheck on email, and the server error is `text-red-800` on black (≈2.5:1) | `desktop-1440-contact-empty-submit-errors.png`; `app/contact/contact-form.tsx:97`, `:196-205` | Field primitives wire invalid state and descriptions, focus the first invalid field, and use `red-400` for the banner |
| U3 | Hydration error on diagram posts: `<figure>` inside `<p>` | `/blog/2026-10-generative-interfaces`; `components/mdx.tsx:48-50` | Unwrap image-only paragraphs in MDX |
| V1 | Most routes emit no `og:image` (work, blog index and categories, all 7 capability pages, tech, contact, privacy, docs) while declaring `summary_large_image` | `lib/page-metadata.ts:31-42` (images only when passed) | Default `images` in the metadata helper to the title-led site OG |
| V2 | Social cards do not look like one family: `/ai` is a 7080×4792 mockup (527 KB, 1.48:1), `/web3` is a ZTX site screenshot (1.3 MB), `/bio` uses webp, `/explore` emits a localhost URL | `og/og-ai.png`, `og/og-web3.png` | ⚠ Title-led 1200×630 PNGs from `scripts/generate-og.ts` for `/ai`, `/web3`, `/bio`; fix the `/explore` URL. Coordinate with the in-flight `feat/landing-og` branch. Mood reference: [details.so/inspo](https://www.details.so/inspo) |
| V3 | About 25 legacy covers are 660×321 and stretch to 1088px with `object-contain`, leaving black bands and losing the rounded corners | `d-project-arinc-microfids.png`; `components/work/project-hero.tsx:34`, `project-case-study.tsx:168` | `object-cover` plus focal position (DESIGN.md already requires it); cap the rendered width for small sources |
| V4 | Archive posts render broken: a literal `##Setting Up…`, code-block padding on the first line only, inline code showing literal backticks inside a pill | `d-blog-archive-code.png`, `d-blog-archive-codeblock.png`; `content/2014-04-introduction-to-gulpjs.mdx:16`, `pre code{padding:10px !important}` in `app/global.css` | Fix the content line, pad `pre` instead of `code`, drop the backtick pseudo-content |
| M1 | Every editorial cover carries a raw `viewTransitionName`, so a Work filter click snapshots 40+ covers. They animate at the browser's default 250ms, not the 180ms token (the transition settles 381–620ms after the click), and covers slide over other cards' text. The intended card-to-detail morph never runs because project navigation starts no transition | `work-filter-midtransition-110ms.png`; `components/work/editorial-project-card.tsx:42-44`, `components/work/project-hero.tsx:25` | Remove the raw names. The morph is proposal M-B ⚠ |
| A1 | GenUI booking and contact writes are fragile: availability has no loading or error state (a failed fetch silently shows `[]`), `confirm`/`submit` have no `finally` (a network error leaves the button disabled forever), `retryIdentity` is regenerated per click and the form stays enabled after success (a double booking or send is possible, against SPEC-openui-experiences:37), the mobile select lists 161 slots, and "Context: profile" leaks to visitors | `lab-booking-hire-1440.png`, `home-booking-390-slots.png`; `components/genui/genui-booking-flow.tsx:16-40`, `:71-102`, `genui-contact-form.tsx:14-38`, `:48` | Agent-surface contract items 6 and 7 |
| A2 | The GenUI two-column rail never applies: `@container/genui` and `@min-[48rem]:grid` sit on the same element. Below 48rem the aside is hidden, so "booking is not created until you approve" disappears on mobile (against SPEC-openui:29). The copy says US Mountain Time but slots show "CST" | `components/genui/genui-experience-views.tsx:24`, `:218`, `:242` | Put the container on a wrapper; keep the approval line visible at every width; label slots in the stated zone |
| A3 | MCP results are hard for agents to use: `content.text` is only "Profile loaded." or "Search results ready.", errors lack `isError`, no read/write annotations (`book_call` and `send_note` are not marked as writes), no `outputSchema`, titles repeat tool names, and a bad Accept header returns an empty 406/400 | `mcp-tools-list.txt`, `mcp-list_projects-badcursor.json`; `lib/mcp/public-server.ts:12-27` | Agent-surface contract item 9. Supports SPEC-mcp-app.md:17-19 |

### Medium

| ID | Finding | Evidence | Fix |
| --- | --- | --- | --- |
| S2 | Focus is lost: dialog close sends focus to `body`, the homepage back-arrow reset does the same, and Try again removes itself | `d-dialog-04-after-escape.png`, `d-home-06-after-back.png`; `components/search/site-search-shell.tsx:78`, `components/genui/homepage-shell.tsx:46-56` | Focus rules in the search contract |
| S3 | Escape erases the typed query (`type="search"`). The native clear button shows in blue, off-palette | `d-home-05-after-escape.png`; `components/search/site-search-field.tsx:107`, `components/genui/genui-search-combobox.tsx:137-160` | `type="text"` combobox; Escape never clears text |
| S4 | Errors differ per surface: only the dialog lists keyword matches, the copy is the internal "Composition failed.", the 429 cap message is dropped, a 15s server deadline is indistinguishable from failure, and the dialog fallback filters the rewritten command so it rarely matches | `d-home-08-error.png`, `d-dialog-05-error.png`, `dialog-error-390.png`; `lib/genui/messages.ts:1`, `components/genui/use-genui-composition.ts:64-73` | Error copy table in the search contract |
| S5 | Homepage Try again re-runs the field's current text, not the failed query. An edited, unsubmitted query becomes a paid call and lands in Recent. The dialog correctly uses `submitted` | `home-retry-after-edit.png`; `components/genui/homepage-shell.tsx:88-94` | Retry uses the last submitted query |
| S6 | Closing the dialog unmounts the panel, discarding results, drafts and booking receipts (the receipt lives in the dialog's own provider) | `m-dialog-02-result-booking.png`; `components/search/site-search-panel.tsx:75-80`, `:203` | ⚠ Persist session state above the dialog (S-P1) |
| S7 | The clicked suggestion label is replaced by its hidden canonical query in the field and in Recent; failed queries are saved to history; the list is named "Example interview questions" although it holds Recent and site items | `home-ai-result-1440.png`; `components/genui/genui-search-combobox.tsx:87-95`, `use-genui-composition.ts:52` | ⚠ Echo the visitor's words (S-P2); history stores successful queries only; list named "Suggestions" |
| S8 | The search dialog breaks surface rules: `rounded-xl` (14px), a `backdrop-blur` overlay (glass is banned), full-viewport width (≈1408px vs the 1088px column), the suggestion list spilling past the panel, and a centre-origin zoom that still runs under reduced motion (`motion-reduce:transition-none` does not stop keyframes) | `d-search-dialog.png`, `d-dialog-01-open.png`; `components/ui/command.tsx:54`, `components/ui/dialog.tsx:55`, `components/search/site-search-shell.tsx:81` | Call-site overrides only (vendor files untouched); see motion M-E |
| S9 | Mobile homepage prompt is about 155px wide for text: the Beta badge, the ⌘K hint and the native clear button crowd it, and the placeholder truncates to "Ask about my \" | `mvp-home.png`, `m-home-03-result.png` | Hide the hint below 640px, use `type="text"`, ⚠ shorter placeholder below 640px (S-P3) |
| S10 | Three keyword matchers (suggestions and dialog fallback, MCP `search_site`, compose) rank differently; `search_site` returns 0 results for "AI", only `/` for "agents", and one result titled "/contact" for "hire" | `mcp-search-queries.txt` | One ranker with synonyms, shared by all three. [turbopuffer v3](http://turbopuffer.com/v3) only if lexical plus synonyms is not enough (free tier) |
| U4 | Headings skip from h1 to h3 on `/work/[type]`, `/blog/category/[c]` and `/tech/[x]` | DOM audit | A results h2 (visually hidden if needed) or a heading-level prop on cards |
| U5 | Blog heading anchors are unnamed tab stops (5 on the sampled post) | DOM audit | `aria-hidden` and `tabIndex={-1}`, or a name |
| U6 | ⚠ Primary nav targets are 36px tall on mobile (`h-9`, "ai" is 34×36); the search button is 44px | `components/layout/navbar.tsx:41` | `h-11` on coarse pointers (U-P1) |
| U7 | `FilterNav` renders navigation links with `role="button"` (CV focus switcher, filters) | `components/shared/page-layout.tsx:123-136` | Plain styled `Link` with `aria-current` |
| U8 | The blog TOC highlights the item after the one clicked (3 of 3 tries), and the sticky TOC comes last in tab order | `blog-toc.png`; `components/interior/article-toc-nav.tsx:30` | Set active on click; `rootMargin: "0px 0px -70% 0px"`; move the rail earlier in DOM order |
| V5 | The Bitlauncher wordmark is cropped at the top of the 21:9 `/work` frame | `d-work-bitlauncher-crop.png`; `components/work/editorial-project-card.tsx:40` | Per-slug focal position |
| V6 | `/blog` featured post without a hero image falls back to the OG card, so the title shows twice; DESIGN.md says listings omit the hero | `d-blog.png`; `components/blog/writing-featured-post.tsx:59` | Omit the media column when `image` is absent. Typography reference: shadcn/typeset via [chatbot-template](https://github.com/shadcn-ui/chatbot-template) (prose only, if it fits the mono system) |
| V7 | Banned eyebrow and all-caps: a "Featured work" label (`featured-project-card.tsx:25`, `editorial-work-card.tsx:86`) and `uppercase` bio rail categories (`bio-timeline-entry.tsx:40`). The homepage "GABO ESQUIVEL" is approved in PRODUCT.md and stays | source | Remove the label; sentence case on the rail |
| V8 | Project pages have uneven headings ("Selected contributions" 16px vs "Technologies" 24px); projects with no related posts fall back to "Latest Articles" (Title Case, 8 unrelated AI posts, even on a 2013 Rails project) where other routes show "Writing" with 3–4 posts | `components/blog/latest-posts.tsx:9` | `sectionTitle` on both; omit the writing block when nothing is related, or show 3 under "Writing" |
| V9 | The sticky homepage prompt uses `bg-black/95 backdrop-blur`, which is glass | `components/genui/homepage-shell.tsx:63` | Solid `bg-black` with a hairline bottom border |
| M2 | The active Work filter label disappears for the whole 180ms indicator morph (the indicator snapshot paints over it) | `work-filter-midtransition-110ms.png` | Motion M-C |
| M3 | No rule times the `root` crossfade (it runs at 250ms default), and there is no `::view-transition { pointer-events: none }`, so clicks during a morph are lost | probe `vt-probe.js` | Motion M-D |
| A4 | No Stop and no client timeout; the back arrow is the only exit and wipes the query and drafts | source | ⚠ Agent contract item 5 (A-P1) |
| A5 | No progress or source visibility: the stream emits `start`/`partial`/`complete` but the UI only shows "Composing results…". Deterministic routes return in under 1s, so the shimmer flashes | `home-ai-loading-1440.png` | Contract items 1 and 3 |

### Low

| ID | Finding | Evidence | Fix |
| --- | --- | --- | --- |
| V10 | No `color-scheme: dark` on `<html>` (computed `normal`): under an OS light theme, scrollbars and the search input render light; `components/tweet.css` keys off `prefers-color-scheme` | `light-*.png` | `scheme-dark` on `<html>`; key tweet.css on `.dark` |
| V11 | `/contact` copy column sits 32px right of the H1 (`mx-auto max-w-5xl`), and "Email Address" is Title Case | `app/contact/page.tsx:40` | Align to the shell; sentence case |
| V12 | Radius drift: cards and images 10px (`--radius: 0.625rem`), chips 8px, code 6px, dialog 14px; DESIGN.md says `rounded-lg` is 8px | computed styles | Decide the documented value (doc fix) and remove the 14px and 6px outliers |
| V13 | `PageCard` puts the title before the path, `PathLink` the path first; lazy covers arrive in a bare black frame | `d-work.png` | One order; a `neutral-900` placeholder fill |
| V14 | `neutral-500` text still renders in the prompt hint (`prompt-field.tsx:63`) and the diagram scroll hint | computed styles | `neutral-400` |
| U9 | External links are inconsistent: footer social links open in the same tab, project and blog links use `_blank` with no cue | DOM audit | One rule in DESIGN.md: same tab for site chrome; `_blank` plus a visually hidden "(opens in new tab)" for in-content links |
| U10 | ⚠ Nav focus uses the browser default 1px outline; everything else uses the 2px accent ring | `desktop-home-focus-tab14.png` | Accent ring on nav (U-P2) |
| U11 | LCP images lack `loading="eager"`/`priority` on `/work`, `/project/*`, `/blog/[slug]` (Next warns) | dev console | Priority on the first cover |
| U12 | Mobile CTAs ("View all work", "Book a call →") are 20px-tall inline links; capability pages link `/work` only inline, where PRODUCT.md asks for a `/work` CTA | `mobile-390_fullstack.png` | `sectionAction` with ≥44px hit area; explicit `/work` CTA on `CapabilityPage` |
| M4 | Off-token motion: `imageHover` 500ms on Tailwind default easing; `cardArrow` 200ms `ease-out`; `project-showcase-card.tsx:33` 300ms; `.prose a { transition-all }` (`app/global.css:136`) | `grep-site.txt` | Motion M-F |
| M5 | `/bio` disclosure jumps from 42px to 394px; the arrow flips with no transition | `bio-details-open.png` | ⚠ Motion M-H |
| A6 | Coding skills (`agent/skills/{agent-browser,upstash-*}`) ship inside the runtime agent, which SPEC-composition-runtime:111 forbids | source | Remove them from the runtime agent. Reference: Malte Ubl on Eve conventions ([post](https://x.com/cramforce/status/2114887402196259326)) |
| A7 | MCP `get_profile` still advertises `links.ask`, which redirects to `/` | `mcp-get_profile.json` | Drop it or point it at `/` |

### Doc drift (not user-visible, but it misleads agents)

- PRODUCT.md:15, DESIGN.md (Editorial homepage) and ARCHITECTURE.md:98 describe a nav chat button that opens a right-hand sheet. None exists: the nav renders six links and `SiteSearchTrigger` (`components/layout/navbar.tsx:49-51`). ⚠ (D-1)
- DESIGN.md "/ask generative UI" describes `app/connect/*` cards (about 2,100 lines) that nothing imports. The mounted booking and contact forms in `components/genui/` are undocumented. ⚠ (D-2)
- The DESIGN.md Motion section claims project pages use `viewTransitionName` on shared cover imagery. The names exist, but no navigation starts a transition (M1).
- DESIGN.md "AI, Web3, and biography pages" describes a full-width NodeSchool photo, media-left Wink and a 2024 banner; `/bio` renders four media-right chapters, as the later "Career story" section says.
- DESIGN.md says `rounded-lg` is 8px; it renders 10px (V12). It asks for `object-cover` on project media; heroes use `object-contain` (V3).
- The Accessibility section and Open questions disagree on `neutral-500` (V14).
- `docs/agents/images.md:99` implies the file-based OG covers every route (V1).
- SPEC-composition-runtime says tier 2 is "Eve streams OpenUI"; compose does not import Eve, and the Eve web channel has no UI consumer.

## Shared search contract

Applies to the homepage inline prompt and the dialog on every other route. One component (`SiteSearch`) in two presentations (inline on `/`, modal elsewhere), one state machine and one copy table.

**States:** `idle → composing → result | empty | error`, plus `stopped` if A-P1 is approved.

| Concern | Behaviour |
| --- | --- |
| Trigger | 44px nav icon, accessible name "Search this site (beta)", shortcut tooltip on fine pointers. On `/` it focuses the inline field; elsewhere it opens the modal |
| Shortcut | Cmd/Ctrl+K from anywhere, including inside inputs. It toggles the modal closed when open. One hint, shown only when the field is idle and empty, never below 640px |
| Field | `type="text"` combobox (no native clear button). The visible Beta badge is `aria-hidden`; the accessible name carries "beta". Enter-only and IME-safe, no send button (unchanged) |
| Escape | First closes suggestions, then closes the modal. Never clears text. On `/`, with suggestions closed, it does nothing |
| Suggestions | List named "Suggestions" with "Recent" and "Examples" groups; focus stays in the field. History stores only queries that reached `result` |
| Composing | Visible "Composing results…" line within 100ms, polite announcement once, `aria-busy` on the region. Shimmer starts only after 300ms; static text under reduced motion |
| Result | Announce "Results ready." once. Focus stays in the field |
| Empty | "No answer for that on this site." plus keyword matches for the visitor's text and three example chips. Never announces "ready" |
| Error | Copy by cause: rate-limited shows the server's message; timed out says "That took too long. Try again."; other failures say "Search is unavailable right now." Every error shows Try again (re-runs the last **submitted** query), keyword matches and browse links (`/work`, `/cv`, `/contact`), the same on both surfaces |
| Keyword matches | One ranker with synonyms (AI/agents/LLM, hire/contact/book, web3/crypto/onchain), shared with MCP `search_site` |
| Reset | One label, "Clear search". It refocuses the field. Emptying the field does not reset results |
| Focus | Closing the modal returns focus to the element that opened it. After Try again, focus returns to the field |
| Layout | Modal width = site column (`max-w-6xl` less gutters), `rounded-lg`, hairline border, solid `bg-black`, overlay `bg-black/60` with no blur; suggestions stay inside the panel. Mobile: full height (`100dvh`), sticky field, safe-area padding |
| Motion | Modal: 150ms, `origin-top`, site curve; `motion-reduce:animate-none` on panel and overlay. Scroll to results: smooth, instant under reduced motion (unchanged) |

Ideas behind the contract: "show one thing at a time" and "show which facts it used" from [GenUIgood](https://github.com/0xkimberly/GenUIgood); per-part progress and error states and idle suggestion chips from [chatbot-template](https://github.com/shadcn-ui/chatbot-template).

## Agent-surface contract

Applies to everything after a request on homepage GenUI, the dialog, GenUI booking and contact forms, and `/mcp`. It extends the search states; it does not add a chat transcript.

1. **Loading**: status line within 100ms; shimmer after 300ms; one announcement; static text under reduced motion.
2. **Echo**: show the visitor's own words. ⚠ (S-P2)
3. **Progress and tools**: one quiet status line per stage (planning, finding projects, checking availability), never raw tool names. Settled results show the evidence, or a source line ("Based on 4 projects and 2 posts"). Reference: Flo's agent-tree provenance idea ([post](https://x.com/flohoeller/status/2112150373565612534)); typed stage events (AG-UI via GenUIgood). Stage labels are ⚠ (A-P1).
4. **Errors**: the search error table; never internal copy ("Composition failed.").
5. **Stop** ⚠ (A-P1): a visible Stop beside the status line (not in the field) keeps the query and drafts and ends in "Stopped." with Try again. Client timeout of 20s maps to the timed-out error.
6. **Writes** (booking, contact, note): each step has idle, loading, inline field error, pending ("Booking…", locked) and settled states. Availability shows loading and error with retry, and lists at most the next 3 days, with "More times" for the rest. A network failure releases the button and shows retry. One `retryIdentity` per draft, not per click. A settled step becomes a receipt in place, with the form locked. Never show internal ids or context labels.
7. **Empty**: a sentence plus examples and browse links, never a blank region.
8. **Reduced motion**: no animated scroll, shimmer or transitions.
9. **MCP parity**: `content.text` is readable summary text plus serialized JSON; `isError: true` on failures; `readOnlyHint`/`destructiveHint` annotations (`book_call`, `send_note`, `contact_gabo` are writes); `outputSchema` for each tool; human titles; JSON error bodies for 400/406.

## Motion changes

Site curve: `cubic-bezier(0.23, 1, 0.32, 1)`. Tokens in `components/shared/motion.ts`; view-transition CSS in scoped blocks of `app/global.css`. No libraries; `<ViewTransition>` from `react` only where noted. All values below collapse to instant (or opacity only, where stated) under `prefers-reduced-motion: reduce`.

**Inside the current budget (no approval needed):**

| ID | Change | Exact values |
| --- | --- | --- |
| M-A | Remove raw `viewTransitionName` from the editorial card and project hero | Delete the inline style; filter clicks animate only the indicator |
| M-C | Keep the active filter label visible during the indicator morph | `[data-work-filter] a > span.relative { view-transition-name: match-element; view-transition-class: work-filter-label }`; `::view-transition-group(.work-filter-label) { animation: none; z-index: 1 }`; `::view-transition-old(.work-filter-label) { display: none }`; `::view-transition-new(.work-filter-label) { animation: none }` (progressive: Chromium 137+, Safari 18.4) |
| M-D | Time the page crossfade and stop lost clicks | `::view-transition-old(root), ::view-transition-new(root) { animation-duration: 180ms; animation-timing-function: <site curve> }`; `::view-transition { pointer-events: none }` |
| M-E | Search dialog | Call site: `origin-top duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:animate-none`; overlay `bg-black/60 backdrop-blur-none motion-reduce:animate-none`; vendor `components/ui` untouched |
| M-F | Token cleanup | `imageHover`: keep 500ms, add `motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]`; `cardArrow`: keep 200ms, replace `ease-out` with the site curve; `project-showcase-card` `duration-300` → `duration-150`; `.prose a` `transition-all` → `transition-[color,text-decoration-color]` 150ms site curve |
| M-G | TOC scroll-spy (behaviour, not motion) | Active on click; `rootMargin: "0px 0px -70% 0px"` |

**Needs approval (changes the DESIGN.md motion budget):**

| ID | Change | Exact values |
| --- | --- | --- |
| M-B | Card-to-detail cover morph | `<ViewTransition name={projectViewTransitionName(slug)} share="morph" default="none">` around the cover in the editorial card, featured card and project hero. `::view-transition-group(.morph) { animation-duration: 240ms; animation-timing-function: <site curve> }`; `::view-transition-old(.morph), ::view-transition-new(.morph) { object-fit: cover; height: 100% }`. `default="none"` keeps filter clicks clean. Reduced motion: the existing 0s rule |
| M-H | `/bio` disclosure | Arrow `motion-safe:transition-[rotate] duration-200` on the site curve. Content, CSS only inside `@media (prefers-reduced-motion: no-preference)`: `:root { interpolate-size: allow-keywords }`; `details::details-content { block-size: 0; overflow: clip; transition: block-size 240ms <site curve>, content-visibility 240ms allow-discrete }`; `details[open]::details-content { block-size: auto }`. Unsupported browsers open instantly. Reference: Emil Kowalski's hover-to-define pattern ([post](https://x.com/emilkowalski/status/2115425807388619022)) for a later glossary popover, not this task |
| M-I | GenUI result reveal | The existing `enter` token (200ms, opacity 0→1, scale 0.97→1, site curve) on each generated block, keyed by query. Reduced motion: 120ms opacity only. CSS, not `<ViewTransition>`: streamed updates are not transition-scoped, and a transition would snapshot the sticky prompt. Reference: Jakub Antalik's single generative effect across surfaces ([post](https://x.com/Jakubantalik/status/2113656694303551906)) |
| M-J | Nav search button press | The existing `press` token (160ms, scale 0.97) |

Rejected from the references: pinned scroll, preloaders and cinematic page-load sequences (details.so categories, [Viktor Oddy](https://x.com/viktoroddy/status/2114684257109254434)); any Motion dependency ([Animate UI](https://x.com/animate_ui/status/2111882479774896338) informs only "add motion to existing headless components at the call site", used in M-E).

## Needs approval

These change a documented decision in DESIGN.md, PRODUCT.md, ARCHITECTURE.md or an accepted GenUI spec. Each is a separate yes/no; tasks that depend on one say so.

| ID | Decision | Options |
| --- | --- | --- |
| D-1 | The nav chat sheet in PRODUCT.md:15, DESIGN.md and ARCHITECTURE.md:98 | (a) Remove the claims (recommended; nothing is mounted) or (b) build the sheet |
| D-2 | Booking and contact UX | (a) Rewrite DESIGN.md "/ask generative UI" to describe the mounted GenUI forms, and delete `app/connect/*` and the unused Eve web channel (conflicts with SPEC-openui-experiences:87) or (b) remount the connect cards in GenUI |
| V2 | `/ai` and `/web3` social images | Replace the package PNG paths with title-led site OG images |
| U-P1 | Nav target height | `h-11` on coarse pointers (44px) instead of `h-9` |
| U-P2 | Nav focus | Accent 2px ring instead of the browser default outline |
| S-P1 | Dialog persistence | Keep the last result, drafts and receipts for the session after close, instead of reset-on-close |
| S-P2 | Echo | Show the visitor's words in the field and in Recent; the canonical rewrite stays internal |
| S-P3 | Mobile placeholder | "Ask about my work…" below 640px; the full conversational placeholder stays at `sm` and up |
| A-P1 | Stop and stage labels | A Stop control and per-stage status lines (changes the fixed waiting state and field rules in DESIGN.md) |
| M-B, M-H, M-I, M-J | New motion | Each one separately, per the motion table |

## User Stories

1. As a founder on a phone, I want search to keep my words and tell me plainly when the site has no answer, so that I can rephrase or browse instead of staring at an empty promise.
2. As a keyboard user, I want to skip the nav, see focus on every control, and land back where I was when a dialog closes, so that I can move through the site without a mouse.
3. As a recruiter filling in the contact form, I want each error next to its field and announced, so that I can fix it on the first try.
4. As a visitor booking a call, I want the button to recover after a network error and a receipt to replace the form, so that I never book twice or get stuck.
5. As someone sharing a page, I want every route to unfurl with a consistent title-led card, so that the link looks like it belongs to the same site.
6. As a visitor with reduced motion, I want no zooms, morphs or animated scrolls, so that the site is comfortable to use.
7. As a coding agent calling `/mcp`, I want readable results, `isError` on failures and write annotations, so that I can act on results without guessing.

## Implementation Decisions

- **DESIGN.md stays the gate.** Fixes reuse `spacing.ts`, `motion.ts` and the existing primitives. Vendor `components/ui/**` is overridden at call sites, not edited.
- **Search**: one `SiteSearch` module owns the state machine, copy table and keyword ranker. The homepage shell and dialog become presentations of it. The ranker is a pure function in `lib/` reused by MCP `search_site`, so the dialog fallback, homepage fallback and agent search return the same matches for the same text.
- **Copy table**: all search and agent-surface strings live in one module (extending `components/search/search-copy.ts` and `lib/genui/messages.ts` into one), so tests can assert copy by key.
- **Error typing**: the compose client maps 429 → `rate_limited` (with the server message), its abort/deadline → `timed_out`, everything else → `failed`. The server emits an explicit error event on its 15s deadline.
- **Writes**: one `retryIdentity` per draft, created when the draft starts and kept across retries; buttons release in `finally`.
- **MCP**: tool results return `content: [{ type: "text", text: <summary + JSON> }]`, `structuredContent`, and `isError` on failure; tools declare `annotations` and `outputSchema`.
- **OG**: the metadata helper defaults `images` to the site OG; route-specific title-led images come from `scripts/generate-og.ts`.
- **Checkable design rules** (from [rico's design-system post](https://x.com/_heyrico/status/2116953958279479760)): extend `bun run check:motion` into a design check that fails on `backdrop-blur`, `shadow-*`, `rounded-xl`/`rounded-2xl`, raw `viewTransitionName` styles and `text-neutral-500` in site-authored code (not `components/ui/**`); and add fixture-lab Playwright assertions for every search and agent state. The `design-taste-frontend` anti-slop rules ([tasteskill.dev](https://www.tasteskill.dev/)) were used as the review pass for V7 and V9.

**Exposure**: public routes and `/mcp`, unauthenticated as today. No new write paths. Existing booking, contact and note writes keep their server-side validation, rate limits and spend cap; this spec changes only their client states and the MCP result shape.

## Testing Decisions

- Prefer existing seams: `bun run test:genui` and the fixture lab (`GENUI_FIXTURE_LAB=1`) for search and agent states; Playwright for keyboard, focus and reduced-motion behaviour; `bun run check:motion` (extended into the design check) for banned patterns; `bun run verify` and `bun run test:llms` for content and metadata; MCP contract tests beside `lib/mcp`.
- The fixture lab gains streaming, timed-out, rate-limited, empty and write-failure fixtures, and passes `onRetry`, so every state in the contracts is reachable without model calls.
- Each UI task runs [verify.md](../agents/verify.md) at 390 and 1440 with reduced motion on and off.
- Tests assert behaviour (focus target, announced text, request body of a retry, number of `::view-transition-group` pseudo-elements on a filter click), not class names.

**Acceptance scenario**

Actor: a founder on a 390×844 phone with reduced motion on, then on a 1440×900 desktop with a keyboard. Starting state: production content; `/api/genui/compose` reachable, then blocked.

1. Open `/blog`. A Tab press shows "Skip to content"; Enter moves focus to `<main>`. The footer is outside `<main>`.
2. Tap the nav search icon (44×44, named "Search this site (beta)"). The modal opens full height with no zoom and no blur; the field has focus.
3. Pick the example "What agentic AI products have you shipped?". The field and Recent show those words. "Composing results…" appears, then results with a source line; "Results ready." is announced once.
4. Press Escape. The modal closes; focus returns to the search icon. Reopen it: with S-P1 approved, the last result is still there; otherwise it is idle.
5. Type "best pizza in Denver" and press Enter. The empty state reads "No answer for that on this site.", lists three examples, and does not announce "ready".
6. Block `/api/genui/compose` and press Enter on "show me web3 work". The error reads "Search is unavailable right now." with Try again, keyword matches for "web3" (the same slugs MCP `search_site` returns), and links to `/work`, `/cv` and `/contact`. Edit the field without submitting and press Try again: the request body carries "show me web3 work".
7. On desktop, open `/work` and click the "web3" filter. Only the indicator and root crossfade animate (no cover groups), in 180ms; the "web3" label stays visible throughout.
8. Open `/contact` and submit empty. Focus moves to Name; each field has `aria-invalid` and an announced message.
9. Share `/fullstack` in a link unfurler (or read its HTML): it has a 1200×630 `og:image`.
10. Agent path: `tools/call search_site {"query":"AI"}` on `/mcp` returns at least the LegalAgent and Masterbots projects, with JSON in `content[0].text` and `structuredContent`; `tools/call list_projects {"cursor":"bad"}` returns `isError: true`; `tools/list` marks `book_call` with `destructiveHint: true`.

## Tasks

- [x] 01: Site chrome accessibility and colour scheme
- [x] 02: Blog rendering and article navigation
- [x] 03: Contact form accessibility
- [x] 04: Index semantics and mobile targets
- [x] 05: Project media and project-page sections
- [x] 06: Social image coverage
- [x] 07: Motion back on token
- [x] 08: Shared keyword ranker and MCP search recall
- [x] 09: Shared search contract
- [x] 10: Search dialog surface and mobile layout
- [x] 11: GenUI write flows and rail
- [x] 12: MCP result parity
- [x] 13: Checkable design rules and fixture coverage
- [ ] 14: Docs match the code — waiting on D-1 and D-2
- [ ] 15: Approved motion additions (gated) — waiting on M-B, M-H, M-I, M-J
- [ ] 16: Approved agent-surface additions (gated) — waiting on S-P1, S-P2, S-P3, A-P1

### 01: Site chrome accessibility and colour scheme

**What to build:** Keyboard users can skip the nav on every route, the footer is its own landmark, and an OS light theme no longer leaks light scrollbars, inputs or tweet embeds into the dark site. (U1, V10)

**Area:** app, components/layout, components

**Blocked by:** None (can start immediately)

- [ ] The first Tab on any route shows a visible "Skip to content" link that moves focus to `<main id="main">`
- [ ] The footer renders outside `<main>` and exposes a `contentinfo` landmark; print styles are unchanged
- [ ] `<html>` computes `color-scheme: dark`; with emulated light scheme, scrollbars, the search input and tweet embeds stay dark

### 02: Blog rendering and article navigation

**What to build:** Diagram posts hydrate cleanly, archive posts render headings and code correctly, heading anchors stop being unnamed tab stops, the TOC highlights the heading you clicked, and the featured post without a hero no longer shows its title twice. (U3, V4, U5, U8, V6)

**Area:** components, app, content

**Blocked by:** None (can start immediately)

- [ ] `/blog/2026-10-generative-interfaces` loads with no hydration error or dev-overlay issues
- [ ] `/blog/2014-04-introduction-to-gulpjs` renders "Setting Up…" as a heading; every line of a code block sits inside its padding; inline code shows no literal backticks
- [ ] Heading anchors are skipped by Tab or have an accessible name
- [ ] Clicking TOC items 2, 5 and 8 marks 2, 5 and 8 current; the sticky TOC precedes the article body in tab order at `xl`
- [ ] A featured post without `image` renders no media column on `/blog`

### 03: Contact form accessibility

**What to build:** A recruiter who submits the contact form with mistakes hears and sees each error next to its field and lands on the first one. (U2, V11)

**Area:** app/contact, components/ui, components/shared

**Blocked by:** None (can start immediately)

- [ ] Invalid fields get `aria-invalid="true"` and `aria-describedby` pointing at an announced message; Message included
- [ ] Submitting with errors moves focus to the first invalid field
- [ ] Name and email have `autocomplete`, email has `spellcheck="false"`, required fields are marked `required`
- [ ] The server error banner meets 4.5:1 on black
- [ ] The copy column aligns with the H1; labels are sentence case
- [ ] Verified without submitting a real message (blocked network or a test endpoint)

### 04: Index semantics and mobile targets

**What to build:** Listing pages have a clean heading outline, filters are announced as links, capability pages offer a clear `/work` CTA, and mobile CTAs are easy to tap. (U4, U7, U12, U11)

**Area:** components/shared, components/work, components/blog, app/work, app/blog, app/tech, app/cv, capability routes under app

**Blocked by:** None (can start immediately)

- [ ] `/work/[type]`, `/blog/category/[c]` and `/tech/[x]` have no h1→h3 skip
- [ ] `FilterNav` items expose `role="link"` with `aria-current` on the active item (CV focus switcher included)
- [ ] Every capability page shows a `/work` CTA using `sectionAction`
- [ ] Section CTAs have at least a 44px hit area at 390px
- [ ] The first cover on `/work`, `/project/*` and `/blog/[slug]` loads eagerly; Next's LCP warning is gone

### 05: Project media and project-page sections

**What to build:** Project pages show covers that fill their frame without bands or blur, the Bitlauncher wordmark is visible, sections share one heading scale, and unrelated "Latest Articles" no longer pad old projects. (V3, V5, V8, V13)

**Area:** components/work, components/blog, app/project, lib

**Blocked by:** None (can start immediately)

- [ ] `/project/arinc-microfids` shows its cover with `object-cover`, rounded corners and no letterbox bands; small sources render no wider than their intrinsic width
- [ ] The Bitlauncher wordmark is fully visible in the `/work` wide frame at 1440 and 390
- [ ] "Selected contributions" and "Technologies" use the same section title scale
- [ ] A project with no related posts shows no writing block, or three posts under "Writing"
- [ ] Lazy covers show a neutral placeholder fill before loading; `PageCard` and `PathLink` use one title/path order

### 06: Social image coverage

**What to build:** Every public route unfurls with a 1200×630 title-led image in the site's family. (V1, V2; the `/ai` and `/web3` part needs V2 approval)

**Area:** lib, scripts, public/images/og, app

**Blocked by:** None (can start immediately). Coordinate with the `feat/landing-og` branch before starting.

- [ ] Every route in PRODUCT.md "Implemented surfaces" emits `og:image` and `twitter:image`
- [ ] `/explore` emits an absolute production URL, not localhost
- [ ] `/bio` uses a PNG
- [ ] If V2 is approved: `/ai` and `/web3` use 1200×630 title-led PNGs, each under 300 KB, and DESIGN.md's "package PNG paths" sentence is updated
- [ ] `docs/agents/images.md` describes which routes use which OG source

### 07: Motion back on token

**What to build:** Filter clicks animate only the indicator, in 180ms, with the label visible; page crossfades use site timing; clicks are never swallowed; hover and arrow motion share the site curve. (M1–M4, V9, motion M-A, M-C, M-D, M-F, M-G)

**Area:** components/work, components/shared, components/interior, components/genui, app

**Blocked by:** None (can start immediately)

- [ ] A `/work` → `/work/web3` click creates no cover `::view-transition-group`s and settles within 200ms
- [ ] The active label is visible in a mid-transition capture (Chromium 137+)
- [ ] Root crossfade uses 180ms and the site curve; links are clickable during a transition
- [ ] `imageHover`, `cardArrow`, the showcase card and `.prose a` use the values in the motion table
- [ ] The sticky homepage prompt has no `backdrop-blur`
- [ ] With reduced motion, all of the above are instant; `bun run check:motion` passes

### 08: Shared keyword ranker and MCP search recall

**What to build:** One keyword ranker with synonyms serves suggestions, both search fallbacks and MCP `search_site`, so the same text finds the same pages everywhere. (S10)

**Area:** lib, components/search, components/genui

**Blocked by:** None (can start immediately)

- [ ] `search_site` for "AI", "agents" and "hire" returns relevant projects and pages (at least LegalAgent for "AI", `/contact` titled "Contact" for "hire")
- [ ] The dialog and homepage fallbacks call the same ranker on the visitor's submitted text
- [ ] Unit tests cover synonyms and ranking order

### 09: Shared search contract

**What to build:** The homepage prompt and the dialog follow one state machine and one copy table: Escape never erases text, focus is never lost, empty and error states are explicit and identical, Try again re-runs what was submitted, and history keeps only successful queries. (S1–S5, S7 except echo)

**Area:** components/search, components/genui, components/layout, lib/genui

**Blocked by:** 08 (the fallbacks use the shared ranker)

- [ ] Every row of the shared search contract holds on `/` and on `/blog`, at 390 and 1440
- [ ] An off-topic query shows the empty state and never announces "Results ready."
- [ ] Blocked compose shows the same error block on both surfaces, with keyword matches and browse links; 429 shows the server message; the 15s deadline shows the timed-out copy
- [ ] Try again after editing the field sends the last submitted query
- [ ] Closing the modal returns focus to its trigger; "Clear search" refocuses the field
- [ ] Failed queries never enter Recent
- [ ] `bun run test:genui` passes with new tests for each state

### 10: Search dialog surface and mobile layout

**What to build:** The dialog looks like the site (column width, `rounded-lg`, hairline, no glass), its suggestions stay inside it, it opens from the top without zooming under reduced motion, and the mobile prompt leaves room to read the query. (S8, S9, motion M-E)

**Area:** components/search, components/genui, components/layout

**Blocked by:** None (can start immediately). Overlaps 09's area; land after it or on the same branch.

- [ ] At 1440 the panel matches the site column width, uses 10px or the documented radius, and has no backdrop blur
- [ ] All suggestions are visible or scroll within the panel
- [ ] At 390 the modal is full height with a sticky field; the homepage field shows at least 20 characters of query text
- [ ] With reduced motion, no keyframe animation runs on open or close
- [ ] Cmd/Ctrl+K toggles the modal closed from inside its field

### 11: GenUI write flows and rail

**What to build:** Booking and contact flows in GenUI show loading, errors and receipts, never stick or double-submit, and keep the approval line visible on mobile. (A1, A2, agent contract items 6 and 7)

**Area:** components/genui, lib/genui, app/genui-lab, tests

**Blocked by:** None (can start immediately)

- [ ] Availability shows loading, then slots for the next 3 days with "More times", or an error with retry
- [ ] A forced network error on confirm or send re-enables the button and shows retry
- [ ] A second click after success cannot book or send again (same `retryIdentity`, form locked, receipt in place)
- [ ] The rail grid applies at ≥48rem container width; below it, the approval line is still visible
- [ ] Slot labels and copy name the same time zone; no "Context:" label renders
- [ ] Fixture-lab states for each step; verified with blocked network, never a real booking

### 12: MCP result parity

**What to build:** Agents calling `/mcp` get readable results, explicit errors and declared tool behaviour. (A3, A7)

**Area:** lib/mcp, app/mcp, app/docs

**Blocked by:** None (can start immediately)

- [ ] Every tool returns summary text plus serialized JSON in `content`, and `structuredContent`
- [ ] Invalid input returns `isError: true` with a human message
- [ ] `tools/list` shows human titles, input property descriptions, `outputSchema`, and `readOnlyHint`/`destructiveHint` annotations
- [ ] 400 and 406 responses carry a JSON error body
- [ ] `get_profile` no longer advertises `/ask`
- [ ] `/docs` and `published-copy.test.ts` match the new shape

### 13: Checkable design rules and fixture coverage

**Scope change (2026-11-02):** the banned-class check moved to `scripts/check-design.ts`, owned by the DESIGN.md split work (flow-skills spec 056), so there is one design check instead of two. This task delivered the fixture-lab states and their Playwright coverage only.

**What to build:** DESIGN.md's bans and the two contracts become checks an agent can run: a design check for banned classes, and fixture-lab tests for every search and agent state. (rico reference; prevents regressions of V9, S8, M1, V14)

**Area:** scripts, tests, app/genui-lab, components/genui

**Blocked by:** 09, 11

- [ ] `bun run check:motion` (or a renamed design check run by `bun run verify`) fails on `backdrop-blur`, `shadow-*`, `rounded-xl`/`rounded-2xl`, inline `viewTransitionName` and `text-neutral-500` in site-authored code
- [ ] The fixture lab can show streaming, timed-out, rate-limited, empty, error-with-retry and write-failure states
- [ ] Playwright covers each state's copy, announcement and focus target
- [ ] docs/agents/checks.md and docs/testing/README.md list the new checks

### 14: Docs match the code

**What to build:** PRODUCT.md, DESIGN.md, ARCHITECTURE.md and the GenUI specs describe what is mounted, with the user's D-1 and D-2 decisions applied, so agents stop building against surfaces that do not exist. (Doc drift list, A6, V12)

**Area:** PRODUCT.md, DESIGN.md, ARCHITECTURE.md, docs, app/connect, agent

**Blocked by:** D-1 and D-2 answers; 07 (motion section), 09 (search paragraph)

- [ ] No document mentions a nav chat sheet unless D-1(b) is chosen and built
- [ ] DESIGN.md describes the mounted booking and contact UX; if D-2(a), `app/connect/*` and the unused Eve web channel are deleted and SPEC-openui-experiences is amended
- [ ] DESIGN.md states the real `rounded-lg` value, the `/bio` layout, `object-cover` usage, the external-link rule (U9) and the resolved `neutral-500` position
- [ ] DESIGN.md Editorial homepage paragraph matches the shared search contract
- [ ] Coding skills are removed from the runtime `agent/skills`
- [ ] `bun run test:llms` passes

### 15: Approved motion additions (gated)

**What to build:** Whichever of M-B (cover morph), M-H (`/bio` disclosure), M-I (GenUI reveal) and M-J (search press) the user approves, at the exact values in the motion table, with DESIGN.md's motion budget updated in the same change.

**Area:** components/work, components/bio, components/genui, components/layout, components/shared, app, DESIGN.md

**Blocked by:** 07; user approval per item

- [ ] Each approved item matches its values in a mid-transition capture
- [ ] Reduced motion makes each instant (M-I: 120ms opacity only)
- [ ] `/work` filter clicks still create no cover groups (M-B uses `default="none"`)
- [ ] The DESIGN.md motion budget lists each approved item

### 16: Approved agent-surface additions (gated)

**What to build:** Whichever of S-P1 (dialog persistence), S-P2 (echo the visitor's words), S-P3 (short mobile placeholder) and A-P1 (Stop, stage labels, 20s timeout) the user approves.

**Area:** components/search, components/genui, lib/genui, DESIGN.md

**Blocked by:** 09, 10; user approval per item

- [ ] S-P1: closing and reopening the dialog shows the last result and any receipt
- [ ] S-P2: the field and Recent show the clicked label; canonical routing is unchanged
- [ ] A-P1: Stop keeps the query and drafts and shows "Stopped." with Try again; a 20s stall shows the timed-out error; stages show human labels
- [ ] DESIGN.md is updated for each approved item

## Out of Scope

- Implementing any of this (this pull request is the spec only).
- A new palette, typeface, signature element, light theme or animation library.
- The CV job title mismatch ("Agentic Product Engineer" on `/cv` vs "Agentic Software Engineer"): owned by the `gabo` skill and the package.
- Retrieval infrastructure for search unless task 08 proves lexical ranking with synonyms insufficient.
- The Flow block in AGENTS.md and the CI workflows (another session owns them).
- Content and positioning rewrites for `/ai`, `/startups` and `/lead` (the [Tom Blomfield](https://www.linkedin.com/posts/linasbeliunas_monzo-gocardless-co-founder-tom-blomfield-ugcPost-7519838999620927496-2PvO) and [levelsio](https://x.com/levelsio/status/2116949634111115348) notes are copy inputs; they do not change layout or hierarchy here).
- Animated `og:video` link previews ([rauno](https://x.com/raunofreiberg/status/2112875577388712123)): a possible OG follow-up.

## Further Notes

- Build notes (2026-11-02): the acceptance scenario's "source line" under results (step 3, contract item 3) has no owning task; it is left for task 16 or a follow-up. Review follow-ups not fixed in this build: editing a write after a network failure creates a new retry identity, so a request that reached the server could repeat (keep the identity until a definite response); dialog keyword matches rank site search records while MCP `search_site` ranks the agent index, so results are close but not identical (feed both from one record set). `lib/genui/writing-topic.ts:28` has a pre-existing type error on `main`.

- Local only, not a site bug: `/llms.txt` and `/llms-full.txt` returned 500 in the audit worktree because the gitignored, generated `public/llms.txt` collides with `app/llms.txt/route.ts`. Check whether `dev:app`'s export step should write elsewhere.
- Worth confirming during task 09: `/api/genui/compose` has a rate limit and a spend cap (raised by the chatbot-template security notes).
- References that were not relevant or could not be read: [Steve Ruiz](https://x.com/steveruizok/status/2111926712229372076) (personal note), [Elaya](https://x.com/elayadesigns/status/2114049200749175174) (AI-built landings), [Viktor Oddy's site list](https://x.com/viktoroddy/status/2111483549052453076) (points to 60fps.design), [Niaz Morshed](https://x.com/niazmorshed_/status/2116006291852423247) (a workflow), [shadcn](https://x.com/shadcn/status/2110053067013963864) (a save-for-later tool, not typeset), [AI SDK](https://x.com/aisdk/status/2112121596513267845) (image questions; installed `ai` is 7.0.143), [cramforce on sub-agents](https://x.com/cramforce/status/2115252936133791778), and Chris Tate's [tsc-ts](https://x.com/ctatedev/status/2111272070768185787), [wterm](https://x.com/ctatedev/status/2115475334099505618) and [agent-browser MCP](https://x.com/ctatedev/status/2116945207967261176) posts (json-render is not installed). Videos in X posts could not be watched; only post text was read.
