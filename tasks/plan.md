# Implementation plan: Public capabilities

Module: `public-capabilities`. Status: proposed module plan, awaiting review before detailed task breakdown. The user requested per-module planning; this document does not authorize implementation or mark future module specs approved.

Spec: [Public capabilities](../docs/specs/homepage-genui/SPEC-public-capabilities.md). Initiative index: [capability map](../docs/specs/homepage-genui/CAPABILITIES-homepage-genui.md). Background: [initiative overview](../docs/specs/homepage-genui/INITIATIVE-OVERVIEW.md).

## Objective and scope

Provide nine validated, model-free server capabilities for subsequent native and MCP consumers. Complete the provider boundary first, using existing source data and contact/calendar services. Deliver usable function contracts and tests, not presentation or transport implementations.

In scope: capability schemas and registry, public source selection, deterministic search, availability, booking and note execution, retry outcomes, caps, injected service dependencies, and provider tests.

Deferred to their own module cycles: OpenUI library and renderer, responsive forms, native HTTP/composition routes, homepage changes, Jev/Eve integration, MCP tools/resources/routing, `/ask` migration and JSON Render removal. No OpenUI or MCP package upgrade is a prerequisite for this module.

## Architecture decisions

- Add a server-only `lib/capabilities/` boundary. Each registry entry owns its name, description, input/output schemas, read/write classification and typed executor. Keep domain services in `lib/connect/` where practical; do not move files merely to match an illustrative layout.
- Keep execution context separate from public input. Clock, cap store, rate-limit identity, mailer, calendar and correlation ID come from trusted server wiring. Public payloads cannot turn enforcement off or set a recipient.
- Return versioned operation results with request ID, operation name, typed data and safe messages. Read results distinguish empty success from failure. Writes distinguish pending, confirmed, uncertain and failed; a duplicate is confirmed only when the stored provider result is confirmed.
- Use the existing CV payload helper, package facts, profile source and generated public corpus. Do not create a second biography or maintain manually duplicated project data.
- Implement deterministic selection and search without any model or renderer imports. Reuse ranking logic where applicable, but keep the new capability's corpus policy explicit instead of inheriting conversational archive exceptions accidentally.
- Keep current caps, 15/30-minute durations, Denver business hours and fixed note recipient. Validate that a requested start is a valid offered future slot within the same horizon used by availability; a client-supplied ISO timestamp alone is insufficient.
- Native booking review was confirmed in conversation. Its UI belongs to openui-experiences; this module exposes the validated write operation without introducing an untrusted `confirmed: true` authorization shortcut.

## Ordered implementation slices

These are plan-level slices, not the final task checklist. The Tasks phase will split each into focused changes with exact files, dependencies, acceptance criteria and commands; no individual task should exceed approximately five files.

| Slice | Deliverable | Depends on | Acceptance/checkpoint |
| --- | --- | --- | --- |
| PC-A | Registry/result contracts and `get_cv` with canonical payload | — | Schema-valid CV variants and invalid-input rejection; PC-01/02/07 |
| PC-B | `get_profile` and `contact_gabo` read descriptors | PC-A | Canonical facts/links, no email side effects; PC-01/02/07 |
| PC-C | `list_projects`, `list_writing` and `search_site` | PC-A | Deterministic ordering, validated filters/cursors, empty states and public-source fidelity; PC-01/02/07 |
| Checkpoint 1 | Review all six public read contracts | PC-A–C | Focused tests and build; no UI, transport, or model dependency |
| PC-D | Retry-state contract and atomic action admission | PC-A | Pending/confirmed/uncertain separated; concurrent claims and cap reservations tested; PC-03/04/05 |
| PC-E | `send_note` using provider idempotency and safe results | PC-B, PC-D | Mocked double-submit, timeout and provider-success/store-failure scenarios; PC-03/04/05/07 |
| Checkpoint 2 | Review note execution and recovery | PC-D–E | Retry policy resolved against provider docs; no blind repeat after uncertain delivery |
| PC-F | `list_availability` with shared slot-validation rules | PC-A | Time zone, duration, horizon, empty/error state and private-calendar filtering; PC-01/06/07 |
| PC-G | `book_call` with stable event identity and reconciliation | PC-D, PC-F | Caps, busy/past/out-of-window slots, concurrent retries and uncertain inserts; PC-03/04/05/06 |
| Checkpoint 3 | Provider contract release | PC-A–G | All nine operations validated; affected regression checks pass; documentation matches implemented boundary |

