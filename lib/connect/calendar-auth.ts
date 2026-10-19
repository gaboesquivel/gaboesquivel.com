import { createSign } from "node:crypto";

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

interface TokenCache {
  expiresAt: number;
  token: string;
}

let cached: TokenCache | undefined;

const base64url = (value: string) => Buffer.from(value).toString("base64url");

export const calendarScopes = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.freebusy",
].join(" ");

export const calendarJwtClaims = ({
  account,
  now = Math.floor(Date.now() / 1000),
  subject,
}: {
  account: ServiceAccount;
  now?: number;
  subject: string;
}) => ({
  aud: "https://oauth2.googleapis.com/token",
  exp: now + 3600,
  iat: now,
  iss: account.client_email,
  scope: calendarScopes,
  sub: subject,
});

export const calendarId = () => {
  const id = process.env.GOOGLE_CALENDAR_ID?.trim();
  if (!id) throw new Error("calendar-unconfigured");
  return id;
};

export const serviceAccount = (): ServiceAccount | null => {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (json) {
    const parsed = JSON.parse(json) as ServiceAccount;
    if (parsed.client_email && parsed.private_key) return parsed;
    return null;
  }
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );
  if (email && key) return { client_email: email, private_key: key };
  return null;
};

const signJwt = ({
  account,
  subject,
}: {
  account: ServiceAccount;
  subject: string;
}) => {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify(calendarJwtClaims({ account, now, subject }))
  );
  const unsigned = `${header}.${payload}`;
  const signature = createSign("RSA-SHA256")
    .update(unsigned)
    .sign(account.private_key, "base64url");
  return `${unsigned}.${signature}`;
};

const tokenFromServiceAccount = async ({
  account,
  subject,
}: {
  account: ServiceAccount;
  subject: string;
}) => {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    body: new URLSearchParams({
      assertion: signJwt({ account, subject }),
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    }),
    method: "POST",
  });
  const payload = (await response.json()) as {
    access_token?: string;
    error?: string;
    expires_in?: number;
  };
  if (!response.ok || !payload.access_token) {
    const code = typeof payload.error === "string" ? payload.error : "unknown";
    throw new Error(`calendar-token:${code}`);
  }
  return {
    expiresAt: Date.now() + (payload.expires_in ?? 3600) * 1000,
    token: payload.access_token,
  };
};

export const googleAccessToken = async () => {
  if (cached && cached.expiresAt > Date.now() + 30_000) return cached.token;

  const account = serviceAccount();
  if (!account) throw new Error("calendar-unconfigured");

  const subject = calendarId();
  cached = await tokenFromServiceAccount({ account, subject });
  return cached.token;
};
