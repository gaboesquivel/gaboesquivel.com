import { describe, expect, test } from "bun:test";

import { projects } from "gaboesquivel";

import { validateCompositionEnvelope } from "../validate-envelope";
import { viewEnvelopeFromPlan } from "../view-plan";
import type { ViewPlan } from "../view-plan";
import {
  checkQuerySpec,
  excerptFor,
  executeQuery,
  filterSchema,
  querySpecSchema,
} from "./execute";
import type { QueryFilter, QuerySpec } from "./execute";
import { fieldKeys, fieldRegistry, groupableKeys, operations } from "./fields";
import { normalizeSpace, sourceUnits } from "./source-text";

const spec = (partial: Partial<QuerySpec>): QuerySpec => ({
  dataset: "projects",
  filters: [],
  groupBy: null,
  limit: null,
  sortBy: null,
  sortDirection: null,
  ...partial,
});

const filter = (
  field: string,
  op: QueryFilter["op"],
  value: string
): QueryFilter => ({ field, op, value });

const plan = (blocks: ViewPlan["blocks"]): ViewPlan => ({
  arrangement: "stack",
  blocks,
  note: null,
  supported: true,
  title: "View",
});

const tableBlock = (query: QuerySpec): ViewPlan["blocks"][number] => ({
  boardGroupField: null,
  chartKind: null,
  columns: [],
  query,
  title: "Projects",
  type: "table",
});

/** A word that occurs in a real project's story, so the search has a hit. */
const storyWord = () => {
  for (const project of projects) {
    for (const unit of project.story) {
      const word = unit.match(/[A-Za-z]{7,}/u)?.[0];
      if (word) return word.toLowerCase();
    }
  }
  throw new Error("expected a story word");
};

describe("registry is the single declaration", () => {
  test("the plan schema's fields, groupings and operations come from it", () => {
    expect(filterSchema.shape.field.options).toEqual(fieldKeys);
    expect(querySpecSchema.shape.groupBy.unwrap().options).toEqual(
      groupableKeys
    );
    expect(filterSchema.shape.op.options).toEqual([...operations]);
  });

  test("every registry field allows at least one operation and a known type", () => {
    for (const field of fieldRegistry) {
      expect(field.ops.length).toBeGreaterThan(0);
      for (const op of field.ops) expect(operations).toContain(op);
    }
  });
});

describe("checkQuerySpec", () => {
  test("rejects an operation the field does not allow", () => {
    expect(
      checkQuerySpec(spec({ filters: [filter("year", "contains", "20")] })).ok
    ).toBe(false);
    expect(
      checkQuerySpec(spec({ filters: [filter("story", "equals", "x")] })).ok
    ).toBe(false);
  });

  test("rejects a field the dataset does not declare", () => {
    expect(
      checkQuerySpec(spec({ filters: [filter("password", "equals", "x")] })).ok
    ).toBe(false);
    expect(
      checkQuerySpec(
        spec({ dataset: "posts", filters: [filter("role", "equals", "x")] })
      ).ok
    ).toBe(false);
  });

  test("rejects grouping on a field that is not groupable", () => {
    expect(checkQuerySpec(spec({ groupBy: "story" })).ok).toBe(false);
    expect(checkQuerySpec(spec({ groupBy: "company" })).ok).toBe(true);
  });

  test("a plan with a disallowed operation is dropped before any view is built", () => {
    const built = viewEnvelopeFromPlan({
      plan: plan([
        tableBlock(spec({ filters: [filter("year", "contains", "20")] })),
      ]),
      query: "table",
      requestId: "f1",
    });
    expect(built).toBeNull();
  });
});

