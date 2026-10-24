import { domainFromQuery } from "./domain-from-query";
import { normalizeGenuiQuery } from "./normalize-query";
import type { GenuiProjectDomain } from "./project-domain";
import {
  wantsArchitectureIntent,
  wantsBooking,
  wantsCareerTimeline,
  wantsContactForm,
  wantsCv,
  wantsEngagement,
  wantsWritingBrowse,
  wantsBrowseProjects,
} from "./task-intent";
import { writingCategoryFromText } from "./writing-category";

export type ComposeSection =
  | { type: "projects"; domain: GenuiProjectDomain }
  | { type: "timeline" }
  | { type: "writing"; category: "ai" | "web3" | null }
  | { type: "cv" }
  | { type: "engagement" }
  | { type: "booking" }
  | { type: "contact" }
  | { type: "explain-experience" };

const splitClauses = (query: string) => {
  const parts = query
    .split(/\s+(?:and|then|plus)\s+|,\s*/i)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 1 ? parts : [query];
};

const classifyClause = (clause: string): ComposeSection[] => {
  if (wantsArchitectureIntent(clause)) return [];
  if (/\bquantum computing\b/i.test(clause)) return [];
  if (
    /\b(experience building|explain your experience|what is your experience)\b/i.test(
      clause
    )
  ) {
    return [{ type: "explain-experience" }];
  }
  const sections: ComposeSection[] = [];
  if (wantsEngagement(clause)) sections.push({ type: "engagement" });
  if (wantsCareerTimeline(clause)) sections.push({ type: "timeline" });
  if (wantsCv(clause)) sections.push({ type: "cv" });
  if (
    wantsBooking(clause) ||
    /\b(availability and booking|booking options)\b/i.test(clause)
  ) {
    sections.push({ type: "booking" });
  }
  if (wantsContactForm(clause)) {
    sections.push({ type: "contact" });
  }
  if (
    wantsWritingBrowse(clause) &&
    /\b(writing|article|articles|blog|post|posts|publication)\b/i.test(clause)
  ) {
    return [
      {
        type: "writing",
        category: writingCategoryFromText(clause),
      },
    ];
  }
  if (/\bdiscuss a project\b/i.test(clause)) {
    return sections;
  }
  const domain = domainFromQuery(clause);
  if (
    wantsBrowseProjects(clause) ||
    (domain && /\b(show|see|browse|list|explore|your|all)\b/i.test(clause)) ||
    /\b(explore my work|what should i look at first)\b/i.test(
      normalizeGenuiQuery(clause)
    )
  ) {
    sections.push({
      type: "projects",
      domain: domain ?? "all",
    });
  }
  return sections;
};

const dedupeSections = (sections: ComposeSection[]) => {
  const seen = new Set<string>();
  return sections.filter((section) => {
    const key = JSON.stringify(section);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const parseComposeSections = (query: string): ComposeSection[] => {
  const clauses = splitClauses(query);
  const sections = dedupeSections(clauses.flatMap(classifyClause));
  return sections;
};

export const isCompoundComposeQuery = (query: string) =>
  parseComposeSections(query).length > 1;
