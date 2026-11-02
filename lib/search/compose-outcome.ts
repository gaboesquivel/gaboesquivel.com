import { searchCopy } from "./copy";

/** idle → composing → result | empty | error (shared by both search surfaces). */
export type SearchStatus = "idle" | "composing" | "result" | "empty" | "error";

export type SearchErrorKind = "rate_limited" | "timed_out" | "failed";

export interface SearchError {
  kind: SearchErrorKind;
  message: string;
}

/** Error codes the compose stream may attach to an `error` event. */
export type ComposeErrorCode = "timed_out" | "failed";

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
  if (status === "error") return error?.message ?? searchCopy.errorFailed;
  return "";
};
