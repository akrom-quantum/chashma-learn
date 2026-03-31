"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/courses",   label: "Courses"   },
  { href: "/resources", label: "Resources" },
  { href: "/schedule",  label: "Schedule"  },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-8 h-16 w-full max-w-[1920px] mx-auto tracking-tight">
        
        {/* Left: Logo + nav links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-emerald-900 tracking-tighter">
            Chashma Learn
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-emerald-800 font-semibold border-b-2 border-emerald-800 pb-1"
                    : "text-zinc-600 hover:text-emerald-700 transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-emerald-800 hover:bg-emerald-50/50 transition-all rounded-full active:scale-95 duration-150">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-emerald-800 hover:bg-emerald-50/50 transition-all rounded-full active:scale-95 duration-150">
            <span className="material-symbols-outlined">help</span>
          </button>
          <div className="h-8 w-[1px] bg-zinc-200 mx-2" />
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-semibold text-primary hover:bg-surface-container-low transition-all rounded-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className="bg-zinc-100 h-[1px] w-full" />
    </nav>
  );
}
