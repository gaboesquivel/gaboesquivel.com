import { googleCalendar } from "../connect/calendar";
import { resendNote } from "../connect/email";
import { liveCapStore } from "../connect/store";
import type { CapabilityContext } from "./types";

export const capabilityContextFromRequest = ({
  correlationId,
  ip,
}: {
  correlationId: string;
  ip: string;
}): CapabilityContext => ({
  calendar: googleCalendar(),
  clock: new Date(),
  correlationId,
  ip,
  mailer: resendNote,
  rateLimitEnforced: true,
  store: liveCapStore(),
});
