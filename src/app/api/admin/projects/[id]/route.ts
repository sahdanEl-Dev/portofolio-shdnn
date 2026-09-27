import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [item] = await db.select().from(projects).where(eq(projects.id, Number(id)));

  if (!item) {
    return NextResponse.json({ error: "Project tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = Number(id);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: "ID Project tidak valid" },
        { status: 400 }
      );
    }

    // Ganti req.json() menjadi req.formData()
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const techStack = formData.get("techStack") as string;
    const status = formData.get("status") as string;
    const demoUrl = formData.get("demoUrl") as string;
    const repoUrl = formData.get("repoUrl") as string;

    // Ambil file baru jika diupload, atau simpan imageUrl lama
    const file = formData.get("image") as File | null;
    let imageUrl = (formData.get("imageUrl") as string) || null;

    if (!title || !description || !techStack) {
      return NextResponse.json(
        { error: "Judul, deskripsi, dan tech stack wajib diisi." },
        { status: 400 }
      );
    }

    // Jika pengguna mengunggah berkas foto baru saat edit
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "portofolio-projects" },
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result as { secure_url: string });
            }
          );
          stream.end(buffer);
        }
      );

      imageUrl = uploadResult.secure_url;
    }

    const [updated] = await db
      .update(projects)
      .set({
        title,
        description,
        techStack,
        status: status === "completed" ? "completed" : "in_progress",
        demoUrl: demoUrl || null,
        repoUrl: repoUrl || null,
        imageUrl,
      })
      .where(eq(projects.id, projectId))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui project." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.delete(projects).where(eq(projects.id, Number(id)));
  return NextResponse.json({ success: true });
}