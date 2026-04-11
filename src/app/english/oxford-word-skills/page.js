import Link from "next/link";

export const dynamic = "force-dynamic";

const BOOKS = [
  {
    id: "unified-word-skills",
    title: "Unified Word Skills",
    description: "All three OWS levels merged into one master reference — Elementary, Intermediate, and Upper.",
    units: 1,
    level: "B1 – C1",
    icon: "auto_stories",
  },
  {
    id: "ows-elementary",
    title: "OWS Elementary",
    description: "Foundation vocabulary for A1–A2 learners.",
    units: 100,
    level: "A1 – A2",
    icon: "menu_book",
    comingSoon: true,
  },
  {
    id: "ows-intermediate",
    title: "OWS Intermediate",
    description: "Core vocabulary building for B1–B2 learners.",
    units: 100,
    level: "B1 – B2",
    icon: "menu_book",
    comingSoon: true,
  },
  {
    id: "ows-upper",
    title: "OWS Upper Intermediate",
    description: "Advanced vocabulary and style for C1 learners.",
    units: 100,
    level: "B2 – C1",
    icon: "menu_book",
    comingSoon: true,
  },
];

export default function OxfordWordSkillsPage() {
  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none", letterSpacing: "-0.5px" }}>Chashma Learn</Link>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <Link href="/courses" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Courses</Link>
            <Link href="/dashboard" style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", backgroundColor: "#036c48", padding: "8px 20px", borderRadius: "8px", textDecoration: "none" }}>Dashboard</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "96px 48px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", fontSize: "13px", color: "#9ca3af" }}>
          <Link href="/english" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>General English</Link>
          <span>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Oxford Word Skills</span>
        </div>

        <h1 style={{ fontSize: "38px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "12px" }}>Oxford Word Skills</h1>
        <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.7, marginBottom: "48px" }}>
          Vocabulary learning across all levels — from everyday words to advanced academic and professional English.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {BOOKS.map((book, index) => (
            book.comingSoon ? (
              <div key={book.id} style={{ backgroundColor: "#ffffff", border: "1px solid #f3f4f6", borderRadius: "12px", padding: "24px", display: "flex", alignItems: "center", gap: "16px", opacity: 0.5 }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "#9ca3af" }}>{book.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "#9ca3af", marginBottom: "4px" }}>{book.title}</p>
                  <p style={{ fontSize: "13px", color: "#d1d5db" }}>{book.description}</p>
                </div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", backgroundColor: "#f3f4f6", padding: "4px 10px", borderRadius: "999px" }}>Coming Soon</span>
              </div>
            ) : (
              <Link key={book.id} href={`/english/oxford-word-skills/${book.id}`} style={{ textDecoration: "none" }}>
                <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px", display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", transition: "border-color 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#036c48"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(3,108,72,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "#036c48" }}>{book.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>{book.title}</p>
                      <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "2px 8px", borderRadius: "999px" }}>{book.level}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#6b7280" }}>{book.description}</p>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#036c48" }}>arrow_forward</span>
                </div>
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
