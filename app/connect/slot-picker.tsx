"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SlotState } from "@/lib/connect/compose";
import { BOOK_SLOT_LEAD } from "@/lib/connect/copy";
import {
  addCalendarDays,
  filterFutureStarts,
  formatSlotSelectionLine,
  rebucketSlots,
  sortedDays,
  startOfWeek,
  timeZoneOptions,
  upcomingAppointments,
  visitorDayKey,
  weekDayRange,
} from "@/lib/connect/slot-display";
import { zonedInstant } from "@/lib/connect/slots";
import { cn } from "@/lib/utils";

import { enter } from "./chat-styles";
import {
  ConnectEmailField,
  ConnectNameField,
  ConnectTopicField,
  contactValid,
} from "./connect-fields";
import {
  ConnectActions,
  ConnectCard,
  ConnectHint,
  ConnectPrimaryButton,
  ConnectSecondaryButton,
  DurationToggle,
} from "./connect-gen-ui";

const EMPTY_SLOTS: SlotState["slots"] = { "15": {}, "30": {} };

const formatTime = ({ iso, timeZone }: { iso: string; timeZone: string }) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hourCycle: "h23",
    minute: "2-digit",
    timeZone,
  }).format(new Date(iso));

const formatDayLabel = ({ date, timeZone }: { date: Date; timeZone: string }) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone,
    weekday: "short",
  }).format(date);

const TimeButton = ({
  duration,
  iso,
  onPick,
  timeZone,
}: {
  duration: 15 | 30;
  iso: string;
  onPick: (input: { duration: 15 | 30; start: string }) => void;
  timeZone: string;
}) => (
  <Button
    className="tabular-nums"
    onClick={() => onPick({ duration, start: iso })}
    size="site"
    type="button"
    variant="siteQuiet"
  >
    {formatTime({ iso, timeZone })}
  </Button>
);

