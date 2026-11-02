import { z } from "zod";

/**
 * Result shapes for each capability. Objects are loose so an added field
 * never breaks a caller validating against an older schema.
 */
const nextCursor = z
  .string()
  .nullable()
  .describe("Pass as cursor to fetch the next page; null on the last page.");

const profileData = z.looseObject({
  focus: z.enum(["ai", "web3", "fullstack"]).nullable(),
  focusUrl: z.string().optional(),
  profile: z.looseObject({
    email: z.string(),
    links: z.record(z.string(), z.string()),
    location: z.string(),
    name: z.string(),
    role: z.string(),
    url: z.string(),
  }),
  sourceUrl: z.string(),
});

const capabilityDataSchemas = {
  book_call: z.looseObject({ eventId: z.string().nullish() }),
  contact_gabo: z.looseObject({
    context: profileData,
    formPath: z.string(),
    requiredFields: z.array(z.string()),
  }),
  get_cv: z.looseObject({
    filename: z.string(),
    pageUrl: z.string(),
    pdfUrl: z.string(),
    title: z.string(),
    variant: z.string(),
  }),
  get_profile: profileData,
  list_availability: z.looseObject({
    checkedAt: z.string(),
    duration: z.union([z.literal(15), z.literal(30)]).nullable(),
    starts: z.array(z.string()).describe("Open ISO 8601 start times."),
    timeZone: z.string(),
  }),
  list_projects: z.looseObject({
    nextCursor,
    projects: z.array(
      z.looseObject({
        description: z.string(),
        slug: z.string(),
        title: z.string(),
        url: z.string(),
        year: z.number().optional(),
      })
    ),
  }),
  list_writing: z.looseObject({
    nextCursor,
    posts: z.array(
      z.looseObject({
        excerpt: z.string(),
        publishedAt: z.string(),
        slug: z.string(),
        title: z.string(),
        url: z.string(),
      })
    ),
  }),
  search_site: z.looseObject({
    nextCursor,
    query: z.string(),
    results: z.array(
      z.looseObject({
        excerpt: z.string(),
        id: z.string(),
        kind: z.string(),
        title: z.string(),
        url: z.string(),
      })
    ),
  }),
  send_note: z.looseObject({ receiptId: z.string().nullish() }),
} as const;

export type CapabilityName = keyof typeof capabilityDataSchemas;

const readStatus = z.enum(["ok", "empty", "error"]);
const writeStatus = z.enum(["pending", "confirmed", "uncertain", "failed"]);

export const capabilityOutputSchema = ({
  kind,
  name,
}: {
  kind: "read" | "write";
  name: CapabilityName;
}) =>
  z.looseObject({
    data: capabilityDataSchemas[name]
      .nullable()
      .describe("Tool-specific payload; null when the call failed."),
    message: z.string().describe("Human-readable outcome."),
    operation: z.string().describe("Tool name that produced the result."),
    requestId: z.string().describe("Correlation id for support."),
    retryGuidance: z.string().optional(),
    status: (kind === "read" ? readStatus : writeStatus).describe(
      "Outcome: ok, empty, or error for reads; pending, confirmed, uncertain, or failed for writes."
    ),
    version: z.literal(1),
  });
