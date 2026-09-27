"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navRef = useRef<HTMLUListElement>(null);
  const [pillStyle, setPillStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  if (pathname?.startsWith("/admin")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  useEffect(() => {
    if (!navRef.current) return;

    const activeIndex = links.findIndex((link) => isActive(link.href));
    if (activeIndex !== -1) {
      const activeTab = navRef.current.children[activeIndex + 1] as HTMLElement;
      if (activeTab) {
        setPillStyle({
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth,
          opacity: 1,
        });
      }
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      {/* Di sini perubahannya: bg-zinc-900/70 diubah jadi bg-zinc-900/40 */}
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl border border-emerald-500/20 bg-zinc-900/30 px-5 py-3 backdrop-blur-xl shadow-lg shadow-emerald-500/5">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          Ndhasss<span className="text-emerald-400">.</span>
        </Link>

        {/* Navigasi Desktop */}
        <div className="hidden md:block">
          <ul ref={navRef} className="relative flex items-center gap-1">
            <motion.div
              className="absolute bottom-0 top-0 rounded-xl bg-gradient-to-r from-sky-500/20 to-emerald-500/20 border border-emerald-400/20"
              animate={{
                left: pillStyle.left,
                width: pillStyle.width,
                opacity: pillStyle.opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />

            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="relative z-10">
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-4 py-2 text-sm transition-colors ${
                      active ? "text-emerald-300 font-medium" : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Tombol Mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-zinc-200 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-emerald-500/20 bg-zinc-900/90 p-2 backdrop-blur-xl md:hidden"
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm ${
                    isActive(link.href)
                      ? "bg-emerald-500/10 text-emerald-300 font-medium"
                      : "text-zinc-300"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}