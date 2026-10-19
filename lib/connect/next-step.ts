export const splitNext = (text: string) => {
  const match =
    text.match(/\nNEXT:\s*([a-z ]+)\s*$/i) ??
    text.match(/^NEXT:\s*([a-z ]+)\s*$/i);
  if (!match || match.index === undefined) {
    return { next: [] as ("book" | "pass" | "send")[], text };
  }
  const next = match[1]
    .toLowerCase()
    .split(/\s+/)
    .filter(
      (token): token is "book" | "pass" | "send" =>
        token === "book" || token === "send" || token === "pass"
    )
    .slice(0, 2);
  return { next, text: text.slice(0, match.index).trim() };
};
