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

The CLI and skill are global development tools, not application dependencies.

With `bun run dev` running, smoke-test the CLI against **`https://gaboesquivel.localhost`**. Read `agent-browser skills get core` before other commands. If the browser reports an untrusted certificate, run `bun run setup:portless` once—do not disable TLS verification by default.

```bash
export AGENT_BROWSER_SESSION="$(agent-browser session id --scope worktree --prefix smoke)"
agent-browser open https://gaboesquivel.localhost
agent-browser snapshot -i
agent-browser errors
agent-browser close
```

Use `http://localhost:3099` only to troubleshoot a blocked HTTPS connection or certificate trust.

Follow [docs/agents/verify.md](docs/agents/verify.md) for UI verification requirements.

## Development checks

- `bun run verify`: build content and check lint/formatting.
- `bun run test:llms`: regenerate exports and run selected content, CV, API, and chat tests.
- `bun run build`: generate content and machine-readable outputs, then build Next.js.

See [docs/agents/checks.md](docs/agents/checks.md) for task-specific checks and pre-commit behavior.

## Docs

- [ARCHITECTURE.md](ARCHITECTURE.md): system boundaries, data flow, integrations, and source ownership
- [PRODUCT.md](PRODUCT.md): audience, pages, and what each page is for
- [DESIGN.md](DESIGN.md): visual system, components, and accessibility
- [GLOSSARY.md](GLOSSARY.md): shared terms
- [AGENTS.md](AGENTS.md): lifecycle and pointers for coding agents. Procedures it points at live in [docs/agents/](docs/agents/checks.md).

Credits: leerob.io
