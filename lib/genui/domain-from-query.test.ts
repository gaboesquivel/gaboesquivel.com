import { describe, expect, test } from "bun:test";

import { domainFromQuery } from "./domain-from-query";

describe("domainFromQuery", () => {
  test("detects AI and Spanish IA variants", () => {
    expect(domainFromQuery("Show me your AI projects")).toBe("ai");
    expect(
      domainFromQuery("Muéstrame tus proyectos de inteligencia artificial")
    ).toBe("ai");
    expect(domainFromQuery("Muéstrame todos tus proyectos de IA")).toBe("ai");
  });

  test("requires project language for agent-only browse signals", () => {
    expect(domainFromQuery("List your AI agent projects")).toBe("ai");
    expect(domainFromQuery("What is your experience building AI agents?")).toBe(
      "ai"
    );
    expect(domainFromQuery("travel agent work")).toBe(null);
  });

  test("detects web3 and all-work browse", () => {
    expect(domainFromQuery("Show me your Web3 projects")).toBe("web3");
    expect(domainFromQuery("Show me all your work")).toBe("all");
  });

  test("detects fintech browse", () => {
    expect(domainFromQuery("show me your fintech work")).toBe("fintech");
    expect(domainFromQuery("mobile banking experience")).toBe("fintech");
  });
});
