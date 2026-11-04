import { GENUI_MAX_VIEW_BLOCKS, isViewBlockName } from "../dataset";
import type { ViewBlockName } from "../dataset";

export interface ViewBlock {
  props: Record<string, unknown>;
  typeName: ViewBlockName;
}

export const parseViewBlocks = (
  raw: unknown
): { blocks: ViewBlock[]; ok: true } | { ok: false } => {
  if (!Array.isArray(raw)) return { ok: false };
  if (raw.length < 1 || raw.length > GENUI_MAX_VIEW_BLOCKS)
    return { ok: false };
  const blocks: ViewBlock[] = [];
  for (const item of raw) {
    if (
      !item ||
      typeof item !== "object" ||
      (item as { type?: string }).type !== "element"
    ) {
      return { ok: false };
    }
    const { props, typeName } = item as {
      props?: Record<string, unknown>;
      typeName?: unknown;
    };
    if (!isViewBlockName(typeName) || !props) return { ok: false };
    blocks.push({ props, typeName });
  }
  return { blocks, ok: true };
};
