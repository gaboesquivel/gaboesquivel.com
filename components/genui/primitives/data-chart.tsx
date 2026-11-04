"use client";

import type { ChartKind } from "lib/genui/dataset";
import dynamic from "next/dynamic";

import { useGenuiDataset } from "../genui-dataset-context";
import { cellText } from "./dataset-cell";

/** recharts loads only when a result contains a chart, never on the homepage. */
const DataChartImpl = dynamic(() => import("./data-chart-impl"), {
  loading: () => (
    <div
      aria-hidden="true"
      className="h-72 w-full animate-pulse rounded-lg bg-neutral-900"
    />
  ),
  ssr: false,
});

const kindLabel: Record<ChartKind, string> = {
  area: "Area chart",
  bar: "Bar chart",
  line: "Line chart",
  pie: "Pie chart",
};

export const DataChartView = ({
  datasetId,
  kind,
  title,
}: {
  datasetId: string;
  kind: ChartKind;
  title: string;
}) => {
  const dataset = useGenuiDataset(datasetId);
  if (!dataset) return null;
  const label = dataset.columns.find((column) => column.type === "text");
  const value = dataset.columns.find((column) => column.type === "number");
  if (!label || !value) return null;
  const summary = dataset.rows
    .slice(0, 5)
    .map((row) => `${cellText(row[label.key])} ${cellText(row[value.key])}`)
    .join(", ");

  return (
    <figure
      aria-labelledby={`${datasetId}-title`}
      className="min-w-0 space-y-3"
      data-genui-block="chart"
    >
      <figcaption
        className="text-lg font-semibold text-white"
        id={`${datasetId}-title`}
      >
        {title}
      </figcaption>
      <div aria-label={`${kindLabel[kind]}: ${title}. ${summary}.`} role="img">
        <DataChartImpl dataset={dataset} kind={kind} />
      </div>
      <details className="text-sm text-neutral-400">
        <summary className="min-h-11 cursor-pointer py-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
          View data as a table
        </summary>
        <table className="mt-2 w-full font-mono text-neutral-200">
          <thead>
            <tr className="border-b border-hairline text-left text-neutral-400">
              <th className="py-2 pr-4 font-normal" scope="col">
                {label.label}
              </th>
              <th className="py-2 text-right font-normal" scope="col">
                {value.label}
              </th>
            </tr>
          </thead>
          <tbody>
            {dataset.rows.map((row) => (
              <tr
                className="border-b border-hairline"
                key={cellText(row[label.key])}
              >
                <td className="py-2 pr-4">{cellText(row[label.key])}</td>
                <td className="py-2 text-right tabular-nums">
                  {cellText(row[value.key])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
};
