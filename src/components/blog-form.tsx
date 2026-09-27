"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";

type Initial = {
  title: string;
  content: string;
  published: boolean;
  coverImageUrl: string | null;
};

export default function BlogForm({
  initial,
  postId,
}: {
  initial?: Initial;
  postId?: number;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [published, setPublished] = useState(initial?.published ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initial?.coverImageUrl ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(postId);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("published", String(published));
    if (file) formData.append("file", file);

    const url = isEdit ? `/api/admin/blog/${postId}` : "/api/admin/blog";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, { method, body: formData });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Gagal menyimpan.");
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-emerald-400/50 focus:bg-white/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm text-white/70">Judul</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-white/70">
          Foto sampul (opsional)
        </label>
        <label className="flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/5">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Preview" className="size-full object-cover" />
          ) : (
            <span className="flex flex-col items-center gap-2 text-white/50">
              <Upload size={24} />
              Pilih foto
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-white/70">Isi Tulisan</label>
        <textarea
          required
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis seperti diary... pisahkan paragraf dengan baris kosong."
          className={`${inputClass} resize-none`}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-white/70">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="size-4 rounded border-white/20 bg-white/5"
        />
        Publikasikan sekarang
      </label>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 px-6 py-3 font-medium text-white transition disabled:opacity-60"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {loading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Buat Tulisan"}
      </button>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}