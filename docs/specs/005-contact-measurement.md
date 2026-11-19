# 005: Contact measurement and owner dashboard

Status: accepted (2026-11-19)

Implements the Measurement section of [PRODUCT.md](../../PRODUCT.md): primary metric, supporting signals, and the `/analytics` dashboard. Quality guardrails are [006](006-quality-guardrails.md). Tool choice: [0009](../decisions/0009-free-analytics-stack.md).

## Problem Statement

Gabo cannot tell whether the site brings in work. Contact form sends arrive as email, `/cal` is a `next.config` redirect that runs no code, Calendly bookings live only in Calendly, and capability receipts in Redis expire. Vercel Analytics on Hobby counts pageviews only. There is no count of contact actions, no split by market (US, Latin America, rest), and no view of where visitors stop before `/contact`.

## Solution

Every contact action is recorded server-side, once, as an Umami event and as a Redis counter keyed by month, event, channel, and country. Clarity adds recordings and heatmaps. A private `/analytics` page shows this month and last month by event and market, plus links to Umami, Clarity, Vercel, and Calendly. All on free tiers.

## User Stories

1. As Gabo, I open `/analytics`, enter the password, and see contact actions this month and last month, by event, with US and Latin America apart from the rest.
2. As Gabo, I follow a link from `/analytics` to Umami or Clarity to see which pages visitors leave before `/contact`.
3. As a founder, I send the contact form; the send is counted once, and a failed send is not counted.
4. As a founder, I click "book a call"; `/cal` counts the click and redirects to Calendly with no visible delay. If counting fails, the redirect still happens.
5. As an agent using MCP, I call `send_note`; it is counted with channel `mcp`. A retry that replays a confirmed receipt is not counted again.
6. As a visitor in the EEA, UK, or Switzerland, Clarity runs in cookieless mode unless I opt in.
7. As anyone without the password, `/analytics` gives me 401 and is not indexed or listed anywhere.

## Implementation Decisions

**Events.** One module (for example `lib/measurement/`) exposes `recordContactAction({ event, channel, country })`:

```ts
type ContactEvent =
  "contact_sent" | "cal_click" | "booking" | "note_sent" | "call_booked";
type Channel = "site" | "mcp" | "calendly";
```

It sends an Umami event with `POST https://gateway.umami.is/api/send` (website ID from env, real User-Agent) and runs `HINCRBY measure:contact:<YYYY-MM> <event>:<channel>:<country> 1` on the Upstash client already used by `lib/connect/store.ts`. Months are UTC. Country comes from `x-vercel-ip-country`, or `XX` when it is missing. Recording runs after the response with `after()` (check the bundled Next docs), never throws, and never blocks or changes the user-facing result. A Redis or Umami failure is logged and dropped. Redis decides duplicates (`SET NX` on the provider id), and Umami hears only first-time counts. Outside production, keys carry a `dev:` prefix and nothing goes to Umami, because local and preview runs share the production Upstash database.

**Call sites.**

- `app/contact/actions.ts`: `contact_sent`/`site`, only after Resend returns no error.
- `/cal`: replace the `next.config.js` redirect with a route handler that records `cal_click`/`site` and returns a 307 to the same Calendly URL.
- `runCapability` in `lib/capabilities/registry.ts`: `note_sent` or `call_booked` when the outcome is `confirmed` and was not a replay. Channel is `mcp` from `/mcp` and `site` from `/api/capabilities` (the homepage GenUI flow). `book_call` writes to Google Calendar, not Calendly, so it never double-counts with `booking`.
- Calendly webhook route (for example `app/api/webhooks/calendly/route.ts`): verifies the `Calendly-Webhook-Signature` header against `CALENDLY_WEBHOOK_SIGNING_KEY` and records `booking`/`calendly` on `invitee.created`. Country is `XX`, since the request comes from Calendly. Duplicate deliveries are deduplicated by invitee URI with `SET NX` and a TTL.

**Clarity.** Loaded lazily through the existing `components/layout/deferred-analytics.tsx`. The site sends no consent signal: Clarity's default Consent Mode already limits collection and sets no cookies for EEA, UK, and CH visitors until they consent, and other regions need no signal. The Clarity project ID comes from env, and nothing loads when it is unset or on `/analytics`. The CSP allows `*.clarity.ms` and `c.bing.com`. `/privacy` names Umami, Clarity, and Vercel Analytics, what they collect, and the EEA behaviour.

**Umami client script.** It loads with `next/script` from `cloud.umami.is`, not through a same-origin proxy: Umami does not document whether a Next.js rewrite keeps visitor geolocation, and the US and Latin America split matters more than the visits ad blockers hide. Client-side Umami covers pageviews, engagement, funnels, and scroll depth (25/50/75/100 events, at most one of each per pageview). Server-side events are the source of truth for the metric.

**`/analytics`.** A server component, dynamic and uncached.

