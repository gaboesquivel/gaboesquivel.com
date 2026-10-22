"use client";

import type { CompositionEnvelope } from "lib/genui/envelope";
import { useCallback, useRef, useState } from "react";

import { GeneratedRegion } from "./generated-region";
import { GenuiDraftProvider, useGenuiDraft } from "./genui-draft-context";
import { PromptField } from "./prompt-field";

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

const HomepageGenUiBody = ({ children }: { children: React.ReactNode }) => {
  const { clear } = useGenuiDraft();
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const [envelope, setEnvelope] = useState<CompositionEnvelope | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [complete, setComplete] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const requestRef = useRef(0);

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
      window.scrollTo({ behavior: "smooth", top: 0 });
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
  };

  return (
    <div className="relative">
      <div
        className={
          active
            ? "sticky top-0 z-20 border-b border-hairline bg-black/95 px-0 py-4 backdrop-blur"
            : "mt-8 lg:mt-10"
        }
      >
        <PromptField
          disabled={isStreaming}
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
      </div>
      {active ? (
        <GeneratedRegion
          complete={complete}
          envelope={envelope}
          error={error}
          isStreaming={isStreaming}
        />
      ) : (
        children
      )}
    </div>
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
