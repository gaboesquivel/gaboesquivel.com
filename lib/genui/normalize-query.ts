export const normalizeGenuiQuery = (query: string) =>
  query
    .trim()
    .toLowerCase()
    .replace(/[.?!]+$/g, "")
    .replace(/\s+/g, " ");
