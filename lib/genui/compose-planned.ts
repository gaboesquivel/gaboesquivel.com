import type { Project } from "gaboesquivel";
import { siteOrigin } from "lib/site-path";

import {
  answerDocument,
  bookingDocument,
  childExpressionsFromOpenUi,
  contactDocument,
  cvDocument,
  limitationDocument,
  projectDocument,
  stackDocument,
  timelineDocument,
  writingDocument,
} from "./builders";
import { catalogScope, executeTaskFilter } from "./catalog-operation";
import type { CatalogExecution } from "./catalog-operation";
import {
  comparisonDimensionLabel,
  comparisonDimensionsInText,
} from "./comparison-dimensions";
import { componentSemantics } from "./component-semantics";
import { postRecord, profileRecord, publishedPosts } from "./content-records";
import type { CompositionEnvelope, PublicRecord } from "./envelope";
import { cvPublicRecord, projectToPublicRecord } from "./public-records";
import { selectProjectComposition } from "./select-project-composition";
import { incidentClause, prideClause } from "./task-plan";
import type { PlannedTask } from "./task-plan";
import { validateCompositionEnvelope } from "./validate-envelope";
import { writingForTopic } from "./writing-topic";

interface PlannedComposition {
  envelope: CompositionEnvelope;
  executions: CatalogExecution[];
}

const compositeFor = (list: Project[]) =>
  list.length > 8
    ? ("project-compact-list" as const)
    : selectProjectComposition({
        intent: "browse-projects",
        projects: list,
      });

interface TaskDocuments {
  documents: CompositionEnvelope[];
  execution: CatalogExecution | null;
}

const single = (
  document: CompositionEnvelope,
  execution: CatalogExecution | null = null
): TaskDocuments => ({ documents: [document], execution });

const taskDocuments = ({
  requestId,
  task,
}: {
  requestId: string;
  task: PlannedTask;
}): TaskDocuments => {
  const limit = (body: string, execution: CatalogExecution | null = null) =>
    single(limitationDocument(body, requestId), execution);

  if (task.kind === "count") {
    const execution = executeTaskFilter({
      filter: task.filter,
      operationType: "count",
    });
    if (execution.blocked) {
      return limit(
        "I cannot count that condition against the published catalog, so I am not substituting the full portfolio.",
        execution
      );
    }
    const slice = task.filter.domains.length
      ? ` in the ${task.filter.domains.join(" and ")} slice`
      : "";
    const work = profileRecord({
      id: "/work",
      title: "Browse all work",
      url: `${siteOrigin}/work`,
    });
    return single(
      answerDocument({
        body: `The published portfolio documents ${execution.matchedCount} projects${slice}. That is what this site records, not a lifetime total or a count of independently founded products.`,
        records: [work],
        requestId,
        sourceIds: [work.id],
      }),
      execution
    );
  }

  if (task.kind === "projects" || task.kind === "compare") {
    const execution = executeTaskFilter({
      filter: task.filter,
      operationType:
        task.kind === "compare" && task.filter.namedProjectIds.length >= 2
          ? "select"
          : "filter",
    });
    if (task.filter.unresolved.length || execution.blocked) {
      return limit(
        "I cannot filter the catalog by that condition, so I am not showing an unfiltered list in its place.",
        execution
      );
    }
    if (
      task.kind === "compare" &&
      task.filter.namedProjectIds.length >= 2 &&
      execution.projects.length >= 2 &&
      execution.projects.length <= 3
    ) {
      const records = execution.projects.map(projectToPublicRecord);
      const dimensions = comparisonDimensionsInText(task.purpose);
      const labels = dimensions.map((dimension) =>
        comparisonDimensionLabel(dimension).toLowerCase()
      );
      const listed =
        labels.length > 2
          ? `${labels.slice(0, -1).join(", ")}, and ${labels.at(-1)}`
          : labels.join(" and ");
      const challengeNote = /\bchallenges?\b/i.test(task.purpose)
        ? " Challenges are not recorded as a separate field, so the technical work row quotes each case study."
        : "";
      return {
        documents: [
          answerDocument({
            body: `${execution.projects.map((project) => project.title).join(" and ")} side by side: ${listed}, from each published project record.${challengeNote} A missing field reads “Not recorded”.`,
            records,
            requestId,
            sourceIds: records.map((record) => record.id),
          }),
          projectDocument({
            composite: "project-comparison",
            dimensions,
            projectIds: records.map((record) => record.id),
            records,
            requestId,
          }),
        ],
        execution,
      };
    }
    if (task.kind === "compare" && task.filter.domains.length >= 2) {
      const counts = execution.domainCounts
        .map(
          (entry) =>
            `${entry.domain}: ${entry.count} published portfolio records`
        )
        .join(". ");
      return limit(
        `This compares published catalog slices, not a ranking. ${counts}. ${catalogScope}`,
        execution
      );
    }
    if (task.kind === "compare") {
      return limit(
        "I can compare two or three published projects when those names resolve, or two catalog slices such as AI and fintech. I am not widening this to the whole portfolio.",
        execution
      );
    }
    if (!execution.projects.length) {
      return limit(
        `0 published portfolio records match this request. ${catalogScope}`,
        execution
      );
    }
    const records = execution.projects.map(projectToPublicRecord);
    const project = projectDocument({
      composite: compositeFor(execution.projects),
      domain:
        task.filter.domains.length === 1 &&
        (task.filter.domains[0] === "ai" || task.filter.domains[0] === "web3")
          ? task.filter.domains[0]
          : undefined,
      projectIds: records.map((record) => record.id),
      records,
      requestId,
    });
    const note = execution.exclusion
      ? answerDocument({
          body: execution.exclusion,
          records,
          requestId,
          sourceIds: records.slice(0, 3).map((record) => record.id),
        })
      : null;
    return {
      documents: note ? [note, project] : [project],
      execution,
    };
  }

  if (task.kind === "cv") {
    return single(cvDocument({ record: cvPublicRecord(), requestId }));
  }
  if (task.kind === "timeline") {
    return single(timelineDocument({ requestId }));
  }
  if (task.kind === "booking") {
    return single(
      bookingDocument({
        records: [
          profileRecord({
            title: "Book a call",
            url: `${siteOrigin}/contact`,
          }),
        ],
        requestId,
      })
    );
  }
  if (task.kind === "contact") {
    return single(
      contactDocument({
        records: [
          profileRecord({
            id: "/contact",
            title: "Contact",
            url: `${siteOrigin}/contact`,
          }),
        ],
        requestId,
      })
    );
  }
  if (task.kind === "writing") {
    const posts = publishedPosts()
      .filter((post) =>
        task.filter.domains.length
          ? task.filter.domains.some((domain) =>
              (post.category ?? []).some(
                (item) => item.toLowerCase() === domain
              )
            )
          : true
      )
      .slice(0, task.filter.limit ?? 4);
    if (!posts.length) {
      return limit("No published post matches that request.");
    }
    const records = posts.map(postRecord);
    return single(
      writingDocument({
        composite: "dated-row",
        postIds: records.map((record) => record.id),
        records,
        requestId,
      })
    );
  }

  if (task.closedLimitation && prideClause.test(task.purpose)) {
    return limit(
      "I have not published a ranking of what I am most proud of. Featured placement is an editorial choice, and I am not treating it as a personal ranking."
    );
  }
  if (task.closedLimitation && incidentClause.test(task.purpose)) {
    return limit(
      "I have not published an account of a specific production problem and how I solved it, so I am not reconstructing one from a project title. The case studies on /work describe what each project shipped."
    );
  }
  if (task.closedLimitation && /process|agents/i.test(task.purpose)) {
    // Process questions rank process writing first.
    const posts = writingForTopic(`${task.purpose} process`);
    const lead = posts[0];
    if (!lead) {
      return limit(
        "I have not published a general method for developing applications with agents."
      );
    }
    const records = posts.map(postRecord);
    return {
      documents: [
        answerDocument({
          body: `My published writing is the closest account of that process. ${lead.title}: ${lead.summary?.trim() ?? ""}`.trim(),
          records,
          requestId,
          sourceIds: [records[0]?.id ?? ""].filter(Boolean),
        }),
        writingDocument({
          composite: "dated-row",
          postIds: records.map((record) => record.id),
          records,
          requestId,
        }),
      ],
      execution: null,
    };
  }
  if (/\brelat/i.test(task.purpose)) {
    return limit(
      "I am not inferring how this writing relates to shipped work from a title or a shared topic. Where a post does not state that connection, I leave it unstated."
    );
  }
  return limit(
    "I do not have a published passage that answers that directly, so I am not filling it in."
  );
};

