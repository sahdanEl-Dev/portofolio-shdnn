"use client";

import { useState } from "react";
import NotificationBell from "./NotificationBell";
import { LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Topbar() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.push("/admin/login");
      router.refresh();
      setLoggingOut(false);
    }
  };

  return (
    <>
      <header className="h-16 border-b border-white/10 bg-white/[0.03] backdrop-blur-2xl flex items-center justify-end gap-3 px-6">
        <NotificationBell />
        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-300 hover:text-white"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <AnimatePresence>
        {loggingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/90 px-8 py-6 shadow-2xl"
            >
              <Loader2 size={28} className="animate-spin text-emerald-400" />
              <p className="text-sm font-medium text-white/80">Sedang logout...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}