"use client";

import { useEffect, useRef, useState } from "react";

import { GeneratedRegion } from "./generated-region";
import { GenuiDraftProvider, useGenuiDraft } from "./genui-draft-context";
import {
  GenuiInteractionProvider,
  useGenuiInteraction,
} from "./genui-interaction-context";
import { PromptField } from "./prompt-field";
import { scrollPromptToViewportTop } from "./scroll-prompt";
import { useGenuiComposition } from "./use-genui-composition";

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
  const { receipt } = useGenuiInteraction();
  const {
    active,
    complete,
    envelope,
    error,
    isStreaming,
    query,
    reset,
    runQuery,
    setQuery,
  } = useGenuiComposition();
  const promptAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onSessionChange({ active, complete, error, isStreaming });
  }, [active, complete, error, isStreaming, onSessionChange]);

  const handleReset = () => {
    reset();
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
            requestAnimationFrame(() => {
              scrollPromptToViewportTop({ element: promptAnchorRef.current });
            });
            runQuery(value).catch(() => {});
          }}
          value={query}
        />
        {active && (
          <button
            className="mt-3 text-sm text-accent hover:underline"
            onClick={handleReset}
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
        <div className="min-h-[100vh] pt-6">
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
