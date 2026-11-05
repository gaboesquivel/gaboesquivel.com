import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf-8");

describe("interior layout contracts", () => {
  test("article shell centers title and body in one 3xl column without a TOC", () => {
    const shell = read("components/interior/article-shell.tsx");
    expect(shell).toContain("articleColumn");
    expect(shell).not.toContain("ArticleToc");
    expect(read("components/shared/spacing.ts")).toContain("max-w-3xl");
  });

  test("reading shell stays on site reading measure without editorial breakout", () => {
    const shell = read("components/interior/reading-page-shell.tsx");
    expect(shell).not.toContain("InteriorPageShell");
    expect(shell).not.toContain("interiorBreakout");
    expect(shell).toContain("readingMeasure");
  });

  test("interior shell stays inside site column without viewport breakout", () => {
    const shell = read("components/interior/interior-page-shell.tsx");
    expect(shell).not.toContain("interiorBreakout");
    expect(shell).not.toContain("w-screen");
    expect(shell).toContain("w-full min-w-0");
  });
});
