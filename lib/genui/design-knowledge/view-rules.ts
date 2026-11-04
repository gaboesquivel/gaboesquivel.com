import type { CompileErrorCode } from "../contract/errors";
import {
  GENUI_MAX_BOARD_COLUMNS,
  GENUI_MAX_DATASET_ROWS,
  GENUI_MAX_DATASETS,
  GENUI_MAX_STAT_TILES,
  GENUI_MAX_VIEW_BLOCKS,
  GENUI_MAX_VIEW_CHARTS,
  isChartKind,
  isViewBlockName,
} from "../dataset";
import type { GenuiDataset, ViewBlockName } from "../dataset";
import type { PublicRecord } from "../envelope";

export interface ViewBlock {
  props: Record<string, unknown>;
  typeName: ViewBlockName;
}

export const parseViewBlocks = (
  raw: unknown
): { blocks: ViewBlock[]; ok: true } | { ok: false } => {
  if (!Array.isArray(raw)) return { ok: false };
  if (raw.length < 1 || raw.length > GENUI_MAX_VIEW_BLOCKS)
    return { ok: false };
  const blocks: ViewBlock[] = [];
  for (const item of raw) {
    if (
      !item ||
      typeof item !== "object" ||
      (item as { type?: string }).type !== "element"
    ) {
      return { ok: false };
    }
    const { props, typeName } = item as {
      props?: Record<string, unknown>;
      typeName?: unknown;
    };
    if (!isViewBlockName(typeName) || !props) return { ok: false };
    blocks.push({ props, typeName });
  }
  return { blocks, ok: true };
};

type RuleResult =
  | { ok: true; referencedRecordIds: string[] }
  | { code: CompileErrorCode; detail: string; ok: false };

const fail = (code: CompileErrorCode, detail: string): RuleResult => ({
  code,
  detail,
  ok: false,
});

const hasColumn = (
  dataset: GenuiDataset,
  key: string,
  type?: "number" | "text"
) =>
  dataset.columns.some(
    (column) => column.key === key && (!type || column.type === type)
  );

/**
 * Design knowledge for generated views: validity rules for primitives and
 * their relationships, checked on the whole composed document. These encode
 * what makes a table, chart or board usable and accessible, so a
 * schema-valid but incoherent view is rejected like any other bad output.
 */
export const validateViewDocument = ({
  datasets,
  props,
  records,
}: {
  datasets: readonly GenuiDataset[];
  props: Record<string, unknown>;
  records: readonly PublicRecord[];
}): RuleResult => {
  if (typeof props.title !== "string" || !props.title.trim()) {
    return fail("view_rule_violation", "view needs a title for its heading");
  }
  const parsed = parseViewBlocks(props.blocks);
  if (!parsed.ok) return fail("invalid_property_type", "blocks");

  if (datasets.length < 1 || datasets.length > GENUI_MAX_DATASETS) {
    return fail("missing_dataset", "dataset count");
  }
  const byId = new Map<string, GenuiDataset>();
  const recordIds = new Set(records.map((record) => record.id));
  for (const dataset of datasets) {
    if (byId.has(dataset.id)) return fail("missing_dataset", "duplicate id");
    byId.set(dataset.id, dataset);
    if (dataset.rows.length > GENUI_MAX_DATASET_ROWS) {
      return fail("oversized_document", "dataset rows");
    }
    const keys = dataset.columns.map((column) => column.key);
    if (new Set(keys).size !== keys.length || keys.length === 0) {
      return fail("invalid_dataset_field", "column keys");
    }
    for (const recordId of dataset.recordIds) {
      if (!recordIds.has(recordId)) return fail("missing_record", recordId);
    }
  }

  const used = new Set<string>();
  let charts = 0;
  let statRows = 0;
  for (const block of parsed.blocks) {
    const title = block.props.title;
    if (typeof title !== "string" || !title.trim()) {
      return fail("view_rule_violation", `${block.typeName} needs a title`);
    }
    const dataset = byId.get(String(block.props.datasetId));
    if (!dataset) return fail("missing_dataset", String(block.props.datasetId));
    used.add(dataset.id);
    if (dataset.rows.length === 0) {
      return fail("view_rule_violation", `${dataset.id} has no rows`);
    }

    if (block.typeName === "DataTable") {
      const columns = block.props.columns;
      if (Array.isArray(columns)) {
        if (columns.length === 0) {
          return fail("view_rule_violation", "table needs a column");
        }
        for (const key of columns) {
          if (!hasColumn(dataset, String(key))) {
            return fail("invalid_dataset_field", String(key));
          }
        }
      }
    }

    if (block.typeName === "DataChart") {
      charts += 1;
      const numeric = dataset.columns.filter(
        (column) => column.type === "number"
      );
      const text = dataset.columns.filter((column) => column.type === "text");
      if (!isChartKind(block.props.kind)) {
        return fail("invalid_property_type", "chart kind");
      }
      if (numeric.length < 1 || text.length < 1 || dataset.rows.length < 2) {
        return fail(
          "view_rule_violation",
          "chart needs a category column, a numeric column and two rows"
        );
      }
      if (block.props.kind === "pie" && dataset.rows.length > 8) {
        return fail("view_rule_violation", "pie chart over 8 slices");
      }
    }

    if (block.typeName === "StatRow") {
      statRows += 1;
      if (
        !hasColumn(dataset, "label", "text") ||
        !hasColumn(dataset, "value", "number") ||
        dataset.rows.length > GENUI_MAX_STAT_TILES
      ) {
        return fail("view_rule_violation", "stat row shape");
      }
    }

    if (block.typeName === "DataBoard") {
      const field = String(block.props.groupField);
      if (!hasColumn(dataset, field, "text")) {
        return fail("invalid_dataset_field", field);
      }
      const groups = new Set(
        dataset.rows.map((row) => String(row[field] ?? ""))
      );
      if (groups.size > GENUI_MAX_BOARD_COLUMNS) {
        return fail("view_rule_violation", "board columns");
      }
    }
  }
  if (charts > GENUI_MAX_VIEW_CHARTS || statRows > 2) {
    return fail("excessive_complexity", "too many charts or stat rows");
  }
  if (used.size !== datasets.length) {
    return fail("view_rule_violation", "unused dataset");
  }

  const referenced = new Set<string>();
  for (const dataset of datasets) {
    for (const recordId of dataset.recordIds) referenced.add(recordId);
  }
  // A record no dataset cites would be unsupported evidence in the envelope.
  for (const record of records) {
    if (!referenced.has(record.id)) {
      return fail("view_rule_violation", `uncited record ${record.id}`);
    }
  }
  return { ok: true, referencedRecordIds: [...referenced] };
};
