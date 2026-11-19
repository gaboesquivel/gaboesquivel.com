import { googleCalendar } from "../connect/calendar";
import { resendNote } from "../connect/email";
import { liveCapStore } from "../connect/store";
import type { CapabilityContext } from "./types";

export const capabilityContextFromRequest = ({
  correlationId,
  ip,
  measure,
}: {
  correlationId: string;
  ip: string;
  measure?: CapabilityContext["measure"];
}): CapabilityContext => ({
  calendar: googleCalendar(),
  clock: new Date(),
  correlationId,
  ip,
  mailer: resendNote,
  measure,
  rateLimitEnforced: true,
  store: liveCapStore(),
});
