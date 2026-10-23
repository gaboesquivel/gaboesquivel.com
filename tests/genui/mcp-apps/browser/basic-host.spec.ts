import { existsSync } from "node:fs";
import { join } from "node:path";

import { expect, test } from "@playwright/test";

const basicHostDist = join(
  process.cwd(),
  "tests/genui/mcp-apps/vendor/basic-host/dist/index.html"
);
const mcpPort = process.env.MCP_TEST_PORT ?? "3101";
const hostPort = process.env.MCP_BASIC_HOST_PORT ?? "8080";

const vendorReady = existsSync(basicHostDist);

test.describe("official basic-host integration", () => {
  test.skip(
    !vendorReady,
    "Run `bun run mcp-apps:ensure-basic-host` to build the official reference host"
  );

  test("loads host UI and lists configured MCP server", async ({ page }) => {
    await page.goto(`http://localhost:${hostPort}/index.html`);
    await expect(page.locator("title")).toHaveText(/MCP Apps Host/i);
    const servers = await page.request.get(
      `http://localhost:${hostPort}/api/servers`
    );
    const urls = (await servers.json()) as string[];
    expect(urls.some((url) => url.includes(String(mcpPort)))).toBe(true);
  });
});
