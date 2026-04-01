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

const tabs = [
  {
    id: "oxford",
    icon: "menu_book",
    label: "Oxford Word Skills",
    free: true,
    desc: "Build vocabulary systematically using the Oxford Word Skills series — from basic to advanced.",
    units: [
      { title: "Unit 1 — Basic Nouns",        level: "A1", time: "15 mins" },
      { title: "Unit 2 — Common Adjectives",  level: "A1", time: "15 mins" },
      { title: "Unit 3 — Everyday Verbs",     level: "A2", time: "20 mins" },
      { title: "Unit 4 — Describing People",  level: "A2", time: "20 mins" },
    ],
  },
  {
    id: "grammar",
    icon: "spellcheck",
    label: "Grammar",
    free: true,
    desc: "Master English grammar from the fundamentals to advanced structures used in academic writing.",
    units: [
      { title: "Unit 1 — Simple Present",       level: "A1", time: "12 mins" },
      { title: "Unit 2 — Past Simple",          level: "A2", time: "15 mins" },
      { title: "Unit 3 — Present Perfect",      level: "B1", time: "12 mins" },
      { title: "Unit 4 — Conditionals",         level: "B2", time: "20 mins" },
    ],
  },
  {
    id: "vocabulary",
    icon: "translate",
    label: "Vocabulary",
    free: false,
    desc: "Expand your vocabulary with topic-based word lists, collocations, and contextual usage.",
    units: [
      { title: "Unit 1 — Academic Vocabulary", level: "B1", time: "18 mins" },
      { title: "Unit 2 — Business English",    level: "B2", time: "20 mins" },
      { title: "Unit 3 — Formal vs Informal",  level: "B1", time: "15 mins" },
      { title: "Unit 4 — Word Families",       level: "B2", time: "18 mins" },
    ],
  },
  {
    id: "pronunciation",
    icon: "record_voice_over",
    label: "Pronunciation",
    free: false,
    desc: "Improve your spoken English with phonetics, stress patterns, and intonation practice.",
    units: [
      { title: "Unit 1 — Vowel Sounds",        level: "A2", time: "15 mins" },
      { title: "Unit 2 — Consonant Clusters",  level: "B1", time: "15 mins" },
      { title: "Unit 3 — Word Stress",         level: "B1", time: "12 mins" },
      { title: "Unit 4 — Sentence Intonation", level: "B2", time: "18 mins" },
    ],
  },
  {
    id: "collocations",
    icon: "link",
    label: "Collocations",
    free: false,
    desc: "Learn natural word combinations that make your English sound fluent and native-like.",
    units: [
      { title: "Unit 1 — Verb + Noun",         level: "B1", time: "15 mins" },
      { title: "Unit 2 — Adjective + Noun",    level: "B1", time: "15 mins" },
      { title: "Unit 3 — Academic Collocations", level: "B2", time: "18 mins" },
      { title: "Unit 4 — Business Collocations", level: "B2", time: "18 mins" },
    ],
  },
  {
    id: "phrasal-verbs",
    icon: "format_list_bulleted",
    label: "Phrasal Verbs",
    free: false,
    desc: "Master the most common and useful phrasal verbs in everyday and professional contexts.",
    units: [
      { title: "Unit 1 — Separable Phrasal Verbs",    level: "B1", time: "18 mins" },
      { title: "Unit 2 — Inseparable Phrasal Verbs",  level: "B1", time: "18 mins" },
      { title: "Unit 3 — Phrasal Verbs in Context",   level: "B2", time: "20 mins" },
      { title: "Unit 4 — Advanced Usage",             level: "C1", time: "20 mins" },
    ],
  },
  {
    id: "idioms",
    icon: "auto_stories",
    label: "Idioms",
    free: false,
    desc: "Understand and use English idioms naturally in conversation and writing.",
    units: [
      { title: "Unit 1 — Common Idioms",        level: "B1", time: "15 mins" },
      { title: "Unit 2 — Body Idioms",          level: "B1", time: "15 mins" },
      { title: "Unit 3 — Time Idioms",          level: "B2", time: "18 mins" },
      { title: "Unit 4 — Idioms in Writing",    level: "B2", time: "18 mins" },
    ],
  },
  {
    id: "writing",
    icon: "edit_note",
    label: "Writing",
    free: false,
    desc: "Develop your writing skills from paragraphs to full essays with structured guidance.",
    units: [
      { title: "Unit 1 — Paragraph Structure",  level: "B1", time: "20 mins" },
      { title: "Unit 2 — Essay Introduction",   level: "B1", time: "20 mins" },
      { title: "Unit 3 — Argument Development", level: "B2", time: "25 mins" },
      { title: "Unit 4 — Academic Style",       level: "B2", time: "25 mins" },
    ],
  },
];

