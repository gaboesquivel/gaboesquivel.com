# /ask, notes, bookings, and MCP

`/ask` redirects to `/`. Homepage search and the search dialog are the generative UI; booking and contact render there as GenUI forms that call `/api/capabilities`. This file covers credentials and booking limits for those capability tools and the public MCP endpoint at `/mcp`.

Page jobs for `/ask` and `/docs` are in [PRODUCT.md](../../PRODUCT.md). Form appearance is in [docs/agents/design/ask.md](design/ask.md). Trust rules, credential roles, and the booking limit are in [ARCHITECTURE.md](../../ARCHITECTURE.md).

## Skills and scaffold

Read the installed `eve`, `ai-sdk`, and `typesafe-ai` skills (bundled docs in `node_modules`, not memory). No browser UI talks to Eve: `agent/channels/eve.ts` disables the default `/eve/v1` web channel. Do not re-enable it or add a chat transcript without a spec. The runtime agent ships only the `gabo` skill in `agent/skills/`.

## Credentials

Live inference prefers Vercel AI Gateway. Names and roles are in `.env.example` and the architecture integrations table. If a documented name is missing from `.env`, stop and ask. If it is set locally, use it and do not ask again. Never print values.

- `AI_GATEWAY_API_KEY` — normal path for Eve, semantic GenUI, and Jev (`lib/ai/resolve-chat-model.ts`, `lib/connect/compose.ts`).
- `ANTHROPIC_API_KEY` — only with `FLOW_ALLOW_DIRECT_ANTHROPIC=1` for local direct Anthropic override when the gateway key is unset.
- `EVE_AGENT_MODEL` — optional Eve and compose model override (default `anthropic/claude-sonnet-5.5`).

## Caps

Variable names are in `.env.example`. On Vercel, provision them with the [Upstash for Redis](https://vercel.com/marketplace/upstash/upstash-kv) marketplace integration on project `gaboesquivel`. Accept marketplace terms in the dashboard if the CLI prompts.

## Calendar

Follow the Calendar comments in `.env.example`. The key template is [scripts/google-service-account.json.example](../../scripts/google-service-account.json.example). Set both variables locally and on Vercel Production and Preview, then redeploy. `GOOGLE_CALENDAR_ID` has no runtime default.

## Note form

The send-email opener is not sent to the agent. `agent/instructions/rules.md` tells the model not to repeat the lead. The rest of that boundary is in [ARCHITECTURE.md](../../ARCHITECTURE.md) under agent and action flow.

Done when a missing documented env name stopped the task, no secret value was printed, and the note opener is still withheld from the agent.
