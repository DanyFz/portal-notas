import crypto from "crypto";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "unal-notas-secret-key-2026-auth";
export const ADMIN_USERNAME = process.env.ADMIN_USER || "dalopezza";
export const ADMIN_PASSWORD = process.env.ADMIN_PASS || "4469";

export function generateAdminToken(): string {
  const payload = {
    user: ADMIN_USERNAME,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${signature}`;
}

export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token) return false;
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return false;

    const expectedSig = crypto
      .createHmac("sha256", ADMIN_SECRET)
      .update(payloadB64)
      .digest("base64url");

    if (signature !== expectedSig) return false;

    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8"));
    if (payload.exp < Date.now()) return false;
    if (payload.user !== ADMIN_USERNAME) return false;

    return true;
  } catch {
    return false;
  }
}
