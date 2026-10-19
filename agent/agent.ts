import { defineAgent, defineDynamic } from "eve";

import { haikuSessionSelection } from "../lib/connect/haiku-model";

export default defineAgent({
  defaultTools: false,
  model: defineDynamic({
    events: {
      "session.started": () =>
        haikuSessionSelection({
          anthropicApiKey: process.env.ANTHROPIC_API_KEY,
        }),
    },
  }),
  tool: false,
});
