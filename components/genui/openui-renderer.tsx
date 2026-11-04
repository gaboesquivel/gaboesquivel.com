"use client";

import { Renderer } from "@openuidev/react-lang";
import { compileExperience } from "lib/genui/contract/compiler";
import type { GenuiDataset } from "lib/genui/dataset";
import type { PublicRecord } from "lib/genui/envelope";
import { experienceAllowed, GENUI_LIBRARY_VERSION } from "lib/genui/envelope";
import { searchCopy } from "lib/search/copy";
import { useEffect, useMemo } from "react";

import { GenuiDatasetProvider } from "./genui-dataset-context";
import { genuiLibrary } from "./genui-library";
import { GenuiRecordProvider } from "./genui-record-context";

export const OpenUiExperienceRenderer = ({
  complete,
  datasets,
  fallbackText,
  isStreaming,
  onRenderFailure,
  records,
  response,
}: {
  complete: boolean;
  datasets?: GenuiDataset[];
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
      datasets,
      document: response,
      libraryVersion: GENUI_LIBRARY_VERSION,
      records,
    });
    if (!compiled.ok) return false;
    return experienceAllowed(compiled.experience);
  }, [complete, datasets, records, response]);

  const contractFailed = complete && Boolean(response) && !contractOk;
  useEffect(() => {
    if (contractFailed) onRenderFailure?.(searchCopy.renderFailed);
  }, [contractFailed, onRenderFailure]);

  if (!response) {
    return fallbackText ? (
      <p className="text-neutral-400">{fallbackText}</p>
    ) : null;
  }

  if (contractFailed) return null;

  return (
    <GenuiRecordProvider records={records}>
      <GenuiDatasetProvider datasets={datasets}>
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
                (item) =>
                  item.source === "runtime" && item.severity !== "warning"
              )
            ) {
              onRenderFailure?.(searchCopy.renderFailed);
            }
          }}
          response={response}
        />
      </GenuiDatasetProvider>
    </GenuiRecordProvider>
  );
};
