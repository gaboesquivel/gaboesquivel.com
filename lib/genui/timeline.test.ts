import { describe, expect, test } from "bun:test";

import { getProjectBySlug } from "gaboesquivel";
import { careerProjectSlugs } from "lib/bio/career-timeline";

import { timelineDocument } from "./builders";
import { composeIntentDocument } from "./query-intent";
import { validateCompositionEnvelope } from "./validate-envelope";

const envelope = timelineDocument({ requestId: "timeline-test" });

describe("career timeline", () => {
  for (const query of [
    "Show me your career timeline",
    "Tell me about your journey",
    "professional background",
    "Muéstrame tu trayectoria",
    "bio",
  ]) {
    test(`routes ${query} through the shared compiler`, () => {
      const result = composeIntentDocument({ query, requestId: "test" });
      expect(result?.openuiText).toContain("TimelineExperience");
      expect(
        validateCompositionEnvelope({ envelope: result ?? envelope }).ok
      ).toBe(true);
    });
  }
  test("all curated projects exist and are supplied as records", () => {
    for (const slug of careerProjectSlugs) {
      expect(getProjectBySlug(slug)).toBeDefined();
      expect(
        envelope.records.some((record) => record.id === `/project/${slug}`)
      ).toBe(true);
    }
  });
  test("requires biography and project evidence", () => {
    for (const id of ["/bio", "/project/wink"]) {
      expect(
        validateCompositionEnvelope({
          envelope: {
            ...envelope,
            records: envelope.records.filter((record) => record.id !== id),
          },
        }).ok
      ).toBe(false);
    }
  });
  test("rejects incompatible composites", () => {
    expect(
      validateCompositionEnvelope({
        envelope: {
          ...envelope,
          openuiText: envelope.openuiText.replace(
            "chapter-stack",
            "editorial-grid"
          ),
        },
      }).ok
    ).toBe(false);
  });
  test("does not override specific technical experience or safety flows", () => {
    expect(
      composeIntentDocument({
        query: "What is your experience building AI agents?",
        requestId: "test",
      })
    ).toBeNull();
    expect(
      composeIntentDocument({
        query: "Show your career timeline and download CV",
        requestId: "test",
      })?.openuiText
    ).toContain("CVExperience");
  });
});
