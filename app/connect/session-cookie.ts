export interface SessionCursor {
  sessionId: string;
  streamIndex: number;
}

const writeJar = (value: string) => {
  // oxlint-disable-next-line unicorn/no-document-cookie
  document.cookie = value;
};

export const writeSession = (session: SessionCursor | null) => {
  if (session) {
    writeJar(
      `connect_eve=${encodeURIComponent(JSON.stringify(session))}; Path=/; Max-Age=2592000; SameSite=Lax`
    );
    return;
  }
  writeJar("connect_eve=; Path=/; Max-Age=0; SameSite=Lax");
};
