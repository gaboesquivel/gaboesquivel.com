import { projects } from "gaboesquivel";

import { executeTaskFilter } from "./catalog-operation";
import { namedComparisonDimensions } from "./comparison-dimensions";
import type { CompiledExperience } from "./contract/errors";
import { parseStackChildren } from "./contract/stack";
import type { ExperienceName } from "./experience-contract";
import { namedProjectsInText } from "./named-projects";
import type { GenuiProjectDomain } from "./project-domain";
import { resolveTechnology } from "./tech-identity";

export type PlannedTaskKind =
  | "explain"
  | "compare"
  | "projects"
  | "writing"
  | "timeline"
  | "cv"
  | "booking"
  | "contact"
  | "count";

export type TaskPresentation =
  | "concise-fact"
  | "projects"
  | "comparison"
  | "comparison-then-interpretation"
  | "explanation-then-evidence"
  | "timeline"
  | "cv"
  | "writing"
  | "booking"
  | "contact"
  | "primary-with-support";

export interface TaskFilter {
  domains: GenuiProjectDomain[];
  excludeDomains: ("ai" | "web3" | "fintech")[];
  excludeProjectIds: string[];
  excludeTechnologies: string[];
  excludeWeb3Family: boolean;
  limit?: number;
  namedProjectIds: string[];
  technologies: string[];
  types: string[];
  unresolved: string[];
}

export interface PlannedTask {
  ambiguous: string[];
  closedLimitation: boolean;
  completion: string;
  dependsOn: string[];
  evidenceRequirement: string;
  filter: TaskFilter;
  id: string;
  kind: PlannedTaskKind;
  position: number;
  presentation: TaskPresentation;
  purpose: string;
  unsupported: string[];
}

export type TaskCoverageStatus =
  | "completed"
  | "partially-completed"
  | "unsupported"
  | "failed";

export interface TaskCoverage {
  kind: PlannedTaskKind;
  reason: string;
  status: TaskCoverageStatus;
  taskId: string;
}

const projectTypes = new Set(projects.flatMap((project) => project.type));

export const emptyFilter = (): TaskFilter => ({
  domains: [],
  excludeDomains: [],
  excludeProjectIds: [],
  excludeTechnologies: [],
  excludeWeb3Family: false,
  namedProjectIds: [],
  technologies: [],
  types: [],
  unresolved: [],
});

const numberWords: Record<string, number> = {
  five: 5,
  four: 4,
  one: 1,
  six: 6,
  three: 3,
  two: 2,
};

const domainsInText = (text: string): GenuiProjectDomain[] => {
  const found: GenuiProjectDomain[] = [];
  if (/\b(ai|artificial intelligence)\b/i.test(text)) found.push("ai");
  if (/\bweb3\b/i.test(text)) found.push("web3");
  if (/\b(fintech|neobank)\b/i.test(text)) found.push("fintech");
  return found;
};

const limitInText = (text: string) => {
  const digit = text.match(/\b([1-6])\b/);
  if (digit?.[1]) return Number(digit[1]);
  const word = text.toLowerCase().match(/\b(one|two|three|four|five|six)\b/);
  return word?.[1] ? numberWords[word[1]] : undefined;
};

const exclusionTarget = (raw: string) =>
  raw
    .replace(/^(?:your|the|a|an)\s+/i, "")
    .replace(/\s+(?:projects?|work|experience)$/i, "")
    .trim();

