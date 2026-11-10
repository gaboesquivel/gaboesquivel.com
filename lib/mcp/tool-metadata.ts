import type { ToolAnnotations } from "@modelcontextprotocol/server";

import type { CapabilityName } from "../capabilities/output-schemas";

const read: ToolAnnotations = {
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
  readOnlyHint: true,
};

/**
 * Hosts confirm before calling these. book_call and send_note have side
 * effects outside the site (a calendar event, an email), so they are marked
 * destructive; contact_gabo only returns the contact descriptor but opens the
 * contact flow, so it is declared a non-destructive write (spec 001, item 9).
 */
const write: ToolAnnotations = {
  destructiveHint: false,
  idempotentHint: false,
  openWorldHint: true,
  readOnlyHint: false,
};

export const mcpToolMetadata: Record<
  CapabilityName,
  { annotations: ToolAnnotations; title: string }
> = {
  book_call: {
    annotations: { ...write, destructiveHint: true, idempotentHint: true },
    title: "Book a call with Gabo",
  },
  contact_gabo: {
    annotations: { ...write, idempotentHint: true, openWorldHint: false },
    title: "Contact Gabo",
  },
  get_cv: { annotations: read, title: "Get Gabo's CV" },
  get_profile: { annotations: read, title: "Get Gabo's profile" },
  list_availability: {
    annotations: { ...read, idempotentHint: false, openWorldHint: true },
    title: "List open call slots",
  },
  list_projects: { annotations: read, title: "List projects" },
  list_writing: { annotations: read, title: "List writing" },
  search_site: { annotations: read, title: "Search the site" },
  send_note: {
    annotations: { ...write, destructiveHint: true, idempotentHint: true },
    title: "Send a note to Gabo",
  },
};

interface Envelope {
  data?: unknown;
  message?: string;
  operation?: string;
  status?: string;
}

const count = (value: unknown) => (Array.isArray(value) ? value.length : 0);

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const more = (data: Record<string, unknown>) =>
  typeof data.nextCursor === "string"
    ? ` More available: pass cursor "${data.nextCursor}".`
    : "";

const titles = (items: unknown) =>
  Array.isArray(items)
    ? items
        .slice(0, 5)
        .map((item) =>
          item && typeof item === "object" && "title" in item
            ? `- ${String(item.title)}`
            : null
        )
        .filter(Boolean)
        .join("\n")
    : "";

type Data = Record<string, unknown>;

const listSummary =
  (key: string, noun: string) =>
  (data: Data): string => {
    const items = data[key];
    const lead =
      typeof data.query === "string"
        ? `${plural(count(items), noun)} for "${data.query}".`
        : `${plural(count(items), noun)}.`;
    const list = titles(items);
    return `${lead}${more(data)}${list ? `\n${list}` : ""}`;
  };

/** Write tools fall back to the capability message, which already says what happened. */
const summarizers: Record<string, (data: Data) => string | undefined> = {
  contact_gabo: (data) =>
    `Use the contact form at ${String(data.formPath)} with ${(data.requiredFields as string[]).join(", ")}. Nothing was sent.`,
  get_cv: (data) =>
    `${String(data.title)}: PDF ${String(data.pdfUrl)}, page ${String(data.pageUrl)}.`,
  get_profile: (data) => {
    const profile = data.profile as Record<string, string> | undefined;
    return profile
      ? `${profile.name}, ${profile.role}, based in ${profile.location}. Email ${profile.email}. Site ${profile.url}.`
      : undefined;
  },
  list_availability: (data) => {
    const starts = data.starts as string[];
    return starts.length
      ? `${plural(starts.length, "open slot")} in ${String(data.timeZone)}; first ${starts[0]}. Pass a start to book_call.`
      : undefined;
  },
  list_projects: listSummary("projects", "project"),
  list_writing: listSummary("posts", "post"),
  search_site: listSummary("results", "result"),
};

/** One or two plain lines a model can read before the JSON. */
const summarizeToolResult = (name: string, result: Envelope) => {
  const message = result.message ?? "Done.";
  const data =
    result.data && typeof result.data === "object"
      ? (result.data as Record<string, unknown>)
      : null;
  if (!data || result.status === "error" || result.status === "failed") {
    return message;
  }
  return summarizers[name]?.(data) ?? message;
};

/** Text content: summary, then the full structured result as JSON. */
export const toolResultText = (name: string, result: Envelope) =>
  `${summarizeToolResult(name, result)}\n\n${JSON.stringify(result)}`;
