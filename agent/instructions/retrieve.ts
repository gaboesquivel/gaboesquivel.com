import { defineDynamic, defineInstructions } from "eve/instructions";

import index from "../../generated/agent-index.json";
import bodies from "../../generated/markdown-routes.json";
import { admitChatOnce } from "../../lib/connect/caps";
import {
  isMcpChannel,
  sessionIp,
  userTexts,
  visitorZone,
} from "../../lib/connect/intent";
import { rankSections } from "../../lib/connect/rank";
import type { RankSection } from "../../lib/connect/rank";
import { liveCapStore } from "../../lib/connect/store";

const sections = index as RankSection[];
const corpus = bodies as Record<string, string>;

export default defineDynamic({
  events: {
    "turn.started": async (_event, ctx) => {
      const texts = userTexts(ctx.messages);
      const question = texts
        .map((text) =>
          text.replace(/\[site:(?:book|note|ask)\s+[^\]]+\]\n?/g, "")
        )
        .join("\n");
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

      const ranked = question.trim()
        ? rankSections({ bodies: corpus, question, sections })
        : { paste: "", paths: [] };
      const zone = visitorZone(texts);
      const lines = [
        zone
          ? `Visitor time zone: ${zone}. Do not assume America/Denver.`
          : "No visitor time zone was provided. If they name a clock time, ask which zone.",
        ranked.paste,
      ].filter(Boolean);
      if (!ranked.paste && !zone) return null;
      return defineInstructions({
        content: lines.join("\n\n"),
        role: "user",
      });
    },
  },
});
