# Glossary

Shared terms. The owning document holds the rules.

## Page job

The one decision a public page helps the visitor make. [PRODUCT.md](PRODUCT.md) assigns each route its job.

## Keyword owner

The search phrase a page may use in its title and description. Each phrase has one owning route. The list is in [PRODUCT.md](PRODUCT.md).

## Package

The external [`gaboesquivel`](https://www.npmjs.com/package/gaboesquivel) package. It owns project, technology, employment, and CV facts. This site owns narrative, routes, presentation, and print layout. Boundaries are in [ARCHITECTURE.md](ARCHITECTURE.md); edits follow [docs/agents/package.md](docs/agents/package.md).

## Skills catalog

The [`gaboesquivel-skills`](https://github.com/gaboesquivel/gaboesquivel-skills) repository. It owns the `gabo` skill: voice, approved wording, and standing identity claims. Installs land in `.agents/skills/` via `skills-lock.json`. Site runtime copy lives under `agent/skills/` for Eve only. See [docs/agents/skills.md](docs/agents/skills.md).

## Connect

Booking and contact render as GenUI forms inside homepage search (`/`) and the search dialog; there is no separate connect UI. Homepage search is the public generative surface; `/ask` redirects to `/`. `/contact` is the human outreach page and form. `/connect` redirects to `/contact`. See [ARCHITECTURE.md](ARCHITECTURE.md) and the `/` and `/contact` jobs in [PRODUCT.md](PRODUCT.md).

## Generation tier

How much the model shapes a result: fixed (code chooses everything, zero model calls), declarative (the model composes approved primitives over application datasets), or fully generative (not built). [Decision 0005](docs/decisions/0005-three-tiers-of-ui-generation.md).

## View and dataset

A view is a `ViewExperience`: tables, charts, stats or a board in an approved arrangement. A dataset is a set of rows the application computed from published records, each citing its records. The model names datasets; it never writes their values. [Spec 003](docs/specs/003-open-composition.md).

## Field registry

The one declaration of what a view can query: each field's type, allowed operations, grouping and table column. Prompt, executor and validator all read it. [Decision 0006](docs/decisions/0006-field-registry-and-verbatim-excerpts.md).

## Archive

Blog posts published before 2020. They stay on the site. `/llms-full.txt` omits them. Rewrite one only when the task names that post. See [PRODUCT.md](PRODUCT.md) and [docs/agents/content.md](docs/agents/content.md).

## Llms corpus

The generated plain-text and Markdown view of the site for agents and LLM tools, including `/llms.txt`, `/llms-full.txt`, Markdown negotiation, and the agent index. Sources and outputs are in [ARCHITECTURE.md](ARCHITECTURE.md).
