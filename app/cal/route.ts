import { recordContactAction, requestCountry } from "lib/measurement/record";

const CALENDLY_URL = "https://calendly.com/gaboesquivel/30min";

// A route, not a next.config redirect, so the click is counted (docs/specs/005).
export function GET(request: Request) {
  recordContactAction({
    channel: "site",
    country: requestCountry(request.headers),
    event: "cal_click",
    userAgent: request.headers.get("user-agent"),
  });
  return new Response(null, {
    headers: { "Cache-Control": "no-store", Location: CALENDLY_URL },
    status: 307,
  });
}
