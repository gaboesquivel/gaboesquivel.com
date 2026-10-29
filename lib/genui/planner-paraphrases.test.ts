import { describe, expect, test } from "bun:test";

import { comparisonDimensionsInText } from "./comparison-dimensions";
import { planTasks } from "./task-plan";

/**
 * Paraphrase table for the deterministic planner. Each keyword rule here once
 * over- or under-matched; add a row for every new pattern, including a
 * negative case it must not capture.
 */
const plans: {
  closed?: boolean[];
  kinds: string[];
  query: string;
}[] = [
  // Agent development process: answered from writing, not a project list.
  {
    closed: [true],
    kinds: ["explain"],
    query: "What process do you follow to develop applications using agents?",
  },
  {
    closed: [true],
    kinds: ["explain"],
    query: "How do you build software with coding agents?",
  },
  {
    closed: [true],
    kinds: ["explain"],
    query: "what's your workflow for building apps with AI agents",
  },
  // AI browsing stays project browsing.
  {
    closed: [false],
    kinds: ["projects"],
    query: "Show me AI workflow projects",
  },
  {
    closed: [false],
    kinds: ["projects"],
    query: "What is your approach to AI projects?",
  },
  {
    closed: [false],
    kinds: ["projects"],
    query: "Show me projects using agents",
  },
  {
    closed: [false],
    kinds: ["projects"],
    query: "Which projects did you build using agents?",
  },
  { kinds: ["projects"], query: "show me your ai projects" },
  // Multi-part asks keep each part, including noun phrases.
  {
    closed: [false, true, true],
    kinds: ["count", "explain", "explain"],
    query:
      "How many projects have you built, what are you most proud of, and describe a problem you solved in production?",
  },
  {
    closed: [false, true, true],
    kinds: ["count", "explain", "explain"],
    query:
      "how many projects, your proudest work, and a bug you fixed in production",
  },
  // Comparisons absorb dimension clauses instead of spawning tasks.
  {
    kinds: ["compare"],
    query:
      "Compare Wink and LegalAgent: my role, technical challenges, and what shipped.",
  },
  { kinds: ["compare"], query: "Wink vs LegalAgent: role and outcomes" },
  { kinds: ["cv"], query: "download cv" },
  { kinds: ["booking"], query: "book a call" },
];

const dimensions: { expected: string[]; text: string }[] = [
  {
    expected: ["role", "work", "shipped"],
    text: "Compare Wink and LegalAgent: my role, technical challenges, what shipped.",
  },
  {
    expected: ["role", "shipped"],
    text: "Wink vs LegalAgent: role and outcomes",
  },
  {
    expected: ["technologies"],
    text: "compare masterbots vs legalagent stack",
  },
  // Unrelated words fall back to the defaults instead of narrowing rows.
  {
    expected: ["role", "shipped", "technologies"],
    text: "Compare Wink and LegalAgent and show me your timeline",
  },
  {
    expected: ["role", "shipped", "technologies"],
    text: "Compare Wink and LegalAgent and tell me what types of clients you work with",
  },
];

describe("planner paraphrase table", () => {
  for (const row of plans) {
    test(row.query, () => {
      const tasks = planTasks(row.query);
      expect(tasks.map((task) => task.kind)).toEqual(row.kinds);
      if (row.closed) {
        expect(tasks.map((task) => task.closedLimitation)).toEqual(row.closed);
      }
    });
  }

  for (const row of dimensions) {
    test(`dimensions: ${row.text}`, () => {
      expect(comparisonDimensionsInText(row.text)).toEqual(
        row.expected as ReturnType<typeof comparisonDimensionsInText>
      );
    });
  }
});
