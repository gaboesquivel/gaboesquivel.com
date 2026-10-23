"use client";

import { Renderer, createParser } from "@openuidev/react-lang";
import { experienceAllowed } from "lib/genui/envelope";
import type { PublicRecord } from "lib/genui/envelope";
import { useEffect, useMemo } from "react";

import { genuiLibrary, setGenuiRecords } from "./genui-library";

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
  useEffect(() => {
    setGenuiRecords(records);
  }, [records]);

  const contractOk = useMemo(() => {
    if (!complete || !response.trim()) return false;
    const parser = createParser(
      genuiLibrary.toJSONSchema(),
      genuiLibrary.root ?? "CVExperience"
    );
    const parsed = parser.parse(response);
    if (parsed.meta.errors.length > 0) return false;
    const name = response.match(/^root\s*=\s*([A-Za-z]+)/)?.[1] ?? "";
    return experienceAllowed(name);
  }, [complete, response]);

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
  );
};
