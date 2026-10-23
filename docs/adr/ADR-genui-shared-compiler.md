# ADR: Shared GenUI OpenUI compiler

## Status

Accepted

## Context

GenUI envelopes were validated server-side with prefix and size checks only, while the client used the full OpenUI parser and Zod component schemas. Composite names could fall through to generic renderers, and `ExperienceStack` implied nested composition that is not implemented.

## Decision

Introduce `lib/genui/contract/` as the authoritative catalog: shared Zod prop schemas, a framework-agnostic `genuiContractLibrary` (`@openuidev/lang-core`), and `compileExperience()` for server and client validation. Deterministic builders use centralized OpenUI string serialization. `ExperienceStack` is rejected by the production compiler until nested experiences render real subtrees.

## Alternatives considered

- Duplicating JSON Schema manually for the server (rejected: drift risk).
- Importing `components/genui/genui-library.tsx` on the server (rejected: client React boundary).
- Replacing OpenUI or JSON Render for tests (rejected: out of scope).

## Rationale

Model output is probabilistic; acceptance gates must be deterministic. One schema source keeps parser validation, prop policy, record grounding, and composite allowlists aligned across HTTP, MCP, and the browser renderer.

## Consequences

- Invalid documents fail before streaming `complete` events and before write-capable UI mounts.
- Adding a composite requires updating `contract/catalog.ts`, renderer views, fixtures, and contract tests together.
- `ExperienceStack` remains in the library for forward compatibility but is blocked for generated documents.
