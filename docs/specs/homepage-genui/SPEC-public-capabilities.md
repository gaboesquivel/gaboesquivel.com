# Spec: Public capabilities

Module: `public-capabilities`. Status: **implemented on `develop`** — registry and executors in `lib/capabilities/`; contract tests in `lib/capabilities/capabilities.test.ts`; adapters at `/api/capabilities` and public MCP. Historical plan: [PLAN-public-capabilities.md](PLAN-public-capabilities.md). Active planning index: [tasks/plan.md](../../../tasks/plan.md). Depends on: none. Index: [capability map](CAPABILITIES-homepage-genui.md).

## Objective

Give native UI and external agents the same typed public reads and writes, backed by ordinary server functions. Preserve source authority, action limits and validation without requiring an Eve run. No login is required for the public portfolio capabilities.

## Tech stack and project structure

Reuse TypeScript, Zod, the `gaboesquivel` package, generated content, Resend, Google Calendar and Upstash. Existing owners are `lib/connect/`, `lib/api/`, `lib/cv-paths.ts`, `generated/agent-index.json`, and `generated/markdown-routes.json`. Proposed `lib/capabilities/registry.ts` owns metadata, schemas and execution bindings; domain implementations can remain in existing files. New tests live beside the owning modules. No OpenUI, React, MCP, or model dependency belongs in this provider layer.

## Provider contract

Each registry entry has a stable name, description, input/output schemas, read/write classification, and an executor with server-owned dependencies and request context. Adapters cannot supply an unchecked `enforce: false`, rate-limit identity, arbitrary recipient, or credential. Browser origin checks and request bounds belong in the native transport; external calls must retain equivalent domain checks.

| Operation | Input contract | Output contract |
| --- | --- | --- |
| get_profile | Optional supported focus | Verified profile/context records and source URLs |
| search_site | Nonempty query; bounded limit/cursor | Ranked source records, excerpts, canonical URLs, next cursor or null |
| list_projects | Optional supported domain; bounded limit/cursor | Package-owned project records and canonical links |
| list_writing | Optional supported domain; bounded limit/cursor | Published post records and canonical links |
| get_cv | `full`, `ai`, `web3`, or `fullstack`; default `full` | Existing CV title, filename, variant, page URL, PDF URL |
| contact_gabo | Optional supported focus | Public contact/form descriptor and verified contextual records; no email sent |
| list_availability | IANA time zone; optional 15/30-minute duration | Available ISO starts, duration, display zone, checked-at time, empty/error state |
| book_call | Existing `bookSchema` input plus retry identity | Confirmed/pending/uncertain/failed result and safe receipt |
| send_note | Existing `noteSchema` input plus retry identity | Confirmed/pending/uncertain/failed result and safe receipt |

Proposed common response: version, request ID, operation, status, typed data, safe message and optional retry guidance. Read success distinguishes no matches from failure. Write success is returned only after confirmed provider success or a stored confirmed receipt. Do not expose raw provider exceptions, addresses of other visitors, calendar event bodies or busy-event descriptions.

Search is deterministic over the public corpus; no hidden semantic model call. Public text scope follows corpus policy, including the pre-2020 exclusion from the full agent corpus. Page cursors and limits are validated; proposed default page size 6, maximum 20. The taxonomy comes from existing source data; unknown filters return a validation error rather than silently broadening results.

## Action behavior

- Keep current 15/30-minute durations, Denver business hours, availability recheck, two-bookings-per-Denver-day cap, note caps of five per email and IP per Denver day, and server-fixed note recipient. Validate offered-window/future-slot rules at write time, including direct MCP calls. Listing a slot is not a reservation.
- Native booking: select a slot → enter details → review final details → confirm. The capability executes only after the explicit confirmation event. Editing booking details invalidates the reviewed state. Native notes submit directly from the completed form, preserving the existing no-second-approval behavior.
- External model callers use the declared write tools under their host's interaction model; do not impose a fake browser confirmation boolean. Schema checks, abuse controls and limits always remain server-side. Rendering a document never grants write authority.
- A retry identity binds operation and normalized payload. Same key plus different payload is rejected. Duplicate in-flight requests return pending; completed duplicates return the original confirmed result. Timeouts after a possible provider success return uncertain, with no blind second send/insert.
- Plan a provider-supported deduplication/reconciliation mechanism before claiming duplicate prevention. Redis and external providers do not share a transaction. Missing required production cap storage fails closed for writes; reads remain available where their own provider permits.
- Ordinary UI actions call these capabilities without inference. Data fields are never extracted from earlier search prompts as implicit form consent.

## Code style

Reuse schema-derived types and explicit dependencies. Existing source example from `lib/connect/schema.ts`:

```ts
export const noteSchema = z.object({
  description,
  email,
  name,
});
```

Retain the existing `safeParse` boundary in `bookCall`/`sendNote`; do not trust an adapter merely because it is typed.

## Commands

```bash
bun test lib/connect/note.test.ts lib/connect/caps.test.ts lib/connect/store.test.ts lib/connect/calendar-auth.test.ts lib/connect/calendar-errors.test.ts
bun run test:llms
bun run verify
bun run build
```

After the proposed directory exists, run `bun test lib/capabilities`. These are implementation verification commands, not checks claimed as run for this draft.

## Testing strategy and success criteria

Use Bun unit/contract tests with injected clock, store, mailer and calendar. Adapter parity tests must run identical payloads through both transports once they exist.

| ID | Observable acceptance |
| --- | --- |
| PC-01 | All nine operations validate inputs and produce schema-valid results without model calls. |
| PC-02 | Project/CV facts and URLs match their owning sources; empty search results do not invent evidence. |
| PC-03 | Invalid input, unavailable storage, exceeded caps and unavailable slots cause no provider write. |
| PC-04 | Double submit and retry after success create at most one provider write in the tested scenario; pending is never labeled confirmed. |
| PC-05 | Simulated provider success followed by timeout/store failure produces a recoverable uncertain result, not an unconditional retry or false success. |
| PC-06 | Booking time-zone, duration, business-hour, horizon and future-start rules apply equally through native and MCP adapters. |
| PC-07 | Capability outputs disclose no credentials, private calendar content or unrelated visitor data. |

## Boundaries

- Always: validate at the server, preserve cap enforcement, inject dependencies for meaningful tests, retain source authority.
- Ask first: change booking durations, daily caps, recipient, business hours, or existing action confirmation policy beyond the reviewed proposal.
- Never: use a model for a normal capability call, disable production controls to make a demo work, or claim exactly-once cross-provider delivery.

## Open questions

Native review-and-confirm was approved in conversation. The module plan defines the recovery approach and initial retention baseline; provider-specific support and expiry handling must be verified before implementing retries. Current helpers alone are insufficient. A specific live test booking/mail destination must be authorized before external-write acceptance tests.
