# Spec: Homepage GenUI

Module: `homepage-genui`. Status: **largely implemented on `main`** — `HomepageGenUiShell`, sticky prompt, generated region, reset, `/api/genui/compose` on submit; SSR portfolio preserved. Outstanding: DESIGN.md motion budget, bundle baseline report, formal HP-01–HP-09 audit. Gap note: [explore](../../research/2026-10-27-explore-composition-homepage-mcp-gap.md). Depends on: `composition-runtime` (largely shipped). Index: [capability map](CAPABILITIES-homepage-genui.md).

Design System v2 SSR baseline and homepage GenUI search share `/`. Nav sheet may still link to `/ask` (redirects to `/`). Global Eve chat remains on connect surfaces, not the homepage transcript model.

## Objective

Let founders, leads and recruiters ask for relevant work, writing, profile, CV, contact or booking experiences from `/`. Retain the existing portfolio for visitors who simply load and browse. The result area is a replaceable document, with no chat transcript.

## Tech stack and project structure

Keep the Next App Router homepage server-rendered. Use a small React client island for the prompt and interaction state; dynamically load the shared OpenUI renderer after interaction. Existing owners: `app/page.tsx`, `app/layout.tsx`, `components/layout/navbar.tsx`, shared design primitives. Proposed owners: `components/genui/homepage-shell.tsx`, `prompt-field.tsx`, `generated-region.tsx`. Feed the server-rendered sections through the client boundary without pulling their server dependencies into its module graph.

## Interaction contract

| State/event | Required behavior |
| --- | --- |
| Initial load | Portrait, positioning and current sections remain useful HTML. Replace hero Contact me action with prompt. No model request, Eve session, MCP handshake or renderer initialization. |
| Empty submit | Do not start a request or scroll; keep a usable labeled field. |
| Enter or mobile search action | Validate input, commit request identity, begin transition immediately, then request composition. IME composition Enter must not submit. No visible send button. |
| First submit | Smoothly move the prompt to the viewport top; nav scrolls out; only prompt becomes sticky. Preserve the hero above it in the DOM. |
| Loading | Replace sections below prompt with a reserved, labeled loading region. Keep prompt usable. Never hide the whole page. |
| Partial | Render validated safe content with stable geometry; keep write actions disabled until complete validation. |
| Complete | Render the current request's experiences; announce completion without moving focus unexpectedly. |
| Re-query | Replace results; abort/invalidate the older request. This is an independent query, not an implicit follow-up. |
| Error | Keep prompt and query; show retry plus ordinary `/work`, `/cv`, `/contact` routes. |
| Reset | Clear query, results and unsent drafts; cancel composition; restore original sections and nonsticky initial state. |

Reset control: in the active state, a back-arrow button (accessible name and tooltip “Back to homepage”) replaces the field’s leading search icon. Usage hints stay screen-reader only; no visible helper text sits under the field. No query strings, browser-history entries, sharing URLs or cross-visit query restoration in MVP. Ordinary route links remain ordinary navigation.

The sticky containing block spans the full results region and must not be trapped by the existing hero's short/overflow wrapper. Short results still need enough layout extent for the prompt to remain at the top. Prompt placement and reading width remain inside the site column. Do not make the nav sticky or alter hero artwork/identity copy as part of this feature.

No JavaScript: retain readable portfolio content and a normal `/contact` fallback; do not present an apparently working search. Provider outage: initial page remains unaffected; active query receives a deterministic recoverable state.

## State and accessibility

Unsent note/name/email/topic fields remain only in memory during the visit when changing results. They are not sent to the composer. Restoring booking fields does not restore an expired availability guarantee. A write already accepted by the server retains a pending/confirmed receipt outside the replaced result tree; reset does not undo it or erase the ability to report its outcome. Explicit reset clears only unsent draft data.

Use an accessible search label and semantic form. Keyboard users can submit, edit, reset, enter results and operate all fields. Loading/error announcements use a polite status region, not the entire streaming document. Keep focus on the prompt after submission; results must be reachable in normal tab order. Respect reduced motion with immediate positioning rather than animated scroll. Do not fight manual scroll or trap focus during the transition. Handle mobile keyboard resizing and safe-area spacing without covering the field or focused form controls.

Contact and booking inherit the shared container rules: wide contextual left rail and task on right; narrow task-only view. Ordinary homepage metadata, structured data, canonical URL and crawled content remain stable. Generated personal queries must not enter sitemap, indexed routes, analytics URLs or structured data.

## Code style

Reuse existing primitives. Real excerpt from `app/page.tsx`:

```tsx
<PageSection title="Work together">
  <LetsConnect />
</PageSection>
```

Use the same server-rendered section tree for initial and reset states. Keep transition state separate from request state so waiting on a provider cannot delay visible feedback.

## Commands

```bash
bun run dev
bun run verify
bun run test:llms
bun run build
bun run verify:routes https://gaboesquivel.localhost
agent-browser skills get core
```

After creation: `bun test components/genui`. Follow [browser verification](../../agents/verify.md), including its session, screenshots, errors and console evidence. Update route checks for the reviewed `/ask` redirect rather than leaving contradictory assertions.

## Testing strategy and success criteria

Use state-machine tests for re-query/reset/races and real browser verification at 320×740, 390×844, 768×1024 and 1440×900. Include reduced motion, keyboard/IME, zoom, disabled JS, disabled model providers, cold renderer import, short/long results and network failures. Verify shared nav/footer/contact/CV behavior after the change.

| ID | Observable acceptance |
| --- | --- |
| HP-01 | First-load HTML contains today's useful sections with providers unavailable and no eager generative runtime/model requests. |
| HP-02 | Feedback begins within 100 ms of submit and before any inference response; reduced motion reaches the same final state. |
| HP-03 | Nav scrolls away; prompt remains sticky throughout short/long results and mobile keyboard changes. |
| HP-04 | Query B wins even if A completes later; no transcript accumulates and prior actions become inactive. |
| HP-05 | Reset restores original content, clears unsent drafts, and blocks stale streams from replacing it. |
| HP-06 | Forms/receipts remain usable at all verified widths; repeated picker/form actions cause no additional LLM call. |
| HP-07 | Error, no-results, import failure and provider outage retain usable navigation and retry. |
| HP-08 | Metadata/canonical/source content stay intact; no query or form data appears in analytics URLs or exports. |
| HP-09 | `/ask` redirects temporarily to `/`; JSON Render removal leaves no active imports, and applicable route/discovery/export docs match. |

Measure initial bundle and first-paint baseline before and after; report renderer separation and any regression instead of asserting “zero impact.” Composition latency measurements follow the runtime spec.

## Boundaries

- Always: preserve server-rendered proof, reuse the design system, respect reduced motion, and verify real browser behavior.
- Ask first: change hero copy/artwork, nav behavior beyond this spec, introduce conversational history or persist visitor drafts.
- Never: make the entire page client-only, embed the native app in an iframe, or make search wait for inference before responding visually.

## Open questions

Approve independent-query/reset behavior and in-memory draft retention. The temporary `/ask` redirect is the recommended concrete interpretation of the user's permission to break that experiment; update PRODUCT/DESIGN and propagation sources with implementation. The new sticky motion needs an explicit DESIGN.md budget entry once approved.
