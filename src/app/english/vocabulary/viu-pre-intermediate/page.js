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
// BOOK DATA — English Vocabulary in Use: Pre-intermediate & Intermediate
// ─────────────────────────────────────────────────────────────────────────────
const bookData = {
  id:      "viu-pre-intermediate",
  title:   "English Vocabulary in Use",
  level:   "Pre-intermediate & Intermediate",
  authors: "Cambridge University Press",
  cover:   "/books/viu-pre-intermediate.jpg",
  sections: [
    {
      title: "🎓 Learning",
      subsections: [{ label: "Learning", unitIds: ["viu-pi-u01","viu-pi-u02","viu-pi-u03","viu-pi-u04"] }],
      units: [
        { id: "viu-pi-u01", num: "01", title: "Learning vocabulary",                subtitle: null },
        { id: "viu-pi-u02", num: "02", title: "Keeping a vocabulary notebook",       subtitle: null },
        { id: "viu-pi-u03", num: "03", title: "Using a dictionary",                  subtitle: null },
        { id: "viu-pi-u04", num: "04", title: "English language words",              subtitle: null },
      ],
    },
    {
      title: "🌍 The World Around Us",
      subsections: [{ label: "The World", unitIds: ["viu-pi-u05","viu-pi-u06","viu-pi-u07","viu-pi-u08"] }],
      units: [
        { id: "viu-pi-u05", num: "05", title: "Country, nationality and language",   subtitle: null },
        { id: "viu-pi-u06", num: "06", title: "The physical world",                  subtitle: null },
        { id: "viu-pi-u07", num: "07", title: "Weather",                             subtitle: null },
        { id: "viu-pi-u08", num: "08", title: "Animals and insects",                 subtitle: null },
      ],
    },
    {
      title: "🧑 People",
      subsections: [{ label: "People", unitIds: ["viu-pi-u09","viu-pi-u10","viu-pi-u11","viu-pi-u12","viu-pi-u13","viu-pi-u14","viu-pi-u15"] }],
      units: [
        { id: "viu-pi-u09", num: "09", title: "The body and movement",               subtitle: null },
        { id: "viu-pi-u10", num: "10", title: "Describing appearance",               subtitle: null },
        { id: "viu-pi-u11", num: "11", title: "Describing character",                subtitle: null },
        { id: "viu-pi-u12", num: "12", title: "Feelings",                            subtitle: null },
        { id: "viu-pi-u13", num: "13", title: "Family and friends",                  subtitle: null },
        { id: "viu-pi-u14", num: "14", title: "Growing up",                          subtitle: null },
        { id: "viu-pi-u15", num: "15", title: "Romance, marriage and divorce",       subtitle: null },
      ],
    },
    {
      title: "🏙️ Daily Life",
      subsections: [
        { label: "Home & Health",    unitIds: ["viu-pi-u16","viu-pi-u17","viu-pi-u18","viu-pi-u19","viu-pi-u20","viu-pi-u21","viu-pi-u22","viu-pi-u23","viu-pi-u24","viu-pi-u25"] },
        { label: "City & Travel",    unitIds: ["viu-pi-u26","viu-pi-u27","viu-pi-u28","viu-pi-u29","viu-pi-u30"] },
      ],
      units: [
        { id: "viu-pi-u16", num: "16", title: "Daily routines",                      subtitle: null },
        { id: "viu-pi-u17", num: "17", title: "The place where you live",            subtitle: null },
        { id: "viu-pi-u18", num: "18", title: "Around the home",                     subtitle: null },
        { id: "viu-pi-u19", num: "19", title: "Money",                               subtitle: null },
        { id: "viu-pi-u20", num: "20", title: "Health",                              subtitle: null },
        { id: "viu-pi-u21", num: "21", title: "Clothes",                             subtitle: null },
        { id: "viu-pi-u22", num: "22", title: "Fashion and buying clothes",          subtitle: null },
        { id: "viu-pi-u23", num: "23", title: "Shopping",                            subtitle: null },
        { id: "viu-pi-u24", num: "24", title: "Food",                                subtitle: null },
        { id: "viu-pi-u25", num: "25", title: "Cooking",                             subtitle: null },
        { id: "viu-pi-u26", num: "26", title: "City life",                           subtitle: null },
        { id: "viu-pi-u27", num: "27", title: "Life in the country",                 subtitle: null },
        { id: "viu-pi-u28", num: "28", title: "Transport",                           subtitle: null },
        { id: "viu-pi-u29", num: "29", title: "On the road",                         subtitle: null },
        { id: "viu-pi-u30", num: "30", title: "Notices and warnings",                subtitle: null },
      ],
    },
    {
      title: "📖 Education and Study",
      subsections: [{ label: "Education", unitIds: ["viu-pi-u31","viu-pi-u32","viu-pi-u33","viu-pi-u34"] }],
      units: [
        { id: "viu-pi-u31", num: "31", title: "Classroom language",                  subtitle: null },
        { id: "viu-pi-u32", num: "32", title: "School education",                    subtitle: null },
        { id: "viu-pi-u33", num: "33", title: "Studying English and taking exams",   subtitle: null },
        { id: "viu-pi-u34", num: "34", title: "University education",                subtitle: null },
      ],
    },
    {
      title: "💼 Work and Business",
      subsections: [{ label: "Work & Business", unitIds: ["viu-pi-u35","viu-pi-u36","viu-pi-u37","viu-pi-u38","viu-pi-u39","viu-pi-u40"] }],
      units: [
        { id: "viu-pi-u35", num: "35", title: "Jobs",                                subtitle: null },
        { id: "viu-pi-u36", num: "36", title: "Talking about your work",             subtitle: null },
        { id: "viu-pi-u37", num: "37", title: "Making a career",                     subtitle: null },
        { id: "viu-pi-u38", num: "38", title: "Working in an office",                subtitle: null },
        { id: "viu-pi-u39", num: "39", title: "Running a company",                   subtitle: null },
        { id: "viu-pi-u40", num: "40", title: "Business and finance",                subtitle: null },
      ],
    },
    {
      title: "🎭 Leisure and Entertainment",
      subsections: [{ label: "Leisure", unitIds: ["viu-pi-u41","viu-pi-u42","viu-pi-u43","viu-pi-u44","viu-pi-u45"] }],
      units: [
        { id: "viu-pi-u41", num: "41", title: "Sport and leisure",                   subtitle: null },
        { id: "viu-pi-u42", num: "42", title: "Competitive sport",                   subtitle: null },
        { id: "viu-pi-u43", num: "43", title: "Books and films",                     subtitle: null },
        { id: "viu-pi-u44", num: "44", title: "Music",                               subtitle: null },
        { id: "viu-pi-u45", num: "45", title: "Special events",                      subtitle: null },
      ],
    },
    {
      title: "✈️ Tourism",
      subsections: [{ label: "Tourism", unitIds: ["viu-pi-u46","viu-pi-u47","viu-pi-u48","viu-pi-u49","viu-pi-u50","viu-pi-u51"] }],
      units: [
        { id: "viu-pi-u46", num: "46", title: "Travel bookings",                     subtitle: null },
        { id: "viu-pi-u47", num: "47", title: "Air travel",                          subtitle: null },
        { id: "viu-pi-u48", num: "48", title: "Hotels and restaurants",              subtitle: null },
        { id: "viu-pi-u49", num: "49", title: "Cafés",                               subtitle: null },
        { id: "viu-pi-u50", num: "50", title: "Sightseeing holidays",                subtitle: null },
        { id: "viu-pi-u51", num: "51", title: "Holidays by the sea",                 subtitle: null },
      ],
    },
    {
      title: "💻 Communication and Technology",
      subsections: [{ label: "Tech & Media", unitIds: ["viu-pi-u52","viu-pi-u53","viu-pi-u54","viu-pi-u55"] }],
      units: [
        { id: "viu-pi-u52", num: "52", title: "Newspapers and television",           subtitle: null },
        { id: "viu-pi-u53", num: "53", title: "Phoning and texting",                 subtitle: null },
        { id: "viu-pi-u54", num: "54", title: "Computers",                           subtitle: null },
        { id: "viu-pi-u55", num: "55", title: "Email and the Internet",              subtitle: null },
      ],
    },
    {
      title: "⚖️ Social Issues",
      subsections: [{ label: "Social Issues", unitIds: ["viu-pi-u56","viu-pi-u57","viu-pi-u58","viu-pi-u59"] }],
      units: [
        { id: "viu-pi-u56", num: "56", title: "Crime",                               subtitle: null },
        { id: "viu-pi-u57", num: "57", title: "Politics",                            subtitle: null },
        { id: "viu-pi-u58", num: "58", title: "Climate change",                      subtitle: null },
        { id: "viu-pi-u59", num: "59", title: "War and violence",                    subtitle: null },
      ],
    },
    {
      title: "💡 Concepts",
      subsections: [{ label: "Concepts", unitIds: ["viu-pi-u60","viu-pi-u61","viu-pi-u62","viu-pi-u63","viu-pi-u64"] }],
      units: [
        { id: "viu-pi-u60", num: "60", title: "Time",                                subtitle: null },
        { id: "viu-pi-u61", num: "61", title: "Numbers",                             subtitle: null },
        { id: "viu-pi-u62", num: "62", title: "Distance, dimensions and size",       subtitle: null },
        { id: "viu-pi-u63", num: "63", title: "Objects, materials, shapes and colour", subtitle: null },
        { id: "viu-pi-u64", num: "64", title: "Containers and quantities",           subtitle: null },
      ],
    },
    {
      title: "🗣️ Functional Language",
      subsections: [{ label: "Functional Language", unitIds: ["viu-pi-u65","viu-pi-u66","viu-pi-u67","viu-pi-u68","viu-pi-u69"] }],
      units: [
        { id: "viu-pi-u65", num: "65", title: "Apologies, excuses and thanks",       subtitle: null },
        { id: "viu-pi-u66", num: "66", title: "Requests, permission and suggestions", subtitle: null },
        { id: "viu-pi-u67", num: "67", title: "Opinions, agreeing and disagreeing",  subtitle: null },
        { id: "viu-pi-u68", num: "68", title: "Likes, dislikes, attitudes and preferences", subtitle: null },
        { id: "viu-pi-u69", num: "69", title: "Greetings, farewells and special expressions", subtitle: null },
      ],
    },
    {
      title: "🔤 Word Formation",
      subsections: [{ label: "Word Formation", unitIds: ["viu-pi-u70","viu-pi-u71","viu-pi-u72","viu-pi-u73"] }],
      units: [
        { id: "viu-pi-u70", num: "70", title: "Prefixes: changing meaning",          subtitle: null },
        { id: "viu-pi-u71", num: "71", title: "Suffixes: forming nouns",             subtitle: null },
        { id: "viu-pi-u72", num: "72", title: "Suffixes: forming adjectives",        subtitle: null },
        { id: "viu-pi-u73", num: "73", title: "Compound nouns",                      subtitle: null },
      ],
    },
    {
      title: "🧩 Phrase Building",
      subsections: [
        { label: "Phrases",         unitIds: ["viu-pi-u74","viu-pi-u75","viu-pi-u76"] },
        { label: "Prepositions & Phrasal Verbs", unitIds: ["viu-pi-u77","viu-pi-u78","viu-pi-u79","viu-pi-u80"] },
      ],
      units: [
        { id: "viu-pi-u74", num: "74", title: "Word partners",                       subtitle: null },
        { id: "viu-pi-u75", num: "75", title: "Fixed phrases",                       subtitle: null },
        { id: "viu-pi-u76", num: "76", title: "Fixed phrases in conversation",       subtitle: null },
        { id: "viu-pi-u77", num: "77", title: "Verb or adjective + preposition",     subtitle: null },
        { id: "viu-pi-u78", num: "78", title: "Prepositional phrases",               subtitle: null },
        { id: "viu-pi-u79", num: "79", title: "Phrasal verbs 1: form and meaning",   subtitle: null },
        { id: "viu-pi-u80", num: "80", title: "Phrasal verbs 2: grammar and style",  subtitle: null },
      ],
    },
    {
      title: "🔑 Key Verbs",
      subsections: [{ label: "Key Verbs", unitIds: ["viu-pi-u81","viu-pi-u82","viu-pi-u83","viu-pi-u84","viu-pi-u85"] }],
      units: [
        { id: "viu-pi-u81", num: "81", title: "Make, do and take: uses and phrases", subtitle: null },
        { id: "viu-pi-u82", num: "82", title: "Key verbs: give, keep and miss",      subtitle: null },
        { id: "viu-pi-u83", num: "83", title: "Get: uses, phrases and phrasal verbs", subtitle: null },
        { id: "viu-pi-u84", num: "84", title: "Go: meanings and expressions",        subtitle: null },
        { id: "viu-pi-u85", num: "85", title: "The senses",                          subtitle: null },
      ],
    },
    {
      title: "📝 Words and Grammar",
      subsections: [{ label: "Words & Grammar", unitIds: ["viu-pi-u86","viu-pi-u87","viu-pi-u88","viu-pi-u89","viu-pi-u90","viu-pi-u91"] }],
      units: [
        { id: "viu-pi-u86", num: "86", title: "Uncountable nouns",                   subtitle: null },
        { id: "viu-pi-u87", num: "87", title: "Verb constructions 1",                subtitle: null },
        { id: "viu-pi-u88", num: "88", title: "Verb constructions 2",                subtitle: null },
        { id: "viu-pi-u89", num: "89", title: "Adjectives",                          subtitle: null },
        { id: "viu-pi-u90", num: "90", title: "Prepositions: place and movement",    subtitle: null },
        { id: "viu-pi-u91", num: "91", title: "Adverbs",                             subtitle: null },
      ],
    },
    {
      title: "🔗 Connecting and Linking",
      subsections: [{ label: "Connecting", unitIds: ["viu-pi-u92","viu-pi-u93","viu-pi-u94"] }],
      units: [
        { id: "viu-pi-u92", num: "92", title: "Time and sequence",                   subtitle: null },
        { id: "viu-pi-u93", num: "93", title: "Addition and contrast",               subtitle: null },
        { id: "viu-pi-u94", num: "94", title: "Reason, purpose, result, condition",  subtitle: null },
      ],
    },
    {
      title: "✍️ Style and Register",
      subsections: [
        { label: "Formal & Informal", unitIds: ["viu-pi-u95","viu-pi-u96"] },
        { label: "Writing Skills",    unitIds: ["viu-pi-u97","viu-pi-u98","viu-pi-u99","viu-pi-u100"] },
      ],
      units: [
        { id: "viu-pi-u95",  num: "95",  title: "Formal and informal English",       subtitle: null },
        { id: "viu-pi-u96",  num: "96",  title: "Completing forms and CVs",          subtitle: null },
        { id: "viu-pi-u97",  num: "97",  title: "Writing an essay",                  subtitle: null },
        { id: "viu-pi-u98",  num: "98",  title: "Formal letters and emails",         subtitle: null },
        { id: "viu-pi-u99",  num: "99",  title: "Informal emails and messages",      subtitle: null },
        { id: "viu-pi-u100", num: "100", title: "Abbreviations",                     subtitle: null },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Derived indices
// ─────────────────────────────────────────────────────────────────────────────
const allUnits   = bookData.sections.flatMap((s) => s.units);
const totalUnits = allUnits.length; // 100

let _idx = 0;
const unitIndexMap = {};
bookData.sections.forEach((sec) =>
  sec.units.forEach((u) => { unitIndexMap[u.id] = ++_idx; })
);

// ─────────────────────────────────────────────────────────────────────────────
// Colour palette — 18 sections
// ─────────────────────────────────────────────────────────────────────────────
const sectionColors = [
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d", icon: "🎓" },
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd", icon: "🌍" },
  { accent: "#0f766e", bg: "#f0fdfa", badge: "#ccfbf1", text: "#042f2e", border: "#5eead4", icon: "🧑" },
  { accent: "#b91c1c", bg: "#fff1f2", badge: "#fecdd3", text: "#7f1d1d", border: "#fda4af", icon: "🏙️" },
  { accent: "#065f46", bg: "#f0fdf4", badge: "#d1fae5", text: "#022c22", border: "#6ee7b7", icon: "📖" },
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd", icon: "💼" },
  { accent: "#9d174d", bg: "#fff1f2", badge: "#fce7f3", text: "#500724", border: "#f9a8d4", icon: "🎭" },
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc", icon: "✈️" },
  { accent: "#6d28d9", bg: "#f5f3ff", badge: "#ede9fe", text: "#3b0764", border: "#c4b5fd", icon: "💻" },
  { accent: "#b91c1c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12", border: "#fb923c", icon: "⚖️" },
  { accent: "#a16207", bg: "#fefce8", badge: "#fef9c3", text: "#713f12", border: "#fde047", icon: "💡" },
  { accent: "#0e7490", bg: "#ecfeff", badge: "#cffafe", text: "#083344", border: "#67e8f9", icon: "🗣️" },
  { accent: "#4338ca", bg: "#eef2ff", badge: "#e0e7ff", text: "#1e1b4b", border: "#a5b4fc", icon: "🔤" },
  { accent: "#15803d", bg: "#f0fdf4", badge: "#dcfce7", text: "#052e16", border: "#86efac", icon: "🧩" },
  { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12", border: "#fb923c", icon: "🔑" },
  { accent: "#1e40af", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a", border: "#60a5fa", icon: "📝" },
  { accent: "#065f46", bg: "#ecfdf5", badge: "#d1fae5", text: "#022c22", border: "#34d399", icon: "🔗" },
  { accent: "#5b21b6", bg: "#f5f3ff", badge: "#ddd6fe", text: "#2e1065", border: "#a78bfa", icon: "✍️" },
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
export default function VIUPreIntermediatePage() {
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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>VIU Pre-intermediate</span>
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
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#ccfbf1", color: "#042f2e", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              PRE-INTERMEDIATE & INTERMEDIATE
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
                              path={`/english/vocabulary/viu-pre-intermediate/${unit.id}`}
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
