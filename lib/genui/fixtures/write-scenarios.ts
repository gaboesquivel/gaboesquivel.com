import { CapabilityRequestError, fetchCapability } from "../write-flow";
import type { CapabilityCaller, CapabilityPayload } from "../write-flow";

/**
 * Fixture-lab write scenarios. Each scripts `/api/capabilities` so every
 * booking and note state renders without touching the calendar or email.
 * `fetch` posts to a lab-only path that does not exist: Playwright routes it,
 * and without a route it fails like a non-JSON 404, never a real write.
 */
export const genuiWriteScenarios = [
  "ready",
  "availability-loading",
  "availability-error",
  "pending",
  "failure",
  "receipt",
  "fetch",
] as const;

export type GenuiWriteScenario = (typeof genuiWriteScenarios)[number];

export const isGenuiWriteScenario = (
  value: unknown
): value is GenuiWriteScenario =>
  typeof value === "string" &&
  (genuiWriteScenarios as readonly string[]).includes(value);

export const GENUI_LAB_CAPABILITY_PATH = "/__genui__/capabilities";

/** Four starts a day for the next five days, from tomorrow (UTC). */
export const labSlotStarts = (now = new Date()) => {
  const base = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1
  );
  return Array.from({ length: 5 }, (_, day) =>
    ["15:00", "15:30", "16:00", "16:30"].map((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return new Date(
        base + day * 86_400_000 + hours * 3_600_000 + minutes * 60_000
      ).toISOString();
    })
  ).flat();
};

/** A request that never settles (loading and pending states). */
const never = () => Promise.withResolvers<CapabilityPayload>().promise;

const confirmed = (operation: string): CapabilityPayload => ({
  data:
    operation === "book_call"
      ? { eventId: "evt_lab_internal" }
      : { receiptId: "rcpt_lab_internal" },
  message: "Confirmed.",
  status: "confirmed",
});

export const labCapabilityCaller = (
  scenario: GenuiWriteScenario,
  log: (entry: { input: Record<string, unknown>; operation: string }) => void
): CapabilityCaller => {
  if (scenario === "fetch") {
    const live = fetchCapability(GENUI_LAB_CAPABILITY_PATH);
    return (request) => {
      log(request);
      return live(request);
    };
  }
  let writes = 0;
  return async (request) => {
    log(request);
    if (request.operation === "list_availability") {
      if (scenario === "availability-loading") return never();
      if (scenario === "availability-error") {
        throw new CapabilityRequestError("network");
      }
      return {
        data: { starts: labSlotStarts() },
        message: "Availability listed.",
        status: "ok",
      };
    }
    writes += 1;
    if (scenario === "pending") return never();
    // First write fails at the network; the retry (same identity) succeeds.
    if (scenario === "failure" && writes === 1) {
      throw new CapabilityRequestError("network");
    }
    return confirmed(request.operation);
  };
};
