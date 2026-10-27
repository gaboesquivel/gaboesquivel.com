# Branch merge status (2026-10-27)

## GitHub pull requests

No open PRs on `gaboesquivel.com`, `flow-next`, or `flow-mono`. **flow-skills** `main` includes [PR #13](https://github.com/gaboesquivel/flow-skills/pull/13) (`start` bootstrap lib, `74a54f1`). **gaboesquivel.com** `main` is `fdd679b8` (`develop` synced).

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
