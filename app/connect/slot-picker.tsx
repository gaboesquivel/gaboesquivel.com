"use client";

import type { Spec } from "@json-render/core";
import {
  Renderer,
  StateProvider,
  useStateStore,
  useStateValue,
} from "@json-render/react";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { chipClass } from "./chat-styles";

const formatTime = ({ iso, timeZone }: { iso: string; timeZone: string }) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hourCycle: "h23",
    minute: "2-digit",
    timeZone,
  }).format(new Date(iso));

const formatDay = ({ iso, timeZone }: { iso: string; timeZone: string }) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone,
    weekday: "short",
  }).format(new Date(iso));

const Duration = () => {
  const selected = useStateValue<number>("/duration");
  const { set } = useStateStore();
  return (
    <fieldset className="flex flex-wrap gap-2">
      <legend className="mb-2 text-sm text-neutral-400">Duration</legend>
      {[15, 30].map((choice) => (
        <label
          className="flex min-h-11 items-center gap-2 rounded-md border border-hairline px-3"
          key={choice}
        >
          <input
            checked={selected === choice}
            className="accent-accent"
            name="duration"
            onChange={() => set("/duration", choice)}
            type="radio"
            value={choice}
          />
          {choice} minutes
        </label>
      ))}
    </fieldset>
  );
};

const Days = () => {
  const days = useStateValue<string[]>("/days") ?? [];
  const selected = useStateValue<string | null>("/day");
  const timeZone = useStateValue<string>("/timeZone") ?? "UTC";
  const slots =
    useStateValue<Record<string, Record<string, string[]>>>("/slots") ?? {};
  const { set } = useStateStore();
  return (
    <div aria-label="Day" className="flex flex-wrap gap-2" role="group">
      {days.map((day) => {
        const sample = slots["15"]?.[day]?.[0] ?? slots["30"]?.[day]?.[0] ?? "";
        return (
          <button
            aria-pressed={selected === day}
            className={cn(
              chipClass,
              selected === day && "border-accent text-accent"
            )}
            key={day}
            onClick={() => set("/day", day)}
            type="button"
          >
            {sample ? formatDay({ iso: sample, timeZone }) : day}
          </button>
        );
      })}
    </div>
  );
};

const PickContext = createContext<
  (input: { duration: 15 | 30; start: string }) => void
>(() => {
  return;
});

const Times = () => {
  const onPick = useContext(PickContext);
  const duration = useStateValue<number>("/duration");
  const day = useStateValue<string | null>("/day");
  const timeZone = useStateValue<string>("/timeZone") ?? "UTC";
  const slots =
    useStateValue<Record<string, Record<string, string[]>>>("/slots") ?? {};
  if (duration !== 15 && duration !== 30) {
    return <p className="text-sm text-neutral-400">Choose 15 or 30 minutes.</p>;
  }
  const starts = (day ? slots[String(duration)]?.[day] : []) ?? [];
  return (
    <div aria-label="Time" className="flex flex-col gap-2" role="group">
      {starts.map((start) => {
        const time = formatTime({ iso: start, timeZone });
        return (
          <button
            className={chipClass}
            key={start}
            onClick={() => onPick({ duration, start })}
            type="button"
          >
            {duration} min {time}
          </button>
        );
      })}
    </div>
  );
};

const Stack = ({ children }: { children?: ReactNode }) => (
  <div className="flex flex-col gap-4">{children}</div>
);

const registry = { Days, Duration, Stack, Times };

export function SlotPicker({
  onPick,
  spec,
}: {
  onPick: (input: { duration: 15 | 30; start: string }) => void;
  spec: Spec;
}) {
  return (
    <PickContext.Provider value={onPick}>
      <StateProvider initialState={spec.state ?? {}}>
        <Renderer registry={registry} spec={spec} />
      </StateProvider>
    </PickContext.Provider>
  );
}
