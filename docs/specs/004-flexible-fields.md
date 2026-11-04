# 004: Flexible fields and grounded text for views

Status: accepted (2026-11-04).

Builds on [spec 003](003-open-composition.md) (views) and [decision 0005](../decisions/0005-three-tiers-of-ui-generation.md). Links the accepted [decision 0006](../decisions/0006-field-registry-and-verbatim-excerpts.md).

## Problem

A visitor can ask for any form, but only over eleven fixed fields in three fixed datasets (`lib/genui/query/execute.ts`). Each new ask has needed new code. Two filters, `featured` and `recent`, were added by hand after the "recent work" request plotted every year back to 2009 and showed all-time stat tiles under a "Recent work" heading.

Fields the package already publishes cannot be reached: `experienceCompany`, `achievements`, `story`, `link`, `repo`, and the text of posts. So these asks fail or degrade to the nearest card grid: "a table of what you shipped at each company", "projects that mention payments, with the line that says so", "posts since 2024 about agents".

## Solution

A visitor asks for a view over any published field and the site answers from that field, in the form asked.

- **Fields are declared once, as data.** Each field has a label, a type (text, number, list, date, long text), the operations it supports (filter, group, sort, show, search) and its source in the published record. The planner prompt, the validator and the executor all read this one declaration, so adding a field needs no new filter code.
- **Filters gain real operators.** Equals, any of, contains (text), from and until (numbers and dates), and "newest N years" computed by the application. `featured` and `recent` become entries in the same system with unchanged behaviour.
- **Unstructured text is searchable and quoted, never paraphrased.** A search over `story`, `achievements` or post text returns the matching record and the exact excerpt that matched, with a link to the record. The model never writes a cell value, an excerpt or a count.
- **What the site cannot answer is said plainly.** A field or operation that is not declared produces a short stated limitation and the nearest grounded view, as in spec 003.

## Decisions

- **Registry over a model-authored query language.** The model chooses among declared fields and operations; it does not write SQL, expressions or code. Alternatives: keep adding hard-coded filters per request (does not scale, caused the recent-work bug); let the model write a query language (a new injection and validation surface). Recorded in [0006](../decisions/0006-field-registry-and-verbatim-excerpts.md).
- **Excerpts are verbatim or absent.** An excerpt is a substring of the source field, checked by the compiler. Alternative: model-summarized cells (ungrounded, rejected in [0005](../decisions/0005-three-tiers-of-ui-generation.md)). A prose summary stays an `Answer` with source IDs.
- **Only fields the site already publishes are exposed.** Assumption, to confirm: `story`, `achievements`, `experienceCompany`, `link`, `repo` and post text are all public on `/project/*` and `/blog/*`. Anything not rendered publicly stays out.
- **Bounds (initial, for review).** Up to 6 filters per block, 8 shown fields per table, one excerpt of at most 240 characters per row (several per row later), 50 rows, and the existing limits on blocks, charts and document size.
- **Aggregates stay counts** in this increment (assumption). Sums and averages wait for a field that needs them.

**Exposure.** Runs in the existing `POST /api/genui/compose` route on the public site. Read-only, with the same admission caps and no new route, tool or write. There is no authentication, so nothing here can write. A plan naming an undeclared field or operator fails validation and renders nothing. No new data leaves the site; excerpts come from records already on public pages.

**Appetite.** First slice: the registry reproducing today's fields, operators and the `featured` and `recent` behaviour exactly (parity), then project `experienceCompany`, `achievements` and `story` with contains-search and excerpts. Gives way first: post-body search, then a date range for posts. Cost limit: no new model call and no new paid service; the planner call count stays one.

## Acceptance

**Acceptance scenario.** The actor is a visitor on the homepage with the live catalog of 46 projects and 45 posts.

1. They search "Projects that mention payments, with the line that says so". A table appears with a project column and an excerpt column. Every row's excerpt is a verbatim substring of that project's `story` or `achievements`, contains the word, and links to the project. A project without the word is absent.
2. They search "What I shipped at each company since 2021" as a board. Cards group by company, each project is from 2021 or later, and the total card count equals the count of projects with that company and year computed independently from the package.
3. They search "infographic about recent work" and "where to start as a table". Results match spec 003: stats, charts and tables limited to the newest three years, and the featured set led by homepage selected work.
4. They search "chart of your self-rated skill levels". The site says it holds no such field and offers technology usage across projects instead.
5. A hand-edited envelope whose excerpt is not a substring of its source, or whose dataset names an undeclared column, is rejected and nothing renders. A plan that asks for an operation the field does not allow (for example contains on a year) is dropped before any view is built.

**Invariants and evidence.**

- The model supplies no cell, excerpt or count. Evidence: tamper tests per field type, and executor-only value construction.
- Prompt, validator and executor share one declaration. Evidence: a test that the planner schema's field enum equals the registry keys.
- Operations are type-checked (contains on a number is rejected). Evidence: contract tests per type.
- Parity with spec 003. Evidence: the existing view tests pass unchanged, plus a recent-work and featured regression test.
- Limits hold. Evidence: oversize and over-count tests fail closed.
- Query matrix gains cases for the five scenario steps (live mode), with a grounding grader.

## Delivered in the first slice

- `lib/genui/query/fields.ts` declares every queryable field (type, operations, grouping, column); the plan schema, the executor, the validator and the planner prompt all derive from it. Fields added: `company` (the project's recorded employer or client), `achievements` and `story` (search), post `summary` (search), post `recent`.
- Operators: equals, any of, contains, from (`gte`), until (`lte`) and newest N years (`lastYears`). `featured` and `recent` keep their behaviour as flags in the registry.
- A contains-search over long text adds a quoted "Mentions" column. The compiler checks each excerpt is a substring of the cited record's source and rejects undeclared dataset columns.
- A request the keyword planner cannot parse now reaches the registry planner before the closed "I cannot filter" answer. A request for data the site does not hold gets the nearest grounded view plus a stated limitation.

Deferred: post-body search and post date ranges, several excerpts per row, links and repos as fields (not confirmed public), aggregates beyond count.

A bare "recent work" with no form word is still served by the older keyword router and can return an unrelated case study. That predates this spec and is not changed here.

## Out of Scope

An MCP `query_dataset` capability and `/mcp` support for views. Nested layouts, `Tabs`, `Accordion`. Tier 3 sandboxed generation. Semantic or embedding search. User-supplied data. Sums, averages and other aggregates beyond count. Caching of generated results. Any new write path.

## Tasks

Written by `to-tasks`.