const exclusionsInText = (text: string) => {
  const filter = emptyFilter();
  const pattern =
    /\b(?:excluding|except|without|but not|and not|not)\s+([A-Za-z0-9.+#-]{2,}(?:\s+[A-Za-z0-9.+#-]{2,})?)/gi;
  for (const match of text.matchAll(pattern)) {
    const label = exclusionTarget(match[1] ?? "");
    if (!label) continue;
    if (/^(?:blockchain|web3|on-?chain)$/i.test(label)) {
      filter.excludeWeb3Family = true;
      continue;
    }
    const named = namedProjectsInText({ text: label });
    if (named.length === 1 && named[0]) {
      filter.excludeProjectIds.push(`/project/${named[0].slug}`);
      continue;
    }
    const domain = domainsInText(label);
    if (domain.length === 1 && domain[0] && domain[0] !== "all") {
      filter.excludeDomains.push(domain[0]);
      continue;
    }
    const tech = resolveTechnology({ label });
    if (tech.status === "resolved") {
      filter.excludeTechnologies.push(tech.tag);
      continue;
    }
    filter.unresolved.push(label);
  }
  return filter;
};

const technologiesInText = (text: string) => {
  const tags: string[] = [];
  const labels: string[] = [];
  const unresolved: string[] = [];
  const pattern =
    /\b(?:used|using|use|with|mention(?:ing)?)\s+([A-Za-z0-9.+#-]{2,}(?:\.[A-Za-z0-9]+)?)/gi;
  for (const match of text.matchAll(pattern)) {
    const label = match[1] ?? "";
    if (/^(?:blockchain|web3|ai|fintech)$/i.test(label)) {
      labels.push(label);
      continue;
    }
    const resolved = resolveTechnology({ label });
    if (resolved.status === "resolved") {
      tags.push(resolved.tag);
      labels.push(label);
    } else unresolved.push(label);
  }
  return { labels, tags: [...new Set(tags)], unresolved };
};

const typesInText = (text: string) =>
  [...projectTypes].filter(
    (type) =>
      type !== "ai" &&
      type !== "web3" &&
      type !== "featured" &&
      new RegExp(`\\b${type}\\b`, "i").test(text)
  );

const restrictiveRemainder = ({
  clause,
  consumed,
}: {
  clause: string;
  consumed: string[];
}) => {
  const match = clause.match(/\b(?:that|which|who|where|whose)\b\s+(.+)$/i);
  if (!match?.[1]) return [];
  let rest = match[1].toLowerCase();
  for (const token of [
    ...consumed,
    "used",
    "use",
    "using",
    "with",
    "but",
    "not",
    "without",
    "excluding",
    "except",
    "and",
    "or",
    "the",
    "a",
    "an",
    "your",
    "projects",
    "project",
    "ones",
    "only",
    "mention",
    "mentions",
  ]) {
    rest = rest.replace(new RegExp(`\\b${token.toLowerCase()}\\b`, "g"), " ");
  }
  const words = rest
    .split(/[^a-z0-9]+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2);
  return words;
};

/** A request for a personal ranking. */
export const prideClause = /\bproud(?:est)?\b/i;

/** A request for an account of a production incident or problem solved. */
export const incidentClause =
  /\b(production incident|incident you solved|outage|(?:problem|issue|bug) (?:you|i)(?: have| 've)? (?:solved|fixed|debugged)|(?:solved|fixed|debugged) in production|production (?:problem|issue|bug))\b/i;

const startsTask = (text: string) =>
  /^(?:and\s+)?(?:please\s+)?(?:show|list|browse|give|compare|explain|describe|include|add|tell|what|how|count)\b/i.test(
    text.trim()
  ) ||
  /^(?:and\s+)?(?:me\s+)?(?:your\s+)?(?:cv|resume|résumé|timeline)\b/i.test(
    text.trim()
  ) ||
  // Noun-phrase asks ("your proudest work", "a bug you fixed in production").
  prideClause.test(text) ||
  incidentClause.test(text);

const hasTaskSignal = (text: string) =>
  /\b(compare|versus|how many|count|cv|resume|résumé|timeline|career|availability|book|schedule|contact|writing|articles?|blog|posts?|projects?|work|show|list|explain|describe|proud|incident|process)\b/i.test(
    text
  );

const domainTail = (text: string) =>
  /^(?:your\s+)?(?:ai|web3|fintech|blockchain)(?:\s+(?:projects?|work|experience|ones))?$/i.test(
    text.trim()
  );

const splitSequence = (query: string) =>
  query
    .split(/\s*(?:\n|;|\band then\b|\bthen\b)\s*/i)
    .map((part) =>
      part
        .trim()
        .replace(/^,+|,+$/g, "")
        .trim()
    )
    .filter(Boolean);

const splitCommas = (clause: string) => {
  const parts = clause
    .split(/,\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length < 2) return [clause.trim()];
  const groups: string[] = [];
  let current = parts[0] ?? clause;
  for (const part of parts.slice(1)) {
    if (startsTask(part)) {
      groups.push(current);
      current = part.replace(/^and\s+/i, "");
    } else {
      current = `${current}, ${part}`;
    }
  }
  groups.push(current);
  return groups;
};

const splitAnd = (clause: string) => {
  if (/^\s*(compare|contrast)\b/i.test(clause)) return [clause];
  const pieces = clause.split(/\s+\band\s+/i);
  if (pieces.length < 2) return [clause];
  if (pieces.slice(1).every((piece) => domainTail(piece))) return [clause];
  const groups: string[] = [];
  let current = pieces[0] ?? clause;
  for (const piece of pieces.slice(1)) {
    if (startsTask(piece) && hasTaskSignal(current)) {
      groups.push(current);
      current = piece.replace(/^and\s+/i, "");
    } else {
      current = `${current} and ${piece}`;
    }
  }
  groups.push(current);
  return groups;
};

export const requestClauses = (query: string) =>
  splitSequence(query).flatMap((part) =>
    splitCommas(part).flatMap((clause) => splitAnd(clause))
  );

const presentationFor = ({
  kind,
  named,
  domains,
  excluding,
}: {
  domains: GenuiProjectDomain[];
  excluding: boolean;
  kind: PlannedTaskKind;
  named: number;
}): TaskPresentation => {
  if (kind === "count") return "concise-fact";
  if (kind === "compare" && named >= 2) return "comparison";
  if (kind === "compare") return "comparison-then-interpretation";
  if (kind === "explain") return "explanation-then-evidence";
  if (kind === "projects" && excluding) return "primary-with-support";
  if (kind === "projects") return "projects";
  if (kind === "timeline") return "timeline";
  if (kind === "cv") return "cv";
  if (kind === "writing") return "writing";
  if (kind === "booking") return "booking";
  if (kind === "contact") return "contact";
  return domains.length > 1 ? "primary-with-support" : "projects";
};

const classifyClause = ({
  clause,
  inheritedDomains,
  orderedAfter,
}: {
  clause: string;
  inheritedDomains: GenuiProjectDomain[];
  orderedAfter: string | null;
}): Omit<PlannedTask, "id" | "position"> | null => {
  const named = namedProjectsInText({ text: clause });
  let domains = domainsInText(clause);
  const exclusions = exclusionsInText(clause);
  const techs = technologiesInText(clause);
  const types = /\bonly\b/i.test(clause) ? typesInText(clause) : [];
  const limit = limitInText(clause);
  const consumed = [
    ...techs.labels,
    ...techs.tags,
    ...domains,
    ...exclusions.excludeTechnologies,
    ...exclusions.excludeDomains,
    ...(exclusions.excludeWeb3Family ? ["blockchain", "web3", "onchain"] : []),
    ...types,
  ];
  const remainder = restrictiveRemainder({ clause, consumed });
  const unsupported = [
    ...exclusions.unresolved,
    ...techs.unresolved,
    ...(remainder.length ? [remainder.join(" ")] : []),
  ];
  if (
    /\b(relevant|those|matching)\b/i.test(clause) &&
    domains.length === 0 &&
    named.length === 0
  ) {
    domains = inheritedDomains;
  }

  const pride = prideClause.test(clause);
  const incident = incidentClause.test(clause);
  const process =
    /\b(process you follow|how do you develop|how you develop|using agents)\b/i.test(
      clause
    ) ||
    (/\b(process|workflow|method|approach|how (?:do )?you (?:develop|build|ship|work))\b/i.test(
      clause
    ) &&
      /\b(agents?|agentic|ai|llms?)\b/i.test(clause));
  const relate = /\b(?:how it relates|relates to|related to your work)\b/i.test(
    clause
  );
  let kind: PlannedTaskKind | null = null;
  if (/\b(compare|versus|vs\.?)\b/i.test(clause)) kind = "compare";
  else if (/\b(how many|count(?:\s+of)?)\b/i.test(clause)) kind = "count";
  else if (
    /\b(cv|curriculum|curr[ií]culum|r[eé]sum[eé]|resume|résumé)\b/i.test(clause)
  )
    kind = "cv";
  else if (
    /\b(timeline|career story|career chronology|career journey)\b/i.test(clause)
  )
    kind = "timeline";
  else if (/\b(availability|book(?:ing)?|schedule a|schedule)\b/i.test(clause))
    kind = "booking";
  else if (
    /\b(contact form|email form|send (?:me )?a note|how can i contact|work together)\b/i.test(
      clause
    ) ||
    (/\bcontact\b/i.test(clause) && /\bform\b/i.test(clause)) ||
    (/\bcontact\b/i.test(clause) && !/\b(explain|describe|why)\b/i.test(clause))
  )
    kind = "contact";
  else if (/\b(writing|articles?|blog|posts?)\b/i.test(clause) && !relate)
    kind = "writing";
  else if (
    pride ||
    incident ||
    process ||
    relate ||
    /\b(explain|describe|why|how)\b/i.test(clause)
  )
    kind = "explain";
  else if (
    /\b(projects?|work|portfolio|show|list|browse)\b/i.test(clause) ||
    domains.length ||
    named.length ||
    techs.tags.length ||
    types.length
  )
    kind = "projects";
  if (!kind) return null;

  const excluding =
    exclusions.excludeWeb3Family ||
    exclusions.excludeProjectIds.length > 0 ||
    exclusions.excludeTechnologies.length > 0 ||
    exclusions.excludeDomains.length > 0;
  const closedLimitation = pride || incident || process;
  return {
    ambiguous: [],
    closedLimitation,
    completion:
      unsupported.length > 0
        ? "Specific limitation for the unsupported condition, without broadening the catalog"
        : kind === "count"
          ? "Exact published-record count and scope"
          : kind === "compare"
            ? "Supported comparison dimensions for the requested subjects"
            : kind === "cv"
              ? "CV preview and download"
              : "Requested evidence for this task only",
    dependsOn: orderedAfter ? [orderedAfter] : [],
    evidenceRequirement:
      kind === "count"
        ? "Deterministic count over the published portfolio"
        : kind === "explain"
          ? "Documented passages, or an explicit gap when the record is silent"
          : "Canonical records matching this task's filter",
    filter: {
      ...exclusions,
      domains:
        kind === "compare" || kind === "projects" || kind === "count"
          ? domains
          : [],
      limit: kind === "projects" || kind === "writing" ? limit : undefined,
      namedProjectIds:
        kind === "compare" || kind === "projects"
          ? named.map((project) => `/project/${project.slug}`)
          : [],
      technologies: techs.tags,
      types,
      unresolved: [...new Set([...exclusions.unresolved, ...unsupported])],
    },
    kind,
    presentation: presentationFor({
      domains,
      excluding,
      kind,
      named: named.length,
    }),
    purpose: clause,
    unsupported: [...new Set(unsupported)],
  };
};

/** Structural obligations for supported task shapes. Not a claim of open-ended language understanding. */
export const planTasks = (query: string): PlannedTask[] => {
  const clauses = requestClauses(query);
  const tasks: PlannedTask[] = [];
  let inherited: GenuiProjectDomain[] = [];
  let previousId: string | null = null;
  let ordered = false;
  for (const clause of clauses) {
    const sequenced = /\bthen\b/i.test(query) && tasks.length > 0;
    if (sequenced) ordered = true;
    const draft = classifyClause({
      clause,
      inheritedDomains: inherited,
      orderedAfter: ordered ? previousId : null,
    });
    const last = tasks.at(-1);
    // "Compare A and B: role, challenges, and what shipped" splits into
    // dimension clauses; they refine the comparison instead of becoming tasks.
    if (
      last?.kind === "compare" &&
      namedComparisonDimensions(clause).length > 0 &&
      namedProjectsInText({ text: clause }).length === 0 &&
      (!draft || (draft.kind === "explain" && !draft.closedLimitation))
    ) {
      last.purpose = `${last.purpose}, ${clause}`;
      continue;
    }
    if (!draft) continue;
    const position = tasks.length + 1;
    const task = { ...draft, id: `task-${position}`, position };
    tasks.push(task);
    previousId = task.id;
    if (task.filter.domains.length) inherited = task.filter.domains;
  }
  return tasks;
};

const stackChildren = (compiled: CompiledExperience) => {
  const stack =
    compiled.experience === "ExperienceStack"
      ? parseStackChildren(compiled.props.children)
      : null;
  return stack?.ok
    ? stack.children
    : [
        {
          props: compiled.props,
          typeName: compiled.experience as ExperienceName,
        },
      ];
};

const idsOf = (props: Record<string, unknown>, key: string) =>
  Array.isArray(props[key]) ? props[key].map(String) : [];

const bodyOf = (props: Record<string, unknown>) =>
  typeof props.body === "string" ? props.body : "";

/** Structural coverage. Source ids do not prove that a sentence is entailed by its source. */
export const assessTaskCoverage = (
  tasks: PlannedTask[],
  compiled: CompiledExperience
): TaskCoverage[] => {
  const children = stackChildren(compiled);
  const used = new Set<number>();
  const shownProjectIds: string[] = [];
  return tasks.map((task, taskIndex) => {
    const match = children.findIndex((child, index) => {
      if (used.has(index)) return false;
      return childMatches({
        child,
        shownProjectIds,
        task,
      });
    });
    if (match === -1) {
      if (task.unsupported.length || task.filter.unresolved.length) {
        const answerIndex = children.findIndex(
          (child, index) =>
            !used.has(index) &&
            child.typeName === "Answer" &&
            /cannot filter|not a published|do not have a published|have not published/i.test(
              bodyOf(child.props)
            )
        );
        if (answerIndex !== -1) {
          used.add(answerIndex);
          return {
            kind: task.kind,
            reason:
              "Unsupported condition is stated. The underlying question is not answered.",
            status: "unsupported" as const,
            taskId: task.id,
          };
        }
      }
      return {
        kind: task.kind,
        reason:
          "No section satisfies this task's evidence, filter, or presentation.",
        status: "failed" as const,
        taskId: task.id,
      };
    }
    const child = children[match];
    if (!child) {
      return {
        kind: task.kind,
        reason: "Missing section.",
        status: "failed" as const,
        taskId: task.id,
      };
    }
    const previousIndexes = [...used];
    const previousMax = previousIndexes.length
      ? Math.max(...previousIndexes)
      : -1;
    used.add(match);
    if (child.typeName === "ProjectExperience") {
      shownProjectIds.push(...idsOf(child.props, "projectIds"));
    }
    const body = bodyOf(child.props);
    const gap =
      /have not published|do not have a published|not filling it in|not inferring|cannot filter|cannot count|not that account/i.test(
        body
      );
    if (match < previousMax) {
      return {
        kind: task.kind,
        reason: "A later task is represented before an earlier one.",
        status: "partially-completed" as const,
        taskId: task.id,
      };
    }
    if (gap && (task.unsupported.length || task.filter.unresolved.length)) {
      return {
        kind: task.kind,
        reason:
          "Unsupported condition is stated. The underlying question is not answered.",
        status: "unsupported" as const,
        taskId: task.id,
      };
    }
    if (task.kind === "explain" && gap) {
      const impossible =
        task.closedLimitation &&
        (prideClause.test(task.purpose) || incidentClause.test(task.purpose));
      return {
        kind: task.kind,
        reason: impossible
          ? "The published record does not contain this personal or incident claim."
          : "The explanation is incomplete.",
        status: impossible
          ? ("unsupported" as const)
          : ("partially-completed" as const),
        taskId: task.id,
      };
    }
    return {
      kind: task.kind,
      reason:
        "Section matches the task filter and presentation. Structural coverage does not prove factual entailment.",
      status: "completed" as const,
      taskId: task.id,
    };
  });
};

const childMatches = ({
  child,
  shownProjectIds,
  task,
}: {
  child: { props: Record<string, unknown>; typeName: string };
  shownProjectIds: string[];
  task: PlannedTask;
}) => {
  if (task.kind === "cv") return child.typeName === "CVExperience";
  if (task.kind === "timeline") return child.typeName === "TimelineExperience";
  if (task.kind === "booking") return child.typeName === "BookingExperience";
  if (task.kind === "contact") return child.typeName === "ContactExperience";
  if (task.kind === "writing") return child.typeName === "WritingExperience";
  if (task.kind === "explain") {
    return (
      child.typeName === "Answer" &&
      !/could not assemble|could not finish the written explanation/i.test(
        bodyOf(child.props)
      )
    );
  }
  if (task.kind === "count") {
    if (child.typeName !== "Answer") return false;
    const execution = executeTaskFilter({
      filter: task.filter,
      operationType: "count",
    });
    if (execution.blocked) return false;
    return (
      bodyOf(child.props).includes(String(execution.matchedCount)) &&
      /published portfolio/i.test(bodyOf(child.props))
    );
  }
  if (task.kind === "compare" && task.filter.namedProjectIds.length >= 2) {
    if (child.typeName !== "ProjectExperience") return false;
    if (child.props.composite !== "project-comparison") return false;
    const ids = idsOf(child.props, "projectIds");
    const expected = [...task.filter.namedProjectIds].sort();
    return [...ids].sort().join("|") === expected.join("|");
  }
  if (task.kind === "compare") {
    return (
      child.typeName === "Answer" &&
      task.filter.domains.every((domain) =>
        bodyOf(child.props).toLowerCase().includes(domain)
      )
    );
  }
  if (task.kind === "projects") {
    if (child.typeName !== "ProjectExperience") return false;
    if (task.filter.unresolved.length) return false;
    const execution = executeTaskFilter({
      filter: task.filter,
      operationType: "filter",
    });
    if (execution.blocked) return false;
    const ids = idsOf(child.props, "projectIds");
    if (!ids.length) return execution.matchedCount === 0;
    if (ids.some((id) => !execution.matchedIds.includes(id))) return false;
    if (task.filter.limit && ids.length > task.filter.limit) return false;
    const already = new Set(shownProjectIds);
    const available = execution.matchedIds.filter((id) => !already.has(id));
    const expected = available.slice(0, task.filter.limit ?? available.length);
    if (!expected.length) return false;
    return (
      ids.length === expected.length && ids.every((id) => expected.includes(id))
    );
  }
  return false;
};
