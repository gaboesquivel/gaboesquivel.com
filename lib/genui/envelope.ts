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

export const experienceAllowed = (name: string) =>
  (experienceNames as readonly string[]).includes(name);