Each slice should finish a callable operation or independently tested provider boundary. Do not implement downstream UI to demonstrate provider completion. PC-B/PC-C and PC-F can be developed independently once PC-A is stable; shared registry/schema and retry-store changes stay sequential.

## Action state and recovery

Extend the store and provider interfaces before changing write behavior. Keep existing callers working through compatibility wrappers while new consumers adopt the richer result contract. Do not reinterpret pending as the existing success-like duplicate message.

Retry records bind operation and normalized payload. Reusing an identity with different arguments is rejected. Preserve same-payload deduplication so a caller cannot bypass an in-flight write merely by choosing another identity. Store provider receipt identifiers and safe status, not raw message bodies. Existing legacy keys must be recognized during migration so pending operations are not silently replayed.

Reuse the existing 48-hour storage horizon as the initial receipt-retention baseline. Retry eligibility is separate: an expired/missing receipt is not proof that the provider did nothing. The Tasks phase must include expired-identity handling and tests before enabling retry behavior.

For notes, pass a stable idempotency key to Resend and capture the provider receipt. Use the same payload/key for an explicit retry inside the documented provider window. After that window, an unresolved send remains uncertain and is not automatically resent. Known pre-write validation/admission failures remain safe to correct and resubmit.

For bookings, assign a stable valid Calendar event ID when inserting. Add a read-by-ID operation to reconcile uncertain inserts and duplicate responses. Keep availability checks, but do not mistake this identity check for a transaction spanning Redis and Calendar. A reconciliation lookup failure remains uncertain.

Cap reservation and action-state changes must be atomic where they share storage. Do not decrement a cap or delete a claim after a possible external success. Release only reservations known to belong to a failed pre-write attempt. An uncertain result must not become an automatic second provider call.

Provider contract verification belongs to PC-D/E/G, before implementation relies on it. Relevant references: [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys) and [Calendar event identity](https://developers.google.com/workspace/calendar/api/guides/create-events). Existing helpers are not sufficient evidence of duplicate protection.

## Verification

Use Bun tests with injected clock, store, mailer and calendar. Cover the acceptance IDs PC-01 through PC-07 from the spec. Each new operation needs invalid-input, valid-result and failure cases; writes additionally need concurrency, retries and uncertain-outcome cases.

Existing regression commands:

```bash
bun test lib/connect/note.test.ts lib/connect/caps.test.ts lib/connect/store.test.ts lib/connect/calendar-auth.test.ts lib/connect/calendar-errors.test.ts
bun test lib/connect/cv-download.test.ts lib/connect/rank.test.ts lib/api/routes.test.ts
bun run test:llms
bun run verify
bun run build
```

After creation, run `bun test lib/capabilities` plus any new colocated action/calendar tests. The task list must name those tests explicitly. Run focused tests per change and broader commands at the checkpoints where their shared behavior changes.

Native/MCP adapter parity and browser confirmation checks are deferred integration obligations, not claims made by this module's tests. No live email or calendar write is part of routine validation; report external delivery/booking as unverified until a specific live test is authorized. No application checks have been run merely to save this plan.

## Documentation and handoff

Update ARCHITECTURE.md with the provider registry and actual ownership boundary when implemented. Update docs/agents/ask.md if its action procedures change. Preserve current route and presentation descriptions until those modules ship. Record consequential retry/reconciliation rationale in an ADR if it cannot be inferred from the implementation.

At completion, hand off the nine typed contracts, deterministic fixtures, safe action results and validation evidence to openui-experiences. The provider module's completion does not establish native/MCP parity or host compatibility.

Before activating another module, preserve this completed plan and its completed task checklist alongside its spec under module-specific names, then update the capability map. Never replace an active incomplete plan for different work. The next module repeats Specify → Plan → Tasks → Implement; it does not inherit approval from this plan.

## Review gate

Review this public-capabilities plan before producing its detailed `tasks/todo.md`. The other four modules remain awaiting their own specification review and planning cycle. No cross-module task list or implementation is created by this correction.
