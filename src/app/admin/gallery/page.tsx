import Link from "next/link";
import Image from "next/image";
import { Plus, Images, Pencil } from "lucide-react";
import { db } from "@/db";
import { galleryPosts, galleryImages } from "@/db/schema";
import { desc, asc } from "drizzle-orm";
import DeletePhotoButton from "@/components/delete-photo-button";

export default async function AdminGalleryPage() {
  const posts = await db
    .select()
    .from(galleryPosts)
    .orderBy(desc(galleryPosts.createdAt));

  const images = await db
    .select()
    .from(galleryImages)
    .orderBy(asc(galleryImages.order));

  const data = posts.map((post) => ({
    ...post,
    images: images.filter((img) => img.postId === post.id),
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Kelola Gallery</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Total {data.length} postingan tersimpan di gallery.
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
        >
          <Plus size={18} />
          Tambah Foto
        </Link>
      </div>

      {data.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-12 text-center text-white/50">
          Belum ada foto di gallery. Klik tombol &quot;Tambah Foto&quot; di atas untuk mengunggah.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data.map((post) => (
          <div
            key={post.id}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition hover:border-emerald-500/50"
          >
            {post.images[0] && (
              <Image
                src={post.images[0].imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            {post.images.length > 1 && (
              <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                <Images size={12} />
                {post.images.length}
              </span>
            )}

            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex justify-end gap-2">
                <Link
                  href={`/admin/gallery/${post.id}/edit`}
                  className="flex size-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-sky-500 transition"
                >
                  <Pencil size={14} />
                </Link>
                <DeletePhotoButton id={post.id} />
              </div>
              <div>
                <span className="inline-block rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400 backdrop-blur-md mb-1">
                  {post.category || "General"}
                </span>
                <p className="line-clamp-2 text-xs font-medium text-white">
                  {post.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}