import { markdownSiblingPath } from "./markdown-sibling";

const PRODUCES = ["text/html", "text/markdown"] as const;

interface AcceptEntry {
  type: string;
  q: number;
  specificity: number;
}

const parseAccept = (header: string): AcceptEntry[] =>
  header.split(",").map((raw) => {
    const parts = raw
      .trim()
      .split(";")
      .map((s) => s.trim());
    const type = parts[0].toLowerCase();
    let q = 1;
    for (const param of parts.slice(1)) {
      const [name, value] = param.split("=").map((s) => s.trim());
      if (name === "q") {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) {
          q = Math.max(0, Math.min(1, parsed));
        }
      }
    }
    const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
    return { q, specificity, type };
  });

const matches = (entry: AcceptEntry, candidate: string) => {
  if (entry.type === "*/*") {
    return true;
  }
  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1));
  }
  return entry.type === candidate;
};

export const preferredContentType = (header: string | null) => {
  if (!header) {
    return PRODUCES[0];
  }
  const entries = parseAccept(header);
  if (entries.length === 0) {
    return PRODUCES[0];
  }

  let bestType: string | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    for (let idx = 0; idx < entries.length; idx++) {
      const entry = entries[idx];
      if (!matches(entry, candidate)) {
        continue;
      }
      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = entry;
        matchedPosition = idx;
      }
    }
    if (matched === null) {
      continue;
    }
    if (matched.q <= 0) {
      continue;
    }

    if (
      matched.q > bestQ ||
      (matched.q === bestQ && matchedPosition < bestPosition)
    ) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
};

export const appendVaryAccept = (headers: Headers) => {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  const tokens = existing.split(",").map((s) => s.trim().toLowerCase());
  if (!tokens.includes("accept")) {
    headers.set("Vary", `${existing}, Accept`);
  }
};

export const markdownResponseHeaders = () => ({
  "Cache-Control": "s-maxage=60, stale-while-revalidate=86400",
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
});

export const markdownAlternateLinkHeader = (
  headers: Headers,
  pathname: string
) => {
  const href = markdownSiblingPath(pathname);
  const linkValue = `<${href}>; rel="alternate"; type="text/markdown"`;
  const existing = headers.get("Link");
  headers.set("Link", existing ? `${existing}, ${linkValue}` : linkValue);
};
