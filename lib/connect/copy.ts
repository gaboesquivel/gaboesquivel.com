export const BOOKING_CAP =
  "2 bookings today. Nothing was booked. Use gaboesquivel.com/cal.";

export const NOTE_CAP = "5 notes today. Nothing was sent.";

export const CHAT_CAP = "30 messages today. The limit resets tomorrow.";

export const CALENDAR_FAILED =
  "The calendar did not book that time. Nothing was booked.";

export const EMAIL_FAILED = "The note did not send. Nothing was sent.";

export const BUSY_SLOT = "That time is busy. Nothing was booked.";

export const STORE_UNAVAILABLE_BOOK =
  "The booking store is unavailable. Nothing was booked.";

export const STORE_UNAVAILABLE_NOTE =
  "The note store is unavailable. Nothing was sent.";

export const STORE_UNAVAILABLE_CHAT =
  "The conversation is unavailable. Nothing was sent.";

export const NOTE_FORM_LEAD =
  "I'm ready to take a note. What would you like to discuss?";

export const STREAM_FAILED =
  "The reply stopped. The text above is what arrived. Send again to retry.";

export const CALENDAR_UNCONNECTED =
  "The calendar is not connected. Open times are not available.";

export const SLOTS_FAILED =
  "The calendar did not return open times. Nothing was booked.";

export const slotsMessageForError = (error: unknown) => {
  const message = error instanceof Error ? error.message : "";
  if (message === "calendar-unconfigured") return CALENDAR_UNCONNECTED;
  if (
    message === "calendar-token" ||
    message.startsWith("calendar-token:") ||
    message === "calendar-request" ||
    message.startsWith("calendar-request:")
  ) {
    return SLOTS_FAILED;
  }
  return SLOTS_FAILED;
};

export const NO_SLOTS =
  "Nothing is open on weekdays between 9:00 and 17:00 America/Denver. Nothing was booked. Use gaboesquivel.com/cal.";

export const ZONE_NEEDED =
  "Which time zone should I use for that time? I will not assume Denver.";

export const ALREADY_BOOKED = "That call is already booked.";
