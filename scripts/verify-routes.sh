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
ask_body="$(mktemp)"
ask_code="$(curl -s -o "$ask_body" -w '%{http_code}' "${base}/ask")"
if [ "$ask_code" != "200" ]; then
  echo "FAIL /ask expected 200 got ${ask_code}"
  exit 1
fi
if ! grep -q "Book a call" "$ask_body"; then
  echo "FAIL /ask body missing Book a call"
  exit 1
fi
if grep -q "Send Message" "$ask_body"; then
  echo "FAIL /ask still has Send Message"
  exit 1
fi
rm -f "$ask_body"
echo "OK   /ask 200"
check_redirect /connect
contact_body="$(mktemp)"
contact_code="$(curl -s -o "$contact_body" -w '%{http_code}' "${base}/contact")"
if [ "$contact_code" != "200" ]; then
  echo "FAIL /contact expected 200 got ${contact_code}"
  exit 1
fi
if ! grep -q "Contact Gabo Esquivel" "$contact_body"; then
  echo "FAIL /contact body missing Contact Gabo Esquivel"
  exit 1
fi
rm -f "$contact_body"
echo "OK   /contact 200"
check /openapi.json
api_body="$(mktemp)"
api_code="$(curl -s -o "$api_body" -w '%{http_code}' "${base}/api/v1/profile")"
if [ "$api_code" != "200" ]; then
  echo "FAIL /api/v1/profile expected 200 got ${api_code}"
  exit 1
fi
if ! grep -q '"name":"Gabo Esquivel"' "$api_body" && ! grep -q '"name": "Gabo Esquivel"' "$api_body"; then
  echo "FAIL /api/v1/profile body missing name"
  exit 1
fi
rm -f "$api_body"
echo "OK   /api/v1/profile 200"
api_err="$(mktemp)"
api_err_code="$(curl -s -o "$api_err" -w '%{http_code}' "${base}/api/not-a-route")"
if [ "$api_err_code" != "404" ]; then
  echo "FAIL /api/not-a-route expected 404 got ${api_err_code}"
  exit 1
fi
ctype="$(curl -sI "${base}/api/not-a-route" | tr -d '\r' | grep -i '^content-type:' || true)"
case "$ctype" in
  *application/problem+json*) ;;
  *)
    echo "FAIL /api/not-a-route expected application/problem+json got ${ctype:-none}"
    exit 1
    ;;
esac
rm -f "$api_err"
echo "OK   /api/not-a-route 404 problem+json"
check "/blog/${recent}"
check "/blog/${archive}"
check "/blog/${embed}"
check_redirect /cal

echo "All route checks passed."
