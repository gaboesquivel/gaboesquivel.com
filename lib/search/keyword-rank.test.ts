import { describe, expect, test } from "bun:test";

import { searchSite } from "lib/capabilities/search-site";
import { getSiteSearchRecords } from "lib/site-search-records";

import { expandTerm, queryTerms, rankByKeywords } from "./keyword-rank";
import { KEYWORD_MATCH_LIMIT, rankSearchRecords } from "./rank-records";

const docs = [
  { text: "Email newsletter tooling", title: "Mail tools" },
  { text: "A voice and chat assistant for lawyers", title: "LegalAgent" },
  { text: "Notes on LLM evaluation", title: "Model notes" },
  { text: "Wallet signing and onchain settlement", title: "Wallet app" },
  { text: "Hire me or book a call", title: "Contact" },
];

const titles = (query: string) =>
  rankByKeywords({ fields: (doc) => doc, items: docs, query }).map(
    ({ item }) => item.title
  );

describe("queryTerms", () => {
  test("folds case and accents and drops stop words", () => {
    expect(queryTerms("Show me your Résumé, please")).toEqual(["resume"]);
  });
});

describe("synonyms", () => {
  test("AI, agents and LLM find each other", () => {
    expect(expandTerm("ai")).toContain("llm");
    expect(titles("AI")).toEqual(["LegalAgent", "Model notes"]);
    expect(titles("llm")).toContain("Model notes");
    expect(titles("agents")).toContain("LegalAgent");
  });

  test("hire, contact and book find each other", () => {
    expect(titles("contact")).toEqual(["Contact"]);
    expect(titles("book")).toEqual(["Contact"]);
  });

  test("web3, crypto and onchain find each other", () => {
    expect(titles("web3")).toEqual(["Wallet app"]);
    expect(titles("crypto")).toEqual(["Wallet app"]);
  });

  test("short terms match whole words only", () => {
    expect(titles("ai")).not.toContain("Mail tools");
  });
});

describe("ranking order", () => {
  test("more matched terms beat a higher single-term score", () => {
    const ranked = rankByKeywords({
      fields: (doc) => doc,
      items: [
        { text: "", title: "Wallet wallet" },
        { text: "wallet for agents", title: "Other" },
      ],
      query: "wallet agents",
    });
    expect(ranked[0]?.item.title).toBe("Other");
    expect(ranked[0]?.matched).toBe(2);
  });

  test("title hits outrank body hits; the visitor's word outranks a synonym", () => {
    const ranked = rankByKeywords({
      fields: (doc) => doc,
      items: [
        { text: "about llm work", title: "Body" },
        { text: "", title: "AI title" },
        { text: "ai in the body", title: "Exact body" },
      ],
      query: "ai",
    }).map(({ item }) => item.title);
    expect(ranked).toEqual(["AI title", "Exact body", "Body"]);
  });

  test("prefix matching supports partial typing", () => {
    expect(titles("leg")).toEqual(["LegalAgent"]);
  });

  test("type-ahead mode requires every term", () => {
    const all = rankByKeywords({
      fields: (doc) => doc,
      items: docs,
      match: "all",
      query: "wallet lawyers",
    });
    expect(all).toEqual([]);
    expect(titles("wallet lawyers")).toHaveLength(2);
  });

  test("stop-word-only queries return nothing", () => {
    expect(titles("what is the")).toEqual([]);
  });
});

describe("site search records", () => {
  test("ranks records by the same ranker as search_site", () => {
    const records = [
      { description: "Roles and CV", href: "/cv", title: "Résumé / CV" },
      { description: "Hiring or a project", href: "/contact", title: "Work" },
    ];
    expect(rankSearchRecords(records, "hire").map((r) => r.href)).toEqual([
      "/contact",
    ]);
  });
});

const results = (query: string) => {
  const result = searchSite({
    context: { correlationId: "test" } as never,
    input: { query },
  });
  return result.data?.results ?? [];
};

describe("MCP search_site recall", () => {
  test("AI returns LegalAgent and Masterbots on the first page", () => {
    const ids = results("AI").map((item) => item.id);
    expect(ids).toContain("/project/legal-agent");
    expect(ids).toContain("/project/masterbots");
  });

  test("agents returns relevant projects", () => {
    expect(results("agents").map((item) => item.id)).toContain(
      "/project/legal-agent"
    );
  });

  test("hire returns /contact titled Contact", () => {
    const first = results("hire")[0];
    expect(first).toMatchObject({ id: "/contact", title: "Contact" });
  });

  test("result fields keep the published shape (unchanged)", () => {
    expect(Object.keys(results("web3")[0] ?? {}).sort()).toEqual([
      "excerpt",
      "id",
      "kind",
      "title",
      "url",
    ]);
  });
});

describe("one record source for every search surface", () => {
  // The layout sends `getSiteSearchRecords()` to the client, where the dialog
  // and homepage keyword matches rank it with `rankSearchRecords`. MCP
  // `search_site` ranks the same agent index, so the same text gives the
  // same ordered pages.
  const records = getSiteSearchRecords();
  const queries = [
    "AI",
    "agents",
    "hire",
    "show me web3 work",
    "fintech",
    "legal agent",
    "What agentic AI products have you shipped?",
    "best pizza in Denver",
    "blog 2016",
  ];

  for (const query of queries) {
    test(`"${query}" ranks the same top results on site and in search_site`, () => {
      const site = rankSearchRecords(records, query).map((record) => [
        record.href,
        record.title,
      ]);
      const page = searchSite({
        context: { correlationId: "test" } as never,
        input: { limit: KEYWORD_MATCH_LIMIT, query },
      });
      const mcp = (page.data?.results ?? []).map((item) => [
        item.id,
        item.title,
      ]);
      expect(site).toEqual(mcp);
    });
  }

  test("the shared list has projects, posts and pages", () => {
    const kinds = new Set(records.map((record) => record.kind));
    for (const kind of ["project", "post", "page"]) {
      expect(kinds.has(kind as never)).toBe(true);
    }
  });
});
