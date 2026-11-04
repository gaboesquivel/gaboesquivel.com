"use client";

import { useGenuiDataset } from "../genui-dataset-context";
import { cellText } from "./dataset-cell";

export const StatRowView = ({
  datasetId,
  title,
}: {
  datasetId: string;
  title: string;
}) => {
  const dataset = useGenuiDataset(datasetId);
  if (!dataset) return null;
  return (
    <section
      aria-labelledby={`${datasetId}-title`}
      className="min-w-0 space-y-3"
      data-genui-block="stats"
    >
      <h3
        className="text-lg font-semibold text-white"
        id={`${datasetId}-title`}
      >
        {title}
      </h3>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline @min-[40rem]:grid-cols-4">
        {dataset.rows.map((row) => (
          <div className="bg-black p-4" key={cellText(row.label)}>
            <dt className="text-sm text-neutral-400">{cellText(row.label)}</dt>
            <dd className="mt-1 text-3xl font-semibold text-accent tabular-nums">
              {cellText(row.value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
