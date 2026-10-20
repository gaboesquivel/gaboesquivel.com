# Browser verification

Use the global [agent-browser](https://github.com/vercel-labs/agent-browser) CLI. Read `agent-browser skills get core` before commands. Use `skills get dogfood` for a substantial UI pass.

Open pages at `https://gaboesquivel.localhost` (Portless HTTPS, the same server as `bun run dev`). Use `http://localhost:3099` only when HTTPS or certificate trust blocks the CLI. Leave TLS verification enabled.

```bash
export AGENT_BROWSER_SESSION="$(agent-browser session id --scope worktree --prefix <task>)"
```

Exercise the affected interactions. Snapshot for structure, screenshot for layout, and check `errors` and `console`. Fix issues and re-verify. Report what you ran and what you saw. If agent-browser is unavailable, say so.

Leave screenshots and other local browser artifacts uncommitted. Human setup for the CLI and certificate trust is in [README.md](../../README.md).

Done when the affected flow has been exercised, related routes that share the changed state have been checked, and the report names the session, URL, and what the snapshot, screenshot, errors, and console showed.
