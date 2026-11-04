import type { DatasetValue, GenuiDataset } from "lib/genui/dataset";
import { missingDatasetValue } from "lib/genui/dataset";

export const isMissing = (value: DatasetValue | undefined) =>
  value === null || value === undefined || value === "";

export const cellText = (value: DatasetValue | undefined) =>
  value === null || value === undefined || value === ""
    ? missingDatasetValue
    : String(value);

/** Row datasets cite one record per row, in order; grouped ones do not. */
export const rowHref = (dataset: GenuiDataset, index: number) => {
  if (dataset.recordIds.length !== dataset.rows.length) return null;
  const id = dataset.recordIds[index];
  return id?.startsWith("/project/") || id?.startsWith("/blog/") ? id : null;
};
