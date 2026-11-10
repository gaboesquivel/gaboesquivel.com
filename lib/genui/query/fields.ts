/**
 * The single declaration of what a view can query. The planner prompt, the
 * query executor and the envelope validator all read it, so adding a field is
 * a data change here plus tests. Only fields the site already shows publicly
 * are declared. This module holds no published data.
 */
type FieldType = "flag" | "list" | "longtext" | "number" | "text";

export const operations = [
  "equals",
  "anyOf",
  "contains",
  "gte",
  "lte",
  "lastYears",
] as const;

type Operation = (typeof operations)[number];

export type QueryDatasetName = "posts" | "projects";

export interface FieldColumn {
  key: string;
  label: string;
  type: "number" | "text";
}

export interface FieldDef {
  /** The table column this field fills; absent for filter-only fields. */
  column?: FieldColumn;
  dataset: QueryDatasetName;
  groupable: boolean;
  key: string;
  label: string;
  ops: readonly Operation[];
  type: FieldType;
}

const textOps = ["equals", "anyOf", "contains"] as const;
const listOps = ["equals", "anyOf", "contains"] as const;
const numberOps = ["equals", "anyOf", "gte", "lte"] as const;

const col = (
  key: string,
  label: string,
  type: "number" | "text" = "text"
): FieldColumn => ({ key, label, type });

const fieldRegistry: readonly FieldDef[] = [
  {
    column: col("title", "Project"),
    dataset: "projects",
    groupable: false,
    key: "title",
    label: "Project",
    ops: textOps,
    type: "text",
  },
  {
    column: col("role", "Role"),
    dataset: "projects",
    groupable: true,
    key: "role",
    label: "Role",
    ops: textOps,
    type: "text",
  },
  {
    column: col("company", "Company"),
    dataset: "projects",
    groupable: true,
    key: "company",
    label: "Company",
    ops: textOps,
    type: "text",
  },
  {
    column: col("year", "Year", "number"),
    dataset: "projects",
    groupable: true,
    key: "year",
    label: "Year",
    ops: [...numberOps, "lastYears"],
    type: "number",
  },
  {
    column: col("domain", "Domain"),
    dataset: "projects",
    groupable: true,
    key: "domain",
    label: "Domain",
    ops: listOps,
    type: "list",
  },
  {
    column: col("technologies", "Stack"),
    dataset: "projects",
    groupable: true,
    key: "technology",
    label: "Technology",
    ops: listOps,
    type: "list",
  },
  {
    column: col("type", "Type"),
    dataset: "projects",
    groupable: true,
    key: "type",
    label: "Type",
    ops: listOps,
    type: "list",
  },
  {
    dataset: "projects",
    groupable: false,
    key: "featured",
    label: "Featured",
    ops: ["equals"],
    type: "flag",
  },
  {
    dataset: "projects",
    groupable: false,
    key: "recent",
    label: "Recent",
    ops: ["equals"],
    type: "flag",
  },
  {
    dataset: "projects",
    groupable: false,
    key: "achievements",
    label: "Achievements",
    ops: ["contains"],
    type: "longtext",
  },
  {
    dataset: "projects",
    groupable: false,
    key: "story",
    label: "Story",
    ops: ["contains"],
    type: "longtext",
  },
  {
    column: col("title", "Post"),
    dataset: "posts",
    groupable: false,
    key: "title",
    label: "Post",
    ops: textOps,
    type: "text",
  },
  {
    column: col("published", "Published"),
    dataset: "posts",
    groupable: false,
    key: "published",
    label: "Published",
    ops: ["equals", "contains"],
    type: "text",
  },
  {
    dataset: "posts",
    groupable: true,
    key: "year",
    label: "Year",
    ops: [...numberOps, "lastYears"],
    type: "number",
  },
  {
    column: col("category", "Category"),
    dataset: "posts",
    groupable: true,
    key: "category",
    label: "Category",
    ops: listOps,
    type: "list",
  },
  {
    dataset: "posts",
    groupable: false,
    key: "recent",
    label: "Recent",
    ops: ["equals"],
    type: "flag",
  },
  {
    dataset: "posts",
    groupable: false,
    key: "summary",
    label: "Summary",
    ops: ["contains"],
    type: "longtext",
  },
];

/** The column an excerpt search adds; its cells are quoted, never written. */
export const excerptColumn: FieldColumn = col("mentions", "Mentions");

export const fieldsFor = (dataset: QueryDatasetName) =>
  fieldRegistry.filter((field) => field.dataset === dataset);

export const findField = (dataset: QueryDatasetName, key: string) =>
  fieldRegistry.find((field) => field.dataset === dataset && field.key === key);

/** Unique keys across datasets, for the plan schema's enums. */
export const fieldKeys = [
  ...new Set(fieldRegistry.map((field) => field.key)),
] as [string, ...string[]];

export const groupableKeys = [
  ...new Set(
    fieldRegistry.filter((field) => field.groupable).map((field) => field.key)
  ),
] as [string, ...string[]];

/** Column keys a dataset may carry: registry columns, groupings and excerpts. */
export const declaredColumnKeys: ReadonlySet<string> = new Set([
  ...fieldRegistry.flatMap((field) => (field.column ? [field.column.key] : [])),
  excerptColumn.key,
  "count",
  "label",
  "value",
]);

/** A compact description for the planner prompt, derived from the registry. */
export const registryDigest = () =>
  (["projects", "posts"] as const)
    .map((dataset) => {
      const fields = fieldsFor(dataset)
        .map(
          (field) =>
            `${field.key} (${field.type}; ${field.ops.join("/")}${field.groupable ? "; groupable" : ""})`
        )
        .join(", ");
      return `Dataset "${dataset}" fields: ${fields}.`;
    })
    .join("\n");
