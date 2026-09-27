import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { galleryPosts, galleryImages } from "@/db/schema";
import { eq, asc, inArray } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postId = Number(id);

  const [post] = await db
    .select()
    .from(galleryPosts)
    .where(eq(galleryPosts.id, postId));

  if (!post) {
    return NextResponse.json({ error: "Post tidak ditemukan." }, { status: 404 });
  }

  const images = await db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.postId, postId))
    .orderBy(asc(galleryImages.order));

  return NextResponse.json({ ...post, images });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = Number(id);

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const takenAt = formData.get("takenAt") as string;
    const newFiles = formData.getAll("files") as File[];
    const deleteIds = formData.getAll("deleteImageIds") as string[];

    if (!title) {
      return NextResponse.json({ error: "Judul wajib diisi." }, { status: 400 });
    }

    await db
      .update(galleryPosts)
      .set({
        title,
        description: description || null,
        category: category || "General",
        takenAt: takenAt ? new Date(takenAt) : null,
      })
      .where(eq(galleryPosts.id, postId));

    if (deleteIds.length > 0) {
      const idsToDelete = deleteIds.map(Number);
      const imgsToDelete = await db
        .select()
        .from(galleryImages)
        .where(inArray(galleryImages.id, idsToDelete));

      await Promise.all(
        imgsToDelete.map((img) => cloudinary.uploader.destroy(img.publicId).catch(() => {}))
      );

      await db.delete(galleryImages).where(inArray(galleryImages.id, idsToDelete));
    }

    if (newFiles.length > 0) {
      const existingImages = await db
        .select()
        .from(galleryImages)
        .where(eq(galleryImages.postId, postId));
      let nextOrder = existingImages.length;

      for (const file of newFiles) {
        const bytes = await file.arrayBuffer();
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
          postId,
          imageUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          order: nextOrder,
        });
        nextOrder++;
      }
    }

    const [updatedPost] = await db
      .select()
      .from(galleryPosts)
      .where(eq(galleryPosts.id, postId));

    const finalImages = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.postId, postId))
      .orderBy(asc(galleryImages.order));

    return NextResponse.json({ ...updatedPost, images: finalImages });
  } catch (error) {
    console.error("Error update gallery post:", error);
    return NextResponse.json({ error: "Gagal memperbarui postingan." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postId = Number(id);

  const imgs = await db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.postId, postId));

  await Promise.all(
    imgs.map((img) => cloudinary.uploader.destroy(img.publicId).catch(() => {}))
  );

  await db.delete(galleryPosts).where(eq(galleryPosts.id, postId));

  return NextResponse.json({ success: true });
}