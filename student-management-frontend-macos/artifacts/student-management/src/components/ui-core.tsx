import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { AlertTriangle, Check, ChevronDown, Loader2, Search, X } from "lucide-react";

export function Button({ children, variant = "primary", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20",
    secondary: "border border-border bg-card text-foreground hover:border-primary/35 hover:bg-muted",
    ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };
  return <button className={`inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`} {...props}>{children}</button>;
}

export function IconButton({ label, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return <button aria-label={label} title={label} className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-40" {...props}>{children}</button>;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "teal" | "amber" | "red" | "blue" | "green" }) {
  const styles = { neutral: "bg-muted text-muted-foreground", teal: "bg-primary/10 text-primary", amber: "bg-secondary/20 text-amber-800", red: "bg-destructive/10 text-destructive", blue: "bg-sky-100 text-sky-700", green: "bg-emerald-100 text-emerald-700" };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[.06em] ${styles[tone]}`}>{children}</span>;
}

export function Panel({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <section className={`rounded-2xl border border-card-border bg-card shadow-sm shadow-slate-900/[.025] ${className}`} {...props}>{children}</section>;
}

export function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div className="animate-rise-in"><p className="mb-2 font-mono text-[10px] uppercase tracking-[.22em] text-primary">{eyebrow}</p><h1 className="font-display text-3xl font-bold tracking-[-.045em] text-foreground sm:text-[38px]">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p></div>{action && <div className="animate-rise-in stagger-1">{action}</div>}</div>;
}

export function SearchField({ value, onChange, placeholder = "Search..." }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <label className="relative block min-w-0 flex-1"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" data-testid="input-search" /></label>;
}

export function SelectField({ value, onChange, options, label, testId }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; label?: string; testId?: string }) {
  return <label className="relative block">{label && <span className="mb-1.5 block text-[11px] font-bold text-muted-foreground">{label}</span>}<select value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full appearance-none rounded-xl border border-border bg-background px-3.5 pr-9 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" data-testid={testId}><option value="">All {label ?? "items"}</option>{options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-[13px] text-muted-foreground" /></label>;
}

export function Modal({ open, title, description, onClose, children }: { open: boolean; title: string; description?: string; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/35 p-4 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="w-full max-w-xl animate-rise-in rounded-2xl border border-border bg-card shadow-2xl shadow-slate-900/20"><div className="flex items-start justify-between border-b border-border p-5 sm:p-6"><div><h2 className="font-display text-lg font-bold tracking-[-.02em]">{title}</h2>{description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}</div><IconButton label="Close dialog" onClick={onClose}><X size={18} /></IconButton></div><div className="p-5 sm:p-6">{children}</div></div></div>;
}

export function FormField({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return <label className="block"><span className="mb-1.5 block text-[11px] font-bold text-muted-foreground">{label}</span>{children}{hint && <span className="mt-1 block text-[10px] text-muted-foreground">{hint}</span>}</label>;
}

export const inputClass = "h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10";

export function LoadingRows({ count = 5 }: { count?: number }) {
  return <div className="space-y-3 p-5">{Array.from({ length: count }).map((_, i) => <div key={i} className="flex items-center gap-4"><div className="skeleton h-9 w-9 rounded-full" /><div className="flex-1 space-y-2"><div className="skeleton h-3 w-1/3 rounded" /><div className="skeleton h-2.5 w-1/5 rounded" /></div><div className="skeleton h-7 w-16 rounded-lg" /></div>)}</div>;
}

export function QueryState({ loading, error, onRetry, children, empty, emptyAction }: { loading?: boolean; error?: boolean; onRetry?: () => void; children?: ReactNode; empty?: boolean; emptyAction?: ReactNode }) {
  if (loading) return <LoadingRows />;
  if (error) return <div className="flex flex-col items-center justify-center px-6 py-16 text-center"><div className="mb-3 rounded-full bg-destructive/10 p-3 text-destructive"><AlertTriangle size={21} /></div><p className="font-display font-bold">We couldn't load this view</p><p className="mt-1 max-w-sm text-xs text-muted-foreground">Check your connection and try again. Your data is safe.</p>{onRetry && <Button variant="secondary" className="mt-5" onClick={onRetry} data-testid="button-retry">Try again</Button>}</div>;
  if (empty) return <div className="flex flex-col items-center justify-center px-6 py-16 text-center"><div className="mb-3 rounded-full bg-primary/10 p-3 text-primary"><Check size={21} /></div><p className="font-display font-bold">Nothing here yet</p><p className="mt-1 max-w-sm text-xs text-muted-foreground">Once records are added, they will appear in this workspace.</p>{emptyAction && <div className="mt-5">{emptyAction}</div>}</div>;
  return <>{children}</>;
}

export function Saving({ active }: { active: boolean }) { return active ? <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground"><Loader2 size={13} className="animate-spin" /> Saving</span> : null; }

export function initials(name: string) { return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(); }