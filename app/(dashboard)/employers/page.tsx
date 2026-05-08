import { db } from "@/db";
import { employers, caseReferrals } from "@/db/schema";
import { eq, count, asc } from "drizzle-orm";
import EmployersClient from "./employers-client";

export default async function EmployersPage() {
  const rows = await db
    .select({
      id:        employers.id,
      name:      employers.name,
      code:      employers.code,
      phone:     employers.phone,
      address:   employers.address,
      createdAt: employers.createdAt,
      caseCount: count(caseReferrals.id),
    })
    .from(employers)
    .leftJoin(caseReferrals, eq(caseReferrals.employerId, employers.id))
    .groupBy(employers.id)
    .orderBy(asc(employers.name));

  return <EmployersClient employers={rows} />;
}
