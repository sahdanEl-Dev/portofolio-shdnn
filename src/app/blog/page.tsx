export const dynamic = "force-dynamic";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import BlogGrid from "@/components/blog-grid";

export default async function BlogPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.createdAt));

  const formatted = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    content: p.content,
    coverImageUrl: p.coverImageUrl,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-10 text-3xl font-bold sm:text-4xl">Blog</h1>
      {formatted.length === 0 ? (
        <p className="text-white/50">Belum ada tulisan.</p>
      ) : (
        <BlogGrid posts={formatted} />
      )}
    </div>
  );
}