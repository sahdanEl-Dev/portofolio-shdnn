import { db } from "@/db";
import { pageViews } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") ?? "month";

  const format =
    period === "day" ? "YYYY-MM-DD" : period === "year" ? "YYYY" : "YYYY-MM";

  const groupExpr = sql`to_char(${pageViews.createdAt}, ${sql.raw(`'${format}'`)})`;

  const rows = await db
    .select({
      label: groupExpr.as("label"),
      count: sql<number>`count(*)`,
    })
    .from(pageViews)
    .groupBy(groupExpr)
    .orderBy(groupExpr);

  return NextResponse.json(rows);
}