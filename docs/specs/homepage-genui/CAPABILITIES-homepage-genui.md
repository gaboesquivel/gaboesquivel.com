# Capability map: Homepage GenUI

Status: homepage GenUI composition, capabilities, and MCP v2 runtime are implemented on `/`. Historical planning notes live in [PLAN-public-capabilities.md](./PLAN-public-capabilities.md).

## Objective and scope

Let visitors explore Gabo's work and act on their intent from the homepage, while retaining a useful server-rendered portfolio. Share the responsive OpenUI experiences and public operations with external MCP App hosts. The original [idea draft](../../ideas/homepage-genui.md) is preserved as background; its copied conversation citation markers are not independently usable references.

| Module ID | Responsibility | Depends on | Specification |
| --- | --- | --- | --- |
| public-capabilities | Shared public reads and writes, validation, limits, idempotency | — | [Public capabilities](SPEC-public-capabilities.md) |
| openui-experiences | Component catalog, document validation, renderer, responsive experiences, action bindings | public-capabilities | [OpenUI experiences](SPEC-openui-experiences.md) |
| composition-runtime | Deterministic routing, Jev decisions, Eve/Sonnet generation, cancellation and telemetry | openui-experiences | [Composition runtime](SPEC-composition-runtime.md) |
| homepage-genui | Server-rendered homepage, prompt transition, sticky search, replacement and recovery | composition-runtime | [Homepage GenUI](SPEC-homepage-genui.md) |
| mcp-app | Public tools, shared app resource, host integration, non-UI fallback | public-capabilities, openui-experiences | [MCP App](SPEC-mcp-app.md) |

Build order: public-capabilities → openui-experiences → composition-runtime → homepage-genui → mcp-app. This is the approved capability order, not an implementation plan. MCP does not depend on the homepage agent: ordinary external tool calls must never invoke Eve/Sonnet.

## Per-module workflow

Run Specify → Plan → Tasks → Implement for each module in dependency order. The [initiative overview](INITIATIVE-OVERVIEW.md) preserves earlier cross-module thinking but is not an executable plan.

| Module | Current phase | Plan/task ownership |
| --- | --- | --- |
| public-capabilities | **Complete** (provider on `develop`) | [PLAN-public-capabilities.md](./PLAN-public-capabilities.md) (historical) |
| openui-experiences | **Largely complete** on `develop`; OU-08 + live MCP open | [SPEC-openui-experiences](SPEC-openui-experiences.md); [explore gap](../../research/2026-10-27-explore-openui-experiences-gap.md) |
| composition-runtime | **Partially shipped** (task planning, compose budgets) | Reconcile [SPEC-composition-runtime](SPEC-composition-runtime.md) with ARCHITECTURE.md before a new plan |
| homepage-genui | **Partially shipped** (homepage shell, search, compose region) | Reconcile [SPEC-homepage-genui](SPEC-homepage-genui.md) with `app/page.tsx` / shell components |
| mcp-app | Draft spec | Separate future module cycle |

`tasks/plan.md` and `tasks/todo.md` describe only the active module. Before advancing, preserve its completed plan and checklist here as `PLAN-<module-id>.md` and `TASKS-<module-id>.md`, link them from this index, then activate the next module. Do not overwrite incomplete work for a different module.

Confirmed during planning: independent queries, local review-and-confirm for native bookings, and both ChatGPT and Claude as live MCP acceptance gates. Other proposed defaults remain identifiable below; those confirmations do not approve every module or implementation step.

## Assumptions and proposed defaults

The user approved the module boundaries, not every policy below. These proposals require specification review before implementation:

- Each query is independent. No transcript, conversation carryover, generated-result cache, URL query persistence, or cross-visit draft storage.
- Reset restores the ordinary homepage. Unsent contact fields survive composition changes in memory until explicit reset or navigation; availability is always revalidated.
- Valid partial output can appear, but generated writes remain disabled until the final document validates. No action runs merely because generated code mentions it.
- Native booking retains a review/confirm step, implemented as deterministic UI rather than an extra model turn. The final note-form submit is its confirmation. External model callers retain the existing no-browser-approval contract.
- `/ask` temporarily redirects to `/`; `/mcp/cv` retires when the unified endpoint is validated. The obsolete `agent_start`/`agent_get` contract is replaced, with migration guidance on `/docs`.
- The draft's latency numbers are measurement targets, not measured results or launch guarantees. Exact versions and resource limits must be pinned during technical planning.

## Source baseline and ownership

[PRODUCT.md](../../../PRODUCT.md), [DESIGN.md](../../../DESIGN.md), and [ARCHITECTURE.md](../../../ARCHITECTURE.md) describe today's implementation. They have not been rewritten to imply this feature exists. `app/page.tsx` now renders the approved Design System v2 split portrait hero, local search fallback, editorial selected work, focus, writing, career and work-together sections. This visual baseline is separate from the unimplemented generative runtime. `/mcp` currently reaches Eve through rewrites and deployment routing patches in `next.config.js`; `/mcp/cv` is a separate handler.

