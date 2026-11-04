"use client";

import Link from "next/link";

import { useGenuiDataset } from "../genui-dataset-context";
import { cellText, rowHref } from "./dataset-cell";

export const DataBoardView = ({
  datasetId,
  groupField,
  title,
}: {
  datasetId: string;
  groupField: string;
  title: string;
}) => {
  const dataset = useGenuiDataset(datasetId);
  if (!dataset) return null;
  const detail = dataset.columns.filter(
    (column) => column.key !== groupField && column.key !== "title"
  );
  const groups = new Map<string, { href: string | null; row: number }[]>();
  for (const [index, row] of dataset.rows.entries()) {
    const key = cellText(row[groupField]);
    const cards = groups.get(key) ?? [];
    cards.push({ href: rowHref(dataset, index), row: index });
    groups.set(key, cards);
  }

  return (
    <section
      aria-labelledby={`${datasetId}-title`}
      className="min-w-0 space-y-3"
      data-genui-block="board"
    >
      <h3
        className="text-lg font-semibold text-white"
        id={`${datasetId}-title`}
      >
        {title}
      </h3>
      <ul className="grid gap-4 @min-[40rem]:grid-cols-2 @min-[64rem]:grid-cols-3">
        {[...groups.entries()].map(([group, cards]) => (
          <li className="min-w-0" key={group}>
            <h4 className="mb-2 flex items-baseline justify-between border-b border-hairline pb-2 font-mono text-sm text-neutral-300">
              <span>{group}</span>
              <span className="text-neutral-400 tabular-nums">
                {cards.length}
              </span>
            </h4>
            <ul className="space-y-2">
              {cards.map(({ href, row }) => {
                const data = dataset.rows[row];
                const name = cellText(data?.title ?? data?.label);
                return (
                  <li
                    className="rounded-lg border border-hairline bg-neutral-900 p-3 text-sm"
                    key={row}
                  >
                    {href ? (
                      <Link
                        className="font-semibold text-accent hover:underline"
                        href={href}
                      >
                        {name}
                      </Link>
                    ) : (
                      <span className="font-semibold text-white">{name}</span>
                    )}
                    <p className="mt-1 text-neutral-400">
                      {detail
                        .map((column) => cellText(data?.[column.key]))
                        .filter((text) => text !== "Not recorded")
                        .join(" · ")}
                    </p>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
