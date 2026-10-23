"use client";

import { createContext, useContext, useMemo, useState } from "react";

export interface ActionReceipt {
  message: string;
  receiptId?: string;
}

const GenuiInteractionContext = createContext<{
  receipt: ActionReceipt | null;
  setReceipt: (receipt: ActionReceipt | null) => void;
  writesEnabled: boolean;
} | null>(null);

export const GenuiInteractionProvider = ({
  children,
  writesEnabled,
}: {
  children: React.ReactNode;
  writesEnabled: boolean;
}) => {
  const [receipt, setReceipt] = useState<ActionReceipt | null>(null);
  const value = useMemo(
    () => ({ receipt, setReceipt, writesEnabled }),
    [receipt, writesEnabled]
  );
  return (
    <GenuiInteractionContext.Provider value={value}>
      {children}
    </GenuiInteractionContext.Provider>
  );
};

export const useGenuiInteraction = () => {
  const value = useContext(GenuiInteractionContext);
  if (!value) {
    return {
      receipt: null,
      setReceipt: () => {},
      writesEnabled: false,
    };
  }
  return value;
};
