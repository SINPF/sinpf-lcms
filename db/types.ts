import { InferSelectModel } from "drizzle-orm";
import {
  caseReferrals,
  caseActivities,
  caseProceedings,
  caseClosure,
} from "./schema";

export type Case = InferSelectModel<typeof caseReferrals>;

export type CaseWithAssignee = Case & {
  assigneeName: string | null;
  assigneeEmail: string | null;
  types: string[];
};

export type CaseActivity = InferSelectModel<typeof caseActivities>;
export type CaseProceeding = InferSelectModel<typeof caseProceedings>;
export type CaseClosure = InferSelectModel<typeof caseClosure>;

export type CaseActivityWithUser = CaseActivity & {
  performerName: string | null;
  performerEmail: string | null;
};

export type CaseProceedingWithUser = CaseProceeding & {
  performerName: string | null;
  performerEmail: string | null;
};

export type CaseDetail = Case & {
  assigneeName: string | null;
  assigneeEmail: string | null;
  types: string[];
  activities: CaseActivityWithUser[];
  proceedings: CaseProceedingWithUser[];
  closure: CaseClosure | null;
};
