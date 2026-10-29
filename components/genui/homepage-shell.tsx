"use client";

import { useEffect, useRef, useState } from "react";

import { GeneratedRegion } from "./generated-region";
import { useGenuiDraft } from "./genui-draft-context";
import {
  GenuiReceipt,
  GenuiSessionProvider,
  genuiWritesEnabled,
} from "./genui-session";
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
          onBack={active ? handleReset : undefined}
          onChange={setQuery}
          onSubmit={(value) => {
            requestAnimationFrame(() => {
              scrollPromptToViewportTop({ element: promptAnchorRef.current });
            });
            runQuery(value).catch(() => {});
          }}
          value={query}
        />
        <GenuiReceipt />
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

export const HomepageGenUiShell = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [writesEnabled, setWritesEnabled] = useState(false);

  return (
    <GenuiSessionProvider writesEnabled={writesEnabled}>
      <HomepageGenUiBodyContent
        onSessionChange={(session) => {
          setWritesEnabled(genuiWritesEnabled(session));
        }}
      >
        {children}
      </HomepageGenUiBodyContent>
    </GenuiSessionProvider>
  );
};
