import { ChevronRight } from "lucide-react";

function Table() {
    return ( 
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
            <h2 className="font-bold text-slate-900">Recent Litigations</h2>
            <button className="text-xs font-bold text-[#002B5C] uppercase tracking-tighter hover:underline">Full Directory</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Case Identifier</th>
                  <th className="px-6 py-4">Primary Parties</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {[
                  { id: "LC-2026-001", name: "SINPF vs. Honiara Logistics", status: "Active" },
                  { id: "LC-2026-042", name: "Member Claim: J. Doe", status: "Review" },
                  { id: "LC-2025-899", name: "Compliance Audit: Area 4", status: "Closed" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-all cursor-pointer group">
                    <td className="px-6 py-5 font-mono text-[11px] text-slate-400">{row.id}</td>
                    <td className="px-6 py-5 font-semibold text-slate-700">{row.name}</td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                        row.status === 'Active' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                        row.status === 'Review' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-4 h-4 text-slate-400 inline" />
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