Manifest ranges, not resolved installed versions: Next `^16.4.2`, React `^19.3.1`, Eve `^0.80.1`, AI SDK `^7`, Base UI `^1.9.0`, Zod `^4.6.7`; JSON Render is `0.21.1`, and the existing MCP SDK is `^1.32.1`. [package.json](../../../package.json) and the lockfile remain authoritative. OpenUI is not yet a declared dependency. Source config selects `anthropic/claude-sonnet-5.5`; that proves configuration, not provider availability.

| Changed decision | Owning documents to update with the approved implementation |
| --- | --- |
| Homepage prompt, independent queries, reset, `/ask` migration | PRODUCT.md; DESIGN.md; route/export consumers identified by docs/agents/propagation.md |
| Responsive experiences and sticky transition motion | DESIGN.md |
| Capability registry, composition tiers, action transport, MCP routing | ARCHITECTURE.md; docs/agents/ask.md |
| External tool contract and retiring endpoints | PRODUCT.md; ARCHITECTURE.md; app/docs/page.tsx; generated-export source mappings |
| Runtime skills and instructions | docs/agents/skills.md; docs/agents/ask.md |
| Model configuration and setup requirements | README.md; .env.example; docs/agents/ask.md |

A consequential product/architecture change should record its rationale in a PDR/ADR when that rationale cannot be inferred from code, following AGENTS.md. Records are not created as approved decisions in this draft pass.

## Shared verification and conventions

All specs inherit [AGENTS.md](../../../AGENTS.md), [checks](../../agents/checks.md), and [browser verification](../../agents/verify.md). Bun tests are colocated `*.test.ts`; do not impose an invented percentage coverage gate. Cover observable contracts and failure boundaries. Read version-matched Next/Eve/AI SDK docs before implementation.

Use TypeScript, Zod boundaries, existing named exports and injected service dependencies. Keep identity/voice authority in the installed `gabo` skill and project facts in the `gaboesquivel` package. Keep generated exports derived from their sources.

Existing commands:

```bash
bun run dev
bun run verify
bun run test:llms
bun run build
bun run verify:routes https://gaboesquivel.localhost
```

`verify` is content compilation and lint, not a production build. Route checks require a reachable server. UI verification uses `agent-browser`, with its core skill read first. Tests that send real mail or create calendar events require an explicitly authorized test target; mocked tests must not be described as live verification.

## Evidence and compatibility checks

Reviewed primary references:

- [OpenUI renderer](https://www.openui.com/docs/openui-lang/renderer): streaming, parsing callbacks, and function-map tool provider. Use a custom catalog, not the stock UI kit.
- [OpenUI React Lang API](https://www.openui.com/docs/api-reference/react-lang): library and renderer surface. Exact package versions and Eve adapter compatibility remain to be checked.
- [TypeSafe confidence](https://docs.typesafe.ai/confidence) and [Noul](https://docs.typesafe.ai/primitives/noul): Choice/Score confidence and yes/no probability are different signals. A single invented confidence field must not erase that distinction.
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk): upstream identifies split v2 packages as the stable line. Migration is in scope; pin compatible versions with ext-apps rather than copying API imports from the original draft.
- [MCP Apps](https://github.com/modelcontextprotocol/ext-apps): protocol and SDK source for the external app boundary. Actual ChatGPT/Claude support must be exercised, not inferred from this link.

Local evidence includes `lib/connect/schema.ts`, `book.ts`, `note.ts`, `email.ts`, `sonnet-model.ts`, `agent/tools/connect.ts`, `lib/mcp/cv-app.ts`, the Next server/client component guide, and Eve's bundled instruction/session docs. Source review found that pending writes currently return success-like duplicate messages and note delivery has no provider idempotency key. The new public action contract must distinguish pending, confirmed and uncertain outcomes; retaining existing helpers unchanged does not prove the draft's duplicate-prevention promise.

## Review questions

1. Independent queries and deterministic booking review are confirmed. Review the proposed reset and in-memory draft behavior with the UI module specs.
2. Approve replacing the old MCP tools and retiring `/mcp/cv`, with `/docs` migration guidance rather than a permanent second server?
3. Accept the proposed request/output/time budgets in the composition spec as initial limits, adjustable from evidence?
4. Confirmed: both ChatGPT and Claude must pass live acceptance before the MCP module ships. The homepage can ship first; inaccessible hosts remain explicit blockers for the MCP claim.

Technical planning must resolve exact compatible dependency versions, gateway model availability, Eve/OpenUI adapter behavior, provider idempotency/reconciliation support, telemetry retention/redaction, and a reproducible performance baseline. These are evidence tasks, not reasons to ask the user to choose SDK internals.
