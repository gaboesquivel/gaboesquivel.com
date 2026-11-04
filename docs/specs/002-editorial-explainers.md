# 002: Editorial explainers, starting with the context-engineering loop

Status: draft (2026-11-03).

## Problem Statement

A reader can see the context-engineering article's system boundaries but cannot inspect how context changes from one model call to the next. The site needs more expressive technical storytelling within its established editorial identity. Adding decorative animation or redesigning the portfolio would not solve that reading problem.

**Bet:** a small, reader-controlled explainer can make the model/harness/runtime distinction and context feedback loop easier to follow while remaining useful as a still figure.

## Solution and scope

Replace only the existing `#harness-diagram` figure in `/blog/2026-09-context-engineering` with a reusable React/SVG explainer. Keep that anchor, surrounding argument, hero, metadata, photography, navigation, and article layout. Use **Animdiagram as the primary visual reference**, reflecting the user's explicit preference on 2026-11-03. Flue supplies interaction inspiration; Storyink supplies the idea of authored steps separated from playback.

The first increment includes one authored scenario, reusable playback/state primitives, two responsive arrangements, accessible text, and static fallbacks. A reader can play once, pause, advance a step, select a phase, and reset. Every motion communicates a transfer or state change. The result should read as a technical figure inside an article, not a workflow editor or a marketing card.

Drafting this spec does not authorize implementation. Its motion and content-policy additions are proposed in [decision 0004](../decisions/0004-editorial-explainer-motion.md). Acceptance must update the owning documents before implementation starts.

## Evidence and current baseline

Inspected `origin/main` at `69a8e9db` on 2026-11-03, after fetching origin. The original local main was one commit behind. Checked all local and fetched remote branch trees: spec 002 and decision 0004 were unused.

