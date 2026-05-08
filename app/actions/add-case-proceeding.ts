"use server";

import { db } from "@/db";
import { caseProceedings, caseActivities, caseReferrals } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function addCaseProceeding(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user.id) throw new Error("Not authenticated");

  const caseId        = formData.get("caseId") as string;
  const proceedingType = formData.get("proceedingType") as typeof caseProceedings.$inferInsert["proceedingType"];
  const court         = formData.get("court") as typeof caseProceedings.$inferInsert["court"];
  const hearingDate   = formData.get("hearingDate") as string | null;
  const nextDate      = formData.get("nextDate") as string | null;
  const outcomeNotes  = formData.get("outcomeNotes") as string | null;

  await db.insert(caseProceedings).values({
    caseReferralId: caseId,
    proceedingType,
    court,
    hearingDate:  hearingDate  || null,
    nextDate:     nextDate     || null,
    outcomeNotes: outcomeNotes || null,
    performedBy:  session.user.id,
  });

  // Log activity
  await db.insert(caseActivities).values({
    caseReferralId: caseId,
    activityType: "hearing_scheduled",
    notes: `${proceedingType.replace(/_/g, " ")} recorded at ${court.replace(/_/g, " ")}`,
    performedBy: session.user.id,
  });

  // Ensure case is in prosecution stage
  await db
    .update(caseReferrals)
    .set({ status: "prosecution", updatedAt: new Date() })
    .where(eq(caseReferrals.id, caseId));

  revalidatePath(`/cases/${caseId}`);
}
