import { cn } from "@/lib/utils";

export function ToolTextarea({
  label,
  value,
  onChange,
  rows = 8,
  id,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  id?: string;
  placeholder?: string;
}) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-brand-silver">{label}</label>
      <textarea
        id={inputId}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="input-brand font-mono"
      />
    </div>
  );
}

export function ToolInput({
  label,
  value,
  onChange,
  type = "text",
  id,
  min,
  max,
  step,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-brand-silver">{label}</label>
      <input
        id={inputId}
        type={type}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(e.target.value)}
        className="input-brand"
      />
    </div>
  );
}

export function ToolButton({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        variant === "primary" ? "btn-primary" : "btn-secondary",
        disabled && "opacity-50"
      )}
    >
      {children}
    </button>
  );
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-brand-navy-light/40 bg-brand-navy/40 p-4 text-center">
      <p className="text-2xl font-bold text-brand-white">{value}</p>
      <p className="text-sm text-brand-silver-muted">{label}</p>
    </div>
  );
}

export function OutputBox({ value, label }: { value: string; label?: string }) {
  return (
    <div>
      {label && <p className="mb-1.5 text-sm font-medium text-brand-silver">{label}</p>}
      <pre className="max-h-96 overflow-auto rounded-xl border border-brand-navy-light/40 bg-brand-black/40 p-3 text-sm whitespace-pre-wrap break-words text-brand-white">
        {value || "—"}
      </pre>
    </div>
  );
}

export function ToolSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-silver">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-brand"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-brand-navy text-brand-white">{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function ToolCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm text-brand-silver">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-brand-navy-light bg-brand-black text-brand-red focus:ring-brand-red"
      />
      {label}
    </label>
  );
}
