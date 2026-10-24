import { missingComparisonValue } from "./comparison-dimensions";
import type { PublicRecord } from "./envelope";
import type { ExperienceName } from "./experience-contract";

export type CompositionRelationship =
  | "explanation-then-evidence"
  | "comparison-then-interpretation"
  | "primary-with-support"
  | "evidence-then-action"
  | "chronology"
  | "concise-fact";

export interface ComponentSemantic {
  avoid: string[];
  cardinality: { max: number; min: number };
  density: "concise" | "evidence" | "document" | "chronology";
  evidence: string;
  fallback: string;
  interactions: string[];
  purpose: string;
  recordKinds: PublicRecord["kind"][];
  requiredFields: string[];
  suits: CompositionRelationship[];
}

/** Single owner for experience selection rules used by composition and coverage. */
export const componentSemantics = {
  AboutExperience: {
    avoid: ["Inventing personal preferences or undocumented history."],
    cardinality: { max: 1, min: 1 },
    density: "concise",
    evidence: "Canonical profile record.",
    fallback: "Omit the section when no profile record is available.",
    interactions: ["open profile"],
    purpose: "Introduce professional background.",
    recordKinds: ["profile"],
    requiredFields: ["sourceId"],
    suits: ["concise-fact"],
  },
  Answer: {
    avoid: [
      "Replacing requested project media, CV previews, timelines, or forms with prose.",
      "Treating one answer as proof that every other task is done.",
    ],
    cardinality: { max: 1, min: 1 },
    density: "concise",
    evidence:
      "Source ids for factual sentences. Catalog counts come from deterministic operations. Interpretations are labeled.",
    fallback:
      "State the specific evidence gap. Do not broaden a filtered request.",
    interactions: ["open sources"],
    purpose:
      "Explain a supported fact, a catalog calculation, or a specific evidence gap.",
    recordKinds: ["profile", "project", "post", "cv"],
    requiredFields: ["body"],
    suits: [
      "concise-fact",
      "explanation-then-evidence",
      "comparison-then-interpretation",
      "primary-with-support",
    ],
  },
  BookingExperience: {
    avoid: ["Treating a request for availability as authorization to book."],
    cardinality: { max: 1, min: 1 },
    density: "document",
    evidence: "Approved booking controls. Availability is read by that flow.",
    fallback: "Show the booking controls without a generated write.",
    interactions: ["select slot", "review booking"],
    purpose: "Choose and review a meeting time.",
    recordKinds: ["profile"],
    requiredFields: [],
    suits: ["evidence-then-action"],
  },
  CapabilityShowcaseExperience: {
    avoid: [
      "Diagrams for generic AI or Web3 browsing.",
      "Invented system connections from technology co-occurrence.",
    ],
    cardinality: { max: 8, min: 1 },
    density: "evidence",
    evidence: "Explicit architecture intent and canonical project ids.",
    fallback: "Use project evidence instead of a diagram.",
    interactions: ["open project evidence"],
    purpose: "Explain architecture when the request asks for it.",
    recordKinds: ["project"],
    requiredFields: ["domain", "projectIds"],
    suits: ["explanation-then-evidence"],
  },
  ContactExperience: {
    avoid: ["Sending a message during composition."],
    cardinality: { max: 1, min: 1 },
    density: "document",
    evidence: "Canonical contact record.",
    fallback: "Show the form and leave it unsubmitted.",
    interactions: ["edit note", "submit form"],
    purpose: "Prepare a note through the approved form.",
    recordKinds: ["profile"],
    requiredFields: ["contextId"],
    suits: ["evidence-then-action"],
  },
  CVExperience: {
    avoid: ["Replacing the document with a prose biography."],
    cardinality: { max: 1, min: 1 },
    density: "document",
    evidence: "Canonical CV record, preview, and PDF download.",
    fallback: "Link the canonical CV record when preview data is missing.",
    interactions: ["preview CV", "download PDF"],
    purpose: "Inspect and download a resume.",
    recordKinds: ["cv"],
    requiredFields: ["sourceId"],
    suits: ["evidence-then-action"],
  },
  ExperienceStack: {
    avoid: [
      "Nested stacks.",
      "Repeated project cards in adjacent sections.",
      "More than six children.",
      "Silently omitted tasks.",
    ],
    cardinality: { max: 6, min: 1 },
    density: "evidence",
    evidence: "Each child satisfies its own evidence contract.",
    fallback: "Keep independently valid children and name the unfinished task.",
    interactions: [],
    purpose: "Compose ordered tasks into one readable result.",
    recordKinds: ["profile", "project", "post", "cv"],
    requiredFields: ["children"],
    suits: [
      "explanation-then-evidence",
      "comparison-then-interpretation",
      "primary-with-support",
      "evidence-then-action",
      "chronology",
    ],
  },
  ProjectExperience: {
    avoid: [
      "Invented media, outcomes, or equivalence between different roles.",
      "Using one project section to satisfy two differently filtered tasks.",
    ],
    cardinality: { max: 8, min: 1 },
    density: "evidence",
    evidence:
      "Canonical project ids. project-comparison needs two or three comparable records.",
    fallback: `Show ${missingComparisonValue} for a missing supported comparison field. Use a compact list when a visual recipe does not fit.`,
    interactions: ["open project", "inspect comparison details"],
    purpose:
      "Inspect real work, or compare named projects on supported fields.",
    recordKinds: ["project"],
    requiredFields: ["projectIds"],
    suits: [
      "explanation-then-evidence",
      "comparison-then-interpretation",
      "primary-with-support",
    ],
  },
  TimelineExperience: {
    avoid: ["Using a timeline for ordinary project browsing."],
    cardinality: { max: 12, min: 1 },
    density: "chronology",
    evidence: "Canonical /bio record and chapter project ids.",
    fallback: "Omit the timeline when /bio is unavailable.",
    interactions: ["navigate chapters", "expand stories"],
    purpose: "Understand career chronology.",
    recordKinds: ["profile", "project"],
    requiredFields: ["sourceId", "projectIds"],
    suits: ["chronology"],
  },
  WritingExperience: {
    avoid: ["Using articles as proof of shipped work."],
    cardinality: { max: 6, min: 1 },
    density: "evidence",
    evidence: "Canonical post ids.",
    fallback: "Say that no published post matched, without inventing articles.",
    interactions: ["open article"],
    purpose: "Explore relevant published writing.",
    recordKinds: ["post"],
    requiredFields: ["postIds"],
    suits: ["explanation-then-evidence", "primary-with-support"],
  },
} satisfies Record<ExperienceName, ComponentSemantic>;

export const compositionRelationships = {
  chronology:
    "Career timeline. Add another section only when that task was requested.",
  "comparison-then-interpretation":
    "Project comparison, then a short interpretation limited to supported fields.",
  "concise-fact": "A count or other short factual answer can stand alone.",
  "evidence-then-action":
    "Requested evidence, then CV, contact, or booking controls. Rendering a control does not run it.",
  "explanation-then-evidence":
    "A concise answer, then the project or writing evidence that answer may cite.",
  "primary-with-support":
    "The requested records, with a short note when a filter needs its exclusion rule stated.",
} as const;
