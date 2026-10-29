import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { listChats } from "@/lib/chat-store";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ chats: await listChats() });
}
