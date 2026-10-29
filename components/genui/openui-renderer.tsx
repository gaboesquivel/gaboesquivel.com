"use client";

import { Renderer } from "@openuidev/react-lang";
import { compileExperience } from "lib/genui/contract/compiler";
import type { PublicRecord } from "lib/genui/envelope";
import { experienceAllowed, GENUI_LIBRARY_VERSION } from "lib/genui/envelope";
import { RENDER_FAILED_MESSAGE } from "lib/genui/messages";
import { useEffect, useMemo } from "react";

import { genuiLibrary } from "./genui-library";
import { GenuiRecordProvider } from "./genui-record-context";

export const OpenUiExperienceRenderer = ({
  complete,
  fallbackText,
  isStreaming,
  onRenderFailure,
  records,
  response,
}: {
  complete: boolean;
  fallbackText: string;
  isStreaming: boolean;
  /** Called once a settled result cannot be shown, so the region can recover. */
  onRenderFailure?: (message: string) => void;
  records: PublicRecord[];
  response: string;
}) => {
  const contractOk = useMemo(() => {
    if (!complete || !response.trim()) return false;
    const compiled = compileExperience({
      document: response,
      libraryVersion: GENUI_LIBRARY_VERSION,
      records,
    });
    if (!compiled.ok) return false;
    return experienceAllowed(compiled.experience);
  }, [complete, records, response]);

  const contractFailed = complete && Boolean(response) && !contractOk;
  useEffect(() => {
    if (contractFailed) onRenderFailure?.(RENDER_FAILED_MESSAGE);
  }, [contractFailed, onRenderFailure]);

  if (!response) {
    return fallbackText ? (
      <p className="text-neutral-400">{fallbackText}</p>
    ) : null;
  }

  if (contractFailed) return null;

  return (
    <GenuiRecordProvider records={records}>
      <Renderer
        isStreaming={isStreaming || !complete}
        library={genuiLibrary}
        onError={(errors) => {
          if (errors.length === 0) return;
          console.warn("OpenUI errors", errors);
          // OpenUI keeps the last good subtree on a runtime failure, which
          // leaves a settled result blank. Surface it instead.
          if (
            complete &&
            errors.some(
              (item) => item.source === "runtime" && item.severity !== "warning"
            )
          ) {
            onRenderFailure?.(RENDER_FAILED_MESSAGE);
          }
        }}
        response={response}
      />
    </GenuiRecordProvider>
  );
};
