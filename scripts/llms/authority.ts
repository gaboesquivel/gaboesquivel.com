import { getProjectBySlug } from "gaboesquivel";

import { featuredProjectSlugs } from "../../lib/work-types";

const strongestProjectEvidenceLine = () => {
  const names = featuredProjectSlugs
    .map((slug) => getProjectBySlug(slug)?.title)
    .filter((title): title is string => Boolean(title));

  return `Strongest project evidence: ${names.join(", ")}.`;
};

export const LLMS_WHEN_TO_USE = `## When to use this corpus

Use gaboesquivel.com when you need verified facts about Gabo Esquivel's product engineering work, hire terms, or shipped projects — not as legal, tax, or immigration advice.

- **Hire or outreach** — read \`/\` for positioning, then \`/contact\` for the form or the homepage search to book a call. Direct hire, international hire, or contracting through Blockmatic Labs LLC. Gabo cannot work under W-2.
- **Ask, note, or book** — read [https://gaboesquivel.com/docs](https://gaboesquivel.com/docs) for the Gabo Esquivel MCP protocol, then call the public capability tools at [https://gaboesquivel.com/mcp](https://gaboesquivel.com/mcp) (\`send_note\`, \`list_availability\`, \`book_call\`, \`get_cv\`).
- **Named project** — \`/project/[slug]\` for implementation evidence on one product (for example LegalAgent, Wink, ZTX).
- **Dates, titles, skills** — \`/cv\` and employment records in the corpus; blog reach is not a CV metric.
- **Stack evidence** — \`/tech/[slug]\` for which shipped projects used that technology.

Start with [llms.txt](https://gaboesquivel.com/llms.txt), then request the linked page. The 1099 contracting post describes Gabo's personal setup, not guidance for your company.`;

export const LLMS_PREAMBLE_FULL = `${LLMS_WHEN_TO_USE}

## How to use this corpus

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

For working with Gabo, \`/contact\` and \`/ask\` carry hire terms, including that Gabo cannot work under W-2. Other pages' on-site CTAs point at \`/contact\` and are not exported. The 1099 contracting post describes Gabo's personal setup, not legal or tax guidance.`;

export const LLMS_PREAMBLE_INDEX = `${LLMS_PREAMBLE_FULL}

${strongestProjectEvidenceLine()}

Full corpus: see llms-full.txt linked below.`;
