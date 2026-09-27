"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";

// Ganti URL di bawah dengan akun medsosmu
const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/muhammad-sahdan-ramadhan-9b464a411", icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com/sahdanEl-Dev", icon: FaGithub },
  { label: "Instagram", href: "https://www.instagram.com/shdn_54", icon: FaInstagram },
  { label: "TikTok", href: "https://www.tiktok.com/@ndhasss_", icon: FaTiktok },
];

const iconClass =
  "flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-white/10 hover:text-emerald-400";

export default function Footer() {
  const pathname = usePathname();

  // Sembunyikan Footer jika sedang berada di halaman /admin atau sub-halamannya
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
        {/* Kiri */}
        <div className="space-y-1.5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Ndhasss<span className="text-emerald-400">.</span>
          </Link>
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Ndhasss. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-sm text-white/40">
            Dibuat dengan Next.js, Tailwind CSS, Neon, dan Vercel.
          </p>
        </div>

        {/* Kanan */}
        <ul className="flex items-center gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={iconClass}
              >
                <Icon size={18} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}