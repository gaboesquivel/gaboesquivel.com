import { memoryCapStore } from "../../../../lib/connect/caps.ts";
import { composeQuery } from "../../../../lib/genui/compose.ts";

const context = () => ({
  calendar: {
    freeBusy: async () => [],
    get: async () => null,
    insert: async () => ({ id: "evt-1" }),
  },
  clock: new Date("2026-10-19T15:00:00.000Z"),
  correlationId: "promptfoo-offline",
  ip: "127.0.0.1",
  mailer: async () => ({}),
  rateLimitEnforced: false,
  store: memoryCapStore(),
});

export default class GenuiComposeProvider {
  constructor(options) {
    this.options = options ?? {};
  }

  id() {
    return this.options.providerId ?? "genui-compose";
  }

  async callApi(prompt) {
    if (this.options.mode === "live" && process.env.GENUI_EVAL_LIVE !== "1") {
      return {
        error:
          "Live evaluation requires GENUI_EVAL_LIVE=1 and provider credentials.",
      };
    }

    const result = await composeQuery({
      context: context(),
      input: {
        clientRequestId: "promptfoo",
        query: String(prompt),
        version: 1,
      },
    });

    const complete = result.events.find((event) => event.type === "complete");
    const envelope = complete?.type === "complete" ? complete.envelope : null;

    return {
      output: JSON.stringify({
        envelope,
        jevCalls: result.jevCalls,
        modelCalls: result.modelCalls,
        tier: result.tier,
      }),
    };
  }
}
