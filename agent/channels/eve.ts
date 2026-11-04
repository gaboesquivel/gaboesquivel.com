import { disableRoute } from "eve/channels";

// No browser UI talks to the agent over HTTP: homepage GenUI uses
// `/api/genui/compose`, and agents use the MCP channel at `/mcp`. Disabling
// this slot removes the default `/eve/v1` surface instead of exposing it.
export default disableRoute();
