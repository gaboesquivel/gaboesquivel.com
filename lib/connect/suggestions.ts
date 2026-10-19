import { EXPERIENCE_QUESTION } from "./intent";

export const visitorTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const connectSuggestionMessage = (
  kind: "book" | "experience" | "fit" | "note"
) => {
  const zone = visitorTimeZone();
  if (kind === "book") return `[site:book ${zone}]\nBook a call`;
  if (kind === "note") return `[site:note ${zone}]\nSend a note`;
  if (kind === "fit") return `[site:ask ${zone}]\nDiscuss a project`;
  return EXPERIENCE_QUESTION;
};

export const CONNECT_SUGGESTIONS = [
  { id: "fit" as const, label: "Discuss a project" },
  { id: "experience" as const, label: "Explore my work" },
  { id: "note" as const, label: "Send a note" },
  { id: "book" as const, label: "Book a call" },
];
