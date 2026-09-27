import { notFound } from "next/navigation";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import BlogForm from "@/components/blog-form";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Edit Tulisan</h1>
      <BlogForm
        postId={post.id}
        initial={{
          title: post.title,
          content: post.content,
          published: post.published,
          coverImageUrl: post.coverImageUrl,
        }}
      />
    </div>
  );
}