const BookingScheduler = ({
  initialState,
  lockedSummary,
  onContinue,
}: {
  initialState: SlotState;
  lockedSummary?: string | null;
  onContinue: (input: {
    description: string;
    duration: 15 | 30;
    email: string;
    name: string;
    start: string;
    timeZone: string;
  }) => void;
}) => {
  const rawSlots = initialState.slots;
  const storedZone = initialState.timeZone || "UTC";
  const [duration, setDuration] = useState<15 | 30>(
    initialState.duration === 15 || initialState.duration === 30
      ? initialState.duration
      : 30
  );
  const [displayZone, setDisplayZone] = useState(storedZone);
  const [expanded, setExpanded] = useState(false);
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek({
      date: new Intl.DateTimeFormat("en-CA", {
        timeZone: displayZone,
      }).format(new Date()),
      timeZone: displayZone,
    })
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [phase, setPhase] = useState<"details" | "schedule">("schedule");
  const [selection, setSelection] = useState<{
    duration: 15 | 30;
    start: string;
  } | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const slots = useMemo(
    () =>
      rebucketSlots({
        slots: rawSlots ?? EMPTY_SLOTS,
        timeZone: displayZone,
      }),
    [displayZone, rawSlots]
  );

  const durationBucket = duration === 30 ? "30" : "15";

  const days = sortedDays(slots, duration);
  const activeDay =
    selectedDay && days.includes(selectedDay) ? selectedDay : (days[0] ?? null);

  const futureByDay = useMemo(() => {
    const byDay: Record<string, string[]> = {};
    for (const day of Object.keys(slots[durationBucket])) {
      byDay[day] = filterFutureStarts({
        now,
        starts: slots[durationBucket][day] ?? [],
      });
    }
    return byDay;
  }, [durationBucket, now, slots]);

  const compact = useMemo(
    () =>
      upcomingAppointments({
        duration,
        limit: 5,
        now,
        slots: rawSlots ?? EMPTY_SLOTS,
        timeZone: displayZone,
      }),
    [displayZone, duration, now, rawSlots]
  );

  const weekDays = useMemo(
    () => weekDayRange({ timeZone: displayZone, weekStart }),
    [displayZone, weekStart]
  );

  const weekSlots = useMemo(
    () =>
      weekDays.flatMap((day) =>
        (futureByDay[day] ?? []).map((start) => ({ day, start }))
      ),
    [futureByDay, weekDays]
  );

  const pickTime = (input: { duration: 15 | 30; start: string }) => {
    setSelection(input);
    setPhase("details");
  };

  const changeZone = (next: string) => {
    setDisplayZone(next);
  };

  const slotStillOpen =
    selection &&
    (
      futureByDay[
        visitorDayKey({ iso: selection.start, timeZone: displayZone })
      ] ?? []
    ).includes(selection.start);

  const detailsValid =
    selection && contactValid({ description, email, name }) && slotStillOpen;

  if (lockedSummary) {
    return (
      <ConnectCard aria-live="polite" title="Pick a time">
        <ConnectHint>
          Time selected. Continue in the booking card below.
        </ConnectHint>
        <p className="text-sm text-white tabular-nums">{lockedSummary}</p>
      </ConnectCard>
    );
  }

  if (phase === "details" && selection) {
    return (
      <ConnectCard title="Book a call">
        <ConnectHint>{BOOK_SLOT_LEAD}</ConnectHint>
        <p className="text-sm text-white tabular-nums">
          {formatSlotSelectionLine({
            duration: selection.duration,
            start: selection.start,
            timeZone: displayZone,
          })}
        </p>
        {slotStillOpen ? null : (
          <p className="text-sm text-red-400" role="alert">
            That time is no longer available. Pick another slot.
          </p>
        )}
        <ConnectNameField onChange={setName} value={name} />
        <ConnectEmailField onChange={setEmail} value={email} />
        <ConnectTopicField onChange={setDescription} value={description} />
        <ConnectActions>
          <ConnectPrimaryButton
            disabled={!detailsValid || submitted}
            onClick={() => {
              if (submitted || !detailsValid) return;
              setSubmitted(true);
              onContinue({
                description: description.trim(),
                duration: selection.duration,
                email: email.trim(),
                name: name.trim(),
                start: selection.start,
                timeZone: displayZone,
              });
            }}
          >
            Continue
          </ConnectPrimaryButton>
          <ConnectSecondaryButton
            onClick={() => {
              setPhase("schedule");
            }}
          >
            Change time
          </ConnectSecondaryButton>
        </ConnectActions>
      </ConnectCard>
    );
  }

  return (
    <ConnectCard title="Pick a time">
      <DurationToggle
        onChange={(next) => {
          setDuration(next);
          setSelection(null);
        }}
        value={duration}
      />
      <Field>
        <FieldLabel htmlFor="connect-timezone">Times shown in</FieldLabel>
        <Select
          onValueChange={(zone) => {
            if (zone) changeZone(zone);
          }}
          value={displayZone}
        >
          <SelectTrigger
            className="min-h-11 w-full px-3"
            id="connect-timezone"
            size="default"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timeZoneOptions(storedZone).map((zone) => (
              <SelectItem key={zone} value={zone}>
                {zone.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {expanded ? (
        <>
          <div className="flex items-center justify-between gap-2">
            <ConnectSecondaryButton
              onClick={() =>
                setWeekStart(addCalendarDays({ date: weekStart, days: -7 }))
              }
            >
              Previous week
            </ConnectSecondaryButton>
            <ConnectSecondaryButton
              onClick={() =>
                setWeekStart(addCalendarDays({ date: weekStart, days: 7 }))
              }
            >
              Next week
            </ConnectSecondaryButton>
          </div>
          <div
            aria-label="Week days"
            className="flex flex-wrap gap-2"
            role="group"
          >
            {weekDays.map((day) => {
              const count = (futureByDay[day] ?? []).length;
              return (
                <Button
                  aria-pressed={activeDay === day}
                  className={cn(
                    activeDay === day && "border-accent text-accent",
                    count === 0 && "opacity-40"
                  )}
                  disabled={count === 0}
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  size="site"
                  type="button"
                  variant="siteQuiet"
                >
                  {formatDayLabel({
                    date: zonedInstant({
                      date: day,
                      time: "12:00",
                      timeZone: displayZone,
                    }),
                    timeZone: displayZone,
                  })}
                </Button>
              );
            })}
          </div>
          <div
            aria-label="Available times"
            className="grid grid-cols-2 gap-2 sm:grid-cols-3"
            role="group"
          >
            {(activeDay
              ? (futureByDay[activeDay] ?? [])
              : weekSlots.map((item) => item.start)
            ).map((start) => (
              <TimeButton
                duration={duration}
                iso={start}
                key={start}
                onPick={pickTime}
                timeZone={displayZone}
              />
            ))}
          </div>
          <ConnectSecondaryButton onClick={() => setExpanded(false)}>
            Show fewer times
          </ConnectSecondaryButton>
        </>
      ) : (
        <>
          <div
            aria-label="Next available times"
            className="flex flex-wrap gap-2"
            role="group"
          >
            {compact.length === 0 ? (
              <ConnectHint>No open times for this duration.</ConnectHint>
            ) : (
              compact.map((item) => (
                <Button
                  className="tabular-nums"
                  key={item.start}
                  onClick={() => pickTime(item)}
                  size="site"
                  type="button"
                  variant="siteQuiet"
                >
                  {formatDayLabel({
                    date: new Date(item.start),
                    timeZone: displayZone,
                  })}{" "}
                  {formatTime({ iso: item.start, timeZone: displayZone })}
                </Button>
              ))
            )}
          </div>
          {days.length > 0 ? (
            <ConnectSecondaryButton
              onClick={() => {
                if (activeDay) {
                  setWeekStart(
                    startOfWeek({ date: activeDay, timeZone: displayZone })
                  );
                }
                setExpanded(true);
              }}
            >
              More dates and times
            </ConnectSecondaryButton>
          ) : null}
        </>
      )}
    </ConnectCard>
  );
};

export function SlotPicker({
  initialState,
  lockedSummary,
  onPick,
}: {
  initialState: SlotState;
  lockedSummary?: string | null;
  onPick: (input: {
    description: string;
    duration: 15 | 30;
    email: string;
    name: string;
    start: string;
    timeZone: string;
  }) => void;
}) {
  return (
    <div className={enter}>
      <BookingScheduler
        initialState={initialState}
        lockedSummary={lockedSummary}
        onContinue={onPick}
      />
    </div>
  );
}
