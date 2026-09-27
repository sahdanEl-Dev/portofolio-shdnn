"use client";

import Image from "next/image";
import PhotoCarousel from "@/components/photo-carousel";
import AchievementsSection from "@/components/achivements-section";
import { motion } from "framer-motion";

const journeyPhotos = [
  "/about/smpEra.jpeg",
  "/about/rplrpl.jpeg",
  "/about/paskibsmea.jpeg",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-24 px-6 py-10">
      {/* Section 1: Perkenalan */}
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Foto Potret diposisikan ke tengah (mx-auto) agar dekat dengan teks */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10"
        >
          <Image
            src="/about/profileAbout.jpeg"
            alt="Foto potret Ndhasss"
            fill
            priority
            sizes="(min-width: 1024px) 24rem, 90vw"
            className="object-cover"
          />
        </motion.div>

        {/* Teks Perkenalan */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <h1 className="text-3xl font-bold sm:text-4xl">
            About <span className="text-emerald-500">Me</span>
          </h1>
          <p className="mt-5 leading-relaxed text-white/60">
            Halo, saya Muhammad Sahdan Ramadhan. Saya seorang software engineer
            yang juga gemar fotografi dan gaming. Bagi saya, coding dan fotografi
            punya kesamaan: keduanya soal menyusun detail kecil jadi satu hasil
            yang utuh.
          </p>
          <p className="mt-4 leading-relaxed text-white/60">
            Saya senang belajar hal baru, terutama seputar pengembangan web,
            sambil terus mengasah kemampuan memotret dan
            menikmati game di waktu luang.
          </p>
        </motion.div>
      </section>

      {/* Section 2: Perjalanan dan Pengalaman */}
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Teks Perjalanan */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="text-2xl font-bold"><span className="text-emerald-500">Perjalanan</span> & Pengalaman</h2>
          <p className="mt-4 leading-relaxed text-white/60">
            Perjalanan ini dimulai saat saya lulus SMP. Waktu itu, dengan nekat dan tanpa banyak tahu apa-apa, 
            saya berani mengambil jurusan yang saya inginkan. Keberanian itu akhirnya membawa saya masuk ke sekolah impian. 
            Di sekolah inilah saya bertemu dengan teman-teman yang unik, namun luar biasa mendukung saya untuk terus berkembang menjadi diri yang lebih baik.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            Di sekolah ini juga, saya akhirnya bergabung dengan ekstrakurikuler Paskibra. Awalnya Paskibra sama sekali 
            bukan pilihan prioritas saya—saya hanya ikut karena diajak teman. Tapi setelah sekian lama berproses di dalamnya dan bertemu 
            dengan banyak orang yang menginspirasi, saya sadar tidak ada yang kebetulan. Saya sama sekali tidak menyesal pernah memilih organisasi 
            yang dulu sempat terabaikan ini.
          </p>
        </motion.div>

        {/* Carousel Photo: min-w-0 mencegah flex/grid item keluar jalur */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="w-full min-w-0"
        >
          <PhotoCarousel images={journeyPhotos} />
        </motion.div>
      </section>

      {/* Section 3: Achievements & Awards */}
      <AchievementsSection />
    </div>
  );
}