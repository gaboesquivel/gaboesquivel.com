import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { accentButton, chipClass, enter, quietButton } from "./chat-styles";

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
  <section
    aria-live={ariaLive}
    className={cn(
      `flex w-full max-w-md flex-col gap-3 rounded-lg border border-hairline p-4 ${enter}`,
      className
    )}
  >
    {title ? (
      <h2 className="text-sm font-semibold tracking-tight text-white">
        {title}
      </h2>
    ) : null}
    {children}
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
  <button
    className={accentButton}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
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
  <button
    className={quietButton}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
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
    {([15, 30] as const).map((choice) => (
      <button
        aria-pressed={value === choice}
        className={cn(
          chipClass,
          "min-w-16 text-center tabular-nums",
          value === choice && "border-accent text-accent"
        )}
        key={choice}
        onClick={() => onChange(choice)}
        type="button"
      >
        {choice} min
      </button>
    ))}
  </fieldset>
);
