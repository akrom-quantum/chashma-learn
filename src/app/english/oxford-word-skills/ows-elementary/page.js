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
  id:      "ows-elementary",
  title:   "Oxford Word Skills",
  level:   "Basic",
  authors: "Ruth Gairns & Stuart Redman",
  cover:   "/books/ows-elementary.jpg",
  subject: "vocabulary",
  sections: [
    {
      title: "Section 1 — Learning English",
      icon: "🔤",
      units: [
        { id: "unit-01", num: "1",  title: "Classroom vocabulary",        subtitle: null },
        { id: "unit-02", num: "2",  title: "Grammar words",               subtitle: null },
        { id: "unit-03", num: "3",  title: "Using this book",             subtitle: null },
        { id: "unit-04", num: "4",  title: "Learning new words",          subtitle: null },
        { id: "unit-05", num: "5",  title: "Classroom activities",        subtitle: null },
      ],
    },
    {
      title: "Section 2 — Numbers and Time",
      icon: "🔢",
      units: [
        { id: "unit-06", num: "6",  title: "Numbers",                     subtitle: null },
        { id: "unit-07", num: "7",  title: "Telling the time",            subtitle: null },
        { id: "unit-08", num: "8",  title: "Days, seasons and dates",     subtitle: null },
        { id: "unit-09", num: "9",  title: "Time words and phrases",      subtitle: null },
      ],
    },
    {
      title: "Section 3 — People",
      icon: "👥",
      units: [
        { id: "unit-10", num: "10", title: "Parts of the body",           subtitle: null },
        { id: "unit-11", num: "11", title: "Describing people",           subtitle: null },
        { id: "unit-12", num: "12", title: "Physical actions",            subtitle: null },
        { id: "unit-13", num: "13", title: "Personal information",        subtitle: null },
        { id: "unit-14", num: "14", title: "Family",                      subtitle: null },
        { id: "unit-15", num: "15", title: "Personality",                 subtitle: null },
        { id: "unit-16", num: "16", title: "Relationships",               subtitle: null },
        { id: "unit-17", num: "17", title: "Feelings",                    subtitle: null },
      ],
    },
    {
      title: "Language Section 1 — Prepositions",
      icon: "🔵",
      units: [
        { id: "unit-18", num: "18", title: "Prepositions: time",          subtitle: null },
        { id: "unit-19", num: "19", title: "Prepositions: direction",     subtitle: null },
        { id: "unit-20", num: "20", title: "Prepositions: place",         subtitle: null },
        { id: "unit-21", num: "21", title: "Prepositions: phrases",       subtitle: null },
        { id: "unit-22", num: "22", title: "Word + preposition",          subtitle: null },
      ],
    },
    {
      title: "Section 4 — Everyday Life",
      icon: "🏠",
      units: [
        { id: "unit-23", num: "23", title: "Routines",                    subtitle: null },
        { id: "unit-24", num: "24", title: "Clothes",                     subtitle: null },
        { id: "unit-25", num: "25", title: "Accessories",                 subtitle: null },
        { id: "unit-26", num: "26", title: "Colours, size and appearance",subtitle: null },
        { id: "unit-27", num: "27", title: "Money",                       subtitle: null },
        { id: "unit-28", num: "28", title: "Shopping",                    subtitle: null },
        { id: "unit-29", num: "29", title: "Possessions",                 subtitle: null },
        { id: "unit-30", num: "30", title: "Crime",                       subtitle: null },
        { id: "unit-31", num: "31", title: "Illness",                     subtitle: null },
        { id: "unit-32", num: "32", title: "Injuries",                    subtitle: null },
      ],
    },
    {
      title: "Section 5 — The World Around Us",
      icon: "🌍",
      units: [
        { id: "unit-33", num: "33", title: "Geography",                   subtitle: null },
        { id: "unit-34", num: "34", title: "The environment",             subtitle: null },
        { id: "unit-35", num: "35", title: "Countries and nationalities", subtitle: null },
        { id: "unit-36", num: "36", title: "My country",                  subtitle: null },
        { id: "unit-37", num: "37", title: "Weather",                     subtitle: null },
        { id: "unit-38", num: "38", title: "Animals, insects and birds",  subtitle: null },
      ],
    },
    {
      title: "Language Section 2 — Verbs",
      icon: "🔵",
      units: [
        { id: "unit-39", num: "39", title: "Irregular verbs",             subtitle: null },
        { id: "unit-40", num: "40", title: "have got and have",           subtitle: null },
        { id: "unit-41", num: "41", title: "make or do",                  subtitle: null },
        { id: "unit-42", num: "42", title: "get",                         subtitle: null },
        { id: "unit-43", num: "43", title: "see",                         subtitle: null },
        { id: "unit-44", num: "44", title: "Verbs and nouns with the same form", subtitle: null },
      ],
    },
    {
      title: "Section 6 — Food and Drink",
      icon: "🍽️",
      units: [
        { id: "unit-45", num: "45", title: "Shopping for food",           subtitle: null },
        { id: "unit-46", num: "46", title: "Fruit and vegetables",        subtitle: null },
        { id: "unit-47", num: "47", title: "Meat and fish",               subtitle: null },
        { id: "unit-48", num: "48", title: "A restaurant table",          subtitle: null },
        { id: "unit-49", num: "49", title: "Eating in a restaurant",      subtitle: null },
        { id: "unit-50", num: "50", title: "In a café",                   subtitle: null },
      ],
    },
    {
      title: "Section 7 — Getting Around",
      icon: "🚌",
      units: [
        { id: "unit-51", num: "51", title: "Vehicles and roads",          subtitle: null },
        { id: "unit-52", num: "52", title: "Buses",                       subtitle: null },
        { id: "unit-53", num: "53", title: "Trains",                      subtitle: null },
        { id: "unit-54", num: "54", title: "Directions",                  subtitle: null },
        { id: "unit-55", num: "55", title: "Signs and notices",           subtitle: null },
      ],
    },
    {
      title: "Section 8 — Places",
      icon: "📍",
      units: [
        { id: "unit-56", num: "56", title: "My town",                     subtitle: null },
        { id: "unit-57", num: "57", title: "The countryside",             subtitle: null },
        { id: "unit-58", num: "58", title: "Home",                        subtitle: null },
        { id: "unit-59", num: "59", title: "Kitchen",                     subtitle: null },
        { id: "unit-60", num: "60", title: "Bedroom and bathroom",        subtitle: null },
        { id: "unit-61", num: "61", title: "Living room",                 subtitle: null },
      ],
    },
    {
      title: "Language Section 3 — Adjectives and Adverbs",
      icon: "🔵",
      units: [
        { id: "unit-62", num: "62", title: "Adjectives with prefixes",    subtitle: null },
        { id: "unit-63", num: "63", title: "Adjective opposites",         subtitle: null },
        { id: "unit-64", num: "64", title: "Common adverbs",              subtitle: null },
        { id: "unit-65", num: "65", title: "Adverbs of manner",           subtitle: null },
      ],
    },
    {
      title: "Section 9 — Study and Work",
      icon: "🎓",
      units: [
        { id: "unit-66", num: "66", title: "School subjects",             subtitle: null },
        { id: "unit-67", num: "67", title: "The education system",        subtitle: null },
        { id: "unit-68", num: "68", title: "University",                  subtitle: null },
        { id: "unit-69", num: "69", title: "Jobs",                        subtitle: null },
        { id: "unit-70", num: "70", title: "Describing jobs",             subtitle: null },
        { id: "unit-71", num: "71", title: "Job interview",               subtitle: null },
        { id: "unit-72", num: "72", title: "First day at work",           subtitle: null },
      ],
    },
    {
      title: "Section 10 — Technology",
      icon: "💻",
      units: [
        { id: "unit-73", num: "73", title: "Computers",                   subtitle: null },
        { id: "unit-74", num: "74", title: "Email, letters and the internet", subtitle: null },
        { id: "unit-75", num: "75", title: "Phoning",                     subtitle: null },
      ],
    },
    {
      title: "Language Section 4 — Building Words",
      icon: "🔵",
      units: [
        { id: "unit-76", num: "76", title: "-er / -or / -r nouns",        subtitle: null },
        { id: "unit-77", num: "77", title: "-ing forms",                  subtitle: null },
        { id: "unit-78", num: "78", title: "Noun suffixes",               subtitle: null },
        { id: "unit-79", num: "79", title: "Compound nouns",              subtitle: null },
      ],
    },
    {
      title: "Section 11 — Hobbies and Interests",
      icon: "🎯",
      units: [
        { id: "unit-80", num: "80", title: "Likes and dislikes",          subtitle: null },
        { id: "unit-81", num: "81", title: "Free time",                   subtitle: null },
        { id: "unit-82", num: "82", title: "Sport",                       subtitle: null },
        { id: "unit-83", num: "83", title: "Music",                       subtitle: null },
        { id: "unit-84", num: "84", title: "Films",                       subtitle: null },
        { id: "unit-85", num: "85", title: "The media",                   subtitle: null },
        { id: "unit-86", num: "86", title: "Books",                       subtitle: null },
      ],
    },
    {
      title: "Section 12 — Holidays",
      icon: "✈️",
      units: [
        { id: "unit-87", num: "87", title: "Arranging a holiday",         subtitle: null },
        { id: "unit-88", num: "88", title: "Hotels",                      subtitle: null },
        { id: "unit-89", num: "89", title: "Airports",                    subtitle: null },
        { id: "unit-90", num: "90", title: "Types of holiday",            subtitle: null },
      ],
    },
    {
      title: "Section 13 — Social English",
      icon: "🗣️",
      units: [
        { id: "unit-91", num: "91", title: "Meet and greet",              subtitle: null },
        { id: "unit-92", num: "92", title: "Ask for information",         subtitle: null },
        { id: "unit-93", num: "93", title: "Requests and permission",     subtitle: null },
        { id: "unit-94", num: "94", title: "Invitations and suggestions", subtitle: null },
        { id: "unit-95", num: "95", title: "Offers and saying sorry",     subtitle: null },
        { id: "unit-96", num: "96", title: "Probably or possibly",        subtitle: null },
      ],
    },
    {
      title: "Language Section 5 — Link Words and Phrasal Verbs",
      icon: "🔵",
      units: [
        { id: "unit-97",  num: "97",  title: "Link words 1",             subtitle: null },
        { id: "unit-98",  num: "98",  title: "Link words 2",             subtitle: null },
        { id: "unit-99",  num: "99",  title: "Phrasal verbs",            subtitle: null },
        { id: "unit-100", num: "100", title: "Common expressions",       subtitle: null },
      ],
    },
  ],
};

