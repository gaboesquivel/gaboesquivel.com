/**
 * Client-side helpers for GenUI write flows (booking, contact note): the
 * capability transport, retry identity per draft, slot grouping, and the
 * time-zone names shown beside slot labels. Pure except `fetchCapability`.
 */

export interface CapabilityPayload {
  data?: Record<string, unknown> | null;
  message?: string;
  status?: string;
}

export type CapabilityCaller = (request: {
  input: Record<string, unknown>;
  operation: string;
}) => Promise<CapabilityPayload>;

type CapabilityFailure = "network" | "server";

class CapabilityRequestError extends Error {
  readonly kind: CapabilityFailure;

  constructor(kind: CapabilityFailure) {
    super(kind === "network" ? "Network request failed." : "Server error.");
    this.kind = kind;
    this.name = "CapabilityRequestError";
  }
}

const WRITE_ERROR_COPY: Record<CapabilityFailure, string> = {
  // It may have gone through, so the details stay locked until a retry gets
  // an answer (see `settleAttempt`).
  network:
    "Could not reach the server. Your details are kept and locked until it answers; try again.",
  server: "Something went wrong on our side. Your details are kept; try again.",
};

export const AVAILABILITY_ERROR_COPY =
  "Could not load open times. Check your connection and try again.";

export const AVAILABILITY_EMPTY_COPY =
  "No open times in the next four weeks. Send a note instead.";

/** Message for any thrown value from a capability call. */
export const writeErrorMessage = (error: unknown) =>
  error instanceof CapabilityRequestError
    ? WRITE_ERROR_COPY[error.kind]
    : WRITE_ERROR_COPY.network;

const readJson = async (response: Response) => {
  try {
    return (await response.json()) as CapabilityPayload;
  } catch {
    return null;
  }
};

/**
 * POST a capability. Network failures and non-JSON responses throw a
 * `CapabilityRequestError`; JSON bodies (including 4xx with a message) return.
 */
const fetchCapability =
  (endpoint = "/api/capabilities"): CapabilityCaller =>
  async ({ input, operation }) => {
    let response: Response;
    try {
      response = await fetch(endpoint, {
        body: JSON.stringify({ input, operation }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
    } catch {
      throw new CapabilityRequestError("network");
    }
    const payload = await readJson(response);
    if (!payload || response.status >= 500) {
      throw new CapabilityRequestError("server");
    }
    return payload;
  };

export const defaultCapabilityCaller = fetchCapability();

/** A write the server accepted; the form locks and shows a receipt. */
export const isSettledWrite = (payload: CapabilityPayload) =>
  payload.status === "confirmed" || payload.status === "pending";

export interface RetryIdentityState {
  /** Fingerprint of the payload last sent with `identity`, if any. */
  fingerprint: string | null;
  identity: string;
  /**
   * The last send failed before any server answer (network), so it may have
   * been written. Until a definite response arrives the identity is kept and
   * the draft is locked against edits.
   */
  unresolved?: boolean;
}

const writeFingerprint = (payload: Record<string, unknown>) =>
  JSON.stringify(
    Object.entries(payload).toSorted(([a], [b]) => a.localeCompare(b))
  );

/**
 * One retry identity per draft. Retries of the same payload reuse it (the
 * server replays instead of writing twice). A changed payload is a new draft,
 * because the server binds an identity to its first payload, but only after a
 * definite server response: while the last send is unresolved (a network
 * failure that may have reached the server) the identity is kept, so the
 * server answers with the first write instead of making a second one.
 */
export const identityForAttempt = ({
  create,
  payload,
  state,
}: {
  create: () => string;
  payload: Record<string, unknown>;
  state: RetryIdentityState;
}): RetryIdentityState => {
  const fingerprint = writeFingerprint(payload);
  if (state.unresolved) {
    return { ...state, fingerprint: state.fingerprint ?? fingerprint };
  }
  if (state.fingerprint === null || state.fingerprint === fingerprint) {
    return { fingerprint, identity: state.identity };
  }
  return { fingerprint, identity: create() };
};

/**
 * The attempt after a send settles. A network failure leaves it unresolved
 * (edits lock, the identity stays); any server answer resolves it. A server
 * error (5xx or a non-JSON body) changes nothing: it is not proof either way.
 */
export const settleAttempt = ({
  error,
  state,
}: {
  /** The thrown value, or undefined when the server answered. */
  error?: unknown;
  state: RetryIdentityState;
}): RetryIdentityState => {
  if (error === undefined) return { ...state, unresolved: false };
  const network =
    !(error instanceof CapabilityRequestError) || error.kind === "network";
  return network ? { ...state, unresolved: true } : state;
};
export const newRetryIdentity = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `draft-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

const dayKey = (iso: string, timeZone: string) =>
  new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone,
    year: "numeric",
  }).format(new Date(iso));

export interface SlotDayGroup {
  day: string;
  label: string;
  starts: string[];
}

/**
 * Unique future starts grouped by visitor day, earliest first, split into the
 * first `days` days and the rest (shown behind "More times").
 */
export const groupSlotsByDay = ({
  days = 3,
  now,
  starts,
  timeZone,
}: {
  days?: number;
  now: Date;
  starts: string[];
  timeZone: string;
}) => {
  const unique = [...new Set(starts)]
    .filter((iso) => Date.parse(iso) > now.getTime())
    .sort((a, b) => Date.parse(a) - Date.parse(b));
  const labelFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone,
    weekday: "short",
  });
  const groups: SlotDayGroup[] = [];
  for (const iso of unique) {
    const day = dayKey(iso, timeZone);
    const last = groups.at(-1);
    if (last?.day === day) {
      last.starts.push(iso);
    } else {
      groups.push({
        day,
        label: labelFormatter.format(new Date(iso)),
        starts: [iso],
      });
    }
  }
  return { more: groups.slice(days), soon: groups.slice(0, days) };
};

const zonePart = (
  timeZone: string,
  date: Date,
  timeZoneName: "long" | "short"
) =>
  new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value ?? timeZone;

/** Long and short names for the zone slot labels use (short matches labels). */
export const timeZoneNames = ({
  date = new Date(),
  timeZone,
}: {
  date?: Date;
  timeZone: string;
}) => ({
  long: zonePart(timeZone, date, "long"),
  short: zonePart(timeZone, date, "short"),
});
