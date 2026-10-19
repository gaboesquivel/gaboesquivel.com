#!/bin/sh
# Push GOOGLE_CALENDAR_ID and GOOGLE_SERVICE_ACCOUNT_JSON from the environment to Vercel.
set -eu

root="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
calendar_id="${GOOGLE_CALENDAR_ID:-}"
json="${GOOGLE_SERVICE_ACCOUNT_JSON:-}"

if [ -z "$calendar_id" ] || [ -z "$json" ]; then
  echo "Set GOOGLE_CALENDAR_ID and GOOGLE_SERVICE_ACCOUNT_JSON in the environment, then run this script."
  exit 1
fi

if ! command -v vercel >/dev/null 2>&1; then
  echo "Install the Vercel CLI, then run this script again."
  exit 1
fi

cd "$root"

for target in production preview; do
  printf '%s' "$calendar_id" | vercel env add GOOGLE_CALENDAR_ID "$target" --force
  printf '%s' "$json" | vercel env add GOOGLE_SERVICE_ACCOUNT_JSON "$target" --force
done

echo "Set GOOGLE_CALENDAR_ID and GOOGLE_SERVICE_ACCOUNT_JSON on Vercel ($calendar_id). Redeploy gaboesquivel."
