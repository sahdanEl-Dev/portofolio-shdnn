"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
  coverImageUrl: string | null;
  createdAt: string;
};

export default function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.map((post, i) => {
        const excerpt = post.content.slice(0, 120);
        return (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition hover:border-emerald-400/40 hover:-translate-y-1 duration-300"
            >
              {post.coverImageUrl ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-sky-500/20 to-emerald-500/20" />
              )}

              <div className="p-5">
                <p className="text-xs text-white/40">
                  {new Date(post.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white line-clamp-2">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60 line-clamp-2">
                  {excerpt}
                  {post.content.length > 120 ? "..." : ""}
                </p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}