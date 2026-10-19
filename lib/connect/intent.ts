export const EXPERIENCE_QUESTION =
  "What have you shipped, and where did you lead?";

export const CONNECT_TOOLS = ["list_slots", "book", "send"] as const;

const bookPattern =
  /\b(book|booking|calendar|schedule|time slot|weekdays|15[-\s]?minutes?|30[-\s]?minutes?)\b/i;
const notePattern = /\b(note|email|pass along|contact@)\b/i;
const continuationPattern = /@|\b\d{1,2}:\d{2}\b/;

export const markerIntent = (text: string) => {
  const match = text.match(/\[site:(book|note|ask)\s+[^\]]+\]/);
  return match?.[1];
};

export const stripMarker = (text: string) =>
  text.replace(/\[site:(?:book|note|ask)\s+[^\]]+\]\n?/g, "").trim();

const contentText = (content: unknown) => {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (!part || typeof part !== "object" || !("text" in part)) return "";
      return typeof part.text === "string" ? part.text : "";
    })
    .join("\n");
};

export const userTexts = (
  messages: readonly { content: unknown; role: string }[]
) =>
  messages.flatMap((message) => {
    if (message.role !== "user") return [];
    const text = contentText(message.content).trim();
    if (!text || text.startsWith("Published sections")) return [];
    if (text.startsWith("{") && text.includes("timeZone")) return [];
    return [text];
  });

export const toolsForTurn = ({ texts }: { texts: string[] }) => {
  const cleaned = texts
    .map(stripMarker)
    .map((text) => text.trim())
    .filter(Boolean);
  const markers = new Set(
    texts.flatMap((text) => {
      const intent = markerIntent(text);
      return intent ? [intent] : [];
    })
  );
  if (
    cleaned.length === 1 &&
    cleaned[0] === EXPERIENCE_QUESTION &&
    !markers.has("book") &&
    !markers.has("note")
  ) {
    return null;
  }
  if (markers.has("book") || markers.has("note")) return CONNECT_TOOLS;
  const joined = cleaned.join("\n");
  if (bookPattern.test(joined) || notePattern.test(joined))
    return CONNECT_TOOLS;
  const earlier = cleaned.slice(0, -1).join("\n");
  const latest = cleaned.at(-1) ?? "";
  if (
    continuationPattern.test(latest) &&
    (bookPattern.test(earlier) || notePattern.test(earlier))
  ) {
    return CONNECT_TOOLS;
  }
  return null;
};

export const isMcpChannel = (kind?: string) => kind?.includes("mcp") ?? false;

export const sessionIp = (attributes: unknown) => {
  if (!attributes || typeof attributes !== "object" || !("ip" in attributes)) {
    return "unknown";
  }
  const ip = attributes.ip;
  return typeof ip === "string" && ip.length > 0 ? ip : "unknown";
};

export const visitorZone = (texts: string[]) => {
  for (const text of texts) {
    const match = text.match(/\[site:(?:book|note|ask)\s+([^\]]+)\]/);
    if (match?.[1]) return match[1];
  }
  return "";
};
