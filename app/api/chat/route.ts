import { NextResponse, after } from "next/server";
import { HANDOFF_MARKER, aiReply } from "@/lib/chat-ai";
import { addMessage, getMessages, getMeta, newId, saveMeta, underLimit, type ChatMeta } from "@/lib/chat-store";
import { sendMail } from "@/lib/mail";
import { SITE_URL } from "@/app/site";

const MAX_TEXT = 1000;

/*
 * Spending limits. When any of them is hit the assistant stops and the chat is
 * handed to the team, who can still reply from /admin.
 * Worst case with defaults: 150 replies/day ≈ $0.15/day (GPT-4.1 mini), under the free $5/month.
 */
const MAX_AI_REPLIES_PER_CHAT = 25;
const MAX_AI_REPLIES_PER_IP_DAY = 40;
const MAX_AI_REPLIES_PER_DAY = Number(process.env.AI_DAILY_LIMIT) || 150;
const MAX_NEW_CHATS_PER_IP_HOUR = 5;
const DAY = 86400;
const ID_RE = /^[0-9a-f-]{36}$/;
const LANGS = ["et", "ru", "en"];

/** Said when the assistant is down or out of budget, so the visitor knows a person will answer. */
const PASSED_TO_TEAM: Record<string, string> = {
  et: "Annan teie küsimuse edasi meie meeskonnale — nad vastavad siinsamas. Jätke palun ka oma e-post või telefon, et saaksime vajadusel ühendust võtta.",
  ru: "Передаю ваш вопрос нашей команде — вам ответят прямо здесь. Оставьте, пожалуйста, email или телефон, чтобы мы могли связаться с вами.",
  en: "I'm passing your question to our team — they'll reply right here. Please also leave your email or phone so we can reach you.",
};

const ip = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";

/** Hands the chat to the team: the assistant goes quiet and the team gets an email. */
async function handToTeam(meta: ChatMeta, event: "handoff" | "requested"): Promise<ChatMeta> {
  const now = Date.now();
  await addMessage(meta.id, { id: newId(), role: "system", text: event, at: now });
  const why = event === "requested" ? "Klient soovib rääkida inimesega" : "AI ei osanud vastata";
  after(() => sendMail({
    subject: `Worktime: klient ootab vastust (${why.toLowerCase()})`,
    text: `${why}.\n\nViimane sõnum: ${meta.preview || "—"}\n\nAva vestlus: ${SITE_URL}/admin?chat=${meta.id}`,
  }));
  return { ...meta, mode: "human", needsTeam: true, updatedAt: now };
}

/** Visitor polls this for new messages (e.g. replies from a team member). */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!ID_RE.test(id)) return NextResponse.json({ error: "bad_id" }, { status: 400 });
  const meta = await getMeta(id);
  if (!meta) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ mode: meta.mode, messages: await getMessages(id) });
}

/**
 * Visitor sends a message, or asks for a person with { action: "handoff" }.
 * The assistant answers unless the chat belongs to the team.
 */
export async function POST(request: Request) {
  let body: { chatId?: unknown; text?: unknown; lang?: unknown; action?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const wantsTeam = body.action === "handoff";
  const text = String(body.text ?? "").trim().slice(0, MAX_TEXT);
  const lang = LANGS.includes(String(body.lang)) ? String(body.lang) : "et";
  if (!text && !wantsTeam) return NextResponse.json({ error: "empty" }, { status: 400 });

  const visitor = ip(request);
  if (!(await underLimit(`chat:${visitor}`, 20, 600))) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const now = Date.now();
  const requestedId = typeof body.chatId === "string" && ID_RE.test(body.chatId) ? body.chatId : null;
  let meta: ChatMeta | null = requestedId ? await getMeta(requestedId) : null;
  if (!meta && !(await underLimit(`newchat:${visitor}`, MAX_NEW_CHATS_PER_IP_HOUR, 3600))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  meta ??= { id: newId(), createdAt: now, updatedAt: now, lang, mode: "ai", unread: 0, aiReplies: 0, preview: "" };

  if (text) {
    await addMessage(meta.id, { id: newId(), role: "user", text, at: now });
    meta = { ...meta, updatedAt: now, unread: meta.unread + 1, preview: text.slice(0, 140) };
  }

  if (wantsTeam) {
    if (meta.mode === "ai") meta = await handToTeam(meta, "requested");
  } else if (meta.mode === "ai") {
    // Checked in order so a request only counts against the next limit if it passed the previous one.
    const aiAllowed = meta.aiReplies < MAX_AI_REPLIES_PER_CHAT
      && await underLimit(`ai:${visitor}`, MAX_AI_REPLIES_PER_IP_DAY, DAY)
      && await underLimit("ai:all", MAX_AI_REPLIES_PER_DAY, DAY);

    let reply = "";
    if (aiAllowed) {
      try {
        reply = await aiReply(await getMessages(meta.id));
        meta = { ...meta, aiReplies: meta.aiReplies + 1 };
      } catch (err) {
        console.error("chat: AI reply failed", err);
      }
    }

    // The assistant marks questions it can't answer from the site's facts; those go to the team.
    const handoff = !reply || reply.includes(HANDOFF_MARKER);
    reply = reply.replaceAll(HANDOFF_MARKER, "").trim() || PASSED_TO_TEAM[lang];
    await addMessage(meta.id, { id: newId(), role: "assistant", text: reply, at: Date.now() });
    meta = { ...meta, updatedAt: Date.now() };
    if (handoff) meta = await handToTeam(meta, "handoff");
  }

  await saveMeta(meta);
  return NextResponse.json({ chatId: meta.id, mode: meta.mode, messages: await getMessages(meta.id) });
}
