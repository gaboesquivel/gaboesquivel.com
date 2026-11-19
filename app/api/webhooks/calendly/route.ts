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
  const parsed = JSON.parse(body) as {
    event?: string;
    payload?: { uri?: unknown };
  };
  const inviteeUri = parsed.payload?.uri;
  if (parsed.event === "invitee.created" && typeof inviteeUri === "string") {
    recordContactAction({
      channel: "calendly",
      dedupeId: inviteeUri,
      event: "booking",
    });
  }
  return new Response(null, { status: 204 });
}
