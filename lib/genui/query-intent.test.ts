import { describe, expect, test } from "bun:test";

import { composeIntentDocument } from "./query-intent";

describe("composeIntentDocument", () => {
  test("routes AI projects to project bento", () => {
    const doc = composeIntentDocument({
      query: "Show me your AI projects",
      requestId: "r",
    });
    expect(doc?.openuiText).toContain("ProjectExperience");
    expect(doc?.openuiText).toContain("project-bento");
    expect(doc?.openuiText).not.toContain("CapabilityShowcaseExperience");
    expect(doc?.openuiText).toContain('"ai"');
  });

  test("routes Web3 project browsing to ProjectExperience", () => {
    const doc = composeIntentDocument({
      query: "Show me your Web3 projects",
      requestId: "r",
    });
    expect(doc?.openuiText).toContain("ProjectExperience");
    expect(doc?.openuiText).not.toContain("CapabilityShowcaseExperience");
  });

  test("routes Spanish AI project browsing", () => {
    const doc = composeIntentDocument({
      query: "Muéstrame tus proyectos de inteligencia artificial",
      requestId: "r",
    });
    expect(doc?.openuiText).toContain("ProjectExperience");
    expect(doc?.openuiText).not.toContain("CapabilityShowcaseExperience");
  });

  test("normalizes noisy AI project browse query", () => {
    const doc = composeIntentDocument({
      query: "show   me   your AI projects!!!",
      requestId: "r",
    });
    expect(doc?.openuiText).toContain("project-bento");
  });

  test("experience question does not return project showcase", () => {
    const doc = composeIntentDocument({
      query: "What is your experience building AI agents with TypeScript?",
      requestId: "r",
    });
    expect(doc).toBeNull();
  });

  test("architecture question uses capability showcase", () => {
    const doc = composeIntentDocument({
      query: "Show me the architecture of your AI system",
      requestId: "r",
    });
    expect(doc?.openuiText).toContain("CapabilityShowcaseExperience");
  });

  test("named project detail uses case study", () => {
    const doc = composeIntentDocument({
      query: "Tell me about LegalAgent",
      requestId: "r",
    });
    expect(doc?.openuiText).toContain("case-study");
    expect(doc?.openuiText).toContain("legal-agent");
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

  test("quantum projects honest answer", () => {
    const doc = composeIntentDocument({
      query: "Show me your quantum computing projects",
      requestId: "r",
    });
    expect(doc?.openuiText).toContain("Answer");
  });
});
