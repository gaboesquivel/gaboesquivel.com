import { describe, expect, test } from "bun:test";

import { createParser } from "@openuidev/react-lang";

import { genuiLibrary } from "../../components/genui/genui-library";
import { cvDocument } from "./builders";

describe("openui fixtures", () => {
  test("CV deterministic document parses", () => {
    const envelope = cvDocument({
      record: {
        id: "/cv",
        kind: "cv",
        pdfUrl: "https://gaboesquivel.com/gaboesquivel-cv.pdf",
        title: "Curriculum Vitae",
        url: "https://gaboesquivel.com/cv",
        variant: "full",
      },
      requestId: "r1",
    });
    const parser = createParser(genuiLibrary.toJSONSchema(), "CVExperience");
    const result = parser.parse(envelope.openuiText);
    expect(result.meta.errors.length).toBe(0);
    expect(envelope.fallbackText.length).toBeGreaterThan(0);
  });
});
