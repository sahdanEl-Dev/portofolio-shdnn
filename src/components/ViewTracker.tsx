"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
    }).catch((err) => console.error("Track view failed:", err));
  }, [pathname]);

  return null;
}