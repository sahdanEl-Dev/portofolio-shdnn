import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { galleryPosts, galleryImages } from "@/db/schema";
import { desc, asc, eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  const posts = await db
    .select()
    .from(galleryPosts)
    .orderBy(desc(galleryPosts.createdAt));

  const images = await db
    .select()
    .from(galleryImages)
    .orderBy(asc(galleryImages.order));

  const result = posts.map((post) => ({
    ...post,
    images: images.filter((img) => img.postId === post.id),
  }));

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const takenAt = formData.get("takenAt") as string;

    if (!files.length || !title) {
      return NextResponse.json(
        { error: "Minimal pilih 1 foto dan judul wajib diisi." },
        { status: 400 }
      );
    }

    const [post] = await db
      .insert(galleryPosts)
      .values({
        title,
        description: description || null,
        category: category || "General",
        takenAt: takenAt ? new Date(takenAt) : null,
      })
      .returning();

    for (let i = 0; i < files.length; i++) {
      const bytes = await files[i].arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "portofolio-gallery" },
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result as { secure_url: string; public_id: string });
            }
          );
          stream.end(buffer);
        }
      );

      await db.insert(galleryImages).values({
        postId: post.id,
        imageUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        order: i,
      });
    }

    const insertedImages = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.postId, post.id))
      .orderBy(asc(galleryImages.order));

    return NextResponse.json({ ...post, images: insertedImages });
  } catch (error) {
    console.error("Error batch upload gallery:", error);
    return NextResponse.json(
      { error: "Gagal mengunggah foto-foto gallery." },
      { status: 500 }
    );
  }
}