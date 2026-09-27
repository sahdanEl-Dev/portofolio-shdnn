"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PhotoCarouselProps = {
  images: string[];
};

export default function PhotoCarousel({ images }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function next() {
    setDirection(1);
    setIndex((i) => (i + 1) % images.length);
  }

  function prev() {
    setDirection(-1);
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -80 : 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`Foto perjalanan ${index + 1}`}
            fill
            sizes="(min-width: 1024px) 32rem, 90vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        aria-label="Foto sebelumnya"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-2 text-white backdrop-blur transition hover:scale-110 hover:bg-emerald-500/60"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Foto berikutnya"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-2 text-white backdrop-blur transition hover:scale-110 hover:bg-emerald-500/60"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-emerald-400" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}