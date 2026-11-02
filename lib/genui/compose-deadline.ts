import { searchCopy } from "lib/search/copy";

/** The compose route's overall deadline. */
export const COMPOSE_DEADLINE_MS = 15_000;

/** The explicit event the client maps to "That took too long. Try again.". */
export const timedOutEvent = (requestId: string) => ({
  code: "timed_out" as const,
  message: searchCopy.serverTimedOut,
  requestId,
  sequence: 0,
  type: "error" as const,
});

/**
 * At the deadline, write the timed-out event first, then abort compose, so
 * the stream never just ends (which reads as a generic failure).
 * Returns a disarm function.
 */
export const armComposeDeadline = ({
  controller,
  ms = COMPOSE_DEADLINE_MS,
  onTimeout,
}: {
  controller: AbortController;
  ms?: number;
  onTimeout: () => void;
}) => {
  const timer = setTimeout(() => {
    if (controller.signal.aborted) return;
    onTimeout();
    controller.abort();
  }, ms);
  return () => clearTimeout(timer);
};
