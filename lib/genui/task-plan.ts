import type { CompiledExperience } from "./contract/errors";
import { parseStackChildren } from "./contract/stack";
import type { ExperienceName } from "./experience-contract";

export type PlannedTaskKind =
  | "explain"
  | "compare"
  | "projects"
  | "writing"
  | "timeline"
  | "cv"
  | "booking"
  | "contact";
export interface PlannedTask {
  id: string;
  kind: PlannedTaskKind;
  position: number;
  evidenceRequirement: string;
  completion: string;
}
const taskPatterns: {
  kind: PlannedTaskKind;
  pattern: RegExp;
  evidence: string;
  completion: string;
}[] = [
  {
    kind: "compare",
    pattern: /\b(compare|versus|comparison)\b/i,
    evidence: "Named projects or explicit comparison dimensions",
    completion:
      "Comparison with supported dimensions or an explicit limitation",
  },
  {
    kind: "explain",
    pattern:
      /\b(explain|describe|why|how|proud|problem|process|fit|contribution)\b/i,
    evidence:
      "Source passages; personal preferences and incidents require explicit documentation",
    completion: "Supported explanation or a specific evidence gap",
  },
  {
    kind: "projects",
    pattern: /\b(show|list|browse|see)\b[^.;\n]*?\b(projects?|work)\b/i,
    evidence: "Canonical project records matching all constraints",
    completion: "Relevant project evidence",
  },
  {
    kind: "writing",
    pattern: /\b(writing|articles?|blog|posts?)\b/i,
    evidence: "Canonical published posts",
    completion: "Writing links",
  },
  {
    kind: "timeline",
    pattern: /\b(timeline|career story|career chronology|career journey)\b/i,
    evidence: "Canonical career chronology",
    completion: "Career timeline",
  },
  {
    kind: "cv",
    pattern: /\b(cv|resume|résumé)\b/i,
    evidence: "Canonical CV record",
    completion: "CV preview and download",
  },
  {
    kind: "booking",
    pattern: /\b(book(?:ing)?|schedule|availability)\b/i,
    evidence: "Approved booking capability",
    completion: "Booking controls; no automatic write",
  },
  {
    kind: "contact",
    pattern: /\b(contact|send (?:a |me a )?note|email form)\b/i,
    evidence: "Canonical contact record",
    completion: "Contact form; no automatic write",
  },
];

/** Conservative obligation extraction, not a claim of general language understanding. */
export const planTasks = (query: string): PlannedTask[] =>
  taskPatterns
    .flatMap(({ kind, pattern, evidence, completion }) => {
      const match = pattern.exec(query);
      return match
        ? [
            {
              id: `task-${kind}`,
              kind,
              position: match.index,
              evidenceRequirement: evidence,
              completion,
            },
          ]
        : [];
    })
    .sort((a, b) => a.position - b.position);

const taskExperiences: Record<PlannedTaskKind, ExperienceName[]> = {
  explain: ["Answer"],
  compare: ["ProjectExperience", "Answer"],
  projects: ["ProjectExperience"],
  writing: ["WritingExperience"],
  timeline: ["TimelineExperience"],
  cv: ["CVExperience"],
  booking: ["BookingExperience"],
  contact: ["ContactExperience"],
};

/** Structural coverage only: source IDs cannot prove semantic entailment. */
export const assessTaskCoverage = (
  tasks: PlannedTask[],
  compiled: CompiledExperience
) => {
  const stack =
    compiled.experience === "ExperienceStack"
      ? parseStackChildren(compiled.props.children)
      : null;
  const children = stack?.ok
    ? stack.children
    : [{ typeName: compiled.experience, props: compiled.props }];
  return tasks.map((task) => ({
    taskId: task.id,
    kind: task.kind,
    status: children.some(
      (child) =>
        taskExperiences[task.kind].includes(child.typeName as ExperienceName) &&
        (task.kind !== "compare" ||
          child.typeName === "Answer" ||
          child.props.composite === "project-comparison")
    )
      ? ("represented" as const)
      : ("missing" as const),
  }));
};
