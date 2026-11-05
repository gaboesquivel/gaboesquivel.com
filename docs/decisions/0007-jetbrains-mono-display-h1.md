# 0007 JetBrains Mono and a larger display h1

Status: accepted

## Context

The site set everything in the system mono stack and capped the page h1 at 52px. The owner wanted a bigger h1 and compared four directions on the real site: system mono scaled up, JetBrains Mono, Geist Mono, and a grotesk h1 over mono body.

## Decision

Load JetBrains Mono through `next/font/google` (400, 600, 700, 800) as `--font-mono`, used site-wide with the system mono stack as fallback. The display h1 (`heroTitle`) becomes `clamp(2.5rem, 7.2vw, 5.25rem)` at weight 800, line height 1.04, tracking `-0.055em`.

## Rationale

- One mono family keeps the identity; a second family (grotesk h1) was rejected.
- JetBrains Mono renders the same on every OS and holds up at 800 weight.
- 84px was chosen after trying 96px (a little too big) and 116px (five lines, pushed the signature and pitch below the first screen).

## Consequences

- Every page h1 grows, because all share `PageTitle` and `heroTitle`.
- One font request is added. `display: swap` avoids invisible text; the fallback stack shows first.
- `/cv` print and the generated OG images are unchanged in intent; CV PDFs and `page-breaks.ts` need regenerating if the new metrics move a break.
