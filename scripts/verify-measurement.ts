// Checks for contact measurement (docs/specs/005).
//   bun scripts/verify-measurement.ts              pure checks only
//   BASE_URL=https://gaboesquivel.localhost ANALYTICS_PASSWORD=... bun scripts/verify-measurement.ts
// The HTTP checks need a running dev server with the same ANALYTICS_PASSWORD.
import { createHmac } from "node:crypto";

import { verifyCalendlySignature } from "../lib/measurement/calendly-signature";
import {
  UNKNOWN_COUNTRY,
  contactCounterField,
  marketOf,
  monthKey,
  normalizeCountry,
  parseContactHash,
} from "../lib/measurement/contact";
import { previousMonth, summarizeMonth } from "../lib/measurement/dashboard";
import { ownerAccess } from "../lib/measurement/owner-auth";

let failures = 0;
const check = (name: string, ok: boolean, detail?: unknown) => {
  if (ok) {
    console.log(`ok   ${name}`);
  } else {
    failures += 1;
    console.error(`FAIL ${name}`, detail ?? "");
  }
};

// Counter keys and markets.
check(
  "counter field",
  contactCounterField({
    channel: "site",
    country: "US",
    event: "contact_sent",
  }) === "contact_sent:site:US"
);
check("UTC month", monthKey(new Date("2026-12-01T00:30:00Z")) === "2026-12");
check(
  "previous month across a year",
  previousMonth(new Date("2027-01-15T12:00:00Z")) === "2026-12"
);
check("MX is latam", marketOf("MX") === "latam");
check("US is us", marketOf("US") === "us");
check("DE is rest", marketOf("DE") === "rest");
check("missing country", normalizeCountry(null) === UNKNOWN_COUNTRY);
check("bad country", normalizeCountry("<script>") === UNKNOWN_COUNTRY);

const summary = summarizeMonth(
  "2026-11",
  parseContactHash({
    "booking:calendly:XX": "1",
    "cal_click:site:BR": 3,
    "contact_sent:site:US": "2",
    "junk:field": "9",
    "note_sent:mcp:MX": "1",
  })
);
check("summary total ignores junk", summary.total === 7, summary);
check("summary US", summary.totalByMarket.us === 2, summary.totalByMarket);
check(
  "summary latam",
  summary.totalByMarket.latam === 4,
  summary.totalByMarket
);
check("summary rest", summary.totalByMarket.rest === 1, summary.totalByMarket);

// Calendly signatures.
const key = "test-signing-key";
const body = JSON.stringify({
  event: "invitee.created",
  payload: { uri: "https://api.calendly.com/scheduled_events/E/invitees/I" },
});
const now = 1_790_000_000_000;
const t = String(now / 1000);
const sign = (signedBody: string) =>
  `t=${t},v1=${createHmac("sha256", key).update(`${t}.${signedBody}`).digest("hex")}`;
check(
  "signature valid",
  verifyCalendlySignature({ body, header: sign(body), now, signingKey: key })
);
check(
  "signature over another body",
  !verifyCalendlySignature({
    body,
    header: sign(`${body} `),
    now,
    signingKey: key,
  })
);
check(
  "signature too old",
  !verifyCalendlySignature({
    body,
    header: sign(body),
    now: now + 10 * 60 * 1000,
    signingKey: key,
  })
);
check(
  "signature missing",
  !verifyCalendlySignature({ body, header: null, now, signingKey: key })
);

// Owner auth.
const basic = (password: string) =>
  `Basic ${Buffer.from(`gabo:${password}`).toString("base64")}`;
const savedPassword = process.env.ANALYTICS_PASSWORD;
process.env.ANALYTICS_PASSWORD = "";
check("auth disabled without password", ownerAccess(basic("x")) === "disabled");
process.env.ANALYTICS_PASSWORD = "correct horse";
check("auth granted", ownerAccess(basic("correct horse")) === "granted");
check("auth wrong password", ownerAccess(basic("wrong")) === "denied");
check("auth missing header", ownerAccess(null) === "denied");
process.env.ANALYTICS_PASSWORD = savedPassword;

// HTTP checks against a running server.
const base = process.env.BASE_URL?.replace(/\/$/, "");
if (base) {
  const password = process.env.ANALYTICS_PASSWORD;
  const noAuth = await fetch(`${base}/analytics`, { redirect: "manual" });
  check(
    "/analytics without credentials",
    password ? noAuth.status === 401 : noAuth.status === 404,
    noAuth.status
  );
  if (password) {
    const withAuth = await fetch(`${base}/analytics`, {
      headers: { Authorization: basic(password) },
    });
    check("/analytics with password", withAuth.status === 200, withAuth.status);
    const wrong = await fetch(`${base}/analytics`, {
      headers: { Authorization: basic(`${password}x`) },
    });
    check("/analytics wrong password", wrong.status === 401, wrong.status);
  }
  const cal = await fetch(`${base}/cal`, { redirect: "manual" });
  check(
    "/cal redirects to Calendly",
    cal.status === 307 &&
      cal.headers.get("location") === "https://calendly.com/gaboesquivel/30min",
    { location: cal.headers.get("location"), status: cal.status }
  );
  const webhook = await fetch(`${base}/api/webhooks/calendly`, {
    body,
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  check(
    "webhook rejects unsigned",
    webhook.status === 401 || webhook.status === 404,
    webhook.status
  );
} else {
  console.log("skip HTTP checks (set BASE_URL)");
}

if (failures > 0) {
  console.error(`${failures} check(s) failed`);
  process.exit(1);
}
console.log("all measurement checks passed");
