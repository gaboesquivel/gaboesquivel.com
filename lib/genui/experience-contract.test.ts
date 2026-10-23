import { describe, expect, test } from "bun:test";

import {
  checkExperienceDocument,
  forbiddenExperienceKeys,
} from "./experience-contract";

describe("checkExperienceDocument", () => {
  test("accepts a project experience that references ids", () => {
    expect(
      checkExperienceDocument({
        name: "ProjectExperience",
        props: { ids: ["legal-agent"] },
      })
    ).toEqual({ ok: true, name: "ProjectExperience" });
  });

  test("rejects unknown composite names", () => {
    expect(
      checkExperienceDocument({
        name: "ProjectExperience",
        props: { composite: "mosaic", ids: ["/project/wink"] },
      }).ok
    ).toBe(false);
  });

  test("rejects a component outside the experience catalog", () => {
    expect(
      checkExperienceDocument({
        name: "Grid",
        props: { ids: ["legal-agent"] },
      }).ok
    ).toBe(false);
  });

  for (const key of forbiddenExperienceKeys) {
    test(`rejects ${key}`, () => {
      expect(
        checkExperienceDocument({
          name: "Answer",
          props: { [key]: "x" },
        })
      ).toEqual({ ok: false, reason: key });
    });
  }

  test("rejects html, css, and endpoint urls inside values", () => {
    expect(
      checkExperienceDocument({
        name: "Answer",
        props: { text: "<script>alert(1)</script>" },
      }).reason
    ).toBe("html");
    expect(
      checkExperienceDocument({
        name: "Answer",
        props: { text: ".card { color: red }" },
      }).reason
    ).toBe("css");
    expect(
      checkExperienceDocument({
        name: "Answer",
        props: { text: "https://example.com/hook" },
      }).reason
    ).toBe("endpoint");
  });
});
