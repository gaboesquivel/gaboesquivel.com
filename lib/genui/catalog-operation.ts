import { projects } from "gaboesquivel";

import { answerDocument, projectDocument } from "./builders";
import { filterProjectsByDomain } from "./project-domain";
import { projectToPublicRecord } from "./public-records";

export const catalogScope =
  "Published portfolio records, not a lifetime total or a count of independently founded products.";

/** Deliberately closed grammar: unsupported predicates must reach synthesis. */
export const parseCatalogOperation = (query: string) => {
  const count = query
    .trim()
    .match(
      /^(?:how many|count(?: all)?(?: of)?) (?:of )?(?:your )?(?:(ai|web3|fintech) )?projects(?: (?:have you (?:built|build|shipped)|are (?:there|published)|in (?:your|the) (?:portfolio|catalog)))?[.!?]?$/i
    );
  if (count)
    return {
      kind: "count" as const,
      domain: (count[1]?.toLowerCase() ?? "all") as
        | "all"
        | "ai"
        | "web3"
        | "fintech",
    };
  const filtered = query
    .trim()
    .match(
      /^(?:show|list|which)(?: me)?(?: your| the)? projects (?:that |have |used |use |using |with )?(react|typescript|next\.js)(?: (?:but )?(?:not|without|excluding) (blockchain|web3))?[.!?]?$/i
    );
  if (!filtered?.[1]) return null;
  return {
    kind: "filter" as const,
    technology: filtered[1].toLowerCase(),
    excludeWeb3: Boolean(filtered[2]),
  };
};

export const executeCatalogOperation = (query: string) => {
  const operation = parseCatalogOperation(query);
  if (!operation) return null;
  const matched =
    operation.kind === "count"
      ? filterProjectsByDomain({ domain: operation.domain })
      : projects.filter(
          (project) =>
            project.tech.some(
              (tech) => tech.toLowerCase() === operation.technology
            ) &&
            (!operation.excludeWeb3 || !project.type.includes("web3"))
        );
  const records = [
    ...new Map(matched.map((project) => [project.slug, project])).values(),
  ].map(projectToPublicRecord);
  return { operation, scope: catalogScope, count: records.length, records };
};

export const catalogOperationDocument = ({
  query,
  requestId,
}: {
  query: string;
  requestId: string;
}) => {
  const result = executeCatalogOperation(query);
  if (!result) return null;
  if (result.operation.kind === "filter" && result.records.length) {
    return projectDocument({
      composite: "project-compact-list",
      projectIds: result.records.map(({ id }) => id),
      records: result.records,
      requestId,
    });
  }
  return answerDocument({
    body: `${result.count} published portfolio records match this request. ${catalogScope}`,
    records: result.records,
    sourceIds: result.records.map(({ id }) => id),
    requestId,
  });
};
