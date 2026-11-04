"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { cn } from "lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

import { useGenuiDataset } from "../genui-dataset-context";
import { cellText, rowHref } from "./dataset-cell";

type Sort = { direction: "asc" | "desc"; key: string } | null;

export const DataTableView = ({
  columns,
  datasetId,
  title,
}: {
  columns?: string[];
  datasetId: string;
  title: string;
}) => {
  const dataset = useGenuiDataset(datasetId);
  const [sort, setSort] = useState<Sort>(null);

  const shown = useMemo(
    () =>
      (dataset?.columns ?? []).filter(
        (column) => !columns?.length || columns.includes(column.key)
      ),
    [columns, dataset]
  );
  const rows = useMemo(() => {
    if (!dataset) return [];
    const indexed = dataset.rows.map((row, index) => ({ index, row }));
    if (!sort) return indexed;
    const column = dataset.columns.find((item) => item.key === sort.key);
    return [...indexed].sort((a, b) => {
      const left = a.row[sort.key];
      const right = b.row[sort.key];
      const leftMissing = left === null || left === undefined;
      const rightMissing = right === null || right === undefined;
      // Missing values sort last in either direction.
      if (leftMissing || rightMissing) {
        return leftMissing === rightMissing ? 0 : leftMissing ? 1 : -1;
      }
      const order =
        column?.type === "number"
          ? Number(left) - Number(right)
          : String(left).localeCompare(String(right));
      return sort.direction === "asc" ? order : -order;
    });
  }, [dataset, sort]);

  if (!dataset) return null;

  const toggle = (key: string) =>
    setSort((current) =>
      current?.key === key
        ? current.direction === "asc"
          ? { direction: "desc", key }
          : null
        : { direction: "asc", key }
    );

  return (
    <section
      aria-labelledby={`${datasetId}-title`}
      className="min-w-0 space-y-3"
      data-genui-block="table"
    >
      <h3
        className="text-lg font-semibold text-white"
        id={`${datasetId}-title`}
      >
        {title}
      </h3>
      <div
        aria-label={title}
        className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-accent"
        role="region"
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keyboard users scroll wide tables
        tabIndex={0}
      >
        <Table className="min-w-[44rem] font-mono text-sm text-neutral-200">
          <TableHeader>
            <TableRow className="border-hairline hover:bg-transparent">
              {shown.map((column) => {
                const active = sort?.key === column.key ? sort : null;
                return (
                  <TableHead
                    aria-sort={
                      active
                        ? active.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className={cn(
                      "px-0 pr-4",
                      column.type === "number" && "text-right"
                    )}
                    key={column.key}
                    scope="col"
                  >
                    <button
                      className="inline-flex min-h-11 cursor-pointer items-center gap-1 text-neutral-400 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                      onClick={() => toggle(column.key)}
                      type="button"
                    >
                      {column.label}
                      <span aria-hidden="true">
                        {active ? (active.direction === "asc" ? "↑" : "↓") : ""}
                      </span>
                    </button>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(({ index, row }) => (
              <TableRow
                className="border-hairline hover:bg-white/5"
                key={`${index}-${String(row[shown[0]?.key ?? ""] ?? "")}`}
              >
                {shown.map((column, columnIndex) => {
                  const href =
                    columnIndex === 0 ? rowHref(dataset, index) : null;
                  const text = cellText(row[column.key]);
                  return (
                    <TableCell
                      className={cn(
                        "px-0 py-3 pr-4 align-top whitespace-normal",
                        column.type === "number" && "text-right tabular-nums",
                        text === "Not recorded" && "text-neutral-500"
                      )}
                      key={column.key}
                    >
                      {href ? (
                        <Link
                          className="text-accent hover:underline"
                          href={href}
                        >
                          {text}
                        </Link>
                      ) : (
                        text
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
