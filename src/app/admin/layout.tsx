"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import WelcomeToast from "@/components/admin/WelcomeToast";
import { Suspense } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen w-full bg-zinc-950">{children}</div>;
  }

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 overflow-x-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-sky-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-400/10 blur-[100px]" />

      <div className="relative flex min-h-screen w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 w-full">
          <Topbar />
          <main className="flex-1 p-6 md:p-8 w-full overflow-y-auto">{children}</main>
        </div>
      </div>

      <Suspense fallback={null}>
        <WelcomeToast />
      </Suspense>
    </div>
  );
}