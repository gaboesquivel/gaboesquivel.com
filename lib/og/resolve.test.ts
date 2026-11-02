import { describe, expect, test } from "bun:test";

import {
  blogOgImagePath,
  blogOgMetadataImages,
  projectOgImagePath,
  projectOgMetadataImages,
} from "./resolve";

const siteOrigin = "https://gaboesquivel.com";

describe("og resolve", () => {
  test("blog explicit ogImage override wins", () => {
    expect(
      blogOgMetadataImages({
        slug: "2026-10-generative-interfaces",
        ogImage: "/images/custom.png",
        siteOrigin,
      })[0]?.url
    ).toBe(`${siteOrigin}/images/custom.png`);
  });

  test("blog defaults to generated editorial image", () => {
    expect(
      blogOgMetadataImages({
        slug: "2026-10-generative-interfaces",
        siteOrigin,
      })[0]?.url
    ).toBe(`${siteOrigin}/images/og/blog/2026-10-generative-interfaces.png`);
  });

  test("blog generated path is slug-based", () => {
    expect(blogOgImagePath("2025-05-model-context-protocol")).toBe(
      "/images/og/blog/2025-05-model-context-protocol.png"
    );
  });

  test("project without image falls back to personal", () => {
    expect(
      projectOgMetadataImages({ slug: "missing", image: "", siteOrigin })[0]
        ?.url
    ).toBe(`${siteOrigin}/og`);
  });

  test("project with hero uses generated derivative path", () => {
    expect(
      projectOgMetadataImages({
        slug: "wink",
        image: `${siteOrigin}/images/work/wink.png`,
        siteOrigin,
      })[0]?.url
    ).toBe(`${siteOrigin}/images/og/projects/wink.png`);
    expect(projectOgImagePath("wink")).toBe("/images/og/projects/wink.png");
  });
});
