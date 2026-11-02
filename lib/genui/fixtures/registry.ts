import { searchError } from "lib/search/compose-outcome";
import type { SearchError, SearchStatus } from "lib/search/compose-outcome";

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
  | "empty-error"
  | "search-composing"
  | "search-streaming"
  | "search-empty"
  | "search-error"
  | "search-timed-out"
  | "search-rate-limited";

/**
 * A scripted search outcome: the lab mounts the region idle, then moves it to
 * `status` so the live region announces like a real request. Try again and
 * example chips are wired to a lab field, never to `/api/genui/compose`.
 */
export interface GenuiSearchState {
  error?: SearchError;
  status: Exclude<SearchStatus, "idle" | "result">;
  submitted: string;
}

export interface GenuiFixtureDefinition {
  containerWidth?: number;
  envelope: CompositionEnvelope | null;
  errorMessage?: string;
  id: GenuiFixtureId;
  search?: GenuiSearchState;
}

/** Server message the rate-limited fixture shows verbatim (429 body). */
export const LAB_RATE_LIMIT_MESSAGE = "Daily search limit reached.";

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
  "search-composing": {
    envelope: null,
    id: "search-composing",
    search: { status: "composing", submitted: "explore my work" },
  },
  "search-streaming": {
    envelope: projectDocument({
      composite: "work-gallery",
      projectIds: ["/project/wink"],
      records: [sampleProjectRecord("wink", "Wink")],
      requestId,
    }),
    id: "search-streaming",
    search: { status: "composing", submitted: "explore my work" },
  },
  "search-empty": {
    envelope: null,
    id: "search-empty",
    search: { status: "empty", submitted: "best pizza in Denver" },
  },
  "search-error": {
    envelope: null,
    id: "search-error",
    search: {
      error: searchError("failed"),
      status: "error",
      submitted: "show me web3 work",
    },
  },
  "search-timed-out": {
    envelope: null,
    id: "search-timed-out",
    search: {
      error: searchError("timed_out"),
      status: "error",
      submitted: "explore my work",
    },
  },
  "search-rate-limited": {
    envelope: null,
    id: "search-rate-limited",
    search: {
      error: searchError("rate_limited", LAB_RATE_LIMIT_MESSAGE),
      status: "error",
      submitted: "explore my work",
    },
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
