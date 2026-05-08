import { db } from "@/db";
import { caseReferrals, caseReferralTypes, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import NavBar from "./navbar";
import Table from "./table";

export default async function CasesPage() {
  const [rows, allTypes] = await Promise.all([
    db
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
      .orderBy(desc(caseReferrals.createdAt)),

    db.select().from(caseReferralTypes),
  ]);

  const typesByCaseId = allTypes.reduce<Record<string, string[]>>((acc, t) => {
    (acc[t.caseReferralId] ??= []).push(t.caseType);
    return acc;
  }, {});

  const cases = rows.map((r) => ({ ...r, types: typesByCaseId[r.id] ?? [] }));

  return (
    <>
      <NavBar />
      <Table cases={cases} />
    </>
  );
}
