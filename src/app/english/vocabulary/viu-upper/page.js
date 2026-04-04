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
// BOOK DATA — English Vocabulary in Use: Upper-intermediate
// ─────────────────────────────────────────────────────────────────────────────
const bookData = {
  id:      "viu-upper-intermediate",
  title:   "English Vocabulary in Use",
  level:   "Upper-intermediate",
  authors: "Cambridge University Press",
  cover:   "/books/viu-upper-intermediate.jpg",
  sections: [
    {
      title: "🎓 Effective Vocabulary Learning",
      subsections: [{ label: "Learning", unitIds: ["viu-ui-u01","viu-ui-u02","viu-ui-u03","viu-ui-u04"] }],
      units: [
        { id: "viu-ui-u01", num: "01", title: "Learning vocabulary",                subtitle: null },
        { id: "viu-ui-u02", num: "02", title: "Organising a vocabulary notebook",   subtitle: null },
        { id: "viu-ui-u03", num: "03", title: "Using your dictionary",              subtitle: null },
        { id: "viu-ui-u04", num: "04", title: "Guessing and explaining meaning",    subtitle: null },
      ],
    },
    {
      title: "🌐 Topics",
      subsections: [
        { label: "People & Home",    unitIds: ["viu-ui-u05","viu-ui-u06","viu-ui-u07","viu-ui-u08","viu-ui-u09","viu-ui-u10","viu-ui-u11","viu-ui-u12","viu-ui-u13"] },
        { label: "Education & Work", unitIds: ["viu-ui-u14","viu-ui-u15","viu-ui-u16","viu-ui-u17"] },
        { label: "Culture & Life",   unitIds: ["viu-ui-u18","viu-ui-u19","viu-ui-u20","viu-ui-u21","viu-ui-u22"] },
        { label: "World & Society",  unitIds: ["viu-ui-u23","viu-ui-u24","viu-ui-u25","viu-ui-u26","viu-ui-u27","viu-ui-u28","viu-ui-u29","viu-ui-u30"] },
        { label: "Tech & Media",     unitIds: ["viu-ui-u31","viu-ui-u32","viu-ui-u33","viu-ui-u34","viu-ui-u35","viu-ui-u36","viu-ui-u37"] },
        { label: "Politics & More",  unitIds: ["viu-ui-u38","viu-ui-u39","viu-ui-u40","viu-ui-u41"] },
      ],
      units: [
        { id: "viu-ui-u05", num: "05", title: "Countries, nationalities and languages", subtitle: null },
        { id: "viu-ui-u06", num: "06", title: "The weather",                         subtitle: null },
        { id: "viu-ui-u07", num: "07", title: "Describing people: appearance",        subtitle: null },
        { id: "viu-ui-u08", num: "08", title: "Describing people: personality",       subtitle: null },
        { id: "viu-ui-u09", num: "09", title: "Idioms describing people",             subtitle: null },
        { id: "viu-ui-u10", num: "10", title: "Relationships",                        subtitle: null },
        { id: "viu-ui-u11", num: "11", title: "At home",                              subtitle: null },
        { id: "viu-ui-u12", num: "12", title: "Everyday minor problems",              subtitle: null },
        { id: "viu-ui-u13", num: "13", title: "Global problems",                      subtitle: null },
        { id: "viu-ui-u14", num: "14", title: "Education",                            subtitle: null },
        { id: "viu-ui-u15", num: "15", title: "Higher education",                     subtitle: null },
        { id: "viu-ui-u16", num: "16", title: "Work",                                 subtitle: null },
        { id: "viu-ui-u17", num: "17", title: "Business",                             subtitle: null },
        { id: "viu-ui-u18", num: "18", title: "Sport",                                subtitle: null },
        { id: "viu-ui-u19", num: "19", title: "Art and literature",                   subtitle: null },
        { id: "viu-ui-u20", num: "20", title: "Theatre and cinema",                   subtitle: null },
        { id: "viu-ui-u21", num: "21", title: "Music",                                subtitle: null },
        { id: "viu-ui-u22", num: "22", title: "Food",                                 subtitle: null },
        { id: "viu-ui-u23", num: "23", title: "Physical geography",                   subtitle: null },
        { id: "viu-ui-u24", num: "24", title: "Environmental problems",               subtitle: null },
        { id: "viu-ui-u25", num: "25", title: "Towns",                                subtitle: null },
        { id: "viu-ui-u26", num: "26", title: "The natural world",                    subtitle: null },
        { id: "viu-ui-u27", num: "27", title: "Clothes",                              subtitle: null },
        { id: "viu-ui-u28", num: "28", title: "Health and medicine",                  subtitle: null },
        { id: "viu-ui-u29", num: "29", title: "Medicine and technology",              subtitle: null },
        { id: "viu-ui-u30", num: "30", title: "Health and lifestyle",                 subtitle: null },
        { id: "viu-ui-u31", num: "31", title: "Travel",                               subtitle: null },
        { id: "viu-ui-u32", num: "32", title: "Holidays",                             subtitle: null },
        { id: "viu-ui-u33", num: "33", title: "Science and technology",               subtitle: null },
        { id: "viu-ui-u34", num: "34", title: "Computers",                            subtitle: null },
        { id: "viu-ui-u35", num: "35", title: "Communications and the Internet",      subtitle: null },
        { id: "viu-ui-u36", num: "36", title: "Social media",                         subtitle: null },
        { id: "viu-ui-u37", num: "37", title: "The press and the media",              subtitle: null },
        { id: "viu-ui-u38", num: "38", title: "Politics and public institutions",     subtitle: null },
        { id: "viu-ui-u39", num: "39", title: "Crime",                                subtitle: null },
        { id: "viu-ui-u40", num: "40", title: "Money",                                subtitle: null },
        { id: "viu-ui-u41", num: "41", title: "Describing objects",                   subtitle: null },
      ],
    },
    {
      title: "💬 Feelings and Actions",
      subsections: [{ label: "Feelings & Actions", unitIds: ["viu-ui-u42","viu-ui-u43","viu-ui-u44","viu-ui-u45","viu-ui-u46","viu-ui-u47","viu-ui-u48","viu-ui-u49","viu-ui-u50"] }],
      units: [
        { id: "viu-ui-u42", num: "42", title: "Belief and opinion",                   subtitle: null },
        { id: "viu-ui-u43", num: "43", title: "Pleasant and unpleasant feelings",     subtitle: null },
        { id: "viu-ui-u44", num: "44", title: "Like, dislike and desire",             subtitle: null },
        { id: "viu-ui-u45", num: "45", title: "Speaking",                             subtitle: null },
        { id: "viu-ui-u46", num: "46", title: "The six senses",                       subtitle: null },
        { id: "viu-ui-u47", num: "47", title: "What your body does",                  subtitle: null },
        { id: "viu-ui-u48", num: "48", title: "Praising and criticising",             subtitle: null },
        { id: "viu-ui-u49", num: "49", title: "Emotions and moods",                   subtitle: null },
        { id: "viu-ui-u50", num: "50", title: "Commenting on problematic situations", subtitle: null },
      ],
    },
    {
      title: "💡 Basic Concepts",
      subsections: [{ label: "Concepts", unitIds: ["viu-ui-u51","viu-ui-u52","viu-ui-u53","viu-ui-u54","viu-ui-u55","viu-ui-u56","viu-ui-u57","viu-ui-u58","viu-ui-u59","viu-ui-u60"] }],
      units: [
        { id: "viu-ui-u51", num: "51", title: "Number, quantity, degree and intensity", subtitle: null },
        { id: "viu-ui-u52", num: "52", title: "Numbers and shapes",                   subtitle: null },
        { id: "viu-ui-u53", num: "53", title: "Time",                                 subtitle: null },
        { id: "viu-ui-u54", num: "54", title: "Distances and dimensions",             subtitle: null },
        { id: "viu-ui-u55", num: "55", title: "Obligation, need, possibility and probability", subtitle: null },
        { id: "viu-ui-u56", num: "56", title: "Sound and light",                      subtitle: null },
        { id: "viu-ui-u57", num: "57", title: "Possession and giving",                subtitle: null },
        { id: "viu-ui-u58", num: "58", title: "Movement and speed",                   subtitle: null },
        { id: "viu-ui-u59", num: "59", title: "Texture, brightness, weight and density", subtitle: null },
        { id: "viu-ui-u60", num: "60", title: "Success, failure and difficulty",      subtitle: null },
      ],
    },
    {
      title: "🔗 Connecting and Linking Words",
      subsections: [{ label: "Connecting & Linking", unitIds: ["viu-ui-u61","viu-ui-u62","viu-ui-u63","viu-ui-u64","viu-ui-u65","viu-ui-u66","viu-ui-u67","viu-ui-u68","viu-ui-u69"] }],
      units: [
        { id: "viu-ui-u61", num: "61", title: "Time: connecting words and expressions", subtitle: null },
        { id: "viu-ui-u62", num: "62", title: "Condition",                            subtitle: null },
        { id: "viu-ui-u63", num: "63", title: "Cause, reason, purpose and result",    subtitle: null },
        { id: "viu-ui-u64", num: "64", title: "Concession and contrast",              subtitle: null },
        { id: "viu-ui-u65", num: "65", title: "Addition",                             subtitle: null },
        { id: "viu-ui-u66", num: "66", title: "Referring words",                      subtitle: null },
        { id: "viu-ui-u67", num: "67", title: "Discourse markers in spoken English",  subtitle: null },
        { id: "viu-ui-u68", num: "68", title: "Linking words in writing",             subtitle: null },
        { id: "viu-ui-u69", num: "69", title: "Talking and communicating",            subtitle: null },
      ],
    },
    {
      title: "🔤 Word Formation",
      subsections: [
        { label: "Affixes & Roots",   unitIds: ["viu-ui-u70","viu-ui-u71","viu-ui-u72","viu-ui-u73","viu-ui-u74"] },
        { label: "Compounds & More",  unitIds: ["viu-ui-u75","viu-ui-u76","viu-ui-u77","viu-ui-u78","viu-ui-u79"] },
      ],
      units: [
        { id: "viu-ui-u70", num: "70", title: "Suffixes",                             subtitle: null },
        { id: "viu-ui-u71", num: "71", title: "Prefixes",                             subtitle: null },
        { id: "viu-ui-u72", num: "72", title: "Roots",                                subtitle: null },
        { id: "viu-ui-u73", num: "73", title: "Abstract nouns",                       subtitle: null },
        { id: "viu-ui-u74", num: "74", title: "Compound adjectives",                  subtitle: null },
        { id: "viu-ui-u75", num: "75", title: "Compound nouns 1: noun + noun",        subtitle: null },
        { id: "viu-ui-u76", num: "76", title: "Compound nouns 2: verb + preposition", subtitle: null },
        { id: "viu-ui-u77", num: "77", title: "Binomials",                            subtitle: null },
        { id: "viu-ui-u78", num: "78", title: "Abbreviations and acronyms",           subtitle: null },
        { id: "viu-ui-u79", num: "79", title: "Multi-word expressions",               subtitle: null },
      ],
    },
    {
      title: "🗣️ Words and Pronunciation",
      subsections: [{ label: "Pronunciation", unitIds: ["viu-ui-u80","viu-ui-u81","viu-ui-u82"] }],
      units: [
        { id: "viu-ui-u80", num: "80", title: "Words commonly mispronounced",         subtitle: null },
        { id: "viu-ui-u81", num: "81", title: "Onomatopoeic words",                   subtitle: null },
        { id: "viu-ui-u82", num: "82", title: "Homophones and homographs",            subtitle: null },
      ],
    },
    {
      title: "🔢 Counting People and Things",
      subsections: [{ label: "Countability", unitIds: ["viu-ui-u83","viu-ui-u84","viu-ui-u85","viu-ui-u86","viu-ui-u87","viu-ui-u88"] }],
      units: [
        { id: "viu-ui-u83", num: "83", title: "Uncountable nouns",                    subtitle: null },
        { id: "viu-ui-u84", num: "84", title: "Words that only occur in the plural",  subtitle: null },
        { id: "viu-ui-u85", num: "85", title: "Countable and uncountable nouns with different meanings", subtitle: null },
        { id: "viu-ui-u86", num: "86", title: "Making uncountable nouns countable",   subtitle: null },
        { id: "viu-ui-u87", num: "87", title: "Collective nouns",                     subtitle: null },
        { id: "viu-ui-u88", num: "88", title: "Containers and contents",              subtitle: null },
      ],
    },
    {
      title: "🔑 Phrasal Verbs and Verb-based Expressions",
      subsections: [{ label: "Key Verbs", unitIds: ["viu-ui-u89","viu-ui-u90","viu-ui-u91","viu-ui-u92","viu-ui-u93","viu-ui-u94"] }],
      units: [
        { id: "viu-ui-u89", num: "89", title: "Expressions with do and make",         subtitle: null },
        { id: "viu-ui-u90", num: "90", title: "Expressions with bring and take",      subtitle: null },
        { id: "viu-ui-u91", num: "91", title: "Expressions with get",                 subtitle: null },
        { id: "viu-ui-u92", num: "92", title: "Expressions with set and put",         subtitle: null },
        { id: "viu-ui-u93", num: "93", title: "Expressions with come and go",         subtitle: null },
        { id: "viu-ui-u94", num: "94", title: "Expressions with other common verbs",  subtitle: null },
      ],
    },
    {
      title: "✍️ Varieties and Styles",
      subsections: [{ label: "Register & Style", unitIds: ["viu-ui-u95","viu-ui-u96","viu-ui-u97","viu-ui-u98","viu-ui-u99","viu-ui-u100","viu-ui-u101"] }],
      units: [
        { id: "viu-ui-u95",  num: "95",  title: "Formal and informal words 1",        subtitle: null },
        { id: "viu-ui-u96",  num: "96",  title: "Formal and informal words 2",        subtitle: null },
        { id: "viu-ui-u97",  num: "97",  title: "Similes",                            subtitle: null },
        { id: "viu-ui-u98",  num: "98",  title: "Proverbs",                           subtitle: null },
        { id: "viu-ui-u99",  num: "99",  title: "The language of signs and notices",  subtitle: null },
        { id: "viu-ui-u100", num: "100", title: "Headline English",                   subtitle: null },
        { id: "viu-ui-u101", num: "101", title: "US English",                         subtitle: null },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Derived indices
// ─────────────────────────────────────────────────────────────────────────────
const allUnits   = bookData.sections.flatMap((s) => s.units);
const totalUnits = allUnits.length; // 101

let _idx = 0;
const unitIndexMap = {};
bookData.sections.forEach((sec) =>
  sec.units.forEach((u) => { unitIndexMap[u.id] = ++_idx; })
);

// ─────────────────────────────────────────────────────────────────────────────
// Colour palette — 10 sections
// ─────────────────────────────────────────────────────────────────────────────
const sectionColors = [
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d", icon: "🎓" },
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd", icon: "🌐" },
  { accent: "#9d174d", bg: "#fff1f2", badge: "#fce7f3", text: "#500724", border: "#f9a8d4", icon: "💬" },
  { accent: "#a16207", bg: "#fefce8", badge: "#fef9c3", text: "#713f12", border: "#fde047", icon: "💡" },
  { accent: "#065f46", bg: "#ecfdf5", badge: "#d1fae5", text: "#022c22", border: "#34d399", icon: "🔗" },
  { accent: "#4338ca", bg: "#eef2ff", badge: "#e0e7ff", text: "#1e1b4b", border: "#a5b4fc", icon: "🔤" },
  { accent: "#0e7490", bg: "#ecfeff", badge: "#cffafe", text: "#083344", border: "#67e8f9", icon: "🗣️" },
  { accent: "#1e40af", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a", border: "#60a5fa", icon: "🔢" },
  { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12", border: "#fb923c", icon: "🔑" },
  { accent: "#5b21b6", bg: "#f5f3ff", badge: "#ddd6fe", text: "#2e1065", border: "#a78bfa", icon: "✍️" },
];

const subsectionColors = [
  { bg: "#fef9c3", text: "#854d0e", border: "#fde68a" },
  { bg: "#dbeafe", text: "#1e3a5f", border: "#93c5fd" },
  { bg: "#fce7f3", text: "#831843", border: "#f9a8d4" },
  { bg: "#dcfce7", text: "#14532d", border: "#86efac" },
  { bg: "#ede9fe", text: "#3b0764", border: "#c4b5fd" },
  { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
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
export default function VIUUpperIntermediatePage() {
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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>VIU Upper-intermediate</span>
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
              <span style={{ fontSize: "32px" }}>📓</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#dbeafe", color: "#1e3a8a", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              UPPER-INTERMEDIATE · B2
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
                              path={`/english/vocabulary/viu-upper-intermediate/${unit.id}`}
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
