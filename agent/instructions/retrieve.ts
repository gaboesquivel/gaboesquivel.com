import { defineDynamic, defineInstructions } from "eve/instructions";

import { admitChatOnce } from "../../lib/connect/caps";
import {
  isMcpChannel,
  sessionIp,
  userTexts,
  visitorZone,
} from "../../lib/connect/intent";
import { liveCapStore } from "../../lib/connect/store";

export default defineDynamic({
  events: {
    "turn.started": async (_event, ctx) => {
      const texts = userTexts(ctx.messages);
      const mcp =
        isMcpChannel(ctx.channel.kind) ||
        isMcpChannel(ctx.conversation?.channel.kind);
      if (mcp) {
        const admitted = await admitChatOnce({
          ip: sessionIp(ctx.session.auth.current?.attributes),
          key: `${ctx.session.id}:${ctx.messages.length}`,
          now: new Date(),
          store: liveCapStore(),
        });
        if (!admitted.ok) {
          return defineInstructions({
            content: `${admitted.message}\nReply with only that sentence.`,
            role: "user",
          });
        }
      }

      const zone = visitorZone(texts);
      if (!zone) return null;
      return defineInstructions({
        content: `Visitor time zone: ${zone}. Do not assume America/Denver.`,
        role: "user",
      });
    },
  },
});
