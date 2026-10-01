"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Dictionary } from "@/app/i18n";

export function ContactForm({ t }: { t: Dictionary["form"] }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    setSent(true);
  }
  return sent ? <div className="form-success" role="status"><Check size={22}/><div><strong>{t.successTitle}</strong><p>{t.successText}</p></div></div> : (
    <form onSubmit={submit} className="contact-form">
      <label>{t.name}<input name="name" required autoComplete="name" placeholder={t.namePlaceholder} /></label>
      <label>{t.email}<input name="email" type="email" required autoComplete="email" placeholder={t.emailPlaceholder} /></label>
      <label className="full">{t.message}<textarea name="message" required rows={4} placeholder={t.messagePlaceholder} /></label>
      <button className="submit-button" type="submit">{t.submit} <ArrowRight size={17}/></button>
      <p className="form-note">{t.note}</p>
    </form>
  );
}
