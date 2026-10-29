import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { AdminInbox } from "./inbox";
import { AdminLogin } from "./login";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ chat?: string }> }) {
  if (!adminConfigured()) {
    return <main className="admin-center"><div className="admin-card"><h1>Админка не настроена</h1><p>Добавь переменную окружения <code>ADMIN_PASSWORD</code> (минимум 8 символов) и перезапусти сайт.</p></div></main>;
  }
  if (!(await isAdmin())) return <AdminLogin />;
  const { chat } = await searchParams;
  return <AdminInbox initialChat={chat ?? null} />;
}
