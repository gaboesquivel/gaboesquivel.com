import { defineAgent, defineDynamic } from "eve";

import { sonnetSessionSelection } from "../lib/connect/sonnet-model";

export default defineAgent({
  defaultTools: false,
  model: defineDynamic({
    events: {
      "session.started": () =>
        sonnetSessionSelection({
          anthropicApiKey: process.env.ANTHROPIC_API_KEY,
        }),
    },
  }),
  tool: false,
});
