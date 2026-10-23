"use client";

import type { PublicRecord } from "lib/genui/envelope";
import { createContext, useContext, useMemo } from "react";
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
