import {
  answerDocument,
  bookingDocument,
  childExpressionsFromOpenUi,
  contactDocument,
  cvDocument,
  projectDocument,
  stackDocument,
  writingDocument,
} from "./builders";
import { GENUI_MAX_STACK_CHILDREN } from "./contract/catalog";
import type { CompositionEnvelope, PublicRecord } from "./envelope";
import type { PlannedTask } from "./task-plan";
import { validateCompositionEnvelope } from "./validate-envelope";

/** Recover only supplied evidence. Never broaden an unresolved filtered request. */
export const recoverComposition = ({
  tasks,
  records,
  requestId,
  constrained = false,
}: {
  tasks: PlannedTask[];
  records: PublicRecord[];
  requestId: string;
  constrained?: boolean;
}): CompositionEnvelope => {
  const message =
    "I could not assemble the complete response. Available requested items are shown below; the remaining questions need a retry.";
  const notice = (body: string) =>
    answerDocument({ body, records: [], sourceIds: [], requestId });
  const documents: CompositionEnvelope[] = [notice(message)];
  const unresolved: string[] = [];
  const projectRecords = records.filter((record) => record.kind === "project");
  const posts = records.filter((record) => record.kind === "post");
  const cv = records.find((record) => record.kind === "cv");
  const contact = records.find(
    (record) => record.kind === "profile" && record.id === "/contact"
  );
  const seen = new Set<string>();
  for (const task of tasks) {
    let document: CompositionEnvelope | null = null;
    if (task.kind === "cv" && cv)
      document = cvDocument({ record: cv, requestId });
    if (task.kind === "booking")
      document = bookingDocument({ records: [], requestId });
    if (task.kind === "contact" && contact)
      document = contactDocument({ records: [contact], requestId });
    if (task.kind === "projects" && projectRecords.length && !constrained)
      document = projectDocument({
        composite: "project-compact-list",
        projectIds: projectRecords.map(({ id }) => id),
        records: projectRecords,
        requestId,
      });
    if (task.kind === "writing" && posts.length && !constrained)
      document = writingDocument({
        composite: "dated-row",
        postIds: posts.map(({ id }) => id),
        records: posts,
        requestId,
      });
    if (!document || !validateCompositionEnvelope({ envelope: document }).ok) {
      unresolved.push(task.kind);
      continue;
    }
    if (seen.has(document.openuiText)) continue;
    if (documents.length >= GENUI_MAX_STACK_CHILDREN) {
      unresolved.push(task.kind);
      continue;
    }
    seen.add(document.openuiText);
    documents.push(document);
  }
  const body = unresolved.length
    ? `${message} Not completed: ${[...new Set(unresolved)].join(", ")}.`
    : message;
  documents[0] = notice(body);
  const firstDocument = documents.at(0);
  if (!firstDocument) return notice(body);
  if (documents.length === 1) return firstDocument;
  return stackDocument({
    childExpressions: documents.flatMap((document) =>
      childExpressionsFromOpenUi(document.openuiText)
    ),
    fallbackText: body,
    records: [
      ...new Map(
        documents
          .flatMap((document) => document.records)
          .map((record) => [record.id, record])
      ).values(),
    ],
    requestId,
  });
};
