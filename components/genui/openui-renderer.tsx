"use client";

import { Renderer } from "@openuidev/react-lang";
import { compileExperience } from "lib/genui/contract/compiler";
import type { PublicRecord } from "lib/genui/envelope";
import { experienceAllowed, GENUI_LIBRARY_VERSION } from "lib/genui/envelope";
import { useMemo } from "react";

import { genuiLibrary } from "./genui-library";
import { GenuiRecordProvider } from "./genui-record-context";

export const OpenUiExperienceRenderer = ({
  complete,
  fallbackText,
  isStreaming,
  records,
  response,
}: {
  complete: boolean;
  fallbackText: string;
  isStreaming: boolean;
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

  if (!response) {
    return <p className="text-neutral-400">{fallbackText || "Loading…"}</p>;
  }

  if (complete && !contractOk) {
    return (
      <p className="text-sm text-neutral-300">
        This result could not be shown safely. Try /work, /cv, or /contact.
      </p>
    );
  }

  return (
    <GenuiRecordProvider records={records}>
      <Renderer
        isStreaming={isStreaming || !complete}
        library={genuiLibrary}
        onError={(errors) => {
          if (errors.length > 0) {
            console.warn("OpenUI parse errors", errors);
          }
        }}
        response={response}
      />
    </GenuiRecordProvider>
  );
};
