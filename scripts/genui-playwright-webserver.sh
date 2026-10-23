#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${PLAYWRIGHT_PORT:-3199}"
export GENUI_FIXTURE_LAB=1

if lsof -ti:3099 >/dev/null 2>&1; then
  echo "[genui-playwright] Stopping dev server on 3099 so fixture lab can run on ${PORT}."
  lsof -ti:3099 | xargs kill -9 2>/dev/null || true
  sleep 1
fi

bun run content:build
exec env GENUI_FIXTURE_LAB=1 bunx next dev -p "$PORT"
