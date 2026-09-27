import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [item] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
  if (!item) return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "true";
  const file = formData.get("file") as File | null;

  const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
  if (!existing) return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });

  let coverImageUrl = existing.coverImageUrl;
  let coverImagePublicId = existing.coverImagePublicId;

  if (file && file.size > 0) {
    if (existing.coverImagePublicId) {
      await cloudinary.uploader.destroy(existing.coverImagePublicId).catch(() => {});
    }
    const result = await uploadCover(file);
    coverImageUrl = result.secure_url;
    coverImagePublicId = result.public_id;
  }

  const [updated] = await db
    .update(blogPosts)
    .set({ title, content, published, coverImageUrl, coverImagePublicId })
    .where(eq(blogPosts.id, Number(id)))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [item] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
  if (item?.coverImagePublicId) {
    await cloudinary.uploader.destroy(item.coverImagePublicId).catch(() => {});
  }
  await db.delete(blogPosts).where(eq(blogPosts.id, Number(id)));
  return NextResponse.json({ success: true });
}