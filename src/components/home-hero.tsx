"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";
import Typewriter from "@/components/typewriter";

const roles = ["Software Engineer", "Photographer", "Gamer"];

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/in/muhammad-sahdan-ramadhan-9b464a411", icon: FaLinkedinIn },
  { name: "GitHub", href: "https://github.com/sahdanEl-Dev", icon: FaGithub },
  { name: "Instagram", href: "https://instagram.com/shdn_54", icon: FaInstagram },
  { name: "TikTok", href: "https://tiktok.com/@ndhasss_", icon: FaTiktok },
];

export default function HomeHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  return (
    <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-6xl items-center gap-12 px-6 py-10 lg:grid-cols-12 lg:gap-16">
      {/* Kiri: Teks & Tombol */}
      <div className="order-2 lg:order-1 lg:col-span-7">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          <span className="block text-white/90">Hi, I&apos;m a</span>
          <span className="block min-h-[1.2em] text-emerald-400">
            <Typewriter words={roles} />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Seorang Junior Software Engineer yang selalu ingin tahu bagaimana
          teknologi berkembang dan menciptakan dampak. Saya juga seorang junior photographer yang 
          senang menangkap estetika dari setiap detail, serta seorang gamer yang 'dipaksa' menjadi 
          pembentuk strategi dan pemecah masalah di setiap permainan.
        </motion.p>

        {/* Tombol About Me & Sosial Media */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 space-y-6"
        >
          <div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-7 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 transition hover:shadow-emerald-500/40"
            >
              About Me
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Ikon Media Sosial */}
          <div className="flex items-center gap-4 pt-2">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/10 hover:text-emerald-400 hover:scale-110"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Kanan: Foto Profil dengan Aura Glow Cyan & Card Glassmorphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        onAnimationComplete={() => setShowGlow(true)}
        className="order-1 mx-auto w-full max-w-xs sm:max-w-sm lg:order-2 lg:col-span-5 lg:max-w-none"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Ambient Glow Cyan Memancar dari Belakang Kepala/Bahu (Menyatu dengan Tema Web) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showGlow ? 0.6 : 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-cyan-500/35 via-emerald-500/25 to-teal-400/15 blur-3xl pointer-events-none z-0"
          />

          {/* Kartu Frame Profil */}
          <div className="group relative z-10 aspect-[4/5] overflow-hidden rounded-[2.2rem] border border-cyan-500/30 bg-cyan-950/20 p-2.5 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-emerald-400/50">
            <div className="relative size-full overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-cyan-950/30 via-slate-950/80 to-black">
              
              {/* Gambar Profil */}
              <Image
                src="/profile/Profile.png"
                alt="Foto Profile Ndhasss"
                fill
                priority
                sizes="(min-width: 1024px) 24rem, 90vw"
                onLoad={() => setIsLoaded(true)}
                className={`object-cover z-10 transition-all duration-500 ease-out group-hover:scale-105 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Dark Overlay Fade di Bagian Bawah: Mengembalikan tinggi shadow seperti semula namun ditarik melewati batas bawah agar garis tertutup */}
              <div className="absolute inset-x-0 top-0 -bottom-2 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-20 pointer-events-none" />

            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}