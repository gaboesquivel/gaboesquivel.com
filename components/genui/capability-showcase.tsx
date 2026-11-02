"use client";

import { AiSystemDiagram } from "components/diagrams/ai-system";
import { Web3BoundaryDiagram } from "components/diagrams/web3-boundary";
import { ProjectEvidence } from "components/work/project-evidence";
import type { Project } from "gaboesquivel";
import type { PublicRecord } from "lib/genui/envelope";

import { WritingCompositeView } from "./writing-composite-view";

export const CapabilityShowcase = ({
  domain,
  projects,
  records,
}: {
  domain: "ai" | "web3";
  projects: Project[];
  records: PublicRecord[];
}) => (
  <div className="space-y-12">
    {domain === "ai" ? <AiSystemDiagram /> : <Web3BoundaryDiagram />}
    <ProjectEvidence
      columns={2}
      presentation="card"
      slugs={projects.map((project) => project.slug)}
    />
    <WritingCompositeView
      composite="dated-row"
      postIds={records
        .filter((record) => record.kind === "post")
        .map((record) => record.id)}
    />
  </div>
);
