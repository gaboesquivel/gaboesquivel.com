"use client";

import { isChartKind, isViewArrangement } from "lib/genui/dataset";
import type { ViewArrangement } from "lib/genui/dataset";
import { parseViewBlocks } from "lib/genui/design-knowledge/view-rules";
import type { ViewBlock } from "lib/genui/design-knowledge/view-rules";
import { cn } from "lib/utils";

import { DataBoardView } from "./data-board";
import { DataChartView } from "./data-chart";
import { DataTableView } from "./data-table";
import { StatRowView } from "./stat-row";

const arrangementClass: Record<ViewArrangement, string> = {
  "columns-2": "@min-[48rem]:grid-cols-2",
  "columns-3": "@min-[48rem]:grid-cols-2 @min-[72rem]:grid-cols-3",
  "split-1-2": "@min-[48rem]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
  "split-2-1": "@min-[48rem]:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]",
  stack: "",
};

const strings = (value: unknown) =>
  Array.isArray(value) ? value.map(String) : undefined;

const BlockView = ({ block }: { block: ViewBlock }) => {
  const { props } = block;
  const datasetId = String(props.datasetId ?? "");
  const title = String(props.title ?? "");
  if (block.typeName === "DataTable") {
    return (
      <DataTableView
        columns={strings(props.columns)}
        datasetId={datasetId}
        title={title}
      />
    );
  }
  if (block.typeName === "DataChart" && isChartKind(props.kind)) {
    return (
      <DataChartView datasetId={datasetId} kind={props.kind} title={title} />
    );
  }
  if (block.typeName === "StatRow") {
    return <StatRowView datasetId={datasetId} title={title} />;
  }
  if (block.typeName === "DataBoard") {
    return (
      <DataBoardView
        datasetId={datasetId}
        groupField={String(props.groupField ?? "")}
        title={title}
      />
    );
  }
  return null;
};

export const ViewExperienceView = ({
  arrangement,
  blocks,
  note,
  title,
}: {
  arrangement: string;
  blocks: unknown;
  note?: string;
  title: string;
}) => {
  const parsed = parseViewBlocks(blocks);
  if (!parsed.ok) return null;
  const layout = isViewArrangement(arrangement) ? arrangement : "stack";
  return (
    <section
      aria-labelledby="genui-view-title"
      className="min-w-0 space-y-6"
      data-genui-view={layout}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white" id="genui-view-title">
          {title}
        </h2>
        {note ? <p className="max-w-2xl text-neutral-400">{note}</p> : null}
      </div>
      <div className={cn("grid min-w-0 gap-10", arrangementClass[layout])}>
        {parsed.blocks.map((block, index) => (
          <div
            className={cn(
              "min-w-0",
              block.typeName === "StatRow" && "col-span-full"
            )}
            key={`${block.typeName}-${index}`}
          >
            <BlockView block={block} />
          </div>
        ))}
      </div>
    </section>
  );
};
