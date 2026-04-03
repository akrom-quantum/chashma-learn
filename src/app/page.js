"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey:            "AIzaSyBD65CTP7Tx84l-qL-KT9pj3uMUOsLOCI4",
  authDomain:        "chashma-learn.firebaseapp.com",
  projectId:         "chashma-learn",
  storageBucket:     "chashma-learn.firebasestorage.app",
  messagingSenderId: "1059701555295",
  appId:             "1:1059701955295:web:104a64e41d60252a28dbea",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export default function HomePage() {
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
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#ffffff", minHeight: "100vh", color: "#111827" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f0fdf4" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src="/logo.png" alt="Chashma Learn" style={{ width: "36px", height: "36px", objectFit: "contain", borderRadius: 3px }} />
            <span style={{ fontSize: "18px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px" }}>Chashma Learn</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <div style={{ display: "flex", gap: "24px" }}>
              <Link href="/courses" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Courses</Link>
              <Link href="#about" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>About</Link>
            </div>
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>
                  {user.displayName || user.email}
                </span>
                <Link href="/dashboard" style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "9px 22px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
                  Dashboard
                </Link>
              </div>
            ) : (
              <Link href="/login" style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "9px 22px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, textDecoration: "none", letterSpacing: "-0.2px" }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: "140px", paddingBottom: "100px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#036c48", fontSize: "12px", fontWeight: 700, padding: "6px 14px", borderRadius: "999px", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "28px" }}>
              <span style={{ width: "6px", height: "6px", backgroundColor: "#036c48", borderRadius: "999px", display: "inline-block" }} />
              Now accepting students
            </div>

            <h1 style={{ fontSize: "56px", fontWeight: 800, color: "#064e3b", lineHeight: 1.08, letterSpacing: "-2px", marginBottom: "24px" }}>
              Master English.<br />
              <span style={{ color: "#036c48" }}>Ace your exams.</span>
            </h1>

            <p style={{ fontSize: "18px", color: "#6b7280", lineHeight: 1.7, marginBottom: "40px", fontWeight: 400, maxWidth: "440px" }}>
              Structured lessons, real practice materials, and expert guidance for General English, IELTS, and SAT.
            </p>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Link href="/login" style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: 700, textDecoration: "none", letterSpacing: "-0.3px" }}>
                Start Learning
              </Link>
              <Link href="/courses" style={{ color: "#036c48", padding: "14px 24px", borderRadius: "10px", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: "1px solid #bbf7d0", backgroundColor: "#f0fdf4" }}>
                View Courses →
              </Link>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "32px", marginTop: "48px", paddingTop: "40px", borderTop: "1px solid #f3f4f6" }}>
              {[
                { value: "3",    label: "Learning modes"    },
                { value: "100+", label: "Lessons"           },
                { value: "98%",  label: "Student pass rate" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p style={{ fontSize: "28px", fontWeight: 800, color: "#064e3b", letterSpacing: "-1px" }}>{stat.value}</p>
                  <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "2px", fontWeight: 500 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual card stack */}
          <div style={{ position: "relative" }}>
            <div style={{ backgroundColor: "#f0fdf4", borderRadius: "20px", padding: "32px", border: "1px solid #bbf7d0" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#036c48", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "20px" }}>Learning Tracks</p>
              {[
                { icon: "📖", label: "General English", desc: "Grammar, vocabulary, writing", badge: "Free samples", badgeBg: "#d1fae5", badgeColor: "#036c48" },
                { icon: "🎯", label: "IELTS Academic",  desc: "Listening, reading, writing, speaking", badge: "Popular", badgeBg: "#036c48", badgeColor: "#ffffff" },
                { icon: "✏️", label: "SAT Preparation", desc: "English, vocabulary, math", badge: "New", badgeBg: "#fef9c3", badgeColor: "#854d0e" },
              ].map((track, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", backgroundColor: "#ffffff", borderRadius: "12px", marginBottom: i < 2 ? "10px" : "0", border: "1px solid #f3f4f6" }}>
                  <span style={{ fontSize: "24px" }}>{track.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{track.label}</p>
                    <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{track.desc}</p>
                  </div>
                  <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: track.badgeBg, color: track.badgeColor, padding: "3px 8px", borderRadius: "999px", whiteSpace: "nowrap" }}>
                    {track.badge}
                  </span>
                </div>
              ))}
            </div>
            {/* Floating badge */}
            <div style={{ position: "absolute", bottom: "-20px", left: "24px", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "12px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", backgroundColor: "#d1fae5", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>✓</div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>98% pass rate</p>
                <p style={{ fontSize: "11px", color: "#9ca3af" }}>Verified by students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODES SECTION */}
      <section style={{ backgroundColor: "#f9fafb", padding: "100px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#036c48", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Three Tracks</p>
            <h2 style={{ fontSize: "40px", fontWeight: 800, color: "#064e3b", letterSpacing: "-1px", marginBottom: "16px" }}>
              Choose your path
            </h2>
            <p style={{ fontSize: "16px", color: "#6b7280", maxWidth: "480px", margin: "0 auto" }}>
              Every track is carefully structured from foundations to exam level.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {[
              {
                icon: "📖",
                title: "General English",
                subtitle: "Foundational",
                desc: "Build a strong foundation with grammar, vocabulary, pronunciation, idioms, collocations, and writing.",
                tags: ["Grammar", "Vocabulary", "Writing", "Pronunciation", "+4 more"],
                href: "/english",
                featured: false,
              },
              {
                icon: "🎯",
                title: "IELTS Academic",
                subtitle: "Most Popular",
                desc: "Complete preparation for all four IELTS skills with tips, topics, practice tests, and Band 9 model answers.",
                tags: ["Listening", "Reading", "Speaking", "Writing"],
                href: "/ielts",
                featured: true,
              },
              {
                icon: "✏️",
                title: "SAT Preparation",
                subtitle: "New",
                desc: "Master the Digital SAT with unit-based English, structured vocabulary, and comprehensive math preparation.",
                tags: ["English", "Vocabulary", "Math"],
                href: "/sat",
                featured: false,
              },
            ].map((mode, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: mode.featured ? "#036c48" : "#ffffff",
                  borderRadius: "16px",
                  padding: "32px",
                  border: mode.featured ? "none" : "1px solid #e5e7eb",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {mode.featured && (
                  <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#064e3b", color: "#6ee7b7", fontSize: "10px", fontWeight: 800, padding: "4px 14px", borderRadius: "999px", letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontSize: "32px" }}>{mode.icon}</div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: mode.featured ? "#6ee7b7" : "#036c48", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                    {mode.subtitle}
                  </p>
                  <h3 style={{ fontSize: "22px", fontWeight: 800, color: mode.featured ? "#ffffff" : "#111827", letterSpacing: "-0.5px", marginBottom: "10px" }}>
                    {mode.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: mode.featured ? "#a7f3d0" : "#6b7280", lineHeight: 1.6 }}>
                    {mode.desc}
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {mode.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "6px", backgroundColor: mode.featured ? "rgba(255,255,255,0.15)" : "#f3f4f6", color: mode.featured ? "#d1fae5" : "#374151" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/login"
                  style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "12px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none", backgroundColor: mode.featured ? "#ffffff" : "#036c48", color: mode.featured ? "#036c48" : "#ffffff" }}
                >
                  Explore {mode.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#036c48", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>About</p>
              <h2 style={{ fontSize: "40px", fontWeight: 800, color: "#064e3b", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "20px" }}>
                Built by a teacher,<br />for learners
              </h2>
              <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.7, marginBottom: "16px" }}>
                Chashma Learn is a curated platform with hand-crafted materials developed through years of teaching IELTS and SAT. Every lesson is designed for clarity, depth, and real results.
              </p>
              <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.7 }}>
                Students focus on their own growth — no leaderboards, no comparison, no pressure. Just structured learning at their own pace.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { icon: "✓", title: "Hand-crafted lessons",    desc: "Every lesson written and reviewed by an experienced teacher"  },
                { icon: "🔒", title: "Private progress",        desc: "Students only see their own data — no comparisons"           },
                { icon: "📋", title: "Structured curriculum",   desc: "From beginner to advanced with clear learning paths"         },
                { icon: "🎯", title: "Exam focused",            desc: "IELTS and SAT materials built around real exam formats"       },
              ].map((item, i) => (
                <div key={i} style={{ backgroundColor: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: "12px", padding: "20px" }}>
                  <span style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}>{item.icon}</span>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>{item.title}</p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 32px", backgroundColor: "#064e3b" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: "#ffffff", letterSpacing: "-1px", marginBottom: "16px" }}>
            Ready to start learning?
          </h2>
          <p style={{ fontSize: "16px", color: "#6ee7b7", marginBottom: "32px", lineHeight: 1.6 }}>
            Sign in with Google and start with free sample lessons today.
          </p>
          <Link href="/login" style={{ backgroundColor: "#ffffff", color: "#036c48", padding: "14px 36px", borderRadius: "10px", fontSize: "15px", fontWeight: 800, textDecoration: "none", letterSpacing: "-0.3px", display: "inline-block" }}>
            Get Started — It's Free
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #f3f4f6", padding: "40px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", backgroundColor: "#036c48", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="8" cy="8" r="2" fill="white"/>
              </svg>
            </div>
            <span style={{ fontSize: "15px", fontWeight: 800, color: "#064e3b" }}>Chashma Learn</span>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Courses", "About", "Sign In"].map((item) => (
              <Link key={item} href={item === "Sign In" ? "/login" : item === "Courses" ? "/courses" : "#about"} style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>
                {item}
              </Link>
            ))}
          </div>
          <p style={{ fontSize: "12px", color: "#d1d5db" }}>© 2025 Chashma Learn</p>
        </div>
      </footer>

    </div>
  );
}
