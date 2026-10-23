import { describe, expect, test } from "bun:test";

import { markdownNotFoundBody } from "../../lib/markdown-not-found";
import { buildMarkdownCorpus } from "./markdown-corpus";
import { getMarkdownForPath } from "./markdown-route";

describe("markdown corpus", () => {
  test("homepage and project pages render", () => {
    const home = getMarkdownForPath({ pathname: "/" });
    expect(home).toContain("# Software for humans and agents.");
    expect(home).toContain("Agentic Software Engineer");
    expect(home).toContain("## Writing");
    const project = getMarkdownForPath({ pathname: "/project/legal-agent" });
    expect(project).toContain("LegalAgent");
  });

  test("narrative pages retain linked project figures", () => {
    for (const [pathname, slugs] of [
      ["/ai", ["legal-agent", "masterbots", "bitlauncher", "wizard-world"]],
      [
        "/web3",
        [
          "ztx",
          "bitcashbank",
          "bitlauncher",
          "opyn",
          "raremint",
          "knowledge-io",
          "eos-costa-rica",
          "chaingraph",
        ],
      ],
    ] as const) {
      const markdown = getMarkdownForPath({ pathname });
      for (const slug of slugs) {
        expect(markdown).toContain(`https://gaboesquivel.com/project/${slug}`);
      }
    }
  });

  test("editorial portfolio pages keep narrative copy without hire boilerplate", () => {
    const ai = getMarkdownForPath({ pathname: "/ai" });
    expect(ai).toContain("# AI Engineering");
    expect(ai).toContain("## LegalAgent");
    expect(ai).toContain("## Domain-specific assistants");
    expect(ai).toContain("## Writing about AI products");
    expect(ai).not.toContain("Work together");
    expect(ai).not.toContain("work under W-2");

    const web3 = getMarkdownForPath({ pathname: "/web3" });
    expect(web3).toContain("# Web3 Engineering");
    expect(web3).toContain("## ZTX");
    expect(web3).toContain("## Trading and financial products");
    expect(web3).toContain("[Knowledge](");
    expect(web3).not.toContain("Work together");

    const bio = getMarkdownForPath({ pathname: "/bio" });
    expect(bio).toContain("# Career story");
    expect(bio).toContain("## Interfaces and a JavaScript community");
    expect(bio).toContain("https://gaboesquivel.com/project/costa-rica-js");
    expect(bio).toContain("https://gaboesquivel.com/project/wink");
    expect(bio).toContain("From 2012, I also helped organize");
    expect(bio).not.toContain("founded Costa Rica JS");
    expect(bio).not.toContain("Grant Thornton");
    expect(bio).toContain("## Selected writing");
    expect(bio).not.toContain("Work together");
  });

  test("list pages and CV focus variant render", () => {
    expect(getMarkdownForPath({ pathname: "/work" })).toContain(
      "Software that ships."
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
