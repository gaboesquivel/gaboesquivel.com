"use client";

import type { Project } from "gaboesquivel";
import {
  comparisonDimensionLabel,
  comparisonValue,
  defaultComparisonDimensions,
  missingComparisonValue,
} from "lib/genui/comparison-dimensions";
import type {
  ComparisonDimension,
  ComparisonValue,
} from "lib/genui/comparison-dimensions";
import { materializeProjectSlots } from "lib/genui/composition-plan";
import type {
  ProjectCompositionRecipe,
  ProjectCompositionRole,
} from "lib/genui/composition-plan";
import { projectSlugFromPublicId } from "lib/genui/project-from-id";

import { ProjectShowcaseCard } from "./project-showcase-card";

const showcaseSizes = {
  lead: "(max-width: 47.99rem) 100vw, (max-width: 63.99rem) 50vw, 36rem",
  secondary: "(max-width: 47.99rem) 100vw, (max-width: 63.99rem) 50vw, 18rem",
  list: "(max-width: 47.99rem) 100vw, 24rem",
};

const ComparisonCell = ({ value }: { value: ComparisonValue }) => {
  if (!value) {
    return <p className="text-neutral-400">{missingComparisonValue}</p>;
  }
  if (typeof value === "string") {
    return <p className="text-neutral-200">{value}</p>;
  }
  return (
    <ul className="space-y-2 text-neutral-200">
      {value.map((item) => (
        <li key={item} className="border-l border-hairline pl-3">
          {item}
        </li>
      ))}
    </ul>
  );
};

const comparisonRole: ProjectCompositionRole = "comparison-item";

