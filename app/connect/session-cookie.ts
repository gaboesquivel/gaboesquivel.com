export interface SessionCursor {
  sessionId: string;
  streamIndex: number;
}

let current: SessionCursor | null = null;
let loaded = false;
const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) listener();
};

const parseCursor = (raw: string | undefined) => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as SessionCursor;
    if (!parsed.sessionId) return null;
    return parsed;
  } catch {
    return null;
  }
};

const readJar = () => {
  // oxlint-disable-next-line unicorn/no-document-cookie -- snapshot must be synchronous
  const match = document.cookie.match(/(?:^|; )connect_eve=([^;]+)/);
  return parseCursor(match?.[1]);
};

const writeJar = (value: string) => {
  // oxlint-disable-next-line unicorn/no-document-cookie
  document.cookie = value;
};

export const subscribeSession = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getSession = () => {
  if (typeof document === "undefined") return null;
  if (!loaded) {
    loaded = true;
    current = readJar();
  }
  return current;
};

export const getServerSession = () => null;

export const writeSession = (session: SessionCursor | null) => {
  const nextId = session?.sessionId ?? null;
  const idChanged = (current?.sessionId ?? null) !== nextId;
  if (session) {
    writeJar(
      `connect_eve=${encodeURIComponent(JSON.stringify(session))}; Path=/; Max-Age=2592000; SameSite=Lax`
    );
  } else {
    writeJar("connect_eve=; Path=/; Max-Age=0; SameSite=Lax");
  }
  current = session;
  loaded = true;
  if (idChanged) emit();
};
