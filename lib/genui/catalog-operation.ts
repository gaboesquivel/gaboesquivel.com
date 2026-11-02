import { projects } from "gaboesquivel";
import type { Project } from "gaboesquivel";

import { answerDocument, projectDocument } from "./builders";
import { namedProjectsInText } from "./named-projects";
import { orderBrowseProjects } from "./project-browse";
import { filterProjectsByDomain } from "./project-domain";
import type { GenuiProjectDomain } from "./project-domain";
import { projectToPublicRecord } from "./public-records";
import type { TaskFilter } from "./task-plan";
import {
  resolveTechnology,
  technologyExclusionNote,
  web3TechnologyTags,
} from "./tech-identity";

export const catalogScope =
  "Published portfolio records, not a lifetime total or a count of independently founded products.";

export type CatalogOperationType = "count" | "filter" | "select";

export interface CatalogExecution {
  blocked: boolean;
  displayedCount: number;
  displayedIds: string[];
  domainCounts: { count: number; domain: GenuiProjectDomain }[];
  exclusion: string | null;
  matchedCount: number;
  matchedIds: string[];
  omittedIds: string[];
  operationType: CatalogOperationType;
  projects: Project[];
  scope: string;
  systemOfRecord: "gaboesquivel.projects";
  unresolved: string[];
}

const emptyExecution = ({
  operationType,
  unresolved,
}: {
  operationType: CatalogOperationType;
  unresolved: string[];
}): CatalogExecution => ({
  blocked: unresolved.length > 0,
  displayedCount: 0,
  displayedIds: [],
  domainCounts: [],
  exclusion: null,
  matchedCount: 0,
  matchedIds: [],
  omittedIds: [],
  operationType,
  projects: [],
  scope: catalogScope,
  systemOfRecord: "gaboesquivel.projects",
  unresolved,
});

const metadataKnown = (project: Project) =>
  project.tech.length > 0 || project.type.length > 0;

const matchesWeb3Family = (project: Project) =>
  project.type.includes("web3") ||
  project.tech.some((tag) => web3TechnologyTags.has(tag));

const domainUnion = (domains: GenuiProjectDomain[]) => {
  const bySlug = new Map<string, Project>();
  for (const domain of domains) {
    if (domain === "all") continue;
    for (const project of filterProjectsByDomain({ domain })) {
      bySlug.set(project.slug, project);
    }
  }
  return [...bySlug.values()];
};

