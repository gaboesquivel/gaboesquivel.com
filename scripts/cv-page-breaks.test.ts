import { describe, expect, test } from "bun:test";

import {
  assertPrintBlocksFit,
  choosePageBreaks,
  countPdfPages,
  serializeCvPageBreaks,
  USABLE_PAGE_HEIGHT_PX,
} from "./cv-page-breaks";

const block = ({
  id,
  height,
  marginBefore = 16,
}: {
  id: string;
  height: number;
  marginBefore?: number;
}) => ({ height, id, marginBefore });

describe("choosePageBreaks", () => {
  test("keeps a short CV on one page", () => {
    const result = choosePageBreaks({
      blocks: [
        block({ id: "intro", height: 200, marginBefore: 0 }),
        block({ id: "LegalAgent", height: 180 }),
        block({ id: "skills", height: 120 }),
        block({ id: "contact", height: 160 }),
      ],
      usableHeight: 900,
    });
    expect(result).toEqual({ breakIds: [], pageCount: 1 });
  });

  test("breaks before the first overflowing entry", () => {
    const result = choosePageBreaks({
      blocks: [
        block({ id: "intro", height: 300, marginBefore: 0 }),
        block({ id: "LegalAgent", height: 180 }),
        block({ id: "Bitlauncher", height: 200 }),
        block({ id: "skills", height: 80 }),
        block({ id: "contact", height: 80 }),
      ],
      usableHeight: 500,
    });
    expect(result.breakIds).toContain("Bitlauncher");
    expect(result.pageCount).toBe(2);
    assertPrintBlocksFit({
      blocks: [
        block({ height: 300, id: "intro", marginBefore: 0 }),
        block({ height: 180, id: "LegalAgent" }),
        block({ height: 200, id: "Bitlauncher" }),
        block({ height: 80, id: "skills" }),
        block({ height: 80, id: "contact" }),
      ],
      breakIds: result.breakIds,
      usableHeight: 500,
    });
  });

  test("pulls the previous block onto the last page instead of leaving contact alone", () => {
    const blocks = [
      block({ height: 100, id: "intro", marginBefore: 0 }),
      block({ height: 150, id: "LegalAgent" }),
      block({ height: 150, id: "Bitlauncher" }),
      block({ height: 200, id: "contact" }),
    ];
    const result = choosePageBreaks({
      blocks,
      usableHeight: 500,
    });
    expect(result.breakIds).not.toContain("contact");
    expect(result.breakIds).toContain("Bitlauncher");
    expect(result.pageCount).toBe(2);
  });

  test("throws when a block is taller than the page", () => {
    expect(() =>
      choosePageBreaks({
        blocks: [block({ id: "intro", height: 500, marginBefore: 0 })],
        usableHeight: 400,
      })
    ).toThrow(/taller than the 400px printable page/);
  });

  test("usable height matches A4 minus 0.75in margins and pack safety", () => {
    expect(Math.round(USABLE_PAGE_HEIGHT_PX)).toBe(967);
  });

  test("serializeCvPageBreaks writes every variant key", () => {
    const source = serializeCvPageBreaks({
      breaks: {
        ai: [],
        full: ["Bitlauncher"],
        fullstack: ["contact"],
        web3: ["skills"],
      },
    });
    expect(source).toContain('full: ["Bitlauncher"]');
    expect(source).toContain('web3: ["skills"]');
    expect(source).toContain('import type { CvKey } from "gaboesquivel";');
  });

  test("countPdfPages prefers the Pages Count", () => {
    const pdf = Buffer.from("/Type /Pages /Count 3 /Kids [1 0 R 2 0 R 3 0 R]");
    expect(countPdfPages({ pdf })).toBe(3);
  });
});
