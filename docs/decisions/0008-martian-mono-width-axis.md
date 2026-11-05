# 0008 Martian Mono and the width axis

Status: accepted

## Context

JetBrains Mono ([0007](0007-jetbrains-mono-display-h1.md)) is clean but reads as a default editor face. The owner asked for a sharper coder-cyber feel and shared four portfolio references (christendijoux.com, yutaabe.com, dakshgajjar.com, fabiantjoeaon.com). Measured in the browser, they pair a mono for data and chrome (Geist Mono, IBM Plex Mono, Space Mono) with one loud display voice (Big Shoulders Display, Archivo, Space Mono at 110px with tight tracking, Syne). The site rule is no all-caps eyebrows, so those references' tiny uppercase labels were not borrowed.

## Decision

Replace JetBrains Mono with Martian Mono through `next/font/google`, loading the variable weight and `wdth` axes as `--font-mono`; body runs at `font-stretch: 90%`. Add Big Shoulders (variable, `--font-display`) for page h1s only: `heroTitle` at 800, `clamp(3.25rem, 10.5vw, 7.5rem)`, line height 0.9, and `pageTitle` at 700, `text-4xl`/`sm:text-5xl`. The nav drops to `text-sm` below `sm` so six links stay on one row.

## Rationale

- Martian Mono's mechanical letterforms read as terminal output, not an editor default.
- A mono h1 felt wrong to the owner. Five options were compared on a static page (Martian Mono condensed, Big Shoulders, Archivo condensed, Space Grotesk, Syne); Big Shoulders won as the tall industrial contrast to a wide mono body, as in the references.
- Restricting the display face to h1s keeps the mono identity everywhere else and adds one font request.

## Consequences

- Every page h1 changes metrics; CV print inherits the family, so CV PDFs and `app/cv/page-breaks.ts` need regenerating with `bun run cvs`.
- This reverses the one-family rule from 0007.
- Martian Mono is wider than JetBrains Mono at the same size; body is narrowed with the width axis rather than shrinking the size.
- The generated OG images use their own font handling and were not changed.
