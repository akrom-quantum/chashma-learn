import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none", letterSpacing: "-0.5px" }}>
            Chashma Learn
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <Link href="/courses" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Courses</Link>
            <Link href="/resources" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Resources</Link>
            <Link href="/login" style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", backgroundColor: "#036c48", padding: "8px 20px", borderRadius: "8px", textDecoration: "none" }}>
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: "120px", paddingBottom: "80px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#d1fae5", color: "#036c48", fontSize: "11px", fontWeight: 700, padding: "6px 14px", borderRadius: "999px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "32px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "999px", backgroundColor: "#036c48", display: "inline-block" }} />
          The Elite Standard in Learning
        </div>
        <h1 style={{ fontSize: "72px", fontWeight: 800, color: "#111827", lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "24px" }}>
          Chashma <span style={{ color: "#036c48", fontStyle: "italic" }}>Learn</span>
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", lineHeight: 1.7, maxWidth: "520px", marginBottom: "40px", fontWeight: 300 }}>
          A curated academic journey for high-achievers. Master English through General English, IELTS, and SAT tracks.
        </p>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link href="/courses" style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "14px 32px", borderRadius: "8px", fontWeight: 700, fontSize: "15px", textDecoration: "none", letterSpacing: "-0.3px" }}>
            Start Learning
          </Link>
          <Link href="/courses" style={{ color: "#111827", padding: "14px 32px", borderRadius: "8px", fontWeight: 600, fontSize: "15px", textDecoration: "none", border: "1px solid #e5e7eb" }}>
            View Curriculum
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "48px", marginTop: "80px", paddingTop: "40px", borderTop: "1px solid #e5e7eb" }}>
          {[
            { value: "3",    label: "Learning Modes"    },
            { value: "100+", label: "Lessons"           },
            { value: "98%",  label: "Student Pass Rate" },
          ].map((stat) => (
            <div key={stat.label}>
              <p style={{ fontSize: "32px", fontWeight: 800, color: "#111827" }}>{stat.value}</p>
              <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px", fontWeight: 500 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODES */}
      <section style={{ backgroundColor: "#f3f4f6", padding: "80px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", marginBottom: "12px" }}>
              Choose Your Path
            </h2>
            <p style={{ fontSize: "16px", color: "#6b7280", fontWeight: 400 }}>
              Three specialized tracks, each built for real results.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              {
                href:    "/english",
                icon:    "language",
                badge:   "Foundational",
                title:   "General English",
                desc:    "Grammar, vocabulary, writing, pronunciation, idioms, and collocations — from foundations to fluency.",
                tags:    ["Grammar", "Vocabulary", "Writing", "Pronunciation"],
                btnText: "Begin Track",
                featured: false,
              },
              {
                href:    "/ielts",
                icon:    "school",
                badge:   "Most Popular",
                title:   "IELTS Academic",
                desc:    "Complete preparation for all four IELTS skills with tips, topics, practice, and prediction tests.",
                tags:    ["Listening", "Reading", "Speaking", "Writing"],
                btnText: "Enroll in IELTS",
                featured: true,
              },
              {
                href:    "/sat",
                icon:    "menu_book",
                badge:   "New",
                title:   "SAT Preparation",
                desc:    "Strategic mastery for the Digital SAT — English, vocabulary, and math with unit-based structure.",
                tags:    ["English", "Vocabulary", "Math"],
                btnText: "Start SAT Prep",
                featured: false,
              },
            ].map((mode) => (
              <div
                key={mode.href}
                style={{
                  backgroundColor: mode.featured ? "#036c48" : "#ffffff",
                  borderRadius: "16px",
                  padding: "32px",
                  border: mode.featured ? "none" : "1px solid #e5e7eb",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  position: "relative",
                }}
              >
                {mode.featured && (
                  <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#064e3b", color: "#d1fae5", fontSize: "10px", fontWeight: 800, padding: "4px 14px", borderRadius: "999px", letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: mode.featured ? "rgba(255,255,255,0.15)" : "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: mode.featured ? "#ffffff" : "#036c48", fontSize: "22px" }}>{mode.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: mode.featured ? "#a7f3d0" : "#036c48", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>{mode.badge}</p>
                  <h3 style={{ fontSize: "22px", fontWeight: 800, color: mode.featured ? "#ffffff" : "#111827", marginBottom: "10px", letterSpacing: "-0.5px" }}>{mode.title}</h3>
                  <p style={{ fontSize: "14px", color: mode.featured ? "#a7f3d0" : "#6b7280", lineHeight: 1.6, fontWeight: 300 }}>{mode.desc}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {mode.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", backgroundColor: mode.featured ? "rgba(255,255,255,0.15)" : "#f3f4f6", color: mode.featured ? "#d1fae5" : "#374151" }}>{tag}</span>
                  ))}
                </div>
                <Link
                  href={mode.href}
                  style={{
                    marginTop: "auto",
                    display: "block",
                    textAlign: "center",
                    padding: "12px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "14px",
                    textDecoration: "none",
                    backgroundColor: mode.featured ? "#ffffff" : "#036c48",
                    color: mode.featured ? "#036c48" : "#ffffff",
                  }}
                >
                  {mode.btnText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ padding: "80px 32px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", marginBottom: "16px" }}>
          Built by a teacher, for learners
        </h2>
        <p style={{ fontSize: "17px", color: "#6b7280", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7, fontWeight: 300 }}>
          Every lesson in Chashma Learn is hand-crafted from years of teaching IELTS and SAT. No filler, no fluff — only materials that produce real results.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e5e7eb", padding: "32px", backgroundColor: "#f9f9f8" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#064e3b" }}>Chashma Learn</span>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>© 2025 Chashma Learn. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}
