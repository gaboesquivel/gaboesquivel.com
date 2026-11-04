import { projects } from "gaboesquivel";
import type { Project } from "gaboesquivel";
import { z } from "zod";

import { postRecord, publishedPosts } from "../content-records";
import { GENUI_MAX_DATASET_ROWS } from "../dataset";
import type { DatasetColumn, DatasetValue, GenuiDataset } from "../dataset";
import type { PublicRecord } from "../envelope";
import { fintechProjectSlugs } from "../fintech-projects";
import { projectToPublicRecord } from "../public-records";

/**
 * The only datasets a view can read. Each field maps to one package or
 * published-post field, so a table cell is never written by the model.
 */
export const datasetNames = ["projects", "posts", "overview"] as const;

export const groupByFields = [
  "technology",
  "domain",
  "type",
  "year",
  "category",
] as const;

export const filterFields = [
  "technology",
  "domain",
  "type",
  "year",
  "category",
] as const;

export const querySpecSchema = z.object({
  dataset: z.enum(datasetNames),
  filters: z
    .array(
      z.object({
        field: z.enum(filterFields),
        value: z.string().max(60),
      })
    )
    .max(3),
  groupBy: z.enum(groupByFields).nullable(),
  limit: z.number().int().min(1).max(GENUI_MAX_DATASET_ROWS).nullable(),
  sortBy: z.string().max(30).nullable(),
  sortDirection: z.enum(["asc", "desc"]).nullable(),
});

export type QuerySpec = z.infer<typeof querySpecSchema>;

interface BaseRow {
  category: string[];
  domain: string[];
  recordId: string;
  technology: string[];
  type: string[];
  values: Record<string, DatasetValue>;
  year: number | null;
}

const domainsOf = (project: Project) => {
  const domains: string[] = [];
  if (project.type.includes("ai")) domains.push("AI");
  if (project.type.includes("web3")) domains.push("Web3");
  if ((fintechProjectSlugs as readonly string[]).includes(project.slug))
    domains.push("Fintech");
  return domains;
};

const projectRows = (): BaseRow[] =>
  [...projects]
    .sort((a, b) => a.order - b.order)
    .map((project) => {
      const domain = domainsOf(project);
      return {
        category: [],
        domain,
        recordId: projectToPublicRecord(project).id,
        technology: [...project.tech],
        type: [...project.type],
        values: {
          domain: domain.join(", ") || null,
          role: project.role ?? null,
          technologies: project.tech.join(", ") || null,
          title: project.title,
          type: project.type.join(", ") || null,
          year: project.year ?? null,
        },
        year: project.year ?? null,
      };
    });

const postRows = (): BaseRow[] =>
  publishedPosts().map((post) => ({
    category: [...(post.category ?? [])],
    domain: [],
    recordId: postRecord(post).id,
    technology: [],
    type: [],
    values: {
      category: (post.category ?? []).join(", ") || null,
      published: post.publishedAt ?? null,
      title: post.title,
    },
    year: post.publishedAt ? Number(post.publishedAt.slice(0, 4)) : null,
  }));

const projectColumns: DatasetColumn[] = [
  { key: "title", label: "Project", type: "text" },
  { key: "role", label: "Role", type: "text" },
  { key: "year", label: "Year", type: "number" },
  { key: "domain", label: "Domain", type: "text" },
  { key: "technologies", label: "Stack", type: "text" },
  { key: "type", label: "Type", type: "text" },
];

const postColumns: DatasetColumn[] = [
  { key: "title", label: "Post", type: "text" },
  { key: "published", label: "Published", type: "text" },
  { key: "category", label: "Category", type: "text" },
];

const groupLabels: Record<(typeof groupByFields)[number], string> = {
  category: "Category",
  domain: "Domain",
  technology: "Technology",
  type: "Type",
  year: "Year",
};

const matches = (row: BaseRow, field: string, value: string) => {
  const needle = value.trim().toLowerCase();
  if (!needle) return true;
  if (field === "year") return String(row.year ?? "") === needle;
  const haystack = row[field as "technology" | "domain" | "type" | "category"];
  if (!Array.isArray(haystack)) return false;
  return haystack.some((item) => item.toLowerCase() === needle);
};

const groupValues = (row: BaseRow, field: (typeof groupByFields)[number]) => {
  if (field === "year") return row.year === null ? [] : [String(row.year)];
  return row[field];
};

