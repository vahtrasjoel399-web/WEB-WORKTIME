import { createClient } from "redis";

export type Role = "user" | "assistant" | "admin" | "system";
export type ChatMessage = { id: string; role: Role; text: string; at: number };
/** "ai" = the assistant answers; "human" = an admin has taken over and the assistant stays quiet. */
export type ChatMode = "ai" | "human";
export type ChatMeta = {
  id: string;
  createdAt: number;
  updatedAt: number;
  lang: string;
  mode: ChatMode;
  /** Visitor messages the admin hasn't opened yet. */
  unread: number;
  aiReplies: number;
  preview: string;
  /** Set when the assistant handed off or the visitor asked for a person; cleared once the team replies. */
  needsTeam?: boolean;
};

const TTL = 60 * 60 * 24 * 90; // keep chats for 90 days
const metaKey = (id: string) => `chat:${id}`;
const msgsKey = (id: string) => `chat:${id}:msgs`;
const INDEX = "chats";

const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL && process.env.VERCEL) console.error("chat-store: REDIS_URL is missing, chats will not persist");

async function connect() {
  const client = createClient({ url: REDIS_URL });
  client.on("error", (err) => console.error("chat-store: Redis error", err));
  await client.connect();
  return client;
}
type RedisClient = Awaited<ReturnType<typeof connect>>;

/** One shared connection per server instance, opened on first use. */
const g = globalThis as unknown as { __redis?: Promise<RedisClient> };
function db(): Promise<RedisClient> {
  const pending = g.__redis ?? connect().catch((err) => {
    g.__redis = undefined; // retry on the next request
    throw err;
  });
  g.__redis = pending;
  return pending;
}
const parse = <T>(raw: string | null | undefined): T | null => (raw ? (JSON.parse(raw) as T) : null);

/** In-memory fallback so the chat works in local development without a database. */
type MemStore = { meta: Map<string, ChatMeta>; msgs: Map<string, ChatMessage[]>; limits: Map<string, { count: number; resetAt: number }> };
const mem = (globalThis as unknown as { __chatMem?: MemStore }).__chatMem ??= { meta: new Map(), msgs: new Map(), limits: new Map() };
mem.limits ??= new Map();

export const newId = () => crypto.randomUUID();

export async function getMeta(id: string): Promise<ChatMeta | null> {
  if (!REDIS_URL) return mem.meta.get(id) ?? null;
  return parse<ChatMeta>(await (await db()).get(metaKey(id)));
}

export async function saveMeta(meta: ChatMeta) {
  if (!REDIS_URL) {
    mem.meta.set(meta.id, meta);
    return;
  }
  await (await db()).multi()
    .set(metaKey(meta.id), JSON.stringify(meta), { expiration: { type: "EX", value: TTL } })
    .zAdd(INDEX, { score: meta.updatedAt, value: meta.id })
    .exec();
}

export async function getMessages(id: string): Promise<ChatMessage[]> {
  if (!REDIS_URL) return mem.msgs.get(id) ?? [];
  return (await (await db()).lRange(msgsKey(id), 0, -1)).map((raw) => JSON.parse(raw) as ChatMessage);
}

export async function addMessage(id: string, msg: ChatMessage) {
  if (!REDIS_URL) {
    mem.msgs.set(id, [...(mem.msgs.get(id) ?? []), msg]);
    return;
  }
  await (await db()).multi().rPush(msgsKey(id), JSON.stringify(msg)).expire(msgsKey(id), TTL).exec();
}

export async function listChats(limit = 100): Promise<ChatMeta[]> {
  if (!REDIS_URL) return [...mem.meta.values()].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, limit);
  const client = await db();
  const ids = await client.zRange(INDEX, 0, limit - 1, { REV: true });
  if (!ids.length) return [];
  const metas = (await client.mGet(ids.map(metaKey))).map((raw) => parse<ChatMeta>(raw));
  const expired = ids.filter((_, i) => !metas[i]);
  if (expired.length) await client.zRem(INDEX, expired);
  return metas.filter((m): m is ChatMeta => !!m);
}

export async function deleteChat(id: string) {
  if (!REDIS_URL) {
    mem.meta.delete(id);
    mem.msgs.delete(id);
    return;
  }
  await (await db()).multi().del([metaKey(id), msgsKey(id)]).zRem(INDEX, id).exec();
}

/** Counts hits per key inside a time window. Returns true while under the limit. */
export async function underLimit(key: string, max: number, windowSec: number): Promise<boolean> {
  const k = `rl:${key}`;
  if (!REDIS_URL) {
    const now = Date.now();
    const hit = mem.limits.get(k);
    const fresh = !hit || hit.resetAt <= now;
    const next = fresh ? { count: 1, resetAt: now + windowSec * 1000 } : { ...hit, count: hit.count + 1 };
    mem.limits.set(k, next);
    return next.count <= max;
  }
  const [n] = await (await db()).multi().incr(k).expire(k, windowSec, "NX").exec();
  return Number(n) <= max;
}
