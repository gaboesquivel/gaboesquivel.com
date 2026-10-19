const LOCAL_DEV_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "::1",
  "gaboesquivel.localhost",
]);

export const requestHost = (request: Request) =>
  new URL(request.url).hostname.toLowerCase();

export const isLocalDevHost = (host: string) =>
  LOCAL_DEV_HOSTS.has(host.toLowerCase());

export const capsEnforced = ({ host }: { host: string }) => {
  if (process.env.CONNECT_ENFORCE_CAPS === "1") return true;
  return !isLocalDevHost(host);
};

export const readRequestIp = (request: Request) => {
  const forwarded = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  if (forwarded) return forwarded;
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real;
  return "unknown";
};

export const isChatTurnPost = (request: Request) => {
  if (request.method !== "POST") return false;
  const path = new URL(request.url).pathname.replace(/\/$/, "");
  if (!path.includes("/session")) return false;
  if (path.endsWith("/cancel") || path.endsWith("/stream")) return false;
  return /\/session(?:\/[^/]+)?$/.test(path);
};
