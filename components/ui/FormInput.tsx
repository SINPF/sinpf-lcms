"use client";

import { useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const baseInputClasses =
  "w-full px-3.5 py-2.5 rounded-xl border bg-background text-foreground text-sm font-medium" +
  " placeholder:text-muted-foreground/40 transition-all" +
  " focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring";

const errorClasses = "border-red-400 focus:border-red-400 focus:ring-red-400/20";
const normalClasses = "border-border";

interface FieldWrapperProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FieldWrapper({ id, label, hint, error, required, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

/* ── Text / Number / Date Input ── */
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function FormInput({ label, hint, error, className = "", ...props }: FormInputProps) {
  const uid = useId();
  const id = props.id ?? uid;
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} required={props.required}>
      <input
        id={id}
        className={`${baseInputClasses} ${error ? errorClasses : normalClasses} ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
}

/* ── Select ── */
interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function FormSelect({
  label, hint, error, options, placeholder, className = "", ...props
}: FormSelectProps) {
  const uid = useId();
  const id = props.id ?? uid;
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} required={props.required}>
      <select
        id={id}
        className={`${baseInputClasses} ${error ? errorClasses : normalClasses} cursor-pointer ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

/* ── Textarea ── */
interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function FormTextarea({ label, hint, error, className = "", ...props }: FormTextareaProps) {
  const uid = useId();
  const id = props.id ?? uid;
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} required={props.required}>
      <textarea
        id={id}
        rows={props.rows ?? 4}
        className={`${baseInputClasses} ${error ? errorClasses : normalClasses} resize-y ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
}
