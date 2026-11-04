# 003: Open composition for requested forms

Status: accepted (2026-11-04). First increment delivered; items under "Deferred" remain. Depends on [decision 0005](../decisions/0005-three-tiers-of-ui-generation.md) (accepted).

## Problem Statement

A visitor who asks for a form ("as a spreadsheet", "an analytics dashboard", "a board of your projects", "two columns, chart left, table right") gets a topic match in the wrong form. Observed on 2026-11-04 at `gaboesquivel.localhost`: "What should I look at first on your portfolio as spreadsheet" returned the project bento grid, and "Analytics dashboard about your skillset and interests" returned a one-post writing list.

**Bet:** a small vocabulary of shadcn-backed, data-bound primitives plus a bounded query capability lets one model call serve any requested form from published records, with no invented values.

## Evidence and current baseline

- Routing is keyword-based: `lib/genui/task-intent.ts`, `task-plan.ts`, `request-plan.ts` (fast path when a single simple task is covered). No form dimension exists. The planner enum in `lib/genui/semantic-plan.ts` describes content, not form.
- The contract allows ten experiences and fixed composites (`lib/genui/contract/catalog.ts`, `lib/genui/composites.ts`); `experience-contract.ts` forbids `presentation`, `variant`, `layout`, `frame`, `html`, `css`.
- Installed and unused by GenUI: `components/ui/chart.tsx`, `table.tsx`, `tabs.tsx`, `card.tsx`, `accordion.tsx`, `resizable.tsx`, `progress.tsx`; `recharts` 3.8.0.
- `@openuidev/lang-core` 1.0.1 exports `Query`, `Mutation`, a tool provider, `createStreamingParser` and `generateSystemPrompt` accepting tool specs (checked in `node_modules`). Not yet verified: how the current compose route builds its prompt, and how a `Query` call would reach `/api/capabilities`.
- `project-comparison` with `dimensions` already maps dimensions to package fields and shows "Not recorded" for missing values. Not yet verified whether it renders a semantic `<table>`.
- Not verified: whether `Project` carries fields beyond `slug`, `tech`, `type`, `description`, role and year for columns.

## Solution and scope

### Primitives (single Zod source in `lib/genui/contract/primitives.ts`)

| Group | Primitives |
| --- | --- |
| Layout | `Grid(columns 1–4)`, `Split(ratio)`, `Stack`, `Tabs`, `Section`, `Accordion` |
| Data | `Table`, `Chart(bar, line, area, pie, radar)`, `Stat`, `Progress`, `Board`, `List` |
| Prose | `Heading`, `Text(sourceIds)`, `Callout`, `Badge`, `Link` |

Props are enums, tokens and dataset references. No CSS, HTML, URLs or tool names. Responsive behaviour is inside each primitive at the 48rem container threshold. `Board` groups records into read-only columns; no drag and drop. A report is a recipe, not a component.

### Data

One read-only capability, `query_dataset`, with a declarative spec (dataset, filter, group-by, aggregate, sort, limit) over catalog, posts and bio. The server executes it. The model sees dataset schemas and counts, not rows. The same capability serves the homepage and `/mcp`, under the existing caps and authorization.

### Routing

The planner chooses tier and form in one decision. A form cue only prevents the fast path. Exact curated suggestions keep zero model calls. Unsupported forms or missing data produce an honest limitation plus the nearest grounded form.

### Design knowledge

Machine-checked rules in `lib/genui/design-knowledge/`: chart y is numeric and x is categorical or ordinal; every chart has a text summary or table alternative; tables have named columns; heading order is sequential; interactive controls are labelled. Validation runs on the whole composed document.

### Limits

Initial bounds for review: depth ≤ 4, nodes ≤ 60, charts ≤ 4, document ≤ 64 KiB, stack ≤ 6, one composition model call. Over the limit fails safely with the retryable error and no repair loop.

### Performance

`recharts` and each primitive load by dynamic import only when a document contains them. Streaming renders stable subtrees into skeletons with reserved geometry. Chart animation is off under reduced motion. Targets are measured, not assumed; report p75 per tier as in the composition spec.

### Out of scope

Tier 3 sandboxed code generation, write controls in generated documents, drag-and-drop boards, user-uploaded data, caching of generated results.

## Acceptance

| ID | Observable acceptance |
| --- | --- |
| OC-01 | "…portfolio as spreadsheet" renders a table whose every cell traces to a catalog record; missing values show "Not recorded". |
| OC-02 | "Analytics dashboard about your skillset and interests" renders stats and charts computed from the catalog; no blog list unless asked. |
| OC-03 | An explicit layout ("two columns, chart left, table right") renders that arrangement at 1440px and stacks sensibly at 390px. |
| OC-04 | A document with an unknown primitive, CSS, HTML, an endpoint or a write control is rejected without rendering. |
| OC-05 | A request for data the site lacks returns a stated limitation and the nearest grounded form, not invented numbers. |
| OC-06 | Interaction after render (tabs, sort) makes zero model calls; composition makes at most one. |
| OC-07 | Every chart has a text alternative; heading order and labels pass the accessibility check. |
| OC-08 | The homepage bundle does not include `recharts` until a chart renders. |
| OC-09 | Exact curated suggestions still resolve with zero model calls. |
| OC-10 | The query matrix gains format cases (table, dashboard, chart, board, report, explicit layout) with graders for grounding. |

## Delivered in the first increment

- `ViewExperience` with five arrangements (`stack`, `columns-2`, `columns-3`, `split-2-1`, `split-1-2`) over `DataTable` (sortable, keyboard-scrollable, record links, "Not recorded"), `DataChart` (bar, line, area, pie; lazy `recharts`; text alternative; legend on pie; animation off under reduced motion), `StatRow` and `DataBoard` (read-only).
- Datasets `projects`, `posts` and `overview`, with filter, group-by, sort and limit, in `lib/genui/query/execute.ts`. Envelope `datasets` carry rows and cite record IDs; the compiler rejects unknown datasets, unknown fields, uncited records and unused datasets.
- Design rules in `lib/genui/design-knowledge/view-rules.ts`: titles, non-empty datasets, chart shape and pie size, stat shape, board column count, block, chart and stat limits.
- `formCue` guard plus one planner call (`lib/genui/view-plan.ts`) before the card fast path in `lib/genui/compose.ts`. Exact curated suggestions and unsupported plans continue through the existing routes.
- Query matrix cases F01 to F05 (live mode).

Layout is flat: a view holds up to six blocks, with no nested layout primitives, `Tabs` or `Accordion`.

## Deferred

- `query_dataset` as an MCP capability, and `/mcp` support for views.
- Recipes as data, and layout nesting (`Tabs`, `Accordion`, nested `Grid`).
- Tier 3 sandboxed generation.
- Measured p75 latency for tier 2 views, and automated visual and accessibility tests for the new primitives.

## Implementation order

1. Accept decision 0005; amend the composition spec and compiler ADR.
2. `Table`, `Chart`, `Stat` primitives, `query_dataset`, form-aware planner. Covers OC-01, OC-02.
3. Layout primitives and `Board`, then recipes. Covers OC-03.
4. Design-knowledge checks, evals, visual and accessibility tests.
5. Revisit tier 3 only if evals show gaps.

## Open questions

- Resolved: composition uses a server-side fill step (envelope datasets), not `Query`, so values never depend on a model-authored call.
- Resolved: technology frequency across published projects, domain split, and post categories; no self-rated levels.
- Resolved: a general `DataTable` was added; `project-comparison` is unchanged.
- Resolved: no. `/mcp` is deferred.
