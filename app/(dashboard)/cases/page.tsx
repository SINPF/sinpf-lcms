import { db } from "@/db";
import { caseReferrals, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import NavBar from "./navbar";
import Table from "./table";

export default async function CasesPage() {
  const cases = await db
    .select({
      id: caseReferrals.id,
      employerName: caseReferrals.employerName,
      employerCode: caseReferrals.employerCode,
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
    .leftJoin(user, eq(caseReferrals.assignedTo, user.id))
    .orderBy(desc(caseReferrals.createdAt));

  return (
    <>
      <NavBar />
      <Table cases={cases} />
    </>
  );
}
