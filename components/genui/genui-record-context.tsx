"use client";

import type { PublicRecord } from "lib/genui/envelope";
import { createContext, useCallback, useContext, useMemo } from "react";
import type { ReactNode } from "react";

const GenuiRecordContext = createContext<PublicRecord[] | null>(null);

export const GenuiRecordProvider = ({
  children,
  records,
}: {
  children: ReactNode;
  records: PublicRecord[];
}) => {
  const value = useMemo(() => records, [records]);
  return (
    <GenuiRecordContext.Provider value={value}>
      {children}
    </GenuiRecordContext.Provider>
  );
};

export const useGenuiRecords = () => {
  const records = useContext(GenuiRecordContext);
  return records ?? [];
};

export const resolveGenuiRecord = ({
  id,
  records,
}: {
  id: string;
  records: PublicRecord[];
}) => records.find((record) => record.id === id);

export const useResolveGenuiRecord = (id: string) => {
  const records = useGenuiRecords();
  return useCallback(
    () => resolveGenuiRecord({ id, records }),
    [id, records]
  )();
};
