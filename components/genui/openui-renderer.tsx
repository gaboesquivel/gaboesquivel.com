"use client";

import { Renderer } from "@openuidev/react-lang";
import type { PublicRecord } from "lib/genui/envelope";
import { useEffect } from "react";

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

  if (!response) {
    return <p className="text-neutral-400">{fallbackText || "Loading…"}</p>;
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
