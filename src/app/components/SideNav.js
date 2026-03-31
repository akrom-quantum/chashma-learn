"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const modes = [
  { href: "/english", label: "General English", icon: "language"        },
  { href: "/ielts",   label: "IELTS Academic",  icon: "school"          },
  { href: "/sat",     label: "SAT Preparation", icon: "menu_book"       },
  { href: "/admin",   label: "Admin Tools",     icon: "settings_suggest"},
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 fixed left-0 top-16 bg-zinc-50 flex flex-col py-6 border-r border-zinc-200/50 hidden md:flex">
      
      {/* Header */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">school</span>
          </div>
          <div>
            <h3 className="text-on-surface font-bold tracking-tight">Learning Modes</h3>
            <p className="text-on-surface-variant text-[10px] uppercase tracking-wider mt-1">Academic Tracks</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 px-2">
        {modes.map((mode) => {
          const active = pathname.startsWith(mode.href);
          return (
            <Link
              key={mode.href}
              href={mode.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 my-1 cursor-pointer select-none transition-all duration-200 hover:translate-x-1 ${
                active
                  ? "bg-white text-emerald-900 shadow-sm"
                  : "text-zinc-500 hover:bg-zinc-100"
              }`}
            >
              <span className={`material-symbols-outlined ${active ? "text-primary" : ""}`}>
                {mode.icon}
              </span>
              <span>{mode.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 mt-auto space-y-4">
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
          <p className="text-[11px] font-bold text-primary uppercase tracking-tighter mb-2">Upgrade Plan</p>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Unlock advanced analytics and personal mentorship.
          </p>
        </div>
        <div className="space-y-1">
          <Link href="/settings" className="text-zinc-500 hover:bg-zinc-100 rounded-lg px-4 py-2 flex items-center gap-3 transition-all text-xs">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>settings</span>
            <span>Settings</span>
          </Link>
          <button className="w-full text-zinc-500 hover:bg-zinc-100 rounded-lg px-4 py-2 flex items-center gap-3 transition-all text-xs">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
