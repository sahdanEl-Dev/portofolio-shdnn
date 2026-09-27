"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X } from "lucide-react";

type ProjectFormValues = {
  title: string;
  description: string;
  techStack: string;
  status: "completed" | "in_progress";
  demoUrl: string;
  repoUrl: string;
  imageUrl: string;
};

const empty: ProjectFormValues = {
  title: "",
  description: "",
  techStack: "",
  status: "in_progress",
  demoUrl: "",
  repoUrl: "",
  imageUrl: "",
};

export default function ProjectForm({
  initial,
  projectId,
}: {
  initial?: ProjectFormValues;
  projectId?: number;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormValues>(initial ?? empty);
  
  // State khusus file gambar & preview
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initial?.imageUrl || null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(projectId);

  // Handler saat memilih file baru
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  // Handler menghapus pilihan gambar
  function handleRemoveImage() {
    if (imageFile && previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl(null);
    setForm((prev) => ({ ...prev, imageUrl: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isEdit ? `/api/admin/projects/${projectId}` : "/api/admin/projects";
    const method = isEdit ? "PUT" : "POST";

    // Gunakan FormData untuk mengirim text + file
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("techStack", form.techStack);
    formData.append("status", form.status);
    formData.append("demoUrl", form.demoUrl);
    formData.append("repoUrl", form.repoUrl);

    // Kirim file baru jika ada
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (form.imageUrl) {
      // Jika tidak upload file baru, tetap kirim imageUrl lama (berguna untuk mode Edit)
      formData.append("imageUrl", form.imageUrl);
    }

    try {
      const res = await fetch(url, {
        method,
        body: formData, // Jangan menyetel header Content-Type manual
      });

      setLoading(false);

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal menyimpan.");
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setLoading(false);
      setError("Terjadi kesalahan koneksi.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition focus:border-emerald-400/50 focus:bg-white/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Input File Gambar */}
      <div>
        <label className="mb-1.5 block text-sm text-white/70">Gambar Project (opsional)</label>
        
        {previewUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Preview"
              className="size-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-500"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 p-6 transition hover:bg-white/10">
            <Upload size={24} className="mb-2 text-white/50" />
            <span className="text-sm font-medium text-white/70">
              Pilih / upload gambar project
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-white/70">Judul</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-white/70">Deskripsi</label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-white/70">
          Tech Stack (pisahkan dengan koma)
        </label>
        <input
          required
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          placeholder="Next.js, TypeScript, Tailwind"
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-white/70">Status</label>
        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as "completed" | "in_progress" })
          }
          className={`${inputClass} bg-zinc-900`}
        >
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-white/70">Demo URL (opsional)</label>
        <input
          value={form.demoUrl}
          onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-white/70">Repo URL (opsional)</label>
        <input
          value={form.repoUrl}
          onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 px-6 py-3 font-medium text-white transition disabled:opacity-60 cursor-pointer"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {loading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Project"}
      </button>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}