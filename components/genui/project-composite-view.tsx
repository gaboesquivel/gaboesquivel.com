"use client";

import { EditorialProjectCard } from "components/work/editorial-project-card";
import { EditorialProjectList } from "components/work/editorial-project-list";
import { ProjectCaseStudy } from "components/work/project-case-study";
import { ProjectEvidence } from "components/work/project-evidence";
import { WorkProjectGallery } from "components/work/work-project-gallery";
import type { Project } from "gaboesquivel";
import type { CompositeName } from "lib/genui/composites";
import { workCoverSizes } from "lib/work/project-cover";

export const ProjectCompositeView = ({
  composite,
  projects,
}: {
  composite: CompositeName;
  projects: Project[];
}) => {
  if (!projects.length) {
    return <p className="text-neutral-400">No projects to show.</p>;
  }

  if (composite === "case-study" && projects[0]) {
    return <ProjectCaseStudy project={projects[0]} />;
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
