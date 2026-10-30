"use client";

import { FormEvent, useState } from "react";

export function AdminLogin() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }).catch(() => null);
    if (res?.ok) return window.location.reload();
    setBusy(false);
    setError(res?.status === 429 ? "Слишком много попыток. Подожди 15 минут." : "Неверный пароль.");
  }

  return (
    <main className="admin-center">
      <form className="admin-card" onSubmit={submit}>
        <span className="admin-logo">W</span>
        <h1>Чаты Worktime</h1>
        <label>Пароль<input name="password" type="password" required autoFocus autoComplete="current-password" /></label>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button className="admin-btn admin-btn-primary" disabled={busy}>{busy ? "Входим…" : "Войти"}</button>
      </form>
    </main>
  );
}
