import { db } from "@/db"; // Sesuaikan path db kamu
import { messages } from "@/db/schema"; // Sesuaikan path schema kamu
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Type untuk Next.js 15+
) {
  try {
    // 1. Await params (Wajib di Next.js 15+)
    const { id } = await params;

    // 2. Konversi id ke Number
    const messageId = parseInt(id, 10);

    if (isNaN(messageId)) {
      return NextResponse.json(
        { error: "Invalid Message ID" },
        { status: 400 }
      );
    }

    // 3. Update database
    await db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, messageId));

    return NextResponse.json({ success: true, id: messageId });
  } catch (error) {
    console.error("Error updating message status:", error);
    return NextResponse.json(
      { error: "Failed to mark message as read" },
      { status: 500 }
    );
  }
}