"use client";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";


const modes = [
  {
    href:     "/english",
    icon:     "📖",
    badge:    "Free Samples",
    badgeBg:  "#d1fae5",
    badgeColor: "#036c48",
    title:    "General English",
    subtitle: "Foundational Track",
    desc:     "Build a strong foundation with grammar, vocabulary, pronunciation, idioms, collocations, phrasal verbs and writing — from beginner to advanced.",
    features: [
      "Oxford Word Skills series",
      "Grammar from A1 to C1",
      "Vocabulary by topic",
      "Pronunciation training",
      "Collocations & Phrasal Verbs",
      "Idioms & Writing skills",
    ],
    btn:      "Begin Track",
    featured: false,
  },
  {
    href:     "/ielts",
    icon:     "🎯",
    badge:    "Most Popular",
    badgeBg:  "#036c48",
    badgeColor: "#ffffff",
    title:    "IELTS Academic",
    subtitle: "Premium Track",
    desc:     "Complete preparation for all four IELTS skills with tips, topics, structured practice, and Band 9 model answers for every question type.",
    features: [
      "Listening — All Parts & Question Types",
      "Reading — All Parts & Question Types",
      "Speaking — All Parts & Question Topics",
      "Writing — Task 1 & Task 2 with Question Topics",
      "Prediction tests — full mock",
      "Band 9 model answers",
    ],
    btn:      "Enroll in IELTS",
    featured: true,
  },
  {
    href:     "/sat",
    icon:     "✏️",
    badge:    "New",
    badgeBg:  "#fef9c3",
    badgeColor: "#854d0e",
    title:    "SAT Preparation",
    subtitle: "Premium Track",
    desc:     "Strategic mastery for the Digital SAT with unit-based English, structured vocabulary, and comprehensive math preparation.",
    features: [
      "English — 8 question types",
      "Vocabulary — topic & structure",
      "Math — algebra to geometry",
      "Easy, Medium & Hard sets",
      "Full module practice tests",
      "Digital SAT format training",
    ],
    btn:      "Start SAT Prep",
    featured: false,
  },
];

export default function CoursesPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser || null);
      });
      return () => unsubscribe();
    });
  }, []);

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#ffffff", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f0fdf4" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <img src="/logo.png" alt="Chashma Learn" style={{ width: "36px", height: "36px", objectFit: "contain" }} />
            <span style={{ fontSize: "18px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px" }}>Chashma Learn</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Home</Link>
            {user ? (
              <Link href="/dashboard" style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "9px 22px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
                Dashboard
              </Link>
            ) : (
              <Link href="/login" style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "9px 22px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ paddingTop: "120px", paddingBottom: "60px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#036c48", fontSize: "12px", fontWeight: 700, padding: "6px 14px", borderRadius: "999px", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "24px" }}>
          <span style={{ width: "6px", height: "6px", backgroundColor: "#036c48", borderRadius: "999px", display: "inline-block" }} />
          Three Learning Tracks
        </div>
        <h1 style={{ fontSize: "48px", fontWeight: 800, color: "#064e3b", letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: "16px" }}>
          Choose your path
        </h1>
        <p style={{ fontSize: "17px", color: "#6b7280", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
          Every track is carefully structured from foundations to exam level — built by an experienced teacher.
        </p>
      </div>

      {/* CARDS */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px 80px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", alignItems: "start" }}>
        {modes.map((mode) => (
          <div
            key={mode.href}
            style={{
              backgroundColor: mode.featured ? "#064e3b" : "#ffffff",
              borderRadius: "16px",
              border: mode.featured ? "none" : "1px solid #e5e7eb",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: mode.featured ? "0 20px 60px rgba(3,108,72,0.2)" : "none",
            }}
          >
            {/* Popular pill */}
            {mode.featured && (
              <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#036c48", border: "2px solid #064e3b", color: "#6ee7b7", fontSize: "10px", fontWeight: 800, padding: "4px 16px", borderRadius: "999px", letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap", zIndex: 1 }}>
                Most Popular
              </div>
            )}

            {/* Top bar */}
            <div style={{ padding: "28px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "36px" }}>{mode.icon}</span>
              <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: mode.badgeBg, color: mode.badgeColor, padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                {mode.badge}
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: "20px 28px 28px", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: mode.featured ? "#6ee7b7" : "#036c48", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                  {mode.subtitle}
                </p>
                <h3 style={{ fontSize: "24px", fontWeight: 800, color: mode.featured ? "#ffffff" : "#111827", letterSpacing: "-0.5px", marginBottom: "10px" }}>
                  {mode.title}
                </h3>
                <p style={{ fontSize: "14px", color: mode.featured ? "#a7f3d0" : "#6b7280", lineHeight: 1.6 }}>
                  {mode.desc}
                </p>
              </div>

              {/* Feature list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {mode.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "18px", height: "18px", borderRadius: "999px", backgroundColor: mode.featured ? "rgba(255,255,255,0.15)" : "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "10px", color: mode.featured ? "#6ee7b7" : "#036c48" }}>✓</span>
                    </div>
                    <span style={{ fontSize: "13px", color: mode.featured ? "#d1fae5" : "#374151", fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: "1px", backgroundColor: mode.featured ? "rgba(255,255,255,0.1)" : "#f3f4f6" }} />

              {/* CTA */}
              <Link
                href={user ? mode.href : "/login"}
                style={{
                  display: "block", textAlign: "center", padding: "13px", borderRadius: "10px",
                  fontWeight: 700, fontSize: "14px", textDecoration: "none", letterSpacing: "-0.2px",
                  backgroundColor: mode.featured ? "#ffffff" : "#036c48",
                  color: mode.featured ? "#036c48" : "#ffffff",
                }}
              >
                {user ? mode.btn : "Sign In to Start"}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM TRUST ROW */}
      <div style={{ backgroundColor: "#f9fafb", borderTop: "1px solid #f3f4f6", padding: "40px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "48px", flexWrap: "wrap" }}>
          {[
            { icon: "✓", text: "Hand-crafted by an experienced teacher"         },
            { icon: "🔒", text: "Private progress — no comparisons"              },
            { icon: "📋", text: "Structured from beginner to advanced"           },
            { icon: "🎯", text: "Built around real IELTS and SAT exam formats"   },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #f3f4f6", padding: "32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src="/logo.png" alt="Chashma Learn" style={{ width: "28px", height: "28px", objectFit: "contain" }} />
            <span style={{ fontSize: "15px", fontWeight: 800, color: "#064e3b" }}>Chashma Learn</span>
          </div>
          <p style={{ fontSize: "12px", color: "#d1d5db" }}>© 2025 Chashma Learn. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
