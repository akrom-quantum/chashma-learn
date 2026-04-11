import Link from "next/link";

export const dynamic = "force-dynamic";

const UNITS = [
  { id: "unit-1", title: "Vocabulary Learning Strategies", level: "B1-C1", time: "40 mins" },
];

export default function UnifiedWordSkillsPage() {
  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none", letterSpacing: "-0.5px" }}>Chashma Learn</Link>
          <Link href="/dashboard" style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", backgroundColor: "#036c48", padding: "8px 20px", borderRadius: "8px", textDecoration: "none" }}>Dashboard</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "96px 48px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", fontSize: "13px", color: "#9ca3af" }}>
          <Link href="/english/oxford-word-skills" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>Oxford Word Skills</Link>
          <span>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Unified Word Skills</span>
        </div>

        <h1 style={{ fontSize: "38px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "12px" }}>Unified Word Skills</h1>
        <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.7, marginBottom: "48px" }}>
          All three OWS levels merged into one comprehensive reference. Each unit integrates Elementary, Intermediate, and Upper material into a single progressive lesson.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {UNITS.map((unit, index) => (
            <Link key={unit.id} href={`/english/oxford-word-skills/unified-word-skills/${unit.id}`} style={{ textDecoration: "none" }}>
              <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#036c48"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(3,108,72,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#d1fae5", minWidth: "32px" }}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>{unit.title}</p>
                    <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{unit.level} · {unit.time}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#036c48" }}>arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
