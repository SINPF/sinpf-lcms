"use client";
import Table from "../page"; // Import your main table component

import CaseFormModal from "../../components/caseform-modal";
import { useRouter } from "next/navigation";

export default function ManualCreatePage() {
  const router = useRouter();

  return (
    <>
      {/* 1. Show the table so the background isn't blank */}
      <Table />

      {/* 2. Show the modal on top */}
      <CaseFormModal onClose={() => router.push("/cases")} />
    </>
  );
}
