export const noteSubject = ({ name }: { name: string }) =>
  `Note from ${name.trim()}`;

const safeHref = ({ href }: { href: string }) => {
  const trimmed = href.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.href;
  } catch {
    return null;
  }
};

export interface NoteSegment {
  href?: string;
  text: string;
}

const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|https?:\/\/[^\s<]+/g;

export const noteMessageLines = ({ text }: { text: string }) =>
  text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) =>
      paragraph.split("\n").map((line) => noteMessageSegments({ text: line }))
    );

export const noteMessageSegments = ({ text }: { text: string }) => {
  const segments: NoteSegment[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) segments.push({ text: text.slice(last, index) });
    const markdownLabel = match[1];
    const markdownHref = match[2];
    if (markdownLabel && markdownHref) {
      const href = safeHref({ href: markdownHref });
      segments.push(href ? { href, text: markdownLabel } : { text: match[0] });
    } else {
      const raw = match[0].replace(/[.,;:!?]+$/, "");
      const trailing = match[0].slice(raw.length);
      const href = safeHref({ href: raw });
      if (href) {
        segments.push({ href, text: raw });
        if (trailing) segments.push({ text: trailing });
      } else segments.push({ text: match[0] });
    }
    last = index + match[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last) });
  return segments;
};

const escapeHtml = ({ text }: { text: string }) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const segmentHtml = (segment: NoteSegment) => {
  const label = escapeHtml({ text: segment.text });
  if (!segment.href) return label;
  const href = escapeHtml({ text: segment.href });
  return `<a href="${href}">${label}</a>`;
};

export const noteEmailText = ({
  description,
  email,
  name,
}: {
  description: string;
  email: string;
  name: string;
}) =>
  `Title: ${name.trim()}\n${email.trim()}\nSubject: ${noteSubject({ name })}\n\nMessage:\n${description.trim()}`;

export const noteEmailHtml = ({
  description,
  email,
  name,
}: {
  description: string;
  email: string;
  name: string;
}) => {
  const message = noteMessageLines({ text: description.trim() })
    .map(
      (paragraph) =>
        `<p>${paragraph
          .map(
            (line, index) =>
              `${index > 0 ? "<br>" : ""}${line.map(segmentHtml).join("")}`
          )
          .join("")}</p>`
    )
    .join("");
  return `<p><strong>Title:</strong> ${escapeHtml({ text: name.trim() })}</p><p>${escapeHtml({ text: email.trim() })}</p><p><strong>Subject:</strong> ${escapeHtml({ text: noteSubject({ name }) })}</p><p><strong>Message:</strong></p>${message}`;
};
