import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { capabilityRegistry } from "./registry";

/**
 * Agent-facing copy must name only tools the public MCP registry serves.
 * The registry is the source of truth; this fails when copy drifts from it.
 */
const root = join(import.meta.dir, "../..");
const publishedCopy = [
  "app/docs/page.tsx",
  "app/privacy/page.tsx",
  "app/about/page.tsx",
  "lib/api/openapi.ts",
  "lib/landing-pages.ts",
  "scripts/llms/authority.ts",
  "scripts/llms/corpus.ts",
  "scripts/llms/pages.ts",
];
const toolNames = Object.keys(capabilityRegistry);
const toolLike = /\b(?:agent|book|contact|get|list|search|send)_[a-z_]+\b/g;

describe("published MCP copy", () => {
  for (const file of publishedCopy) {
    test(`${file} names only registry tools`, () => {
      const text = readFileSync(join(root, file), "utf-8");
      const unknown = [...new Set(text.match(toolLike) ?? [])].filter(
        (name) => !toolNames.includes(name)
      );
      expect(unknown).toEqual([]);
    });
  }

  test("/docs documents every registry tool", () => {
    const docs = readFileSync(join(root, "app/docs/page.tsx"), "utf-8");
    expect(toolNames.filter((name) => !docs.includes(name))).toEqual([]);
  });

  test("/mcp/cv appears only as retired", () => {
    for (const file of publishedCopy) {
      const text = readFileSync(join(root, file), "utf-8");
      for (const line of text.split("\n")) {
        if (line.includes("/mcp/cv")) expect(line).toMatch(/retired|410/);
      }
    }
  });
});
