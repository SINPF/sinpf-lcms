// validators.ts
import { createInsertSchema } from "drizzle-zod";
import { caseReferrals } from "./schema";
import { z } from "zod";

// Base schema from Drizzle — only what's actually in the DB
const baseSchema = createInsertSchema(caseReferrals);

// Extend + override to fix numeric inference and add UI-only fields
export const insertCaseSchema = baseSchema.extend({
  // Fix numeric → number (drizzle-zod infers these as unknown)
  totalContributions: z.coerce.number().min(0),
  totalSurcharges: z.coerce.number().min(0),
  wagesRecord: z.coerce.number().min(0),
  grandTotalClaim: z.coerce.number().min(0),
  // Validation rules
  employerName: z.string().min(1, "Employer name is required"),
  employerCode: z.string().min(1, "Employer code is required"),
  // UI-only field — not in DB, stripped before insert
  selectedTypes: z.array(z.string()).default([]),
});

export type CaseFormValues = z.infer<typeof insertCaseSchema>;