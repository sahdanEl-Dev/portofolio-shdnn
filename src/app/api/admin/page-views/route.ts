import { db } from "@/db";
import { pageViews } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await db
    .select({
      month: sql<string>`to_char(${pageViews.createdAt}, 'YYYY-MM')`,
      count: sql<number>`count(*)`,
    })
    .from(pageViews)
    .groupBy(sql`to_char(${pageViews.createdAt}, 'YYYY-MM')`)
    .orderBy(sql`to_char(${pageViews.createdAt}, 'YYYY-MM')`);

  return NextResponse.json(rows);
}