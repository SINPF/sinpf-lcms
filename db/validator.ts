import { createInsertSchema } from "drizzle-zod";
import { caseReferrals } from "./schema";
import { z } from "zod";

const baseSchema = createInsertSchema(caseReferrals);

export const insertCaseSchema = baseSchema.extend({
  totalContributions: z.coerce.number().min(0),
  totalSurcharges: z.coerce.number().min(0),
  wagesRecord: z.coerce.number().min(0),
  grandTotalClaim: z.coerce.number().min(0),
  employerName: z.string().min(1, "Employer name is required"),
  employerCode: z.string().min(1, "Employer code is required"),
  selectedTypes: z.array(z.string()).default([]),
});

export type CaseFormValues = z.infer<typeof insertCaseSchema>;
