# gaboesquivel.com

My personal website: narrative pages, project and stack evidence, writing, a printable CV, and contact. Project, technology, and CV facts come from the [`gaboesquivel`](https://www.npmjs.com/package/gaboesquivel) package ([source](https://github.com/gaboesquivel/gaboesquivel)).

## Setup

Requires [Bun](https://bun.sh) and Node 24.

```bash
bun install
bun run dev
```

`bun run dev` runs Velite and Next.js at [https://gaboesquivel.localhost](https://gaboesquivel.localhost). Next listens on port 3099, so [http://localhost:3099](http://localhost:3099) is the same server.

Trust the local HTTPS certificate once (this may prompt for sudo or Keychain):

```bash
bun run setup:portless
```

## Docs

- [PRODUCT.md](PRODUCT.md): audience, pages, and what each page is for
- [DESIGN.md](DESIGN.md): visual system, components, and accessibility
- [AGENTS.md](AGENTS.md): workflow, checks, and rules for coding agents

Credits: leerob.io
