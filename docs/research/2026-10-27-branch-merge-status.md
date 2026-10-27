# Branch merge status (2026-10-27)

## GitHub pull requests

No open PRs on `gaboesquivel.com`, `flow-skills`, `flow-next`, or `flow-mono`. Ecosystem dogfood cleanup is on each repo’s **`main`**.

## `gaboesquivel.com` local branches

| Branch | vs `main` | Action |
| --- | --- | --- |
| `develop` | Synced with `main` | None |
| `feat/genui-composition-ui` | Behind `main` (0 unique commits) | Safe to delete locally/remotely when convenient |
| `feat/genui-project-composition` | Behind `main` | Same |
| `fix/cv-screen-spacing` | **1 old commit** (`ad2dc006`, Sep 2025) not on `main` | **Do not merge** — conflicts on CV/PDFs; `main` superseded spacing work |
| `fix/section-heading-cadence`, `updated-capy` | Stale | Behind `main` |

## Product note

`/ask` redirects to `/`. Eve UI under `app/connect/` is not mounted on a public route; booking/note UI still serves Eve tool parts if a connect surface is re-enabled.
