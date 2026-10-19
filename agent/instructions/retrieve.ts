import { defineDynamic, defineInstructions } from "eve/instructions";

import { admitChatOnce } from "../../lib/connect/caps";
import { parseNoteFormPayload } from "../../lib/connect/compose";
import {
  isMcpChannel,
  sessionCapsEnforced,
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
          enforce: sessionCapsEnforced(ctx.session.auth.current?.attributes),
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
      const formNote = parseNoteFormPayload(texts.at(-1) ?? "");
      const visitorFacing =
        " Speak only to the visitor. Never mention code, files, tools, approval, or how the site is built. Never ask them to reload, refresh, or start a new session. Keep answering in this conversation.";
      const formTurn = formNote
        ? " The visitor submitted the note form. Call send with their fields. Do not greet, summarize the note, or quote their Discuss text. After the tool succeeds, do not add a reply. If they write again, answer that message here."
        : "";
      return defineInstructions({
        content: `Visitor time zone: ${zone}. Do not assume America/Denver.${visitorFacing}${formTurn}`,
      });
    },
  },
});
