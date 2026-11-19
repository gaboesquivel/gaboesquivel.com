# 006: Quality guardrails

Status: accepted (2026-11-19)

Implements the Quality guardrails in the Measurement section of [PRODUCT.md](../../PRODUCT.md). [005](005-contact-measurement.md) reads the history this spec produces.

## Problem Statement

Nothing stops a pull request from making the site slower, less accessible, or worse for agents. CI runs only oxlint and oxfmt. Speed Insights on Hobby keeps 7 days of history, and the is-agentic.com score (100/100 on 2026-11-09) is not tracked, so a drop would go unnoticed.

## Solution

Lighthouse CI runs on every pull request against its Vercel preview and fails on accessibility, best practices, or SEO regressions. A weekly GitHub Actions job records PageSpeed Insights, CrUX field data, and the is-agentic.com score as history in the repository. All on free tiers (public repository, free Google Cloud API key).

## User Stories

1. As Gabo, I open a PR that drops homepage accessibility to 0.9, and the Lighthouse check fails with a report link.
2. As Gabo, I open a PR whose median mobile performance is 0.8, and the check warns but does not fail.
3. As Gabo, I read `perf/history.csv` on GitHub (or on `/analytics`) and see a weekly row for each page and form factor.
4. As Gabo, I see when the site first has CrUX field data, because a row's CrUX fields stop reading `none`.
5. As Gabo, I see the is-agentic.com score each week. When it is below the previous row, the job's summary shows it.

## Implementation Decisions

**Pull-request check.** `.github/workflows/lighthouse.yml` runs on `deployment_status` when the state is `success` and the environment is Preview.

- It uses `treosh/lighthouse-ci-action`, with `x-vercel-protection-bypass` from the `VERCEL_AUTOMATION_BYPASS_SECRET` repository secret.
- Pages: `/`, `/ai`, `/work`, and one current blog post.
- Mobile preset, `numberOfRuns: 5`, `aggregationMethod: median-run`, `temporaryPublicStorage: true`.
- Assertions:
  - accessibility, best-practices and SEO: error below 0.95
  - performance: warn below 0.85
  - `cumulative-layout-shift`: error above 0.1
  - LCP: warn above 2500 ms
  - TBT: warn above 300 ms

  Performance becomes an error only after a recorded baseline, which is a later change.

**Weekly job.** `.github/workflows/measure-weekly.yml` runs on a Monday cron and on `workflow_dispatch`, with `contents: write`. A script `scripts/measure/weekly.ts` does this:

- Calls the PageSpeed Insights v5 API (`PSI_API_KEY` secret) for the same pages, mobile and desktop.
- Calls the CrUX History API for the origin and records `none` on a 404 or NaN.
- Reads `GET https://is-agentic.com/api/v1/report?url=https://gaboesquivel.com` once. It is a read-only stored report, so the job never triggers or bulk-runs scans, per the is-agentic.com terms.
- Appends rows to `perf/history.csv` (`date,page,form_factor,performance,accessibility,best_practices,seo,lcp_ms,cls,tbt_ms,crux_lcp_p75,crux_inp_p75,crux_cls_p75`) and `perf/is-agentic.csv` (`date,score,label,scanned_at`).
- Commits them as `github-actions[bot]` with `chore(perf): weekly measurement <date>`.
- Writes a job summary that flags any score below the previous row.
- When an API call fails, it writes the error to the summary and appends no partial row.

**Exposure.** It runs only in GitHub Actions. The secrets stay in repository secrets, nothing deploys, and the CSVs are public data about a public site.

## Testing Decisions

**Behaviour and checks:**

- The weekly script, run locally with `--dry-run`, prints the rows it would append without writing them. With `PSI_API_KEY` unset, it exits non-zero with a clear message.
- **Invariants:**
  - At most one weekly row per page and form factor per date (a rerun on the same day replaces that day's rows).
  - No secret value appears in the CSVs or in the logs.
- The workflow syntax is checked with `actionlint` locally if it is available. Otherwise the first PR run is the check.

**Acceptance scenario.** Gabo has the PR from [005](005-contact-measurement.md) open on a preview deployment.

1. The preview deploys, the Lighthouse workflow runs, and the PR shows a check with links to the median reports.
2. A scratch commit that removes `alt` from the hero portrait makes the check fail on accessibility. Reverting it makes the check pass.
3. Gabo runs `measure-weekly` with `workflow_dispatch`. The bot commits 8 rows to `perf/history.csv` and 1 to `perf/is-agentic.csv` (score 100, or the current value).
4. A second dispatch on the same day leaves 8 rows for that date, not 16.
5. `/analytics` (005) shows the latest rows.

## Appetite

About one day of agent work. The first verifiable slice is the PR check (steps 1–2). If time runs short, ship the PR check and defer CrUX History. Not measured.

## Out of Scope

- Self-hosted LHCI server.
- Unlighthouse sitemap sweeps (optional later).
- Making performance a blocking check (needs a baseline first).
- Fixing the five is-agentic.com issues, the homepage text-to-markup ratio among them. Those are separate work.

## Further Notes

- **Unverified:** PageSpeed Insights' daily quota, and whether a Google Cloud project can issue the key without billing enabled. Don't enable billing.
- Repository secret to add: `PSI_API_KEY`. Previews are public (HTTP 200 on 2026-11-19), so the Lighthouse workflow sends no bypass header; if Vercel Deployment Protection is turned on later, add `VERCEL_AUTOMATION_BYPASS_SECRET` and pass it as `x-vercel-protection-bypass`.
- Built (2026-11-19): pages live in `perf/pages.json`, assertions in `perf/lighthouserc.json`. CrUX field data comes from PageSpeed Insights' `loadingExperience` (per URL, `none` until Google has data), so the separate CrUX History API call was deferred, as the Appetite allows. Scores are stored 0–100. `/analytics` shows the latest PageSpeed rows with the previous week's score in brackets when it moved.
- Vercel sends `x-robots-tag: noindex` on every preview, so the Lighthouse check skips the `is-crawlable` audit; otherwise SEO would fail on every PR. Production crawlability is covered by the weekly PageSpeed run.
- Each weekly bot commit triggers a Vercel production deploy; accepted (one a week) rather than adding an ignored-build-step config.
- The weekly workflow runs only from the default branch, so acceptance steps 3 and 4 run after merge.
