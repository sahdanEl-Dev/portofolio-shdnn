"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  isRead: boolean;
}

export default function RecentMessagesTable() {
  const [data, setData] = useState<Message[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/messages?limit=5")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-6">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">Pesan Terbaru</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-zinc-500 border-b border-white/10">
            <th className="pb-2 font-medium">Nama</th>
            <th className="pb-2 font-medium">Email</th>
            <th className="pb-2 font-medium">Tanggal</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.id} className="border-b border-white/5">
              <td className="py-2.5 text-zinc-200">{m.name}</td>
              <td className="py-2.5 text-zinc-400">{m.email}</td>
              <td className="py-2.5 text-zinc-400">
                {new Date(m.createdAt).toLocaleDateString("id-ID")}
              </td>
              <td className="py-2.5">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    m.isRead ? "bg-zinc-800 text-zinc-400" : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {m.isRead ? "Read" : "Unread"}
                </span>
              </td>
              <td className="py-2.5 text-right">
                <button
                  onClick={() => router.push(`/admin/messages`)}
                  className="text-emerald-400 hover:underline text-xs"
                >
                  Buka
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}