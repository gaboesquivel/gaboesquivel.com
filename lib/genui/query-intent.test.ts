import { describe, expect, test } from "bun:test";

import { composeIntentDocument } from "./query-intent";

describe("composeIntentDocument", () => {
  test("routes AI projects to capability showcase", () => {
    const doc = composeIntentDocument({
      query: "Show me your AI projects.",
      requestId: "r",
    });
    expect(doc?.openuiText).toContain("CapabilityShowcaseExperience");
    expect(doc?.openuiText).toContain('"ai"');
  });

  test("routes CV queries", () => {
    const doc = composeIntentDocument({
      query: "Can I see your CV?",
      requestId: "r",
    });
    expect(doc?.openuiText).toContain("CVExperience");
  });

  test("blocks realtime weather", () => {
    const doc = composeIntentDocument({
      query: "What is the weather in Tokyo right now?",
      requestId: "r",
    });
    expect(doc?.openuiText).toContain("Answer");
    expect(doc?.fallbackText).not.toMatch(/sunny|celsius/i);
  });
});
