# 0001. Flow adopter documentation conventions

Status: accepted (2026-10-27)

## Context

This site installs [Flow Skills](https://github.com/gaboesquivel/flow-skills) for delivery methodology. Its `flow` skill aligns root context after meaningful changes. [flow-skills decision 0006](https://github.com/gaboesquivel/flow-skills/blob/main/docs/decisions/0006-flow-lite-and-flat-docs.md) defaults adopters to flat `docs/specs/NNN-short-name.md` and `docs/decisions/NNN-short-name.md`. This repository already holds bounded work under `docs/specs/homepage-genui/`, `docs/pdr/`, and `docs/adr/` from earlier planning.

## Decision

- **New bounded work** — prefer `docs/specs/NNN-short-name.md` for specs and `docs/decisions/NNN-short-name.md` for significant rationale that cannot live in root docs or code alone.
- **Historical trees stay** — do not migrate `docs/specs/homepage-genui/`, `docs/pdr/`, `docs/adr/`, or `docs/ideas/`; treat them as evidence and prior conventions.
- **Product identity** — `PRODUCT.md` remains this site's hire narrative and page jobs. Flow Skills does not replace it with Flow's methodology identity ([flow-skills 0009](https://github.com/gaboesquivel/flow-skills/blob/main/docs/decisions/0009-adopter-product-context.md)).

## Consequences

- [AGENTS.md](../../AGENTS.md) Decisions and Specification storage sections describe the flat default for new work and point here.
- [docs/agents/skills.md](../agents/skills.md) states that the `flow` skill aligns root docs; feature-folder and PDR/ADR paths remain valid for existing material.

## Supersedes

Nothing. Clarifies how this adopter applies Flow flat-docs guidance alongside legacy spec and decision locations.
