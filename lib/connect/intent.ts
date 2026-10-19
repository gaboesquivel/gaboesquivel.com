export const EXPERIENCE_QUESTION =
  "What have you shipped, and where did you lead?";

export const CONNECT_TOOLS = ["list_slots", "book", "send"] as const;
export type ConnectTool = (typeof CONNECT_TOOLS)[number];

const BOOK_TOOLS: ConnectTool[] = ["list_slots", "book"];
const NOTE_TOOLS: ConnectTool[] = ["send"];

const bookPattern =
  /\b(book|booking|calendar|schedule|time slot|weekdays|15[-\s]?minutes?|30[-\s]?minutes?)\b/i;
const notePattern = /\b(note|email|pass along|contact@)\b/i;

export const typedNoteIntent = (text: string) => notePattern.test(text.trim());

export const noteOpener = (text: string) =>
  /^(send email|pass it along)[.!]?$/i.test(stripMarker(text));
const continuationPattern = /@|\b\d{1,2}:\d{2}\b/;

export const affirmativeBookingReply = (text: string) =>
  /^(yes|sure|ok|okay|let'?s book|yep|yeah)[.!]?$/i.test(text.trim());

export const assistantOfferedCall = (text: string) =>
  /\b(15[-\s]?or[-\s]?30[-\s]?minute|book a (15|30)|book a call|on this page)\b/i.test(
    text
  );

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

export const assistantTexts = (
  messages: readonly { content: unknown; role: string }[]
) =>
  messages.flatMap((message) => {
    if (message.role !== "assistant") return [];
    const text = contentText(message.content).trim();
    return text ? [text] : [];
  });

const connectToolsForIntent = ({
  wantsBook,
  wantsNote,
}: {
  wantsBook: boolean;
  wantsNote: boolean;
}) => {
  if (!wantsBook && !wantsNote) return null;
  if (wantsBook && wantsNote) return [...CONNECT_TOOLS];
  if (wantsNote) return [...NOTE_TOOLS];
  return [...BOOK_TOOLS];
};

export const toolsForTurn = ({
  assistantTexts: priorAssistant = [],
  texts,
}: {
  assistantTexts?: string[];
  texts: string[];
}) => {
  const cleaned = texts
    .map(stripMarker)
    .map((text) => text.trim())
    .filter(Boolean);
  const latestRaw = texts.at(-1) ?? "";
  const latestMarker = markerIntent(latestRaw);
  if (
    cleaned.length === 1 &&
    cleaned[0] === EXPERIENCE_QUESTION &&
    latestMarker !== "book" &&
    latestMarker !== "note"
  ) {
    return null;
  }
  const earlier = cleaned.slice(0, -1).join("\n");
  const earlierMarkers = new Set(
    texts.slice(0, -1).flatMap((text) => {
      const intent = markerIntent(text);
      return intent ? [intent] : [];
    })
  );
  const latest = cleaned.at(-1) ?? "";
  let wantsBook = latestMarker === "book" || bookPattern.test(latest);
  let wantsNote = latestMarker === "note" || notePattern.test(latest);
  if (continuationPattern.test(latest)) {
    if (earlierMarkers.has("book") || bookPattern.test(earlier))
      wantsBook = true;
    if (earlierMarkers.has("note") || notePattern.test(earlier))
      wantsNote = true;
  }
  if (
    affirmativeBookingReply(latest) &&
    priorAssistant.some((text) => assistantOfferedCall(text))
  ) {
    wantsBook = true;
  }
  return connectToolsForIntent({ wantsBook, wantsNote });
};

export const isMcpChannel = (kind?: string) => kind?.includes("mcp") ?? false;

export const sessionIp = (attributes: unknown) => {
  if (!attributes || typeof attributes !== "object" || !("ip" in attributes)) {
    return "unknown";
  }
  const ip = attributes.ip;
  return typeof ip === "string" && ip.length > 0 ? ip : "unknown";
};

export const sessionCapsEnforced = (attributes: unknown) => {
  if (
    !attributes ||
    typeof attributes !== "object" ||
    !("capsEnforced" in attributes)
  ) {
    return true;
  }
  const value = attributes.capsEnforced;
  if (typeof value === "string") return value !== "0" && value !== "false";
  return true;
};

export const channelMessage = ({
  mode,
  text,
  timeZone,
}: {
  mode: "book" | "note";
  text: string;
  timeZone: string;
}) => (text.includes("[site:") ? text : `[site:${mode} ${timeZone}]\n${text}`);

export const visitorZone = (texts: string[]) => {
  for (const text of texts) {
    const match = text.match(/\[site:(?:book|note|ask)\s+([^\]]+)\]/);
    if (match?.[1]) return match[1];
  }
  return "";
};

export const browserTimeZone = () =>
  new Intl.DateTimeFormat().resolvedOptions().timeZone;
