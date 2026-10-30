/** Team inboxes. Override with CONTACT_TO (comma-separated). */
export const TEAM_INBOXES = (process.env.CONTACT_TO || "joel@worktime.ee,stepan@worktime.ee").split(",").map((s) => s.trim()).filter(Boolean);
/** Must be an address on a domain verified in Resend. */
const FROM = process.env.CONTACT_FROM || "Worktime <noreply@worktime.ee>";

/** Sends a plain-text email through Resend. Returns false (and logs) on any failure. */
export async function sendMail({ subject, text, replyTo }: { subject: string; text: string; replyTo?: string }): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("mail: RESEND_API_KEY is not set");
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: TEAM_INBOXES, subject, text, ...(replyTo && { reply_to: replyTo }) }),
  });
  if (!res.ok) console.error("mail: Resend error", res.status, await res.text());
  return res.ok;
}
