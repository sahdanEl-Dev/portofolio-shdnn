"use client";

import { useEffect, useState } from "react";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function MessagesPage() {
  const [data, setData] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  const load = () => {
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then(setData);
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: number) => {
    await fetch(`/api/admin/messages/${id}/read`, { method: "PATCH" });
    load();
    setSelected((prev) => (prev && prev.id === id ? { ...prev, isRead: true } : prev));
    window.dispatchEvent(new Event("message-read")); // trigger event agar lonceng notifikasi update real-time
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Pesan Masuk</h1>
      <div className="space-y-3">
        {data.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m)}
            className={`w-full text-left rounded-2xl border p-5 backdrop-blur-xl transition-colors ${
              m.isRead
                ? "border-white/10 bg-white/[0.03]"
                : "border-emerald-500/30 bg-emerald-500/[0.06]"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-zinc-100">{m.name}</p>
                <p className="text-xs text-zinc-400">{m.email}</p>
              </div>
              <span className="text-xs text-zinc-500">
                {new Date(m.createdAt).toLocaleString("id-ID")}
              </span>
            </div>
            <p className="text-sm text-zinc-300 line-clamp-2">{m.message}</p>
            {!m.isRead && (
              <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                Unread
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Modal baca full */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-2xl p-6 sm:p-8"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold text-lg text-zinc-100">{selected.name}</p>
                <p className="text-sm text-zinc-400">{selected.email}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-zinc-500 hover:text-zinc-300 text-sm"
              >
                Tutup
              </button>
            </div>
            <p className="text-xs text-zinc-500 mb-4">
              {new Date(selected.createdAt).toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed mb-6">
              {selected.message}
            </p>
            {!selected.isRead ? (
              <button
                onClick={() => markRead(selected.id)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-colors"
              >
                Tandai Sudah Dibaca
              </button>
            ) : (
              <p className="text-xs text-zinc-500 text-center">Sudah dibaca</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}