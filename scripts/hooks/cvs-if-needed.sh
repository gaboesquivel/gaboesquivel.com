#!/bin/sh
set -eu

root="$(CDPATH= cd -- "$(dirname "$0")/../.." && pwd)"
cd "$root"

staged="$(git diff --cached --name-only --diff-filter=ACMR)"

if printf '%s\n' "$staged" | grep -qE '^(app/cv/|app/global\.css|components/shared/contact-info\.tsx)'; then
  echo "CV source changed — regenerating PDFs…"
  bun run cvs
  git add public/gaboesquivel-cv*.pdf app/cv/page-breaks.ts
fi
