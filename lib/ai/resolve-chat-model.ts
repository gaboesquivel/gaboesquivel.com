import { createAnthropic } from "@ai-sdk/anthropic";
import type { LanguageModel } from "ai";

import { SONNET_GATEWAY_MODEL } from "../connect/sonnet-model";

const defaultChatModel = () =>
  process.env.EVE_AGENT_MODEL?.trim() ?? SONNET_GATEWAY_MODEL;

export const resolveChatModel = (): LanguageModel | null => {
  const gatewayKey = process.env.AI_GATEWAY_API_KEY?.trim();
  if (gatewayKey) return defaultChatModel();

  const allowDirect = process.env.FLOW_ALLOW_DIRECT_ANTHROPIC?.trim() === "1";
  const anthropicKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (allowDirect && anthropicKey)
    return createAnthropic({ apiKey: anthropicKey })(
      defaultChatModel().replace(/^anthropic\//u, "")
    );

  return null;
};

export const chatUnavailableResolution = () =>
  "Set AI_GATEWAY_API_KEY for Vercel AI Gateway, or FLOW_ALLOW_DIRECT_ANTHROPIC=1 with ANTHROPIC_API_KEY for local override.";
