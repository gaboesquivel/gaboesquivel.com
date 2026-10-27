import { describe, expect, test } from "bun:test";

import {
  chatUnavailableResolution,
  resolveChatModel,
} from "../ai/resolve-chat-model";
import { SONNET_GATEWAY_MODEL } from "./sonnet-model";

describe("connect model routing", () => {
  test("prefers AI Gateway when configured", () => {
    const priorGateway = process.env.AI_GATEWAY_API_KEY;
    const priorDirect = process.env.FLOW_ALLOW_DIRECT_ANTHROPIC;
    const priorAnthropic = process.env.ANTHROPIC_API_KEY;
    process.env.AI_GATEWAY_API_KEY = "gw-test";
    delete process.env.FLOW_ALLOW_DIRECT_ANTHROPIC;
    delete process.env.ANTHROPIC_API_KEY;

    expect(resolveChatModel()).not.toBeNull();

    if (priorGateway === undefined) delete process.env.AI_GATEWAY_API_KEY;
    else process.env.AI_GATEWAY_API_KEY = priorGateway;
    if (priorDirect === undefined)
      delete process.env.FLOW_ALLOW_DIRECT_ANTHROPIC;
    else process.env.FLOW_ALLOW_DIRECT_ANTHROPIC = priorDirect;
    if (priorAnthropic === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = priorAnthropic;
  });

  test("allows direct Anthropic only with explicit override", () => {
    const priorGateway = process.env.AI_GATEWAY_API_KEY;
    const priorDirect = process.env.FLOW_ALLOW_DIRECT_ANTHROPIC;
    const priorAnthropic = process.env.ANTHROPIC_API_KEY;
    delete process.env.AI_GATEWAY_API_KEY;
    process.env.FLOW_ALLOW_DIRECT_ANTHROPIC = "1";
    process.env.ANTHROPIC_API_KEY = "sk-ant-test";

    expect(resolveChatModel()).not.toBeNull();

    delete process.env.AI_GATEWAY_API_KEY;
    delete process.env.FLOW_ALLOW_DIRECT_ANTHROPIC;
    expect(resolveChatModel()).toBeNull();

    if (priorGateway === undefined) delete process.env.AI_GATEWAY_API_KEY;
    else process.env.AI_GATEWAY_API_KEY = priorGateway;
    if (priorDirect === undefined)
      delete process.env.FLOW_ALLOW_DIRECT_ANTHROPIC;
    else process.env.FLOW_ALLOW_DIRECT_ANTHROPIC = priorDirect;
    if (priorAnthropic === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = priorAnthropic;
  });

  test("default model id matches site pin", () => {
    const prior = process.env.EVE_AGENT_MODEL;
    delete process.env.EVE_AGENT_MODEL;
    expect(SONNET_GATEWAY_MODEL).toBe("anthropic/claude-sonnet-5.5");
    if (prior === undefined) delete process.env.EVE_AGENT_MODEL;
    else process.env.EVE_AGENT_MODEL = prior;
  });

  test("unavailable resolution names gateway and override", () => {
    expect(chatUnavailableResolution()).toMatch(/AI_GATEWAY_API_KEY/);
    expect(chatUnavailableResolution()).toMatch(/FLOW_ALLOW_DIRECT_ANTHROPIC/);
  });
});
