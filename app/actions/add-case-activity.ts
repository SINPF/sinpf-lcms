"use server";

import { db } from "@/db";
import { caseActivities } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addCaseActivity(
  caseId: string,
  activityType: typeof caseActivities.$inferInsert["activityType"],
  notes?: string,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user.id) throw new Error("Not authenticated");

  await db.insert(caseActivities).values({
    caseReferralId: caseId,
    activityType,
    notes,
    performedBy: session.user.id,
  });

  revalidatePath(`/cases/${caseId}`);
}
