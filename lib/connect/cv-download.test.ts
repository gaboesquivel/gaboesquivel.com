import { describe, expect, test } from "bun:test";

import { cvDownloadPayload, normalizeCvFocus } from "./cv-download";

describe("cvDownloadPayload", () => {
  test("maps full variant to default CV paths", () => {
    expect(cvDownloadPayload()).toEqual({
      filename: "gaboesquivel-cv.pdf",
      pageUrl: "https://gaboesquivel.com/cv",
      pdfUrl: "https://gaboesquivel.com/gaboesquivel-cv.pdf",
      title: "Curriculum Vitae",
      variant: "full",
    });
  });

  test("maps ai focus to variant PDF and page", () => {
    expect(cvDownloadPayload({ focus: "ai" })).toMatchObject({
      filename: "gaboesquivel-cv-ai.pdf",
      pageUrl: "https://gaboesquivel.com/cv?focus=ai",
      pdfUrl: "https://gaboesquivel.com/gaboesquivel-cv-ai.pdf",
      variant: "ai",
    });
  });

  test("falls back unknown focus to full", () => {
    expect(normalizeCvFocus("unknown")).toBe("full");
    expect(cvDownloadPayload({ focus: "unknown" }).variant).toBe("full");
  });
});
