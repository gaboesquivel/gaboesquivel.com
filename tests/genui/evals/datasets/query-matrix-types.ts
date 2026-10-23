export type QueryPriority = "P0" | "P1" | "P2";

export type QueryCategory = "R" | "C" | "L" | "E" | "P";

export type CompositeFamily =
  | "answer"
  | "project-grid"
  | "writing-list"
  | "book"
  | "note"
  | "cv"
  | "capability-showcase";

export interface QueryMatrixFixture {
  id: string;
  priority: QueryPriority;
  category: QueryCategory;
  query: string;
  expectedIntent?: string;
  expectedCompositeFamilies: CompositeFamily[];
  allowedAlternativeCompositions?: CompositeFamily[];
  requiredContent?: string[];
  forbiddenContent?: string[];
  requiresRealCatalogData?: boolean;
  requiresLiveIntegration?: boolean;
  schemaRequirements?: string[];
  interactionRequirements?: string[];
  evaluationRubric?: string[];
  notes?: string;
  rejectEmpty?: boolean;
  evaluationMode?: "deterministic" | "live" | "manual";
}

export const experienceForFamily: Record<CompositeFamily, readonly string[]> = {
  answer: ["Answer"],
  "project-grid": ["ProjectExperience"],
  "writing-list": ["WritingExperience"],
  book: ["BookingExperience"],
  note: ["ContactExperience"],
  cv: ["CVExperience"],
  "capability-showcase": ["CapabilityShowcaseExperience"],
};
