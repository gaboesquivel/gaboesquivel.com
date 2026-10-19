import { defineDynamic, defineTool } from "eve/tools";
import { z } from "zod";

import { bookCall } from "../../lib/connect/book";
import { googleCalendar } from "../../lib/connect/calendar";
import { admitChatOnce } from "../../lib/connect/caps";
import { composeSlots } from "../../lib/connect/compose";
import type { SlotState } from "../../lib/connect/compose";
import {
  NO_SLOTS,
  ZONE_NEEDED,
  slotsMessageForError,
} from "../../lib/connect/copy";
import { resendNote } from "../../lib/connect/email";
import {
  isMcpChannel,
  sessionIp,
  assistantTexts,
  toolsForTurn,
  userTexts,
} from "../../lib/connect/intent";
import { sendNote } from "../../lib/connect/note";
import { bookSchema, noteSchema } from "../../lib/connect/schema";
import { listOpenSlots, validTimeZone } from "../../lib/connect/slots";
import { liveCapStore } from "../../lib/connect/store";

const shortSlots = (state: SlotState) =>
  (["15", "30"] as const).flatMap((duration) =>
    Object.entries(state.slots[duration])
      .slice(0, 2)
      .flatMap(([day, starts]) =>
        starts
          .slice(0, 4)
          .map((start) => ({ day, duration: Number(duration), start }))
      )
  );

export default defineDynamic({
  events: {
    "turn.started": async (_event, ctx) => {
      const texts = userTexts(ctx.messages);
      const mcp =
        isMcpChannel(ctx.channel.kind) ||
        isMcpChannel(ctx.conversation?.channel.kind);
      if (mcp) {
        const admitted = await admitChatOnce({
          ip: sessionIp(ctx.session.auth.current?.attributes),
          key: `${ctx.session.id}:${ctx.messages.length}`,
          now: new Date(),
          store: liveCapStore(),
        });
        if (!admitted.ok) return null;
      }
      const turnTools = toolsForTurn({
        assistantTexts: assistantTexts(ctx.messages),
        texts,
      });
      if (!turnTools?.length) return null;

      const userApproval = !mcp;
      const book = defineTool({
        approval: () => (userApproval ? "user-approval" : "not-applicable"),
        description:
          "Book a 15- or 30-minute call on the primary calendar. Requires name, email, duration, an ISO start, a time zone, and what they want to discuss. Does not assume 30 minutes.",
        execute: async (input) =>
          bookCall({
            calendar: googleCalendar(),
            input,
            now: new Date(),
            store: liveCapStore(),
          }),
        inputSchema: bookSchema,
        toModelOutput: (output) => ({ type: "json", value: output }),
      });
      const list_slots = defineTool({
        description:
          "List open 15- and 30-minute starts on weekdays from 9:00 to 17:00 America/Denver. Pass the visitor time zone. This does not book.",
        execute: async (input) => {
          const timeZone = input.timeZone;
          const duration =
            input.duration === 15 || input.duration === 30
              ? input.duration
              : null;
          if (!validTimeZone(timeZone)) {
            return {
              duration,
              message: ZONE_NEEDED,
              slots: [],
              spec: null,
              timeZone,
            };
          }
          try {
            const now = new Date();
            const busy = await googleCalendar().freeBusy({
              timeMax: new Date(
                now.getTime() + 21 * 24 * 60 * 60 * 1000
              ).toISOString(),
              timeMin: now.toISOString(),
            });
            const open = listOpenSlots({ busy, now, timeZone });
            if (open.days.length === 0) {
              return {
                duration,
                message: NO_SLOTS,
                slots: [],
                spec: null,
                timeZone,
              };
            }
            const state: SlotState = {
              ...open,
              day: open.days[0] ?? null,
              duration,
            };
            const spec = await composeSlots({ duration, state });
            return {
              duration,
              message: "Open times are in the picker.",
              slots: shortSlots(state),
              spec,
              timeZone,
            };
          } catch (error) {
            return {
              duration,
              message: slotsMessageForError(error),
              slots: [],
              spec: null,
              timeZone,
            };
          }
        },
        inputSchema: z.object({
          duration: z.union([z.literal(15), z.literal(30)]).optional(),
          timeZone: z.string().min(1),
        }),
        toModelOutput: (output) => ({
          type: "json",
          value: {
            duration: output.duration,
            message: output.message,
            slots: output.slots,
            timeZone: output.timeZone,
          },
        }),
      });
      const send = defineTool({
        approval: () => (userApproval ? "user-approval" : "not-applicable"),
        description:
          "Send email to contact@gaboesquivel.com with reply-to set to the visitor. Requires name, email, and what they want to discuss. Does not email the visitor a receipt.",
        execute: async (input, toolCtx) =>
          sendNote({
            input,
            ip: sessionIp(toolCtx.session.auth.current?.attributes),
            mailer: resendNote,
            now: new Date(),
            store: liveCapStore(),
          }),
        inputSchema: noteSchema,
        toModelOutput: (output) => ({ type: "json", value: output }),
      });
      const byName = { book, list_slots, send };
      return Object.fromEntries(turnTools.map((name) => [name, byName[name]]));
    },
  },
});
