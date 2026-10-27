# /ask, notes, bookings, and MCP

`/ask` redirects to `/`. Homepage search is the generative UI. This file covers credentials and booking limits for the capability tools and the connect code that is not mounted on that route.

Page jobs for `/ask` and `/docs` are in [PRODUCT.md](../../PRODUCT.md). Card appearance is in [DESIGN.md](../../DESIGN.md). Trust rules, credential roles, and the booking limit are in [ARCHITECTURE.md](../../ARCHITECTURE.md).

## Skills and scaffold

Read the installed `eve`, `ai-sdk`, and `typesafe-ai` skills (bundled docs in `node_modules`, not memory). Then read Eve's Web Chat scaffold source in `node_modules/eve/dist/src/setup/scaffold/create/web-template.js` (`agent-chat.tsx` / `agent-message.tsx` strings).

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
