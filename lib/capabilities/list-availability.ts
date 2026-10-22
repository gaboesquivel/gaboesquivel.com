import { listOpenSlots, validTimeZone } from "../connect/slots";
import { readResult } from "./result";
import { listAvailabilityInput } from "./schemas";
import type { CapabilityContext } from "./types";

export const listAvailability = async ({
  context,
  input,
}: {
  context: CapabilityContext;
  input: unknown;
}) => {
  const parsed = listAvailabilityInput.safeParse(input);
  if (!parsed.success) {
    return readResult({
      data: null,
      message: parsed.error.issues[0]?.message ?? "Invalid availability input.",
      operation: "list_availability",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const { duration, timeZone } = parsed.data;
  if (!validTimeZone(timeZone)) {
    return readResult({
      data: null,
      message: "Time zone is not valid.",
      operation: "list_availability",
      requestId: context.correlationId,
      status: "error",
    });
  }
  try {
    const horizonEnd = new Date(
      context.clock.getTime() + 28 * 24 * 60 * 60 * 1000
    ).toISOString();
    const busy = await context.calendar.freeBusy({
      timeMax: horizonEnd,
      timeMin: context.clock.toISOString(),
    });
    const open = listOpenSlots({
      busy,
      now: context.clock,
      timeZone,
    });
    const durations = duration ? [duration] : [15, 30];
    const starts = durations.flatMap((value) =>
      Object.values(open.slots[String(value) as "15" | "30"]).flat()
    );
    return readResult({
      data: {
        checkedAt: context.clock.toISOString(),
        duration: duration ?? null,
        starts,
        timeZone: open.timeZone,
      },
      message: starts.length ? "Availability listed." : "No open slots found.",
      operation: "list_availability",
      requestId: context.correlationId,
      status: starts.length ? "ok" : "empty",
    });
  } catch {
    return readResult({
      data: null,
      message: "Calendar is unavailable right now.",
      operation: "list_availability",
      requestId: context.correlationId,
      status: "error",
    });
  }
};