describe("operators", () => {
  test("gte and lte bound the year; anyOf matches any listed value", () => {
    const since = executeQuery({
      id: "d1",
      spec: spec({ filters: [filter("year", "gte", "2021")] }),
    });
    expect(since.rows.length).toBeGreaterThan(0);
    for (const row of since.rows)
      expect(Number(row.year)).toBeGreaterThanOrEqual(2021);
    const either = executeQuery({
      id: "d1",
      spec: spec({ filters: [filter("domain", "anyOf", "ai|web3")] }),
    });
    const ai = executeQuery({
      id: "d1",
      spec: spec({ filters: [filter("domain", "equals", "ai")] }),
    });
    expect(either.rows.length).toBeGreaterThanOrEqual(ai.rows.length);
  });

  test("lastYears keeps the newest N years of the data", () => {
    const dataset = executeQuery({
      id: "d1",
      spec: spec({
        filters: [filter("year", "lastYears", "2")],
        groupBy: "year",
      }),
    });
    expect(dataset.rows.length).toBeLessThanOrEqual(2);
  });

  test("filtering by company and year equals an independent count", () => {
    const company = projects.find(
      (project) => project.experienceCompany
    )?.experienceCompany;
    if (!company) throw new Error("expected a company");
    const expected = projects.filter(
      (project) =>
        project.experienceCompany?.toLowerCase() === company.toLowerCase() &&
        project.year >= 2021
    ).length;
    const dataset = executeQuery({
      id: "d1",
      spec: spec({
        filters: [
          filter("company", "equals", company),
          filter("year", "gte", "2021"),
        ],
      }),
    });
    expect(dataset.rows).toHaveLength(expected);
  });

  test("a company board groups projects by employer", () => {
    const dataset = executeQuery({
      id: "d1",
      spec: spec({ groupBy: "company" }),
    });
    expect(dataset.rows.length).toBeGreaterThan(0);
  });
});

describe("grounded excerpts", () => {
  test("a story search returns verbatim excerpts from the cited records", () => {
    const needle = storyWord();
    const dataset = executeQuery({
      id: "d1",
      spec: spec({ filters: [filter("story", "contains", needle)] }),
    });
    expect(dataset.rows.length).toBeGreaterThan(0);
    const column = dataset.columns.find((item) => item.key === "mentions");
    expect(column?.excerpt?.fields).toEqual(["story"]);
    for (const [index, row] of dataset.rows.entries()) {
      const excerpt = String(row.mentions);
      expect(excerpt.toLowerCase()).toContain(needle);
      const quote = normalizeSpace(
        excerpt.replace(/^…/u, "").replace(/…$/u, "")
      );
      const units = sourceUnits({
        field: "story",
        recordId: dataset.recordIds[index] ?? "",
      }).map(normalizeSpace);
      expect(units.some((unit) => unit.includes(quote))).toBe(true);
    }
  });

  test("a search table compiles and leads with the quoted line", () => {
    const needle = storyWord();
    const envelope = viewEnvelopeFromPlan({
      plan: plan([
        tableBlock(spec({ filters: [filter("story", "contains", needle)] })),
      ]),
      query: "mentions",
      requestId: "f2",
    });
    expect(envelope?.openuiText).toContain('"mentions"');
  });

  test("a long unit is windowed around the match and stays a substring", () => {
    const unit = `${"alpha ".repeat(80)}payments ${"omega ".repeat(80)}`;
    const excerpt = excerptFor({ needle: "payments", units: [unit] }) ?? "";
    expect(excerpt.length).toBeLessThanOrEqual(242);
    expect(excerpt).toContain("payments");
    const quote = excerpt.replace(/^…/u, "").replace(/…$/u, "");
    expect(unit.includes(quote)).toBe(true);
  });

  test("an excerpt that is not in the source is rejected", () => {
    const needle = storyWord();
    const envelope = viewEnvelopeFromPlan({
      plan: plan([
        tableBlock(spec({ filters: [filter("story", "contains", needle)] })),
      ]),
      query: "mentions",
      requestId: "f3",
    });
    if (!envelope?.datasets?.[0]) throw new Error("expected a view");
    const first = envelope.datasets[0];
    const tampered = {
      ...envelope,
      datasets: [
        {
          ...first,
          rows: first.rows.map((row, index) =>
            index === 0 ? { ...row, mentions: "An invented sentence." } : row
          ),
        },
      ],
    };
    expect(validateCompositionEnvelope({ envelope: tampered }).ok).toBe(false);
  });

  test("a dataset naming an undeclared column is rejected", () => {
    const envelope = viewEnvelopeFromPlan({
      plan: plan([tableBlock(spec({}))]),
      query: "table",
      requestId: "f4",
    });
    if (!envelope?.datasets?.[0]) throw new Error("expected a view");
    const first = envelope.datasets[0];
    const tampered = {
      ...envelope,
      datasets: [
        {
          ...first,
          columns: [
            ...first.columns,
            { key: "secret", label: "Secret", type: "text" as const },
          ],
        },
      ],
    };
    expect(validateCompositionEnvelope({ envelope: tampered }).ok).toBe(false);
  });
});