const dedupeProjectExpressions = (documents: CompositionEnvelope[]) => {
  const seen = new Set<string>();
  return documents.flatMap((document) => {
    const expressions = childExpressionsFromOpenUi(document.openuiText);
    const projectExpression = expressions.find((expression) =>
      expression.startsWith("ProjectExperience")
    );
    if (!projectExpression) return [document];
    const ids = [...projectExpression.matchAll(/"(\/project\/[^"]+)"/g)].map(
      (match) => match[1] ?? ""
    );
    const fresh = ids.filter((id) => id && !seen.has(id));
    for (const id of ids) seen.add(id);
    if (fresh.length === ids.length) return [document];
    if (!fresh.length) return [];
    const records = document.records.filter((record) =>
      fresh.includes(record.id)
    );
    return [
      projectDocument({
        composite: "project-compact-list",
        projectIds: fresh,
        records,
        requestId: document.requestId,
      }),
    ];
  });
};

export const composePlannedDocument = ({
  requestId,
  tasks,
}: {
  requestId: string;
  tasks: PlannedTask[];
}): PlannedComposition | null => {
  if (!tasks.length) return null;
  const rendered = tasks.map((task) => taskDocuments({ requestId, task }));
  const documents = dedupeProjectExpressions(
    rendered.flatMap((item) => item.documents)
  ).filter(
    (document) => validateCompositionEnvelope({ envelope: document }).ok
  );
  if (!documents.length) return null;
  const records = [
    ...new Map(
      documents
        .flatMap((document) => document.records)
        .map((record) => [record.id, record])
    ).values(),
  ] satisfies PublicRecord[];
  const expressions = documents.flatMap((document) =>
    childExpressionsFromOpenUi(document.openuiText)
  );
  const envelope =
    expressions.length === 1
      ? {
          ...documents[0],
          records,
          requestId,
        }
      : stackDocument({
          childExpressions: expressions.slice(
            0,
            componentSemantics.ExperienceStack.cardinality.max
          ),
          fallbackText: documents[0]?.fallbackText ?? "Results",
          records,
          requestId,
        });
  if (!validateCompositionEnvelope({ envelope }).ok) {
    return {
      envelope: limitationDocument(
        "I could not assemble the complete response.",
        requestId
      ),
      executions: [],
    };
  }
  return {
    envelope,
    executions: rendered.flatMap((item) =>
      item.execution ? [item.execution] : []
    ),
  };
};
