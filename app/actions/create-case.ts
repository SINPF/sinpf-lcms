"use server";

import { db } from "@/db";
import { caseReferrals, caseReferralTypes, caseAttachments } from "@/db/schema";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const TYPE_MAP: Record<string, "unpaid_contributions" | "unpaid_surcharges" | "wages_record"> = {
  "Unpaid contributions": "unpaid_contributions",
  "Unpaid surcharges": "unpaid_surcharges",
  "Wages record": "wages_record",
};

export async function createCase(formData: FormData) {
  const [newCase] = await db
    .insert(caseReferrals)
    .values({
      employerName: formData.get("employerName") as string,
      employerCode: formData.get("employerCode") as string,
      referralDate: formData.get("referralDate") as string,
      totalContributions: formData.get("totalContributions") as string,
      totalSurcharges: formData.get("totalSurcharges") as string,
      wagesRecord: formData.get("wagesRecord") as string,
      grandTotalClaim: formData.get("grandTotalClaim") as string,
    })
    .returning({ id: caseReferrals.id });

  const selectedTypes = formData.getAll("selectedTypes") as string[];
  if (selectedTypes.length > 0) {
    await db.insert(caseReferralTypes).values(
      selectedTypes
        .filter((t) => TYPE_MAP[t])
        .map((t) => ({ caseReferralId: newCase.id, caseType: TYPE_MAP[t] }))
    );
  }

  const files = formData.getAll("files") as File[];
  if (files.length > 0) {
    const uploadDir = path.join(process.cwd(), "public", "uploads", "cases", newCase.id);
    await mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      const safeName = file.name.replace(/[^a-z0-9._-]/gi, "_");
      await writeFile(path.join(uploadDir, safeName), Buffer.from(await file.arrayBuffer()));

      const ext = path.extname(file.name).slice(1).toLowerCase();
      await db.insert(caseAttachments).values({
        caseReferralId: newCase.id,
        fileName: file.name,
        fileType: ext === "pdf" ? "pdf" : ext === "csv" ? "csv" : "excel",
        fileUrl: `/uploads/cases/${newCase.id}/${safeName}`,
      });
    }
  }

  return { caseId: newCase.id };
}
