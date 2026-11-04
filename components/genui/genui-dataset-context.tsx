"use client";

import type { GenuiDataset } from "lib/genui/dataset";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

const noDatasets: GenuiDataset[] = [];

const GenuiDatasetContext = createContext<GenuiDataset[]>(noDatasets);

export const GenuiDatasetProvider = ({
  children,
  datasets,
}: {
  children: ReactNode;
  datasets: GenuiDataset[] | undefined;
}) => (
  <GenuiDatasetContext.Provider value={datasets ?? noDatasets}>
    {children}
  </GenuiDatasetContext.Provider>
);

export const useGenuiDataset = (id: string) =>
  useContext(GenuiDatasetContext).find((dataset) => dataset.id === id) ?? null;
