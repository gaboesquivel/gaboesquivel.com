> **Background / superseded handoff.** Current layout rules live in [DESIGN.md](../../../DESIGN.md) and [IMPLEMENTATION.md](./IMPLEMENTATION.md).

# Site-wide Design System v2 — planning handoff (for implementation-plan agent)

**Audience:** A fresh agent (e.g. Grok 4.7) tasked with **writing an implementation plan only** — not executing redesign ideation, not shipping code in this step unless explicitly asked later.

**Date:** 2026-10-22  
**Repo:** `gaboesquivel.com` (local tree may be ahead of GitHub `main`)

---

## Your assignment

Produce a **phased, file-level implementation plan** to extend the **approved Design System v2** from the **default SSR homepage** to the **rest of the site**, without breaking reading routes, SEO, `/ask`, MCP, or the homepage GenUI initiative specs.

The plan must:

1. **Not** restart visual exploration or change locked hero/search/identity decisions.
2. **Reuse** existing primitives and tokens; propose new shared modules only where repetition is proven.
3. **Separate** static design-system rollout from **homepage GenUI** (OpenUI runtime, sticky search replacement, MCP Apps) and from **global inline chat** migration.
4. Name **acceptance criteria per phase**, **dependencies**, **routes in/out of scope**, and **verification commands** from `docs/agents/checks.md` / `verify.md`.
5. Call out **open blockers** (assets, product decisions) explicitly instead of fabricating workarounds.

Deliverable format: markdown plan in `docs/specs/design-system-v2/` (suggested filename: `SITE-WIDE-IMPLEMENTATION-PLAN.md`) with phases P0–Pn, each with goals, file touch list, gates, and rollback notes.

---

## What is already shipped (homepage v2 baseline)

**Status:** [IMPLEMENTATION.md](./IMPLEMENTATION.md) — **complete** for default SSR homepage (2026-10-22 scope).

### Locked product/visual (do not re-litigate)

| Topic | Decision |
| --- | --- |
| H1 | All white: `Software for humans and agents.` |
| Signature | `GABO ESQUIVEL / Agentic Software Engineer` (muted name, turquoise role) |
| Pitch | End-to-end ownership; live copy uses em dash: useful, delightful software experiences—from the first idea to production |
| Portrait | Pristine face raster (`assets/homepage/v2/portrait-source.png` → `public/images/home/portrait-v2-1213.webp`); **no** facial retouch; SVG linework only in empty background; labels **PRODUCT, DESIGN, ENGINEERING, DELIVERY** only |
| Effects | No glow, bloom, glass, decorative gradients, shadows on marketing surfaces |
| Typography | System monospace (existing site); no new display fonts |
| Accent | `#5cded6` (`accent` / `ogColors.accent`) |
| Homepage width | `max-w-6xl` via `homeColumn` + [`SiteWidth`](../../../components/layout/site-width.tsx) on `/` only |
| Reading width | `max-w-4xl` `siteColumn` on all other routes (blog prose, CV print unchanged) |
| Search (static phase) | Full shell width; Lucide search left; **no** right-side submit/chat control; Enter → local index; approved **placeholder** for sighted users; accessible name/hint describe keyword search (not live chat) |
| Nav | `gabo`, `work`, `ai`, `web3`, `bio`, `writing`; **no** theme toggle; top-right **chat sheet** (staged link to `/ask`) |
| Selected work | Editorial 2×2: `legal-agent`, `wink`, `ztx`, `bitlauncher`; card = image, name, package role, package description; whole card links to project |
| Default composition | **Editorial Grid only** on homepage SSR; other layouts are **future GenUI composites**, not parallel homepage sections |

### Code map (reuse these)

| Concern | Location |
| --- | --- |
| Width shell | [`components/layout/site-width.tsx`](../../../components/layout/site-width.tsx), [`components/shared/spacing.ts`](../../../components/shared/spacing.ts) (`homeColumn`, `homeSection`, `editorialGrid`, `editorialLink`, `heroTitle`, `heroPitch`) |
| Homepage | [`app/page.tsx`](../../../app/page.tsx), [`components/home/`](../../../components/home/) |
| Editorial project card | [`components/work/project-card.tsx`](../../../components/work/project-card.tsx) `variant="editorial"` |
| Cover registry | [`lib/work/project-cover.ts`](../../../lib/work/project-cover.ts) — `homepageEditorialSlugs`, `projectCover`, `editorialCoverSizes` |
| Assets | `bun run assets:home` → [`scripts/prepare-home-assets.ts`](../../../scripts/prepare-home-assets.ts); manifests under `assets/homepage/v2/`, `assets/work/covers/` |
| Chat shell | `components/layout/chat-sidebar.tsx` (removed) |
| Hydration gate | [`hooks/use-hydrated.ts`](../../../hooks/use-hydrated.ts) |
| Layout | [`app/layout.tsx`](../../../app/layout.tsx) wraps header/main/footer in `SiteWidth` |
| Error shell | [`app/global-error.tsx`](../../../app/global-error.tsx) uses `SiteWidth` |

