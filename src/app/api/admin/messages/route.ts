import { db } from "@/db";
import { messages } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") ?? 50);

  const data = await db
    .select()
    .from(messages)
    .orderBy(desc(messages.createdAt))
    .limit(limit);

  return NextResponse.json(data);
}