import type { CompileErrorCode } from "../contract/errors";
import {
  GENUI_EXCERPT_MAX_CHARS,
  GENUI_MAX_BOARD_COLUMNS,
  GENUI_MAX_DATASET_ROWS,
  GENUI_MAX_DATASETS,
  GENUI_MAX_STAT_TILES,
  GENUI_MAX_VIEW_CHARTS,
  isChartKind,
} from "../dataset";
import type { GenuiDataset } from "../dataset";
import type { PublicRecord } from "../envelope";
import { declaredColumnKeys, excerptColumn } from "../query/fields";
import { parseViewBlocks } from "./view-blocks";

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

/** Reads a record's published text; the server supplies it, the browser does not. */
export type SourceUnitsResolver = (input: {
  field: string;
  recordId: string;
}) => string[];

const EXCERPT_SOURCE_FIELDS = new Set(["achievements", "story", "summary"]);

const normalizeSpace = (text: string) => text.replace(/\s+/gu, " ").trim();

/**
 * Columns must be declared in the field registry. The quoted "mentions" column
 * must carry its excerpt marker and no other column may, so a hand-edited
 * envelope cannot smuggle free text through an unchecked column. Where the
 * caller supplies the sources (the server), every excerpt must be a substring
 * of its record's text; the browser skips that read to keep published text out
 * of the compile path, and the server already validated the same envelope.
 */
const checkDatasetColumns = ({
  dataset,
  sourceUnits,
}: {
  dataset: GenuiDataset;
  sourceUnits?: SourceUnitsResolver;
}): RuleResult => {
  for (const column of dataset.columns) {
    if (!declaredColumnKeys.has(column.key)) {
      return fail("invalid_dataset_field", column.key);
    }
    const quoted = column.key === excerptColumn.key;
    if (quoted !== Boolean(column.excerpt)) {
      return fail("view_rule_violation", `excerpt marker on ${column.key}`);
    }
    if (!column.excerpt) continue;
    if (
      column.excerpt.fields.length === 0 ||
      !column.excerpt.fields.every((field) => EXCERPT_SOURCE_FIELDS.has(field))
    ) {
      return fail("view_rule_violation", "excerpt source field");
    }
    if (dataset.recordIds.length !== dataset.rows.length) {
      return fail(
        "view_rule_violation",
        "excerpt rows must cite one record each"
      );
    }
    for (const [index, row] of dataset.rows.entries()) {
      const value = row[column.key];
      if (value === null || value === undefined) continue;
      if (
        typeof value !== "string" ||
        value.length > GENUI_EXCERPT_MAX_CHARS + 2
      ) {
        return fail("view_rule_violation", "excerpt shape");
      }
      const quote = normalizeSpace(value.replace(/^…/u, "").replace(/…$/u, ""));
      if (!quote) return fail("view_rule_violation", "empty excerpt");
      if (!sourceUnits) continue;
      const recordId = dataset.recordIds[index] ?? "";
      const found = column.excerpt.fields.some((field) =>
        sourceUnits({ field, recordId }).some((unit) =>
          normalizeSpace(unit).includes(quote)
        )
      );
      if (!found) return fail("view_rule_violation", "excerpt not in source");
    }
  }
  return { ok: true, referencedRecordIds: [] };
};

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
  sourceUnits,
}: {
  datasets: readonly GenuiDataset[];
  props: Record<string, unknown>;
  records: readonly PublicRecord[];
  sourceUnits?: SourceUnitsResolver;
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
    const excerpts = checkDatasetColumns({ dataset, sourceUnits });
    if (!excerpts.ok) return excerpts;
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
