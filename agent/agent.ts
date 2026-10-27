import { defineAgent } from "eve";

import { defaultEveAgentModel } from "../lib/connect/sonnet-model";

export default defineAgent({
  defaultTools: false,
  model: defaultEveAgentModel(),
  tool: false,
});
