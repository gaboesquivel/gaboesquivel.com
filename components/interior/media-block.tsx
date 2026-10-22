import { blockSpacing } from "components/shared/spacing";
import { cn } from "lib/utils";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

export function MediaBlock({
  src,
  alt,
  priority,
  aspect = "natural",
  className,
  objectClassName,
  children,
}: {
  src?: StaticImageData | string;
  alt?: string;
  priority?: boolean;
  aspect?: "portrait" | "landscape" | "square" | "natural";
  className?: string;
  objectClassName?: string;
  children?: ReactNode;
}) {
  const aspectClass =
    aspect === "portrait"
      ? "aspect-[3/4]"
      : aspect === "landscape"
        ? "aspect-[16/10]"
        : aspect === "square"
          ? "aspect-square"
          : "";

  if (children) {
    return (
      <div className={cn("relative w-full", blockSpacing, className)}>
        {children}
      </div>
    );
  }

  if (!src || !alt) return null;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg",
        aspectClass,
        !aspectClass && "h-auto",
        blockSpacing,
        className
      )}
    >
      <Image
        alt={alt}
        src={src}
        width={aspect === "portrait" ? 900 : 1200}
        height={aspect === "portrait" ? 1200 : 800}
        sizes="(max-width: 1023px) 100vw, min(42vw, 36rem)"
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        className={cn(
          "h-auto w-full rounded-lg",
          aspectClass ? "object-cover" : "object-contain",
          objectClassName
        )}
      />
    </div>
  );
}
