# Spec: Composition runtime

Module: `composition-runtime`. Status: draft, awaiting approval. Depends on: `openui-experiences` and its public-capabilities contract. Index: [capability map](CAPABILITIES-homepage-genui.md).

## Objective

Choose the least expensive sufficient path for each homepage query and return a validated OpenUI composition. Ordinary requests should avoid Sonnet; semantic synthesis uses Eve with a compact evidence packet and one generation call.

## Tech stack and project structure

Reuse Eve, AI SDK, AI Gateway and TypeSafe/Jev; add the compatible OpenUI library integration. Current source: `agent/agent.ts`, `agent/instructions/`, `agent/memory/retrieve.ts`, `lib/connect/sonnet-model.ts`, and generated corpus files. Proposed owners: `lib/genui/compose.ts`, `decisions.ts`, `context.ts`, `deterministic.ts`, `telemetry.ts`, and `app/api/genui/compose/route.ts`. Tests/fixtures are colocated under `lib/genui/`.

The configured Sonnet ID is `anthropic/claude-sonnet-5.5`; verify gateway availability before pinning. Jev 1.14 is the idea draft's target, not evidence of a configured or available endpoint. Keep provider versions explicit in traces. Read installed Eve/AI SDK docs and current TypeSafe docs before choosing integration APIs.

## Consumer contract

Input: version, bounded nonempty query, client request ID and optional locale. Server assigns a correlation ID and request ownership. Do not accept prior chat history, form drafts, credentials or client-selected model IDs. Output: ordered start/partial/complete/error events with request ID, sequence and library version; final result conforms to [OpenUI experiences](SPEC-openui-experiences.md). The exact transport encoding is a planning choice; event ordering and stale-result rejection are required.

No generated-result reuse: a repeat query routes again. Do not memoize query-to-document responses, use Redis as a composition cache, or configure automatic gateway response caching. Remove the existing explicit gateway `caching: "auto"` setting for this path. Static assets and existing cap/idempotency storage remain cacheable/stored as appropriate. Do not claim this disables provider-internal prompt caching.

## Routing contract

| Tier | Entry | Calls | Result |
| --- | --- | --- | --- |
| 0 | Exact controlled suggestion or explicit known operation | Zero model calls | Deterministic document |
| 1 | Non-exact query with bounded intent | One Jev request, zero Sonnet | Deterministic document from validated decision |
| 2 | Synthesis, uncertain/contradictory decision, or Jev failure | At most one Jev attempt and one Sonnet generation | Eve streams OpenUI |

The tiny exact-match map must not grow into a homemade natural-language classifier. Normalize only controlled spelling/case/whitespace; paraphrases go through the decision route. Unknown topics cannot map to invented project evidence.

Jev answers independent intent questions and a domain Choice. Normalize with the question type intact: Noul gives a yes probability; Choice/Score include distribution-derived confidence. Proposed starting policy: intent yes at ≥0.82, no at ≤0.18, ambiguity in between. Require applicable domain confidence ≥0.82. Any material ambiguous/contradictory answer, unsupported domain, or need for synthesis escalates. These are adjustable application thresholds; never interpret 0.82 as 82% empirically measured routing accuracy. Multiple selected intents produce an ExperienceStack without Sonnet if evidence is sufficient.

For Tier 2, application code selects a bounded evidence packet from canonical sources, with record IDs and URLs, before the model call. On Jev failure, use deterministic corpus retrieval from the query; do not depend on a missing classification to hydrate context. Eve supplies library-generated grammar, truthfulness/identity constraints and composition policy. Insufficient evidence produces a short honest limitation plus relevant navigation, not invented achievements.

Normal composition has no retrieval-tool/model loop, write tools, subagents, browser or Redis coding skills. Keep `gabo` as the identity authority; include the compact required guidance before generation so normal composition does not need `load_skill`. Any optional runtime skill load is an explicit exceptional path and must not silently violate the one-generation budget. No shared conversation memory between independent searches or visitors.

## Proposed resource and failure policy

Initial bounds for review: 2,000 Unicode code points per query; 64 KiB UTF-8 generated document; six top-level experiences; 8,000 context tokens excluding fixed library instructions; 2-second Jev deadline; 12-second semantic deadline; 15-second overall deadline from server admission. Output exceeding limits fails safely; do not truncate grammar and execute it. Admission controls must bound concurrent runs and request rate; planning must choose deployment limits from existing cap infrastructure and anticipated traffic before launch.

