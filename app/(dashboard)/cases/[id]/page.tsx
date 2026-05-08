import { notFound } from "next/navigation";
import { db } from "@/db";
import { caseReferrals, caseReferralTypes, caseActivities, caseProceedings, caseClosure, employers, user } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import CaseDetailClient from "./case-detail-client";
import type { CaseDetail } from "@/db/types";

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [row] = await db
    .select({
      id: caseReferrals.id,
      employerId: caseReferrals.employerId,
      employerName: employers.name,
      employerCode: employers.code,
      referralDate: caseReferrals.referralDate,
      totalContributions: caseReferrals.totalContributions,
      totalSurcharges: caseReferrals.totalSurcharges,
      wagesRecord: caseReferrals.wagesRecord,
      grandTotalClaim: caseReferrals.grandTotalClaim,
      status: caseReferrals.status,
      assignedTo: caseReferrals.assignedTo,
      createdAt: caseReferrals.createdAt,
      updatedAt: caseReferrals.updatedAt,
      assigneeName: user.name,
      assigneeEmail: user.email,
    })
    .from(caseReferrals)
    .innerJoin(employers, eq(caseReferrals.employerId, employers.id))
    .leftJoin(user, eq(caseReferrals.assignedTo, user.id))
    .where(eq(caseReferrals.id, id));

  if (!row) notFound();

  const [types, activities, proceedings, closureRows] = await Promise.all([
    db.select().from(caseReferralTypes).where(eq(caseReferralTypes.caseReferralId, id)),

    db
      .select({
        id: caseActivities.id,
        caseReferralId: caseActivities.caseReferralId,
        activityType: caseActivities.activityType,
        notes: caseActivities.notes,
        performedBy: caseActivities.performedBy,
        createdAt: caseActivities.createdAt,
        performerName: user.name,
        performerEmail: user.email,
      })
      .from(caseActivities)
      .leftJoin(user, eq(caseActivities.performedBy, user.id))
      .where(eq(caseActivities.caseReferralId, id))
      .orderBy(desc(caseActivities.createdAt)),

    db
      .select({
        id: caseProceedings.id,
        caseReferralId: caseProceedings.caseReferralId,
        proceedingType: caseProceedings.proceedingType,
        court: caseProceedings.court,
        hearingDate: caseProceedings.hearingDate,
        nextDate: caseProceedings.nextDate,
        outcomeNotes: caseProceedings.outcomeNotes,
        performedBy: caseProceedings.performedBy,
        createdAt: caseProceedings.createdAt,
        performerName: user.name,
        performerEmail: user.email,
      })
      .from(caseProceedings)
      .leftJoin(user, eq(caseProceedings.performedBy, user.id))
      .where(eq(caseProceedings.caseReferralId, id))
      .orderBy(desc(caseProceedings.createdAt)),

    db.select().from(caseClosure).where(eq(caseClosure.caseReferralId, id)),
  ]);

  const caseDetail: CaseDetail = {
    ...row,
    types: types.map((t) => t.caseType),
    activities,
    proceedings,
    closure: closureRows[0] ?? null,
  };

  return <CaseDetailClient caseDetail={caseDetail} />;
}
