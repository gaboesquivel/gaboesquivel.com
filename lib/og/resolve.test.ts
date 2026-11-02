import { describe, expect, test } from "bun:test";

import {
  blogOgImagePath,
  projectOgImagePath,
  resolveBlogOg,
  resolveProjectOg,
} from "./resolve";

describe("og resolve", () => {
  test("blog explicit ogImage override wins", () => {
    expect(
      resolveBlogOg({
        slug: "2026-10-generative-interfaces",
        ogImage: "/images/custom.png",
      })
    ).toEqual({ kind: "override", path: "/images/custom.png" });
  });

  test("blog defaults to generated editorial image", () => {
    expect(resolveBlogOg({ slug: "2026-10-generative-interfaces" })).toEqual({
      kind: "generated",
      slug: "2026-10-generative-interfaces",
    });
  });

  test("blog generated path is slug-based", () => {
    expect(blogOgImagePath("2025-05-model-context-protocol")).toBe(
      "/images/og/blog/2025-05-model-context-protocol.png"
    );
  });

  test("project without image falls back to personal", () => {
    expect(resolveProjectOg({ slug: "missing", image: "" })).toEqual({
      kind: "personal",
    });
  });

  test("project with hero uses generated derivative path", () => {
    expect(
      resolveProjectOg({
        slug: "wink",
        image: "https://gaboesquivel.com/images/work/wink.png",
      })
    ).toEqual({
      kind: "hero",
      path: "https://gaboesquivel.com/images/work/wink.png",
      slug: "wink",
    });
    expect(projectOgImagePath("wink")).toBe("/images/og/projects/wink.png");
  });
});
