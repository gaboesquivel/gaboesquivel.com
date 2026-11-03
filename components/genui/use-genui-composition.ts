"use client";

import type { CompositionEnvelope } from "lib/genui/envelope";
import { consumeNdjsonResponse } from "lib/genui/ndjson-stream";
import { isCurrentCompositionRequest } from "lib/genui/request-generation";
import { recordGenuiSearchQuery } from "lib/genui/search-history";
import {
  CLIENT_COMPOSE_TIMEOUT_MS,
  errorFromEvent,
  errorFromHttp,
  searchError,
} from "lib/search/compose-outcome";
import type { SearchError, SearchStatus } from "lib/search/compose-outcome";
import { isComposeStage } from "lib/search/copy";
import type { ComposeStage } from "lib/search/copy";
import { useCallback, useEffect, useRef, useState } from "react";

const readServerMessage = async (response: Response) => {
  const body = (await response.json().catch(() => null)) as {
    message?: unknown;
  } | null;
  return typeof body?.message === "string" ? body.message : undefined;
};

/**
 * What was sent: `label` is the visitor's own words (typed text or the
 * clicked suggestion), shown in the field and stored in Recent; `query` is
 * what compose routes on (a suggestion's canonical rewrite stays internal).
 */
export interface SearchSubmission {
  label: string;
  query: string;
}

type AbortReason = "stopped" | "timed_out";

/**
 * The shared search state machine: idle → composing → result | empty |
 * error | stopped. `query` is the field text; `submitted` is the last
 * submission, which Try again re-runs (never the edited, unsubmitted text).
 */
export const useGenuiComposition = () => {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [stage, setStage] = useState<ComposeStage | null>(null);
  const [query, setQuery] = useState("");
  const [submission, setSubmission] = useState<SearchSubmission | null>(null);
  /** Increments per request so each result reveals once (keyed by query). */
  const [requestKey, setRequestKey] = useState(0);
  const [envelope, setEnvelope] = useState<CompositionEnvelope | null>(null);
  const [error, setError] = useState<SearchError | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const abortReasonRef = useRef<AbortReason | null>(null);
  const requestRef = useRef(0);

  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    []
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    requestRef.current += 1;
    setStatus("idle");
    setStage(null);
    setQuery("");
    setSubmission(null);
    setEnvelope(null);
    setError(null);
  }, []);

  const runQuery = useCallback(async (nextQuery: string, label?: string) => {
    const trimmed = nextQuery.trim();
    if (!trimmed) return;
    const shown = label?.trim() || trimmed;
    const id = requestRef.current + 1;
    requestRef.current = id;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    abortReasonRef.current = null;
    const current = () =>
      isCurrentCompositionRequest({
        activeRequest: requestRef.current,
        eventRequest: id,
      });
    const fail = (next: SearchError) => {
      if (!current()) return;
      setError(next);
      setStatus("error");
      setStage(null);
    };
    // A stalled request (no settled event in 20s) maps to the timed-out copy.
    const timer = window.setTimeout(() => {
      if (!current()) return;
      abortReasonRef.current = "timed_out";
      controller.abort();
    }, CLIENT_COMPOSE_TIMEOUT_MS);
    setStatus("composing");
    setStage(null);
    setQuery(shown);
    setSubmission({ label: shown, query: trimmed });
    setRequestKey(id);
    setEnvelope(null);
    setError(null);
    try {
      const response = await fetch("/api/genui/compose", {
        body: JSON.stringify({
          clientRequestId: crypto.randomUUID(),
          query: trimmed,
          version: 1,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
        signal: controller.signal,
      });
      if (!response.ok) {
        fail(errorFromHttp(response.status, await readServerMessage(response)));
        return;
      }
      let settled = false;
      await consumeNdjsonResponse({
        onEvent: (event) => {
          if (!current() || settled) return;
          if (event.type === "stage") {
            if (isComposeStage(event.stage)) setStage(event.stage);
            return;
          }
          if (event.type === "error") {
            settled = true;
            fail(errorFromEvent(event));
            return;
          }
          if (event.type === "empty") {
            settled = true;
            setEnvelope(null);
            setStage(null);
            setStatus("empty");
            return;
          }
          if (event.envelope) {
            setEnvelope(event.envelope as CompositionEnvelope);
          }
          if (event.type === "complete") {
            settled = true;
            setStage(null);
            setStatus("result");
            // Recent keeps only queries that reached a result, in the
            // visitor's own words.
            queueMicrotask(() => recordGenuiSearchQuery(shown));
          }
        },
        response,
      });
      // A stream that ends without a settled event (or breaks mid-line) failed.
      if (!settled) fail(searchError("failed"));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        if (!current()) return;
        if (abortReasonRef.current === "timed_out") {
          fail(searchError("timed_out"));
        } else if (abortReasonRef.current === "stopped") {
          setStatus("stopped");
          setStage(null);
          setEnvelope(null);
        }
        return;
      }
      fail(searchError("failed"));
    } finally {
      window.clearTimeout(timer);
    }
  }, []);

  /**
   * Stop: aborts the request (the server stops too), keeps the field text and
   * every draft, and ends in "Stopped." with Try again.
   */
  const stop = useCallback(() => {
    if (!abortRef.current || abortRef.current.signal.aborted) return;
    abortReasonRef.current = "stopped";
    abortRef.current.abort();
  }, []);

  /** Re-runs the last submission; the field shows the visitor's words again. */
  const retry = useCallback(() => {
    if (submission) {
      runQuery(submission.query, submission.label).catch(() => {});
    }
  }, [runQuery, submission]);

  return {
    active: status !== "idle",
    complete: status === "result",
    envelope,
    error,
    isStreaming: status === "composing",
    query,
    requestKey,
    reset,
    retry,
    runQuery,
    setQuery,
    stage,
    status,
    stop,
    /** The visitor's words for the last submission (keyword matches use them). */
    submitted: submission?.label ?? "",
  };
};

export type GenuiComposition = ReturnType<typeof useGenuiComposition>;
