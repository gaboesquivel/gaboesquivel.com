import { describe, expect, test } from "bun:test";

import { featuredProjectSlugs } from "lib/work-types";

import { EXPERIENCE_QUESTION } from "./intent";
import { workCardSlugsForUserText } from "./work-cards";

describe("connect work cards", () => {
  test("shows featured projects for the experience chip and broad shipped-work asks", () => {
    expect(workCardSlugsForUserText(EXPERIENCE_QUESTION)).toEqual([
      ...featuredProjectSlugs,
    ]);
    expect(
      workCardSlugsForUserText("What have you shipped in your career?")
    ).toEqual([...featuredProjectSlugs]);
  });

  test("hides cards for book, note, and named-company questions", () => {
    expect(
      workCardSlugsForUserText("[site:book America/Denver]\nBook a call")
    ).toEqual([]);
    expect(
      workCardSlugsForUserText("[site:note America/Denver]\nSend email")
    ).toEqual([]);
    expect(workCardSlugsForUserText("What did you ship at Wink?")).toEqual([]);
  });
});