### Canonical docs (read before planning)

| Doc | Use |
| --- | --- |
| [DESIGN.md](../../../DESIGN.md) | Visual system, components table, motion budget, homepage v2 sections |
| [PRODUCT.md](../../../PRODUCT.md) | Per-route jobs, nav, keyword owners |
| [ARCHITECTURE.md](../../../ARCHITECTURE.md) | DS v2 presentation subsection, data boundaries |
| [AGENTS.md](../../../AGENTS.md) | Lifecycle, checks, spec storage |
| [docs/agents/images.md](../../agents/images.md) | Portrait, covers, OG rules |
| [docs/agents/propagation.md](../../agents/propagation.md) | Identity/route/fact propagation lists |
| `__dev/gaboesquivel-design-system-v2/` | Original handoff (reference); **local repo + DESIGN.md supersede** stale “not implemented” README stamp |
| [docs/specs/homepage-genui/](../homepage-genui/) | GenUI/MCP — **separate initiative**; do not fold into DS v2 site rollout without explicit phase |

---

## Open blockers (plan must acknowledge)

1. **ZTX homepage cover:** Approved **purple character-led** direction; shipped asset is truthful **Genesis Home Mint** fallback until verified character source is supplied. Do not generate fake character art.
2. **Global chat:** Sheet is navigation to `/ask`; inline conversation in sidebar is **P7** / migration work.
3. **Eve agent copy:** `agent/` runtime may still say “Agentic Product Engineer”; public site metadata uses **Agentic Software Engineer** — plan identity propagation separately from visual rollout if needed.
4. **GenUI:** No model on first homepage paint; sticky replacement and OpenUI library are **homepage-genui** stages, not DS v2 site skin.

---

## Site surface inventory (plan should address each group)

From [PRODUCT.md](../../../PRODUCT.md) — one page, one job. **Do not turn capability pages into second bios.**

### Group A — Already aligned or low risk

- `/` — baseline reference implementation
- `/blog`, `/blog/[slug]`, `/blog/category/*` — keep **narrow prose**; optional **outer** wide canvas later (handoff P5); do not widen `prose` measure without explicit acceptance
- `/cv` — print styles are a **separate surface**; no accidental DS v2 chrome on print
- `/contact`, `/privacy`, `/about`, `/docs` — trust/integration; forms use existing `siteFieldClass`
- `not-found`, `error`, `global-error` — shell consistency (global-error already on `SiteWidth`)

### Group B — High-value DS v2 extension (visual + evidence)

- `/work`, `/work/[type]` — still default **card** grid; plan migration to editorial covers / hierarchy where appropriate
- `/project/[slug]` — hero media, story layout; **do not** replace project OG assets without scoped approval
- `/ai`, `/web3` — capability pages; handoff called for **image-led evidence grids** reusing cover registry (P5)
- `/fullstack`, `/frontend`, `/backend`, `/mobile`, `/startups`, `/institutions`, `/lead` — [`CapabilityPage`](../../../components/work/capability-page.tsx) shell; align typography/spacing with v2 without duplicating `/bio`

### Group C — Special / defer or minimal touch

- `/ask` — viewport-locked chat; GenUI migration target; **no** DS v2 restyle that fights connect GenUI cards
- `/explore` — directory; footer-linked
- `/tech`, `/tech/[category]` — masonry/tool pages; package-driven; avoid homepage-only tokens breaking grids
- MCP `/mcp`, `/mcp/cv` — not marketing DS

### Group D — Generated / machine outputs

- OG images (`scripts/generate-og.ts`), llms corpus (`scripts/llms/`), JSON-LD — plan **propagation passes** when identity or homepage narrative changes

---

## Suggested planning phases (starting point — refine with evidence)

Use handoff package [IMPLEMENTATION-PLAN.md](../../../__dev/gaboesquivel-design-system-v2/docs/IMPLEMENTATION-PLAN.md) P5–P7 as **background**, not as approved site-wide tasks.

