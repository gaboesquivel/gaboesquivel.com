import { describe, expect, test } from "bun:test";

import { fixedNoteSpec, noteFormVisible } from "./compose";

describe("note form", () => {
  test("the fixed note spec keeps field values out of props", () => {
    const spec = fixedNoteSpec({
      description: "Discuss the lending integration.",
      email: "ada@example.com",
      name: "Ada",
    });
    const props = JSON.stringify(
      Object.values(spec.elements).map((element) => element.props)
    );
    expect(props).not.toContain("Ada");
    expect(props).not.toContain("ada@example.com");
    expect(props).not.toContain("Discuss the lending");
    expect(JSON.stringify(spec.state)).toContain("Ada");
    expect(JSON.stringify(spec.state)).toContain("ada@example.com");
  });

  test("noteFormVisible shows on note turns without send approval", () => {
    expect(noteFormVisible({ hasSendApproval: false, mode: "note" })).toBe(
      true
    );
    expect(noteFormVisible({ hasSendApproval: true, mode: "note" })).toBe(
      false
    );
    expect(
      noteFormVisible({
        formDisabled: true,
        hasSendApproval: false,
        mode: "note",
      })
    ).toBe(false);
    expect(noteFormVisible({ hasSendApproval: false, mode: "book" })).toBe(
      false
    );
  });
});
