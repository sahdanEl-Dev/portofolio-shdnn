"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeletePhotoButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Hapus foto ini?")) return;
    setLoading(true);
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg bg-red-500/80 px-2 py-1 text-xs text-white hover:bg-red-500 disabled:opacity-50"
    >
      <Trash2 size={12} className="inline" /> Hapus
    </button>
  );
}