Jev failure escalates once. Semantic timeout/failure or final parse failure returns recoverable error plus ordinary portfolio links. No automatic Sonnet retry or Autofix. Explicit user retry starts a fresh request. Abort on supersession or navigation; attempt to cancel upstream Eve work as well as disconnect the stream. Cancellation cannot guarantee the provider stopped billing, and it cannot undo a previously accepted independent write.

Telemetry correlates request, surface, tier, classification signals, model IDs, model-call counts, input/output tokens, parse errors, first-valid-UI/completion time, tool status and cancellation reason. Use Eve traces for the reasoning run and application spans for the other tiers. Do not log raw query/form text, email addresses, generated documents or private data by default; inspect redacted fixtures for parse debugging. Review Eve/provider logging and retention before launch, not only custom metric labels.

## Performance targets

Measure client submit to first valid visible UI, including lazy runtime loading and network time. Report cold and warm asset runs separately at 390px and 1440px, with browser/device/network/deployment details, at least 30 runs per tier and p75 results. Record model TTFT separately from first valid UI.

| Measurement           | Initial p75 target |
| --------------------- | ------------------ |
| Tier 0 first valid UI | <250 ms            |
| Tier 1 first valid UI | <750 ms            |
| Tier 2 first valid UI | <1.8 s             |
| Tier 2 complete       | <4 s               |

These are proposed optimization targets, not existing measurements. Misses require an explicit report and decision before relaxing targets; deterministic correctness and call-count limits are hard acceptance criteria.

## Code style

Use existing explicit model configuration and injectable pure helpers. Real snippet from `agent/agent.ts`:

```ts
"session.started": () =>
  sonnetSessionSelection({
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  }),
```

Keep credentials in server configuration, never in a browser composition envelope. Separate routing, retrieval and serialization so failures can be tested independently.

## Commands

```bash
bun test lib/connect/rank.test.ts lib/connect/routing.test.ts lib/connect/gate.test.ts
bun run test:llms
bun run verify
bun run build
```

After creation: `bun test lib/genui`. Live model evaluation is separate from deterministic mocked tests and must report the actual configured model versions.

## Testing strategy and success criteria

Use injected decision/model clients, fake clocks, stream fixtures and a versioned evaluation set. Include every intent, multi-intent queries, paraphrases, irrelevant topics, contradictory decisions and prompt injection. Label expected experience/evidence, not an exact generated string.

| ID | Observable acceptance |
| --- | --- |
| CR-01 | Controlled examples use zero model calls; Tier 1 uses one Jev and zero Sonnet; normal Tier 2 uses one Sonnet. |
| CR-02 | Multi-intent results preserve requested experiences; uncertain decisions escalate without guessing. |
| CR-03 | Jev timeout still reaches a context-grounded semantic attempt within the overall deadline. |
| CR-04 | Prompt injection cannot select arbitrary components, fetch private sources, execute tools or overwrite instructions. |
| CR-05 | Superseded streams never commit; cancellation reaches the owning run where supported. |
| CR-06 | Malformed/oversized output fails without execution, repair loops or hidden inference retries. |
| CR-07 | Repeat queries route afresh; no session from another query/visitor leaks into context. |
| CR-08 | Every tier has correlated timing/call-count evidence and no sensitive metric fields. |

## Task intent, domain, and composition recipes

Task intent (browse, explain, compare, architecture, writing, CV, contact, booking) is classified separately from subject domain (AI, Web3, career, and so on). Domain vocabulary does not select a diagram or layout by itself.

Approved project composition recipes (`project-bento`, `project-feature-grid`, `project-asymmetric-closing`, `project-compact-list`, `project-comparison`) are declared in `lib/genui/composition-plan.ts`. The compiler validates recipe cardinality and duplicate record IDs. Semantic slot roles are assigned before rendering; the React showcase layouts own responsive geometry. Diagrams (`CapabilityShowcaseExperience`) require explicit architecture intent.

## Boundaries

- Always: separate decision probabilities from confidence, ground output in sources, enforce limits, record actual calls and failures.
- Ask first: change model families, allow extra reasoning turns, add runtime research tools or cache generated results.
- Never: route ordinary MCP tools through this agent, call models on initial homepage load, or let a generated composition authorize a write.

## Open questions

Review initial limits and target status. Planning must establish compatible Jev/Gateway access, actual Sonnet availability, Eve cancellation and OpenUI adapter behavior, instruction-token budget, admission limits and retention settings. Do not install coding-oriented integration skills in `agent/skills/`.
