import { describe, expect, test } from "bun:test";

import { executeQuery } from "./query/execute";
import type { QuerySpec } from "./query/execute";
import { validateCompositionEnvelope } from "./validate-envelope";
import { formCue, viewEnvelopeFromPlan } from "./view-plan";
import type { ViewPlan } from "./view-plan";

const spec = (partial: Partial<QuerySpec>): QuerySpec => ({
  dataset: "projects",
  filters: [],
  groupBy: null,
  limit: null,
  sortBy: null,
  sortDirection: null,
  ...partial,
});

const plan = (blocks: ViewPlan["blocks"], extra: Partial<ViewPlan> = {}) =>
  ({
    arrangement: "stack",
    blocks,
    note: null,
    supported: true,
    title: "Portfolio view",
    ...extra,
  }) satisfies ViewPlan;

const table = (query: QuerySpec = spec({})): ViewPlan["blocks"][number] => ({
  boardGroupField: null,
  chartKind: null,
  columns: [],
  query,
  title: "Projects",
  type: "table",
});

const built = (envelope: ReturnType<typeof viewEnvelopeFromPlan>) => {
  if (!envelope) throw new Error("expected a compiled view envelope");
  return envelope;
};

describe("formCue", () => {
  test("names a form without classifying it", () => {
    expect(formCue("What should I look at first as spreadsheet")).toBe(true);
    expect(formCue("Analytics dashboard about your skillset")).toBe(true);
    expect(formCue("Show me your AI projects.")).toBe(false);
  });
});

describe("executeQuery", () => {
  test("projects table cites one record per row", () => {
    const dataset = executeQuery({ id: "d1", spec: spec({}) });
    expect(dataset.rows.length).toBeGreaterThan(0);
    expect(dataset.recordIds.length).toBe(dataset.rows.length);
    expect(dataset.rows[0]).toHaveProperty("title");
  });

  test("groupBy technology counts distinct projects, sorted descending", () => {
    const dataset = executeQuery({
      id: "d1",
      spec: spec({ groupBy: "technology", limit: 8 }),
    });
    expect(dataset.rows.length).toBeLessThanOrEqual(8);
    const counts = dataset.rows.map((row) => Number(row.count));
    expect(counts).toEqual([...counts].sort((a, b) => b - a));
  });

  test("an unknown sort field keeps dataset order", () => {
    const sorted = executeQuery({
      id: "d1",
      spec: spec({ sortBy: "password" }),
    });
    const plain = executeQuery({ id: "d1", spec: spec({}) });
    expect(sorted.rows).toEqual(plain.rows);
  });

  test("filters narrow by exact field value", () => {
    const all = executeQuery({ id: "d1", spec: spec({}) });
    const ai = executeQuery({
      id: "d1",
      spec: spec({ filters: [{ field: "domain", value: "ai" }] }),
    });
    expect(ai.rows.length).toBeLessThan(all.rows.length);
  });
});

describe("viewEnvelopeFromPlan", () => {
  test("a table plan compiles through the shared compiler", () => {
    const envelope = viewEnvelopeFromPlan({
      plan: plan([table()]),
      query: "portfolio as spreadsheet",
      requestId: "r1",
    });
    expect(envelope).not.toBeNull();
    expect(envelope?.openuiText.startsWith("root = ViewExperience(")).toBe(
      true
    );
    expect(envelope?.datasets?.[0]?.recordIds.length).toBeGreaterThan(0);
  });

  test("a dashboard of stats and a chart compiles", () => {
    const envelope = viewEnvelopeFromPlan({
      plan: plan(
        [
          { ...table(), title: "Overview", type: "stats" },
          {
            ...table(spec({ groupBy: "technology", limit: 8 })),
            chartKind: "bar",
            title: "Stack",
            type: "chart",
          },
        ],
        { arrangement: "split-1-2" }
      ),
      query: "analytics dashboard",
      requestId: "r2",
    });
    expect(envelope?.datasets).toHaveLength(2);
    expect(validateCompositionEnvelope({ envelope: built(envelope) }).ok).toBe(
      true
    );
  });

  test("a chart without groupBy is dropped, not guessed", () => {
    const envelope = viewEnvelopeFromPlan({
      plan: plan([{ ...table(), chartKind: "bar", type: "chart" }]),
      query: "chart",
      requestId: "r3",
    });
    expect(envelope).toBeNull();
  });

  test("an unsupported plan yields nothing", () => {
    expect(
      viewEnvelopeFromPlan({
        plan: plan([table()], { supported: false }),
        query: "x",
        requestId: "r4",
      })
    ).toBeNull();
  });

  test("a dataset no block cites is rejected", () => {
    const envelope = viewEnvelopeFromPlan({
      plan: plan([table()]),
      query: "table",
      requestId: "r5",
    });
    const base = built(envelope);
    const first = base.datasets?.[0];
    if (!first) throw new Error("expected a dataset");
    const tampered = {
      ...base,
      datasets: [...(base.datasets ?? []), { ...first, id: "d9" }],
    };
    expect(validateCompositionEnvelope({ envelope: tampered }).ok).toBe(false);
  });

  test("a row citing a record outside the envelope is rejected", () => {
    const envelope = viewEnvelopeFromPlan({
      plan: plan([table()]),
      query: "table",
      requestId: "r6",
    });
    const base = built(envelope);
    const tampered = { ...base, records: base.records.slice(1) };
    expect(validateCompositionEnvelope({ envelope: tampered }).ok).toBe(false);
  });

  test("HTML in a title is rejected", () => {
    const envelope = viewEnvelopeFromPlan({
      plan: plan([{ ...table(), title: "<b>x</b>" }]),
      query: "table",
      requestId: "r7",
    });
    expect(envelope).toBeNull();
  });
});
