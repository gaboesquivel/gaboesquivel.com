import { compileCompositionEnvelope } from "lib/genui/contract/compiler";
import type { CompositionEnvelope } from "lib/genui/envelope";

export type CompositionGrade = "PASS" | "FAIL" | "ERROR";

export const gradeComposition = ({
  envelope,
}: {
  envelope: CompositionEnvelope | null;
}): CompositionGrade => {
  if (!envelope) return "ERROR";
  const result = compileCompositionEnvelope({ envelope });
  return result.ok ? "PASS" : "FAIL";
};
