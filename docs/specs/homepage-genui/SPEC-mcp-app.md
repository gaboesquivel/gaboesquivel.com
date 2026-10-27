# Spec: MCP App

Module: `mcp-app`. Status: **largely implemented on `main`** — `/mcp` serves nine registry tools; capabilities shared with HTTP; MCP Apps harness in CI. Outstanding: live ChatGPT/Claude release gate, confirm `/mcp/cv` retirement vs spec, refresh migration section (Eve no longer owns `/mcp`). Gap note: [explore](../../research/2026-10-27-explore-composition-homepage-mcp-gap.md). Depends on: `public-capabilities`, `openui-experiences`. Index: [capability map](CAPABILITIES-homepage-genui.md).

## Objective

Expose useful public tools and the same responsive experiences through one `/mcp` endpoint. External host models orchestrate ordinary requests; no nested Eve/Sonnet run is required to read portfolio data, get a CV, open contact, list availability, send a note or book a call.

## Tech stack and project structure

Target the split MCP TypeScript v2 SDK and a compatible `@modelcontextprotocol/ext-apps` version. Pin and test their compatibility; do not reuse v1 examples blindly. Existing source: `lib/mcp/cv-app.ts`, `cv-app-widget-html.ts`, `app/mcp/cv/route.ts`, `agent/channels/mcp.ts`, `next.config.js`, and `app/docs/page.tsx`. Proposed owners: `app/mcp/route.ts`, `lib/mcp/server.ts`, `lib/mcp/app-resource.ts` and an isolated browser app entry sharing `components/genui/library/`.

The browser resource must exclude server modules, credentials and the homepage composer. Its native counterpart remains direct React, with no iframe.

## Protocol and tool contract

Expose all nine independent operations from [public-capabilities](SPEC-public-capabilities.md), with descriptive input/output schemas and accurate read/write annotations. No generic `execute_action(name, payload)` proxy. Meaningful public operations are model-visible as well as available to the app where needed. Any app-only mechanical tool needs a documented reason.

Every tool produces useful text and typed structured data even if the host does not render UI. When appropriate, attach a versioned OpenUI document using the shared envelope and a `ui://gaboesquivel/app` resource through standard MCP Apps metadata. The adapter may compose deterministic UI from domain results; the capability registry itself remains presentation-independent. Do not pass results through the homepage reasoning path.

Serve a thin React app with the MCP Apps bridge, shared library and renderer. It consumes tool results, adapts to actual container size/host context and sends allowed action calls through the host bridge. Do not establish a second browser MCP connection to the website. Handle host resize, absent context, text-only clients, resource-load failure, tool errors and disconnected hosts explicitly.

Set a narrow resource/connect policy matching shipped assets and needed requests; do not permit arbitrary generated external origins. Validate tool arguments/results at the boundary. Host display names are diagnostic only and never trusted authorization input. External calls use server-derived abuse-control identity, not browser session attributes supplied by the caller.

Side effects follow the shared action contract: UI forms require explicit final interaction, model tool calls remain available under the host's own interaction model, and server limits/validation/idempotency apply to both. A visible result or structured document cannot itself trigger a send or booking.

## Migration contract (shipped on `main`)

`app/mcp/route.ts` serves the public MCP server (nine capability tools). Eve no longer intercepts `/mcp` for the public tool list; homepage composition remains on `/api/genui/compose`. `/mcp/cv` returns **410** with a migration message to the unified server and `get_cv`. JSON Render is not used in the MCP App build.

Still verify production routing after deploy changes. Live ChatGPT/Claude acceptance is manual ([mcp-apps-host-release-gate.md](../../testing/mcp-apps-host-release-gate.md)); simulated host tests in CI are not a substitute.

## Code style

Preserve structured results with useful text. Existing pattern from `lib/mcp/cv-app.ts`:

```ts
return {
  content: [
    {
      text: `${payload.title}: ${payload.pdfUrl}`,
      type: "text" as const,
    },
  ],
  structuredContent: { ...payload },
};
```

This is a local output-style example, not a claim that existing v1 registration APIs are valid in v2. Reuse schemas and domain executors, not copied business logic.

## Commands

```bash
bun test lib/mcp
bun run test:llms
bun run verify
bun run build
bun run verify:routes https://gaboesquivel.localhost
```

Update/replace `lib/mcp/cv-app.test.ts` and its `test:llms` reference as the old endpoint retires. Implementation planning must supply the exact compatible SDK-client integration command; do not mistake an HTTP GET or browser screenshot for a successful MCP session.

## Testing strategy and success criteria

Use SDK client/server integration tests for initialize, tool listing/calls, resource listing/read, errors and text-only behavior. Compare native/MCP results for the same domain inputs. Run browser resource tests under narrow/wide embedded containers, then test actual connected ChatGPT and Claude hosts. Record host/version/date, tool invoked, returned text/data, resource rendering and action outcome. Mock all writes unless a specific live test is authorized.

| ID | Observable acceptance |
| --- | --- |
| MCP-01 | A protocol client initializes `/mcp`, discovers all intended operations, and receives schema-valid useful results. |
| MCP-02 | Each UI-associated result resolves to a renderable resource; text-only use remains useful. |
| MCP-03 | All ordinary tool calls record zero Jev/Sonnet/Eve generation calls. |
| MCP-04 | Native and MCP adapters enforce the same validation, limits and retry semantics. |
| MCP-05 | Resource resize, missing host context, tool failure and disconnection remain usable without leaked secrets or arbitrary execution. |
| MCP-06 | `/mcp` reaches the new server locally and in deployment; Eve no longer intercepts it and native composition still works. |
| MCP-07 | `/mcp/cv` retirement and old-tool migration are explicit in `/docs` and source exports; no second permanent server remains. |
| MCP-08 | ChatGPT and Claude host evidence demonstrates shared UI and at least read-only interaction; any untested host/write path is explicitly reported. |

## Boundaries

- Always: expose useful text, share schemas/services, use the host bridge, test routing in deployed output and preserve domain controls.
- Ask first: preserve deprecated tools indefinitely, alter public action limits, or add a second public server.
- Never: claim host compatibility from SDK tests alone, hide public operations behind a generic executor, or run Eve behind each MCP operation.

## Open questions

Approve the retirement policy and whether both hosts are a release gate (recommended). Planning must settle exact SDK/Apps versions, resource bundling/CSP, HTTP origin policy, deployment routing ownership and external-host test access. No public app-store submission or production deployment is included in specification approval.
