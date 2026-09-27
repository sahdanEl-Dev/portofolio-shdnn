import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));

  if (!post || !post.published) notFound();

  const paragraphs = post.content.split(/\n\s*\n/);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft size={16} />
        Kembali ke Blog
      </Link>

      <article className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl">
        {post.coverImageUrl && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-10">
          <p className="text-sm text-emerald-400 font-medium">
            {post.createdAt.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl text-white leading-tight">
            {post.title}
          </h1>

          <div className="mt-8 space-y-4 leading-relaxed text-white/70 border-t border-white/10 pt-8">
            {paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}