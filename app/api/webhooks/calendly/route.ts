import { verifyCalendlySignature } from "lib/measurement/calendly-signature";
import { recordContactAction } from "lib/measurement/record";

export const runtime = "nodejs";

// Counts Calendly bookings (docs/specs/005). Fails closed without a signing key.
export async function POST(request: Request) {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY?.trim();
  if (!signingKey) {
    return new Response("Not found", { status: 404 });
  }
  const body = await request.text();
  const valid = verifyCalendlySignature({
    body,
    header: request.headers.get("calendly-webhook-signature"),
    signingKey,
  });
  if (!valid) {
    return new Response("Invalid signature", { status: 401 });
  }
  let parsed: {
    event?: string;
    payload?: { old_invitee?: unknown; uri?: unknown };
  } | null;
  try {
    parsed = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (!parsed || typeof parsed !== "object") {
    return new Response("Invalid payload", { status: 400 });
  }
  const inviteeUri = parsed.payload?.uri;
  // A reschedule creates a new invitee that points at the old one; it is not a new booking.
  const rescheduled = Boolean(parsed.payload?.old_invitee);
  if (
    parsed.event === "invitee.created" &&
    typeof inviteeUri === "string" &&
    !rescheduled
  ) {
    recordContactAction({
      channel: "calendly",
      dedupeId: inviteeUri,
      event: "booking",
    });
  }
  return new Response(null, { status: 204 });
}
