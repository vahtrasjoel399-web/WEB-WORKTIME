import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminConfigured, checkPassword, createSession } from "@/lib/admin-auth";
import { underLimit } from "@/lib/chat-store";

export async function POST(request: Request) {
  if (!adminConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (!(await underLimit(`login:${ip}`, 10, 900))) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const { password } = await request.json().catch(() => ({ password: "" }));
  if (!checkPassword(String(password ?? ""))) return NextResponse.json({ error: "wrong_password" }, { status: 401 });

  const { value, maxAge } = createSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, value, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
