import { describe, expect, test } from "bun:test";

import { experience, projects, techStack } from "gaboesquivel";

import { renderBlogMarkdown } from "./blog";
import { getLlmsFull, getLlmsIndex } from "./corpus";
import { cvExports, renderCvMarkdown } from "./cv";
import { blogSlugFromRelatedUrl, isValidProjectLink } from "./format";
import { loadNarrativePages } from "./pages";
import {
  featuredProjectSlugs,
  indexEvidenceSlugs,
  renderProjectMarkdown,
  renderTechMarkdown,
} from "./projects";
import { canonicalizePath } from "./routes";
import { validateSection } from "./validate";

describe("llms export helpers", () => {
  test("canonicalizePath resolves aliases", () => {
    expect(canonicalizePath("/project/legalagent")).toBe(
      "/project/legal-agent"
    );
    expect(canonicalizePath("/tech/next-js")).toBe("/tech/nextjs");
    expect(canonicalizePath("/tech/evm")).toBe("/tech/evm");
  });

  test("isValidProjectLink rejects placeholders", () => {
    expect(isValidProjectLink("#")).toBe(false);
    expect(isValidProjectLink("https://example.com/foo")).toBe(false);
    expect(isValidProjectLink("https://bitlauncher.ai")).toBe(true);
  });

  test("blogSlugFromRelatedUrl strips absolute blog URLs", () => {
    expect(
      blogSlugFromRelatedUrl(
        "https://gaboesquivel.com/blog/2018-07-costa-rica-crypto-cantina"
      )
    ).toBe("2018-07-costa-rica-crypto-cantina");
  });

  test("renderTechMarkdown omits encyclopedia fields", () => {
    const markdown = renderTechMarkdown({
      description: "Generic definition",
      experience: [
        "Used JavaScript in Staples and Gridium for building interactive web applications.",
      ],
      image: "/images/tech/javascript.png",
      link: "https://developer.mozilla.org",
      name: "JavaScript",
      since: "2009",
      slug: "javascript",
      tag: "JavaScript",
    });
    expect(markdown).not.toContain("Since:");
    expect(markdown).not.toContain("versatile programming language");
    expect(markdown).toContain("## Implementation");
  });

  test("validateSection catches unbalanced fences", () => {
    const errors = validateSection({
      body: "```js\nconst x = 1",
      title: "Broken",
    });
    expect(errors.some((error) => error.includes("unbalanced"))).toBe(true);
  });

  test("renderBlogMarkdown labels contracting post", () => {
    const markdown = renderBlogMarkdown({
      body: "Not legal advice in body.",
      publishedAt: "2025-11-10",
      slug: "2025-11-1099-contracting",
      summary: "Personal setup",
      title: "Why I Prefer 1099 Contracting",
    });
    expect(markdown).toContain("personal contracting setup");
  });

  test("renderProjectMarkdown emits employment from experienceCompany", () => {
    const employment = experience.find((entry) => entry.company === "Wink");
    const markdown = renderProjectMarkdown({
      achievements: [],
      description: "Neobank app",
      experienceCompany: "Wink",
      image: "/images/wink.png",
      order: 1,
      role: "Lead Engineer",
      slug: "wink",
      story: [],
      tech: ["React Native"],
      title: "Wink",
      type: ["mobile"],
      year: 2015,
    });
    expect(employment).toBeDefined();
    expect(markdown).toContain("**Role:** Lead Engineer");
    expect(markdown).toContain(`**Employment:** ${employment?.duration}`);
    expect(markdown).not.toContain("**Primary year:**");
  });

  test("renderProjectMarkdown omits Role when the field is missing", () => {
    const project = projects.find((item) => !item.role);
    expect(project).toBeDefined();
    if (!project) {
      return;
    }
    const markdown = renderProjectMarkdown(project);
    expect(markdown).not.toContain("**Role:**");
  });

  test("renderTechMarkdown includes description before evidence", () => {
    const ponder = techStack.find((item) => item.slug === "ponder");
    expect(ponder?.description).toBeTruthy();
    if (!ponder?.description) {
      return;
    }
    const markdown = renderTechMarkdown(ponder);
    expect(markdown).toContain(ponder.description);
    expect(markdown.indexOf(ponder.description)).toBeLessThan(
      markdown.indexOf("## Project evidence")
    );
  });

  test("renderCvMarkdown omits unsupported Python from default CV", () => {
    const markdown = renderCvMarkdown();
    expect(markdown).not.toMatch(/\bPython\b/);
  });

  test("cvExports renders four CV sections", () => {
    expect(cvExports()).toHaveLength(4);
    expect(cvExports().map((item) => item.path)).toEqual([
      "/cv",
      "/cv?focus=ai",
      "/cv?focus=web3",
      "/cv?focus=fullstack",
    ]);
  });

  test("indexEvidenceSlugs lists six featured projects", () => {
    const featured = projects
      .filter((project) => project.type.includes("featured"))
      .map((project) => project.slug)
      .sort();
    expect(indexEvidenceSlugs).toHaveLength(6);
    expect(indexEvidenceSlugs).toEqual([
      "legal-agent",
      "wink",
      "ztx",
      "bitlauncher",
      "opyn",
      "eos-costa-rica",
    ]);
    expect(indexEvidenceSlugs).toEqual(featuredProjectSlugs);
    expect([...featuredProjectSlugs].sort()).toEqual(featured);
  });

  test("capability writing lists are newest first", () => {
    const lead = loadNarrativePages().find((page) => page.path === "/lead");
    const writing =
      lead?.body.split("## Writing about technical leadership")[1] ?? "";
    const slugs = [...writing.matchAll(/\/blog\/([^)]+)/g)].map(
      (match) => match[1]
    );
    expect(slugs).toEqual([
      "2026-02-engineering-ai-era",
      "2025-02-engineering-principles",
      "2024-07-adrs-in-software-teams",
    ]);
  });

  test("loadNarrativePages exports CapabilityPage related writing", () => {
    const fullstack = loadNarrativePages().find(
      (page) => page.path === "/fullstack"
    );
    expect(fullstack?.body).toContain("## Writing about product systems");
    expect(fullstack?.body).toContain("/blog/2024-07-viem-wagmi-ethers");
    expect(fullstack?.body).toContain("/cv?focus=fullstack");
  });

  test("loadNarrativePages exports non-empty CapabilityPage bodies", () => {
    for (const path of [
      "/frontend",
      "/backend",
      "/mobile",
      "/startups",
      "/institutions",
      "/lead",
    ]) {
      const page = loadNarrativePages().find((item) => item.path === path);
      expect(page?.body.length).toBeGreaterThan(0);
      expect(page?.title).not.toBe(path);
    }
  });

  test("loadNarrativePages emits W-2 hire copy on /contact and /ask only", () => {
    const ask = loadNarrativePages().find((page) => page.path === "/ask");
    const contact = loadNarrativePages().find(
      (page) => page.path === "/contact"
    );
    const ai = loadNarrativePages().find((page) => page.path === "/ai");
    expect(ask?.body).toContain("Cannot work under W-2");
    expect(contact?.body).toContain("can't work under W-2");
    expect(ai?.body).not.toContain("work under W-2");
  });

  test("llms index includes when-to-use guidance", () => {
    const index = getLlmsIndex();
    expect(index).toContain("## When to use this corpus");
    expect(index).toContain("/ask");
    expect(index).toContain("/project/[slug]");
    expect(index).toContain("/cv");
    expect(index).toContain("/tech/[slug]");
    expect(index).toContain("Cannot work under W-2");
    expect(index).toContain("/mcp");
    expect(index).toContain("/mcp/cv");
    expect(index).toContain("/docs");
    expect(index).toContain("openapi.json");
    expect(index).toContain("## Gabo Esquivel MCP (developer resources)");
    expect(index).toContain("/developers");
    expect(index).toContain("agent_start");
    expect(index).toContain("agent_get");
  });

  test("homepage corpus includes focus and bio preview", () => {
    const home = loadNarrativePages().find((page) => page.path === "/");
    expect(home?.body).toContain("/ai");
    expect(home?.body).toContain("/web3");
    expect(home?.body).toContain("/bio");
    expect(home?.body).toContain("/cv");
    expect(home?.body).not.toContain("/startups");
    expect(home?.body).not.toContain("/lead");
  });

  test("llms-full.txt omits archive blog post sections", () => {
    const full = getLlmsFull();
    expect(full).not.toContain(
      "Canonical: https://gaboesquivel.com/blog/2014-01-developing-software-in-costa-rica"
    );
    expect(full).not.toContain(
      "Canonical: https://gaboesquivel.com/blog/2019-03-ticoblockchain-2019-recap"
    );
    expect(full).not.toContain("50,000");
    expect(full).not.toContain("Series A");
    expect(full).not.toContain("RemixRun");
    expect(full).not.toContain("empowers lawyers");
  });
});
