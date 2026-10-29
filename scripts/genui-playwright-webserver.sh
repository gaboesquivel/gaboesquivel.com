#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${PLAYWRIGHT_PORT:-3199}"
export GENUI_FIXTURE_LAB=1
# Separate build dir, so the site dev server on 3099 keeps running.
export NEXT_DIST_DIR=.next-genui-lab

bun run prepare:generated
exec bunx next dev -p "$PORT"
