"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Dictionary } from "@/app/i18n";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ t, lang }: { t: Dictionary["form"]; lang: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), lang }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <div className="form-success" role="status"><Check size={22}/><div><strong>{t.successTitle}</strong><p>{t.successText}</p></div></div>;
  }

  return (
    <form onSubmit={submit} className="contact-form">
      <label>{t.name}<input name="name" required maxLength={200} autoComplete="name" placeholder={t.namePlaceholder} /></label>
      <label>{t.email}<input name="email" type="email" required maxLength={200} autoComplete="email" placeholder={t.emailPlaceholder} /></label>
      <label className="full">{t.message}<textarea name="message" required maxLength={5000} rows={4} placeholder={t.messagePlaceholder} /></label>
      {/* Hidden from people; bots that fill it in get ignored. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="form-trap" />
      <button className="submit-button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? t.sending : <>{t.submit} <ArrowRight size={17}/></>}
      </button>
      <p className="form-note">{t.note}</p>
      {status === "error" && <p className="form-error full" role="alert">{t.error}</p>}
    </form>
  );
}
