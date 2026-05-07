"use client";
import Table from "../page";
import Modal from "@/components/ui/Modal";
import CaseForm from "../caseform";
import { useRouter } from "next/navigation";

export default function ManualCreatePage() {
  const router = useRouter();

  return (
    <>
      <Table />
      <Modal onClose={() => router.push("/cases")}>
        <CaseForm onClose={() => router.push("/cases")} />
      </Modal>
    </>
  );
}
