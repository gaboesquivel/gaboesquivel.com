import {
  answerDocument,
  childExpressionsFromOpenUi,
  stackDocument,
} from "./builders";
import { composePlannedDocument } from "./compose-planned";
import { GENUI_MAX_STACK_CHILDREN } from "./contract/catalog";
import type { CompositionEnvelope, PublicRecord } from "./envelope";
import { assessTaskCoverage } from "./task-plan";
import type { PlannedTask } from "./task-plan";
import { validateCompositionEnvelope } from "./validate-envelope";

const safeAnswer = ({ body, requestId }: { body: string; requestId: string }) =>
  answerDocument({
    body,
    records: [],
    requestId,
    sourceIds: [],
  });

const asChildren = (envelope: CompositionEnvelope) =>
  childExpressionsFromOpenUi(envelope.openuiText).flatMap((expression) => {
    const document: CompositionEnvelope = {
      ...envelope,
      openuiText: expression.startsWith("root")
        ? expression
        : `root = ${expression}`,
    };
    return validateCompositionEnvelope({ envelope: document }).ok
      ? [document]
      : [];
  });

const coversTask = ({
  document,
  task,
  tasks,
}: {
  document: CompositionEnvelope;
  task: PlannedTask;
  tasks: PlannedTask[];
}) => {
  const compiled = validateCompositionEnvelope({ envelope: document });
  if (!compiled.ok) return false;
  const coverage = assessTaskCoverage(tasks, compiled.compiled);
  const item = coverage.find((entry) => entry.taskId === task.id);
  return Boolean(item && item.status !== "failed");
};

const stackOf = ({
  documents,
  fallbackText,
  requestId,
}: {
  documents: CompositionEnvelope[];
  fallbackText: string;
  requestId: string;
}) => {
  const limited = documents.slice(0, GENUI_MAX_STACK_CHILDREN);
  if (!limited.length) return safeAnswer({ body: fallbackText, requestId });
  return stackDocument({
    childExpressions: limited.flatMap((document) =>
      childExpressionsFromOpenUi(document.openuiText)
    ),
    fallbackText,
    records: [
      ...new Map(
        limited
          .flatMap((document) => document.records)
          .map((record) => [record.id, record])
      ).values(),
    ],
    requestId,
  });
};

/** Preserve valid sections and fill only the tasks they do not already cover. */
export const recoverComposition = ({
  partial,
  reason,
  requestId,
  tasks,
}: {
  partial?: CompositionEnvelope | null;
  reason: string;
  records?: PublicRecord[];
  requestId: string;
  tasks: PlannedTask[];
}): CompositionEnvelope => {
  const fallback =
    reason === "timeout" || reason === "provider"
      ? "I could not finish the written explanation. The other requested pieces that I can assemble are below."
      : "I could not assemble the complete response. Available requested items are shown below.";
  const useful = (partial ? asChildren(partial) : []).filter((document) =>
    tasks.some((task) => coversTask({ document, task, tasks }))
  );
  const used = new Set<string>();
  const ordered = tasks.flatMap((task) => {
    const kept = useful.find(
      (document) =>
        !used.has(document.openuiText) && coversTask({ document, task, tasks })
    );
    if (kept) {
      used.add(kept.openuiText);
      return [kept];
    }
    const planned = composePlannedDocument({ requestId, tasks: [task] });
    if (!planned) return [];
    return asChildren(planned.envelope).filter((document) => {
      if (used.has(document.openuiText)) return false;
      used.add(document.openuiText);
      return coversTask({ document, task, tasks });
    });
  });
  const envelope = stackOf({
    documents: ordered,
    fallbackText: fallback,
    requestId,
  });
  if (validateCompositionEnvelope({ envelope }).ok) return envelope;
  const planned = composePlannedDocument({ requestId, tasks });
  if (
    planned &&
    validateCompositionEnvelope({ envelope: planned.envelope }).ok
  ) {
    return planned.envelope;
  }
  return safeAnswer({
    body: "I could not assemble the complete response.",
    requestId,
  });
};
