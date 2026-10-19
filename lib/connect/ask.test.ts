import { describe, expect, test } from "bun:test";

import { EXPERIENCE_QUESTION, toolsForTurn } from "./intent";
import { rankSections } from "./rank";
import type { RankSection } from "./rank";

const estimateTokens = (text: string) => Math.ceil(text.length / 4);

describe("connect ask turn", () => {
  test("registers no tools and keeps the paste under 1500 tokens", () => {
    expect(toolsForTurn({ texts: [EXPERIENCE_QUESTION] })).toBeNull();
    expect(
      toolsForTurn({ texts: ["How does the homepage describe the work?"] })
    ).toBeNull();

    const section: RankSection = {
      body: "word ".repeat(8000),
      categories: [],
      company: "Wink",
      kind: "employment",
      opening: "Wink",
      path: "/cv",
      publishedAt: "",
      summary: "Wink",
      tags: [],
      title: "Software Engineer",
    };
    const ranked = rankSections({
      question: "What did you do at Wink?",
      sections: [section],
    });
    expect(toolsForTurn({ texts: [EXPERIENCE_QUESTION] })).toBeNull();
    expect(estimateTokens(ranked.paste)).toBeLessThanOrEqual(1500);
    expect(ranked.paste.length).toBeGreaterThan(0);
  });
});
