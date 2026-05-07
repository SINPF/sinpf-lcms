import { db } from "@/db";
import { caseReferrals } from "@/db/schema";
import { desc } from "drizzle-orm";
import NavBar from "./navbar";
import Table from "./table";

export default async function CasesPage() {
  const cases = await db
    .select()
    .from(caseReferrals)
    .orderBy(desc(caseReferrals.createdAt));

  return (
    <>
      <NavBar />
      <Table cases={cases} />
    </>
  );
}
