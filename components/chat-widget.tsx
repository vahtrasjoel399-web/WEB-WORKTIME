"use client";

import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, UserRound, X } from "lucide-react";
import type { Dictionary } from "@/app/i18n";
import type { ChatMessage, ChatMode } from "@/lib/chat-store";

const STORAGE_KEY = "tooaeg-chat-id";
const POLL_OPEN_MS = 4000;
const POLL_CLOSED_MS = 15000;

export function ChatWidget({ t, lang }: { t: Dictionary["chat"]; lang: string }) {
  const [open, setOpen] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mode, setMode] = useState<ChatMode>("ai");
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [unseen, setUnseen] = useState(false);
  const seenCount = useRef(0);
  const loaded = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setChatId(localStorage.getItem(STORAGE_KEY)), []);

  const refresh = useCallback(async () => {
    if (!chatId) return;
    const res = await fetch(`/api/chat?id=${chatId}`, { cache: "no-store" }).catch(() => null);
    if (res?.status === 404) {
      localStorage.removeItem(STORAGE_KEY);
      setChatId(null);
      setMessages([]);
      return;
    }
    if (!res?.ok) return;
    const data = await res.json();
    // Messages that existed before this page load count as already seen.
    if (!loaded.current) seenCount.current = data.messages.length;
    loaded.current = true;
    setMessages(data.messages);
    setMode(data.mode);
  }, [chatId]);

  // Keep the conversation in sync so replies from the team show up, faster while the panel is open.
  useEffect(() => {
    if (!chatId) return;
    refresh();
    const timer = setInterval(() => { if (!document.hidden) refresh(); }, open ? POLL_OPEN_MS : POLL_CLOSED_MS);
    return () => clearInterval(timer);
  }, [chatId, open, refresh]);

  // Badge on the button when something new arrives while the panel is closed.
  useEffect(() => {
    if (open) {
      seenCount.current = messages.length;
      setUnseen(false);
    } else if (messages.length > seenCount.current && messages.at(-1)?.role !== "user") {
      setUnseen(true);
    }
  }, [messages, open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /** Sends a message and/or a request for a person, then shows the conversation the server returns. */
  async function post(payload: { text?: string; action?: "handoff" }) {
    setError("");
    setSending(true);
    if (payload.text) setMessages((m) => [...m, { id: `local-${Date.now()}`, role: "user", text: payload.text!, at: Date.now() }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, lang, ...payload }),
      });
      if (!res.ok) throw new Error(res.status === 429 ? "rate" : "fail");
      const data = await res.json();
      if (data.chatId !== chatId) {
        localStorage.setItem(STORAGE_KEY, data.chatId);
        setChatId(data.chatId);
      }
      setMessages(data.messages);
      setMode(data.mode);
    } catch (err) {
      setError(err instanceof Error && err.message === "rate" ? t.rateLimited : t.error);
      setMessages((m) => m.filter((msg) => !msg.id.startsWith("local-")));
      if (payload.text) setDraft(payload.text);
    } finally {
      setSending(false);
    }
  }

  function send(event?: FormEvent) {
    event?.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    setDraft("");
    post({ text });
  }

  function askForTeam() {
    if (sending) return;
    const text = draft.trim();
    setDraft("");
    post({ text: text || undefined, action: "handoff" });
    inputRef.current?.focus();
  }

  const eventText: Record<string, string> = { joined: t.joined, left: t.left, handoff: t.handedOff, requested: t.requested };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className={`chat ${open ? "chat-open" : ""}`}>
      {open && (
        <section className="chat-panel" role="dialog" aria-label={t.title}>
          <header className="chat-head">
            <span className="chat-avatar" aria-hidden="true">W</span>
            <strong className="chat-title">{mode === "human" ? t.teamLabel : t.title}</strong>
            <button type="button" className="chat-x" onClick={() => setOpen(false)} aria-label={t.close}><X size={18}/></button>
          </header>

          <div className="chat-list" ref={listRef} aria-live="polite">
            <p className="chat-msg chat-msg-bot">{t.greeting}</p>
            {messages.map((m) => m.role === "system"
              ? <p key={m.id} className="chat-event">{eventText[m.text] ?? ""}</p>
              : <div key={m.id} className={`chat-msg ${m.role === "user" ? "chat-msg-user" : m.role === "admin" ? "chat-msg-team" : "chat-msg-bot"}`}>
                  {m.role === "admin" && <span className="chat-from">{t.teamLabel}</span>}
                  {m.text}
                </div>)}
            {sending && mode === "ai" && <Thinking label={t.typing}/>}
          </div>

          {error && <p className="chat-error" role="alert">{error}</p>}
          {mode === "ai" && (
            <button type="button" className="chat-team" onClick={askForTeam} disabled={sending}>
              <UserRound size={15}/> {t.talkToTeam}
            </button>
          )}
          <form className="chat-form" onSubmit={send}>
            <textarea
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              rows={1}
              maxLength={1000}
            />
            <button type="submit" disabled={!draft.trim() || sending} aria-label={t.send}><Send size={17}/></button>
          </form>
        </section>
      )}

      <button type="button" className="chat-toggle" onClick={() => setOpen((o) => !o)} aria-label={open ? t.close : t.open} aria-expanded={open}>
        {open ? <X size={22}/> : <MessageCircle size={22}/>}
        {unseen && !open && <span className="chat-badge" aria-hidden="true"/>}
      </button>
    </div>
  );
}

/** Eight rays of uneven length, so the spark looks hand-drawn rather than mechanical. */
const RAYS = [9.2, 7, 8.6, 6.4, 9.2, 7, 8.6, 6.4];

/** "Thinking" indicator: a breathing, slowly turning spark next to shimmering text. */
function Thinking({ label }: { label: string }) {
  return (
    <div className="chat-thinking" role="status">
      <svg className="chat-spark" viewBox="0 0 24 24" aria-hidden="true">
        {RAYS.map((len, i) => (
          <g key={i} transform={`rotate(${i * 45} 12 12)`}>
            <line x1="12" y1={12 - len} x2="12" y2="10.2" style={{ animationDelay: `${i * -0.15}s` }}/>
          </g>
        ))}
      </svg>
      <span className="chat-shimmer">{label}</span>
    </div>
  );
}
