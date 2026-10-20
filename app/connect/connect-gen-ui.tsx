import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

import { enter } from "./chat-styles";

export const ConnectCard = ({
  "aria-live": ariaLive,
  children,
  className,
  title,
}: {
  "aria-live"?: "polite" | "assertive" | "off";
  children: ReactNode;
  className?: string;
  title?: string;
}) => (
  <section aria-live={ariaLive}>
    <Card
      className={cn(
        `flex w-full max-w-md flex-col gap-3 p-4 ${enter}`,
        className
      )}
    >
      {title ? (
        <h2 className="text-sm font-semibold tracking-tight text-white">
          {title}
        </h2>
      ) : null}
      {children}
    </Card>
  </section>
);

export const ConnectHint = ({ children }: { children: ReactNode }) => (
  <p className="text-sm text-neutral-400">{children}</p>
);

export const ConnectActions = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap gap-2">{children}</div>
);

export const ConnectPrimaryButton = ({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    size="site"
    type="button"
    variant="siteAccent"
  >
    {children}
  </Button>
);

export const ConnectSecondaryButton = ({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    size="site"
    type="button"
    variant="siteQuiet"
  >
    {children}
  </Button>
);

export const DurationToggle = ({
  onChange,
  value,
}: {
  onChange: (duration: 15 | 30) => void;
  value: 15 | 30;
}) => (
  <fieldset className="flex flex-wrap items-center gap-2">
    <legend className="sr-only">Duration</legend>
    <span className="text-sm text-neutral-400">Duration</span>
    <ToggleGroup
      onValueChange={(next) => {
        const picked = next[0];
        if (picked === "15") onChange(15);
        if (picked === "30") onChange(30);
      }}
      value={[String(value)]}
      variant="chip"
    >
      {([15, 30] as const).map((choice) => (
        <ToggleGroupItem
          className="min-w-16 text-center tabular-nums"
          key={choice}
          value={String(choice)}
        >
          {choice} min
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  </fieldset>
);
