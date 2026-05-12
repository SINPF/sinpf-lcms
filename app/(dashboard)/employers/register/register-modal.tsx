"use client";

import Modal from "@/components/ui/Modal";
import EmployerRegisterForm from "@/app/(dashboard)/employers/employer-register-form";
import { useRouter } from "next/navigation";

export default function RegisterModal() {
  const router = useRouter();
  return (
    <Modal onClose={() => router.push("/employers")}>
      <EmployerRegisterForm onClose={() => router.push("/employers")} />
    </Modal>
  );
}
