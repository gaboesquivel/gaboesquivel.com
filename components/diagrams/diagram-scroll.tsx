import { diagramScroll } from "components/shared/spacing";
import type { ReactNode } from "react";

export function DiagramScroll({ children }: { children: ReactNode }) {
  return <div className={diagramScroll}>{children}</div>;
}
