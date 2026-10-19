import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { openApiDocument } from "../lib/api/openapi";
import { siteProfile } from "../lib/api/profile";
import { listPublishedPagePaths } from "../lib/api/published-page-paths";
import {
  buildAgentIndex,
  cvOverviewMarkdown,
  employmentRecords,
} from "./llms/agent-index";
import { getLlmsFull, getLlmsIndex } from "./llms/corpus";
import { estimateTokens } from "./llms/format";
import { buildMarkdownCorpus } from "./llms/markdown-corpus";

const PUBLIC_DIR = join(import.meta.dir, "../public");
const GENERATED_DIR = join(import.meta.dir, "../generated");
const INDEX_TOKEN_BUDGET = 8000;

const llmsIndex = getLlmsIndex();
const llmsFull = getLlmsFull();
const markdownCorpus = buildMarkdownCorpus();

for (const entry of employmentRecords()) {
  markdownCorpus[entry.bodyKey] = entry.markdown;
}

markdownCorpus["#cv/overview"] = cvOverviewMarkdown();

const agentIndex = buildAgentIndex();

const GENERATED_API_DIR = join(GENERATED_DIR, "api");

mkdirSync(PUBLIC_DIR, { recursive: true });
mkdirSync(GENERATED_DIR, { recursive: true });
mkdirSync(GENERATED_API_DIR, { recursive: true });

const indexPath = join(PUBLIC_DIR, "llms.txt");
const fullPath = join(PUBLIC_DIR, "llms-full.txt");

writeFileSync(indexPath, llmsIndex, "utf-8");
writeFileSync(fullPath, llmsFull, "utf-8");
writeFileSync(
  join(GENERATED_DIR, "markdown-routes.json"),
  JSON.stringify(markdownCorpus),
  "utf-8"
);
writeFileSync(
  join(GENERATED_DIR, "agent-index.json"),
  JSON.stringify(agentIndex),
  "utf-8"
);

const openapiPath = join(PUBLIC_DIR, "openapi.json");
const profilePath = join(GENERATED_API_DIR, "profile.json");
const pagesPath = join(GENERATED_API_DIR, "pages.json");

writeFileSync(
  openapiPath,
  `${JSON.stringify(openApiDocument(), null, 2)}\n`,
  "utf-8"
);
writeFileSync(
  profilePath,
  `${JSON.stringify(siteProfile(), null, 2)}\n`,
  "utf-8"
);
writeFileSync(
  pagesPath,
  `${JSON.stringify({ paths: listPublishedPagePaths() }, null, 2)}\n`,
  "utf-8"
);

const indexTokens = estimateTokens(llmsIndex);

console.log(`Wrote ${indexPath} (${llmsIndex.length} bytes)`);
console.log(`Wrote ${fullPath} (${llmsFull.length} bytes)`);
console.log(
  `Wrote ${join(GENERATED_DIR, "markdown-routes.json")} (${Object.keys(markdownCorpus).length} routes)`
);
console.log(`Wrote ${openapiPath}`);
console.log(`Wrote ${profilePath}`);
console.log(`Wrote ${pagesPath}`);
console.log(
  `Estimated tokens — index: ~${indexTokens}, full: ~${estimateTokens(llmsFull)}`
);

if (indexTokens > INDEX_TOKEN_BUDGET) {
  console.warn(
    `Warning: llms.txt exceeds token budget (~${INDEX_TOKEN_BUDGET}): ~${indexTokens}`
  );
}
