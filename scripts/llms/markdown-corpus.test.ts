import { describe, expect, test } from "bun:test";

import { markdownNotFoundBody } from "../../lib/markdown-not-found";
import { buildMarkdownCorpus } from "./markdown-corpus";
import { getMarkdownForPath } from "./markdown-route";

describe("markdown corpus", () => {
  test("homepage and project pages render", () => {
    const home = getMarkdownForPath({ pathname: "/" });
    expect(home).toContain("# Gabo Esquivel");
    const project = getMarkdownForPath({ pathname: "/project/legal-agent" });
    expect(project).toContain("LegalAgent");
  });

  test("list pages and CV focus variant render", () => {
    expect(getMarkdownForPath({ pathname: "/work" })).toContain(
      "Selected software projects"
    );
    expect(getMarkdownForPath({ pathname: "/blog" })).toContain("# Writing");
    expect(getMarkdownForPath({ pathname: "/explore" })).toContain("# Explore");
    expect(getMarkdownForPath({ pathname: "/blog/category/ai" })).toContain(
      "Writing: AI"
    );
    expect(getMarkdownForPath({ pathname: "/tech/ai" })).toContain(
      "AI technologies"
    );
    expect(
      getMarkdownForPath({ pathname: "/cv", search: "focus=ai" })
    ).toContain("Canonical: https://gaboesquivel.com/cv?focus=ai");
  });

  test("buildMarkdownCorpus includes manifest routes", () => {
    const corpus = buildMarkdownCorpus();
    expect(corpus["/"]).toBeTruthy();
    expect(corpus["/work"]).toBeTruthy();
    expect(Object.keys(corpus).length).toBeGreaterThan(50);
  });

  test("not found body links to llms.txt", () => {
    expect(markdownNotFoundBody).toContain("/llms.txt");
    expect(markdownNotFoundBody.length).toBeGreaterThan(20);
  });
});
