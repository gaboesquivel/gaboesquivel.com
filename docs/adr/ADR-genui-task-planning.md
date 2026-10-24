# ADR: Validated GenUI task plans

## Status

Accepted

## Context

Homepage generation could drop part of a multi-part request, treat one component as proof that every task was done, and recover by discarding a valid section. Catalog counts and filters were a narrow string grammar. Model output remained untrusted, but the planner and the coverage check did not say what they actually guaranteed.

## Decision

Complex requests become an ordered task plan with stable ids (`task-1`, `task-2`). Clearly supported simple requests stay on the existing deterministic route and do not call a model. When a request needs language understanding beyond that route, one schema-validated planner call may select operations and constraints. Application code executes those operations against the published portfolio, then the shared compiler accepts the document.

Coverage is per task. One answer does not complete every explanation, and one project section does not complete two differently filtered browses. Recovery keeps independently valid sections, fills missing supported tasks without broadening a filter, and stops after that deterministic pass.

Component purpose, evidence, cardinality, and fallback live in `lib/genui/component-semantics.ts`. Composition uses the existing experience stack and approved composites. Comparison of named projects can be inspected on year, role, categories, and technologies; a missing field is shown as “Not recorded”.

## Alternatives considered

- Growing the regex grammar until it covered open-ended requests. Rejected: each new phrasing became another exception, and unsupported filters could fall through to the whole catalog.
- Letting the model emit the final interface and the catalog query. Rejected: a generated plan is untrusted input. The application runs the query.
- Adding a new layout language for relationships. Rejected: explanation, comparison, chronology, and actions already map onto approved experiences.

## Consequences

- Counts and exclusions are explicit. A count is a count of published portfolio records. Absence of a tag is not proof a technology was never used.
- Structural coverage does not prove a sentence is entailed by its sources. Heuristic splitting does not prove the visitor’s intent was fully understood.
- A narrative request can spend two model calls (plan, then composition), each bounded. Simple requests spend none.
- Rendering a booking or contact control does not perform the write.
