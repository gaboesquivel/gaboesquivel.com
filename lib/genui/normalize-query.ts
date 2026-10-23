export const normalizeGenuiQuery = (query: string) =>
  query.trim().toLowerCase().replace(/\s+/g, " ");
