# Spec: OpenUI experiences

Module: `openui-experiences`. Status: **largely implemented on `develop`** — OpenUI library, renderer, contract compiler, homepage compose, and fixture/MCP harness ship on `/`. Outstanding vs this spec: live ChatGPT/Claude MCP gate (manual), formal OU-01–OU-07 audit. **OU-08** complete (connect uses plain React; `@json-render` removed). Gap analysis: [explore note](../../research/2026-10-27-explore-openui-experiences-gap.md). Depends on: `public-capabilities` (complete). Index: [capability map](CAPABILITIES-homepage-genui.md).

## Objective

Render a small application-controlled vocabulary consistently on the homepage and in MCP App containers. Components own responsive layout and interaction; model output selects experiences and evidence.

## Tech stack and project structure

React, existing Base UI controls and Tailwind tokens, plus a compatible pinned `@openuidev/react-lang`. Proposed owners: `components/genui/library/`, `components/genui/openui-renderer.tsx`, and the document contract under `lib/genui/openui.ts`. Reuse `components/shared/spacing.ts`, `components/ui/`, `components/work/project-card.tsx`, and applicable `app/connect/` form/picker logic. Tests and document fixtures live beside the library. Do not import server services into the client catalog.

## Provider contract

A versioned composition envelope carries a request ID, library version, OpenUI text, plain-text fallback, and a bounded set of validated public records. Experiences reference those records by stable ID; the renderer rejects fabricated or unavailable IDs. Capability DTOs come from [public-capabilities](SPEC-public-capabilities.md). No arbitrary JavaScript, HTML, CSS, component name, endpoint URL or tool name is executable from generated text.

Expose `Answer`, `AboutExperience`, `ProjectExperience`, `WritingExperience`, `ContactExperience`, `BookingExperience`, `CVExperience`, and `ExperienceStack`. `ProjectExperience` accepts an optional semantic `domain` (`ai` | `web3` | `all`) and an approved `composite` recipe; layout coordinates are not model-generated. Keep typography, generic layout and form primitives internal. `Answer` permits safe prose and source references, not arbitrary HTML. Sources resolve to known public records and safe URLs. Export one library definition, generated model instructions, deterministic builders, a validator, and a renderer entry point for both consumers.

| Experience | Wide container | Narrow container |
| --- | --- | --- |
| Contact | Verified working context left; note form right | Form only |
| Booking | Call context left; picker/details/review right | Booking flow only |
| Projects | Existing two-column card treatment | Single-column cards |
| Writing | Readable list or two-column treatment | Single list |
| CV | Focus control/context and download | Focus control and download |
| About/Answer | Width-constrained text and supporting evidence | Single-column text/evidence |
| Stack | Experiences in task-priority order | Same semantic order, primary task first |

Proposed wide threshold: available component container width of 48rem, matching the site's usual `md` scale without assuming viewport width. Verify narrow embedded containers inside wide desktop hosts. Context hidden on narrow layouts is supplementary: instructions, required fields, confirmation, errors and receipts stay visible.

## Rendering and action lifecycle

- Deterministic documents and generated documents use the same parser, catalog and validation rules. Strings are serialized safely rather than concatenated as executable grammar.
- Display only validated stable subtrees during streaming. Before final validation, permit safe read-only rendering; generated write controls are disabled, and no mutation tool is mounted with execution authority.
- After full validation, explicit user events may call allowlisted functions through a native adapter or an MCP-host bridge. Read queries are bounded and deduplicated within the mounted interaction; they are not a generated-document cache.
- Final parse/schema failure makes the provisional region noninteractive and exposes retry/fallback. Never send malformed output through an automatic model-repair loop in MVP.
- A new composition invalidates old action bindings. A write already accepted by the server keeps its receipt/status identity outside a replaced component so the user cannot accidentally duplicate it.
- Preserve note/detail fields across picker changes and composition changes in in-memory visit state; never fill them from model output or send them to the composer. Explicit reset clears unsent drafts. No localStorage persistence.
- Slot/date navigation, field changes, validation, confirmation and receipts invoke no LLM. Tool errors remain inside their experience. Validate availability again when booking.

## Code style

Follow existing primitive composition. Example already used in `app/page.tsx`:

```tsx
<li key={project.slug}>
  <ProjectCard project={project} showRole />
</li>
```

Reuse named components, stable data keys, site spacing and neutral/turquoise tokens. Do not introduce a parallel visual theme. Keep module policy in typed contracts, not repeated prompt prose.

## Commands

```bash
bun run verify
bun run build
bun test lib/connect/slot-display.test.ts lib/connect/picker-lock.test.ts
agent-browser skills get core
```

After creation, run `bun test components/genui lib/genui/openui.test.ts`. Follow the repository browser procedure against real native/embedded fixtures; exact fixture routes belong to the implementation plan.

## Testing strategy and success criteria

Use parser/catalog contract tests, deterministic fixtures and browser interaction checks. Test 320px and 390px narrow containers, 768px and 1024px wide containers, plus keyboard navigation and reduced motion. Use a production build to check client/server import boundaries.

| ID | Observable acceptance |
| --- | --- |
| OU-01 | All eight catalog entries render a valid fixture with matching text fallback and valid source IDs. |
| OU-02 | Both surfaces consume the same catalog; container width, not host identity, governs layout. |
| OU-03 | Contact/booking hide only supplementary context at narrow widths; no overflow, obscured fields or lost confirmation. |
| OU-04 | Unknown components/tools, injected URLs, malformed text and invalid records are rejected without executing a write. |
| OU-05 | Partial stream, complete stream, error and supersession preserve the write gate and accessible status updates. |
| OU-06 | Picker navigation and submissions use only capability calls; model-call count remains zero after composition. |
| OU-07 | Labels, focus order, error associations and receipts work with keyboard and screen-reader structure. |
| OU-08 | Final migration removes JSON Render packages, imports, catalog, and runtime `core`/`react` skills; historical idea prose can remain. |

## Boundaries

- Always: use existing design tokens and primitives, schema-check references, keep runtime adapters narrow, preserve action receipts.
- Ask first: add model-visible primitives, new visual identity, or behavior outside the approved motion budget and homepage transition.
- Never: render model HTML, execute arbitrary tools on mount, or install coding skills into production Eve context.

## Open questions

Review the proposed 48rem threshold and draft-preservation behavior with the homepage spec. Planning must prove the exact OpenUI version supports the required validation/action gates and Eve stream adaptation. JSON Render can be removed once `/ask` is redirected and no active consumer remains; do not remove it early while imports still ship.
