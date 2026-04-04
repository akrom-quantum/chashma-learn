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
  appId:             "1:1059701955295:web:104a64e41d60252a28dbea",
};

const app  = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db   = getFirestore(app, "chashma-learn");

const bookData = {
  id:      "ows-intermediate",
  title:   "Oxford Word Skills",
  level:   "Intermediate",
  authors: "Ruth Gairns & Stuart Redman",
  cover:   "/books/ows-intermediate.jpg",
  subject: "vocabulary",
  sections: [
    {
      title: "Section 1 — Learning",
      icon: "🔤",
      units: [
        { id: "unit-01", num: "1",  title: "Vocabulary learning" },
        { id: "unit-02", num: "2",  title: "Progress and aims" },
        { id: "unit-03", num: "3",  title: "Using an English dictionary" },
        { id: "unit-04", num: "4",  title: "English punctuation" },
      ],
    },
    {
      title: "Section 2 — People",
      icon: "👥",
      units: [
        { id: "unit-05", num: "5",  title: "The body" },
        { id: "unit-06", num: "6",  title: "Appearance" },
        { id: "unit-07", num: "7",  title: "Character" },
        { id: "unit-08", num: "8",  title: "Feelings and emotions" },
        { id: "unit-09", num: "9",  title: "Personal qualities" },
        { id: "unit-10", num: "10", title: "Friendship" },
        { id: "unit-11", num: "11", title: "Families" },
        { id: "unit-12", num: "12", title: "Marriage and divorce" },
      ],
    },
    {
      title: "Section 3 — The World Around Us",
      icon: "🌍",
      units: [
        { id: "unit-13", num: "13", title: "Geography" },
        { id: "unit-14", num: "14", title: "The universe and science" },
        { id: "unit-15", num: "15", title: "Weather conditions" },
        { id: "unit-16", num: "16", title: "Climate change" },
        { id: "unit-17", num: "17", title: "Saving the environment" },
        { id: "unit-18", num: "18", title: "Animals, insects and birds" },
      ],
    },
    {
      title: "Language Focus — Adjectives and Adverbs",
      icon: "🔵",
      units: [
        { id: "unit-19", num: "19", title: "Adjectives (1)" },
        { id: "unit-20", num: "20", title: "Adjectives (2): opposites" },
        { id: "unit-21", num: "21", title: "Adverbs (1): degree and frequency" },
        { id: "unit-22", num: "22", title: "Adverbs (2): emphasizing and manner" },
      ],
    },
    {
      title: "Section 4 — Daily Life",
      icon: "🏠",
      units: [
        { id: "unit-23", num: "23", title: "Fruit, vegetables and herbs" },
        { id: "unit-24", num: "24", title: "Containers and quantities" },
        { id: "unit-25", num: "25", title: "Cooking" },
        { id: "unit-26", num: "26", title: "Shopping" },
        { id: "unit-27", num: "27", title: "Clothing" },
        { id: "unit-28", num: "28", title: "Fashion" },
        { id: "unit-29", num: "29", title: "Illness and accidents" },
        { id: "unit-30", num: "30", title: "Hospital" },
      ],
    },
    {
      title: "Section 5 — Transport and Travel",
      icon: "🚌",
      units: [
        { id: "unit-31", num: "31", title: "Roads" },
        { id: "unit-32", num: "32", title: "Driving" },
        { id: "unit-33", num: "33", title: "Trains and buses" },
        { id: "unit-34", num: "34", title: "Air travel" },
        { id: "unit-35", num: "35", title: "Holidays" },
      ],
    },
    {
      title: "Language Focus — Prepositions",
      icon: "🔵",
      units: [
        { id: "unit-36", num: "36", title: "Verb + preposition" },
        { id: "unit-37", num: "37", title: "Noun + preposition" },
        { id: "unit-38", num: "38", title: "Prepositions in time phrases" },
        { id: "unit-39", num: "39", title: "Adjective + preposition" },
        { id: "unit-40", num: "40", title: "Prepositional phrases" },
      ],
    },
    {
      title: "Section 6 — Describing Things",
      icon: "🔧",
      units: [
        { id: "unit-41", num: "41", title: "Describing objects" },
        { id: "unit-42", num: "42", title: "Household tasks" },
        { id: "unit-43", num: "43", title: "Buildings" },
        { id: "unit-44", num: "44", title: "How to grow something" },
        { id: "unit-45", num: "45", title: "Shapes and lines" },
        { id: "unit-46", num: "46", title: "A painting" },
        { id: "unit-47", num: "47", title: "The five senses" },
      ],
    },
    {
      title: "Section 7 — Social and Political Issues",
      icon: "⚖️",
      units: [
        { id: "unit-48", num: "48", title: "Crime" },
        { id: "unit-49", num: "49", title: "The justice system" },
        { id: "unit-50", num: "50", title: "Health issues" },
        { id: "unit-51", num: "51", title: "Politics" },
        { id: "unit-52", num: "52", title: "War and peace" },
        { id: "unit-53", num: "53", title: "Events in history" },
        { id: "unit-54", num: "54", title: "Social issues" },
      ],
    },
    {
      title: "Language Focus — Verbs",
      icon: "🔵",
      units: [
        { id: "unit-55", num: "55", title: "Irregular verbs" },
        { id: "unit-56", num: "56", title: "Verb + infinitive or -ing form" },
        { id: "unit-57", num: "57", title: "Using verbs with reflexive pronouns" },
        { id: "unit-58", num: "58", title: "take" },
      ],
    },
    {
      title: "Section 8 — Media and Entertainment",
      icon: "🎬",
      units: [
        { id: "unit-59", num: "59", title: "Art" },
        { id: "unit-60", num: "60", title: "Films" },
        { id: "unit-61", num: "61", title: "Theatre" },
        { id: "unit-62", num: "62", title: "Music" },
        { id: "unit-63", num: "63", title: "TV and online viewing" },
        { id: "unit-64", num: "64", title: "Newspapers" },
        { id: "unit-65", num: "65", title: "Books" },
        { id: "unit-66", num: "66", title: "Sporting events" },
        { id: "unit-67", num: "67", title: "Sport: people and places" },
        { id: "unit-68", num: "68", title: "Festivals" },
        { id: "unit-69", num: "69", title: "The internet" },
        { id: "unit-70", num: "70", title: "Email and social media" },
      ],
    },
    {
      title: "Language Focus — Word Building",
      icon: "🔵",
      units: [
        { id: "unit-71", num: "71", title: "Word building: prefixes" },
        { id: "unit-72", num: "72", title: "Word building: suffixes" },
        { id: "unit-73", num: "73", title: "Link words" },
      ],
    },
    {
      title: "Section 9 — Study and Work",
      icon: "🎓",
      units: [
        { id: "unit-74", num: "74", title: "School" },
        { id: "unit-75", num: "75", title: "Academic life" },
        { id: "unit-76", num: "76", title: "Student life" },
        { id: "unit-77", num: "77", title: "Describing jobs" },
        { id: "unit-78", num: "78", title: "Careers" },
        { id: "unit-79", num: "79", title: "Applying for a job" },
        { id: "unit-80", num: "80", title: "Finance" },
        { id: "unit-81", num: "81", title: "Running a business" },
        { id: "unit-82", num: "82", title: "Marketing" },
      ],
    },
    {
      title: "Language Focus — Phrasal Verbs and Idioms",
      icon: "🔵",
      units: [
        { id: "unit-83", num: "83", title: "Phrasal verbs (1): grammatical patterns" },
        { id: "unit-84", num: "84", title: "Phrasal verbs (2): meaning" },
        { id: "unit-85", num: "85", title: "Expressions (1)" },
        { id: "unit-86", num: "86", title: "Expressions (2)" },
      ],
    },
    {
      title: "Language Focus — Social English",
      icon: "🗣️",
      units: [
        { id: "unit-87", num: "87", title: "Likes, dislikes and preferences" },
        { id: "unit-88", num: "88", title: "Probability" },
        { id: "unit-89", num: "89", title: "Similarities and differences" },
        { id: "unit-90", num: "90", title: "Pleasure and annoyance" },
        { id: "unit-91", num: "91", title: "Making arrangements" },
        { id: "unit-92", num: "92", title: "Warnings" },
        { id: "unit-93", num: "93", title: "Opinions" },
        { id: "unit-94", num: "94", title: "Hopes and plans" },
        { id: "unit-95", num: "95", title: "Obligation" },
        { id: "unit-96", num: "96", title: "Asking for permission" },
      ],
    },
    {
      title: "Language Focus — Styles of Language",
      icon: "🔵",
      units: [
        { id: "unit-97",  num: "97",  title: "Formal and informal English" },
        { id: "unit-98",  num: "98",  title: "Write a letter or email" },
        { id: "unit-99",  num: "99",  title: "Abbreviations and short forms" },
        { id: "unit-100", num: "100", title: "American English" },
      ],
    },
  ],
};

