"use server";

import { db } from "@/db";
import { employers } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createEmployer(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user.id) throw new Error("Not authenticated");

  const name    = formData.get("name")    as string;
  const code    = formData.get("code")    as string;
  const phone   = formData.get("phone")   as string | null;
  const email   = formData.get("email")   as string | null;
  const address = formData.get("address") as string | null;

  const [employer] = await db
    .insert(employers)
    .values({ name, code, phone: phone || null, email: email || null, address: address || null })
    .returning();

  revalidatePath("/employers");
  return employer;
}
