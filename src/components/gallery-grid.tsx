"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

type Post = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  images: string[];
  takenAt: string | null;
};

export default function GalleryGrid({ photos }: { photos: Post[] }) {
  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(photos.map((p) => p.category)))],
    [photos]
  );
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selected, setSelected] = useState<Post | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const filtered =
    activeCategory === "Semua"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  function openPost(post: Post) {
    setSelected(post);
    setActiveIndex(0);
    setDirection(0);
  }

  function prevImage() {
    if (!selected) return;
    setDirection(-1);
    setActiveIndex((i) => (i === 0 ? selected.images.length - 1 : i - 1));
  }

  function nextImage() {
    if (!selected) return;
    setDirection(1);
    setActiveIndex((i) => (i === selected.images.length - 1 ? 0 : i + 1));
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm transition-all duration-300 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-sky-500 to-emerald-500 text-white"
                : "border border-white/10 bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((post, i) => (
          <motion.button
            key={post.id}
            onClick={() => openPost(post)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 24,
              delay: Math.min(i * 0.08, 0.4),
            }}
            className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
          >
            {post.images[0] && (
              <Image
                src={post.images[0]}
                alt={post.title}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
            {post.images.length > 1 && (
              <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                <Images size={12} />
                {post.images.length}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-md p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#050b14]/90 backdrop-blur-xl md:grid-cols-[1.4fr_1fr]"
            >
              <div className="relative h-full w-full overflow-hidden bg-black">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction >= 0 ? 80 : -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction >= 0 ? -80 : 80 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={selected.images[activeIndex]}
                      alt={selected.title}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {selected.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex size-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 cursor-pointer"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex size-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 cursor-pointer"
                    >
                      <ChevronRight size={22} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                      {selected.images.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col p-8 overflow-y-auto">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-white/10">
                      <Image
                        src="/pp2.jpeg"
                        alt="Ndhasss"
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-base font-medium text-white">Ndhasss</span>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-lg p-1 text-white/50 transition hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>
                <h3 className="text-2xl font-semibold text-white">{selected.title}</h3>
                {selected.description && (
                  <p className="mt-3 text-base leading-relaxed text-white/60">
                    {selected.description}
                  </p>
                )}
                {selected.takenAt && (
                  <p className="mt-6 text-sm text-white/40">
                    {new Date(selected.takenAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}