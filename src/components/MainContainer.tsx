"use client";

import { usePathname } from "next/navigation";

export default function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <main className={`flex-1 ${isAdmin ? "" : "pt-28"}`}>
      {children}
    </main>
  );
}