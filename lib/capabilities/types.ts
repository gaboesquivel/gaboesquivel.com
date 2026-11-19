import type { CalendarClient } from "../connect/calendar";
import type { CapStore } from "../connect/caps";
import type { NoteMailer } from "../connect/email";

export const CAPABILITY_VERSION = 1;

export type ReadOutcome = "ok" | "empty" | "error";

export type WriteOutcome = "pending" | "confirmed" | "uncertain" | "failed";

export interface CapabilityResult<T> {
  data: T;
  message: string;
  operation: string;
  requestId: string;
  retryGuidance?: string;
  status: ReadOutcome | WriteOutcome;
  version: typeof CAPABILITY_VERSION;
}

export interface CapabilityContext {
  calendar: CalendarClient;
  clock: Date;
  correlationId: string;
  ip: string;
  mailer: NoteMailer;
  /** Where contact actions are attributed (docs/specs/005); absent means not counted. */
  measure?: {
    channel: "mcp" | "site";
    country: string;
    userAgent?: string | null;
  };
  rateLimitEnforced: boolean;
  store: CapStore | null;
}
