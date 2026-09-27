"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Achievement {
  title: string;
  issuer: string;
  year: string;
  category?: string;
  imageUrl: string;
}

export default function AchievementsSection() {
  const [selected, setSelected] = useState<Achievement | null>(null);

  const achievements: Achievement[] = [
    {
      title: "Juara 1 Video Kreatif",
      issuer: "Sentral Komputer",
      year: "2026",
      category: "Video Kreatif",
      imageUrl: "/sertifikat/penghargaanCentral.jpeg",
    },
    {
      title: "Apresiasi lomba Video Kreatif",
      issuer: "Fortifikasi Indonesia",
      year: "2026",
      category: "Video Kreatif",
      imageUrl: "/sertifikat/sertifKFI.jpg",
    },
    {
      title: "Apresiasi Lomba Vibe Coding",
      issuer: "Google Developer Groups",
      year: "2026",
      category: "Vibe Coding",
      imageUrl: "/sertifikat/sertifVibeCoding.jpg",
    },
    {
      title: "Apresiasi Lomba Fotografi FLS3N",
      issuer: "Puspresnas",
      year: "2026",
      category: "Fotografi",
      imageUrl: "/sertifikat/sertifFLS3N.jpg",
    },
    // Tambah sertifikat lainnya di sini
  ];

  return (
    <section>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Achievements & <span className="text-emerald-500">Awards</span>
      </h2>
      <p className="text-zinc-400 text-sm sm:text-base mb-8">
        Penghargaan dan apresiasi yang pernah saya raih.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((a, i) => (
          <motion.button
            key={a.title}
            onClick={() => setSelected(a)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-left rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-emerald-500/40 transition-colors group cursor-pointer"
          >
            <div className="relative w-full aspect-[4/3] bg-zinc-950 p-2">
              <Image
                src={a.imageUrl}
                alt={a.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-zinc-100 mb-1 text-sm">{a.title}</h3>
              <p className="text-xs text-zinc-500">{a.issuer}</p>
              <div className="flex items-center justify-between mt-2">
                {a.category && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                    {a.category}
                  </span>
                )}
                <span className="text-xs text-zinc-500">{a.year}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal Preview Full Sertifikat */}
      {selected && (
        <div
          /* Menghapus onClick={() => setSelected(null)} dari backdrop */
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 sm:p-10 cursor-default"
        >
          {/* Pembungkus relatif modal */}
          <div className="relative max-w-4xl w-full aspect-[4/3] max-h-[80vh] rounded-2xl bg-zinc-950 p-2 border border-zinc-800">
            {/* Tombol X Lingkaran - Satu-satunya cara untuk keluar dari modal */}
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-4 -right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 hover:bg-emerald-500 hover:text-white border border-zinc-700 shadow-xl transition-all cursor-pointer"
              aria-label="Tutup preview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <Image
              src={selected.imageUrl}
              alt={selected.title}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}