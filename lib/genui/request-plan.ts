import { projects } from "gaboesquivel";
import { siteOrigin } from "lib/site-path";

import { executeCatalogOperation } from "./catalog-operation";
import { composeSearchSections } from "./compose-search";
import type { PublicRecord } from "./envelope";
import { cvPublicRecord, projectToPublicRecord } from "./public-records";
import { sectionToRecord } from "./search-records";
import { planTasks } from "./task-plan";

/** Routing hints only. The original request remains authoritative for synthesis. */
export const buildRequestPlan = (query: string) => {
  const normalized = query.toLowerCase();
  const clauses = query
    .split(/(?:;|\n|\s+(?:and then|also|plus)\s+)/i)
    .map((clause) => clause.trim())
    .filter(Boolean);
  const namedProjectIds = projects
    .filter((project) =>
      [project.title, project.slug, ...(project.aliases ?? [])].some((name) =>
        normalized.includes(name.toLowerCase())
      )
    )
    .map((project) => `/project/${project.slug}`);
  const supportedTypeScriptFilter =
    /\btypescript\b/i.test(query) &&
    /\bonly\b/i.test(query) &&
    /\bprojects?\b/i.test(query) &&
    namedProjectIds.length === 0 &&
    !/\b(excluding|except|without|and|also|plus|then|compare|explain|describe|count|how many)\b/i.test(
      query
    );
  const requiresSynthesis =
    !supportedTypeScriptFilter &&
    (/\b(compare|versus|why|how many|count|proud|problem|challenge|production incident|process|contribution|contributed|explain|describe|fit|excluding|except|without|only|at least|at most|no more than)\b/i.test(
      query
    ) ||
      (/\b(and|also|plus|then)\b/i.test(query) &&
        /\b(explain|describe|contribution)\b/i.test(query)));
  return {
    query,
    clauses,
    namedProjectIds,
    requiresSynthesis,
    tasks: planTasks(query),
    catalogOperation: executeCatalogOperation(query),
    constraints: clauses.filter((clause) =>
      /\b(only|excluding|except|without|at least|at most|no more than)\b/i.test(
        clause
      )
    ),
    originalRequestAuthoritative: true as const,
  };
};

export type RequestPlan = ReturnType<typeof buildRequestPlan>;

/** Named entities first, then per-clause retrieval, so a broad match cannot evict them. */
export const retrievePlanEvidence = (plan: RequestPlan): PublicRecord[] => {
  const named = projects
    .filter((project) =>
      plan.namedProjectIds.includes(`/project/${project.slug}`)
    )
    .map(projectToPublicRecord);
  const cv = /\b(cv|résumé|resume)\b/i.test(plan.query)
    ? [cvPublicRecord()]
    : [];
  const contact: PublicRecord[] = plan.tasks.some(
    (task) => task.kind === "contact"
  )
    ? [
        {
          id: "/contact",
          kind: "profile",
          title: "Contact",
          url: `${siteOrigin}/contact`,
        },
      ]
    : [];
  const searched = [...new Set([plan.query, ...plan.clauses])].flatMap(
    (query) =>
      composeSearchSections({ limit: 6, query }).flatMap((section) => {
        const record = sectionToRecord(section);
        return record ? [record] : [];
      })
  );
  return [
    ...new Map(
      [...named, ...cv, ...contact, ...searched].map((record) => [
        record.id,
        record,
      ])
    ).values(),
  ].slice(0, 12);
};
