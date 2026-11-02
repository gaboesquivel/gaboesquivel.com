# Connect / Eve chat surface status (2026-10-27)

**Explore only** — no route change in this note.

## Current routing

- `/ask` redirects to `/` ([`app/ask/page.tsx`](../../app/ask/page.tsx)).
- Nav chat sheet links to homepage GenUI search (`chat-sidebar.tsx`, since removed).
- **`ConnectChat`** (`app/connect/connect-chat.tsx`) is only referenced from `connect-page-content.tsx`, which is **not imported** by any `app/**/page.tsx`.

## Still used

- Eve **tools** (`agent/tools/connect.ts`) and **UI parts** in `eve-thread.tsx` (slot picker, note form, approvals) when an Eve thread is mounted.
- `lib/connect/*` shared with capabilities, GenUI evals, and MCP.

## Product choice (unresolved)

| Option | Tradeoff |
| --- | --- |
| Remove dead `connect-page-content` + document Eve-only on a future `/chat` route | Less confusion; smaller bundle if nothing imports Eve shell |
| Restore dedicated connect route (not `/ask`) for full Eve transcript | Differs from homepage GenUI “no transcript” model |
| Keep code for MCP/Eve channel reuse only | Document as internal; no public page |

No implementation authorized from this note.
