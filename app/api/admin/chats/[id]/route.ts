import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { addMessage, deleteChat, getMessages, getMeta, newId, saveMeta, type ChatMode } from "@/lib/chat-store";

type Ctx = { params: Promise<{ id: string }> };
const unauthorized = () => NextResponse.json({ error: "unauthorized" }, { status: 401 });
const notFound = () => NextResponse.json({ error: "not_found" }, { status: 404 });

/** Open a chat: returns its messages and marks it as read. */
export async function GET(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const meta = await getMeta(id);
  if (!meta) return notFound();
  if (meta.unread) await saveMeta({ ...meta, unread: 0 });
  return NextResponse.json({ meta: { ...meta, unread: 0 }, messages: await getMessages(id) });
}

/** Reply as a team member. Replying takes the chat over from the assistant. */
export async function POST(request: Request, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const meta = await getMeta(id);
  if (!meta) return notFound();
  const { text } = await request.json().catch(() => ({ text: "" }));
  const clean = String(text ?? "").trim().slice(0, 4000);
  if (!clean) return NextResponse.json({ error: "empty" }, { status: 400 });

  const now = Date.now();
  if (meta.mode !== "human" || meta.needsTeam) await addMessage(id, { id: newId(), role: "system", text: "joined", at: now });
  await addMessage(id, { id: newId(), role: "admin", text: clean, at: now });
  await saveMeta({ ...meta, mode: "human", needsTeam: false, unread: 0, updatedAt: now });
  return NextResponse.json({ ok: true });
}

/** Switch who answers: "human" (team member) or "ai" (hand back to the assistant). */
export async function PATCH(request: Request, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const meta = await getMeta(id);
  if (!meta) return notFound();
  const { mode } = await request.json().catch(() => ({ mode: "" }));
  if (mode !== "ai" && mode !== "human") return NextResponse.json({ error: "bad_mode" }, { status: 400 });
  if (mode !== meta.mode) {
    const now = Date.now();
    await addMessage(id, { id: newId(), role: "system", text: mode === "human" ? "joined" : "left", at: now });
    await saveMeta({ ...meta, mode: mode as ChatMode, needsTeam: false, updatedAt: now });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  await deleteChat((await params).id);
  return NextResponse.json({ ok: true });
}
