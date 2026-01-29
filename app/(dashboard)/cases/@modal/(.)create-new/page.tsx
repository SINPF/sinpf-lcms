"use client";
import CaseFormModal from "@/app/(dashboard)/components/caseform-modal";

import { useRouter } from "next/navigation";

export default function InterceptedModal() {
  const router = useRouter();
  return <CaseFormModal onClose={() => router.back()} />;
}
