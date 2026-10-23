import { describe, expect, test } from "bun:test";

import { capabilityRegistry } from "../capabilities/registry";
import { PUBLIC_MCP_APP_RESOURCE_URI } from "./constants";
import { connectPublicMcpInMemory } from "./in-memory-client";
import { mcpJsonRpcRequest, mcpJsonRpcResult } from "./jsonrpc";
import { handlePublicMcpRequest } from "./public-server";

const post = (body: Record<string, unknown>) =>
  mcpJsonRpcRequest({ body, handler: handlePublicMcpRequest });

describe("public MCP protocol (HTTP)", () => {
  test("initialize returns protocol version and capabilities", async () => {
    const response = await post({
      id: 1,
      jsonrpc: "2.0",
      method: "initialize",
      params: {
        capabilities: {},
        clientInfo: { name: "test", version: "1.0.0" },
        protocolVersion: "2025-03-26",
      },
    });
    expect(response.status).toBe(200);
    const body = await mcpJsonRpcResult<{
      protocolVersion: string;
      serverInfo: { name: string };
    }>(response);
    expect(body.error).toBeUndefined();
    expect(body.result?.serverInfo.name).toBe("gaboesquivel");
  });

  test("tools/list exposes all nine capability tools", async () => {
    const init = await post({
      id: 1,
      jsonrpc: "2.0",
      method: "initialize",
      params: {
        capabilities: {},
        clientInfo: { name: "test", version: "1.0.0" },
        protocolVersion: "2025-03-26",
      },
    });
    expect((await mcpJsonRpcResult(init)).result).toBeTruthy();

    const response = await post({
      id: 2,
      jsonrpc: "2.0",
      method: "tools/list",
      params: {},
    });
    const body = await mcpJsonRpcResult<{
      tools: { name: string; description?: string }[];
    }>(response);
    const names = body.result?.tools?.map((tool) => tool.name).sort() ?? [];
    expect(names).toEqual(Object.keys(capabilityRegistry).sort());
    expect(names).toHaveLength(9);
  });

  test("tools/call get_profile returns structured content", async () => {
    await post({
      id: 1,
      jsonrpc: "2.0",
      method: "initialize",
      params: {
        capabilities: {},
        clientInfo: { name: "test", version: "1.0.0" },
        protocolVersion: "2025-03-26",
      },
    });
    const response = await post({
      id: 2,
      jsonrpc: "2.0",
      method: "tools/call",
      params: { arguments: {}, name: "get_profile" },
    });
    const body = await mcpJsonRpcResult<{
      content: { text: string; type: string }[];
      structuredContent?: { status?: string };
    }>(response);
    expect(body.error).toBeUndefined();
    expect(body.result?.content[0]?.type).toBe("text");
    expect(body.result?.structuredContent?.status).toBeDefined();
  });

  test("tools/call rejects unknown tools", async () => {
    await post({
      id: 1,
      jsonrpc: "2.0",
      method: "initialize",
      params: {
        capabilities: {},
        clientInfo: { name: "test", version: "1.0.0" },
        protocolVersion: "2025-03-26",
      },
    });
    const response = await post({
      id: 2,
      jsonrpc: "2.0",
      method: "tools/call",
      params: { arguments: {}, name: "admin_panel" },
    });
    const body = await mcpJsonRpcResult<{
      content?: { text: string }[];
      isError?: boolean;
    }>(response);
    const failed =
      Boolean(body.error) ||
      body.result?.isError === true ||
      /unknown|not found/i.test(body.result?.content?.[0]?.text ?? "");
    expect(failed).toBe(true);
  });

  test("tools/call rejects invalid arguments", async () => {
    await post({
      id: 1,
      jsonrpc: "2.0",
      method: "initialize",
      params: {
        capabilities: {},
        clientInfo: { name: "test", version: "1.0.0" },
        protocolVersion: "2025-03-26",
      },
    });
    const response = await post({
      id: 2,
      jsonrpc: "2.0",
      method: "tools/call",
      params: { arguments: { focus: "not-a-focus" }, name: "get_cv" },
    });
    const body = await mcpJsonRpcResult(response);
    expect(body.error ?? body.result).toBeTruthy();
  });

  test("resources/read serves placeholder MCP App HTML", async () => {
    await post({
      id: 1,
      jsonrpc: "2.0",
      method: "initialize",
      params: {
        capabilities: {},
        clientInfo: { name: "test", version: "1.0.0" },
        protocolVersion: "2025-03-26",
      },
    });
    const response = await post({
      id: 2,
      jsonrpc: "2.0",
      method: "resources/read",
      params: { uri: PUBLIC_MCP_APP_RESOURCE_URI },
    });
    const body = await mcpJsonRpcResult<{
      contents: { mimeType: string; text: string }[];
    }>(response);
    expect(body.result?.contents?.[0]?.mimeType).toBe(
      "text/html;profile=mcp-app"
    );
    expect(body.result?.contents?.[0]?.text).toContain("MCP App");
  });

  test("resources/read rejects unknown URIs", async () => {
    await post({
      id: 1,
      jsonrpc: "2.0",
      method: "initialize",
      params: {
        capabilities: {},
        clientInfo: { name: "test", version: "1.0.0" },
        protocolVersion: "2025-03-26",
      },
    });
    const response = await post({
      id: 2,
      jsonrpc: "2.0",
      method: "resources/read",
      params: { uri: "ui://evil/app" },
    });
    const body = await mcpJsonRpcResult(response);
    expect(body.error).toBeTruthy();
  });
});

describe("public MCP protocol (in-memory client)", () => {
  test("client lists tools after initialize", async () => {
    const { client } = await connectPublicMcpInMemory();
    const tools = await client.listTools();
    expect(tools.tools).toHaveLength(9);
  });

  test("client calls get_cv read tool", async () => {
    const { client } = await connectPublicMcpInMemory();
    const result = await client.callTool({ arguments: {}, name: "get_cv" });
    expect(result.content?.[0]?.type).toBe("text");
  });
});
