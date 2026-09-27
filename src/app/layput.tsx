"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
    });
  }, [pathname]);

  return null;
}