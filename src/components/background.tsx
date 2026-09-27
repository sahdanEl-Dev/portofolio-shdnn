"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050b14]">
      {/* Ocean blue */}
      <motion.div
        className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[#0284c7]/30 blur-[130px]"
        animate={{ x: [0, 120, 0], y: [0, 80, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Emerald */}
      <motion.div
        className="absolute -bottom-48 -right-32 h-[40rem] w-[40rem] rounded-full bg-emerald-500/25 blur-[140px]"
        animate={{ x: [0, -100, 0], y: [0, -90, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Teal (percampuran keduanya) */}
      <motion.div
        className="absolute left-1/3 top-1/3 h-[28rem] w-[28rem] rounded-full bg-teal-400/15 blur-[120px]"
        animate={{ x: [0, 60, -40, 0], y: [0, -50, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}