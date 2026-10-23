import type { McpUiHostCapabilities } from "@modelcontextprotocol/ext-apps";

export type McpHostCapabilityProfile = "full" | "read-only";

export const mcpHostCapabilitiesForProfile = (
  profile: McpHostCapabilityProfile
): McpUiHostCapabilities =>
  profile === "full" ? { logging: {}, openLinks: {}, serverTools: {} } : {};
