"use client";

import { DataTable } from "@/components/ui/DataTable";
import { Badge, type BadgeStatus } from "@/components/ui/Badge";
import type { Column } from "@/components/ui/DataTable";
import {
  IconPencil,
  IconTrash,
  IconChevronRight,
} from "@tabler/icons-react";

type CaseRow = Record<string, unknown> & {
  id: string;
  parties: string;
  status: BadgeStatus;
};

const data: CaseRow[] = [
  { id: "LC-2026-001", parties: "SINPF vs. Honiara Logistics", status: "active" },
  { id: "LC-2026-042", parties: "Member Claim: J. Doe",        status: "filed" },
  { id: "LC-2025-899", parties: "Compliance Audit: Area 4",    status: "pending" },
];

const columns: Column<CaseRow>[] = [
  {
    key: "id",
    header: "Case Number",
    render: (v) => (
      <span className="font-mono text-[11px] text-muted-foreground tracking-tight">
        {String(v)}
      </span>
    ),
  },
  {
    key: "parties",
    header: "Parties",
    render: (v) => (
      <span className="text-sm font-medium text-foreground">{String(v)}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (v) => <Badge status={v as BadgeStatus} />,
  },
  {
    key: "id",
    header: "Actions",
    align: "right",
    render: (_, row) => (
      <div className="flex items-center justify-end gap-1">
        <button
          onClick={() => console.log("Edit", row.id)}
          className="p-1.5 text-muted-foreground hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all"
          title="Edit"
        >
          <IconPencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => console.log("Delete", row.id)}
          className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          title="Delete"
        >
          <IconTrash className="w-4 h-4" />
        </button>
        <IconChevronRight className="w-4 h-4 text-border ml-1" />
      </div>
    ),
  },
];

export default function Table() {
  return <DataTable columns={columns} data={data} keyField="id" />;
}
