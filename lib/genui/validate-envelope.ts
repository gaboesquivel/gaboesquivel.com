import type { CompositionEnvelope } from "./envelope";

const MAX_DOCUMENT_BYTES = 64 * 1024;

export const validateCompositionEnvelope = ({
  envelope,
}: {
  envelope: CompositionEnvelope;
}) => {
  const bytes = new TextEncoder().encode(envelope.openuiText).length;
  if (bytes > MAX_DOCUMENT_BYTES) {
    return { ok: false as const, reason: "oversized" as const };
  }
  if (!envelope.openuiText.trim().startsWith("root = ")) {
    return { ok: false as const, reason: "parse" as const };
  }
  return { ok: true as const };
};
