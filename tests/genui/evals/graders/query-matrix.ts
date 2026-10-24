import { compileCompositionEnvelope } from "lib/genui/contract/compiler";
import type { CompositionEnvelope } from "lib/genui/envelope";

import {
  catalogPostIds,
  catalogProjectIds,
} from "../../fixtures/catalog-ground-truth";
import type { QueryMatrixFixture } from "../datasets/query-matrix-types";
import { experienceForFamily } from "../datasets/query-matrix-types";

export type MatrixGrade = "PASS" | "FAIL" | "SKIP" | "NOT_RUN";

export const rootExperienceFromOpenUi = (openuiText: string) =>
  openuiText.match(/^\s*root\s*=\s*(\w+)/)?.[1] ?? null;

export const effectiveExperienceForGrading = (openuiText: string) => {
  const root = rootExperienceFromOpenUi(openuiText);
  if (root === "ExperienceStack") {
    if (openuiText.includes("ProjectExperience")) return "ProjectExperience";
    if (openuiText.includes("WritingExperience")) return "WritingExperience";
    if (openuiText.includes("CVExperience")) return "CVExperience";
    if (openuiText.includes("Answer")) return "Answer";
  }
  return root;
};

const familySatisfied = ({
  experience,
  families,
  allowed,
}: {
  experience: string | null;
  families: QueryMatrixFixture["expectedCompositeFamilies"];
  allowed?: QueryMatrixFixture["allowedAlternativeCompositions"];
}) => {
  if (!experience) return false;
  const candidates = [...families, ...(allowed ?? [])];
  return candidates.some((family) =>
    experienceForFamily[family].includes(experience)
  );
};

export const gradeQueryMatrixFixture = ({
  fixture,
  envelope,
  error,
}: {
  fixture: QueryMatrixFixture;
  envelope: CompositionEnvelope | null;
  error?: string | null;
}): { grade: MatrixGrade; reason?: string } => {
  if (fixture.rejectEmpty) {
    if (error === "invalid-query" || error?.includes("required")) {
      return { grade: "PASS" };
    }
    return {
      grade: "FAIL",
      reason: `expected empty rejection, got envelope=${Boolean(envelope)}`,
    };
  }

  if (!envelope) {
    return { grade: "FAIL", reason: "missing envelope" };
  }

  const compile = compileCompositionEnvelope({ envelope });
  if (!compile.ok) {
    return { grade: "FAIL", reason: `invalid compile: ${compile.code}` };
  }

  const experience = effectiveExperienceForGrading(envelope.openuiText);
  if (
    fixture.expectedCompositeFamilies.length &&
    !familySatisfied({
      experience,
      families: fixture.expectedCompositeFamilies,
      allowed: fixture.allowedAlternativeCompositions,
    })
  ) {
    return {
      grade: "FAIL",
      reason: `experience ${experience} not in expected families`,
    };
  }

  for (const forbiddenRoot of fixture.forbiddenRootExperiences ?? []) {
    if (experience === forbiddenRoot) {
      return {
        grade: "FAIL",
        reason: `forbidden root experience: ${forbiddenRoot}`,
      };
    }
  }

  if (fixture.requiredComposite) {
    const compositeMatch = envelope.openuiText.match(
      /ProjectExperience\("([^"]+)"/
    )?.[1];
    if (compositeMatch !== fixture.requiredComposite) {
      return {
        grade: "FAIL",
        reason: `expected composite ${fixture.requiredComposite}, got ${compositeMatch ?? "none"}`,
      };
    }
  }

  for (const forbidden of fixture.forbiddenContent ?? []) {
    const hay = `${envelope.openuiText}\n${envelope.fallbackText}`;
    if (hay.includes(forbidden)) {
      return { grade: "FAIL", reason: `forbidden content: ${forbidden}` };
    }
  }

  for (const required of fixture.requiredContent ?? []) {
    const hay = `${envelope.openuiText}\n${JSON.stringify(envelope.records)}`;
    if (!hay.includes(required)) {
      return { grade: "FAIL", reason: `missing required: ${required}` };
    }
  }

  if (fixture.requiresRealCatalogData) {
    for (const record of envelope.records) {
      if (record.kind === "project" && !catalogProjectIds.has(record.id)) {
        return { grade: "FAIL", reason: `unknown project ${record.id}` };
      }
      if (record.kind === "post" && !catalogPostIds.has(record.id)) {
        return { grade: "FAIL", reason: `unknown post ${record.id}` };
      }
    }
  }

  return { grade: "PASS" };
};
