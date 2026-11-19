import type { z } from "zod";

import { recordContactAction } from "../measurement/record";
import { bookCallCapability } from "./book-call";
import { contactGabo } from "./contact-gabo";
import { getCv } from "./get-cv";
import { getProfile } from "./get-profile";
import { listAvailability } from "./list-availability";
import { listProjects } from "./list-projects";
import { listWriting } from "./list-writing";
import {
  bookCallInput,
  contactGaboInput,
  getCvInput,
  getProfileInput,
  listAvailabilityInput,
  listProjectsInput,
  listWritingInput,
  searchSiteInput,
  sendNoteInput,
} from "./schemas";
import { searchSite } from "./search-site";
import { sendNoteCapability } from "./send-note";
import type { CapabilityContext } from "./types";

type CapabilityKind = "read" | "write";

interface CapabilityEntry {
  description: string;
  execute: (args: {
    context: CapabilityContext;
    input: unknown;
  }) => Promise<unknown> | unknown;
  inputSchema: z.ZodType;
  kind: CapabilityKind;
  name: string;
}

export const capabilityRegistry: Record<string, CapabilityEntry> = {
  book_call: {
    description: "Book a 15- or 30-minute call after validation.",
    execute: bookCallCapability,
    inputSchema: bookCallInput,
    kind: "write",
    name: "book_call",
  },
  contact_gabo: {
    description: "Public contact descriptor and verified context.",
    execute: contactGabo,
    inputSchema: contactGaboInput,
    kind: "read",
    name: "contact_gabo",
  },
  get_cv: {
    description: "CV download metadata for a focus variant.",
    execute: getCv,
    inputSchema: getCvInput,
    kind: "read",
    name: "get_cv",
  },
  get_profile: {
    description: "Verified profile and contextual links.",
    execute: getProfile,
    inputSchema: getProfileInput,
    kind: "read",
    name: "get_profile",
  },
  list_availability: {
    description: "Open booking slots for a visitor time zone.",
    execute: listAvailability,
    inputSchema: listAvailabilityInput,
    kind: "read",
    name: "list_availability",
  },
  list_projects: {
    description: "Package-owned project records.",
    execute: listProjects,
    inputSchema: listProjectsInput,
    kind: "read",
    name: "list_projects",
  },
  list_writing: {
    description: "Published writing records.",
    execute: listWriting,
    inputSchema: listWritingInput,
    kind: "read",
    name: "list_writing",
  },
  search_site: {
    description: "Deterministic search over the public corpus.",
    execute: searchSite,
    inputSchema: searchSiteInput,
    kind: "read",
    name: "search_site",
  },
  send_note: {
    description: "Send a contact note through Resend.",
    execute: sendNoteCapability,
    inputSchema: sendNoteInput,
    kind: "write",
    name: "send_note",
  },
};

export const runCapability = async ({
  context,
  input,
  name,
}: {
  context: CapabilityContext;
  input: unknown;
  name: string;
}) => {
  const entry = capabilityRegistry[name];
  if (!entry) {
    throw new Error(`unknown-capability:${name}`);
  }
  const parsed = entry.inputSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "invalid-input");
  }
  const result = await entry.execute({ context, input: parsed.data });
  recordCapabilityContact({ context, name, result });
  return result;
};

const CONTACT_CAPABILITIES: Record<string, "call_booked" | "note_sent"> = {
  book_call: "call_booked",
  send_note: "note_sent",
};

/** Confirmed notes and bookings count once per provider id, so replays add nothing. */
const recordCapabilityContact = ({
  context,
  name,
  result,
}: {
  context: CapabilityContext;
  name: string;
  result: unknown;
}) => {
  const event = CONTACT_CAPABILITIES[name];
  const outcome = result as {
    data?: { eventId?: unknown; receiptId?: unknown } | null;
    requestId?: string;
    status?: string;
  } | null;
  if (!event || !context.measure || outcome?.status !== "confirmed") return;
  const data = outcome.data ?? {};
  const providerId = data.eventId ?? data.receiptId;
  // Without a provider id, the request id still keeps one request from counting twice.
  const dedupeId =
    typeof providerId === "string" && providerId
      ? providerId
      : `request:${outcome.requestId ?? context.correlationId}`;
  recordContactAction({
    channel: context.measure.channel,
    country: context.measure.country,
    dedupeId,
    event,
    userAgent: context.measure.userAgent,
  });
};
