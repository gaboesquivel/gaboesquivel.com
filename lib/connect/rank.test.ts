import { describe, expect, test } from "bun:test";

import { rankSections } from "./rank";
import type { RankSection } from "./rank";

const sections: RankSection[] = [
  {
    body: "Software Engineer at Wink. Cite /cv.",
    categories: [],
    company: "Wink",
    kind: "employment",
    opening: "Wink lending",
    path: "/cv",
    publishedAt: "",
    summary: "Led engineering for Wink.",
    tags: [],
    title: "Software Engineer",
  },
  {
    body: "Wink is a neobank.",
    categories: [],
    company: "Wink",
    kind: "project",
    opening: "Wink neobank",
    path: "/project/wink",
    publishedAt: "",
    summary: "Costa Rica neobank",
    tags: ["typescript"],
    title: "Wink",
  },
  {
    body: "Agents need a reliable interface.",
    categories: ["ai"],
    company: "",
    kind: "post",
    opening: "agents",
    path: "/blog/2024-agents",
    publishedAt: "2024-05-01",
    summary: "A current note on agents",
    tags: [],
    title: "Agents in production",
  },
  {
    body: "React was new in 2014.",
    categories: ["web"],
    company: "",
    kind: "post",
    opening: "react",
    path: "/blog/2014-react",
    publishedAt: "2014-03-01",
    summary: "Notes on React",
    tags: [],
    title: "Old react notes",
  },
];

describe("connect ranker", () => {
  test("selects the employment section for a company name", () => {
    const ranked = rankSections({
      question: "What did you do at Wink?",
      sections,
    });
    expect(ranked.paste).toContain("Software Engineer");
    expect(ranked.paste).toContain("/cv");
    expect(ranked.paths[0]).toBe("/cv");
  });

  test("selects a current post for a view and leaves a pre-2020 post out", () => {
    const ranked = rankSections({
      question: "What do you think about agents?",
      sections,
    });
    expect(ranked.paste).toContain("/blog/2024-agents");
    expect(ranked.paste).toContain("2024-05-01");
    expect(ranked.paste).not.toContain("/blog/2014-react");
    expect(ranked.paste).not.toContain("React was new");
  });
});
