import {
  timelineDocument,
  bookingDocument,
  childExpressionsFromOpenUi,
  contactDocument,
  cvDocument,
  projectDocument,
  stackDocument,
  writingDocument,
} from "../builders";
import type { CompositionEnvelope } from "../envelope";
import {
  sampleCvRecord,
  samplePostRecord,
  sampleProfileRecord,
  sampleProjectRecord,
} from "./sample-records";

export type GenuiFixtureId =
  | "career-timeline"
  | "cv-full"
  | "project-gallery"
  | "project-case-study"
  | "project-bento"
  | "project-asymmetric-closing"
  | "writing-dated"
  | "contact-hire"
  | "booking-hire"
  | "mixed-task"
  | "empty-error";

export interface GenuiFixtureDefinition {
  containerWidth?: number;
  envelope: CompositionEnvelope | null;
  errorMessage?: string;
  id: GenuiFixtureId;
}

const requestId = "fixture-lab";

export const genuiFixtures: Record<GenuiFixtureId, GenuiFixtureDefinition> = {
  "career-timeline": {
    envelope: timelineDocument({ requestId }),
    id: "career-timeline",
  },
  "booking-hire": {
    envelope: bookingDocument({
      records: [sampleProfileRecord],
      requestId,
    }),
    id: "booking-hire",
  },
  "contact-hire": {
    envelope: contactDocument({
      records: [sampleProfileRecord],
      requestId,
    }),
    id: "contact-hire",
  },
  "cv-full": {
    envelope: cvDocument({ record: sampleCvRecord, requestId }),
    id: "cv-full",
  },
  "empty-error": {
    envelope: null,
    errorMessage: "Fixture error state",
    id: "empty-error",
  },
  "project-case-study": {
    envelope: projectDocument({
      composite: "case-study",
      projectIds: ["/project/wink"],
      records: [sampleProjectRecord("wink", "Wink")],
      requestId,
    }),
    id: "project-case-study",
  },
  "project-gallery": {
    envelope: projectDocument({
      composite: "work-gallery",
      projectIds: ["/project/wink", "/project/legal-agent"],
      records: [
        sampleProjectRecord("wink", "Wink"),
        sampleProjectRecord("legal-agent", "LegalAgent"),
      ],
      requestId,
    }),
    id: "project-gallery",
  },
  "project-bento": {
    envelope: projectDocument({
      composite: "project-bento",
      domain: "ai",
      projectIds: [
        "/project/legal-agent",
        "/project/masterbots",
        "/project/bitlauncher",
        "/project/wizard-world",
      ],
      records: [
        sampleProjectRecord("legal-agent", "LegalAgent"),
        sampleProjectRecord("masterbots", "Masterbots"),
        sampleProjectRecord("bitlauncher", "Bitlauncher"),
        sampleProjectRecord("wizard-world", "Wizard World"),
      ],
      requestId,
    }),
    id: "project-bento",
  },
  "project-asymmetric-closing": {
    envelope: projectDocument({
      composite: "project-asymmetric-closing",
      domain: "ai",
      projectIds: [
        "/project/legal-agent",
        "/project/masterbots",
        "/project/bitlauncher",
        "/project/wizard-world",
        "/project/wink",
      ],
      records: [
        sampleProjectRecord("legal-agent", "LegalAgent"),
        sampleProjectRecord("masterbots", "Masterbots"),
        sampleProjectRecord("bitlauncher", "Bitlauncher"),
        sampleProjectRecord("wizard-world", "Wizard World"),
        sampleProjectRecord("wink", "Wink"),
      ],
      requestId,
    }),
    id: "project-asymmetric-closing",
  },
  "mixed-task": {
    envelope: stackDocument({
      childExpressions: [
        ...childExpressionsFromOpenUi(
          projectDocument({
            composite: "project-comparison",
            projectIds: ["/project/wink", "/project/its"],
            records: [
              sampleProjectRecord("wink", "Wink"),
              sampleProjectRecord("its", "ITS"),
            ],
            requestId,
          }).openuiText
        ),
        ...childExpressionsFromOpenUi(
          cvDocument({ record: sampleCvRecord, requestId }).openuiText
        ),
      ],
      fallbackText: "Comparison and CV",
      records: [
        sampleProjectRecord("wink", "Wink"),
        sampleProjectRecord("its", "ITS"),
        sampleCvRecord,
      ],
      requestId,
    }),
    id: "mixed-task",
  },
  "writing-dated": {
    envelope: writingDocument({
      composite: "dated-row",
      postIds: ["/blog/sample-post"],
      records: [samplePostRecord("sample-post", "Sample post")],
      requestId,
    }),
    id: "writing-dated",
  },
};

export const isGenuiFixtureId = (value: string): value is GenuiFixtureId =>
  value in genuiFixtures;

export const fixtureLabEnabled = () =>
  process.env.GENUI_FIXTURE_LAB === "1" && !process.env.VERCEL;
