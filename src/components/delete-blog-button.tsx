"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteBlogButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Hapus tulisan ini?")) return;
    setLoading(true);
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-400 hover:underline disabled:opacity-50"
    >
      <Trash2 size={14} className="inline" /> Hapus
    </button>
  );
}