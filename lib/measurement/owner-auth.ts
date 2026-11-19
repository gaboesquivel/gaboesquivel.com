import { createHash, timingSafeEqual } from "node:crypto";

export const ANALYTICS_REALM = "gaboesquivel analytics";

const digest = (value: string) => createHash("sha256").update(value).digest();

/**
 * Basic Auth for the owner dashboard (docs/specs/005). Any username; the
 * password must equal ANALYTICS_PASSWORD. Returns "disabled" when the variable
 * is unset so callers fail closed with 404.
 */
export const ownerAccess = (
  authorization: string | null
): "disabled" | "denied" | "granted" => {
  const password = process.env.ANALYTICS_PASSWORD?.trim();
  if (!password) return "disabled";
  if (!authorization?.startsWith("Basic ")) return "denied";
  let decoded: string;
  try {
    decoded = Buffer.from(authorization.slice(6), "base64").toString("utf-8");
  } catch {
    return "denied";
  }
  const given = decoded.slice(decoded.indexOf(":") + 1);
  return timingSafeEqual(digest(given), digest(password))
    ? "granted"
    : "denied";
};
