import { projects } from "gaboesquivel";
import type { Project } from "gaboesquivel";
import { featuredProjectSlugs } from "lib/work-types";
import { homepageEditorialSlugs } from "lib/work/project-cover";
import { z } from "zod";

import { postRecord, publishedPosts } from "../content-records";
import { GENUI_EXCERPT_MAX_CHARS, GENUI_MAX_DATASET_ROWS } from "../dataset";
import type { DatasetColumn, DatasetValue, GenuiDataset } from "../dataset";
import type { PublicRecord } from "../envelope";
import { fintechProjectSlugs } from "../fintech-projects";
import { projectToPublicRecord } from "../public-records";
import {
  excerptColumn,
  fieldKeys,
  fieldsFor,
  findField,
  groupableKeys,
  operations,
} from "./fields";
import type { FieldDef, QueryDatasetName } from "./fields";
import { sourceUnits } from "./source-text";

/**
 * The only datasets a view can read. Every queryable field is declared in
 * `fields.ts`; each maps to one package or published-post field, so a table
 * cell is never written by the model.
 */
export const datasetNames = ["projects", "posts", "overview"] as const;

export const GENUI_MAX_FILTERS = 6;

export const filterSchema = z.object({
  field: z.enum(fieldKeys),
  op: z.enum(operations),
  value: z.string().max(60),
});

export const querySpecSchema = z.object({
  dataset: z.enum(datasetNames),
  filters: z.array(filterSchema).max(GENUI_MAX_FILTERS),
  groupBy: z.enum(groupableKeys).nullable(),
  limit: z.number().int().min(1).max(GENUI_MAX_DATASET_ROWS).nullable(),
  sortBy: z.string().max(30).nullable(),
  sortDirection: z.enum(["asc", "desc"]).nullable(),
});

export type QuerySpec = z.infer<typeof querySpecSchema>;
export type QueryFilter = z.infer<typeof filterSchema>;

type FieldValue = number | string | string[] | null;

interface DataRow {
  featured: boolean;
  /** Values by registry key. */
  fields: Record<string, FieldValue>;
  recordId: string;
  /** Display cells by column key. */
  show: Record<string, DatasetValue>;
}

const domainsOf = (project: Project) => {
  const domains: string[] = [];
  if (project.type.includes("ai")) domains.push("AI");
  if (project.type.includes("web3")) domains.push("Web3");
  if ((fintechProjectSlugs as readonly string[]).includes(project.slug))
    domains.push("Fintech");
  return domains;
};

/**
 * The site's own answer to "where to start": homepage selected work first,
 * then the rest of the featured set, then everything else in catalog order.
 */
const leadRank = (slug: string) => {
  const home = (homepageEditorialSlugs as readonly string[]).indexOf(slug);
  if (home !== -1) return home;
  const featured = (featuredProjectSlugs as readonly string[]).indexOf(slug);
  if (featured !== -1) return homepageEditorialSlugs.length + featured;
  return Number.MAX_SAFE_INTEGER;
};

const STACK_PREVIEW = 4;

const stackPreview = (tech: readonly string[]) =>
  tech.length > STACK_PREVIEW
    ? `${tech.slice(0, STACK_PREVIEW).join(", ")} +${tech.length - STACK_PREVIEW}`
    : tech.join(", ");

const projectRows = (): DataRow[] =>
  [...projects]
    .sort((a, b) => leadRank(a.slug) - leadRank(b.slug) || a.order - b.order)
    .map((project) => {
      const domain = domainsOf(project);
      return {
        featured: leadRank(project.slug) !== Number.MAX_SAFE_INTEGER,
        fields: {
          achievements: [...project.achievements],
          company: project.experienceCompany ?? null,
          domain,
          role: project.role ?? null,
          story: [...project.story],
          technology: [...project.tech],
          title: project.title,
          type: [...project.type],
          year: project.year ?? null,
        },
        recordId: projectToPublicRecord(project).id,
        show: {
          company: project.experienceCompany ?? null,
          domain: domain.join(", ") || null,
          role: project.role ?? null,
          technologies: stackPreview(project.tech) || null,
          title: project.title,
          type: project.type.join(", ") || null,
          year: project.year ?? null,
        },
      };
    });

const postYear = (publishedAt: string | undefined) => {
  const year = Number(publishedAt?.slice(0, 4));
  return Number.isFinite(year) && year > 0 ? year : null;
};

const postRows = (): DataRow[] =>
  publishedPosts().map((post) => ({
    featured: false,
    fields: {
      category: [...(post.category ?? [])],
      published: post.publishedAt ?? null,
      summary: post.summary ? [post.summary] : [],
      title: post.title,
      year: postYear(post.publishedAt),
    },
    recordId: postRecord(post).id,
    show: {
      category: (post.category ?? []).join(", ") || null,
      published: post.publishedAt ?? null,
      title: post.title,
    },
  }));

const rowsFor = (dataset: QueryDatasetName) =>
  dataset === "projects" ? projectRows() : postRows();

/** "Recent" is the newest few years in the data, so the application owns it. */
export const RECENT_YEARS = 3;

