import { Redis } from "@upstash/redis";

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

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

if (!redis && process.env.VERCEL) console.error("chat-store: Redis env vars missing, chats will not persist");

/** In-memory fallback so the chat works in local development without a database. */
type MemStore = { meta: Map<string, ChatMeta>; msgs: Map<string, ChatMessage[]>; limits: Map<string, { count: number; resetAt: number }> };
const mem = (globalThis as unknown as { __chatMem?: MemStore }).__chatMem ??= { meta: new Map(), msgs: new Map(), limits: new Map() };
mem.limits ??= new Map();

export const newId = () => crypto.randomUUID();

export async function getMeta(id: string): Promise<ChatMeta | null> {
  if (!redis) return mem.meta.get(id) ?? null;
  return (await redis.get<ChatMeta>(metaKey(id))) ?? null;
}

export async function saveMeta(meta: ChatMeta) {
  if (!redis) {
    mem.meta.set(meta.id, meta);
    return;
  }
  await redis.pipeline().set(metaKey(meta.id), meta, { ex: TTL }).zadd(INDEX, { score: meta.updatedAt, member: meta.id }).exec();
}

export async function getMessages(id: string): Promise<ChatMessage[]> {
  if (!redis) return mem.msgs.get(id) ?? [];
  return (await redis.lrange<ChatMessage>(msgsKey(id), 0, -1)) ?? [];
}

export async function addMessage(id: string, msg: ChatMessage) {
  if (!redis) {
    mem.msgs.set(id, [...(mem.msgs.get(id) ?? []), msg]);
    return;
  }
  await redis.pipeline().rpush(msgsKey(id), msg).expire(msgsKey(id), TTL).exec();
}

export async function listChats(limit = 100): Promise<ChatMeta[]> {
  if (!redis) return [...mem.meta.values()].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, limit);
  const ids = await redis.zrange<string[]>(INDEX, 0, limit - 1, { rev: true });
  if (!ids.length) return [];
  const metas = await redis.mget<(ChatMeta | null)[]>(...ids.map(metaKey));
  const expired = ids.filter((_, i) => !metas[i]);
  if (expired.length) await redis.zrem(INDEX, ...expired);
  return metas.filter((m): m is ChatMeta => !!m);
}

export async function deleteChat(id: string) {
  if (!redis) {
    mem.meta.delete(id);
    mem.msgs.delete(id);
    return;
  }
  await redis.pipeline().del(metaKey(id), msgsKey(id)).zrem(INDEX, id).exec();
}

/** Counts hits per key inside a time window. Returns true while under the limit. */
export async function underLimit(key: string, max: number, windowSec: number): Promise<boolean> {
  const k = `rl:${key}`;
  if (!redis) {
    const now = Date.now();
    const hit = mem.limits.get(k);
    const fresh = !hit || hit.resetAt <= now;
    const next = fresh ? { count: 1, resetAt: now + windowSec * 1000 } : { ...hit, count: hit.count + 1 };
    mem.limits.set(k, next);
    return next.count <= max;
  }
  const n = await redis.incr(k);
  if (n === 1) await redis.expire(k, windowSec);
  return n <= max;
}
