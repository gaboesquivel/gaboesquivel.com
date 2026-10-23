export type NdjsonParseResult =
  | { ok: true; events: Record<string, unknown>[] }
  | { ok: false; error: "malformed_line" | "empty_stream"; line?: string };

const parseNdjsonLine = (
  line: string
): { ok: true; event: Record<string, unknown> } | { ok: false } => {
  try {
    return { ok: true, event: JSON.parse(line) as Record<string, unknown> };
  } catch {
    return { ok: false };
  }
};

export const parseNdjsonText = (text: string): NdjsonParseResult => {
  const events: Record<string, unknown>[] = [];
  const lines = text.split("\n");
  for (const line of lines) {
    if (!line.trim()) continue;
    const parsed = parseNdjsonLine(line);
    if (!parsed.ok) return { ok: false, error: "malformed_line", line };
    events.push(parsed.event);
  }
  if (!events.length) return { ok: false, error: "empty_stream" };
  return { ok: true, events };
};

export const consumeNdjsonResponse = async ({
  onEvent,
  response,
}: {
  onEvent: (event: Record<string, unknown>) => void;
  response: Response;
}) => {
  const reader = response.body?.getReader();
  if (!reader) return { ok: false as const, reason: "no_body" as const };
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.trim()) continue;
      const parsed = parseNdjsonLine(line);
      if (!parsed.ok) {
        return { ok: false as const, reason: "malformed_line" as const };
      }
      onEvent(parsed.event);
    }
  }
  const trailing = buffer.trim();
  if (trailing) {
    const parsed = parseNdjsonLine(trailing);
    if (!parsed.ok) {
      return { ok: false as const, reason: "malformed_line" as const };
    }
    onEvent(parsed.event);
  }
  return { ok: true as const };
};
