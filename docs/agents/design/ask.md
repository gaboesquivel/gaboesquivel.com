# GenUI booking and contact forms design

Surface detail split from [DESIGN.md](../../../DESIGN.md), which holds the identity, tokens, and rules for every page and wins on conflict. Read this file when changing this surface.

## Where these forms live

`/ask` redirects to `/`. There is no chat transcript and no separate connect surface. Booking and contact are generated experiences: homepage search (`/`) and the search dialog on every other route render them inside the same result tree as answers and project views. `GenuiSessionProvider` (`components/genui/genui-session.tsx`) wraps both surfaces, so drafts, retry identities, and receipts are shared and survive a later answer replacing the form.

The planner chooses the experience; React owns layout, validation, and local state. Reads and writes go through `/api/capabilities` (`list_availability`, `book_call`, `send_note`) via `callCapability`. A generated payload is never authorization to write; the visitor's submit is.

| Piece | Source |
| --- | --- |
| Booking flow | `GenuiBookingFlow` in `components/genui/genui-booking-flow.tsx` |
| Contact note | `GenuiContactForm` in `components/genui/genui-contact-form.tsx` |
| Inline error, receipt card, field and button classes | `components/genui/genui-write-status.tsx` |
| Drafts, retry identities, receipts | `GenuiDraftProvider` in `components/genui/genui-draft-context.tsx` |
| Session wrapper, write gate, receipt line | `GenuiSessionProvider`, `genuiWritesEnabled`, `GenuiReceipt` in `components/genui/genui-session.tsx` |
| Rail layout and context copy | `WriteRail`, `ContactExperienceView`, `BookingExperienceView` in `components/genui/genui-experience-views.tsx` |
| Transport, retry identity, slot grouping, copy | `lib/genui/write-flow.ts`; slot labels from `lib/connect/slot-display.ts` |

## Layout

- Rail: a `@container` with context on the left and the form on the right from a 48rem container width; below that the context stacks above the form, so the approval line stays visible at every width.
- The context column is `text-sm text-neutral-400`. Contact shows what the form does and a `mailto:` fallback; booking says the call is not created until the visitor confirms.
- Fields: native `input`, `textarea`, and `select` with `inputClass` (`rounded-md`, `border-hairline`, `bg-black`). Labels wrap their fields. Primary action uses `primaryButtonClass` (`rounded-md`, `bg-accent`, black text). No cards inside the form; the receipt is the only bordered surface (`rounded-lg`, `border-hairline`, `p-4`).

## Flows

- Booking: duration (15 or 30 minutes) → start time → name, email, agenda → "Reviewed details" checkbox → "Confirm booking". Times load after a duration is chosen ("Checking open times…"), are grouped by the visitor's day in native `optgroup`s, show the first three days, and reveal the rest behind "More times". The zone line ("Times in … (…)") renders after hydration and describes the time select. Changing the start, name, or email clears "Reviewed details". Business hours stay America/Denver server-side.
- Availability states: loading line with `role="status"`, an empty line that points to the note form, and an inline error with "Try again".
- Contact: name, email, "What should we discuss?" → "Send email". The discussion field is never prefilled from the search query.
- Writes unlock only after a settled, error-free result (`genuiWritesEnabled`); until then, and while a write is pending, fields are disabled and the form carries `aria-busy`.

## Errors, retries, and receipts

- `WriteError` shows one message with `role="alert"` and a "Try again" button. Network and server failures keep the visitor's details (`WRITE_ERROR_COPY`); server messages (for example a rate limit) show as returned.
- Each draft carries one retry identity. Retrying the same payload reuses it, so the server replays instead of writing twice; a changed payload starts a new identity.
- An accepted write replaces the form in place with `WriteReceiptCard` (`role="status"`, focused once when it settles), so it cannot be submitted again. Clearing the homepage search clears unsent drafts but keeps receipts. `GenuiReceipt` keeps a one-line summary under the prompt after a later answer replaces the result tree.

## Motion and accessibility

- No decorative motion on these forms. Pending states are text ("Booking…", "Sending…"), not spinners.
- Errors announce through `role="alert"`; availability and receipts through `role="status"`. The receipt takes focus once; a later result that remounts it leaves focus in the search field.
- Retry buttons use the accent focus ring (`focus-visible:ring-2 focus-visible:ring-accent`).
