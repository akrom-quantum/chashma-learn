"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from "next/link";

const firebaseConfig = {
  apiKey:            "AIzaSyBD65CTP7Tx84l-qL-KT9pj3uMUOsLOCI4",
  authDomain:        "chashma-learn.firebaseapp.com",
  projectId:         "chashma-learn",
  storageBucket:     "chashma-learn.firebasestorage.app",
  messagingSenderId: "1059701555295",
  appId:             "1:1059701555295:web:104a64e41d60252a28dbea",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db   = getFirestore(app, "chashma-learn");

const sections = [
  {
    id: "english",
    icon: "spellcheck",
    label: "English",
    color: "#0369a1",
    lightBg: "#f0f9ff",
    subsections: [
      {
        type: "Units",
        icon: "menu_book",
        items: [
          { title: "Unit 1 — Words in Context",         desc: "Understanding vocabulary from context clues",        time: "20 mins", difficulty: "Easy"   },
          { title: "Unit 2 — Central Ideas & Details",  desc: "Finding the main idea and supporting evidence",      time: "20 mins", difficulty: "Easy"   },
          { title: "Unit 3 — Command of Evidence",      desc: "Textual and quantitative evidence questions",        time: "25 mins", difficulty: "Medium" },
          { title: "Unit 4 — Inferences",               desc: "Drawing logical conclusions from passages",          time: "25 mins", difficulty: "Medium" },
          { title: "Unit 5 — Text Structure & Purpose", desc: "Analyzing how and why authors organize text",        time: "25 mins", difficulty: "Medium" },
          { title: "Unit 6 — Cross-Text Connections",   desc: "Comparing two related passages",                     time: "30 mins", difficulty: "Hard"   },
          { title: "Unit 7 — Rhetorical Synthesis",     desc: "Using multiple sources to support a claim",          time: "30 mins", difficulty: "Hard"   },
          { title: "Unit 8 — Transitions",              desc: "Choosing the best transition word or phrase",        time: "20 mins", difficulty: "Medium" },
        ],
      },
      {
        type: "Practice",
        icon: "quiz",
        items: [
          { title: "Practice Set 1 — Easy",    desc: "10 questions · Words in Context + Central Ideas", time: "10 mins", difficulty: "Easy"   },
          { title: "Practice Set 2 — Medium",  desc: "10 questions · Evidence + Inferences",            time: "12 mins", difficulty: "Medium" },
          { title: "Practice Set 3 — Hard",    desc: "10 questions · Cross-Text + Synthesis",           time: "15 mins", difficulty: "Hard"   },
          { title: "Full Module Practice",     desc: "27 questions · Mixed difficulty · Timed",         time: "32 mins", difficulty: "Mixed"  },
        ],
      },
    ],
  },
  {
    id: "vocabulary",
    icon: "translate",
    label: "Vocabulary",
    color: "#7c3aed",
    lightBg: "#f5f3ff",
    subsections: [
      {
        type: "Topic Oriented",
        icon: "category",
        items: [
          { title: "Academic & Scientific Vocabulary", desc: "Words commonly found in science passages",    time: "20 mins", difficulty: "Medium" },
          { title: "Historical & Social Vocabulary",   desc: "Words from history and social science texts", time: "20 mins", difficulty: "Medium" },
          { title: "Literary & Rhetorical Terms",      desc: "Terms for analyzing literature and argument", time: "20 mins", difficulty: "Hard"   },
          { title: "Business & Economics Vocabulary",  desc: "Words from economic and business contexts",   time: "20 mins", difficulty: "Medium" },
        ],
      },
      {
        type: "Structure Oriented",
        icon: "account_tree",
        items: [
          { title: "Prefixes Mastery",   desc: "Understanding meaning through word prefixes",  time: "15 mins", difficulty: "Easy"   },
          { title: "Suffixes Mastery",   desc: "Understanding meaning through word suffixes",  time: "15 mins", difficulty: "Easy"   },
          { title: "Root Words",         desc: "Latin and Greek roots for vocabulary building", time: "20 mins", difficulty: "Medium" },
          { title: "Word Families",      desc: "Noun, verb, adjective, adverb relationships",  time: "20 mins", difficulty: "Medium" },
        ],
      },
    ],
  },
  {
    id: "math",
    icon: "calculate",
    label: "Math",
    color: "#b45309",
    lightBg: "#fffbeb",
    subsections: [
      {
        type: "Units",
        icon: "menu_book",
        items: [
          { title: "Unit 1 — Algebra Foundations",      desc: "Linear equations, inequalities, systems",         time: "30 mins", difficulty: "Easy"   },
          { title: "Unit 2 — Advanced Algebra",         desc: "Quadratics, polynomials, rational equations",     time: "30 mins", difficulty: "Medium" },
          { title: "Unit 3 — Problem-Solving & Data",   desc: "Ratios, percentages, statistics, data analysis",  time: "30 mins", difficulty: "Medium" },
          { title: "Unit 4 — Geometry & Trigonometry",  desc: "Area, volume, circles, right triangles, SOHCAHTOA", time: "35 mins", difficulty: "Hard" },
        ],
      },
      {
        type: "Practice",
        icon: "quiz",
        items: [
          { title: "Practice Set 1 — No Calculator",  desc: "15 questions · Algebra focus · Timed",      time: "18 mins", difficulty: "Mixed" },
          { title: "Practice Set 2 — Calculator",     desc: "20 questions · All topics · Timed",         time: "35 mins", difficulty: "Mixed" },
          { title: "Full Math Module Practice",       desc: "44 questions · Full digital SAT format",    time: "70 mins", difficulty: "Mixed" },
        ],
      },
    ],
  },
];

const difficultyColor = {
  Easy:   { bg: "#dcfce7", color: "#15803d" },
  Medium: { bg: "#fef9c3", color: "#854d0e" },
  Hard:   { bg: "#fee2e2", color: "#b91c1c" },
  Mixed:  { bg: "#f3e8ff", color: "#6b21a8" },
};

export default function SATPage() {
  const [user, setUser]               = useState(null);
  const [role, setRole]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [activeSection, setActiveSection] = useState("english");
  const [activeSubsection, setActiveSubsection] = useState("Units");

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) {
          window.location.href = "/login";
          return;
        }
        try {
          const ref  = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(ref);
          setRole(snap.exists() ? snap.data().role : "viewer");
        } catch {
          setRole("viewer");
        }
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, []);

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const isLearner = role === "learner" || role === "admin" || role === "owner";
  const currentSection = sections.find((s) => s.id === activeSection);
  const currentSubsection = currentSection.subsections.find((s) => s.type === activeSubsection) || currentSection.subsections[0];

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none" }}>
              Chashma Learn
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>SAT Preparation</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/dashboard" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Dashboard</Link>
            <span style={{
              fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase",
              backgroundColor: role === "owner" ? "#fef3c7" : role === "admin" ? "#dbeafe" : role === "learner" ? "#d1fae5" : "#f3f4f6",
              color: role === "owner" ? "#92400e" : role === "admin" ? "#1d4ed8" : role === "learner" ? "#036c48" : "#6b7280",
            }}>
              {role}
            </span>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: "64px" }}>

        {/* Viewer banner */}
        {!isLearner && (
          <div style={{ backgroundColor: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "12px 32px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="material-symbols-outlined" style={{ color: "#d97706", fontSize: "18px" }}>lock</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500 }}>
              SAT is a premium track — <Link href="/dashboard" style={{ color: "#036c48", fontWeight: 700 }}>upgrade to Learner</Link> to access all content.
            </p>
          </div>
        )}

        {/* Section tabs */}
        <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb", padding: "0 32px", display: "flex", gap: "4px" }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => { setActiveSection(section.id); setActiveSubsection(section.subsections[0].type); }}
              style={{
                padding: "16px 24px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 600,
                fontFamily: "'Manrope', sans-serif", backgroundColor: "transparent",
                color: activeSection === section.id ? section.color : "#6b7280",
                borderBottom: activeSection === section.id ? `2px solid ${section.color}` : "2px solid transparent",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {!isLearner ? (
          <div style={{ maxWidth: "600px", margin: "80px auto", textAlign: "center", padding: "0 32px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "999px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "32px", color: "#9ca3af" }}>lock</span>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginBottom: "12px" }}>SAT Content is Locked</h2>
            <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.6, marginBottom: "24px" }}>
              All SAT materials are available for Learners only. Contact the admin to upgrade your account.
            </p>
            <Link href="/dashboard" style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
              Back to Dashboard
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex" }}>

            {/* Subsection sidebar */}
            <aside style={{ width: "200px", minHeight: "calc(100vh - 113px)", backgroundColor: "#ffffff", borderRight: "1px solid #e5e7eb", padding: "16px 8px", flexShrink: 0 }}>
              {currentSection.subsections.map((sub) => (
                <button
                  key={sub.type}
                  onClick={() => setActiveSubsection(sub.type)}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: "8px", border: "none",
                    cursor: "pointer", textAlign: "left", fontSize: "13px", fontWeight: 600,
                    fontFamily: "'Manrope', sans-serif", marginBottom: "2px",
                    backgroundColor: activeSubsection === sub.type ? currentSection.lightBg : "transparent",
                    color: activeSubsection === sub.type ? currentSection.color : "#6b7280",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{sub.icon}</span>
                  {sub.type}
                </button>
              ))}
            </aside>

            {/* Content area */}
            <main style={{ flex: 1, padding: "32px 40px" }}>
              <div style={{ marginBottom: "28px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#111827", marginBottom: "6px" }}>
                  {currentSection.label} — {activeSubsection}
                </h2>
                <p style={{ fontSize: "13px", color: "#9ca3af" }}>
                  {currentSubsection.items.length} items available
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                {currentSubsection.items.map((item, i) => {
                  const dc = difficultyColor[item.difficulty] || difficultyColor.Medium;
                  return (
                    <Link
                      key={i}
                      href={`/sat/${activeSection}/${activeSubsection.toLowerCase().replace(/ /g, "-")}/${i + 1}`}
                      style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: currentSection.lightBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: currentSection.color, flexShrink: 0 }}>
                          {i + 1}
                        </div>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>{item.title}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: dc.bg, color: dc.color, padding: "2px 8px", borderRadius: "999px" }}>
                              {item.difficulty}
                            </span>
                            <span style={{ fontSize: "11px", color: "#9ca3af", display: "flex", alignItems: "center", gap: "4px" }}>
                              <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>schedule</span>
                              {item.time}
                            </span>
                          </div>
                          <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>{item.desc}</p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#d1d5db", flexShrink: 0 }}>chevron_right</span>
                    </Link>
                  );
                })}
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
