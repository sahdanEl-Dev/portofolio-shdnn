"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X } from "lucide-react";

export default function NewGalleryPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [takenAt, setTakenAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (!selectedFiles.length) return;

    // Gabungkan file baru dengan file yang sudah dipilih sebelumnya
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);

    // Buat URL preview untuk semua file
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }

  function handleRemoveFile(index: number) {
    // Revoke object URL untuk mencegah memory leak
    URL.revokeObjectURL(previews[index]);

    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!files.length) {
      setError("Pilih minimal satu foto.");
      return;
    }
    setLoading(true);
    setError("");

    const formData = new FormData();
    // Append seluruh file dengan key "files" (sesuai API route POST)
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("takenAt", takenAt);

    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Gagal mengupload.");
      return;
    }

    router.push("/admin/gallery");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-emerald-400/50 focus:bg-white/10";

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Tambah Foto Gallery</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-white/70">
            Foto ({files.length} terpilih)
          </label>

          {/* Grid Preview Foto */}
          {previews.length > 0 && (
            <div className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="size-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Area Dropzone / Input File */}
          <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 p-6 transition hover:bg-white/10">
            <span className="flex flex-col items-center gap-2 text-white/50">
              <Upload size={24} />
              <span className="text-sm font-medium">
                {files.length > 0 ? "Tambah foto lainnya" : "Pilih foto (bisa pilih banyak)"}
              </span>
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
            placeholder="Contoh: Photoshoot Bromo"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-white/70">
            Keterangan (opsional)
          </label>
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
            placeholder="Photography / Dokumentasi Kegiatan"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-white/70">
            Tanggal (opsional)
          </label>
          <input
            type="date"
            value={takenAt}
            onChange={(e) => setTakenAt(e.target.value)}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading || files.length === 0}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 px-6 py-3 font-medium text-white transition disabled:opacity-60 cursor-pointer"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? `Mengupload (${files.length} foto)...` : "Upload Foto"}
        </button>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </div>
  );
}