# gaboesquivel.com

My personal website: narrative pages, project and stack evidence, writing, a printable CV, and contact. Project, technology, and CV facts come from the [`gaboesquivel`](https://www.npmjs.com/package/gaboesquivel) package ([source](https://github.com/gaboesquivel/gaboesquivel)).

## Setup

Requires [Bun](https://bun.sh) and Node 24.

```bash
bun install
bun run dev
```

`bun run dev` runs Velite and Next.js at [https://gaboesquivel.localhost](https://gaboesquivel.localhost). Next listens on port 3099; [http://localhost:3099](http://localhost:3099) hits the same app but is a troubleshooting URL only (see **Browser development**).

Trust the local HTTPS certificate once (this may prompt for sudo or Keychain):

```bash
bun run setup:portless
```

## Browser development

Verify UI work in a real browser with [agent-browser](https://github.com/vercel-labs/agent-browser). Install the CLI and its [Agent Skill](https://skills.sh/vercel-labs/agent-browser) globally once:

```bash
npm i -g agent-browser && agent-browser install
npx skills@latest add vercel-labs/agent-browser -g -y
```

Use `-g` when installing the skill so it targets your coding agent, not this repo’s Eve runtime (`agent/skills/`).

With `bun run dev` running, smoke-test the CLI against **`https://gaboesquivel.localhost`**. Read `agent-browser skills get core` before other commands. If the browser reports an untrusted certificate, run `bun run setup:portless` once—do not disable TLS verification by default.

```bash
export AGENT_BROWSER_SESSION="$(agent-browser session id --scope worktree --prefix smoke)"
agent-browser open https://gaboesquivel.localhost
agent-browser snapshot -i
agent-browser errors
agent-browser close
```

If HTTPS fails in the CLI only, retry with `http://localhost:3099` after fixing trust.

For a UI change: implement, run the relevant checks (`bun run verify` and others), open affected pages at `https://gaboesquivel.localhost`, interact, and inspect snapshots, screenshots, and errors. Fix and re-verify, then report what you ran and what you saw. Leave screenshots and other local browser artifacts uncommitted.

## Docs

- [PRODUCT.md](PRODUCT.md): audience, pages, and what each page is for
- [DESIGN.md](DESIGN.md): visual system, components, and accessibility
- [AGENTS.md](AGENTS.md): workflow, checks, and rules for coding agents

Credits: leerob.io
