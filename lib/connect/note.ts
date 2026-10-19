import { denverDay, digest } from "./caps";
import type { CapStore } from "./caps";
import { EMAIL_FAILED, NOTE_CAP, STORE_UNAVAILABLE_NOTE } from "./copy";
import type { NoteMailer } from "./email";
import { noteSchema } from "./schema";

export const sendNote = async ({
  enforce = true,
  input,
  ip,
  mailer,
  now,
  store,
}: {
  enforce?: boolean;
  input: unknown;
  ip: string;
  mailer: NoteMailer;
  now: Date;
  store: CapStore | null;
}) => {
  const parsed = noteSchema.safeParse(input);
  if (!parsed.success) {
    return {
      message:
        parsed.error.issues[0]?.message ??
        "The note is incomplete. Nothing was sent.",
      ok: false,
      sent: false,
    };
  }
  if (!store) {
    return { message: STORE_UNAVAILABLE_NOTE, ok: false, sent: false };
  }

  const note = parsed.data;
  const key = `connect:noted:${digest(`${note.email}|${note.description}`)}`;
  const existing = await store.get(key);
  if (existing && existing !== "pending") {
    return { message: "That note was already sent.", ok: true, sent: false };
  }
  if (existing === "pending" || !(await store.claim(key))) {
    return { message: "That note was already sent.", ok: true, sent: false };
  }

  const day = denverDay(now);
  const emailKey = `connect:notes:email:${note.email.toLowerCase()}:${day}`;
  const ipKey = `connect:notes:ip:${ip}:${day}`;
  const release = async () => {
    if (enforce) {
      await store.decr(emailKey);
      await store.decr(ipKey);
    }
    await store.del(key);
  };

  if (enforce) {
    const emailCount = await store.incr(emailKey);
    if (emailCount > 5) {
      await store.decr(emailKey);
      await store.del(key);
      return { message: NOTE_CAP, ok: false, sent: false };
    }
    const ipCount = await store.incr(ipKey);
    if (ipCount > 5) {
      await release();
      return { message: NOTE_CAP, ok: false, sent: false };
    }
  }

  try {
    await mailer(note);
    await store.set(key, "sent");
    return { message: "Sent the note.", ok: true, sent: true };
  } catch (error) {
    await release();
    const detail = error instanceof Error ? error.message.trim() : "";
    const message =
      detail && detail !== "email-failed"
        ? `${EMAIL_FAILED} ${detail}`
        : EMAIL_FAILED;
    return { message, ok: false, sent: false };
  }
};
