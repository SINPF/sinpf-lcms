import { db } from "@/db";
import { caseReferrals, caseReferralTypes, employers, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavBar from "./navbar";
import CasesClient from "./cases-client";

export default async function CasesPage({
  searchParams,
}: {
  searchParams?: Promise<{ mine?: string; type?: string }>;
}) {
  const [session, params] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    searchParams ?? Promise.resolve({} as { mine?: string; type?: string }),
  ]);
  const currentUserId   = session?.user.id ?? null;
  const initialMyCases  = params.mine === "1";
  const initialCaseType = params.type ?? "";

  const [rows, allTypes, allEmployers] = await Promise.all([
    db
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
      .orderBy(desc(caseReferrals.createdAt)),

    db.select().from(caseReferralTypes),
    db.select({ id: employers.id, name: employers.name, code: employers.code }).from(employers).orderBy(employers.name),
  ]);

  const typesByCaseId = allTypes.reduce<Record<string, string[]>>((acc, t) => {
    (acc[t.caseReferralId] ??= []).push(t.caseType);
    return acc;
  }, {});

  const cases = rows.map((r) => ({ ...r, types: typesByCaseId[r.id] ?? [] }));

  return (
    <>
      <NavBar />
      <CasesClient
        cases={cases}
        employers={allEmployers}
        currentUserId={currentUserId}
        initialMyCases={initialMyCases}
        initialCaseType={initialCaseType}
      />
    </>
  );
}
