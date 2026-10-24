import type { ExperienceName } from "./experience-contract";

interface ComponentSemantics {
  purpose: string;
  evidence: string;
  interactions: string[];
  avoid: string;
}

/** Selection guidance shared by generation and task-coverage checks. */
export const componentSemantics = {
  Answer: {
    purpose:
      "Explain a supported fact, interpretation, or specific evidence gap.",
    evidence:
      "Source IDs supporting each factual claim; calculations come from catalog operations.",
    interactions: ["open sources"],
    avoid:
      "Replacing requested project media, CV previews, or forms with prose.",
  },
  ProjectExperience: {
    purpose:
      "Inspect real work; compare named projects using project-comparison.",
    evidence:
      "Canonical project IDs; comparisons require two or three projects.",
    interactions: ["open project"],
    avoid: "Invented media, outcomes, or equivalence between different roles.",
  },
  WritingExperience: {
    purpose: "Explore relevant published writing.",
    evidence: "Canonical post IDs.",
    interactions: ["open article"],
    avoid: "Using articles as proof of shipped work.",
  },
  TimelineExperience: {
    purpose: "Understand career chronology.",
    evidence: "Canonical /bio and project records.",
    interactions: ["navigate chapters", "expand stories"],
    avoid: "Using a timeline for ordinary project browsing.",
  },
  CVExperience: {
    purpose: "Inspect and download a resume.",
    evidence: "Canonical CV record and available focus.",
    interactions: ["preview CV", "download PDF"],
    avoid: "Replacing the requested document with a prose biography.",
  },
  BookingExperience: {
    purpose: "Choose and review a meeting time.",
    evidence: "Availability is read by the approved booking flow.",
    interactions: ["select slot", "review booking"],
    avoid:
      "Treating generation or a request for availability as authorization to book.",
  },
  ContactExperience: {
    purpose: "Prepare a note through the approved form.",
    evidence: "Canonical contact record.",
    interactions: ["edit note", "submit form"],
    avoid: "Sending anything during composition.",
  },
  AboutExperience: {
    purpose: "Introduce professional background.",
    evidence: "Canonical profile record.",
    interactions: ["open profile"],
    avoid: "Inventing personal preferences or undocumented history.",
  },
  CapabilityShowcaseExperience: {
    purpose: "Explain architecture when explicitly requested.",
    evidence: "Supported domain and canonical project IDs.",
    interactions: ["open project evidence"],
    avoid:
      "Diagrams for generic AI or Web3 browsing; invented system connections.",
  },
  ExperienceStack: {
    purpose: "Compose ordered tasks into one coherent result.",
    evidence: "Each child satisfies its own evidence contract.",
    interactions: [],
    avoid:
      "Nested stacks, repeated evidence, more than six children, or silently omitted tasks.",
  },
} satisfies Record<ExperienceName, ComponentSemantics>;

export const compositionRelationships = {
  explanation:
    "Concise Answer followed by relevant project or writing evidence.",
  comparison:
    "Project comparison followed by a supported conclusion when needed.",
  hiring:
    "Relevant evidence followed by requested CV, contact, or booking controls.",
  chronology: "Career timeline; add supporting sections only when requested.",
  factual: "A short factual question may use Answer alone.",
  ordering:
    "Explicit user order overrides these defaults. Reuse evidence without repeating cards.",
} as const;
