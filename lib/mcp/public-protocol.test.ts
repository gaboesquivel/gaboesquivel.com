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

const writeTools = new Set(["book_call", "contact_gabo", "send_note"]);

const firstText = (result: { content?: unknown }) =>
  (result.content as { text?: string }[] | undefined)?.[0]?.text ?? "";

describe("public MCP result parity", () => {
  test("tools/list declares titles, input descriptions, output schemas and annotations", async () => {
    const { client } = await connectPublicMcpInMemory();
    const { tools } = await client.listTools();
    for (const tool of tools) {
      expect(tool.title).toBeTruthy();
      expect(tool.title).not.toBe(tool.name);
      expect(tool.outputSchema?.type).toBe("object");
      const properties = (tool.inputSchema.properties ?? {}) as Record<
        string,
        { description?: string }
      >;
      const undocumented = Object.entries(properties)
        .filter(([, property]) => !property.description)
        .map(([key]) => `${tool.name}.${key}`);
      expect(undocumented).toEqual([]);
      const write = writeTools.has(tool.name);
      expect(tool.annotations?.readOnlyHint).toBe(!write);
      expect(tool.annotations?.destructiveHint).toBe(false);
    }
  });

  test("read results carry a summary, serialized JSON and structuredContent", async () => {
    const { client } = await connectPublicMcpInMemory();
    const result = await client.callTool({
      arguments: { limit: 2 },
      name: "list_projects",
    });
    expect(result.isError).toBeFalsy();
    const [summary, json] = firstText(result).split("\n\n");
    expect(summary).toMatch(/^2 projects\./);
    expect(JSON.parse(json ?? "")).toEqual(result.structuredContent);
    const data = (result.structuredContent as { data: { projects: unknown[] } })
      .data;
    expect(data.projects).toHaveLength(2);
  });

  test("get_profile summarizes the profile and no longer links /ask", async () => {
    const { client } = await connectPublicMcpInMemory();
    const result = await client.callTool({
      arguments: {},
      name: "get_profile",
    });
    const text = firstText(result);
    expect(text).toContain("Gabo Esquivel");
    expect(text).not.toContain("/ask");
    const { links } = (
      result.structuredContent as {
        data: { profile: { links: Record<string, string> } };
      }
    ).data.profile;
    expect(links.ask).toBeUndefined();
  });

  test("a bad cursor returns isError with a human message", async () => {
    const { client } = await connectPublicMcpInMemory();
    const result = await client.callTool({
      arguments: { cursor: "abc" },
      name: "list_projects",
    });
    expect(result.isError).toBe(true);
    expect(firstText(result)).toStartWith("Invalid cursor.");
    expect((result.structuredContent as { status: string }).status).toBe(
      "error"
    );
  });

  test("schema-invalid arguments return isError", async () => {
    const { client } = await connectPublicMcpInMemory();
    const result = await client.callTool({
      arguments: { focus: "not-a-focus" },
      name: "get_cv",
    });
    expect(result.isError).toBe(true);
    expect(firstText(result)).toContain("focus");
  });
});

describe("public MCP HTTP errors", () => {
  const init = JSON.stringify({
    id: 1,
    jsonrpc: "2.0",
    method: "initialize",
    params: {
      capabilities: {},
      clientInfo: { name: "test", version: "1.0.0" },
      protocolVersion: "2025-03-26",
    },
  });

  test("406 for a bad Accept header carries a JSON error", async () => {
    const response = await handlePublicMcpRequest(
      new Request("https://gaboesquivel.test/mcp", {
        body: init,
        headers: { accept: "text/html", "content-type": "application/json" },
        method: "POST",
      })
    );
    expect(response.status).toBe(406);
    expect(response.headers.get("content-type")).toContain("application/json");
    const body = (await response.json()) as { error?: { message: string } };
    expect(body.error?.message).toMatch(/Not Acceptable/);
  });

  test("400 for malformed JSON carries a JSON error", async () => {
    const response = await handlePublicMcpRequest(
      new Request("https://gaboesquivel.test/mcp", {
        body: "{nope",
        headers: {
          accept: "application/json, text/event-stream",
          "content-type": "application/json",
        },
        method: "POST",
      })
    );
    expect(response.status).toBe(400);
    const body = (await response.json()) as { error?: { message: string } };
    expect(body.error?.message).toBeTruthy();
  });
});
