import { compileCompositionEnvelope } from "./contract/compiler";
import type { CompositionEnvelope } from "./envelope";
import { sourceUnits } from "./query/source-text";

/**
 * Server-side acceptance gate. It also re-reads the published text behind every
 * quoted excerpt; the browser compiles without that read.
 */
export const validateCompositionEnvelope = ({
  envelope,
}: {
  envelope: CompositionEnvelope;
}) => {
  const result = compileCompositionEnvelope({ envelope, sourceUnits });
  if (!result.ok) {
    return { ok: false as const, reason: result.code };
  }
  return { ok: true as const, compiled: result };
};
