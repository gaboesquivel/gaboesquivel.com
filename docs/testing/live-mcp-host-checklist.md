# Live MCP host checklist (manual)

Use when closing the open **openui-experiences** / **mcp-app** gates. CI baseline: [acceptance record](../research/2026-10-27-acceptance-automated-record.md). Procedure: [mcp-apps-host-release-gate.md](mcp-apps-host-release-gate.md).

Copy this table into your release notes or a dated file under `docs/research/` when done. Do not commit secrets, tokens, or visitor PII.

| Field | ChatGPT | Claude |
| --- | --- | --- |
| Date (UTC) |  |  |
| Host app version |  |  |
| Server URL tested | `https://gaboesquivel.com/mcp` (or tunnel) |  |
| Tool invoked (read) | e.g. `get_profile` |  |
| Text fallback useful | yes / no |  |
| App resource / iframe renders | yes / no / N/A |  |
| Resize / narrow container OK | yes / no / N/A |  |
| Write tool (if tested) | tool name + outcome |  |
| Failures or limits observed |  |  |

**Pass criteria:** At least one read tool returns structured + text content; UI host shows GenUI or honest text fallback; write paths behave per capability contract (explicit confirm where required).
