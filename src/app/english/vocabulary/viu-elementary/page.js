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

// ─────────────────────────────────────────────────────────────────────────────
// BOOK DATA  — English Vocabulary in Use: Elementary (Cambridge)
// ─────────────────────────────────────────────────────────────────────────────
const bookData = {
  id:      "viu-elementary",
  title:   "English Vocabulary in Use",
  level:   "Elementary",
  authors: "Cambridge University Press",
  cover:   "/books/viu-elementary.jpg",
  sections: [
    {
      title: "🧑‍👨‍👩‍👧 People",
      subsections: [
        { label: "People", unitIds: Array.from({length: 9}, (_, i) => `viu-el-u${String(i+1).padStart(2,"0")}`) },
      ],
      units: [
        { id: "viu-el-u01", num: "01", title: "The family",                                    subtitle: "mother, uncle, relatives" },
        { id: "viu-el-u02", num: "02", title: "Birth, marriage and death",                     subtitle: "birthday, married, die" },
        { id: "viu-el-u03", num: "03", title: "Parts of the body",                             subtitle: "head, foot, shoulder" },
        { id: "viu-el-u04", num: "04", title: "Clothes",                                       subtitle: "hat, shirt, trousers" },
        { id: "viu-el-u05", num: "05", title: "Describing people",                             subtitle: "tall, dark, good-looking" },
        { id: "viu-el-u06", num: "06", title: "Health and illness",                            subtitle: "headache, heart attack, exercise" },
        { id: "viu-el-u07", num: "07", title: "Feelings",                                      subtitle: "love, tired, thirsty" },
        { id: "viu-el-u08", num: "08", title: "Conversations 1: Greetings and wishes",         subtitle: "Good morning, Happy New Year, well done" },
        { id: "viu-el-u09", num: "09", title: "Conversations 2: Useful words and expressions", subtitle: "I don't mind, anyway, let's" },
      ],
    },
    {
      title: "🏠 At Home",
      subsections: [
        { label: "At Home", unitIds: ["viu-el-u10","viu-el-u11","viu-el-u12","viu-el-u13"] },
      ],
      units: [
        { id: "viu-el-u10", num: "10", title: "Food and drink",                                subtitle: "rice, tea, vegetables" },
        { id: "viu-el-u11", num: "11", title: "In the kitchen",                                subtitle: "fridge, glass, saucepan" },
        { id: "viu-el-u12", num: "12", title: "In the bedroom and bathroom",                   subtitle: "wardrobe, shampoo, mirror" },
        { id: "viu-el-u13", num: "13", title: "In the living room",                            subtitle: "bookshelf, lamp, remote control" },
      ],
    },
    {
      title: "🏫 School and Workplace",
      subsections: [
        { label: "School & Work", unitIds: ["viu-el-u14","viu-el-u15","viu-el-u16","viu-el-u17"] },
      ],
      units: [
        { id: "viu-el-u14", num: "14", title: "Jobs",                                          subtitle: "secretary, factory, nurse" },
        { id: "viu-el-u15", num: "15", title: "At school and university",                      subtitle: "biology, notebook, pass an exam" },
        { id: "viu-el-u16", num: "16", title: "Communications",                                subtitle: "address, computer, memory stick" },
        { id: "viu-el-u17", num: "17", title: "Your phone",                                    subtitle: "apps, voicemail, text" },
      ],
    },
    {
      title: "🎭 Leisure",
      subsections: [
        { label: "Leisure", unitIds: ["viu-el-u18","viu-el-u19","viu-el-u20","viu-el-u21","viu-el-u22","viu-el-u23","viu-el-u24","viu-el-u25","viu-el-u26"] },
      ],
      units: [
        { id: "viu-el-u18", num: "18", title: "Holidays",                                      subtitle: "package holiday, currency, visa" },
        { id: "viu-el-u19", num: "19", title: "Shops and shopping",                            subtitle: "chemist's, department store, credit card" },
        { id: "viu-el-u20", num: "20", title: "Online shopping",                               subtitle: "reviews, basket, delivery" },
        { id: "viu-el-u21", num: "21", title: "In a hotel",                                    subtitle: "single room, key, luggage" },
        { id: "viu-el-u22", num: "22", title: "Eating out",                                    subtitle: "café, menu, fish and chips" },
        { id: "viu-el-u23", num: "23", title: "Sports",                                        subtitle: "table tennis, judo, volleyball" },
        { id: "viu-el-u24", num: "24", title: "Cinema",                                        subtitle: "western, film star, director" },
        { id: "viu-el-u25", num: "25", title: "Free time at home",                             subtitle: "gardening, listening to CDs, programme" },
        { id: "viu-el-u26", num: "26", title: "Music and musical instruments",                 subtitle: "guitar, jazz, orchestra" },
      ],
    },
    {
      title: "🌍 The World",
      subsections: [
        { label: "The World", unitIds: ["viu-el-u27","viu-el-u28","viu-el-u29","viu-el-u30","viu-el-u31","viu-el-u32","viu-el-u33"] },
      ],
      units: [
        { id: "viu-el-u27", num: "27", title: "Countries and nationalities",                   subtitle: "Spain, Chinese, continent" },
        { id: "viu-el-u28", num: "28", title: "Weather",                                       subtitle: "cold, rain, storm" },
        { id: "viu-el-u29", num: "29", title: "In the town",                                   subtitle: "railway station, bank, town hall" },
        { id: "viu-el-u30", num: "30", title: "In the countryside",                            subtitle: "hill, farm, river" },
        { id: "viu-el-u31", num: "31", title: "Animals",                                       subtitle: "horse, giraffe, pet" },
        { id: "viu-el-u32", num: "32", title: "Travelling",                                    subtitle: "train, map, flight" },
        { id: "viu-el-u33", num: "33", title: "UK culture",                                    subtitle: "fireworks, roast beef, Christmas" },
      ],
    },
    {
      title: "⚖️ Social Issues",
      subsections: [
        { label: "Social Issues", unitIds: ["viu-el-u34","viu-el-u35","viu-el-u36","viu-el-u37"] },
      ],
      units: [
        { id: "viu-el-u34", num: "34", title: "Crime",                                         subtitle: "murder, prison, guilty" },
        { id: "viu-el-u35", num: "35", title: "The media",                                     subtitle: "TV channel, magazine, talk show" },
        { id: "viu-el-u36", num: "36", title: "Problems at home and work",                     subtitle: "repair, untidy, in a bad mood" },
        { id: "viu-el-u37", num: "37", title: "Global problems",                               subtitle: "hurricane, war, strike" },
      ],
    },
    {
      title: "🔧 Everyday Verbs",
      subsections: [
        { label: "Core Verbs",   unitIds: ["viu-el-u38","viu-el-u39","viu-el-u40","viu-el-u41","viu-el-u42","viu-el-u43","viu-el-u44","viu-el-u45"] },
        { label: "Verb Topics",  unitIds: ["viu-el-u46","viu-el-u47","viu-el-u48","viu-el-u49"] },
      ],
      units: [
        { id: "viu-el-u38", num: "38", title: "Have / had / had",                              subtitle: "have breakfast, have time, have a swim" },
        { id: "viu-el-u39", num: "39", title: "Go / went / gone",                              subtitle: "go away, go shopping, go home" },
        { id: "viu-el-u40", num: "40", title: "Do / did / done",                               subtitle: "do an exercise, do your best, do the washing" },
        { id: "viu-el-u41", num: "41", title: "Make / made / made",                            subtitle: "make coffee, make a mistake, make a noise" },
        { id: "viu-el-u42", num: "42", title: "Come / came / come",                            subtitle: "come in, come from, come back" },
        { id: "viu-el-u43", num: "43", title: "Take / took / taken",                           subtitle: "take the bus, take a photo, take an exam" },
        { id: "viu-el-u44", num: "44", title: "Bring / brought / brought",                     subtitle: "bring something here, bring back, take" },
        { id: "viu-el-u45", num: "45", title: "Get / got / got",                               subtitle: "get tired, get better, get married" },
        { id: "viu-el-u46", num: "46", title: "Phrasal verbs",                                 subtitle: "get up, put on, turn down" },
        { id: "viu-el-u47", num: "47", title: "Everyday things",                               subtitle: "watch TV, wash clothes, go for a walk" },
        { id: "viu-el-u48", num: "48", title: "Talking",                                       subtitle: "say, tell, ask" },
        { id: "viu-el-u49", num: "49", title: "Moving",                                        subtitle: "walk, drive, fly" },
      ],
    },
    {
      title: "📚 Words and Grammar",
      subsections: [
        { label: "Words & Grammar", unitIds: ["viu-el-u50","viu-el-u51","viu-el-u52","viu-el-u53","viu-el-u54","viu-el-u55","viu-el-u56","viu-el-u57","viu-el-u58","viu-el-u59","viu-el-u60"] },
      ],
      units: [
        { id: "viu-el-u50", num: "50", title: "Conjunctions and connecting words",             subtitle: "because, only, before" },
        { id: "viu-el-u51", num: "51", title: "Days, months, seasons",                         subtitle: "Monday, July, winter" },
        { id: "viu-el-u52", num: "52", title: "Time words",                                    subtitle: "next year, often, once a week" },
        { id: "viu-el-u53", num: "53", title: "Places",                                        subtitle: "middle, front, abroad" },
        { id: "viu-el-u54", num: "54", title: "Manner",                                        subtitle: "fast, loud, the right way" },
        { id: "viu-el-u55", num: "55", title: "Common uncountable nouns",                      subtitle: "money, bread, information" },
        { id: "viu-el-u56", num: "56", title: "Common adjectives: Good and bad things",        subtitle: "nice, awful, lovely" },
        { id: "viu-el-u57", num: "57", title: "Words and prepositions",                        subtitle: "wait for, belong to, good at" },
        { id: "viu-el-u58", num: "58", title: "Prefixes",                                      subtitle: "impossible, ex-wife, unsafe" },
        { id: "viu-el-u59", num: "59", title: "Suffixes",                                      subtitle: "swimmer, useless, sunny" },
        { id: "viu-el-u60", num: "60", title: "Words you may confuse",                         subtitle: "quiet / quite, lend / borrow, cook / cooker" },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Derived indices
// ─────────────────────────────────────────────────────────────────────────────
const allUnits   = bookData.sections.flatMap((s) => s.units);
const totalUnits = allUnits.length; // 60

let _idx = 0;
const unitIndexMap = {};
bookData.sections.forEach((sec) =>
  sec.units.forEach((u) => { unitIndexMap[u.id] = ++_idx; })
);

// ─────────────────────────────────────────────────────────────────────────────
// Colour palette — one slot per section (8 sections)
// ─────────────────────────────────────────────────────────────────────────────
const sectionColors = [
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d", icon: "🧑‍👨‍👩‍👧" },
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc", icon: "🏠" },
  { accent: "#065f46", bg: "#f0fdf4", badge: "#d1fae5", text: "#022c22", border: "#6ee7b7", icon: "🏫" },
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd", icon: "🎭" },
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd", icon: "🌍" },
  { accent: "#b91c1c", bg: "#fff1f2", badge: "#fecdd3", text: "#7f1d1d", border: "#fda4af", icon: "⚖️" },
  { accent: "#0f766e", bg: "#f0fdfa", badge: "#ccfbf1", text: "#042f2e", border: "#5eead4", icon: "🔧" },
  { accent: "#a16207", bg: "#fefce8", badge: "#fef9c3", text: "#713f12", border: "#fde047", icon: "📚" },
];

const subsectionColors = [
  { bg: "#fef9c3", text: "#854d0e", border: "#fde68a" },
  { bg: "#dbeafe", text: "#1e3a5f", border: "#93c5fd" },
  { bg: "#fce7f3", text: "#831843", border: "#f9a8d4" },
  { bg: "#dcfce7", text: "#14532d", border: "#86efac" },
];

// ─────────────────────────────────────────────────────────────────────────────
// UnitRow
// ─────────────────────────────────────────────────────────────────────────────
function UnitRow({ unit, isFree, locked, sc, isLast, path }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={locked ? "#" : path}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "13px 20px", textDecoration: "none",
        backgroundColor: locked ? "#fafafa" : hovered ? sc.bg : "#ffffff",
        borderBottom: isLast ? "none" : "1px solid #f3f4f6",
        opacity: locked ? 0.65 : 1,
        cursor: locked ? "not-allowed" : "pointer",
        transition: "background-color 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "38px", height: "38px", borderRadius: "8px",
          backgroundColor: locked ? "#f3f4f6" : sc.badge,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 800,
          color: locked ? "#9ca3af" : sc.text,
          flexShrink: 0, letterSpacing: "-0.3px",
        }}>
          {unit.num}
        </div>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 600, color: locked ? "#9ca3af" : "#111827", margin: 0, lineHeight: 1.3 }}>
            {unit.title}
          </p>
          {unit.subtitle && (
            <p style={{ fontSize: "12px", color: locked ? "#d1d5db" : sc.accent, margin: "3px 0 0", fontWeight: 500, fontFamily: "monospace" }}>
              {unit.subtitle}
            </p>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        {isFree && (
          <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 8px", borderRadius: "999px" }}>
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
}

// ─────────────────────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────────────────────
export default function VIUElementaryPage() {
  const [user, setUser]         = useState(null);
  const [role, setRole]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState(
    Object.fromEntries(bookData.sections.map((_, i) => [i, true]))
  );

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
  const toggleSec = (i) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  if (loading) return (
    <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "44px", height: "44px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ fontSize: "14px", color: "#9ca3af" }}>Loading...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* NAV */}
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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>VIU Elementary</span>
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

        {/* BOOK HEADER */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "28px", alignItems: "start", marginBottom: "40px" }}>
          <div style={{ width: "140px", aspectRatio: "3/4", backgroundColor: "#e5e7eb", borderRadius: "10px", overflow: "hidden", border: "1px solid #d1d5db", flexShrink: 0 }}>
            <img src={bookData.cover} alt={bookData.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px", backgroundColor: "#f3f4f6" }}>
              <span style={{ fontSize: "32px" }}>📒</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#bae6fd", color: "#0c4a6e", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              ELEMENTARY
            </span>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>{bookData.title}</h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>{bookData.authors}</p>
            <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
              {[
                { val: bookData.sections.length, label: "Sections" },
                { val: totalUnits,               label: "Units" },
                { val: 3,                        label: "Free units", hi: true },
              ].map(({ val, label, hi }) => (
                <div key={label}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: hi ? "#059669" : "#064e3b", lineHeight: 1 }}>{val}</p>
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

        {/* UPGRADE BANNER */}
        {!isLearner && (
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px 20px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500, lineHeight: 1.5 }}>
              Units 1–3 are free. <Link href="/dashboard" style={{ color: "#059669", fontWeight: 700, textDecoration: "none" }}>Upgrade to Learner</Link> to unlock all {totalUnits} units.
            </p>
          </div>
        )}

        {/* SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {bookData.sections.map((section, si) => {
            const sc     = sectionColors[si % sectionColors.length];
            const isOpen = expanded[si] !== false;

            const subsecMap = {};
            if (section.subsections) {
              section.subsections.forEach((sub, subIdx) => {
                sub.unitIds.forEach((uid) => { subsecMap[uid] = { label: sub.label, colorIdx: subIdx }; });
              });
            }

            return (
              <div key={si} style={{ backgroundColor: "#ffffff", border: `1px solid ${isOpen ? sc.border : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s" }}>
                <button
                  onClick={() => toggleSec(si)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", backgroundColor: isOpen ? sc.bg : "#ffffff", border: "none", cursor: "pointer", transition: "background-color 0.2s", textAlign: "left" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px" }}>{sc.icon}</span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: sc.text, margin: 0 }}>{section.title}</p>
                      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0", fontWeight: 500 }}>{section.units.length} units</p>
                    </div>
                  </div>
                  <span style={{ fontSize: "18px", color: "#9ca3af", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: `1px solid ${sc.border}` }}>
                    {(() => {
                      let lastLabel = null;
                      return section.units.map((unit, ui) => {
                        const gIdx    = unitIndexMap[unit.id];
                        const isFree  = gIdx <= 3;
                        const locked  = !isLearner && !isFree;
                        const sub     = subsecMap[unit.id];
                        const showSub = sub && sub.label !== lastLabel;
                        if (showSub) lastLabel = sub.label;
                        const subColor = sub ? subsectionColors[sub.colorIdx % subsectionColors.length] : null;

                        return (
                          <div key={unit.id}>
                            {showSub && (
                              <div style={{ padding: "7px 20px", backgroundColor: subColor.bg, borderTop: ui === 0 ? "none" : `1px solid ${sc.border}`, borderBottom: `1px solid ${subColor.border}` }}>
                                <span style={{ fontSize: "10px", fontWeight: 800, color: subColor.text, textTransform: "uppercase", letterSpacing: "0.6px" }}>{sub.label}</span>
                              </div>
                            )}
                            <UnitRow
                              unit={unit} isFree={isFree} locked={locked} sc={sc}
                              isLast={ui === section.units.length - 1}
                              path={`/english/vocabulary/viu-elementary/${unit.id}`}
                            />
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        {!isLearner && (
          <div style={{ marginTop: "40px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>🎓</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>Unlock all {totalUnits} units</p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>Full access to every vocabulary unit with exercises and examples.</p>
            <Link href="/dashboard" style={{ display: "inline-block", backgroundColor: "#059669", color: "#ffffff", padding: "10px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 700 }}>
              Upgrade to Learner
            </Link>
          </div>
        )}
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
