"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    setSent(true);
  }
  return sent ? <div className="form-success" role="status"><Check size={22}/><div><strong>Sõnum on valmis.</strong><p>Vormil ei ole veel serveriühendust. Ühendage see enne avaldamist sobiva vormiteenusega.</p></div></div> : (
    <form onSubmit={submit} className="contact-form">
      <label>Nimi<input name="name" required autoComplete="name" placeholder="Teie nimi" /></label>
      <label>E-post<input name="email" type="email" required autoComplete="email" placeholder="teie@ettevote.ee" /></label>
      <label className="full">Sõnum<textarea name="message" required rows={4} placeholder="Kirjutage, mida soovite teada." /></label>
      <button className="submit-button" type="submit">Saada sõnum <ArrowRight size={17}/></button>
      <p className="form-note">Demovorm — sõnumit veel ei saadeta.</p>
    </form>
  );
}
