"use client";

import type { CompositionEnvelope } from "lib/genui/envelope";
import { useCallback, useEffect, useRef, useState } from "react";

import { GeneratedRegion } from "./generated-region";
import { GenuiDraftProvider, useGenuiDraft } from "./genui-draft-context";
import {
  GenuiInteractionProvider,
  useGenuiInteraction,
} from "./genui-interaction-context";
import { PromptField } from "./prompt-field";
import { scrollPromptToViewportTop } from "./scroll-prompt";

const readNdjson = async ({
  onEvent,
  response,
}: {
  onEvent: (event: Record<string, unknown>) => void;
  response: Response;
}) => {
  const reader = response.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.trim()) continue;
      onEvent(JSON.parse(line) as Record<string, unknown>);
    }
  }
};

const HomepageGenUiBodyContent = ({
  children,
  onSessionChange,
}: {
  children: React.ReactNode;
  onSessionChange: (session: {
    active: boolean;
    complete: boolean;
    error: string | null;
    isStreaming: boolean;
  }) => void;
}) => {
  const { clear } = useGenuiDraft();
  const { receipt, setReceipt } = useGenuiInteraction();
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const [envelope, setEnvelope] = useState<CompositionEnvelope | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [complete, setComplete] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const requestRef = useRef(0);
  const promptAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onSessionChange({ active, complete, error, isStreaming });
  }, [active, complete, error, isStreaming, onSessionChange]);

  const runQuery = useCallback(async (nextQuery: string) => {
    const id = requestRef.current + 1;
    requestRef.current = id;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setActive(true);
    setQuery(nextQuery);
    setEnvelope(null);
    setError(null);
    setComplete(false);
    setIsStreaming(true);
    requestAnimationFrame(() => {
      scrollPromptToViewportTop({ element: promptAnchorRef.current });
    });
    try {
      const response = await fetch("/api/genui/compose", {
        body: JSON.stringify({
          clientRequestId: crypto.randomUUID(),
          query: nextQuery,
          version: 1,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
        signal: controller.signal,
      });
      if (!response.ok) {
        if (id !== requestRef.current) return;
        setError("Composition failed.");
        setIsStreaming(false);
        return;
      }
      await readNdjson({
        onEvent: (event) => {
          if (id !== requestRef.current) return;
          if (event.type === "error") {
            setError(String(event.message ?? "Composition failed."));
            setIsStreaming(false);
            return;
          }
          if (event.envelope) {
            setEnvelope(event.envelope as CompositionEnvelope);
          }
          if (event.type === "complete") {
            setComplete(true);
            setIsStreaming(false);
          }
        },
        response,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (id !== requestRef.current) return;
      setError("Composition failed.");
      setIsStreaming(false);
    }
  }, []);

  const reset = () => {
    abortRef.current?.abort();
    requestRef.current += 1;
    setActive(false);
    setQuery("");
    setEnvelope(null);
    setError(null);
    setComplete(false);
    setIsStreaming(false);
    clear();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      top: 0,
    });
  };

  return (
    <div className="relative">
      <div
        className={
          active
            ? "sticky top-0 z-20 border-b border-hairline bg-black/95 px-0 py-4 backdrop-blur"
            : "mt-8 lg:mt-10"
        }
        ref={promptAnchorRef}
      >
        <PromptField
          onChange={setQuery}
          onSubmit={(value) => {
            runQuery(value).catch(() => {});
          }}
          value={query}
        />
        {active && (
          <button
            className="mt-3 text-sm text-accent hover:underline"
            onClick={reset}
            type="button"
          >
            Back to homepage
          </button>
        )}
        {receipt && (
          <p className="mt-3 text-sm text-neutral-300" role="status">
            {receipt.message}
            {receipt.receiptId ? ` (${receipt.receiptId})` : ""}
          </p>
        )}
      </div>
      {active ? (
        <div className="min-h-[100vh]">
          <GeneratedRegion
            complete={complete}
            envelope={envelope}
            error={error}
            isStreaming={isStreaming}
            onRetry={
              query
                ? () => {
                    runQuery(query).catch(() => {});
                  }
                : undefined
            }
          />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

const HomepageGenUiBody = ({ children }: { children: React.ReactNode }) => {
  const [writesEnabled, setWritesEnabled] = useState(false);

  return (
    <GenuiInteractionProvider writesEnabled={writesEnabled}>
      <HomepageGenUiBodyContent
        onSessionChange={({ active, complete, error, isStreaming }) => {
          setWritesEnabled(active && complete && !isStreaming && !error);
        }}
      >
        {children}
      </HomepageGenUiBodyContent>
    </GenuiInteractionProvider>
  );
};

export const HomepageGenUiShell = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <GenuiDraftProvider>
    <HomepageGenUiBody>{children}</HomepageGenUiBody>
  </GenuiDraftProvider>
);
