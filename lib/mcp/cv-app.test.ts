import { describe, expect, test } from "bun:test";

import { handleCvMcpRequest } from "./cv-app";
import { CV_APP_RESOURCE_URI, cvAppWidgetHtml } from "./cv-app-widget-html";

const mcpHeaders = {
  accept: "application/json, text/event-stream",
  "content-type": "application/json",
};

describe("cv MCP App", () => {
  test("widget HTML references tool result rendering", () => {
    expect(cvAppWidgetHtml()).toContain("ui/notifications/tool-result");
    expect(cvAppWidgetHtml()).toContain("Download PDF");
  });

  test("tools/list includes cv with output template", async () => {
    const response = await handleCvMcpRequest(
      new Request("https://gaboesquivel.com/mcp/cv", {
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method: "tools/list",
          params: {},
        }),
        headers: mcpHeaders,
        method: "POST",
      })
    );
    expect(response.status).toBe(200);
    const body = (await response.json()) as {
      result?: { tools?: { name: string; _meta?: Record<string, unknown> }[] };
    };
    const cv = body.result?.tools?.find((tool) => tool.name === "cv");
    expect(cv?._meta).toMatchObject({
      ui: { resourceUri: CV_APP_RESOURCE_URI },
      "openai/outputTemplate": CV_APP_RESOURCE_URI,
    });
  });

  test("resources/read serves MCP App HTML", async () => {
    const response = await handleCvMcpRequest(
      new Request("https://gaboesquivel.com/mcp/cv", {
        body: JSON.stringify({
          id: 2,
          jsonrpc: "2.0",
          method: "resources/read",
          params: { uri: CV_APP_RESOURCE_URI },
        }),
        headers: mcpHeaders,
        method: "POST",
      })
    );
    expect(response.status).toBe(200);
    const body = (await response.json()) as {
      result?: { contents?: { mimeType: string; text: string }[] };
    };
    const content = body.result?.contents?.[0];
    expect(content?.mimeType).toBe("text/html;profile=mcp-app");
    expect(content?.text).toContain("Download PDF");
  });
});
