import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const unread = await db
      .select()
      .from(messages)
      .where(eq(messages.isRead, false));

    return NextResponse.json({ count: unread.length });
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    return NextResponse.json(
      { count: 0, error: "Gagal terhubung ke database" },
      { status: 500 }
    );
  }
}