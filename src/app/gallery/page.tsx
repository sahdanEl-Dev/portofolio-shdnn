import { db } from "@/db";
import { galleryPosts, galleryImages } from "@/db/schema";
import { desc, asc } from "drizzle-orm";
import GalleryGrid from "@/components/gallery-grid";

export default async function GalleryPage() {
  const posts = await db
    .select()
    .from(galleryPosts)
    .orderBy(desc(galleryPosts.createdAt));

  const images = await db
    .select()
    .from(galleryImages)
    .orderBy(asc(galleryImages.order));

  const formatted = posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    category: post.category,
    takenAt: post.takenAt ? post.takenAt.toISOString() : null,
    images: images
      .filter((img) => img.postId === post.id)
      .map((img) => img.imageUrl),
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-10 text-3xl font-bold sm:text-4xl">Gallery</h1>
      {formatted.length === 0 ? (
        <p className="text-white/50">Belum ada foto ditambahkan.</p>
      ) : (
        <GalleryGrid photos={formatted} />
      )}
    </div>
  );
}