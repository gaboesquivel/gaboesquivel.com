export const SONNET_GATEWAY_MODEL = "anthropic/claude-sonnet-5.5";

export const defaultEveAgentModel = () =>
  process.env.EVE_AGENT_MODEL?.trim() ?? SONNET_GATEWAY_MODEL;
