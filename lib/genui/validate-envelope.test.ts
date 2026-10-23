import { describe, expect, test } from "bun:test";

import { cvDocument } from "./builders";
import { validateCompositionEnvelope } from "./validate-envelope";

describe("validateCompositionEnvelope", () => {
  test("accepts a deterministic CV document", () => {
    const envelope = cvDocument({
      record: {
        id: "/cv",
        kind: "cv",
        pdfUrl: "https://gaboesquivel.com/gaboesquivel-cv.pdf",
        title: "CV",
        url: "https://gaboesquivel.com/cv",
        variant: "full",
      },
      requestId: "r1",
    });
    expect(validateCompositionEnvelope({ envelope }).ok).toBe(true);
  });

  test("rejects documents that do not start with root", () => {
    expect(
      validateCompositionEnvelope({
        envelope: {
          fallbackText: "x",
          libraryVersion: 1,
          openuiText: "not openui",
          records: [],
          requestId: "r1",
        },
      }).ok
    ).toBe(false);
  });
});
