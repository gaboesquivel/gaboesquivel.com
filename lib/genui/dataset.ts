/** Cell values are strings, numbers or null; null renders as "Not recorded". */
export type DatasetValue = string | number | null;

export interface DatasetColumn {
  /** Cells quote these source fields verbatim; the compiler checks they do. */
  excerpt?: { fields: string[] };
  key: string;
  label: string;
  type: "number" | "text";
}

/**
 * Rows the application computed from published records. The model never
 * supplies a value: it names a dataset, and `recordIds` cite the records every
 * row came from so the envelope can prove grounding.
 */
export interface GenuiDataset {
  columns: DatasetColumn[];
  id: string;
  recordIds: string[];
  rows: Record<string, DatasetValue>[];
  title: string;
}

export const missingDatasetValue = "Not recorded";

export const GENUI_MAX_DATASETS = 6;
export const GENUI_EXCERPT_MAX_CHARS = 240;
export const GENUI_MAX_DATASET_ROWS = 50;
export const GENUI_MAX_VIEW_BLOCKS = 6;
export const GENUI_MAX_VIEW_CHARTS = 4;
export const GENUI_MAX_STAT_TILES = 4;
export const GENUI_MAX_BOARD_COLUMNS = 6;

export const viewArrangements = [
  "stack",
  "columns-2",
  "columns-3",
  "split-2-1",
  "split-1-2",
] as const;

export type ViewArrangement = (typeof viewArrangements)[number];

export const chartKinds = ["bar", "line", "area", "pie"] as const;

export type ChartKind = (typeof chartKinds)[number];

const viewBlockNames = [
  "DataTable",
  "DataChart",
  "StatRow",
  "DataBoard",
] as const;

export type ViewBlockName = (typeof viewBlockNames)[number];

export const isViewBlockName = (value: unknown): value is ViewBlockName =>
  typeof value === "string" &&
  (viewBlockNames as readonly string[]).includes(value);

export const isViewArrangement = (value: unknown): value is ViewArrangement =>
  typeof value === "string" &&
  (viewArrangements as readonly string[]).includes(value);

export const isChartKind = (value: unknown): value is ChartKind =>
  typeof value === "string" &&
  (chartKinds as readonly string[]).includes(value);
