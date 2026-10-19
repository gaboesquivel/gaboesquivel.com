import { afterEach, describe, expect, test } from "bun:test";

import {
  calendarId,
  calendarJwtClaims,
  calendarScopes,
  serviceAccount,
} from "./calendar-auth";

const env = { ...process.env };

afterEach(() => {
  process.env = { ...env };
});

describe("calendar auth config", () => {
  test("reads service account JSON from env", () => {
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON = JSON.stringify({
      client_email: "cal@test.iam.gserviceaccount.com",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----\n",
    });
    expect(serviceAccount()?.client_email).toBe(
      "cal@test.iam.gserviceaccount.com"
    );
  });

  test("calendar id is required", () => {
    delete process.env.GOOGLE_CALENDAR_ID;
    expect(() => calendarId()).toThrow("calendar-unconfigured");
  });

  test("jwt impersonates the calendar mailbox", () => {
    const claims = calendarJwtClaims({
      account: {
        client_email: "sa@test.iam.gserviceaccount.com",
        private_key: "x",
      },
      now: 1_700_000_000,
      subject: "contact@gaboesquivel.com",
    });
    expect(claims.sub).toBe("contact@gaboesquivel.com");
    expect(claims.iss).toBe("sa@test.iam.gserviceaccount.com");
    expect(claims.scope).toBe(calendarScopes);
  });
});
