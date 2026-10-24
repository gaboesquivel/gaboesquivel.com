"use client";

import type { CompositionEnvelope } from "lib/genui/envelope";
import { COMPOSITION_FAILED_MESSAGE } from "lib/genui/messages";
import { consumeNdjsonResponse } from "lib/genui/ndjson-stream";
import { recordGenuiSearchQuery } from "lib/genui/search-history";
import { useCallback, useEffect, useRef, useState } from "react";

export const useGenuiComposition = () => {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const [envelope, setEnvelope] = useState<CompositionEnvelope | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [complete, setComplete] = useState(false);
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
    setActive(false);
    setQuery("");
    setEnvelope(null);
    setError(null);
    setComplete(false);
    setIsStreaming(false);
  }, []);

  const runQuery = useCallback(async (nextQuery: string) => {
    const trimmed = nextQuery.trim();
    if (!trimmed) return;
    const id = requestRef.current + 1;
    requestRef.current = id;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setActive(true);
    setQuery(trimmed);
    setEnvelope(null);
    setError(null);
    setComplete(false);
    setIsStreaming(true);
    queueMicrotask(() => recordGenuiSearchQuery(trimmed));
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
        if (id !== requestRef.current) return;
        setError(COMPOSITION_FAILED_MESSAGE);
        setIsStreaming(false);
        return;
      }
      let sawComplete = false;
      let sawError = false;
      const streamResult = await consumeNdjsonResponse({
        onEvent: (event) => {
          if (id !== requestRef.current) return;
          if (event.type === "error") {
            sawError = true;
            setError(String(event.message ?? COMPOSITION_FAILED_MESSAGE));
            setIsStreaming(false);
            return;
          }
          if (event.envelope) {
            setEnvelope(event.envelope as CompositionEnvelope);
          }
          if (event.type === "complete") {
            sawComplete = true;
            setComplete(true);
            setIsStreaming(false);
          }
        },
        response,
      });
      if (id !== requestRef.current) return;
      if (!streamResult.ok) {
        setError(COMPOSITION_FAILED_MESSAGE);
        setIsStreaming(false);
        return;
      }
      if (!sawComplete && !sawError) {
        setError(COMPOSITION_FAILED_MESSAGE);
        setIsStreaming(false);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (id !== requestRef.current) return;
      setError(COMPOSITION_FAILED_MESSAGE);
      setIsStreaming(false);
    }
  }, []);

  return {
    active,
    complete,
    envelope,
    error,
    isStreaming,
    query,
    reset,
    runQuery,
    setQuery,
  };
};
