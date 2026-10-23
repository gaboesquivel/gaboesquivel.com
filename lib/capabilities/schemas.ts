import { workTypeOptions } from "lib/work-types";
import { z } from "zod";

const cvFocus = z.enum(["full", "ai", "web3", "fullstack"]);
const profileFocus = z.enum(["ai", "web3", "fullstack"]).optional();
const projectDomain = z.enum(workTypeOptions).optional();
const cursor = z.string().min(1).max(200).optional();
const limit = z.coerce.number().int().min(1).max(20).default(6);
const retryIdentity = z.string().min(8).max(128);

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
  query: z.string().trim().min(1).max(2000),
});

export const listAvailabilityInput = z.object({
  duration: z.union([z.literal(15), z.literal(30)]).optional(),
  timeZone: z.string().trim().min(1),
});

export const bookCallInput = z
  .object({
    description: z.string().min(10).max(5000),
    duration: z.union([z.literal(15), z.literal(30)]),
    email: z.string().email(),
    name: z.string().min(1).max(200),
    retryIdentity,
    start: z.string().datetime(),
    timeZone: z.string().min(1),
  })
  .strict();

export const sendNoteInput = z
  .object({
    description: z.string().min(10).max(5000),
    email: z.string().email(),
    name: z.string().min(1).max(200),
    retryIdentity,
  })
  .strict();

export type GetCvInput = z.infer<typeof getCvInput>;
export type SearchSiteInput = z.infer<typeof searchSiteInput>;
