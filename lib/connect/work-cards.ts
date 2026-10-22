import type { Project } from "gaboesquivel";
import { experience, getProjectBySlug, projects } from "gaboesquivel";
import { featuredProjectSlugs } from "lib/work-types";

import {
  EXPERIENCE_QUESTION,
  markerIntent,
  stripMarker,
  typedBookingIntent,
  typedNoteIntent,
} from "./intent";

const broadExperiencePattern =
  /\b(what have you shipped|where did you lead|your experience|your work|explore my work|portfolio|past projects|what did you build|show me your work|tell me about your work)\b/i;

const wantsBookOrNote = (text: string) => {
  const marker = markerIntent(text);
  if (marker === "book" || marker === "note") return true;
  const cleaned = stripMarker(text);
  return typedBookingIntent(cleaned) || typedNoteIntent(cleaned);
};

const namesSpecificTarget = (question: string) => {
  const q = question.toLowerCase();
  for (const entry of experience) {
    const company = entry.company.toLowerCase();
    if (company.length > 2 && q.includes(company)) return true;
  }
  for (const project of projects) {
    const title = project.title.toLowerCase();
    const slug = project.slug.toLowerCase();
    if (title.length > 4 && q.includes(title)) return true;
    if (slug.length > 4 && q.includes(slug)) return true;
    const spaced = slug.replaceAll("-", " ");
    if (spaced.length > 4 && q.includes(spaced)) return true;
  }
  return false;
};

const broadExperienceQuestion = (text: string) =>
  broadExperiencePattern.test(text);

export const shouldShowWorkCards = (text: string) => {
  if (wantsBookOrNote(text)) return false;
  const cleaned = stripMarker(text).trim();
  if (!cleaned) return false;
  if (namesSpecificTarget(cleaned)) return false;
  if (cleaned === EXPERIENCE_QUESTION) return true;
  return broadExperienceQuestion(cleaned);
};

export const featuredWorkCardProjects = (): Project[] =>
  featuredProjectSlugs.flatMap((slug) => {
    const project = getProjectBySlug(slug);
    if (!project?.image) return [];
    return [project];
  });

export const workCardSlugsForUserText = (text: string) =>
  shouldShowWorkCards(text)
    ? featuredWorkCardProjects().map((project) => project.slug)
    : [];

export const precedingUserText = ({
  messageId,
  messages,
}: {
  messageId: string;
  messages: readonly {
    id: string;
    parts: readonly { type: string; text?: string }[];
    role: string;
  }[];
}) => {
  const index = messages.findIndex((message) => message.id === messageId);
  if (index <= 0) return "";
  for (let i = index - 1; i >= 0; i--) {
    const message = messages[i];
    if (message.role !== "user") continue;
    return message.parts
      .flatMap((part) => (part.type === "text" && part.text ? [part.text] : []))
      .join("\n");
  }
  return "";
};
