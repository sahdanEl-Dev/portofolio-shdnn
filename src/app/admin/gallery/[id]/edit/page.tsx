"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2, Upload, X } from "lucide-react";

interface ExistingImage {
  id: number;
  imageUrl: string;
}

export default function EditGalleryPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [takenAt, setTakenAt] = useState("");
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/gallery/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description || "");
        setCategory(data.category || "");
        setTakenAt(data.takenAt ? data.takenAt.slice(0, 10) : "");
        setExistingImages(data.images);
        setFetching(false);
      });
  }, [postId]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;
    setNewFiles((prev) => [...prev, ...selected]);
    setNewPreviews((prev) => [...prev, ...selected.map((f) => URL.createObjectURL(f))]);
  }

  function removeNewFile(index: number) {
    URL.revokeObjectURL(newPreviews[index]);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleDeleteExisting(id: number) {
    setDeleteImageIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("takenAt", takenAt);
    newFiles.forEach((file) => formData.append("files", file));
    deleteImageIds.forEach((id) => formData.append("deleteImageIds", String(id)));

    const res = await fetch(`/api/admin/gallery/${postId}`, {
      method: "PUT",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Gagal menyimpan perubahan.");
      return;
    }

    router.push("/admin/gallery");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-emerald-400/50 focus:bg-white/10";

  if (fetching) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-emerald-400" size={28} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-white">Edit Foto Gallery</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-white/70">Foto Saat Ini</label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {existingImages.map((img) => {
              const marked = deleteImageIds.includes(img.id);
              return (
                <div
                  key={img.id}
                  className={`group relative aspect-square overflow-hidden rounded-xl border ${
                    marked ? "border-rose-500/60 opacity-40" : "border-white/10"
                  } bg-white/5`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.imageUrl} alt="" className="size-full object-cover" />
                  <button
                    type="button"
                    onClick={() => toggleDeleteExisting(img.id)}
                    className={`absolute top-1 right-1 flex size-6 items-center justify-center rounded-full text-white transition ${
                      marked ? "bg-rose-500" : "bg-black/70 hover:bg-red-500"
                    }`}
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
          {deleteImageIds.length > 0 && (
            <p className="mt-2 text-xs text-rose-400">
              {deleteImageIds.length} foto akan dihapus saat disimpan.
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-white/70">
            Tambah Foto Baru ({newFiles.length} dipilih)
          </label>

          {newPreviews.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {newPreviews.map((src, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-emerald-500/30 bg-white/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="size-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewFile(index)}
                    className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 p-6 transition hover:bg-white/10">
            <span className="flex flex-col items-center gap-2 text-white/50">
              <Upload size={24} />
              <span className="text-sm font-medium">Tambah foto baru</span>
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-white/70">Judul Foto</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-white/70">Keterangan (opsional)</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-white/70">Kategori</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-white/70">Tanggal (opsional)</label>
          <input
            type="date"
            value={takenAt}
            onChange={(e) => setTakenAt(e.target.value)}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 px-6 py-3 font-medium text-white transition disabled:opacity-60 cursor-pointer"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </div>
  );
}