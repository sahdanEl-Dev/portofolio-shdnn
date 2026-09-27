import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  const all = await db.select().from(projects).orderBy(desc(projects.createdAt));
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const techStack = formData.get("techStack") as string;
    const status = formData.get("status") as string;
    const demoUrl = formData.get("demoUrl") as string;
    const repoUrl = formData.get("repoUrl") as string;
    const file = formData.get("image") as File | null;

    if (!title || !description || !techStack) {
      return NextResponse.json(
        { error: "Judul, deskripsi, dan tech stack wajib diisi." },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    // Jika pengguna mengunggah gambar, upload ke Cloudinary
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

    const [created] = await db
      .insert(projects)
      .values({
        title,
        description,
        techStack,
        status: status === "completed" ? "completed" : "in_progress",
        demoUrl: demoUrl || null,
        repoUrl: repoUrl || null,
        imageUrl,
      })
      .returning();

    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan project baru." },
      { status: 500 }
    );
  }
}