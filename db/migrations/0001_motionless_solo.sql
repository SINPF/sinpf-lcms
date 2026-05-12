CREATE TYPE "public"."activity_type" AS ENUM('stage_changed', 'assessment_completed', 'demand_letter_issued', 'negotiation_entered', 'negotiation_completed', 'prosecution_filed', 'hearing_scheduled', 'consent_order_entered', 'default_judgment_filed', 'enforcement_filed', 'case_discontinued', 'case_closed', 'document_added', 'note_added');--> statement-breakpoint
CREATE TYPE "public"."case_status" AS ENUM('registered', 'assessment', 'demand_issued', 'negotiation', 'prosecution', 'in_progress', 'resolved', 'closed');--> statement-breakpoint
CREATE TYPE "public"."case_type" AS ENUM('unpaid_contributions', 'unpaid_surcharges', 'wages_record');--> statement-breakpoint
CREATE TYPE "public"."closure_reason" AS ENUM('statute_barred', 'incomplete_for_prosecution', 'employer_complied', 'withdrawn_by_sinpf', 'settled_out_of_court', 'other');--> statement-breakpoint
CREATE TYPE "public"."closure_type" AS ENUM('prosecution_completed', 'settlement_completed', 'other');--> statement-breakpoint
CREATE TYPE "public"."court_type" AS ENUM('high_court', 'magistrates_court');--> statement-breakpoint
CREATE TYPE "public"."proceeding_type" AS ENUM('trial', 'hearing', 'mention', 'consent_order', 'default_judgment', 'enforcement', 'discontinued');--> statement-breakpoint
CREATE TABLE "case_activities" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_referral_id" text NOT NULL,
	"activity_type" "activity_type" NOT NULL,
	"notes" text,
	"performed_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "case_attachments" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_referral_id" text NOT NULL,
	"file_name" text NOT NULL,
	"file_type" text NOT NULL,
	"file_url" text NOT NULL,
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "case_closure" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_referral_id" text NOT NULL,
	"closure_type" "closure_type" NOT NULL,
	"closure_reason" "closure_reason",
	"notes" text,
	"closed_by" text,
	"closed_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "case_closure_case_referral_id_unique" UNIQUE("case_referral_id")
);
--> statement-breakpoint
CREATE TABLE "case_proceedings" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_referral_id" text NOT NULL,
	"proceeding_type" "proceeding_type" NOT NULL,
	"court" "court_type" NOT NULL,
	"hearing_date" date,
	"next_date" date,
	"outcome_notes" text,
	"performed_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "case_referral_types" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_referral_id" text NOT NULL,
	"case_type" "case_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "case_referrals" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employer_id" text NOT NULL,
	"referral_date" date DEFAULT CURRENT_DATE NOT NULL,
	"total_contributions" numeric(15, 2) DEFAULT '0' NOT NULL,
	"total_surcharges" numeric(15, 2) DEFAULT '0' NOT NULL,
	"wages_record" numeric(15, 2) DEFAULT '0' NOT NULL,
	"grand_total_claim" numeric(15, 2) DEFAULT '0' NOT NULL,
	"status" "case_status" DEFAULT 'registered' NOT NULL,
	"assigned_to" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employers" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"phone" text,
	"email" text,
	"address" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "employers_name_unique" UNIQUE("name"),
	CONSTRAINT "employers_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "case_activities" ADD CONSTRAINT "case_activities_case_referral_id_case_referrals_id_fk" FOREIGN KEY ("case_referral_id") REFERENCES "public"."case_referrals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_activities" ADD CONSTRAINT "case_activities_performed_by_user_id_fk" FOREIGN KEY ("performed_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_attachments" ADD CONSTRAINT "case_attachments_case_referral_id_case_referrals_id_fk" FOREIGN KEY ("case_referral_id") REFERENCES "public"."case_referrals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_closure" ADD CONSTRAINT "case_closure_case_referral_id_case_referrals_id_fk" FOREIGN KEY ("case_referral_id") REFERENCES "public"."case_referrals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_closure" ADD CONSTRAINT "case_closure_closed_by_user_id_fk" FOREIGN KEY ("closed_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_proceedings" ADD CONSTRAINT "case_proceedings_case_referral_id_case_referrals_id_fk" FOREIGN KEY ("case_referral_id") REFERENCES "public"."case_referrals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_proceedings" ADD CONSTRAINT "case_proceedings_performed_by_user_id_fk" FOREIGN KEY ("performed_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_referral_types" ADD CONSTRAINT "case_referral_types_case_referral_id_case_referrals_id_fk" FOREIGN KEY ("case_referral_id") REFERENCES "public"."case_referrals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_referrals" ADD CONSTRAINT "case_referrals_employer_id_employers_id_fk" FOREIGN KEY ("employer_id") REFERENCES "public"."employers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_referrals" ADD CONSTRAINT "case_referrals_assigned_to_user_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;