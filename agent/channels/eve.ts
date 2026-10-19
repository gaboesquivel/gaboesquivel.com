import { ForbiddenError, none } from "eve/channels/auth";
import { eveChannel } from "eve/channels/eve";

import { admitChat } from "../../lib/connect/caps";
import { isChatTurnPost, readRequestIp } from "../../lib/connect/ip";
import { liveCapStore } from "../../lib/connect/store";

const anonymous = none();

export default eveChannel({
  auth: async (request) => {
    const base = await anonymous(request);
    if (!base) return null;
    const ip = readRequestIp(request);
    if (isChatTurnPost(request)) {
      const admitted = await admitChat({
        ip,
        now: new Date(),
        store: liveCapStore(),
      });
      if (!admitted.ok) {
        throw new ForbiddenError({
          code: "chat_cap",
          message: admitted.message,
        });
      }
    }
    return {
      ...base,
      attributes: { ...base.attributes, ip },
    };
  },
  onMessage: ({ eve }) => ({
    auth: eve.caller
      ? {
          ...eve.caller,
          attributes: {
            ...eve.caller.attributes,
            ip: readRequestIp(eve.request),
          },
        }
      : null,
  }),
});
