import { InferSelectModel } from "drizzle-orm";
import { caseReferrals } from "./schema";

export type Case = InferSelectModel<typeof caseReferrals>;
