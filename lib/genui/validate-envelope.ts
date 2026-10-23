import { compileCompositionEnvelope } from "./contract/compiler";
import type { CompileErrorCode } from "./contract/errors";
import type { CompositionEnvelope } from "./envelope";

export type EnvelopeValidationReason = CompileErrorCode;

export const validateCompositionEnvelope = ({
  envelope,
}: {
  envelope: CompositionEnvelope;
}) => {
  const result = compileCompositionEnvelope({ envelope });
  if (!result.ok) {
    return { ok: false as const, reason: result.code };
  }
  return { ok: true as const, compiled: result };
};
