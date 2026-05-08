"use server";

import { db } from "@/db";
import { caseClosure, caseActivities, caseReferrals } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import caseEvents from "@/lib/case-events";

export async function closeCase(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user.id) throw new Error("Not authenticated");

  const caseId       = formData.get("caseId") as string;
  const closureType  = formData.get("closureType") as typeof caseClosure.$inferInsert["closureType"];
  const closureReason = formData.get("closureReason") as typeof caseClosure.$inferInsert["closureReason"] | null;
  const notes        = formData.get("notes") as string | null;

  await db.insert(caseClosure).values({
    caseReferralId: caseId,
    closureType,
    closureReason:  closureReason || null,
    notes:          notes || null,
    closedBy:       session.user.id,
  });

  await db
    .update(caseReferrals)
    .set({ status: "closed", updatedAt: new Date() })
    .where(eq(caseReferrals.id, caseId));

  await db.insert(caseActivities).values({
    caseReferralId: caseId,
    activityType: "case_closed",
    notes: notes ?? `Case closed — ${closureType.replace(/_/g, " ")}`,
    performedBy: session.user.id,
  });

  revalidatePath(`/cases/${caseId}`);
  caseEvents.emit("cases:updated");
}
