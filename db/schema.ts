import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, pgEnum, numeric, date } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));


// Enums
export const caseTypeEnum = pgEnum("case_type", [
  "unpaid_contributions",
  "unpaid_surcharges",
  "wages_record",
]);

export const caseStatusEnum = pgEnum("case_status", [
  "referred",
  "in_progress",
  "resolved",
  "closed",
]);

// Main case referral table
export const caseReferrals = pgTable("case_referrals", {
  id:                 text("id").primaryKey().default(sql`gen_random_uuid()`),

  // Section 1: Employer Info
  employerName:       text("employer_name").notNull(),
  employerCode:       text("employer_code").notNull(),
  referralDate:       date("referral_date").notNull().default(sql`CURRENT_DATE`),

  // Section 2: Financials
  totalContributions: numeric("total_contributions", { precision: 15, scale: 2 }).notNull().default("0"),
  totalSurcharges:    numeric("total_surcharges",    { precision: 15, scale: 2 }).notNull().default("0"),
  wagesRecord:        numeric("wages_record",        { precision: 15, scale: 2 }).notNull().default("0"),
  grandTotalClaim:    numeric("grand_total_claim",   { precision: 15, scale: 2 }).notNull().default("0"),
  // grandTotalClaim = totalContributions + totalSurcharges + wagesRecord
  // Computed on the application layer before insert/update

  // Section 3: Status
  status:             caseStatusEnum("status").notNull().default("referred"),

  // Timestamps
  createdAt:          timestamp("created_at").notNull().default(sql`now()`),
  updatedAt:          timestamp("updated_at").notNull().default(sql`now()`),
});

// Case types (many-to-many — one case can have multiple types)
export const caseReferralTypes = pgTable("case_referral_types", {
  id:             text("id").primaryKey().default(sql`gen_random_uuid()`),
  caseReferralId: text("case_referral_id").notNull().references(() => caseReferrals.id, { onDelete: "cascade" }),
  caseType:       caseTypeEnum("case_type").notNull(),
});

// Attachments
export const caseAttachments = pgTable("case_attachments", {
  id:             text("id").primaryKey().default(sql`gen_random_uuid()`),
  caseReferralId: text("case_referral_id").notNull().references(() => caseReferrals.id, { onDelete: "cascade" }),
  fileName:       text("file_name").notNull(),
  fileType:       text("file_type").notNull(),   // "pdf" | "excel" | "csv"
  fileUrl:        text("file_url").notNull(),     // path or storage URL
  uploadedAt:     timestamp("uploaded_at").notNull().default(sql`now()`),
});