- [Spec 001](001-site-design-ux-search.md) is accepted with individually gated follow-ups. [PR #22](https://github.com/gaboesquivel/gaboesquivel.com/pull/22) merged its tasks 01–13; [#23](https://github.com/gaboesquivel/gaboesquivel.com/pull/23) split design rules and added identity checks; [#24](https://github.com/gaboesquivel/gaboesquivel.com/pull/24) corrected stale nav/MCP documentation. No open PRs at inspection. Remote `build/001-approved-followups` had no commits ahead of main. This spec does not approve spec 001's outstanding motion/search items.
- `components/diagrams/ai-system.tsx` and `web3-boundary.tsx` are static SVG components. `diagram-scroll.tsx` supplies horizontal scrolling, not simulation. They are consumed by `components/genui/capability-showcase.tsx`; preserve their behavior.
- The article currently embeds `public/images/diagrams/2026-09-context-harness.svg`, with an explicit conceptual-layout disclaimer. Preserve that meaning and asset for rollback.
- `components/mdx.tsx` maps approved components; Velite processes MDX through `lib/velite-mdx-plugins.ts`. Account for figure normalization rather than nesting a new figure inside the existing one.
- `ARCHITECTURE.md` and `lib/genui/contract/` establish a shared OpenUI compiler. The server library and React library are distinct consumers of shared schemas. `CapabilityShowcaseExperience` is an existing portfolio-evidence experience, not a generic explainer slot.
- `docs/agents/content.md` forbids diagrams on `/ai`, `/web3`, and `/bio`; those routes stay excluded. Article diagrams currently follow a static asset convention.
- The earlier chat was recovered, but its uploaded screenshot was unavailable. The live Flue page and reference repositories were inspected. No claim is made about Flue's exact rendering library, and pixel matching its screenshot is not an acceptance criterion.

## Implementation Decisions

### Contract before rendering

Author trusted, typed scene data locally. No arbitrary graph input, generated SVG, user-provided markup, callbacks in serialized data, or runtime diagram compiler. The article-facing API is `<AgentLoopExplainer />`; it selects one local definition and owns one figure. The reusable implementation accepts this definition shape:

```ts
type NodeState = "idle" | "active" | "complete";
type EdgeState = "idle" | "active" | "complete";
type PlaybackStatus = "paused" | "playing" | "complete";

type ExplainerDefinition = {
  id: string;
  title: string;
  summary: string;
  nodes: readonly { id: string; label: string; description: string }[];
  edges: readonly { id: string; from: string; to: string; label: string }[];
  steps: readonly {
    id: string;
    label: string;
    explanation: string;
    context: readonly string[];
    nodes: Readonly<Record<string, NodeState>>;
    edges: Readonly<Record<string, EdgeState>>;
    transferEdgeId?: string;
    dwellMs: number;
  }[];
};

type PlaybackState = {
  stepIndex: number;
  status: PlaybackStatus;
  elapsedMs: number;
  settled: boolean; // step/select shows a static completed transfer
};

type PlaybackEvent =
  | { type: "play" }
  | { type: "pause" }
  | { type: "step" }
  | { type: "select"; stepIndex: number }
  | { type: "reset" }
  | { type: "tick"; deltaMs: number }
  | { type: "suspend" };
```

Layout coordinates and trusted SVG paths belong to the renderer's authored wide/narrow arrangements, keyed by the same node/edge IDs. Do not infer geometry from labels. Validate unique IDs, nonempty steps, valid endpoints, valid transfer edges, positive dwell times, and complete state maps at the local definition boundary. Unknown selections are ignored. Invalid definitions render the text fallback without controls, with a development diagnostic. There is no public validation endpoint.

State maps are complete snapshots: direct selection of any phase yields the same scene as playing to it. “Complete” means processed in this illustrated sequence, not real-world tool success. Edges carry explicit direction and text; color alone does not communicate state. Keep runtime status separate from domain phase so a paused active tool remains understandable.

**Exposure:** one public article, anonymous read-only use. Playback state is in memory per mounted instance; it resets on remount and is not written to storage, URLs, analytics, APIs, models, or tools. The apparent test/tool activity is prerecorded illustrative data. No execute capability exists; there is no anonymous write path to secure.

### First scene: investigating a bug

Use the article's hypothetical bug investigation, with the visible qualifier “Illustrative sequence — no tools are running.” Never present fabricated results as a trace of Gabo's work or expose supposed hidden model reasoning. “Model” represents observable requests and responses.

Cast: task, harness, model, runtime/tools, and memory/skills. Five nodes maximum. The runtime/tools node has a clear permission-boundary label; the harness assembles context and dispatches authorized actions. Memory/skills supply selected information; no automatic memory write is implied.

| Phase ID / control label | Observable scene and transfer | Context shown beneath the figure |
| --- | --- | --- |
| `task` / Task | Task → harness; initial paused frame shows the full topology and selected task | “Investigate a failing checkout test.” |
| `assemble` / Context | Memory/skills → harness; instructions and relevant code join the task | Task, relevant code, test procedure, scoped instruction “Use staging for this test” |
| `model` / Model request | Harness → model; model returns a request to run the test in the caption | The assembled input; tool request is distinct from permission |
| `tool` / Tool execution | Harness → runtime/tools; show “Runs only with runtime permission” | Same context; illustrative pending test request |
| `result` / Tool result | Runtime/tools → harness; show “Example result: checkout test failed” | Add the bounded failure output; keep the scoped instruction |
| `update` / Updated context | Harness → model; relevant tool result joins the next model input | Task, relevant code, procedure, staging constraint, failure output |
| `response` / Response | Model → harness; final caption proposes a next investigation step | “Inspect the failing checkout path.” State that another tool request could repeat the loop |

Hand-author the return/request connectors as part of topology even where a phase animates only its primary transfer. At most one traveling packet is visible at a time. The illustration terminates after one cycle; the final explanation conveys repetition without an endless animation. Do not add a branching simulator, actual test run, fake token counters, or speculative memory persistence.

### Playback semantics

- Initial/SSR state: `task`, paused, elapsed zero. No autoplay on mount, visibility, hover, focus, or scroll.
- **Play** advances from the current phase. From complete it restarts at Task. Each phase lasts 2400ms; its transfer occupies the first 800ms and the remainder is reading time. Completion freezes the final phase and shows “Replay”.
- **Pause** freezes both clock and packet at their current progress. Resume continues the remainder; no phase skip or replay of an already completed transfer.
- **Next step** pauses, advances exactly one phase, and renders its settled transfer state without a traveling packet. Disabled at the last phase. Selecting a phase behaves the same way; choosing the current phase settles it. A subsequent Play starts that phase's dwell at zero.
- **Reset** returns to the initial paused Task state, clears elapsed time, and leaves focus on Reset. Repeated reset is idempotent.
- Explicit pause preserves elapsed time and `settled`. Step/select set `settled: true`; Play from a settled phase clears it and starts elapsed time at zero. Reset sets `settled: false`. Domain snapshots remain unchanged by this presentation flag.
- Leaving the viewport or hiding the document dispatches suspend: freeze at the current progress and remain paused when visible again. Unmount cancels work. No background catch-up; two instances have independent clocks and IDs.
- One monotonic clock governs phase and packet progress. Do not combine independent CSS loops with unrelated React timers. A small controller may use `requestAnimationFrame` while playing and pass normalized progress to a CSS custom property/SVG presentation adapter; React rerenders at phase/control changes, not every animation frame. Clamp a tick to the current phase remainder and discard excess after a long stall.

### Visual grammar and motion budget

Primary reference: Animdiagram's deletion-first composition, orthogonal connectors, single accent, small cast, and meaningful packet motion. Recreate these principles with original site-authored geometry. No package installation or source copying is required.

- Preserve black, white, neutral-400 labels, turquoise `#5cded6`, system mono, 8px corners, site spacing and the article's existing width. Use visible text labels and quiet structural rules, not stacked dashboard cards.
- Orthogonal paths avoid label crossings; endpoints meet node edges. Arrowheads distinguish direction at rest. Active transfer uses one small turquoise packet; processed paths settle to a nonmoving state.
- Keep nodes stationary. Use 180ms named color/opacity transitions on the site's easing curve for state changes; packet travel uses linear progress over 800ms to convey flow. No springs, node drift, path morphing, pulsing, glow, arrival rings, ambient streams, or infinite dashed-line motion.
- No dotted canvas in this increment: it adds editor-like texture without explaining the loop. No decorative numbering or eyebrow headings; phase labels and the functional “Step 3 of 7” status are information, not decorative markers.
- Use scoped CSS in the explainer directory. No new global route transitions, scroll-driven story, sticky simulation, page-load choreography, or changes to shared motion tokens for unrelated surfaces.
- CSS is the first choice for state styling. Native SVG path geometry supports packet placement; no SMIL clock, GSAP, Motion/Framer, React Flow, D3, or renderer/editor dependency. If a native animation feature is unavailable, keep the phase controls and instant state changes.

### Accessibility, responsive layout, and fallback

- A single semantic figure with title and caption; SVG has an instance-unique title/description ID. Packet and decorative marks are hidden from assistive technology. The full ordered explanation is available in an adjacent native `<details>` (“Read all steps”), retained in SSR and print.
- Use real buttons with visible labels: Play/Pause/Replay, Next step, Reset, and phase selection. Native Enter/Space activation and normal Tab order; no global keyboard shortcuts, drag-only actions, hover-only explanations, or forced focus changes. Current phase uses `aria-current="step"`; use a labelled group rather than a partial tab implementation.
- Keep one polite status region for user-triggered phase changes and completion; do not announce per-frame movement or every automatic phase. Visible captions remain readable throughout play. Disabled controls expose native disabled semantics. Focus rings use the accent; controls have at least 44×44px targets.
- Text contrast at least 4.5:1; essential connector/control boundaries at least 3:1 against black. Hairline may frame the figure decoratively but cannot be the sole visible essential connection. State labels/line treatment supplement color.
- Under `prefers-reduced-motion: reduce`, remove packet travel and interpolated transitions. The same controls and logical phases work; explicit Play advances static snapshots at the same dwell time. If the preference changes during playback, pause immediately, settle the phase, and require another Play. Do not start motion merely because reduced motion is later disabled.
- At container width below 640px, stack the cast vertically and route short side return connectors; at 640px or more, use the wide authored arrangement. Use container width, not viewport width. Keep SVG labels at least 14 CSS px at the smallest supported width; preserve strokes and wrap long captions in HTML.
- At 320, 390, 768, and 1440px viewport widths, and in a 320px container on a wide viewport, there is no page/figure horizontal scrolling, clipped label, overlap with the TOC, or hidden control. Controls wrap below the figure. Test 200% zoom and text expansion. Switching arrangement preserves selected phase and playback progress.
- SSR renders the complete static topology and text before hydration. Controls become available only after their handlers are ready; a failed/missing script leaves the overview and full explanation usable. Print renders the still overview and expanded step text, hiding controls. No blank client-only figure or layout shift on hydration.
- Preserve `#harness-diagram`. Keep static SVG fallback for rollback and noninteractive exports. The Markdown/llms corpus must include the diagram's explanation and steps, not just an opaque component tag. Keep one authored step source and explicitly teach the existing export path to serialize it, without importing client code.

### GenUI architecture boundary and later integration

This increment does **not** register a model-visible `ExplainerExperience`, change `CapabilityShowcaseExperience`, or alter MCP tools. The shared scene/controller accepts no GenUI provider dependency and can later be hosted by an adapter.

A follow-up requires evidence from the article and its own accepted scope. Proposed interface: a bounded `explainerId` enum (initially `context-agent-loop`) plus a validated source record ID for this article; the model cannot supply coordinates, paths, timings, step text, or executable actions. It would update shared schemas/catalog/compiler, both libraries, renderer views, deterministic fixtures, source grounding and plain-text fallback together, following `SPEC-openui-experiences.md`. It must prove native homepage, narrow container, and MCP App parity before exposure. No new MCP tool is needed merely to animate an approved read-only explanation. Existing search continues linking the article meanwhile.

## File-level implementation plan

Paths marked new are proposed; others exist at the inspected baseline. Keep changes within these seams unless evidence requires an explained adjustment.

| File / seam | Planned change |
| --- | --- |
| `lib/diagrams/explainer.ts` (new) | Definition types, validation, pure playback transitions, settled-selection presentation contract |
| `lib/diagrams/context-agent-loop.ts` (new) | Seven phase snapshots, node/edge IDs, captions and textual fallback; no React/browser imports |
| `components/diagrams/explainer.tsx` (new) | Figure, text fallback, isolated client playback boundary, instance IDs and controls |
| `components/diagrams/use-explainer-playback.ts` (new) | One clock, pause/resume, visibility and reduced-motion handling, cleanup |
| `components/diagrams/agent-loop.tsx` (new) | Approved article wrapper and responsive SVG geometry |
| `components/diagrams/explainer.module.css` (new) | Local state, control, container, print and reduced-motion styles |
| `components/mdx.tsx` | Register `AgentLoopExplainer`; keep generic figure/image behavior intact |
| `content/2026-09-context-engineering.mdx` | Replace exactly the harness figure block; retain anchor and conceptual disclaimer |
| `scripts/llms/blog.ts` and `scripts/llms/markdown-corpus.test.ts` | Serialize the known component into readable steps; verify corpus output, retaining existing article text |
| `playwright.diagrams.config.ts` (new) | Isolated `tests/diagrams` configuration using a prestarted local server, Chromium/Firefox/WebKit, no GenUI fixture server or CI changes |
| `lib/diagrams/explainer.test.ts` (new) | State/clock/validation invariants, independent controller instances, and deterministic scenario assertions |
| `tests/diagrams/agent-loop.spec.ts` (new) | Article controls, fallbacks, responsive/a11y/motion lifecycle checks |
| `DESIGN.md`, `docs/agents/motion.md`, `docs/agents/content.md`, `docs/agents/design/editorial-images.md` | On acceptance, add the narrow explainer allowance and component convention from decision 0004 |
| `ARCHITECTURE.md` | When implemented, document local scene → controller → SVG/text flow and no GenUI exposure |

Read the installed Next guides before implementation; the local `use-client` guide confirms the interactive boundary and serializable props. No new View Transition is proposed. Do not modify `DiagramScroll` to carry the new figure: its horizontal-scroll behavior conflicts with the article's no-scroll requirement. Do not refactor the existing static capability diagrams as a prerequisite.

## Testing Decisions and acceptance criteria

The following are **future implementation checks**, not work performed while drafting. Use deterministic fixtures and local browser interaction; no model, paid AI, eval, tool execution, booking, contact submission, or deployment is required.

| ID | Acceptance criterion | Focused evidence |
| --- | --- | --- |
| EX-01 | The complete static topology, context text and seven-step explanation work without JavaScript and in print | SSR/JS-disabled browser and print check |
| EX-02 | Play completes exactly one cycle; pause/resume preserves progress; step/select settle deterministically; reset is repeatable | `bun test lib/diagrams/explainer.test.ts` plus article browser test |
| EX-03 | Tool request, harness dispatch, runtime permission and returned context remain distinct; no hidden reasoning or real execution is claimed | Scenario snapshot assertions and editorial review against the source article |
| EX-04 | One visible packet corresponds to the active transfer; paused, complete, hidden and offscreen states perform no animation work | Browser controlled clock/lifecycle assertions and visual inspection |
| EX-05 | Keyboard-only operation, labels, focus, state semantics, text contrast and 44px controls pass | Playwright + axe and manual keyboard/screen-reader inspection |
| EX-06 | Reduced motion removes spatial/interpolated motion, preserves step/play functionality, and pauses on preference change | Emulated media browser test |
| EX-07 | All specified widths, narrow embedded container and 200% zoom remain readable with zero horizontal overflow; layout change preserves state | Screenshots and bounding-box checks, Chromium/Firefox/WebKit |
| EX-08 | Two instances operate independently, IDs never collide, and remount resets cleanly with no stale timer | Two-instance server-render ID assertion, independent controller tests and article remount check |
| EX-09 | Markdown exports contain the illustrative qualifier, ordered steps and conceptual boundary explanation without raw component syntax | `bun test scripts/llms/markdown-corpus.test.ts`, then `bun run test:llms` |
| EX-10 | No new runtime dependency, network request caused by controls, or GenUI catalog/API change; unrelated routes look unchanged | Diff/import review and browser request assertions |
| EX-11 | The rendered figure meets the Animdiagram-derived grammar and the existing identity rules; hydration produces no errors or visible jump | Browser screenshots, console/errors, `bun run check:motion`, `bun run check:design` |

After implementing: `bun run verify` and `bun run test:llms` are the repository checks for the content/UI change; run `bun test lib/diagrams/explainer.test.ts` and `PLAYWRIGHT_BASE_URL=https://gaboesquivel.localhost bunx playwright test --config playwright.diagrams.config.ts` once those files exist. Follow [browser verification](../agents/verify.md) at `https://gaboesquivel.localhost`, recording actual browser/session, viewport, screenshots, console and errors. The existing `playwright.config.ts` only discovers `tests/genui` and runs Chromium; use the isolated diagrams config for this suite, with a prestarted server and no implicit build or fixture-lab boot. Add no CI job. Use `http://localhost:3099` only when HTTPS trust blocks local verification, as the browser guide permits. Shared GenUI changes are deferred; if scope later includes them, the required `bun run test:genui` gate applies. Do not run eval scripts as a substitute for deterministic tests.

**Acceptance scenario:** a technical reader opens the Context Engineering article at 390px, with normal motion and no authenticated session.

1. Follow `#harness-diagram`: the still overview and illustrative qualifier are visible before playback; no page overflow.
2. Tab to Next step and activate it twice: Model request is selected, paused, with the assembled context and request explanation visible.
3. Play, then pause during Tool execution: the packet freezes and the caption distinguishes permission from request. Wait longer than a phase: nothing advances.
4. Resume: Tool result adds the example failure to context, Updated context preserves the staging constraint, and Response completes once without looping.
5. Select Tool result directly: it matches the earlier snapshot. Reset restores Task and keeps keyboard focus on Reset.
6. Enable reduced motion: selecting/playing phases changes snapshots without moving packets. Read all steps reveals the same explanation.
7. Reload with scripts disabled, then inspect the Markdown export: both retain enough explanation to understand the model/harness/runtime relationship. No live tool/model request occurred in any step.

## Appetite and staged rollout

Target: three focused implementation days after acceptance; actual time not measured. Zero runtime service/model cost and no new package dependency. No product analytics or invented engagement metric is required: success is the demonstrated acceptance journey and the reader's ability to identify who selects context, requests tools, enforces execution access, and incorporates results.

1. **Accept the bounded change:** accept this draft and decision 0004; update owning policy documents. No broad “motion is now allowed” relaxation.
2. **Static first:** build the scene, responsive topology, captions, text/export fallback and pure transition model. Verify EX-01/03/07/09 before adding motion. This is the first verifiable slice, not a separate product bet.
3. **Controlled playback:** add controls, single clock, connector motion, lifecycle and accessibility. Verify EX-02/04/05/06/08/10/11. If appetite runs out, defer publication rather than cutting static fallback, reduced motion, permission semantics or keyboard controls.
4. **Article-only release:** after independent review and the normal authorized shipping process, replace the one article figure. No homepage, capability page or GenUI rollout. Rollback restores the original figure block and SVG reference; shared primitives can remain unused or be reverted together.
5. **Evaluate expansion separately:** review the working figure with the owner before selecting another article, a generative-interfaces scene, or a GenUI adapter. These are later bets, not deliverables required to close this spec.

## Direction changes

The user has selected the explainer direction and Animdiagram's visual style. Detailed behavior remains a draft. Decision 0004 proposes a tightly scoped extension to the enumerated motion budget and static article-figure convention. Current canonical documents remain unchanged until acceptance. Nothing here supersedes the diagram ban on `/ai`, `/web3`, `/bio`, the homepage identity, or spec 001's independently gated work.

## Out of Scope

Broad redesign; fonts/palette/navigation changes; new photography or generated images; portfolio/case-study rewrites; diagram editors, drag/zoom/pan or auto-layout; generic JSON/Mermaid authoring; infinite or scroll-triggered playback; real agents/tools/models; persistent state; telemetry; GenUI/MCP catalog expansion; dependency upgrades; CI/workflow changes; evals; deployment in this drafting task.

## References and licensing

Inspected primary READMEs and LICENSE files on 2026-11-03. Links pin the inspected revisions. No third-party implementation is imported by this spec.

| Reference | Useful idea / decision | Verified license |
| --- | --- | --- |
| [Animdiagram](https://github.com/praveenvijayan/animdiagram/tree/a8edca75f041ebb75c74ac9d3b3fbec3b9cd5486) | Primary visual reference: small cast, orthogonal routing, single clock, readable still. Adapt packet grammar; omit glows, rings and ambient motion. Its standalone CSS/SVG generator is not the interactive runtime | [MIT](https://github.com/praveenvijayan/animdiagram/blob/a8edca75f041ebb75c74ac9d3b3fbec3b9cd5486/LICENSE) |
| [Storyink](https://github.com/grenaad/storyink/tree/872c15b302d545bffafc6795b63658a50de509e3) | Separate story steps from geometry/playback. Its React + Motion viewer and broader authoring/export system are unnecessary here | [MIT](https://github.com/grenaad/storyink/blob/872c15b302d545bffafc6795b63658a50de509e3/LICENSE) |
| [Dashmotion](https://github.com/csthink/dashmotion/tree/ae2fe4f28c60caa53da8b15fa3537f4ea576f4ad) | Lightweight HTML/SVG flow; inspect connector direction. Do not adopt an independent SMIL/animated-dash clock | [MIT](https://github.com/csthink/dashmotion/blob/ae2fe4f28c60caa53da8b15fa3537f4ea576f4ad/LICENSE) |
| [DrawCMS](https://github.com/drawcms/drawcms/tree/c53c914df2758c0cf105ff56daa8c6b5526e9dc6) | Editor/presentation separation is interesting, but editor scope and license make it unsuitable for direct adoption in this increment | [AGPL-3.0; README specifies AGPL-3.0-only](https://github.com/drawcms/drawcms/blob/c53c914df2758c0cf105ff56daa8c6b5526e9dc6/LICENSE) |
| [Flue explainer](https://momito.co.uk/flue/) | Reader-operated agent-loop explanation; live page exposes pause/reset. Its source technology/license was not established | Treat as interaction reference only; do not copy code, artwork or text |

If later copying substantial MIT-licensed source, retain its copyright and license notice with the copied material and record provenance. Do not assume a repository's license covers external images/fonts or linked demos. No DrawCMS code/assets will be reused without a separate licensing decision. Original geometry and site copy are the default.

## Open assumptions

- The seven-phase bug investigation and timings are proposed defaults, ready to implement after acceptance; the original screenshot is not required because Animdiagram is now the primary reference.
- The final visual review must confirm the narrow layout and reading dwell, since this drafting task contains no rendered prototype or usability evidence.
- GenUI reuse is an architectural seam, not approved model-visible scope. A second use case should justify abstraction beyond this small contract.
