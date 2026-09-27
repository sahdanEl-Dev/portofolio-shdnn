import { db } from "@/db";
import { pageViews } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") ?? "month";

  const format =
    period === "day" ? "YYYY-MM-DD" : period === "year" ? "YYYY" : "YYYY-MM";

  const rows = await db
    .select({
      label: sql<string>`to_char(${pageViews.createdAt}, ${format})`,
      count: sql<number>`count(*)`,
    })
    .from(pageViews)
    .groupBy(sql`to_char(${pageViews.createdAt}, ${format})`)
    .orderBy(sql`to_char(${pageViews.createdAt}, ${format})`);

  return NextResponse.json(rows);
}