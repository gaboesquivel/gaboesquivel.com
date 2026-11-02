import { workTypeOptions } from "lib/work-types";
import { z } from "zod";

const cvFocus = z
  .enum(["full", "ai", "web3", "fullstack"])
  .describe("CV variant: full, ai, web3, or fullstack. Defaults to full.");
const profileFocus = z
  .enum(["ai", "web3", "fullstack"])
  .optional()
  .describe("Optional focus area: ai, web3, or fullstack.");
const projectDomain = z
  .enum(workTypeOptions)
  .optional()
  .describe("Optional work type filter, such as featured, ai, web3, or oss.");
const cursor = z
  .string()
  .min(1)
  .max(200)
  .optional()
  .describe("Opaque cursor from a previous result's nextCursor.");
const limit = z.coerce
  .number()
  .int()
  .min(1)
  .max(20)
  .default(6)
  .describe("Maximum records to return, 1 to 20. Defaults to 6.");
const retryIdentity = z
  .string()
  .min(8)
  .max(128)
  .describe(
    "Caller-chosen idempotency key, 8 to 128 characters. Reuse it with the same payload to replay the original outcome."
  );
const duration = z
  .union([z.literal(15), z.literal(30)])
  .describe("Call length in minutes: 15 or 30.");
const timeZone = z
  .string()
  .trim()
  .min(1)
  .describe("IANA time zone of the visitor, such as America/New_York.");
const name = z.string().min(1).max(200).describe("Visitor's name.");
const email = z
  .string()
  .email()
  .describe("Visitor's email address for the reply.");
const description = z
  .string()
  .min(10)
  .max(5000)
  .describe("What the visitor wants to discuss, 10 to 5000 characters.");

export const getCvInput = z.object({
  focus: cvFocus.optional(),
});

export const getProfileInput = z.object({
  focus: profileFocus,
});

export const contactGaboInput = z.object({
  focus: profileFocus,
});

export const listProjectsInput = z.object({
  cursor,
  domain: projectDomain,
  limit,
});

export const listWritingInput = z.object({
  cursor,
  domain: projectDomain,
  limit,
});

export const searchSiteInput = z.object({
  cursor,
  limit,
  query: z
    .string()
    .trim()
    .min(1)
    .max(2000)
    .describe("Search text, up to 2000 characters."),
});

export const listAvailabilityInput = z.object({
  duration: duration
    .optional()
    .describe("Optional call length in minutes: 15 or 30. Omit for both."),
  timeZone,
});

export const bookCallInput = z
  .object({
    description,
    duration,
    email,
    name,
    retryIdentity,
    start: z
      .string()
      .datetime()
      .describe("ISO 8601 start time taken from list_availability."),
    timeZone: z
      .string()
      .min(1)
      .describe("IANA time zone of the visitor, such as America/New_York."),
  })
  .strict();

export const sendNoteInput = z
  .object({
    description,
    email,
    name,
    retryIdentity,
  })
  .strict();
