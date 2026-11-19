import { recordContactAction, requestCountry } from "lib/measurement/record";

const CALENDLY_URL = "https://calendly.com/gaboesquivel/30min";

// Crawlers and link unfurlers (Slackbot, Discordbot, TelegramBot, Googlebot…); not in-app browsers.
const BOT_PATTERN =
  /(?<!cu)bot\b|crawl|spider|slurp|preview|monitor|curl|wget|python|headless|facebookexternalhit|embedly/i;

// Prefetches, router fetches, and link unfurlers are not clicks.
const isHumanClick = (request: Request) => {
  const { headers } = request;
  if (
    headers.has("rsc") ||
    headers.has("next-router-prefetch") ||
    headers.has("next-router-segment-prefetch") ||
    headers.get("sec-purpose")?.includes("prefetch") ||
    headers.get("purpose") === "prefetch"
  ) {
    return false;
  }
  const userAgent = headers.get("user-agent") ?? "";
  return userAgent.length > 0 && !BOT_PATTERN.test(userAgent);
};

const redirectToCalendly = () =>
  new Response(null, {
    headers: { "Cache-Control": "no-store", Location: CALENDLY_URL },
    status: 307,
  });

// A route, not a next.config redirect, so the click is counted (docs/specs/005).
export function GET(request: Request) {
  if (isHumanClick(request)) {
    recordContactAction({
      channel: "site",
      country: requestCountry(request.headers),
      event: "cal_click",
      userAgent: request.headers.get("user-agent"),
    });
  }
  return redirectToCalendly();
}

export function HEAD() {
  return redirectToCalendly();
}
