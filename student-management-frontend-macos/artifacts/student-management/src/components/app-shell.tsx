import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  Bell,
  BookOpen,
  CalendarCheck2,
  ChevronRight,
  ClipboardList,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";

const navigation = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/students", label: "Students", icon: Users },
  { href: "/attendance", label: "Attendance", icon: CalendarCheck2 },
  { href: "/performance", label: "Performance", icon: ClipboardList },
  { href: "/leaves", label: "Leave requests", icon: BookOpen },
  { href: "/classes", label: "Classes", icon: GraduationCap },
  { href: "/reports", label: "Reports", icon: FileBarChart },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="noise min-h-[100dvh] bg-background text-foreground">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col bg-sidebar text-sidebar-foreground shadow-2xl shadow-slate-900/10 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[84px] items-center justify-between border-b border-sidebar-border px-6">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3" data-testid="link-brand">
            <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-teal-950/25">
              <GraduationCap size={22} strokeWidth={2.4} />
            </span>
            <span>
              <span className="block font-display text-[17px] font-bold tracking-[-.03em] text-white">Morrow</span>
              <span className="font-mono text-[9px] uppercase tracking-[.22em] text-sidebar-foreground/60">school ops</span>
            </span>
          </Link>
          <button className="rounded-lg p-2 text-sidebar-foreground/70 hover:bg-sidebar-accent lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation" data-testid="button-close-navigation">
            <X size={18} />
          </button>
        </div>
        <div className="px-4 pb-3 pt-7">
          <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-[.17em] text-sidebar-foreground/45">Workspace</p>
          <nav className="space-y-1">
            {navigation.map(({ href, label, icon: Icon }) => {
              const active = href === "/" ? location === "/" : location.startsWith(href);
              return (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all ${active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md shadow-teal-950/20" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`} data-testid={`link-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Icon size={17} strokeWidth={active ? 2.3 : 1.8} />
                  <span className="flex-1">{label}</span>
                  {active && <ChevronRight size={14} className="opacity-60" />}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto px-4 pb-5">
          <div className="mb-4 rounded-2xl border border-sidebar-border bg-sidebar-accent/60 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[.15em] text-sidebar-foreground/55">Term progress</span>
              <span className="text-[11px] font-bold text-sidebar-primary">Q2</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-sidebar/70"><div className="h-full w-[68%] rounded-full bg-sidebar-primary" /></div>
            <p className="mt-2 text-[11px] text-sidebar-foreground/55">12 weeks remaining in term</p>
          </div>
          <Link href="/settings" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-colors ${location.startsWith("/settings") ? "bg-sidebar-accent text-white" : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-white"}`} data-testid="link-nav-settings">
            <Settings size={17} />
            Settings
          </Link>
          <div className="mt-4 flex items-center gap-3 border-t border-sidebar-border px-3 pt-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-extrabold text-secondary-foreground">AK</div>
            <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-white">Avery Kim</p><p className="truncate text-[10px] text-sidebar-foreground/55">School administrator</p></div>
            <Bell size={15} className="text-sidebar-foreground/45" />
          </div>
        </div>
      </aside>
      {mobileOpen && <button className="fixed inset-0 z-30 bg-slate-950/35 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu overlay" data-testid="button-menu-overlay" />}
      <main className="min-h-[100dvh] lg:pl-[252px]">
        <header className="sticky top-0 z-20 flex h-[84px] items-center justify-between border-b border-border/75 bg-background/90 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-border bg-card p-2.5 text-muted-foreground lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation" data-testid="button-open-navigation"><Menu size={19} /></button>
            <div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">Tuesday, 15 October 2024</p><p className="mt-0.5 font-display text-sm font-semibold text-foreground">Good morning, Avery</p></div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />All systems operational</div>
            <button className="relative rounded-xl border border-border bg-card p-2.5 text-muted-foreground transition hover:border-primary/30 hover:text-primary" aria-label="View notifications" data-testid="button-notifications"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-secondary" /></button>
            <Link href="/settings" className="hidden h-9 w-9 items-center justify-center rounded-full bg-primary font-display text-xs font-extrabold text-primary-foreground sm:flex" data-testid="link-profile-settings">AK</Link>
          </div>
        </header>
        <div className="app-scroll mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">{children}</div>
      </main>
    </div>
  );
}