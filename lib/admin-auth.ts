import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "tt_admin";
const SESSION_DAYS = 30;

const password = () => process.env.ADMIN_PASSWORD || "";
const sign = (value: string) => createHmac("sha256", `tooaeg-admin:${password()}`).update(value).digest("hex");

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export const adminConfigured = () => password().length >= 8;
export const checkPassword = (input: string) => adminConfigured() && safeEqual(input, password());

/** Session token: expiry timestamp plus a signature tied to the current password, so changing it logs everyone out. */
export function createSession() {
  const exp = String(Date.now() + SESSION_DAYS * 86400_000);
  return { value: `${exp}.${sign(exp)}`, maxAge: SESSION_DAYS * 86400 };
}

export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  const [exp, sig] = token.split(".");
  return !!exp && !!sig && Number(exp) > Date.now() && safeEqual(sig, sign(exp));
}
