import BlogForm from "@/components/blog-form";

export default function NewBlogPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Tulis Baru</h1>
      <BlogForm />
    </div>
  );
}