export const datasetColumns = (name: QuerySpec["dataset"]): DatasetColumn[] =>
  name === "projects"
    ? projectColumns
    : name === "posts"
      ? postColumns
      : [
          { key: "label", label: "Measure", type: "text" },
          { key: "value", label: "Value", type: "number" },
        ];

const overviewDataset = ({ id }: { id: string }): GenuiDataset => {
  const rows = projectRows();
  const posts = postRows();
  const technologies = new Set(rows.flatMap((row) => row.technology));
  const years = rows.flatMap((row) => (row.year === null ? [] : [row.year]));
  const span = years.length ? Math.max(...years) - Math.min(...years) + 1 : 0;
  return {
    columns: datasetColumns("overview"),
    id,
    recordIds: [...rows, ...posts].map((row) => row.recordId),
    rows: [
      { label: "Published projects", value: rows.length },
      { label: "Technologies used", value: technologies.size },
      { label: "Years of project work", value: span },
      { label: "Published posts", value: posts.length },
    ],
    title: "Portfolio overview",
  };
};

/**
 * Runs a bounded read-only query over published records. An unknown sort
 * field falls back to the dataset order rather than failing, so a stray model
 * choice cannot widen what is read.
 */
export const executeQuery = ({
  id,
  spec,
}: {
  id: string;
  spec: QuerySpec;
}): GenuiDataset => {
  if (spec.dataset === "overview") return overviewDataset({ id });

  const base = spec.dataset === "projects" ? projectRows() : postRows();
  const filtered = base.filter((row) =>
    spec.filters.every((filter) => matches(row, filter.field, filter.value))
  );
  const limit = spec.limit ?? GENUI_MAX_DATASET_ROWS;

  if (spec.groupBy) {
    const field = spec.groupBy;
    const groups = new Map<string, Set<string>>();
    for (const row of filtered) {
      for (const value of groupValues(row, field)) {
        const ids = groups.get(value) ?? new Set<string>();
        ids.add(row.recordId);
        groups.set(value, ids);
      }
    }
    const direction = spec.sortDirection === "asc" ? 1 : -1;
    const byLabel =
      spec.sortBy === "label" || spec.sortBy === groupLabels[field];
    const rows = [...groups.entries()]
      .map(([label, ids]) => ({ count: ids.size, ids, label }))
      .sort((a, b) =>
        byLabel
          ? direction *
            a.label.localeCompare(b.label, undefined, { numeric: true })
          : direction * (a.count - b.count) || a.label.localeCompare(b.label)
      )
      .slice(0, limit);
    return {
      columns: [
        { key: "label", label: groupLabels[field], type: "text" },
        { key: "count", label: "Count", type: "number" },
      ],
      id,
      recordIds: [...new Set(rows.flatMap((row) => [...row.ids]))],
      rows: rows.map((row) => ({ count: row.count, label: row.label })),
      title: `${spec.dataset === "projects" ? "Projects" : "Posts"} by ${groupLabels[field].toLowerCase()}`,
    };
  }

  const columns = datasetColumns(spec.dataset);
  const sortColumn = columns.find((column) => column.key === spec.sortBy);
  const sorted = sortColumn
    ? [...filtered].sort((a, b) => {
        const left = a.values[sortColumn.key] ?? "";
        const right = b.values[sortColumn.key] ?? "";
        const order =
          typeof left === "number" && typeof right === "number"
            ? left - right
            : String(left).localeCompare(String(right));
        return spec.sortDirection === "desc" ? -order : order;
      })
    : filtered;
  const rows = sorted.slice(0, limit);
  return {
    columns,
    id,
    recordIds: rows.map((row) => row.recordId),
    rows: rows.map((row) => row.values),
    title: spec.dataset === "projects" ? "Projects" : "Posts",
  };
};

/** Records the datasets cite, deduplicated, ready for the envelope. */
export const recordsForDatasets = (
  datasets: readonly GenuiDataset[]
): PublicRecord[] => {
  const ids = new Set(datasets.flatMap((dataset) => dataset.recordIds));
  const records: PublicRecord[] = [];
  for (const project of projects) {
    const record = projectToPublicRecord(project);
    if (ids.has(record.id)) records.push(record);
  }
  for (const post of publishedPosts()) {
    const record = postRecord(post);
    if (ids.has(record.id)) records.push(record);
  }
  return records;
};
