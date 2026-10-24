import { describe, expect, test } from "bun:test";

import { buildRequestPlan, retrievePlanEvidence } from "./request-plan";

describe("request planning", () => {
  for (const query of [
    "Compare LegalAgent and Wink, explain your contribution, and include your CV",
    "How many projects have you built?",
    "What are you most proud of?",
    "Describe a problem you solved in production",
    "What process do you follow to develop applications using agents?",
    "Show only mobile projects excluding Wink",
  ]) {
    test(`preserves synthesis requirements: ${query}`, () => {
      const plan = buildRequestPlan(query);
      expect(plan.query).toBe(query);
      expect(plan.requiresSynthesis).toBe(true);
    });
  }
  test("named projects and CV survive retrieval for compound questions", () => {
    const plan = buildRequestPlan(
      "Compare LegalAgent and Wink, explain your contribution, and include your CV"
    );
    const ids = retrievePlanEvidence(plan).map((record) => record.id);
    expect(ids).toContain("/project/legal-agent");
    expect(ids).toContain("/project/wink");
    expect(ids).toContain("/cv");
  });
  test("simple browsing keeps the deterministic path", () => {
    expect(
      buildRequestPlan("show me your web3 projects").requiresSynthesis
    ).toBe(false);
  });
});