export const executeTaskFilter = ({
  filter,
  operationType,
}: {
  filter: TaskFilter;
  operationType: CatalogOperationType;
}): CatalogExecution => {
  if (filter.unresolved.length) {
    return emptyExecution({
      operationType,
      unresolved: filter.unresolved,
    });
  }

  let matched =
    operationType === "select"
      ? filter.namedProjectIds.flatMap((id) => {
          const slug = id.replace(/^\/project\//, "");
          const project = projects.find((item) => item.slug === slug);
          return project ? [project] : [];
        })
      : filter.domains.length
        ? domainUnion(filter.domains)
        : [...projects];
  if (operationType !== "select" && filter.namedProjectIds.length) {
    matched = matched.filter((project) =>
      filter.namedProjectIds.includes(`/project/${project.slug}`)
    );
  }

  if (filter.types.length) {
    matched = matched.filter((project) =>
      filter.types.every((type) => project.type.includes(type))
    );
  }
  if (filter.technologies.length) {
    matched = matched.filter((project) =>
      filter.technologies.every((tag) =>
        project.tech.some((item) => item === tag)
      )
    );
  }

  const excluding =
    filter.excludeDomains.length > 0 ||
    filter.excludeTechnologies.length > 0 ||
    filter.excludeProjectIds.length > 0 ||
    filter.excludeWeb3Family;
  if (excluding) {
    matched = matched.filter((project) => {
      if (!metadataKnown(project)) return false;
      if (filter.excludeProjectIds.includes(`/project/${project.slug}`)) {
        return false;
      }
      if (
        filter.excludeDomains.some((domain) => project.type.includes(domain))
      ) {
        return false;
      }
      if (filter.excludeWeb3Family && matchesWeb3Family(project)) return false;
      if (
        filter.excludeTechnologies.some((tag) =>
          project.tech.some((item) => item === tag)
        )
      ) {
        return false;
      }
      return true;
    });
  }

  const unique = [
    ...new Map(matched.map((project) => [project.slug, project])).values(),
  ];
  const namedFirst = [
    ...unique.filter((project) =>
      filter.namedProjectIds.includes(`/project/${project.slug}`)
    ),
    ...unique.filter(
      (project) => !filter.namedProjectIds.includes(`/project/${project.slug}`)
    ),
  ];
  const ordered =
    filter.domains.length === 1
      ? orderBrowseProjects({
          domain: filter.domains[0] ?? "all",
          projects: namedFirst,
        })
      : namedFirst;
  const balanced =
    filter.domains.length > 1 && filter.limit && operationType !== "count"
      ? [
          ...filter.domains.flatMap((domain) => {
            const next = orderBrowseProjects({
              domain,
              projects: filterProjectsByDomain({ domain }),
            }).find((project) =>
              ordered.some((item) => item.slug === project.slug)
            );
            return next ? [next] : [];
          }),
          ...ordered,
        ]
      : ordered;
  const balancedUnique = [
    ...new Map(balanced.map((project) => [project.slug, project])).values(),
  ];
  const limited =
    operationType === "count"
      ? ordered
      : balancedUnique.slice(0, filter.limit ?? balancedUnique.length);
  const matchedIds = ordered.map((project) => `/project/${project.slug}`);
  const displayedIds =
    operationType === "count"
      ? matchedIds
      : limited.map((project) => `/project/${project.slug}`);

  return {
    blocked: false,
    displayedCount: operationType === "count" ? ordered.length : limited.length,
    displayedIds,
    domainCounts: filter.domains.map((domain) => ({
      count: filterProjectsByDomain({ domain }).length,
      domain,
    })),
    exclusion: excluding ? technologyExclusionNote : null,
    matchedCount: ordered.length,
    matchedIds,
    omittedIds: matchedIds.filter((id) => !displayedIds.includes(id)),
    operationType,
    projects: operationType === "count" ? [] : limited,
    scope: catalogScope,
    systemOfRecord: "gaboesquivel.projects",
    unresolved: [],
  };
};

const countPattern =
  /^(?:how many|count(?: all)?(?: of)?) (?:of )?(?:your )?(?:(ai|web3|fintech) )?projects(?: (?:have you (?:built|build|shipped)|are (?:there|published)|in (?:your|the) (?:portfolio|catalog)))?[.!?]?$/i;

const filterPattern =
  /^(?:show|list|which)(?: me)?(?: your| the)? projects (?:that |have |used |use |using |with )?(react|typescript|next\.js)(?: (?:but )?(?:not|without|excluding) (blockchain|web3))?[.!?]?$/i;

/** Closed grammar retained as an explicit fast path. Anything else stays unresolved. */
export const parseCatalogOperation = (query: string) => {
  const count = query.trim().match(countPattern);
  if (count) {
    return {
      domain: (count[1]?.toLowerCase() ?? "all") as
        | "all"
        | "ai"
        | "web3"
        | "fintech",
      kind: "count" as const,
    };
  }
  const filtered = query.trim().match(filterPattern);
  if (!filtered?.[1]) return null;
  return {
    excludeWeb3: Boolean(filtered[2]),
    kind: "filter" as const,
    technology: filtered[1].toLowerCase(),
  };
};

const noFilter: TaskFilter = {
  domains: [],
  excludeDomains: [],
  excludeProjectIds: [],
  excludeTechnologies: [],
  excludeWeb3Family: false,
  namedProjectIds: [],
  technologies: [],
  types: [],
  unresolved: [],
};

export const executeCatalogOperation = (query: string) => {
  const operation = parseCatalogOperation(query);
  if (!operation) return null;
  if (operation.kind === "count" && operation.domain === "all") {
    const execution = executeTaskFilter({
      filter: noFilter,
      operationType: "count",
    });
    return {
      count: execution.matchedCount,
      execution,
      operation,
      records: projects.map(projectToPublicRecord),
      scope: catalogScope,
    };
  }
  if (operation.kind === "count") {
    const execution = executeTaskFilter({
      filter: {
        ...noFilter,
        domains: [operation.domain === "all" ? "ai" : operation.domain],
      },
      operationType: "count",
    });
    return {
      count: execution.matchedCount,
      execution,
      operation,
      records: execution.matchedIds.flatMap((id) => {
        const project = projects.find((item) => `/project/${item.slug}` === id);
        return project ? [projectToPublicRecord(project)] : [];
      }),
      scope: catalogScope,
    };
  }
  const resolved = resolveTechnology({ label: operation.technology });
  if (resolved.status !== "resolved") return null;
  const execution = executeTaskFilter({
    filter: {
      ...noFilter,
      excludeWeb3Family: operation.excludeWeb3,
      technologies: [resolved.tag],
    },
    operationType: "filter",
  });
  return {
    count: execution.matchedCount,
    execution,
    operation,
    records: execution.projects.map(projectToPublicRecord),
    scope: catalogScope,
  };
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
  const named = namedProjectsInText({ text: query });
  return answerDocument({
    body: `${result.count} published portfolio records match this request. ${catalogScope}`,
    records: result.operation.kind === "count" ? [] : result.records,
    requestId,
    sourceIds: named.map((project) => `/project/${project.slug}`),
  });
};