// Count total units
const allUnits = bookData.sections.flatMap((s) => s.units);
const totalUnits = allUnits.length;

// Section colour palette — cycling through 18 sections
const sectionColors = [
  { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46" },  // 0 green
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },  // 1 blue
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95" },  // 2 violet
  { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },  // 3 cyan (lang)
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },  // 4 amber
  { accent: "#15803d", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d" },  // 5 emerald
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },  // 6 blue (lang)
  { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12" },  // 7 orange
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a" },  // 8 indigo
  { accent: "#0f766e", bg: "#f0fdfa", badge: "#99f6e4", text: "#134e4a" },  // 9 teal
  { accent: "#6d28d9", bg: "#faf5ff", badge: "#ddd6fe", text: "#3b0764" },  // 10 purple (lang)
  { accent: "#b91c1c", bg: "#fef2f2", badge: "#fecaca", text: "#7f1d1d" },  // 11 red
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },  // 12 blue
  { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },  // 13 cyan (lang)
  { accent: "#4f46e5", bg: "#eef2ff", badge: "#c7d2fe", text: "#312e81" },  // 14 indigo-v
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },  // 15 amber
  { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46" },  // 16 green
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },  // 17 blue (lang)
];

export default function OWSElementaryPage() {
  const [user, setUser]               = useState(null);
  const [role, setRole]               = useState(null);
  const [loading, setLoading]         = useState(true);
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

  const toggleSection = (idx) =>
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));

  // Build global unit index map for free-unit logic
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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>OWS Basic</span>
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
              <span style={{ fontSize: "32px" }}>📘</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              BASIC
            </span>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>
              {bookData.title}
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>
              {bookData.authors}
            </p>

            {/* Stats */}
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

            {/* Progress bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: "6px", backgroundColor: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${(3 / totalUnits) * 100}%`, height: "100%", backgroundColor: "#059669", borderRadius: "999px" }} />
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>3 of {totalUnits} unlocked</span>
            </div>
          </div>
        </div>

        {/* ── UPGRADE BANNER (viewers only) ── */}
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
            const sc     = sectionColors[si % sectionColors.length];
            const isOpen = expandedSections[si] !== false;

            return (
              <div
                key={si}
                style={{ backgroundColor: "#ffffff", border: `1px solid ${isOpen ? sc.badge : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s" }}
              >
                {/* Section header */}
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

                {/* Units list */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${sc.badge}` }}>
                    {section.units.map((unit, ui) => {
                      const gIdx   = unitIndexMap[unit.id];
                      const isFree = gIdx <= 3;
                      const locked = !isLearner && !isFree;

                      return (
                        <Link
                          key={unit.id}
                          href={locked ? "#" : `/english/vocabulary/ows-elementary/${unit.id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "13px 20px",
                            textDecoration: "none",
                            backgroundColor: locked ? "#fafafa" : "#ffffff",
                            borderBottom: ui < section.units.length - 1 ? "1px solid #f3f4f6" : "none",
                            opacity: locked ? 0.65 : 1,
                            cursor: locked ? "not-allowed" : "pointer",
                            transition: "background-color 0.15s",
                          }}
                          onMouseEnter={(e) => { if (!locked) e.currentTarget.style.backgroundColor = sc.bg; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = locked ? "#fafafa" : "#ffffff"; }}
                        >
                          {/* Left */}
                          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            {/* Unit number badge */}
                            <div style={{
                              width: "38px", height: "38px", borderRadius: "8px",
                              backgroundColor: locked ? "#f3f4f6" : sc.badge,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: unit.num.length > 2 ? "10px" : "12px",
                              fontWeight: 800,
                              color: locked ? "#9ca3af" : sc.text,
                              flexShrink: 0,
                              letterSpacing: "-0.3px",
                            }}>
                              {unit.num}
                            </div>

                            {/* Title */}
                            <div>
                              <p style={{ fontSize: "13px", fontWeight: 600, color: locked ? "#9ca3af" : "#111827", margin: 0, lineHeight: 1.3 }}>
                                {unit.title}
                              </p>
                            </div>
                          </div>

                          {/* Right */}
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                            {isFree && (
                              <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 8px", borderRadius: "999px", letterSpacing: "0.2px" }}>
                                FREE
                              </span>
                            )}
                            {locked ? (
                              <span style={{ fontSize: "15px" }}>🔒</span>
                            ) : (
                              <span style={{ fontSize: "16px", color: "#d1d5db" }}>›</span>
                            )}
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
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>
              Unlock all {totalUnits} units
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              Get full access to every unit, Topic explanations, and Practice exercises.
            </p>
            <Link href="/dashboard" style={{ display: "inline-block", backgroundColor: "#059669", color: "#ffffff", padding: "10px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 700 }}>
              Upgrade to Learner
            </Link>
          </div>
        )}

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
