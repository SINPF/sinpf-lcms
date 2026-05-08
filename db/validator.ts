import { createInsertSchema } from "drizzle-zod";
import { caseReferrals, employers } from "./schema";
import { z } from "zod";

const baseCaseSchema = createInsertSchema(caseReferrals);

export const insertCaseSchema = baseCaseSchema.extend({
  employerId:         z.string().min(1, "Employer is required"),
  totalContributions: z.coerce.number().min(0),
  totalSurcharges:    z.coerce.number().min(0),
  wagesRecord:        z.coerce.number().min(0),
  grandTotalClaim:    z.coerce.number().min(0),
  selectedTypes:      z.array(z.string()).default([]),
});

export type CaseFormValues = z.infer<typeof insertCaseSchema>;

const baseEmployerSchema = createInsertSchema(employers);

export const insertEmployerSchema = baseEmployerSchema.extend({
  name:    z.string().min(1, "Employer name is required"),
  code:    z.string().min(1, "Employer code is required"),
  phone:   z.string().optional(),
  address: z.string().optional(),
});

export type EmployerFormValues = z.infer<typeof insertEmployerSchema>;
