import { describe, expect, test } from "bun:test";

import { createParser } from "@openuidev/react-lang";

import { genuiLibrary } from "../../components/genui/genui-library";
import { cvDocument, projectDocument } from "./builders";
import { chooseProjectComposite } from "./composites";

describe("openui fixtures", () => {
  test("project composites differ for one versus six ids", () => {
    const records = [
      {
        description: "A",
        id: "/project/legal-agent",
        kind: "project" as const,
        slug: "legal-agent",
        title: "LegalAgent",
        url: "https://gaboesquivel.com/project/legal-agent",
      },
    ];
    const single = projectDocument({
      composite: chooseProjectComposite({ projectIds: [records[0].id] }),
      projectIds: [records[0].id],
      records,
      requestId: "r1",
    });
    const gallery = projectDocument({
      composite: "work-gallery",
      projectIds: records.map((record) => record.id),
      records,
      requestId: "r1",
    });
    expect(single.openuiText).not.toBe(gallery.openuiText);
  });

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
