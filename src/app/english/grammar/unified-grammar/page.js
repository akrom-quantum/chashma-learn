import Link from "next/link";

export const dynamic = "force-dynamic";

// Unit list per book — add entries here as content grows
const BOOK_DATA = {
  "unified-grammar": {
    title: "Unified Grammar",
    description: "A complete grammar reference from beginner to advanced.",
    units: [
      { id: "unit-1", title: "The Present Perfect Tense",      level: "B1", time: "12 mins" },
      { id: "unit-2", title: "Present Perfect Continuous",      level: "B1", time: "10 mins", comingSoon: true },
      { id: "unit-3", title: "Past Perfect & Narrative Tenses", level: "B2", time: "14 mins", comingSoon: true },
    ],
  },
};

export default async function BookContentsPage({ params }) {
  const { subject, book } = await params;

  const bookData = BOOK_DATA[book] || {
    title: book.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: "",
    units: [],
  };

  const subjectLabel = subject.charAt(0).toUpperCase() + subject.slice(1).replace(/-/g, " ");

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none", letterSpacing: "-0.5px" }}>
            Chashma Learn
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <Link href="/courses" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Courses</Link>
            <Link href="/login" style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", backgroundColor: "#036c48", padding: "8px 20px", borderRadius: "8px", textDecoration: "none" }}>
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: "64px", maxWidth: "860px", margin: "0 auto", padding: "96px 48px 64px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", fontSize: "13px", color: "#9ca3af" }}>
          <Link href={`/english/${subject}`} style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>{subjectLabel}</Link>
          <span>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>{bookData.title}</span>
        </div>

        {/* Header */}
        <h1 style={{ fontSize: "38px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "12px" }}>
          {bookData.title}
        </h1>
        {bookData.description && (
          <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.7, marginBottom: "48px" }}>{bookData.description}</p>
        )}

        {/* Units list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {bookData.units.length === 0 && (
            <p style={{ color: "#9ca3af", fontSize: "15px" }}>No units added yet.</p>
          )}
          {bookData.units.map((unit, index) => (
            unit.comingSoon ? (
              <div key={unit.id} style={{ backgroundColor: "#ffffff", border: "1px solid #f3f4f6", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: 0.5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#9ca3af", minWidth: "32px" }}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: "#9ca3af" }}>{unit.title}</p>
                    <p style={{ fontSize: "12px", color: "#d1d5db", marginTop: "2px" }}>{unit.level} · {unit.time}</p>
                  </div>
                </div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", backgroundColor: "#f3f4f6", padding: "4px 10px", borderRadius: "999px" }}>Coming Soon</span>
              </div>
            ) : (
              <Link key={unit.id} href={`/english/${subject}/${book}/${unit.id}`} style={{ textDecoration: "none" }}>
                <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.15s, box-shadow 0.15s", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#036c48"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(3,108,72,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                >
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
            )
          ))}
        </div>

      </div>
    </div>
  );
}
