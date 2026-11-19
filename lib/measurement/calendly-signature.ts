import { createHmac, timingSafeEqual } from "node:crypto";

const TOLERANCE_SECONDS = 3 * 60;

/**
 * Verifies `Calendly-Webhook-Signature: t=<unix>,v1=<hex>`, an HMAC-SHA256 of
 * `${t}.${rawBody}` with the subscription's signing key.
 */
export const verifyCalendlySignature = ({
  body,
  header,
  now = Date.now(),
  signingKey,
}: {
  body: string;
  header: string | null;
  now?: number;
  signingKey: string;
}) => {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((part) => {
      const [key, ...rest] = part.trim().split("=");
      return [key, rest.join("=")];
    })
  );
  const timestamp = Number(parts.t);
  const signature = parts.v1;
  if (!Number.isFinite(timestamp) || !signature) return false;
  if (Math.abs(now / 1000 - timestamp) > TOLERANCE_SECONDS) return false;
  const expected = createHmac("sha256", signingKey)
    .update(`${parts.t}.${body}`)
    .digest("hex");
  const given = Buffer.from(signature, "hex");
  const wanted = Buffer.from(expected, "hex");
  return given.length === wanted.length && timingSafeEqual(given, wanted);
};
