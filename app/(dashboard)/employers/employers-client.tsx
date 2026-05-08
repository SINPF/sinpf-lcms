"use client";

import { useState } from "react";
import { Plus, Building2, Search, X, Phone, MapPin, Briefcase } from "lucide-react";
import { createEmployer } from "@/app/actions/create-employer";

type EmployerRow = {
  id: string;
  name: string;
  code: string;
  phone: string | null;
  address: string | null;
  createdAt: Date;
  caseCount: number;
};

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all placeholder:text-muted-foreground/40";
const labelCls = "block text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-1.5";

function RegisterForm({ onDone }: { onDone: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createEmployer(new FormData(e.currentTarget));
      onDone();
    } catch {
      setError("Failed to register employer. Name or code may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl border border-border bg-background space-y-4">
      <h3 className="text-sm font-bold text-foreground">Register New Employer</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelCls}>Employer Name</label>
          <input name="name" required placeholder="e.g. Solomon Airlines" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Employer Code</label>
          <input name="code" required placeholder="e.g. SAL-0001" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone <span className="normal-case font-medium">(optional)</span></label>
          <input name="phone" placeholder="+677 XXXXX" className={inputCls} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Address <span className="normal-case font-medium">(optional)</span></label>
          <input name="address" placeholder="Street address" className={inputCls} />
        </div>
      </div>
      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onDone} className="px-4 py-2 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-all">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-6 py-2 rounded-xl bg-brand-blue text-white text-sm font-bold hover:bg-brand-blue/90 disabled:opacity-50 transition-all active:scale-95">
          {loading ? "Saving…" : "Register Employer"}
        </button>
      </div>
    </form>
  );
}

export default function EmployersClient({ employers }: { employers: EmployerRow[] }) {
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = employers.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.code.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Employers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {employers.length} registered employer{employers.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-brand-blue text-white text-sm font-semibold shadow-sm hover:bg-brand-blue/90 active:scale-95 transition-all"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4 stroke-[2.5px]" />}
          {showForm ? "Cancel" : "Register Employer"}
        </button>
      </div>

      {/* Register form */}
      {showForm && (
        <RegisterForm onDone={() => { setShowForm(false); window.location.reload(); }} />
      )}

      {/* Search */}
      <div className="relative group w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand-blue transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or code…"
          className="w-full pl-9 pr-4 h-10 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
        />
      </div>

      {/* Employers grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground">No employers found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((emp) => (
            <div key={emp.id} className="p-5 rounded-2xl border border-border bg-background hover:shadow-md hover:border-border/60 transition-all space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="p-2.5 rounded-xl bg-brand-blue/10">
                  <Building2 className="w-5 h-5 text-brand-blue" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px] font-bold font-mono">
                  {emp.code}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-snug">{emp.name}</p>
              </div>
              <div className="space-y-1">
                {emp.phone && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3 shrink-0" /> {emp.phone}
                  </div>
                )}
                {emp.address && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 shrink-0" /> {emp.address}
                  </div>
                )}
              </div>
              <div className="pt-2 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground">
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                <span>{emp.caseCount} {emp.caseCount === 1 ? "case" : "cases"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
