import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc } from "drizzle-orm";
import DeleteBlogButton from "@/components/delete-blog-button";

export default async function AdminBlogPage() {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Blog</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white"
        >
          <Plus size={16} />
          Tulis Baru
        </Link>
      </div>

      <div className="space-y-3">
        {posts.length === 0 && <p className="text-white/50">Belum ada tulisan.</p>}
        {posts.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div>
              <p className="font-medium text-white">{p.title}</p>
              <span
                className={`text-xs ${p.published ? "text-emerald-400" : "text-white/40"}`}
              >
                {p.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/blog/${p.id}/edit`}
                className="text-sm text-emerald-400 hover:underline"
              >
                Edit
              </Link>
              <DeleteBlogButton id={p.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}