const newestYear = (rows: readonly DataRow[]) => {
  let newest = 0;
  for (const row of rows) {
    const year = row.fields.year;
    if (typeof year === "number") newest = Math.max(newest, year);
  }
  return newest;
};

const norm = (value: string) => value.trim().toLowerCase();

const valuesOf = (raw: FieldValue | undefined): string[] => {
  if (raw === null || raw === undefined) return [];
  if (Array.isArray(raw)) return raw;
  return [String(raw)];
};

const yearOf = (row: DataRow) => {
  const year = row.fields.year;
  return typeof year === "number" ? year : null;
};

const matchesFilter = ({
  def,
  filter,
  newest,
  row,
}: {
  def: FieldDef;
  filter: QueryFilter;
  newest: number;
  row: DataRow;
}) => {
  const needle = norm(filter.value);
  if (!needle) return true;
  if (def.type === "flag") {
    const year = yearOf(row);
    const flag =
      def.key === "featured"
        ? row.featured
        : year !== null && year > newest - RECENT_YEARS;
    if (needle === "yes" || needle === "true") return flag;
    if (needle === "no" || needle === "false") return !flag;
    return false;
  }
  const values = valuesOf(row.fields[def.key]);
  if (filter.op === "equals") return values.some((v) => norm(v) === needle);
  if (filter.op === "anyOf") {
    const options = new Set(needle.split("|").map(norm).filter(Boolean));
    return values.some((v) => options.has(norm(v)));
  }
  if (filter.op === "contains")
    return values.some((v) => norm(v).includes(needle));
  const year = yearOf(row);
  const limit = Number(needle);
  if (year === null || !Number.isFinite(limit)) return false;
  if (filter.op === "gte") return year >= limit;
  if (filter.op === "lte") return year <= limit;
  // lastYears: the newest N years in the data, owned by the application.
  const span = Math.min(Math.max(Math.trunc(limit), 1), 20);
  return year > newest - span;
};

const matchesAll = ({
  dataset,
  filters,
  newest,
  row,
}: {
  dataset: QueryDatasetName;
  filters: readonly QueryFilter[];
  newest: number;
  row: DataRow;
}) =>
  filters.every((filter) => {
    const def = findField(dataset, filter.field);
    // A flag has one meaning, so any op the model picked is read as equals.
    if (def?.type !== "flag" && !def?.ops.includes(filter.op)) return false;
    return def ? matchesFilter({ def, filter, newest, row }) : false;
  });

export type QueryCheck = { ok: true } | { ok: false; reason: string };

/**
 * Rejects a query the registry does not declare: an unknown field, an
 * operation the field does not allow, a grouping on a non-groupable field.
 */
export const checkQuerySpec = (spec: QuerySpec): QueryCheck => {
  if (spec.filters.length > GENUI_MAX_FILTERS) {
    return { ok: false, reason: "too many filters" };
  }
  const datasets: QueryDatasetName[] =
    spec.dataset === "overview" ? ["projects", "posts"] : [spec.dataset];
  for (const filter of spec.filters) {
    const defs = datasets.flatMap((dataset) => {
      const def = findField(dataset, filter.field);
      return def ? [def] : [];
    });
    if (!defs.length) {
      return { ok: false, reason: `unknown field ${filter.field}` };
    }
    if (
      !defs.some((def) => def.type === "flag" || def.ops.includes(filter.op))
    ) {
      return {
        ok: false,
        reason: `${filter.op} is not allowed on ${filter.field}`,
      };
    }
  }
  if (spec.groupBy && spec.dataset !== "overview") {
    const def = findField(spec.dataset, spec.groupBy);
    if (!def?.groupable) {
      return { ok: false, reason: `cannot group by ${spec.groupBy}` };
    }
  }
  return { ok: true };
};

const byName = (a: { label: string }, b: { label: string }) =>
  a.label.localeCompare(b.label, undefined, { numeric: true });
const byCount = (a: { count: number }, b: { count: number }) =>
  a.count - b.count;

const columnsFor = (dataset: QueryDatasetName): DatasetColumn[] => {
  const seen = new Set<string>();
  const columns: DatasetColumn[] = [];
  for (const field of fieldsFor(dataset)) {
    if (!field.column || seen.has(field.column.key)) continue;
    seen.add(field.column.key);
    columns.push({ ...field.column });
  }
  return columns;
};

export const datasetColumns = (name: QuerySpec["dataset"]): DatasetColumn[] =>
  name === "overview"
    ? [
        { key: "label", label: "Measure", type: "text" },
        { key: "value", label: "Value", type: "number" },
      ]
    : columnsFor(name);

/**
 * A verbatim excerpt of the first source unit containing the needle, at most
 * GENUI_EXCERPT_MAX_CHARS, trimmed to word boundaries. It is always a substring of
 * the unit; the compiler re-checks that against the source.
 */
