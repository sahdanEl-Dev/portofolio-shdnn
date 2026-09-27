import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";
import { slugify } from "@/lib/slugify";

export async function GET() {
  const all = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  return NextResponse.json(all);
}

async function uploadCover(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "portofolio-blog" },
      (error, result) => {
        if (error || !result) reject(error);
        else resolve(result as { secure_url: string; public_id: string });
      }
    );
    stream.end(buffer);
  });
}

async function uniqueSlug(base: string) {
  let slug = base;
  let counter = 2;
  while (true) {
    const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    if (!existing) return slug;
    slug = `${base}-${counter}`;
    counter++;
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "true";
  const file = formData.get("file") as File | null;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Judul dan isi tulisan wajib diisi." },
      { status: 400 }
    );
  }

  const slug = await uniqueSlug(slugify(title));

  let coverImageUrl: string | null = null;
  let coverImagePublicId: string | null = null;

  if (file && file.size > 0) {
    const result = await uploadCover(file);
    coverImageUrl = result.secure_url;
    coverImagePublicId = result.public_id;
  }

  const [created] = await db
    .insert(blogPosts)
    .values({ title, slug, content, published, coverImageUrl, coverImagePublicId })
    .returning();

  return NextResponse.json(created);
}