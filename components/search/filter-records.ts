import type { SearchRecord } from "components/search/types";

export const filterSearchRecords = (records: SearchRecord[], query: string) => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return records
    .filter((record) => {
      const haystack = `${record.title} ${record.description}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    })
    .slice(0, 8);
};
