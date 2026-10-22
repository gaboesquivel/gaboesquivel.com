import { editorialGrid12, interiorSectionGap } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

type ColSpan = 4 | 5 | 6 | 7 | 8;

const spanClass: Record<ColSpan, string> = {
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
};

const textStartWhenMediaRight: Record<ColSpan, string> = {
  4: "lg:col-start-1",
  5: "lg:col-start-1",
  6: "lg:col-start-1",
  7: "lg:col-start-1",
  8: "lg:col-start-3",
};

const textStartWhenMediaLeft: Record<ColSpan, string> = {
  4: "lg:col-start-9",
  5: "lg:col-start-8",
  6: "lg:col-start-7",
  7: "lg:col-start-6",
  8: "lg:col-start-5",
};

const mediaStartWhenMediaRight: Record<ColSpan, string> = {
  4: "lg:col-start-9",
  5: "lg:col-start-8",
  6: "lg:col-start-7",
  7: "lg:col-start-6",
  8: "lg:col-start-5",
};

const mediaStartWhenMediaLeft: Record<ColSpan, string> = {
  4: "lg:col-start-1",
  5: "lg:col-start-1",
  6: "lg:col-start-1",
  7: "lg:col-start-1",
  8: "lg:col-start-1",
};

export function SplitSection({
  children,
  className,
  align = "start",
}: {
  children: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}) {
  return (
    <section
      className={cn(
        interiorSectionGap,
        editorialGrid12,
        align === "center" && "items-center",
        align === "end" && "items-end",
        className
      )}
    >
      {children}
    </section>
  );
}

const textOrder = (mediaPosition: "left" | "right") =>
  mediaPosition === "right" ? "order-1" : "order-1 lg:order-2";

const mediaOrder = (mediaPosition: "left" | "right") =>
  mediaPosition === "right" ? "order-2" : "order-2 lg:order-1";

export function SplitSectionContent({
  children,
  className,
  mediaPosition = "right",
  span = 5,
}: {
  children: ReactNode;
  className?: string;
  mediaPosition?: "left" | "right";
  span?: ColSpan;
}) {
  return (
    <div
      className={cn(
        "min-w-0",
        spanClass[span],
        mediaPosition === "right"
          ? textStartWhenMediaRight[span]
          : textStartWhenMediaLeft[span],
        textOrder(mediaPosition),
        className
      )}
    >
      {children}
    </div>
  );
}

export function SplitSectionMedia({
  children,
  className,
  mediaPosition = "right",
  span = 6,
}: {
  children: ReactNode;
  className?: string;
  mediaPosition?: "left" | "right";
  span?: ColSpan;
}) {
  const mediaStart =
    mediaPosition === "right"
      ? mediaStartWhenMediaRight[span]
      : mediaStartWhenMediaLeft[span];

  return (
    <div
      className={cn(
        "min-w-0",
        spanClass[span],
        mediaStart,
        mediaOrder(mediaPosition),
        className
      )}
    >
      {children}
    </div>
  );
}
