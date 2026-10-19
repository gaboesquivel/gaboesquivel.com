import { ForbiddenError, none } from "eve/channels/auth";
import { eveChannel } from "eve/channels/eve";

import { admitChat } from "../../lib/connect/caps";
import {
  capsEnforced,
  isChatTurnPost,
  readRequestIp,
  requestHost,
} from "../../lib/connect/ip";
import { liveCapStore } from "../../lib/connect/store";

const anonymous = none();

export default eveChannel({
  auth: async (request) => {
    const base = await anonymous(request);
    if (!base) return null;
    const ip = readRequestIp(request);
    const capsEnforcedForHost = capsEnforced({ host: requestHost(request) });
    if (isChatTurnPost(request)) {
      const admitted = await admitChat({
        enforce: capsEnforcedForHost,
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
      attributes: {
        ...base.attributes,
        capsEnforced: capsEnforcedForHost ? "1" : "0",
        ip,
      },
    };
  },
  onMessage: ({ eve }) => {
    const capsEnforcedForHost = capsEnforced({
      host: requestHost(eve.request),
    });
    return {
      auth: eve.caller
        ? {
            ...eve.caller,
            attributes: {
              ...eve.caller.attributes,
              capsEnforced: capsEnforcedForHost ? "1" : "0",
              ip: readRequestIp(eve.request),
            },
          }
        : null,
    };
  },
});
