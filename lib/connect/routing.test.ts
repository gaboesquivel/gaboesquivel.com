import { describe, expect, test } from "bun:test";

import { SONNET_GATEWAY_MODEL, sonnetSessionSelection } from "./sonnet-model";

describe("connect model routing", () => {
  test("Sonnet uses gateway Anthropic-only BYOK", () => {
    const selection = sonnetSessionSelection({
      anthropicApiKey: "sk-ant-test",
    });
    expect(selection.model).toBe(SONNET_GATEWAY_MODEL);
    expect(selection.modelOptions.providerOptions.gateway).toEqual({
      byok: { anthropic: [{ apiKey: "sk-ant-test" }] },
      caching: "auto",
      only: ["anthropic"],
    });
    expect(() => sonnetSessionSelection({ anthropicApiKey: "" })).toThrow(
      /ANTHROPIC_API_KEY/
    );
    expect(() => sonnetSessionSelection({ anthropicApiKey: "   " })).toThrow(
      /ANTHROPIC_API_KEY/
    );
  });
});
