import type { EvalCase } from "../datasets/curated-cases";

export type RoutingGrade = "PASS" | "FAIL" | "NOT_EVALUATED";

export const gradeRouting = ({
  case: evalCase,
  observedTier,
}: {
  case: EvalCase;
  observedTier: 0 | 1 | 2 | null;
}): RoutingGrade => {
  const expectedTier = evalCase.expected.tier;
  if (expectedTier !== undefined) {
    return observedTier === expectedTier ? "PASS" : "FAIL";
  }
  const allowed = evalCase.expected.allowedTiers;
  if (!allowed || observedTier === null) return "NOT_EVALUATED";
  return allowed.includes(observedTier) ? "PASS" : "FAIL";
};
