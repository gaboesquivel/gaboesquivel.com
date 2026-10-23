import { describe, expect, test } from "bun:test";

import { capabilityRegistry } from "../capabilities/registry";
import { createPublicMcpServer } from "./public-server";

describe("public MCP server", () => {
  test("registers nine capability tools", () => {
    const server = createPublicMcpServer({ ip: "127.0.0.1" });
    expect(server).toBeTruthy();
    expect(Object.keys(capabilityRegistry)).toHaveLength(9);
  });
});
