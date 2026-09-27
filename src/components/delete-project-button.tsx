"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteProjectButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Hapus project ini?")) return;
    setLoading(true);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
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