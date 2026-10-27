# Homepage GenUI initiative overview

Status: preserved initiative-wide proposal, superseded as an executable plan by the per-module workflow. Its stages are background sequencing only, not approved tasks. The [capability map](CAPABILITIES-homepage-genui.md) owns module order and current implementation status. All five modules are **largely implemented on `main`**; remaining work is live MCP gate, formal acceptance sign-off, and product cleanup — see [tasks/plan.md](../../../tasks/plan.md) and [acceptance record](../../research/2026-10-27-acceptance-automated-record.md).

## Summary

Build the native homepage first, then expose the same public capabilities and responsive experiences through MCP Apps.

Confirmed product choices:

- Searches are independent and replace the result region.
- Booking includes a local review-and-confirm step.
- ChatGPT and Claude must both pass live verification before the MCP App is considered ready.
- The homepage can ship independently of external-host verification.

Specifications remain in `docs/specs/homepage-genui/`. This overview lives alongside the specifications. `tasks/plan.md` and `tasks/todo.md` are reserved for the active module’s plan and approved task breakdown. Later modules receive their own planning cycle after their dependencies are verified.

## Architecture and interfaces

**Shared capabilities.** One server registry owns the nine specified public operations, their schemas and execution bindings. Native HTTP handlers and MCP tools invoke those same functions. Retain existing domain helpers where suitable; keep models, React and MCP out of business logic.

**Shared presentation.** Use a custom OpenUI library built from existing site primitives. Deterministic builders and generated output share validation, record references and responsive behavior. Contact and booking use contextual two-column layouts above the proposed 48rem container threshold and task-only layouts below it.

**Composition.** Use exact deterministic routes, then Jev classification, then Eve/Sonnet only for synthesis or uncertainty. The browser submits to a native composition endpoint and receives ordered request-scoped streaming events. The server uses Eve’s typed client for semantic work; the browser uses the OpenUI renderer directly. Do not introduce a chat transcript, AG-UI thread store or browser MCP connection.

**Actions.** Keep mutation authority outside generated text. Writes require an explicit user action after document validation. Return distinct pending, confirmed, uncertain and failed outcomes. Maintain action receipts separately from replaceable compositions.

**External delivery.** Replace Eve’s ownership of `/mcp` with the unified MCP server after the native experience is ready. External tools generate deterministic results and never invoke the homepage composer.

## Implementation sequence

The table below preserves the earlier cross-module proposal for context. Do not expand it into one initiative-wide task list. Each module is planned and reviewed separately, then broken into tasks of approximately five files with checkpoints after every two or three tasks.

| Stage | Deliverable | Dependency and checkpoint |
| --- | --- | --- |
| 1. Compatibility | Resolve and pin compatible OpenUI, MCP v2 and MCP Apps packages; verify configured model availability; prove one OpenUI fixture and an Eve stream/cancel cycle | Blocking checkpoint before feature work; no silent model or architecture substitution |
| 2. First read path | Registry contract, `get_cv`, deterministic CV experience and native adapter | CV renders from canonical records without inference |
| 3. Remaining reads | Profile, projects, writing, search and contact descriptor; corresponding responsive experiences | Source references and empty/error states validate across narrow and wide containers |
| 4. Note workflow | Shared note capability, retry state, responsive form and receipt | Mocked double-submit, provider timeout and storage-failure cases pass |
| 5. Booking workflow | Availability, slot validation, details, review, confirmation and receipt | Time-zone, cap, stale-slot and duplicate-request cases pass |
| 6. Native homepage | Small prompt island, lazy renderer, deterministic composition endpoint, sticky transition, replacement and reset | Complete deterministic user journey works before adding model routing |
| 7. Jev routing | Typed multi-intent classification, domain selection and escalation | Controlled examples use zero model calls; bounded paraphrases use Jev without Sonnet |
| 8. Semantic composition | Compact evidence packets, library instructions, Eve streaming, cancellation and telemetry | One normal Sonnet generation; stale or malformed output cannot commit or execute actions |
| 9. Native migration | Temporary `/ask` redirect, obsolete UI removal, JSON Render dependency/runtime-skill removal and documentation propagation | Native acceptance suite passes with no active JSON Render imports |
| 10. MCP App | Unified tools, bundled shared app resource, host bridge and routing handoff | SDK protocol tests and both live-host checks pass before retiring `/mcp/cv` |

Build these paths incrementally rather than constructing the entire backend and connecting the UI at the end. The early homepage path may use deterministic results while inference remains unfinished; it is not the completed release.

Keep changes to shared registry contracts, dependencies, routing and migrations sequential. After those contracts stabilize, independent experience fixtures and documentation can be developed separately without changing shared interfaces.

### Retry implementation

- Bind retry identity to the operation and normalized payload; reject changed payloads under the same key.
- Use Resend’s provider idempotency option. Retry uncertain sends only within its supported window; older uncertain outcomes require reconciliation.
- Use a stable valid Calendar event ID and retrieve that event when an insert outcome is uncertain.
- Preserve existing caps and availability checks. Pending or uncertain actions must not release their protection as though no write occurred.
- Do not claim exactly-once delivery across Redis and external providers.

References: [Resend idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys) documents a 24-hour window; [Google Calendar event creation](https://developers.google.com/workspace/calendar/api/guides/create-events) documents caller-supplied event IDs for retry protection. Recheck provider contracts before implementation.

## Verification and release

Use focused Bun tests after each slice. Run `bun run verify`, `bun run test:llms` and `bun run build` at integration checkpoints. Run `bun run verify:routes https://gaboesquivel.localhost` against the updated route contract.

Required browser scenarios:

- Initial HTML with JavaScript or providers unavailable.
- Immediate submission feedback, scrolling nav and sticky prompt.
- Narrow/wide containers, mobile keyboard, keyboard navigation and reduced motion.
- Query replacement races, reset, malformed streams and lazy-import failure.
- Draft retention, booking review, uncertain receipts and repeated submissions.
- Zero additional model calls during form and picker interactions.

Measure cold and warm performance separately against the draft targets; report results rather than claiming them in advance. Correlate all tiers and actions without logging raw form data or query text by default.

For MCP, verify initialization, discovery, tool calls, resource loading, text-only fallback and deployed routing. Then exercise the app in both ChatGPT and Claude. Mock external writes unless a specific live test is authorized.

Ship the homepage only after native acceptance. Keep the existing external endpoint operational until the replacement passes its gate. Update canonical documents and export sources with each behavior change. Leave unrelated OG-image work untouched.

## Defaults and remaining evidence gates

- Preserve unsent form fields in memory across searches; reset clears them.
- Preserve pending action outcomes across result replacement.
- Use the draft’s request, output and deadline limits as initial values.
- Keep existing booking durations, hours, recipients and daily caps.
- Temporarily redirect `/ask` to `/`; replace deprecated MCP tools and retire `/mcp/cv` with explicit migration guidance.
- Keep required identity and OpenUI instructions available before generation; retain `gabo` as the runtime identity authority.
- No generated-result caching, automatic repair loop, subagents or runtime web research.

Exact dependency compatibility and live provider availability remain verification gates: the registry lookup did not complete during planning. If a required integration is unavailable, stop that slice and report the concrete incompatibility rather than substitute a different stack.
