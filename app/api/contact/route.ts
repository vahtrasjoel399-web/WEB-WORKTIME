import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Hidden field that only bots fill in: pretend it worked and drop it.
  if (typeof body.website === "string" && body.website) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);
  const lang = String(body.lang ?? "").slice(0, 5);
  if (!name || !EMAIL_RE.test(email) || !message) return NextResponse.json({ ok: false }, { status: 400 });

  const ok = await sendMail({
    subject: `Worktime: uus sõnum — ${name}`,
    text: `Nimi: ${name}\nE-post: ${email}\nKeel: ${lang || "-"}\n\n${message}`,
    replyTo: email,
  });
  return NextResponse.json({ ok }, { status: ok ? 200 : 502 });
}
