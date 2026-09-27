"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PartyPopper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeToast() {
  const [show, setShow] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 1. Efek khusus untuk mendeteksi parameter URL saat baru login
  useEffect(() => {
    if (searchParams.get("welcome") === "true") {
      setShow(true); // Tampilkan toast
      
      // Bersihkan parameter ?welcome=true dari URL tanpa reload
      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, router, pathname]);

  // 2. Efek terpisah untuk Timer
  // Timer tidak akan terganggu meskipun URL diubah oleh baris router.replace di atas
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3500); // Hilang otomatis setelah 3.5 detik

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-zinc-900/90 backdrop-blur-xl px-5 py-3.5 shadow-2xl"
        >
          <PartyPopper className="text-emerald-400 shrink-0" size={20} />
          <p className="text-sm font-medium text-white">
            Selamat datang di Dashboard Admin!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}