import { afterEach, describe, expect, test } from "bun:test";

import { capsEnforced } from "./ip";

describe("capsEnforced", () => {
  const previous = process.env.CONNECT_ENFORCE_CAPS;

  afterEach(() => {
    if (previous === undefined) delete process.env.CONNECT_ENFORCE_CAPS;
    else process.env.CONNECT_ENFORCE_CAPS = previous;
  });

  test("is false for local dev hosts", () => {
    expect(capsEnforced({ host: "localhost" })).toBe(false);
    expect(capsEnforced({ host: "gaboesquivel.localhost" })).toBe(false);
    expect(capsEnforced({ host: "127.0.0.1" })).toBe(false);
  });

  test("is true for production hosts", () => {
    expect(capsEnforced({ host: "gaboesquivel.com" })).toBe(true);
  });

  test("is true for localhost when CONNECT_ENFORCE_CAPS=1", () => {
    process.env.CONNECT_ENFORCE_CAPS = "1";
    expect(capsEnforced({ host: "localhost" })).toBe(true);
  });
});
