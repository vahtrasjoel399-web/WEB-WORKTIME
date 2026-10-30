"use client";

import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Bot, LogOut, Send, Trash2, UserRound } from "lucide-react";
import type { ChatMessage, ChatMeta } from "@/lib/chat-store";

const LIST_POLL_MS = 5000;
const CHAT_POLL_MS = 3000;
const LANG_LABEL: Record<string, string> = { et: "ET", ru: "RU", en: "EN" };
const EVENT_TEXT: Record<string, string> = {
  joined: "Ты подключился к чату — ИИ молчит",
  left: "ИИ снова отвечает",
  handoff: "ИИ не смог ответить и передал чат команде",
  requested: "Клиент нажал «Написать команде»",
};

const modeLabel = (c: ChatMeta) => (c.needsTeam ? ["wait", "Ждёт ответа"] : c.mode === "human" ? ["human", "Команда"] : ["ai", "ИИ"]);
/** Chats waiting for the team first, then most recent. */
const byPriority = (a: ChatMeta, b: ChatMeta) => Number(!!b.needsTeam) - Number(!!a.needsTeam) || b.updatedAt - a.updatedAt;

const timeLabel = (at: number) => {
  const d = new Date(at);
  const today = new Date().toDateString() === d.toDateString();
  return today ? d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
};

export function AdminInbox({ initialChat }: { initialChat: string | null }) {
  const [chats, setChats] = useState<ChatMeta[]>([]);
  const [activeId, setActiveId] = useState<string | null>(initialChat);
  const [active, setActive] = useState<ChatMeta | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const api = useCallback(async (url: string, init?: RequestInit) => {
    const res = await fetch(url, { cache: "no-store", ...init, headers: { "Content-Type": "application/json", ...init?.headers } });
    if (res.status === 401) window.location.reload();
    return res;
  }, []);

  const loadList = useCallback(async () => {
    const res = await api("/api/admin/chats").catch(() => null);
    if (res?.ok) setChats((await res.json()).chats);
  }, [api]);

  const loadChat = useCallback(async () => {
    if (!activeId) return;
    const res = await api(`/api/admin/chats/${activeId}`).catch(() => null);
    if (res?.status === 404) {
      setActiveId(null);
      return;
    }
    if (!res?.ok) return;
    const data = await res.json();
    setActive(data.meta);
    setMessages(data.messages);
  }, [activeId, api]);

  useEffect(() => {
    loadList();
    const timer = setInterval(() => !document.hidden && loadList(), LIST_POLL_MS);
    return () => clearInterval(timer);
  }, [loadList]);

  useEffect(() => {
    setActive(null);
    setMessages([]);
    if (!activeId) return;
    loadChat();
    const timer = setInterval(() => !document.hidden && loadChat(), CHAT_POLL_MS);
    return () => clearInterval(timer);
  }, [activeId, loadChat]);

  // Keep the chat id in the URL so links from notification emails open the right chat.
  useEffect(() => {
    const url = activeId ? `/admin?chat=${activeId}` : "/admin";
    window.history.replaceState(null, "", url);
  }, [activeId]);

  const unread = chats.reduce((n, c) => n + (c.id === activeId ? 0 : c.unread), 0);
  useEffect(() => {
    document.title = unread ? `(${unread}) Чаты Worktime` : "Чаты Worktime";
  }, [unread]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages.length]);

  async function reply(e?: FormEvent) {
    e?.preventDefault();
    const text = draft.trim();
    if (!text || !activeId || busy) return;
    setBusy(true);
    const res = await api(`/api/admin/chats/${activeId}`, { method: "POST", body: JSON.stringify({ text }) }).catch(() => null);
    if (res?.ok) setDraft("");
    setBusy(false);
    loadChat();
    loadList();
  }

  async function setMode(mode: "ai" | "human") {
    if (!activeId) return;
    await api(`/api/admin/chats/${activeId}`, { method: "PATCH", body: JSON.stringify({ mode }) }).catch(() => null);
    loadChat();
    loadList();
  }

  async function remove() {
    if (!activeId || !confirm("Удалить этот чат навсегда?")) return;
    await api(`/api/admin/chats/${activeId}`, { method: "DELETE" }).catch(() => null);
    setActiveId(null);
    loadList();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.reload();
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      reply();
    }
  };

  return (
    <div className={`admin ${activeId ? "admin-has-chat" : ""}`}>
      <aside className="admin-side">
        <header className="admin-side-head">
          <span className="admin-logo">W</span>
          <strong>Чаты{unread ? <em>{unread}</em> : null}</strong>
          <button className="admin-icon" onClick={logout} title="Выйти" aria-label="Выйти"><LogOut size={17}/></button>
        </header>
        <ul className="admin-chats">
          {chats.length === 0 && <li className="admin-empty">Пока нет чатов. Когда кто-то напишет на сайте, чат появится здесь.</li>}
          {[...chats].sort(byPriority).map((c) => (
            <li key={c.id}>
              <button className={`admin-chat ${c.id === activeId ? "is-active" : ""}`} onClick={() => setActiveId(c.id)}>
                <span className="admin-chat-top">
                  <span className={`admin-mode admin-mode-${modeLabel(c)[0]}`}>{modeLabel(c)[1]}</span>
                  <span className="admin-lang">{LANG_LABEL[c.lang] ?? c.lang}</span>
                  <time>{timeLabel(c.updatedAt)}</time>
                </span>
                <span className="admin-chat-preview">{c.preview || "…"}</span>
                {c.unread > 0 && c.id !== activeId && <span className="admin-unread">{c.unread}</span>}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="admin-main">
        {!activeId ? (
          <div className="admin-placeholder">Выбери чат слева.</div>
        ) : (
          <>
            <header className="admin-main-head">
              <button className="admin-icon admin-back" onClick={() => setActiveId(null)} aria-label="Назад"><ArrowLeft size={18}/></button>
              <div className="admin-main-title">
                <strong>Посетитель · {LANG_LABEL[active?.lang ?? ""] ?? ""}</strong>
                <small>{active ? `Начат ${new Date(active.createdAt).toLocaleString("ru-RU")}` : "Загрузка…"}</small>
              </div>
              {active?.mode === "human"
                ? <button className="admin-btn" onClick={() => setMode("ai")}><Bot size={16}/> Вернуть ИИ</button>
                : <button className="admin-btn admin-btn-primary" onClick={() => setMode("human")}><UserRound size={16}/> Подключиться</button>}
              <button className="admin-icon" onClick={remove} title="Удалить чат" aria-label="Удалить чат"><Trash2 size={17}/></button>
            </header>

            <div className="admin-msgs" ref={listRef}>
              {messages.map((m) => m.role === "system"
                ? <p key={m.id} className={`admin-event ${m.text === "handoff" || m.text === "requested" ? "admin-event-wait" : ""}`}>{EVENT_TEXT[m.text] ?? m.text} · {timeLabel(m.at)}</p>
                : <div key={m.id} className={`admin-msg admin-msg-${m.role}`}>
                    <span className="admin-msg-from">{m.role === "user" ? "Посетитель" : m.role === "admin" ? "Команда" : "ИИ"} · {timeLabel(m.at)}</span>
                    {m.text}
                  </div>)}
            </div>

            <form className="admin-reply" onSubmit={reply}>
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={onKeyDown} rows={2}
                placeholder={active?.mode === "human" ? "Напиши ответ…" : "Напиши ответ — ИИ замолчит, и чат перейдёт к тебе"} />
              <button className="admin-btn admin-btn-primary" disabled={!draft.trim() || busy}><Send size={16}/> Отправить</button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
