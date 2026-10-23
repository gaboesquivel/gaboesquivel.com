import { experienceNames } from "./experience-contract";

export const GENUI_LIBRARY_VERSION = 1;

export type PublicRecord =
  | {
      id: string;
      kind: "profile";
      title: string;
      url: string;
      excerpt?: string;
    }
  | {
      id: string;
      kind: "project";
      slug: string;
      title: string;
      url: string;
      description: string;
    }
  | {
      id: string;
      kind: "post";
      slug: string;
      title: string;
      url: string;
      excerpt: string;
      publishedAt?: string;
    }
  | {
      id: string;
      kind: "cv";
      variant: string;
      title: string;
      url: string;
      pdfUrl: string;
    };

export interface CompositionEnvelope {
  fallbackText: string;
  libraryVersion: number;
  openuiText: string;
  records: PublicRecord[];
  requestId: string;
}

export const recordIdsValid = ({
  ids,
  records,
}: {
  ids: string[];
  records: PublicRecord[];
}) => {
  const known = new Set(records.map((record) => record.id));
  return ids.every((id) => known.has(id));
};

export const experienceAllowed = (name: string) =>
  (experienceNames as readonly string[]).includes(name);
