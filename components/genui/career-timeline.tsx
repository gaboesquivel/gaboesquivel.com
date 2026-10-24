"use client";

import { BioTimeline } from "components/bio/bio-timeline";
import { useId } from "react";

import { useGenuiRecords } from "./genui-record-context";

export function CareerTimeline({
  sourceId,
  projectIds,
}: {
  sourceId: string;
  projectIds: string[];
}) {
  const prefix = useId();
  const records = useGenuiRecords();
  const source = records.find(
    (record) => record.id === sourceId && record.kind === "profile"
  );
  if (!source || source.id !== "/bio") return null;
  const groundedProjectIds = projectIds.filter((id) =>
    records.some((record) => record.id === id && record.kind === "project")
  );

  return (
    <div className="min-w-0 text-white" data-career-timeline>
      <header className="max-w-[65ch]">
        <h2
          id={`${prefix}-title`}
          className="text-3xl font-semibold tracking-tight @min-[48rem]:text-4xl"
        >
          My journey
        </h2>
        <p className="mt-5 text-base leading-relaxed text-neutral-300">
          From web interfaces and a JavaScript community to mobile banking,
          blockchain systems, and intelligent interfaces.
        </p>
      </header>
      <BioTimeline
        className="mt-10"
        groundedProjectIds={groundedProjectIds}
        idPrefix={prefix}
        showChapterNav
        showFooter
      />
    </div>
  );
}
