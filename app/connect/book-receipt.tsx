"use client";

import { Shimmer } from "@/components/ai-elements/shimmer";

import { enter } from "./chat-styles";
import { ConnectCard } from "./connect-gen-ui";

const formatWhen = ({
  duration,
  start,
  timeZone,
}: {
  duration: 15 | 30;
  start: string;
  timeZone: string;
}) => {
  const date = new Date(start);
  const day = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone,
    weekday: "short",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hourCycle: "h23",
    minute: "2-digit",
    timeZone,
  }).format(date);
  const zone = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;
  return `${duration} min · ${day} ${time}${zone ? ` ${zone}` : ""}`;
};

export function BookReceipt({
  description,
  duration,
  email,
  name,
  start,
  status,
  timeZone,
}: {
  description: string;
  duration: 15 | 30;
  email: string;
  name: string;
  start: string;
  status: { error: boolean; text: string };
  timeZone: string;
}) {
  const pending = !status.error && !/^booked\b/i.test(status.text);
  return (
    <ConnectCard
      aria-live="polite"
      className={enter}
      title={status.error ? "Booking" : pending ? "Booking" : "Call booked"}
    >
      {pending ? (
        <Shimmer className="text-sm text-neutral-400" duration={1}>
          {status.text}
        </Shimmer>
      ) : (
        <p
          className={`text-sm ${status.error ? "text-red-400" : "text-neutral-400"}`}
        >
          {status.text}
        </p>
      )}
      <dl className="flex flex-col gap-3 text-sm">
        <div>
          <dt className="text-neutral-400">When</dt>
          <dd className="tabular-nums">
            {formatWhen({ duration, start, timeZone })}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-400">Name</dt>
          <dd>{name}</dd>
          <dd className="text-neutral-400">{email}</dd>
        </div>
        <div>
          <dt className="text-neutral-400">Topic</dt>
          <dd className="whitespace-pre-wrap">{description}</dd>
        </div>
      </dl>
    </ConnectCard>
  );
}
