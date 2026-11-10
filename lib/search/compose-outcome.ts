import { searchCopy } from "./copy";

/**
 * idle → composing → result | empty | error | stopped (shared by both search
 * surfaces). `stopped` is the visitor pressing Stop.
 */
export type SearchStatus =
  | "idle"
  | "composing"
  | "result"
  | "empty"
  | "error"
  | "stopped";

/** The client gives up on a compose request after 20s (the server's deadline is 15s). */
export const CLIENT_COMPOSE_TIMEOUT_MS = 20_000;

export type SearchErrorKind = "rate_limited" | "timed_out" | "failed";

export interface SearchError {
  kind: SearchErrorKind;
  message: string;
}

export const searchError = (
  kind: SearchErrorKind,
  serverMessage?: string
): SearchError => {
  if (kind === "rate_limited") {
    return {
      kind,
      message: serverMessage?.trim() || searchCopy.errorRateLimited,
    };
  }
  if (kind === "timed_out") return { kind, message: searchCopy.errorTimedOut };
  return { kind, message: searchCopy.errorFailed };
};

/** Non-2xx compose response → typed error. Only 429 keeps the server's words. */
export const errorFromHttp = (status: number, serverMessage?: string) => {
  if (status === 429) return searchError("rate_limited", serverMessage);
  if (status === 504 || status === 408) return searchError("timed_out");
  return searchError("failed");
};

/** Stream `error` event → typed error. Internal copy is never shown. */
export const errorFromEvent = (event: Record<string, unknown>) =>
  event.code === "timed_out" ? searchError("timed_out") : searchError("failed");

/** The live-region text for a state; only `result` says "Results ready.". */
export const announcementFor = ({
  error,
  status,
}: {
  error: SearchError | null;
  status: SearchStatus;
}) => {
  if (status === "composing") return searchCopy.composing;
  if (status === "result") return searchCopy.resultReady;
  if (status === "empty") return searchCopy.empty;
  if (status === "stopped") return searchCopy.stopped;
  if (status === "error") return error?.message ?? searchCopy.errorFailed;
  return "";
};
