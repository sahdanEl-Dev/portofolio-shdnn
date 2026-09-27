"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal mengirim pesan");

      setSubmitStatus("success");
      setFormData({ nama: "", email: "", pesan: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/40 shadow-2xl">
        {/* SISI KIRI: Header & Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between"
        >
          <div>
            <div className="space-y-3 mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
                CONTACT <span className="text-emerald-500">ME</span>
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Punya ide proyek seru, tawaran kolaborasi, atau sekadar mau sapa-sapa santai? Pintu komunikasi saya selalu terbuka lebar. Tulis pesanmu di bawah dan mari buat perubahan nyata bareng!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Nama </label>
                <input
                  type="text"
                  name="nama"
                  required
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Nama Anda"
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Email </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alamat@email.com"
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Pesan </label>
                <textarea
                  name="pesan"
                  required
                  rows={4}
                  value={formData.pesan}
                  onChange={handleChange}
                  placeholder="Tuliskan pesan atau ide proyek Anda di sini..."
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>SUBMIT</span>
                )}
              </button>

              {submitStatus === "success" && (
                <p className="text-xs text-emerald-400 font-medium text-center">
                  ✓ Pesan berhasil dikirim! Terima kasih.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-xs text-rose-400 font-medium text-center">
                  ✕ Terjadi kesalahan, silakan coba lagi.
                </p>
              )}
            </form>
          </div>
        </motion.div>

        {/* SISI KANAN: Foto Profil dengan Overlay */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 relative min-h-[400px] lg:min-h-full bg-zinc-950 overflow-hidden group"
        >
          <Image
            src="/pp2.jpeg"
            alt="Foto profil"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-emerald-950/30" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
            <div className="space-y-2 bg-zinc-950/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-800/80">
              <p className="text-xs text-emerald-400 font-semibold tracking-widest uppercase">
                Muhammad Sahdan Ramadhan
              </p>
              <h3 className="text-lg font-bold text-white">
                Web Developer & Visual Creator
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Siap membantu merealisasikan ide digital Anda menjadi kenyataan yang presisi.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}