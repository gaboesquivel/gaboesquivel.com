import { describe, expect, test } from "bun:test";

import { compileExperience } from "./contract/compiler";
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
      spec: spec({ filters: [{ field: "domain", op: "equals", value: "ai" }] }),
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

describe("review regressions", () => {
  test("years group chronologically and a limit keeps the most recent years", () => {
    const all = executeQuery({ id: "d1", spec: spec({ groupBy: "year" }) });
    const years = all.rows.map((row) => Number(row.label));
    expect(years).toEqual([...years].sort((a, b) => a - b));
    const recent = executeQuery({
      id: "d1",
      spec: spec({ groupBy: "year", limit: 3 }),
    });
    const kept = recent.rows.map((row) => Number(row.label));
    expect(kept).toEqual(years.slice(-3));
  });

  test("a board grouped on a field the executed dataset lacks is dropped", () => {
    const envelope = viewEnvelopeFromPlan({
      plan: plan([
        {
          ...table(spec({ groupBy: "technology" })),
          boardGroupField: "domain",
          type: "board",
        },
      ]),
      query: "board",
      requestId: "r8",
    });
    expect(envelope).toBeNull();
  });

  test("a chart on the overview dataset is dropped", () => {
    const envelope = viewEnvelopeFromPlan({
      plan: plan([
        {
          ...table(spec({ dataset: "overview" })),
          chartKind: "bar",
          type: "chart",
        },
      ]),
      query: "chart",
      requestId: "r9",
    });
    expect(envelope).toBeNull();
  });

  test("a record no dataset cites is rejected", () => {
    const base = built(
      viewEnvelopeFromPlan({
        plan: plan([table(spec({ limit: 2 }))]),
        query: "table",
        requestId: "r10",
      })
    );
    const extra = built(
      viewEnvelopeFromPlan({
        plan: plan([table(spec({ limit: 6 }))]),
        query: "table",
        requestId: "r11",
      })
    );
    const uncited = extra.records.find(
      (record) => !base.records.some((item) => item.id === record.id)
    );
    if (!uncited) throw new Error("expected an extra record");
    const tampered = { ...base, records: [...base.records, uncited] };
    expect(validateCompositionEnvelope({ envelope: tampered }).ok).toBe(false);
  });

  test("a view cannot be a stack child", () => {
    const base = built(
      viewEnvelopeFromPlan({
        plan: plan([table()]),
        query: "table",
        requestId: "r12",
      })
    );
    const inner = base.openuiText.replace(/^root = /, "");
    const compiled = compileExperience({
      datasets: base.datasets,
      document: `root = ExperienceStack([${inner}])`,
      libraryVersion: base.libraryVersion,
      records: base.records,
    });
    expect(compiled.ok).toBe(false);
  });

  test("an endpoint in a view title is rejected", () => {
    expect(
      viewEnvelopeFromPlan({
        plan: plan([{ ...table(), title: "https://evil.example/x" }]),
        query: "table",
        requestId: "r13",
      })
    ).toBeNull();
  });
});

describe("lead order and table taste", () => {
  test("projects lead with the homepage selected work, then the featured set", () => {
    const dataset = executeQuery({ id: "d1", spec: spec({}) });
    const lead = dataset.recordIds.slice(0, 4);
    expect(lead).toEqual([
      "/project/legal-agent",
      "/project/wink",
      "/project/ztx",
      "/project/bitlauncher",
    ]);
    expect(dataset.recordIds.slice(4, 6)).toEqual([
      "/project/opyn",
      "/project/eos-costa-rica",
    ]);
  });

  test("the featured filter keeps only the lead set", () => {
    const dataset = executeQuery({
      id: "d1",
      spec: spec({
        filters: [{ field: "featured", op: "equals", value: "yes" }],
      }),
    });
    expect(dataset.rows).toHaveLength(6);
  });

  test("a long stack is previewed, not dumped", () => {
    const dataset = executeQuery({ id: "d1", spec: spec({}) });
    const stack = String(dataset.rows[0]?.technologies ?? "");
    expect(stack.split(",").length).toBeLessThanOrEqual(4);
    expect(stack).toMatch(/\+\d+$/);
  });

  test("a project table defaults to scannable columns without raw types", () => {
    const envelope = built(
      viewEnvelopeFromPlan({
        plan: plan([table()]),
        query: "table",
        requestId: "r14",
      })
    );
    expect(envelope.openuiText).toContain('"technologies"');
    expect(envelope.openuiText).not.toContain('"type"');
  });
});

describe("featured filter values", () => {
  test("an unrecognised value matches nothing instead of inverting the filter", () => {
    const dataset = executeQuery({
      id: "d1",
      spec: spec({
        filters: [{ field: "featured", op: "equals", value: "ys" }],
      }),
    });
    expect(dataset.rows).toHaveLength(0);
  });

  test("no keeps only projects outside the lead set", () => {
    const all = executeQuery({ id: "d1", spec: spec({}) });
    const rest = executeQuery({
      id: "d1",
      spec: spec({
        filters: [{ field: "featured", op: "equals", value: "no" }],
      }),
    });
    expect(rest.rows.length).toBe(all.rows.length - 6);
  });
});

describe("recent requests", () => {
  const recent = { field: "recent", op: "equals", value: "yes" } as const;

  test("recent keeps only the newest three years of projects", () => {
    const all = executeQuery({ id: "d1", spec: spec({}) });
    const newest = Math.max(...all.rows.map((row) => Number(row.year ?? 0)));
    const dataset = executeQuery({
      id: "d1",
      spec: spec({ filters: [recent] }),
    });
    expect(dataset.rows.length).toBeGreaterThan(0);
    expect(dataset.rows.length).toBeLessThan(all.rows.length);
    for (const row of dataset.rows) {
      expect(Number(row.year)).toBeGreaterThan(newest - 3);
    }
  });

  test("a recent year chart spans at most three years", () => {
    const dataset = executeQuery({
      id: "d1",
      spec: spec({ filters: [recent], groupBy: "year" }),
    });
    expect(dataset.rows.length).toBeLessThanOrEqual(3);
  });

  test("overview stats honour the recent filter instead of showing all-time counts", () => {
    const all = executeQuery({ id: "d1", spec: spec({ dataset: "overview" }) });
    const scoped = executeQuery({
      id: "d1",
      spec: spec({ dataset: "overview", filters: [recent] }),
    });
    expect(Number(scoped.rows[0]?.value)).toBeLessThan(
      Number(all.rows[0]?.value)
    );
    expect(Number(scoped.rows[2]?.value)).toBeLessThanOrEqual(3);
  });

  test("an unrecognised recent value matches nothing", () => {
    const dataset = executeQuery({
      id: "d1",
      spec: spec({
        filters: [{ field: "recent", op: "equals", value: "soon" }],
      }),
    });
    expect(dataset.rows).toHaveLength(0);
  });
});
