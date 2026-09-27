"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotificationBell() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  const fetchCount = async () => {
    const res = await fetch("/api/admin/messages/unread");
    const data = await res.json();
    setCount(data.count);
  };

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 15000);
    window.addEventListener("message-read", fetchCount);
    return () => {
      clearInterval(interval);
      window.removeEventListener("message-read", fetchCount);
    };
  }, []);

  return (
    <button
      onClick={() => router.push("/admin/messages")}
      className="relative p-2 rounded-full hover:bg-zinc-800 transition-colors"
      aria-label="Notifikasi pesan masuk"
    >
      <Bell className="w-5 h-5 text-zinc-300" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-zinc-950 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}