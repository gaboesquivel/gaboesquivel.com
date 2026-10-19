import { googleCalendar } from "../lib/connect/calendar";
import { calendarId, serviceAccount } from "../lib/connect/calendar-auth";
import { slotsMessageForError } from "../lib/connect/copy";

const main = async () => {
  if (!serviceAccount()) {
    console.error(
      "FAIL calendar-unconfigured: set GOOGLE_SERVICE_ACCOUNT_JSON and GOOGLE_CALENDAR_ID in .env"
    );
    process.exit(1);
  }

  let id: string;
  try {
    id = calendarId();
  } catch {
    console.error(
      "FAIL calendar-unconfigured: set GOOGLE_CALENDAR_ID (e.g. contact@gaboesquivel.com)"
    );
    process.exit(1);
  }

  const account = serviceAccount();
  console.log(`Calendar id: ${id}`);
  if (account) console.log(`Service account: ${account.client_email}`);

  const now = new Date();
  try {
    const busy = await googleCalendar().freeBusy({
      timeMax: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      timeMin: now.toISOString(),
    });
    console.log(
      `OK freeBusy returned ${busy.length} busy block(s) in the next 7 days`
    );
  } catch (error) {
    console.error(`FAIL ${slotsMessageForError(error)}`);
    if (error instanceof Error) console.error(error.message);
    process.exit(1);
  }
};

await main();
