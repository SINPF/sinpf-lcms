import { db } from "@/db";
import { employers } from "@/db/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await db
    .select({ id: employers.id, name: employers.name, code: employers.code })
    .from(employers)
    .orderBy(asc(employers.name));

  return NextResponse.json(rows);
}