- **Auth:** Basic Auth in `proxy.ts` against `ANALYTICS_PASSWORD`, compared in constant time. When the variable is unset the route returns 404 (fails closed).
- **Hidden:** `noindex, nofollow`. It is excluded from the sitemap, site search, `/explore`, the llms corpus, and Markdown negotiation (`skipMarkdownNegotiation`).
- **Contents:**
  - this month and last month from the Redis hash, totals by event, and a US / Latin America / rest split (the Latin America country list lives in one constant)
  - the latest Lighthouse row and the is-agentic.com score when [006](006-quality-guardrails.md) has produced them; otherwise "not yet measured"
  - links to the Umami, Clarity, Vercel Analytics, Speed Insights, and Calendly dashboards

**Exposure.** It runs on the production deployment.

- `/cal` and the Calendly webhook are public. The webhook rejects requests without a valid signature, and returns 404 when the signing key is unset.
- `/analytics` is owner-only and fails closed without its password.
- Recording writes only counters, never personal data: no names, emails, IPs, or message text.

**Environment (new):** `UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`, `CALENDLY_WEBHOOK_SIGNING_KEY`, `ANALYTICS_PASSWORD`. Upstash reuses the existing variables. Local `.env.local` and Vercel both get them. The Calendly webhook subscription is created once with the Calendly API (a free-plan personal token).

## Testing Decisions

The repository runs no unit tests (d73171cf), so checks follow its `scripts/verify-*` convention.

**Behaviour and checks:**

- A pure `contactCounterField({ event, channel, country })` gives `contact_sent:site:US`. `monthKey(new Date("2026-12-01T00:30:00Z"))` gives `2026-12`. A `marketOf("MX")` call gives `latam`, `marketOf("US")` gives `us`, and `marketOf("DE")` gives `rest`.
- **Invariants:**
  - A failed Resend send, a failed or replayed capability, and an unsigned or duplicate webhook each add 0.
  - Recording failure never changes the user-facing response.
  - `/analytics` never returns 200 without the password.
- **Check:** `bun scripts/verify-measurement.ts` (new) runs the pure functions and, against a local dev server, checks that `/analytics` gives 401 without credentials and 200 with them, that `/cal` gives a 307 to Calendly, and that the webhook gives 401 for an unsigned POST.

**Acceptance scenario.** Gabo has the local dev server running, with Upstash configured and the Redis hash for the current month empty.

1. A visitor sends the contact form ("Ana, ana@example.com, 'Agent for our claims flow'"). Mail is delivered, and `contact_sent:site:XX` (local has no country header) becomes 1.
2. The visitor sends again with Resend forced to fail (an invalid key in a scratch env). The UI shows the error, and the counter stays at 1.
3. The visitor opens `/cal`. The response is a 307 to the Calendly URL, and `cal_click:site:XX` becomes 1.
4. An agent calls `send_note` on `/mcp` with a retry identity. `note_sent:mcp:XX` becomes 1. The same call repeated replays the receipt, and the counter stays at 1.
5. A signed `invitee.created` payload POSTed to the webhook makes `booking:calendly:XX` 1. The same payload again leaves it at 1. An unsigned payload gives 401.
6. `/analytics` without credentials gives 401. With the password it shows this month's 4 actions, by event, under "rest", and last month as 0.
7. In production, Umami's dashboard shows the same four event names, and Clarity records a session.

Metric definition: [PRODUCT.md](../../PRODUCT.md), Measurement, Primary metric.

## Appetite

About two focused days of agent work. The first verifiable slice is the recording module with the contact form and `/cal` (steps 1–3). If time runs short, defer the Calendly webhook and scroll-depth events, not the dashboard's auth. Not measured.

## Out of Scope

- Lighthouse, PageSpeed, CrUX, and is-agentic.com collection ([006](006-quality-guardrails.md)).
- Pulling Umami, Clarity, or Vercel data into `/analytics`. It links to them instead.
- A `/contact/sent` page.
- A consent banner. The EEA cookieless default covers it, and a banner may be revisited if legal advice says otherwise.
- Paid tiers and Google Analytics 4 (PRODUCT.md non-goals).

## Further Notes

- Homepage GenUI notes and bookings count alongside MCP ones, attributed by channel (confirmed 2026-11-19; PRODUCT.md updated on this branch).
- Verified 2026-11-19: Calendly webhooks (`invitee.created`) are on all plans including Free; the signature is `t=<unix>,v1=<hex>` over `${t}.${rawBody}`; Umami Cloud's send endpoint is `gateway.umami.is/api/send`.
- **Gabo's setup steps:** Umami and Clarity accounts, the Calendly token, and choosing the password.
- `/cal` counts only human clicks: prefetch and router requests, HEAD, and bot user agents redirect without counting, and site links to `/cal` are plain anchors so `<Link>` never prefetches it. Browsers that cached the old permanent `/cal` redirect go straight to Calendly, so early `cal_click` counts run low.
- Umami geolocates server-side events by Vercel's IP, so its country view of contact events is wrong; the country is in each event's data, and the Redis counters (the dashboard's source) are right.
- Calendly reschedules (`payload.old_invitee` set) are not counted as new bookings.
