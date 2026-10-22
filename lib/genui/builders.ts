import type { CompositionEnvelope, PublicRecord } from "./envelope";
import { GENUI_LIBRARY_VERSION } from "./envelope";

const envelope = ({
  fallbackText,
  openuiText,
  records,
  requestId,
}: {
  fallbackText: string;
  openuiText: string;
  records: PublicRecord[];
  requestId: string;
}): CompositionEnvelope => ({
  fallbackText,
  libraryVersion: GENUI_LIBRARY_VERSION,
  openuiText,
  records,
  requestId,
});

export const cvDocument = ({
  focus = "full",
  record,
  requestId,
}: {
  focus?: string;
  record: PublicRecord;
  requestId: string;
}) =>
  envelope({
    fallbackText: `CV (${focus}): ${record.kind === "cv" ? record.title : "CV"}`,
    openuiText: `root = CVExperience("${focus}", "${record.id}")`,
    records: [record],
    requestId,
  });

export const answerDocument = ({
  body,
  requestId,
  sourceIds,
  records,
}: {
  body: string;
  requestId: string;
  sourceIds: string[];
  records: PublicRecord[];
}) =>
  envelope({
    fallbackText: body,
    openuiText: `root = Answer("${body.replace(/"/g, '\\"')}", [${sourceIds.map((id) => `"${id}"`).join(", ")}])`,
    records,
    requestId,
  });

export const projectDocument = ({
  projectIds,
  records,
  requestId,
}: {
  projectIds: string[];
  records: PublicRecord[];
  requestId: string;
}) =>
  envelope({
    fallbackText: "Selected projects",
    openuiText: `root = ProjectExperience([${projectIds.map((id) => `"${id}"`).join(", ")}])`,
    records,
    requestId,
  });

export const contactDocument = ({
  records,
  requestId,
}: {
  records: PublicRecord[];
  requestId: string;
}) =>
  envelope({
    fallbackText: "Contact Gabo",
    openuiText: `root = ContactExperience("${records[0]?.id ?? "profile"}")`,
    records,
    requestId,
  });

export const bookingDocument = ({
  records,
  requestId,
}: {
  records: PublicRecord[];
  requestId: string;
}) =>
  envelope({
    fallbackText: "Book a call",
    openuiText: "root = BookingExperience()",
    records,
    requestId,
  });
