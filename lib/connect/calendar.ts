export interface BusyInterval {
  end: number;
  start: number;
}

export interface CalendarClient {
  freeBusy: (input: {
    timeMax: string;
    timeMin: string;
  }) => Promise<BusyInterval[]>;
  insert: (input: {
    event: Record<string, unknown>;
    requestId: string;
  }) => Promise<{ id: string }>;
}

interface TokenCache {
  token: string;
  expiresAt: number;
}

let cached: TokenCache | undefined;

const googleConfig = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;
  return { clientId, clientSecret, refreshToken };
};

const accessToken = async () => {
  const config = googleConfig();
  if (!config) throw new Error("calendar-unconfigured");
  if (cached && cached.expiresAt > Date.now() + 30_000) return cached.token;
  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "refresh_token",
    refresh_token: config.refreshToken,
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    body,
    method: "POST",
  });
  if (!response.ok) throw new Error("calendar-token");
  const payload = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!payload.access_token) throw new Error("calendar-token");
  cached = {
    expiresAt: Date.now() + (payload.expires_in ?? 3000) * 1000,
    token: payload.access_token,
  };
  return payload.access_token;
};

const googleFetch = async ({ body, path }: { body: unknown; path: string }) => {
  const token = await accessToken();
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
  if (!response.ok) throw new Error("calendar-request");
  return response.json() as Promise<unknown>;
};

export const googleCalendar = (): CalendarClient => ({
  freeBusy: async ({ timeMax, timeMin }) => {
    const payload = (await googleFetch({
      body: { items: [{ id: "primary" }], timeMax, timeMin },
      path: "/freeBusy",
    })) as {
      calendars?: { primary?: { busy?: { end?: string; start?: string }[] } };
    };
    return (payload.calendars?.primary?.busy ?? []).flatMap((block) => {
      if (!block.start || !block.end) return [];
      return [{ end: Date.parse(block.end), start: Date.parse(block.start) }];
    });
  },
  insert: async ({ event, requestId }) => {
    const payload = (await googleFetch({
      body: event,
      path: `/calendars/primary/events?sendUpdates=all&conferenceDataVersion=1`,
    })) as { id?: string };
    if (!payload.id) throw new Error("calendar-insert");
    return { id: payload.id || requestId };
  },
});

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
