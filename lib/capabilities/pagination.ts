export const paginate = <T>({
  cursor,
  items,
  limit,
}: {
  cursor?: string;
  items: T[];
  limit: number;
}) => {
  const offset = cursor ? Number.parseInt(cursor, 10) : 0;
  if (!Number.isFinite(offset) || offset < 0) {
    return { error: "Invalid cursor." as const };
  }
  const slice = items.slice(offset, offset + limit);
  const next = offset + limit < items.length ? String(offset + limit) : null;
  return { items: slice, nextCursor: next };
};