const allUnits   = bookData.sections.flatMap((s) => s.units);
const totalUnits = allUnits.length;

const sectionColors = [
  { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46" },  // 0  Learning
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95" },  // 1  People
  { accent: "#15803d", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d" },  // 2  World
  { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },  // 3  Lang: Adj/Adv
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },  // 4  Daily Life
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a" },  // 5  Transport
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },  // 6  Lang: Prep
  { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12" },  // 7  Describing
  { accent: "#b91c1c", bg: "#fef2f2", badge: "#fecaca", text: "#7f1d1d" },  // 8  Social/Political
  { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },  // 9  Lang: Verbs
  { accent: "#4f46e5", bg: "#eef2ff", badge: "#c7d2fe", text: "#312e81" },  // 10 Media
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },  // 11 Lang: Word Building
  { accent: "#0f766e", bg: "#f0fdfa", badge: "#99f6e4", text: "#134e4a" },  // 12 Study/Work
  { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },  // 13 Lang: Phrasal
  { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46" },  // 14 Lang: Social Eng
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },  // 15 Lang: Styles
];

export default function OWSIntermediatePage() {
  const [user, setUser]                 = useState(null);
  const [role, setRole]                 = useState(null);
  const [loading, setLoading]           = useState(true);
  const [expandedSections, setExpanded] = useState({ 0: true });

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        try {
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          setRole(snap.exists() ? snap.data().role : "viewer");
        } catch { setRole("viewer"); }
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsub();
    });
  }, []);

  const isLearner = role === "learner" || role === "admin" || role === "owner";
  const toggleSection = (idx) => setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));

  let globalIdx = 0;
  const unitIndexMap = {};
  bookData.sections.forEach((sec) =>
    sec.units.forEach((u) => { unitIndexMap[u.id] = ++globalIdx; })
  );

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "44px", height: "44px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.96)", borderBottom: "1px solid #f0fdf4", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", flexWrap: "wrap" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <img src="/logo.png" alt="Chashma Learn" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>General English</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english/vocabulary" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Vocabulary</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#064e3b", fontWeight: 700 }}>OWS Intermediate</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Dashboard</Link>
            <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48" }}>
              {(user?.displayName || user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "96px 24px 80px" }}>

        {/* ── BOOK HEADER ── */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "28px", alignItems: "start", marginBottom: "40px" }}>

          {/* Cover */}
          <div style={{ width: "140px", aspectRatio: "3/4", backgroundColor: "#e5e7eb", borderRadius: "10px", overflow: "hidden", border: "1px solid #d1d5db", flexShrink: 0 }}>
            <img
              src={bookData.cover}
              alt={bookData.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px", backgroundColor: "#f3f4f6" }}>
              <span style={{ fontSize: "32px" }}>📗</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#dbeafe", color: "#1e40af", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              INTERMEDIATE
            </span>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>
              {bookData.title}
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>
              {bookData.authors}
            </p>

            <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
              {[
                { val: bookData.sections.length, label: "Sections" },
                { val: totalUnits,               label: "Units" },
                { val: 3,                        label: "Free units", highlight: true },
              ].map(({ val, label, highlight }) => (
                <div key={label}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: highlight ? "#059669" : "#064e3b", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: "6px", backgroundColor: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${(3 / totalUnits) * 100}%`, height: "100%", backgroundColor: "#059669", borderRadius: "999px" }} />
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>3 of {totalUnits} unlocked</span>
            </div>
          </div>
        </div>

        {/* ── UPGRADE BANNER ── */}
        {!isLearner && (
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px 20px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500, lineHeight: 1.5 }}>
              Units 1–3 are free. <Link href="/dashboard" style={{ color: "#059669", fontWeight: 700, textDecoration: "none" }}>Upgrade to Learner</Link> to unlock all {totalUnits} units and access both Topic and Practice tabs.
            </p>
          </div>
        )}

        {/* ── SECTIONS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {bookData.sections.map((section, si) => {
            const sc     = sectionColors[si] || sectionColors[0];
            const isOpen = expandedSections[si] !== false;

            return (
              <div key={si} style={{ backgroundColor: "#ffffff", border: `1px solid ${isOpen ? sc.badge : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s" }}>

                <button
                  onClick={() => toggleSection(si)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", backgroundColor: isOpen ? sc.bg : "#ffffff", border: "none", cursor: "pointer", transition: "background-color 0.2s", textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px" }}>{section.icon}</span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: sc.text, margin: 0 }}>{section.title}</p>
                      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0", fontWeight: 500 }}>{section.units.length} units</p>
                    </div>
                  </div>
                  <span style={{ fontSize: "18px", color: "#9ca3af", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: `1px solid ${sc.badge}` }}>
                    {section.units.map((unit, ui) => {
                      const gIdx   = unitIndexMap[unit.id];
                      const isFree = gIdx <= 3;
                      const locked = !isLearner && !isFree;

                      return (
                        <Link
                          key={unit.id}
                          href={locked ? "#" : `/english/vocabulary/ows-intermediate/${unit.id}`}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "13px 20px", textDecoration: "none",
                            backgroundColor: locked ? "#fafafa" : "#ffffff",
                            borderBottom: ui < section.units.length - 1 ? "1px solid #f3f4f6" : "none",
                            opacity: locked ? 0.65 : 1,
                            cursor: locked ? "not-allowed" : "pointer",
                            transition: "background-color 0.15s",
                          }}
                          onMouseEnter={(e) => { if (!locked) e.currentTarget.style.backgroundColor = sc.bg; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = locked ? "#fafafa" : "#ffffff"; }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <div style={{
                              width: "38px", height: "38px", borderRadius: "8px",
                              backgroundColor: locked ? "#f3f4f6" : sc.badge,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: unit.num.length > 2 ? "10px" : "12px",
                              fontWeight: 800, color: locked ? "#9ca3af" : sc.text,
                              flexShrink: 0, letterSpacing: "-0.3px",
                            }}>
                              {unit.num}
                            </div>
                            <p style={{ fontSize: "13px", fontWeight: 600, color: locked ? "#9ca3af" : "#111827", margin: 0, lineHeight: 1.3 }}>
                              {unit.title}
                            </p>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                            {isFree && (
                              <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 8px", borderRadius: "999px", letterSpacing: "0.2px" }}>
                                FREE
                              </span>
                            )}
                            {locked
                              ? <span style={{ fontSize: "15px" }}>🔒</span>
                              : <span style={{ fontSize: "16px", color: "#d1d5db" }}>›</span>
                            }
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM CTA ── */}
        {!isLearner && (
          <div style={{ marginTop: "40px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>🎓</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>Unlock all {totalUnits} units</p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              Get full access to every unit, Topic explanations, and Practice exercises.
            </p>
            <Link href="/dashboard" style={{ display: "inline-block", backgroundColor: "#059669", color: "#ffffff", padding: "10px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 700 }}>
              Upgrade to Learner
            </Link>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
