# 0005. Three tiers of UI generation, one OpenUI Lang representation

Status: accepted (2026-11-04). Amended in part by [0006](0006-field-registry-and-verbatim-excerpts.md): datasets expose declared fields from a registry. Amends the "closed vocabulary, no model-chosen layout" position in [ADR task planning](../adr/ADR-genui-task-planning.md), [ADR shared compiler](../adr/ADR-genui-shared-compiler.md) and [SPEC composition runtime](../specs/homepage-genui/SPEC-composition-runtime.md).

## Context

Visitors can ask for any form: "my portfolio as a spreadsheet", "an analytics dashboard about your skillset", a report, a board, an explicit layout. The engine decides topic only. "…on your portfolio as spreadsheet" matches `portfolio` and takes the card fast path; "Analytics dashboard about your skillset and interests" lands on a writing list. No table, chart, stat or board primitive exists, and the contract rejects `layout`, `variant` and `presentation` keys.

The repo copied the coded half of SAP's compositional model. Primitives are internal, and a "composite" is an enum name that points at a hand-written React view, so each new form needs catalog, renderer, fixture and test edits together. SAP's declarative composites (recipes as data) and design knowledge (rules, traits, signals) are missing. The research ([generative-interfaces.md](../research/generative-interfaces.md) §2.1, §3) describes a freedom spectrum; the product has implemented only its low end.

## Decision

Support three tiers of UI generation. All three use OpenUI Lang as the single representation, the shared compiler as the single acceptance gate, and the existing renderer.

1. **Fixed.** Today's experiences (Contact, Booking, CV, Timeline, curated suggestions). Zero model calls for exact suggestions. Only this tier may render write controls.
2. **Declarative.** The model composes approved shadcn-backed primitives (layout, table, chart, stat, board, list, prose) and recipe data inside validated rules. The model emits structure and dataset references; the application executes bounded read-only queries and supplies every value.
3. **Fully generative.** Reserved for requests tier 2 cannot express. Sandboxed, read-only, labelled as generated, with a fallback to tier 2. Not built until evals show a gap.

A single planner decision picks the lowest sufficient tier, extending the existing rule "least expensive sufficient path". A form cue stops the card fast path from claiming a request; it does not classify the form. Form is chosen by the planner or Jev, not by growing a keyword grammar.

## Rationale

- OpenUI Lang is compact, streams progressively, and its runtime separates generation from execution: after the model writes the tree, queries and state run without another model call. The pinned `@openuidev/lang-core` 1.0.1 exposes `Query`, `Mutation`, a tool provider, a streaming parser and prompt generation from a library plus tool specs.
- Layout stays safe because primitives take enums and tokens (`Split("2:1")`, `Grid(3)`), never CSS. Responsiveness lives in the primitive, using container width as the existing spec requires.
- Grounding is preserved because rows and numbers come from a query result, not model text.

## Consequences

- New: `lib/genui/contract/primitives.ts`, `components/genui/primitives/`, `lib/genui/query/`, `lib/genui/design-knowledge/`, `lib/genui/recipes/`, and one read-only `query_dataset` capability.
- The "no model-chosen layout" and "no layout keys" rules narrow: the model chooses among enumerated layout primitives; it still cannot emit CSS, HTML, endpoints or tool names.
- Tier 2 spends at most one model call for composition. Budgets in `SPEC-composition-runtime` need re-measurement for these requests.
- Update ARCHITECTURE.md, GLOSSARY.md (tier, primitive, recipe, dataset), the composition-runtime spec and the compiler ADR when accepted.
- Tier 3 is a separate decision with its own security review.

## Implementation notes (2026-11-04)

- Tier 2 shipped as `ViewExperience` plus `DataTable`, `DataChart`, `StatRow` and `DataBoard` ([spec 003](../specs/003-open-composition.md)). The model returns a schema-validated plan (AI SDK `Output.object`), and application code compiles it to one OpenUI Lang document, the same pattern as `lib/genui/semantic.ts`. The model never writes OpenUI text or values for views.
- The layout prop is named `arrangement` and takes five enumerated values. The forbidden `layout`, `variant` and `presentation` keys stay forbidden.
- Query execution is internal (`lib/genui/query/`). Exposing it as a `query_dataset` MCP capability, recipes as data, and `/mcp` support are deferred.
- Tier 3 is not built and needs its own decision and security review.

## Alternatives considered

- Add more fixed forms (table, dashboard) as composites. Rejected as the only path: it covers the forms we thought of, not "any format".
- Free-form generated code for every request. Rejected: the largest validation and security surface for requests a primitive vocabulary can serve.
- A keyword or regex form classifier. Rejected by the task-planning ADR and the composition spec.