| Phase | Focus | Gate idea |
| --- | --- | --- |
| **P0** | Inventory diff vs DESIGN.md per route; screenshot matrix; dependency graph | No code |
| **P1** | **Tokens & primitives:** extend `spacing.ts` / `page-layout` for editorial media frame, section rhythm, link tokens; document in DESIGN.md | No route regressions on `/blog`, `/cv` |
| **P2** | **Work index + project detail:** adopt `projectCover` where editorial; preserve package facts; optional wide **outer** shell only if product approves | `verify`, `test:llms`, browser `/work`, sample `/project/*` |
| **P3** | **Capability pages (`/ai`, `/web3` first):** evidence grids, shared cover art, no biography drift | Compare to PRODUCT page jobs |
| **P4** | **Remaining capability routes + `/explore`:** spacing/hierarchy only unless evidence images added | Route verify |
| **P5** | **Writing shell (optional):** wide outer / sticky ToC — **explicit product approval**; not required for DS v2 parity | Blog reading width unchanged |
| **P6** | **Identity & discoverability propagation** | OG, llms, JSON-LD, propagation.md checklist |
| **Separate track** | Homepage GenUI + MCP + inline chat | See `docs/specs/homepage-genui/` |

---

## Future GenUI composites (plan references, do not implement as static pages)

From [`GENUI-READY.md`](../../../__dev/gaboesquivel-design-system-v2/docs/GENUI-READY.md) and [IMPLEMENTATION.md](./IMPLEMENTATION.md):

- Featured Pair, Horizontal Rail, Stacked Showcase, Minimal List, Editorial Split, Creative Mosaic — **OpenUI-only**, shared `ProjectCard` + `projectCover`, same card anatomy rules.
- Plan should specify how site-wide DS v2 primitives become the **OpenUI component library** input without importing the renderer on static routes.

---

## Quality gates to cite in the plan

- Homepage DS gates: `__dev/gaboesquivel-design-system-v2/docs/QUALITY-GATES.md` (DS-01–DS-14) — reuse relevant gates for any route that adopts v2 hero/cover patterns.
- Repo checks: `bun run verify`, `bun run test:llms`, `bun run build`; UI changes → [docs/agents/verify.md](../../agents/verify.md).
- Voice/identity: installed `gabo` skill; package facts from `gaboesquivel` npm package.

---

## Anti-patterns (forbid in the plan)

- Replacing portrait master with old `gaboesquivel-homepage-master.webp` baked AI/WEB3/FINTECH labels on live hero
- Global `siteColumn = max-w-6xl` without route-aware shell
- Competing homepage layouts (rail + grid + showcase on SSR `/`)
- Fabricated project screenshots or ZTX character without source approval
- Bundling GenUI runtime, MCP Apps, and `/ask` retirement into a “design system” phase
- Drive-by `zinc`/`gray` migrations outside touched files

---

## Performance constraints (carry into plan)

- Keep `/` as **Server Component**; client islands: `HomePrompt`, `SiteWidth`, `Navbar`/`ChatSidebar`.
- Do not static-import OpenUI/Eve on marketing routes.
- Image-led pages: reuse `editorialCoverSizes`; consider `next.config.js` `imageSizes` (512 added for 6xl grid).
- Deferred optimizations (document as optional): dynamic `ChatSidebar`, slimmer search RSC props, split server nav.

---

## Reference visuals (composition only)

Under `__dev/gaboesquivel-design-system-v2/references/` — **not** licensable product proof. Pixel truth for face: `assets/homepage/v2/portrait-source.png`.

---

## Prompt stub for Grok 4.7

Copy into the agent session:

```text
You are planning (not implementing) site-wide rollout of Design System v2 for gaboesquivel.com.

Read in order:
1. docs/specs/design-system-v2/SITE-WIDE-PLAN-HANDOFF.md (this file)
2. docs/specs/design-system-v2/IMPLEMENTATION.md
3. DESIGN.md, PRODUCT.md, ARCHITECTURE.md
4. docs/specs/homepage-genui/INITIATIVE-OVERVIEW.md (scope boundary only)

Output: docs/specs/design-system-v2/SITE-WIDE-IMPLEMENTATION-PLAN.md with phased work, file paths, acceptance criteria, dependencies, and explicit out-of-scope items (GenUI runtime, MCP Apps, inline chat, ZTX asset until approved).

Do not redesign the homepage hero. Do not invent assets. Follow AGENTS.md lifecycle and checks.md for verification columns.
```
