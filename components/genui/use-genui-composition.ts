"use client";

import type { CompositionEnvelope } from "lib/genui/envelope";
import { consumeNdjsonResponse } from "lib/genui/ndjson-stream";
import { isCurrentCompositionRequest } from "lib/genui/request-generation";
import { recordGenuiSearchQuery } from "lib/genui/search-history";
import {
  errorFromEvent,
  errorFromHttp,
  searchError,
} from "lib/search/compose-outcome";
import type { SearchError, SearchStatus } from "lib/search/compose-outcome";
import { useCallback, useEffect, useRef, useState } from "react";

const readServerMessage = async (response: Response) => {
  const body = (await response.json().catch(() => null)) as {
    message?: unknown;
  } | null;
  return typeof body?.message === "string" ? body.message : undefined;
};

/**
 * The shared search state machine: idle → composing → result | empty | error.
 * `query` is the field text; `submitted` is the last query sent, which Try
 * again re-runs (never the edited, unsubmitted field text).
 */
export const useGenuiComposition = () => {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [envelope, setEnvelope] = useState<CompositionEnvelope | null>(null);
  const [error, setError] = useState<SearchError | null>(null);
  const abortRef = useRef<AbortController | null>(null);
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
    setQuery("");
    setSubmitted("");
    setEnvelope(null);
    setError(null);
  }, []);

  const runQuery = useCallback(async (nextQuery: string) => {
    const trimmed = nextQuery.trim();
    if (!trimmed) return;
    const id = requestRef.current + 1;
    requestRef.current = id;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const current = () =>
      isCurrentCompositionRequest({
        activeRequest: requestRef.current,
        eventRequest: id,
      });
    const fail = (next: SearchError) => {
      if (!current()) return;
      setError(next);
      setStatus("error");
    };
    setStatus("composing");
    setQuery(trimmed);
    setSubmitted(trimmed);
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
          if (event.type === "error") {
            settled = true;
            fail(errorFromEvent(event));
            return;
          }
          if (event.type === "empty") {
            settled = true;
            setEnvelope(null);
            setStatus("empty");
            return;
          }
          if (event.envelope) {
            setEnvelope(event.envelope as CompositionEnvelope);
          }
          if (event.type === "complete") {
            settled = true;
            setStatus("result");
            // Recent keeps only queries that reached a result.
            queueMicrotask(() => recordGenuiSearchQuery(trimmed));
          }
        },
        response,
      });
      // A stream that ends without a settled event (or breaks mid-line) failed.
      if (!settled) fail(searchError("failed"));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      fail(searchError("failed"));
    }
  }, []);

  /** Re-runs the last submitted query; the field shows it again. */
  const retry = useCallback(() => {
    if (submitted) runQuery(submitted).catch(() => {});
  }, [runQuery, submitted]);

  return {
    active: status !== "idle",
    complete: status === "result",
    envelope,
    error,
    isStreaming: status === "composing",
    query,
    reset,
    retry,
    runQuery,
    setQuery,
    status,
    submitted,
  };
};

export type GenuiComposition = ReturnType<typeof useGenuiComposition>;
