"use client";

import { DataTable } from "@/components/ui/DataTable";
import { Badge, type BadgeStatus } from "@/components/ui/Badge";
import type { Column } from "@/components/ui/DataTable";
import { IconPencil, IconTrash, IconChevronRight } from "@tabler/icons-react";
import type { CaseWithAssignee } from "@/db/types";

type CaseRow = CaseWithAssignee & Record<string, unknown>;

const columns: Column<CaseRow>[] = [
  {
    key: "id",
    header: "Case ID",
    render: (v) => (
      <span className="font-mono text-[11px] text-muted-foreground tracking-tight">
        {String(v).slice(0, 8).toUpperCase()}
      </span>
    ),
  },
  {
    key: "employerName",
    header: "Employer",
    render: (v) => (
      <span className="text-sm font-medium text-foreground">{String(v)}</span>
    ),
  },
  {
    key: "employerCode",
    header: "Code",
    render: (v) => (
      <span className="font-mono text-[11px] text-muted-foreground">{String(v)}</span>
    ),
  },
  {
    key: "referralDate",
    header: "Referral Date",
    render: (v) => (
      <span className="text-sm text-muted-foreground">{String(v)}</span>
    ),
  },
  {
    key: "grandTotalClaim",
    header: "Total Claim",
    align: "right",
    render: (v) => (
      <span className="text-sm font-semibold text-foreground tabular-nums">
        {Number(v).toLocaleString("en-SB", { style: "currency", currency: "SBD" })}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (v) => <Badge status={v as BadgeStatus} />,
  },
  {
    key: "assigneeEmail",
    header: "Assigned To",
    render: (_, row) => {
      const display = row.assigneeName || row.assigneeEmail;
      return display ? (
        <span className="text-sm text-muted-foreground">{String(display)}</span>
      ) : (
        <span className="text-sm text-muted-foreground/40">—</span>
      );
    },
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

export default function Table({ cases }: { cases: CaseWithAssignee[] }) {
  return (
    <DataTable
      columns={columns}
      data={cases as CaseRow[]}
      keyField="id"
      emptyMessage="No cases found."
    />
  );
}
