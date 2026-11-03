"use client";

import { useRef } from "react";

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
import type { GenuiComposition } from "./use-genui-composition";

const HomepageGenUiBodyContent = ({
  children,
  genui,
}: {
  children: React.ReactNode;
  genui: GenuiComposition;
}) => {
  const { clear } = useGenuiDraft();
  const { active, envelope, error, query, reset, runQuery, setQuery } = genui;
  const promptAnchorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const run = (value: string, label?: string) => {
    requestAnimationFrame(() => {
      scrollPromptToViewportTop({ element: promptAnchorRef.current });
    });
    runQuery(value, label).catch(() => {});
  };

  const handleClear = () => {
    reset();
    clear();
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div
        className={
          active
            ? "sticky top-0 z-20 border-b border-hairline bg-black px-0 py-4"
            : "mt-8 lg:mt-10"
        }
        ref={promptAnchorRef}
      >
        <PromptField
          idle={!active}
          inputRef={inputRef}
          onChange={setQuery}
          onClear={active ? handleClear : undefined}
          onSubmit={run}
          value={query}
        />
        <GenuiReceipt />
      </div>
      {active ? (
        <div className="min-h-[100vh] pt-6">
          <GeneratedRegion
            envelope={envelope}
            error={error}
            onExample={(example, label) => {
              run(example, label);
              inputRef.current?.focus();
            }}
            onRetry={() => {
              genui.retry();
              inputRef.current?.focus();
            }}
            onStop={() => genui.stop()}
            revealKey={genui.requestKey}
            stage={genui.stage}
            status={genui.status}
            submitted={genui.submitted}
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
  const genui = useGenuiComposition();

  return (
    <GenuiSessionProvider writesEnabled={genuiWritesEnabled(genui)}>
      <HomepageGenUiBodyContent genui={genui}>
        {children}
      </HomepageGenUiBodyContent>
    </GenuiSessionProvider>
  );
};
