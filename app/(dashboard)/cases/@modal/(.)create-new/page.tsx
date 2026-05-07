"use client";
import Modal from "@/components/ui/Modal";
import CaseForm from "@/app/(dashboard)/cases/caseform";
import { useRouter } from "next/navigation";

export default function InterceptedModal() {
  const router = useRouter();
  return (
    <Modal onClose={() => router.back()}>
      <CaseForm onClose={() => router.back()} />
    </Modal>
  );
}
