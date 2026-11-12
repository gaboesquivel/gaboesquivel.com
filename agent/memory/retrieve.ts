import { defineMemory, defineMemoryProvider } from "eve/memory";

import index from "../../generated/agent-index.json";
import bodies from "../../generated/markdown-routes.json";
import {
  stripSiteMarkers,
  userTexts,
  visitorZone,
} from "../../lib/connect/intent";
import { rankSections } from "../../lib/connect/rank";
import type { RankSection } from "../../lib/connect/rank";

const sections = index as RankSection[];
const corpus = bodies as Record<string, string>;

const retrieveMemory = () =>
  defineMemoryProvider({
    recall: {
      "turn.started": (ctx) => {
        const texts = userTexts(ctx.turn.input);
        const question = texts.map(stripSiteMarkers).join("\n");
        const ranked = question.trim()
          ? rankSections({ bodies: corpus, question, sections })
          : { paste: "", paths: [] as string[] };
        const zone = visitorZone(texts);
        const lines = [
          zone
            ? `Visitor time zone: ${zone}. Do not assume America/Denver.`
            : "",
          ranked.paste,
        ].filter(Boolean);
        if (lines.length === 0) return null;
        return {
          messages: [{ content: lines.join("\n\n"), id: "published-sections" }],
        };
      },
    },
  });

export default defineMemory({
  description: "Published pages for the question that opened this turn.",
  provider: retrieveMemory(),
  scope: ({ session }) => session.id || "site",
  visibility: "session",
});
