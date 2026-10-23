import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf-8");

describe("interior layout contracts", () => {
  test("article shell uses two-track grid region without ghost column CSS", () => {
    const css = read("app/global.css");
    expect(css).toContain(
      "grid-template-columns: minmax(0, 1fr) minmax(14rem, 17rem)"
    );
    expect(css).not.toContain("minmax(0, 52rem)\n    minmax(14rem, 17rem)");
    expect(read("components/interior/article-shell.tsx")).toContain(
      "articleLayoutRegion"
    );
  });

  test("article TOC modes do not both default open on desktop", () => {
    const inline = read("components/interior/article-toc-inline.tsx");
    const nav = read("components/interior/article-toc-nav.tsx");
    expect(inline).not.toMatch(/\bopen\b/);
    expect(nav).toContain("hidden xl:block");
    expect(inline).toContain("xl:hidden");
  });

  test("reading shell stays on site reading measure without editorial breakout", () => {
    const shell = read("components/interior/reading-page-shell.tsx");
    expect(shell).not.toContain("InteriorPageShell");
    expect(shell).not.toContain("interiorBreakout");
    expect(shell).toContain("readingMeasure");
  });

  test("article shell renders TOC nav when items qualify", () => {
    const source = read("components/interior/article-shell.tsx");
    expect(source).toContain("ArticleTocNav");
    expect(source).toContain("showBlogToc");
  });

  test("interior shell stays inside site column without viewport breakout", () => {
    const shell = read("components/interior/interior-page-shell.tsx");
    expect(shell).not.toContain("interiorBreakout");
    expect(shell).not.toContain("w-screen");
    expect(shell).toContain("w-full min-w-0");
  });
});
