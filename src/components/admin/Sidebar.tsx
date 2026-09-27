"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Image as ImageIcon, Newspaper, Mail } from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Project", href: "/admin/projects", icon: FolderKanban },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Blog", href: "/admin/blog", icon: Newspaper },
  { name: "Pesan Masuk", href: "/admin/messages", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-white/[0.04] backdrop-blur-2xl p-4 hidden md:flex md:flex-col">
      <div className="px-2 py-4 mb-4">
        <span className="text-lg font-bold text-white">
          Admin<span className="text-emerald-500">Panel</span>
        </span>
      </div>
      <nav className="space-y-1">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}