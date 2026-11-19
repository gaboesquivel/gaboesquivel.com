# 0009: Free analytics stack

Status: Proposed (2026-11-19)

## Context

The primary metric is contact actions per month ([PRODUCT.md](../../PRODUCT.md), Measurement), and measurement must cost nothing. Vercel Web Analytics on Hobby has no custom events and only one month of reporting. Target visitors are in the US and Latin America, with some EEA traffic.

## Decision

- **Umami Cloud (free Hobby plan):** counts contact actions as server-side events, and covers client-side engagement.
- **Upstash Redis counters:** mirror those events, so the owner dashboard can read them (Umami's free plan has no API).
- **Microsoft Clarity:** recordings and heatmaps, cookieless for EEA, UK and CH visitors unless they opt in.
- **Vercel Web Analytics and Speed Insights:** kept for traffic and real-user speed.

## Alternatives considered

- **Google Analytics 4:** about 158 KB of script, cookies and consent, and it adds nothing the stack above lacks.
- **PostHog Cloud free:** capable, but about 124 KB and cookies by default.
- **Cloudflare Web Analytics:** no custom events.
- **Self-hosted Umami or Plausible CE:** free software, but no free host fits ClickHouse's memory needs, and it adds operations work.
- **Vercel custom events:** Pro only.

## Consequences

- Contact actions live in two places, Umami and Redis. Redis is the dashboard's source, Umami the place to explore.
- **Plan limits:** Umami's free plan allows one site and 100k events a month. If scroll events push it near that cap, cut them first.
- `/privacy` must disclose Umami, Clarity and Vercel Analytics.
- Moving off Umami later means replacing one recording module ([spec 005](../specs/005-contact-measurement.md)), not every call site.
