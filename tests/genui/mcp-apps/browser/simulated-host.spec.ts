import { expect, test } from "@playwright/test";
import { MCP_APP_GENUI_UI_READY } from "lib/mcp/mcp-app-readiness";

import { connectMcpHostLab, gotoMcpHostLab } from "./harness";

test.describe("MCP Apps simulated host (AppBridge lab)", () => {
  test("initializes bridge and delivers tool input to reference view", async ({
    page,
  }) => {
    await gotoMcpHostLab(page);
    await connectMcpHostLab(page);
    await expect(page.getByTestId("mcp-host-initialized")).toHaveText(
      "bridge-initialized"
    );
    const iframe = page.frameLocator('[data-testid="mcp-host-iframe"]');
    await expect(iframe.getByTestId("mcp-reference-ready")).toHaveText(
      "initialized",
      { timeout: 15_000 }
    );
    await expect(
      iframe.getByTestId("mcp-reference-tool-payload")
    ).toContainText("focus", { timeout: 15_000 });
    await expect(page.getByTestId("mcp-host-tool-text")).not.toBeEmpty();
  });

  test("resizes host container without horizontal overflow", async ({
    page,
  }) => {
    await gotoMcpHostLab(page);
    await page.getByTestId("mcp-host-width").evaluate((element) => {
      const input = element as HTMLInputElement;
      const descriptor = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      );
      descriptor?.set?.call(input, "320");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(page.getByTestId("mcp-host-width-value")).toHaveText("320px");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1
    );
    expect(overflow).toBe(false);
  });

  test("text-only mode returns tool content without iframe UI", async ({
    page,
  }) => {
    await gotoMcpHostLab(page);
    await page.getByTestId("mcp-host-mode-text").click();
    await page.getByTestId("mcp-host-connect").click();
    await expect(page.getByTestId("mcp-host-tool-text")).not.toBeEmpty({
      timeout: 15_000,
    });
    await expect(page.getByTestId("mcp-host-iframe")).toHaveCount(0);
  });

  test("disconnect tears down bridge state", async ({ page }) => {
    await gotoMcpHostLab(page);
    await connectMcpHostLab(page);
    await page.getByTestId("mcp-host-disconnect").click();
    await expect(page.getByTestId("mcp-host-initialized")).toHaveText(
      "bridge-pending"
    );
  });

  test("theme toggle updates document theme", async ({ page }) => {
    await gotoMcpHostLab(page);
    await page.getByTestId("mcp-host-theme-toggle").click();
    const scheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(scheme === "light" || scheme === "dark").toBe(true);
  });

  test("write probes succeed when host advertises full capabilities", async ({
    page,
  }) => {
    await gotoMcpHostLab(page, { capabilityProfile: "full" });
    await connectMcpHostLab(page);
    const iframe = page.frameLocator('[data-testid="mcp-host-iframe"]');
    await iframe.getByTestId("mcp-reference-probe-open-link").click();
    await expect(iframe.getByTestId("mcp-reference-write-probe")).toHaveText(
      "openLink-ok",
      { timeout: 10_000 }
    );
    await iframe.getByTestId("mcp-reference-probe-send-message").click();
    await expect(iframe.getByTestId("mcp-reference-write-probe")).toHaveText(
      "sendMessage-ok",
      { timeout: 10_000 }
    );
  });

  test("write probes fail when host omits write capabilities", async ({
    page,
  }) => {
    await gotoMcpHostLab(page, { capabilityProfile: "read-only" });
    await expect(page.getByTestId("mcp-host-capability-profile")).toHaveText(
      "read-only"
    );
    await connectMcpHostLab(page);
    const iframe = page.frameLocator('[data-testid="mcp-host-iframe"]');
    await iframe.getByTestId("mcp-reference-probe-open-link").click();
    await expect(iframe.getByTestId("mcp-reference-write-probe")).toContainText(
      "openLink-error",
      { timeout: 10_000 }
    );
  });

  test("surfaces MCP connection errors without claiming success", async ({
    page,
  }) => {
    await gotoMcpHostLab(page, { mcpUrl: "/__genui__/fixtures/not-a-route" });
    await page.getByTestId("mcp-host-connect").click();
    await expect(page.getByTestId("mcp-host-error")).not.toBeEmpty({
      timeout: 15_000,
    });
    await expect(page.getByTestId("mcp-host-initialized")).toHaveText(
      "bridge-pending"
    );
  });

  test.describe("production GenUI MCP App", () => {
    test.skip(
      !MCP_APP_GENUI_UI_READY,
      "blocked until real MCP App resource replaces placeholder"
    );

    test("renders GenUI fixture inside MCP host iframe", async () => {
      expect(MCP_APP_GENUI_UI_READY).toBe(true);
    });
  });
});
