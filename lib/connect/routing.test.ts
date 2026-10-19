import { describe, expect, test } from "bun:test";

import { jevEvaluatorConfig } from "./compose";
import { HAIKU_GATEWAY_MODEL, haikuSessionSelection } from "./haiku-model";

describe("connect model routing", () => {
  test("Haiku uses gateway Anthropic-only BYOK", () => {
    const selection = haikuSessionSelection({
      anthropicApiKey: "sk-ant-test",
    });
    expect(selection.model).toBe(HAIKU_GATEWAY_MODEL);
    expect(selection.modelOptions.providerOptions.gateway).toEqual({
      byok: { anthropic: [{ apiKey: "sk-ant-test" }] },
      caching: "auto",
      only: ["anthropic"],
    });
    expect(() => haikuSessionSelection({ anthropicApiKey: "" })).toThrow(
      /ANTHROPIC_API_KEY/
    );
    expect(() => haikuSessionSelection({ anthropicApiKey: "   " })).toThrow(
      /ANTHROPIC_API_KEY/
    );
  });

  test("Jev uses AI_GATEWAY_API_KEY only", () => {
    const previous = process.env.AI_GATEWAY_API_KEY;
    const previousAnthropic = process.env.ANTHROPIC_API_KEY;
    process.env.AI_GATEWAY_API_KEY = "gw-test-key";
    process.env.ANTHROPIC_API_KEY = "sk-ant-should-not-use";
    expect(jevEvaluatorConfig()).toEqual({
      apiKey: "gw-test-key",
      model: "typesafe-ai/jev",
    });
    process.env.AI_GATEWAY_API_KEY = "";
    expect(jevEvaluatorConfig()).toBeNull();
    process.env.AI_GATEWAY_API_KEY = previous;
    process.env.ANTHROPIC_API_KEY = previousAnthropic;
  });
});
