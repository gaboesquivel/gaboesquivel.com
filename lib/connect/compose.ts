import { NOTE_FORM_LEAD } from "./copy";

export interface SlotState {
  day: string | null;
  days: string[];
  duration: 15 | 30 | null;
  slots: Record<"15" | "30", Record<string, string[]>>;
  timeZone: string;
}

export interface NoteFormState {
  description: string;
  email: string;
  name: string;
}

export const emptyNoteFormState = (): NoteFormState => ({
  description: "",
  email: "",
  name: "",
});

export const initialNoteFormState = (state?: NoteFormState): NoteFormState =>
  state ?? emptyNoteFormState();

export const noteFormLead = () => NOTE_FORM_LEAD;

export const noteFormMessage = ({
  description,
  email,
  name,
  timeZone,
}: NoteFormState & { timeZone: string }) =>
  `[site:note ${timeZone}]\nName: ${name.trim()}\nEmail: ${email.trim()}\nDiscuss: ${description.trim()}`;

const bookTailPattern = /^Book (15|30) minutes starting (.+)\.$/;

export const bookFormMessage = ({
  description,
  duration,
  email,
  name,
  start,
  timeZone,
}: NoteFormState & {
  duration: 15 | 30;
  start: string;
  timeZone: string;
}) =>
  `[site:book ${timeZone}]\nName: ${name.trim()}\nEmail: ${email.trim()}\nDiscuss: ${description.trim()}\nBook ${duration} minutes starting ${start}.`;

const parseContactLines = (lines: string[]): NoteFormState | null => {
  if (lines.length < 3) return null;
  const nameMatch = lines[0]?.match(/^Name:\s*(.+)$/);
  const emailMatch = lines[1]?.match(/^Email:\s*(.+)$/);
  const discussLine = lines[2];
  if (!nameMatch || !emailMatch || !discussLine?.startsWith("Discuss: ")) {
    return null;
  }
  const description = [
    discussLine.slice("Discuss: ".length),
    ...lines.slice(3),
  ].join("\n");
  return {
    description: description.trim(),
    email: emailMatch[1].trim(),
    name: nameMatch[1].trim(),
  };
};

export const parseNoteFormPayload = (text: string): NoteFormState | null => {
  const marker = text.match(/\[site:note\s+[^\]]+\]\n?/);
  if (!marker) return null;
  return parseContactLines(text.slice(marker[0].length).split("\n"));
};

export const parseBookTimeZone = (text: string) => {
  const match = text.match(/\[site:book\s+([^\]]+)\]/);
  return match?.[1]?.trim() ?? "UTC";
};

export const parseBookFormPayload = (
  text: string
): (NoteFormState & { duration: 15 | 30; start: string }) | null => {
  const marker = text.match(/\[site:book\s+[^\]]+\]\n?/);
  if (!marker) return null;
  const lines = text.slice(marker[0].length).split("\n");
  if (lines.length < 4) return null;
  const tail = lines.at(-1)?.trim() ?? "";
  const bookMatch = tail.match(bookTailPattern);
  if (!bookMatch) return null;
  const duration = Number(bookMatch[1]);
  if (duration !== 15 && duration !== 30) return null;
  const contact = parseContactLines(lines.slice(0, -1));
  if (!contact) return null;
  return { ...contact, duration, start: bookMatch[2].trim() };
};

export const noteFormVisible = ({
  formDisabled,
  hasSendApproval,
  mode,
}: {
  formDisabled?: boolean;
  hasSendApproval: boolean;
  mode: "book" | "note" | null;
}) => mode === "note" && !hasSendApproval && !formDisabled;
