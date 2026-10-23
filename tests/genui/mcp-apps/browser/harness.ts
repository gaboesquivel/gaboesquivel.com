import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

export const mcpHostLabPath = ({
  capabilityProfile,
  mcpUrl,
}: {
  capabilityProfile?: "full" | "read-only";
  mcpUrl?: string;
} = {}) => {
  const params = new URLSearchParams();
  if (capabilityProfile) params.set("capabilities", capabilityProfile);
  if (mcpUrl) params.set("mcp", mcpUrl);
  const query = params.toString();
  return `/genui-lab/mcp-host${query ? `?${query}` : ""}`;
};

export const gotoMcpHostLab = async (
  page: Page,
  options?: Parameters<typeof mcpHostLabPath>[0]
) => page.goto(mcpHostLabPath(options));

export const connectMcpHostLab = async (page: Page) => {
  await page.getByTestId("mcp-host-connect").click();
  await expect(page.getByTestId("mcp-host-initialized")).toHaveText(
    "bridge-initialized",
    { timeout: 15_000 }
  );
};