/** Two or three projects side by side, one aligned row per requested dimension. */
const ProjectComparison = ({
  dimensions,
  projects,
}: {
  dimensions: ComparisonDimension[];
  projects: Project[];
}) => {
  const columns =
    projects.length === 3
      ? "@min-[40rem]/project-showcase:grid-cols-3"
      : "@min-[40rem]/project-showcase:grid-cols-2";
  return (
    <div className="@container/project-showcase space-y-8">
      <div className={`grid grid-cols-1 gap-6 ${columns}`}>
        {projects.map((project, index) => (
          <ProjectShowcaseCard
            key={project.slug}
            priority={index === 0}
            project={project}
            role={comparisonRole}
            sizes={showcaseSizes.secondary}
          />
        ))}
      </div>
      <dl className="divide-y divide-hairline border-y border-hairline text-sm">
        {dimensions.map((dimension) => (
          <div key={dimension} className="py-5" data-comparison-row={dimension}>
            <dt className="mb-3 font-semibold text-white">
              {comparisonDimensionLabel(dimension)}
            </dt>
            <dd className={`grid grid-cols-1 gap-x-6 gap-y-4 ${columns}`}>
              {projects.map((project) => (
                <div key={project.slug} className="min-w-0">
                  <p className="mb-1 text-xs text-neutral-400 @min-[40rem]/project-showcase:sr-only">
                    {project.title}
                  </p>
                  <ComparisonCell
                    value={comparisonValue({ dimension, project })}
                  />
                </div>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export const ProjectShowcaseLayout = ({
  composite,
  dimensions,
  projectIds,
  projects,
}: {
  composite: ProjectCompositionRecipe;
  dimensions?: ComparisonDimension[];
  domain?: "ai" | "web3" | "all";
  projectIds: string[];
  projects: Project[];
}) => {
  const plan = materializeProjectSlots(composite, projectIds);
  const ordered = plan.slots.flatMap((slot) => {
    const slug = projectSlugFromPublicId(slot.projectId);
    const project = projects.find((item) => item.slug === slug);
    return project ? [{ project, role: slot.role }] : [];
  });

  if (composite === "project-compact-list") {
    return (
      <div className="@container/project-showcase">
        <ul className="divide-y divide-hairline border-y border-hairline">
          {ordered.map(({ project }) => (
            <li key={project.slug} className="py-4">
              <a
                className="group block text-accent hover:underline"
                href={`/project/${project.slug}`}
              >
                <span className="text-lg font-semibold text-white group-hover:text-accent">
                  {project.title}
                </span>
                <p className="mt-1 text-sm text-neutral-400">
                  {project.description}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (composite === "project-comparison") {
    return (
      <ProjectComparison
        dimensions={
          dimensions?.length ? dimensions : defaultComparisonDimensions
        }
        projects={ordered.map(({ project }) => project)}
      />
    );
  }

  if (composite === "project-feature-grid") {
    const [lead, ...supporting] = ordered;
    return (
      <div className="@container/project-showcase space-y-6">
        {lead ? (
          <ProjectShowcaseCard
            project={lead.project}
            role={lead.role}
            sizes={showcaseSizes.lead}
            priority
          />
        ) : null}
        <div className="grid grid-cols-1 gap-6 @min-[48rem]/project-showcase:grid-cols-2">
          {supporting.map(({ project, role }) => (
            <ProjectShowcaseCard
              key={project.slug}
              project={project}
              role={role}
              sizes={showcaseSizes.secondary}
            />
          ))}
        </div>
      </div>
    );
  }

  if (composite === "project-bento") {
    const byRole = new Map(ordered.map((item) => [item.role, item]));
    const lead = byRole.get("lead");
    const topRight = byRole.get("top-right");
    const bottomLeft = byRole.get("bottom-left");
    const bottomRight = byRole.get("bottom-right");
    return (
      <div className="@container/project-showcase">
        <div className="grid grid-cols-1 gap-4 @min-[48rem]/project-showcase:grid-cols-2 @min-[64rem]/project-showcase:grid-cols-12 @min-[64rem]/project-showcase:grid-rows-2 @min-[64rem]/project-showcase:gap-4">
          {lead ? (
            <div className="@min-[64rem]/project-showcase:col-span-6 @min-[64rem]/project-showcase:row-span-2">
              <ProjectShowcaseCard
                project={lead.project}
                role={lead.role}
                sizes={showcaseSizes.lead}
                priority
              />
            </div>
          ) : null}
          {topRight ? (
            <div className="@min-[64rem]/project-showcase:col-span-6">
              <ProjectShowcaseCard
                project={topRight.project}
                role={topRight.role}
                sizes={showcaseSizes.secondary}
              />
            </div>
          ) : null}
          {bottomLeft ? (
            <div className="@min-[64rem]/project-showcase:col-span-3">
              <ProjectShowcaseCard
                project={bottomLeft.project}
                role={bottomLeft.role}
                sizes={showcaseSizes.secondary}
              />
            </div>
          ) : null}
          {bottomRight ? (
            <div className="@min-[64rem]/project-showcase:col-span-3">
              <ProjectShowcaseCard
                project={bottomRight.project}
                role={bottomRight.role}
                sizes={showcaseSizes.secondary}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  if (composite === "project-asymmetric-closing") {
    const lead = ordered.find((item) => item.role === "lead");
    const supporting = ordered.filter((item) => item.role === "supporting");
    const rightFeature = ordered.find((item) => item.role === "right-feature");
    const closing = ordered.find((item) => item.role === "closing-feature");
    const firstSupporting = supporting[0];
    const restSupporting = supporting.slice(1);
    return (
      <div className="@container/project-showcase space-y-8">
        <div className="grid grid-cols-1 gap-6 @min-[64rem]/project-showcase:grid-cols-12">
          {lead ? (
            <div className="@min-[64rem]/project-showcase:col-span-8">
              <ProjectShowcaseCard
                project={lead.project}
                role={lead.role}
                sizes={showcaseSizes.lead}
                priority
              />
            </div>
          ) : null}
          {firstSupporting ? (
            <div className="@min-[64rem]/project-showcase:col-span-4">
              <ProjectShowcaseCard
                project={firstSupporting.project}
                role={firstSupporting.role}
                sizes={showcaseSizes.secondary}
              />
            </div>
          ) : null}
        </div>
        {restSupporting.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 @min-[48rem]/project-showcase:grid-cols-2 @min-[64rem]/project-showcase:grid-cols-3">
            {restSupporting.map(({ project, role }) => (
              <ProjectShowcaseCard
                key={project.slug}
                project={project}
                role={role}
                sizes={showcaseSizes.secondary}
              />
            ))}
          </div>
        ) : null}
        {rightFeature ? (
          <div className="@min-[64rem]/project-showcase:ml-auto @min-[64rem]/project-showcase:w-7/12">
            <ProjectShowcaseCard
              project={rightFeature.project}
              role={rightFeature.role}
              sizes={showcaseSizes.lead}
            />
          </div>
        ) : null}
        {closing ? (
          <ProjectShowcaseCard
            project={closing.project}
            role={closing.role}
            sizes={showcaseSizes.lead}
          />
        ) : null}
      </div>
    );
  }

  return null;
};
