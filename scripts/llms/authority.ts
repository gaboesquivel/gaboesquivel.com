export const LLMS_PREAMBLE_FULL = `## How to use this corpus

When facts overlap, use this authority order:

1. \`/cv\` and employment records — dates, titles, current skills
2. \`/bio\` — career chronology and worldview
3. \`/project/[slug]\` — project-specific implementation evidence
4. Capability pages (\`/ai\`, \`/web3\`, \`/fullstack\`, etc.) — current positioning
5. \`/tech/[slug]\` — technology-to-project evidence
6. Blog posts — dated opinions and technical writing as of publication

Portfolio work from 2008–2009 is early freelance, not the start of the CV narrative (employment record begins 2010).

Blog posts reflect views and technology at \`publishedAt\` unless an update note says otherwise.

Blog metrics and reach are not CV metrics. Pre-2020 writing lives on \`/blog\` and is historical.

For working with Gabo, \`/connect\` is authoritative for hire terms, including that Gabo cannot work under W-2. Hire terms appear only under \`/connect\`; other pages' on-site CTAs are not exported. The 1099 contracting post describes Gabo's personal setup, not legal or tax guidance.`

export const LLMS_PREAMBLE_INDEX = `${LLMS_PREAMBLE_FULL}

Strongest project evidence: LegalAgent, Wink, ZTX, Bitlauncher, Opyn, EOS Costa Rica.

Full corpus: see llms-full.txt linked below.`