const levelColor = {
  A1: { bg: "#f0fdf4", color: "#166534" },
  A2: { bg: "#dcfce7", color: "#15803d" },
  B1: { bg: "#d1fae5", color: "#036c48" },
  B2: { bg: "#a7f3d0", color: "#065f46" },
  C1: { bg: "#6ee7b7", color: "#064e3b" },
};

export default function EnglishPage() {
  const [user, setUser]         = useState(null);
  const [role, setRole]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState("oxford");

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
  const currentTab = tabs.find((t) => t.id === activeTab);
  const tabLocked = !currentTab.free && !isLearner;

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
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>General English</span>
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

      <div style={{ display: "flex", paddingTop: "64px" }}>

        {/* SIDEBAR */}
        <aside style={{ width: "240px", height: "calc(100vh - 64px)", position: "fixed", left: 0, top: "64px", backgroundColor: "#ffffff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px 16px", borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>language</span>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>General English</p>
                <p style={{ fontSize: "10px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>8 Topics</p>
              </div>
            </div>
          </div>

          <nav style={{ flex: 1, padding: "8px", overflowY: "auto" }}>
            {tabs.map((tab) => {
              const locked = !tab.free && !isLearner;
              const active = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: "10px", padding: "10px 12px", borderRadius: "8px", marginBottom: "2px",
                    border: "none", cursor: locked ? "not-allowed" : "pointer", textAlign: "left",
                    backgroundColor: active ? "#d1fae5" : "transparent",
                    color: locked ? "#d1d5db" : active ? "#036c48" : "#6b7280",
                    fontWeight: active ? 700 : 500, fontSize: "13px",
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{tab.icon}</span>
                    {tab.label}
                  </div>
                  {locked && <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>lock</span>}
                  {tab.free && !locked && <span style={{ fontSize: "9px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "1px 6px", borderRadius: "999px" }}>FREE</span>}
                </button>
              );
            })}
          </nav>

          <div style={{ padding: "16px", borderTop: "1px solid #f3f4f6" }}>
            <Link href="/courses" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#9ca3af", textDecoration: "none" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_back</span>
              All Modes
            </Link>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ marginLeft: "240px", flex: 1, padding: "40px 48px" }}>

          {/* Viewer banner */}
          {!isLearner && (
            <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "8px", padding: "12px 16px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="material-symbols-outlined" style={{ color: "#d97706", fontSize: "18px" }}>info</span>
              <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500 }}>
                You have free access to Oxford Word Skills and Grammar only.{" "}
                <Link href="/dashboard" style={{ color: "#036c48", fontWeight: 700 }}>Upgrade to Learner</Link> to unlock all 8 topics.
              </p>
            </div>
          )}

          {/* Tab header */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "22px" }}>{currentTab.icon}</span>
              </div>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>
                  {currentTab.label}
                </h1>
                <p style={{ fontSize: "13px", color: "#9ca3af" }}>General English — {currentTab.units.length} units</p>
              </div>
            </div>
            <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.6, maxWidth: "600px" }}>
              {currentTab.desc}
            </p>
          </div>

          {/* Locked state */}
          {tabLocked ? (
            <div style={{ textAlign: "center", padding: "80px 40px", backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e5e7eb" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "999px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "32px", color: "#9ca3af" }}>lock</span>
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", marginBottom: "10px" }}>
                {currentTab.label} is locked
              </h2>
              <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "360px", margin: "0 auto 24px", lineHeight: 1.6 }}>
                This topic is available for Learners only. Contact the admin to upgrade your account.
              </p>
              <Link href="/dashboard" style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                Back to Dashboard
              </Link>
            </div>
          ) : (
            /* Units grid */
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              {currentTab.units.map((unit, i) => {
                const lc = levelColor[unit.level] || levelColor.B1;
                return (
                  <Link
                    key={i}
                    href={`/english/${currentTab.id}/unit-${i + 1}`}
                    style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 800, color: "#036c48", flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>{unit.title}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: lc.bg, color: lc.color, padding: "2px 8px", borderRadius: "999px" }}>
                            {unit.level}
                          </span>
                          <span style={{ fontSize: "11px", color: "#9ca3af", display: "flex", alignItems: "center", gap: "4px" }}>
                            <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>schedule</span>
                            {unit.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#d1d5db" }}>chevron_right</span>
                  </Link>
                );
              })}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
