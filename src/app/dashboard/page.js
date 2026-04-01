"use client";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, role, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none" }}>
            Chashma Learn
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "14px", color: "#6b7280" }}>{user.email}</span>
            <span style={{ fontSize: "12px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase" }}>
              {role}
            </span>
            <button
              onClick={logout}
              style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", backgroundColor: "#036c48", padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ paddingTop: "100px", maxWidth: "1200px", margin: "0 auto", padding: "100px 32px 48px" }}>

        {/* Welcome */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", marginBottom: "8px" }}>
            Welcome, {user.displayName || user.email} 👋
          </h1>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>
            Your role is <strong style={{ color: "#036c48" }}>{role}</strong>. Choose a learning mode to begin.
          </p>
        </div>

        {/* Mode cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "48px" }}>
          {[
            { href: "/english", icon: "language",  title: "General English", desc: "Grammar, vocabulary, writing and more" },
            { href: "/ielts",   icon: "school",     title: "IELTS Academic",  desc: "Complete IELTS preparation"            },
            { href: "/sat",     icon: "menu_book",  title: "SAT Preparation", desc: "Digital SAT mastery"                   },
          ].map((mode) => (
            <Link
              key={mode.href}
              href={mode.href}
              style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px", textDecoration: "none", display: "block" }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>{mode.icon}</span>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>{mode.title}</h3>
              <p style={{ fontSize: "14px", color: "#6b7280" }}>{mode.desc}</p>
            </Link>
          ))}
        </div>

        {/* My progress */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", marginBottom: "20px" }}>My Progress</h2>
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>You haven't started any lessons yet. Pick a mode above to begin.</p>
        </div>

      </div>
    </div>
  );
}
