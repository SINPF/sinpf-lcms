"use client";

import { useState } from "react";
import { Plus, Building2, Search, Phone, MapPin, Briefcase, Pencil, Check, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { updateEmployer } from "@/app/actions/update-employer";

type EmployerRow = {
  id: string;
  name: string;
  code: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  createdAt: Date;
  caseCount: number;
};

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all placeholder:text-muted-foreground/40";
const labelCls = "block text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-1.5";

function EditableCard({ emp }: { emp: EmployerRow }) {
  const [editing, setEditing] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [fields,  setFields]  = useState({
    name:    emp.name,
    code:    emp.code,
    phone:   emp.phone   ?? "",
    email:   emp.email   ?? "",
    address: emp.address ?? "",
  });

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateEmployer(emp.id, fields);
      setEditing(false);
    } catch {
      setError("Failed to save. Name or code may already be in use.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFields({ name: emp.name, code: emp.code, phone: emp.phone ?? "", email: emp.email ?? "", address: emp.address ?? "" });
    setEditing(false);
    setError(null);
  };

  if (editing) {
    return (
      <div className="p-5 rounded-2xl border border-brand-blue/40 bg-background shadow-sm space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2.5 rounded-xl bg-brand-blue/10">
            <Building2 className="w-5 h-5 text-brand-blue" />
          </div>
          <span className="text-xs font-semibold text-brand-blue">Editing</span>
        </div>

        <div className="space-y-2">
          <div>
            <label className={labelCls}>Name</label>
            <input value={fields.name} onChange={set("name")} className={inputCls} placeholder="e.g. Solomon Airlines" />
          </div>
          <div>
            <label className={labelCls}>Code</label>
            <input value={fields.code} onChange={set("code")} className={inputCls} maxLength={6} placeholder="6-char code" />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input value={fields.phone} onChange={set("phone")} className={inputCls} placeholder="+677 XXXXX" />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input value={fields.email} onChange={set("email")} type="email" className={inputCls} placeholder="employer@example.com" />
          </div>
          <div>
            <label className={labelCls}>Address</label>
            <input value={fields.address} onChange={set("address")} className={inputCls} placeholder="Street address" />
          </div>
        </div>

        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleSave}
            disabled={saving || !fields.name.trim() || !fields.code.trim()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue/90 disabled:opacity-50 transition-all active:scale-95"
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
            Save
          </button>
          <button
            onClick={handleCancel}
            disabled={saving}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-border hover:bg-muted transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative p-5 rounded-2xl border border-border bg-background hover:shadow-md hover:border-border/60 transition-all space-y-3">
      <button
        onClick={() => setEditing(true)}
        className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted hover:text-foreground transition-all"
        title="Edit employer"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>

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
        <div className="flex items-center gap-2 text-xs">
          <Phone className="w-3 h-3 shrink-0 text-muted-foreground" />
          {emp.phone
            ? <span className="text-muted-foreground">{emp.phone}</span>
            : <span className="italic text-muted-foreground/50">No phone</span>}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Mail className="w-3 h-3 shrink-0 text-muted-foreground" />
          {emp.email
            ? <span className="text-muted-foreground">{emp.email}</span>
            : <span className="italic text-muted-foreground/50">No email</span>}
        </div>
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
  );
}

export default function EmployersClient({ employers }: { employers: EmployerRow[] }) {
  const [query, setQuery] = useState("");

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
        <Link
          href="/employers/register"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-brand-blue text-white text-sm font-semibold shadow-sm hover:bg-brand-blue/90 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5px]" />
          Register Employer
        </Link>
      </div>

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
            <EditableCard key={emp.id} emp={emp} />
          ))}
        </div>
      )}
    </div>
  );
}
