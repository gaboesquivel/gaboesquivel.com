export const formatSlotSelectionLine = ({
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
