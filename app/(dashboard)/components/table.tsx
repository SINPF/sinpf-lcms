'use client'
import { ChevronRight, PencilLine, Trash2 } from "lucide-react";

function Table() {
  return (
    <div className="lg:col-span-2 bg-white border border-slate-200 overflow-hidden shadow-sm rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="tracking-tight text-slate-700">
              <th className="px-6 py-4 font-medium">Case Identifier</th>
              <th className="px-6 py-4 font-medium">Primary Parties</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50 font-body">
            {[
              { id: "LC-2026-001", name: "SINPF vs. Honiara Logistics", status: "Active" },
              { id: "LC-2026-042", name: "Member Claim: J. Doe", status: "Review" },
              { id: "LC-2025-899", name: "Compliance Audit: Area 4", status: "Closed" },
            ].map((row, i) => (
              <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5 font-mono text-[11px] text-slate-400 tracking-tighter">
                  {row.id}
                </td>
                <td className="px-6 py-5 text-slate-600 font-normal">
                  {row.name}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${
                      row.status === 'Active' ? 'bg-blue-500' : 
                      row.status === 'Review' ? 'bg-amber-500' : 'bg-slate-300'
                    }`} />
                    <span className="text-xs text-slate-500 font-normal">
                      {row.status}
                    </span>
                  </div>
                </td>
                
                {/* ACTIONS COLUMN */}
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); console.log("Edit", row.id); }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit Record"
                    >
                      <PencilLine className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); console.log("Delete", row.id); }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

                <td className="px-4 py-5 text-right">
                  <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-colors" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;