export const excerptFor = ({
  needle,
  units,
}: {
  needle: string;
  units: readonly string[];
}): string | null => {
  const lowered = norm(needle);
  if (!lowered) return null;
  // Search the original text so a character whose lowercase form changes
  // length cannot shift the window off the match.
  const pattern = new RegExp(
    lowered.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"),
    "iu"
  );
  const unit = units.find((item) => pattern.test(item));
  if (!unit) return null;
  if (unit.length <= GENUI_EXCERPT_MAX_CHARS) return unit.trim();
  const at = unit.search(pattern);
  let start = Math.max(0, at - 100);
  let end = Math.min(unit.length, start + GENUI_EXCERPT_MAX_CHARS);
  if (start > 0) {
    const space = unit.indexOf(" ", start);
    if (space !== -1 && space < at) start = space + 1;
  }
  if (end < unit.length) {
    const space = unit.lastIndexOf(" ", end);
    if (space > at + lowered.length) end = space;
  }
  const slice = unit.slice(start, end).trim();
  const text = `${start > 0 ? "…" : ""}${slice}${end < unit.length ? "…" : ""}`;
  return text.length > 0 ? text : null;
};

const overviewDataset = ({
  filters,
  id,
}: {
  filters: QuerySpec["filters"];
  id: string;
}): GenuiDataset => {
  const apply = (dataset: QueryDatasetName) => {
    const all = rowsFor(dataset);
    const newest = newestYear(all);
    return all.filter((row) => matchesAll({ dataset, filters, newest, row }));
  };
  const rows = apply("projects");
  const posts = apply("posts");
  const technologies = new Set(
    rows.flatMap((row) => valuesOf(row.fields.technology))
  );
  const years = rows.flatMap((row) => {
    const year = yearOf(row);
    return year === null ? [] : [year];
  });
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
 * Runs a bounded read-only query over published records. Callers check the
 * spec with `checkQuerySpec` first; an undeclared field or operation here
 * matches nothing rather than widening what is read.
 */
export const executeQuery = ({
  id,
  spec,
}: {
  id: string;
  spec: QuerySpec;
}): GenuiDataset => {
  if (spec.dataset === "overview") {
    return overviewDataset({ filters: spec.filters, id });
  }
  const dataset = spec.dataset;
  const base = rowsFor(dataset);
  const newest = newestYear(base);
  const filtered = base.filter((row) =>
    matchesAll({ dataset, filters: spec.filters, newest, row })
  );
  const limit = spec.limit ?? GENUI_MAX_DATASET_ROWS;
  const noun = dataset === "projects" ? "Projects" : "Posts";

  if (spec.groupBy) {
    const def = findField(dataset, spec.groupBy);
    if (!def?.groupable) {
      return { columns: [], id, recordIds: [], rows: [], title: noun };
    }
    const groups = new Map<string, Set<string>>();
    for (const row of filtered) {
      for (const value of valuesOf(row.fields[def.key])) {
        const ids = groups.get(value) ?? new Set<string>();
        ids.add(row.recordId);
        groups.set(value, ids);
      }
    }
    // Years are an ordered axis: default to chronological, and when a limit
    // applies keep the most recent years, shown in order.
    const chronological = def.key === "year";
    const byLabel =
      chronological || spec.sortBy === "label" || spec.sortBy === def.label;
    const direction =
      (spec.sortDirection ?? (byLabel ? "asc" : "desc")) === "asc" ? 1 : -1;
    const entries = [...groups.entries()].map(([label, ids]) => ({
      count: ids.size,
      ids,
      label,
    }));
    let rows: typeof entries;
    if (chronological) {
      const recent = [...entries].sort((a, b) => byName(b, a)).slice(0, limit);
      rows = recent.sort((a, b) => direction * byName(a, b));
    } else {
      rows = entries
        .sort((a, b) =>
          byLabel
            ? direction * byName(a, b)
            : direction * byCount(a, b) || byName(a, b)
        )
        .slice(0, limit);
    }
    return {
      columns: [
        { key: "label", label: def.label, type: "text" },
        { key: "count", label: "Count", type: "number" },
      ],
      id,
      recordIds: [...new Set(rows.flatMap((row) => [...row.ids]))],
      rows: rows.map((row) => ({ count: row.count, label: row.label })),
      title: `${noun} by ${def.label.toLowerCase()}`,
    };
  }

  // A contains-search over long text adds a quoted "Mentions" column.
  const search = spec.filters.find((filter) => {
    const def = findField(dataset, filter.field);
    return (
      def?.type === "longtext" &&
      filter.op === "contains" &&
      norm(filter.value) !== ""
    );
  });
  const columns = columnsFor(dataset);
  if (search) {
    columns.push({
      ...excerptColumn,
      excerpt: { fields: [search.field] },
      type: "text",
    });
  }
  const sortColumn = columns.find((column) => column.key === spec.sortBy);
  const sorted = sortColumn
    ? [...filtered].sort((a, b) => {
        const left = a.show[sortColumn.key] ?? "";
        const right = b.show[sortColumn.key] ?? "";
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
    rows: rows.map((row) => {
      if (!search) return row.show;
      const excerpt = excerptFor({
        needle: search.value,
        units: sourceUnits({ field: search.field, recordId: row.recordId }),
      });
      return { ...row.show, [excerptColumn.key]: excerpt };
    }),
    title: noun,
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
