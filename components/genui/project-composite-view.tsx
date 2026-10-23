"use client";

import { EditorialProjectCard } from "components/work/editorial-project-card";
import { EditorialProjectList } from "components/work/editorial-project-list";
import { ProjectCaseStudy } from "components/work/project-case-study";
import { ProjectEvidence } from "components/work/project-evidence";
import { WorkProjectGallery } from "components/work/work-project-gallery";
import type { Project } from "gaboesquivel";
import type { CompositeName } from "lib/genui/composites";
import { isProjectCompositionRecipe } from "lib/genui/composition-plan";
import { workCoverSizes } from "lib/work/project-cover";

import { ProjectShowcaseLayout } from "./project-showcase-layout";

export const ProjectCompositeView = ({
  composite,
  domain,
  projectIds,
  projects,
}: {
  composite: CompositeName;
  domain?: "ai" | "web3" | "all";
  projectIds: string[];
  projects: Project[];
}) => {
  if (!projects.length) {
    return <p className="text-neutral-400">No projects to show.</p>;
  }

  if (isProjectCompositionRecipe(composite)) {
    return (
      <ProjectShowcaseLayout
        composite={composite}
        domain={domain}
        projectIds={projectIds}
        projects={projects}
      />
    );
  }

  if (composite === "case-study" && projects[0]) {
    return (
      <div className="max-w-full min-w-0 overflow-x-hidden">
        <ProjectCaseStudy project={projects[0]} />
      </div>
    );
  }

  if (composite === "work-gallery") {
    return <WorkProjectGallery projects={projects} />;
  }

  if (composite === "featured-pair") {
    return <EditorialProjectList projects={projects} />;
  }

  if (composite === "wide-lead" && projects[0]) {
    return (
      <EditorialProjectCard
        frame="wide"
        project={projects[0]}
        showRole
        sizes={workCoverSizes}
      />
    );
  }

  if (composite === "evidence-grid") {
    return (
      <ProjectEvidence
        columns={2}
        presentation="card"
        slugs={projects.map((project) => project.slug)}
      />
    );
  }

  return <EditorialProjectList projects={projects} className={undefined} />;
};
