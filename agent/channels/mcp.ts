import { none } from "eve/channels/auth";
import { mcpChannel } from "eve/channels/mcp";

import { readRequestIp } from "../../lib/connect/ip";

const anonymous = none();

export default mcpChannel({
  auth: async (request) => {
    const base = await anonymous(request);
    if (!base) return null;
    return {
      ...base,
      attributes: { ...base.attributes, ip: readRequestIp(request) },
    };
  },
  route: "/mcp",
});
