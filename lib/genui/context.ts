import type { PublicRecord } from "./envelope";

export const buildEvidencePacket = ({
  query,
  records,
}: {
  query: string;
  records: PublicRecord[];
}) => ({
  query,
  records: records.map((record) => ({
    id: record.id,
    kind: record.kind,
    title: record.title,
    url: record.url,
  })),
});
