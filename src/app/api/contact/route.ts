import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { messages } from "@/db/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nama, email, pesan } = body;

  if (!nama || !email || !pesan) {
    return NextResponse.json(
      { error: "Semua kolom wajib diisi." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Format email tidak valid." },
      { status: 400 }
    );
  }

  await db.insert(messages).values({ name: nama, email, message: pesan });

  return NextResponse.json({ success: true });
}