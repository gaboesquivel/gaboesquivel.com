import type { CSSProperties, ElementType } from "react";
import { memo } from "react";

import { cn } from "@/lib/utils";

export interface TextShimmerProps {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  spread?: number;
}

const ShimmerComponent = ({
  children,
  as: Component = "p",
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) => (
  <Component
    className={cn("text-shimmer", className)}
    style={
      {
        "--shimmer-duration": `${duration}s`,
        "--spread": `${(children?.length ?? 0) * spread}px`,
      } as CSSProperties
    }
  >
    {children}
  </Component>
);

export const Shimmer = memo(ShimmerComponent);
