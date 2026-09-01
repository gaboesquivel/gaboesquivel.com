#!/bin/sh
set -eu

base="${1:-http://localhost:3099}"
root="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
cd "$root"

if ! curl -s -o /dev/null --connect-timeout 2 "$base/"; then
  echo "Server not reachable at $base"
  echo "Start it with: bun run dev"
  exit 1
fi

if [ ! -f "$root/.velite/blogs.json" ]; then
  echo "FAIL missing .velite/blogs.json — run: bun run content:build"
  exit 1
fi

# Resolve slugs from Velite output so this does not rot when posts move.
slugs="$(
  node -e '
    const blogs = require("./.velite/blogs.json")
    const byDate = [...blogs].sort((a, b) =>
      a.publishedAt < b.publishedAt ? 1 : -1,
    )
    const recent = byDate[0] && byDate[0].slug
    const archive = (byDate.find((b) => String(b.publishedAt).startsWith("2012")) || {}).slug
    const withEmbed = (blogs.find(
      (b) =>
        typeof b.body === "string" &&
        (b.body.includes("YouTube") || b.body.includes("VideoEmbed")),
    ) || {}).slug
    if (!recent || !archive) {
      console.error("Could not resolve recent/archive blog slugs")
      process.exit(1)
    }
    console.log([recent, archive, withEmbed || recent].join("\n"))
  '
)" || exit 1

recent="$(printf '%s\n' "$slugs" | sed -n '1p')"
archive="$(printf '%s\n' "$slugs" | sed -n '2p')"
embed="$(printf '%s\n' "$slugs" | sed -n '3p')"

check() {
  path="$1"
  expected="${2:-200}"
  code="$(curl -s -o /dev/null -w '%{http_code}' "${base}${path}")"
  if [ "$code" != "$expected" ]; then
    echo "FAIL ${path} expected ${expected} got ${code}"
    exit 1
  fi
  echo "OK   ${path} ${code}"
}

check_redirect() {
  path="$1"
  code="$(curl -s -o /dev/null -w '%{http_code}' "${base}${path}")"
  if [ "$code" != "308" ] && [ "$code" != "301" ] && [ "$code" != "302" ]; then
    echo "FAIL ${path} expected redirect got ${code}"
    exit 1
  fi
  echo "OK   ${path} ${code} (redirect)"
}

check /
check /cv
check "/cv?focus=ai"
check "/cv?focus=web3"
check "/cv?focus=fullstack"
check /connect
check "/blog/${recent}"
check "/blog/${archive}"
check "/blog/${embed}"
check_redirect /cal

echo "All route checks passed."
