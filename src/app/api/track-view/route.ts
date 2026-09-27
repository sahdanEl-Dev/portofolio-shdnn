import { db } from "@/db";
import { pageViews } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { path } = await req.json();
  await db.insert(pageViews).values({ path });
  return NextResponse.json({ success: true });
}