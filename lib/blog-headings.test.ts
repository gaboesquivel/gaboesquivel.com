import { describe, expect, test } from "bun:test";

import { extractBlogToc, showBlogToc } from "./blog-headings";

describe("extractBlogToc", () => {
  test("extracts h2 and h3 with slug ids", () => {
    const source = `---
title: Test
publishedAt: 2025-01-01
summary: x
---

Intro

## What MCP standardizes

Body

### Modular tools

More
`;

    expect(extractBlogToc(source)).toEqual([
      {
        id: "what-mcp-standardizes",
        text: "What MCP standardizes",
        level: 2,
      },
      {
        id: "modular-tools",
        text: "Modular tools",
        level: 3,
      },
    ]);
  });

  test("skips headings inside fenced code", () => {
    const source = `---
title: Test
publishedAt: 2025-01-01
summary: x
---

\`\`\`md
## Not a heading
\`\`\`

## Real section
`;

    expect(extractBlogToc(source)).toEqual([
      { id: "real-section", text: "Real section", level: 2 },
    ]);
  });
});

describe("showBlogToc", () => {
  test("requires at least two entries", () => {
    expect(showBlogToc([])).toBe(false);
    expect(showBlogToc([{ id: "a", text: "A", level: 2 }])).toBe(false);
    expect(
      showBlogToc([
        { id: "a", text: "A", level: 2 },
        { id: "b", text: "B", level: 2 },
      ])
    ).toBe(true);
  });
});
