"use client";

import Modal from "@/components/ui/Modal";
import EmployerRegisterForm from "@/app/(dashboard)/employers/employer-register-form";
import { useRouter } from "next/navigation";

export default function InterceptedModal() {
  const router = useRouter();
  return (
    <Modal onClose={() => router.back()}>
      <EmployerRegisterForm onClose={() => router.back()} />
    </Modal>
  );
}
