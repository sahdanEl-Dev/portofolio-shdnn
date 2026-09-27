import { db } from "@/db";
import { messages } from "@/db/schema";
import { desc } from "drizzle-orm";
import LogoutButton from "@/components/logout-button";

export default async function AdminDashboard() {
  const allMessages = await db
    .select()
    .from(messages)
    .orderBy(desc(messages.createdAt))
    .limit(5);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <LogoutButton />
      </div>

      <h2 className="mb-4 text-lg font-semibold text-white/80">
        Pesan Terbaru
      </h2>
      <div className="space-y-3">
        {allMessages.length === 0 && (
          <p className="text-white/50">Belum ada pesan masuk.</p>
        )}
        {allMessages.map((m) => (
          <div
            key={m.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white">{m.name}</span>
              <span className="text-white/40">
                {m.createdAt.toLocaleString("id-ID")}
              </span>
            </div>
            <p className="text-sm text-white/50">{m.email}</p>
            <p className="mt-2 text-sm text-white/70">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}