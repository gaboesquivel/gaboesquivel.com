# `/ask` generative UI design

Surface detail split from [DESIGN.md](../../../../../../DESIGN.md), which holds the identity, tokens, and rules for every page and wins on conflict. Read this file when changing this surface.

## `/ask` generative UI

`/ask` redirects to `/`. The notes below describe connect cards in `app/connect/`, which are not the homepage GenUI result. Homepage generation uses the shared OpenUI experiences.

Conversation carries intent; interactive cards carry data entry and confirmation. The model calls `list_slots`, `book`, and `send`; React owns layout, validation, and local UI state without extra chat turns for ordinary picker navigation.

**Principles**

- One card surface per workflow step: shadcn `Card`, hairline border, `rounded-lg`, `p-4`, `max-w-md`, `gap-3`, mono type, turquoise focus rings — see `ConnectCard` in `app/connect/connect-gen-ui.tsx`.
- Progressive disclosure: booking shows duration, visitor time zone, and the next few starts before an in-place expand for week navigation and a responsive time grid (`app/connect/slot-picker.tsx`, logic in `lib/connect/slot-display.ts`).
- Stateful flows: availability → details → approval → receipt. Contact fields persist when the visitor changes time. The discussion field is never prefilled from chat history.
- Shared fields and actions: `connect-fields.tsx`, `ConnectPrimaryButton` / `ConnectSecondaryButton`, `DurationToggle` chips with `aria-pressed` and accent border when selected.
- Approval: `ConnectApprovalForm` edits name, email, and topic once more; primary label names the action (`Book …`, `Send email`).
- Receipts: compact `BookReceipt` and `NoteReceipt` cards with shimmer while pending, neutral or red status text when settled, definition lists for summary fields. After a slot is chosen, the picker collapses to a read-only summary (`picker-lock.ts`); approval and receipt cards disable repeat submission.
- Responsive: generative cards stay `max-w-md` in the chat column; expanded time grids use two columns on narrow viewports and three from `sm` up. Verify with `agent-browser set viewport <w> <h>`.
- Motion: existing `enter` on card mount only; no decorative animation. Loading uses `Shimmer` on status lines.
- Time zones: IANA identifiers in a native `select`; slots rebucket client-side when the display zone changes. Business hours stay America/Denver server-side.
- Accessibility: grouped times with `role="group"` and `aria-label`, keyboard-focusable chips and buttons, `tabular-nums` on times, reduced motion via existing `motion-safe` / `motion-reduce` on press styles. After the visitor leaves the empty state, `/ask` keeps a screen-reader-only `h1` (`connect-chat.tsx`) so the page still has a level-one heading.
