import { InnerPageHero } from "components/shared/inner-page-hero";
import type { Project } from "gaboesquivel";

import { ProjectCaseStudy } from "./project-case-study";
import { ProjectHero } from "./project-hero";

export function ProjectDetails({
  project,
  full = false,
}: {
  project: Project;
  full?: boolean;
}) {
  if (full) {
    return <ProjectCaseStudy project={project} />;
  }

  const primaryImageHref = `/project/${project.slug}`;

  return (
    <div className="mb-10">
      <InnerPageHero
        compact
        description={project.description.replaceAll("\n", " ")}
        title={project.title}
        trail={[{ href: "/work", label: "work" }, { label: project.title }]}
      />

      <div className="mt-8">
        <ProjectHero href={primaryImageHref} project={project} />
      </div>
    </div>
  );
}
