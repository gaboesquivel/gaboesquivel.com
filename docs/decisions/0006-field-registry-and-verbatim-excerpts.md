# 0006. A field registry and verbatim excerpts for generated views

Status: accepted (2026-11-04). Extends [decision 0005](0005-three-tiers-of-ui-generation.md); drives [spec 004](../specs/004-flexible-fields.md).

## Context

Views read three fixed datasets with eleven fixed fields. `featured` and `recent` were added as hard-coded filters after real requests failed, and published fields such as `achievements`, `story` and post text cannot be reached. Each new kind of request would need new filter code, and the planner has no way to say what the site can or cannot answer.

## Decision

Declare every queryable field once, as data: label, type, supported operations (filter, group, sort, show, search) and source. The planner prompt, the compiler and the executor derive from that declaration. The model chooses among declared fields and operations and never writes a query language, expression or value.

Unstructured text fields support contains-search. The result is the matching record plus the exact excerpt, which the compiler checks is a substring of the source field. The model never writes a cell value, an excerpt or a count.

## Alternatives considered

- Hard-coded filters per request. Rejected: does not scale, and the recent-work bug came from the missing case.
- A model-authored query language (SQL-like or expression-based). Rejected: a new injection and validation surface for the same expressiveness.
- Model-summarized or retrieved cell text. Rejected: ungrounded, and it breaks the rule from 0005 that values come from the application.
- Semantic or embedding search. Deferred: it changes the grounding story and adds a service.

## Consequences

- One declaration is the single source for prompt, validator and executor. Adding a field becomes a data change plus tests.
- The compiler gains excerpt and operator checks; the contract grows.
- Exposure of a field is a deliberate act: only fields already public on the site are declared.
- Aggregates beyond count, an MCP capability, and richer search are separate decisions.
