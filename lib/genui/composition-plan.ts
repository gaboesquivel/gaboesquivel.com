export const projectCompositionRecipes = [
  "project-bento",
  "project-feature-grid",
  "project-asymmetric-closing",
  "project-compact-list",
  "project-comparison",
] as const;

export type ProjectCompositionRecipe =
  (typeof projectCompositionRecipes)[number];

export type ProjectCompositionRole =
  | "lead"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "supporting"
  | "right-feature"
  | "closing-feature"
  | "comparison-item"
  | "list-item";

export interface ProjectCompositionSlot {
  projectId: string;
  role: ProjectCompositionRole;
}

export interface ProjectCompositionPlan {
  recipe: ProjectCompositionRecipe;
  slots: ProjectCompositionSlot[];
}

export class CompositionPlanError extends Error {
  code:
    | "duplicate_project_ids"
    | "invalid_recipe_cardinality"
    | "unknown_recipe";

  constructor(code: CompositionPlanError["code"]) {
    super(code);
    this.code = code;
    this.name = "CompositionPlanError";
  }
}

const recipeSet = new Set<string>(projectCompositionRecipes);

export const isProjectCompositionRecipe = (
  value: string
): value is ProjectCompositionRecipe => recipeSet.has(value);

const assertCardinality = ({
  recipe,
  count,
}: {
  recipe: ProjectCompositionRecipe;
  count: number;
}) => {
  if (recipe === "project-bento" && count !== 4) {
    throw new CompositionPlanError("invalid_recipe_cardinality");
  }
  if (recipe === "project-feature-grid" && count !== 3) {
    throw new CompositionPlanError("invalid_recipe_cardinality");
  }
  if (recipe === "project-asymmetric-closing" && (count < 5 || count > 8)) {
    throw new CompositionPlanError("invalid_recipe_cardinality");
  }
  if (recipe === "project-compact-list" && count < 1) {
    throw new CompositionPlanError("invalid_recipe_cardinality");
  }
  if (recipe === "project-comparison" && (count < 2 || count > 3)) {
    throw new CompositionPlanError("invalid_recipe_cardinality");
  }
};

export const materializeProjectSlots = (
  recipe: ProjectCompositionRecipe,
  projectIds: string[]
): ProjectCompositionPlan => {
  if (!isProjectCompositionRecipe(recipe)) {
    throw new CompositionPlanError("unknown_recipe");
  }
  const unique = new Set(projectIds);
  if (unique.size !== projectIds.length) {
    throw new CompositionPlanError("duplicate_project_ids");
  }
  assertCardinality({ recipe, count: projectIds.length });

  if (recipe === "project-bento") {
    return {
      recipe,
      slots: [
        { projectId: projectIds[0], role: "lead" },
        { projectId: projectIds[1], role: "top-right" },
        { projectId: projectIds[2], role: "bottom-left" },
        { projectId: projectIds[3], role: "bottom-right" },
      ],
    };
  }

  if (recipe === "project-feature-grid") {
    return {
      recipe,
      slots: [
        { projectId: projectIds[0], role: "lead" },
        { projectId: projectIds[1], role: "supporting" },
        { projectId: projectIds[2], role: "supporting" },
      ],
    };
  }

  if (recipe === "project-asymmetric-closing") {
    const closingFeature = projectIds.at(-1) ?? projectIds[0];
    const rightFeature = projectIds.at(-2) ?? projectIds[0];
    const supporting = projectIds.slice(1, -2);
    return {
      recipe,
      slots: [
        { projectId: projectIds[0], role: "lead" },
        ...supporting.map((projectId) => ({
          projectId,
          role: "supporting" as const,
        })),
        { projectId: rightFeature, role: "right-feature" },
        { projectId: closingFeature, role: "closing-feature" },
      ],
    };
  }

  if (recipe === "project-comparison") {
    return {
      recipe,
      slots: projectIds.map((projectId) => ({
        projectId,
        role: "comparison-item",
      })),
    };
  }

  return {
    recipe,
    slots: projectIds.map((projectId) => ({
      projectId,
      role: "list-item",
    })),
  };
};

export const validateProjectCompositionRecipe = ({
  composite,
  projectIds,
}: {
  composite: string;
  projectIds: string[];
}):
  | { ok: true }
  | {
      ok: false;
      code:
        | "unknown_composite"
        | "invalid_recipe_cardinality"
        | "duplicate_project_ids";
    } => {
  if (!isProjectCompositionRecipe(composite)) {
    return { ok: false, code: "unknown_composite" };
  }
  try {
    materializeProjectSlots(composite, projectIds);
    return { ok: true };
  } catch (error) {
    if (error instanceof CompositionPlanError) {
      if (error.code === "duplicate_project_ids") {
        return { ok: false, code: "duplicate_project_ids" };
      }
      return { ok: false, code: "invalid_recipe_cardinality" };
    }
    return { ok: false, code: "invalid_recipe_cardinality" };
  }
};
