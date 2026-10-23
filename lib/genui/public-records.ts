import type { Project } from "gaboesquivel";
import { siteOrigin } from "lib/site-path";

import { cvDownloadPayload } from "../connect/cv-download";
import type { PublicRecord } from "./envelope";

export const cvPublicRecord = (): PublicRecord => {
  const payload = cvDownloadPayload();
  return {
    id: "/cv",
    kind: "cv",
    pdfUrl: payload.pdfUrl,
    title: payload.title,
    url: payload.pageUrl,
    variant: payload.variant,
  };
};

export const projectToPublicRecord = (project: Project): PublicRecord => ({
  description: project.description,
  id: `/project/${project.slug}`,
  kind: "project",
  slug: project.slug,
  title: project.title,
  url: `${siteOrigin}/project/${project.slug}`,
});
