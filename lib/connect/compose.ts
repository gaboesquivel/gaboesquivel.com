export interface SlotState {
  day: string | null;
  days: string[];
  duration: 15 | 30 | null;
  slots: Record<"15" | "30", Record<string, string[]>>;
  timeZone: string;
}

interface NoteFormState {
  description: string;
  email: string;
  name: string;
}

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
