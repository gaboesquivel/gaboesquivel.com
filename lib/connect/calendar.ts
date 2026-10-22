import { calendarId, googleAccessToken } from "./calendar-auth";

export interface BusyInterval {
  end: number;
  start: number;
}

export interface CalendarClient {
  freeBusy: (input: {
    timeMax: string;
    timeMin: string;
  }) => Promise<BusyInterval[]>;
  get: (input: { eventId: string }) => Promise<{ id: string } | null>;
  insert: (input: {
    event: Record<string, unknown>;
    eventId?: string;
    requestId: string;
  }) => Promise<{ id: string }>;
}

const googleFetch = async ({ body, path }: { body: unknown; path: string }) => {
  const token = await googleAccessToken();
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3${path}`,
    {
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as {
      error?: { errors?: { reason?: string }[] };
    };
    const reason = payload.error?.errors?.[0]?.reason ?? "unknown";
    throw new Error(`calendar-request:${reason}`);
  }
  return response.json() as Promise<unknown>;
};

const busyForCalendar = ({
  calendars,
  id,
}: {
  calendars?: Record<string, { busy?: { end?: string; start?: string }[] }>;
  id: string;
}) => {
  const blocks = calendars?.[id]?.busy ?? [];
  return blocks.flatMap((block) => {
    if (!block.start || !block.end) return [];
    return [{ end: Date.parse(block.end), start: Date.parse(block.start) }];
  });
};

export const googleCalendar = (): CalendarClient => {
  const id = calendarId();
  const calendarPath = encodeURIComponent(id);

  return {
    freeBusy: async ({ timeMax, timeMin }) => {
      const payload = (await googleFetch({
        body: { items: [{ id }], timeMax, timeMin },
        path: "/freeBusy",
      })) as {
        calendars?: Record<
          string,
          { busy?: { end?: string; start?: string }[] }
        >;
      };
      return busyForCalendar({ calendars: payload.calendars, id });
    },
    get: async ({ eventId }) => {
      try {
        const token = await googleAccessToken();
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarPath}/events/${encodeURIComponent(eventId)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            method: "GET",
          }
        );
        if (response.status === 404) return null;
        if (!response.ok) throw new Error("calendar-get");
        const payload = (await response.json()) as { id?: string };
        return payload.id ? { id: payload.id } : null;
      } catch {
        return null;
      }
    },
    insert: async ({ event, eventId }) => {
      const payload = (await googleFetch({
        body: eventId ? { ...event, id: eventId } : event,
        path: `/calendars/${calendarPath}/events?sendUpdates=all&conferenceDataVersion=1`,
      })) as { id?: string };
      if (!payload.id) throw new Error("calendar-insert");
      return { id: payload.id };
    },
  };
};

export const eventBody = ({
  description,
  duration,
  email,
  name,
  requestId,
  start,
}: {
  description: string;
  duration: number;
  email: string;
  name: string;
  requestId: string;
  start: string;
}) => {
  const end = new Date(Date.parse(start) + duration * 60_000).toISOString();
  return {
    attendees: [{ email }],
    conferenceData: {
      createRequest: {
        conferenceSolutionKey: { type: "hangoutsMeet" },
        requestId,
      },
    },
    description: `${description}\n\n${duration} minutes`,
    end: { dateTime: end },
    start: { dateTime: start },
    summary: `Call with ${name}`,
  };
};
