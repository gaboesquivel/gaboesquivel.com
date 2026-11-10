"use client";

import { defaultCapabilityCaller } from "lib/genui/write-flow";
import type { CapabilityCaller } from "lib/genui/write-flow";
import { createContext, useContext, useMemo } from "react";

interface GenuiInteraction {
  callCapability: CapabilityCaller;
  writesEnabled: boolean;
}

const GenuiInteractionContext = createContext<GenuiInteraction | null>(null);

export const GenuiInteractionProvider = ({
  children,
  writesEnabled,
}: {
  children: React.ReactNode;
  writesEnabled: boolean;
}) => {
  const value = useMemo(
    () => ({ callCapability: defaultCapabilityCaller, writesEnabled }),
    [writesEnabled]
  );
  return (
    <GenuiInteractionContext.Provider value={value}>
      {children}
    </GenuiInteractionContext.Provider>
  );
};

export const useGenuiInteraction = (): GenuiInteraction => {
  const value = useContext(GenuiInteractionContext);
  if (!value) {
    return { callCapability: defaultCapabilityCaller, writesEnabled: false };
  }
  return value;
};
