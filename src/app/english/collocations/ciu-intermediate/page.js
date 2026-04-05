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
// BOOK DATA — English Collocations in Use: Intermediate (Cambridge)
// ─────────────────────────────────────────────────────────────────────────────
const bookData = {
  id:      "ciu-intermediate",
  title:   "English Collocations in Use",
  level:   "Intermediate",
  authors: "Cambridge University Press",
  cover:   "/books/ciu-intermediate.jpg",
  sections: [
    {
      title: "🧠 Learning About Collocations",
      subsections: [
        { label: "Introduction", unitIds: ["ciu-int-u01","ciu-int-u02","ciu-int-u03","ciu-int-u04","ciu-int-u05"] },
      ],
      units: [
        { id: "ciu-int-u01", num: "01", title: "What is a collocation?",                       subtitle: "word partner, natural English, collocate" },
        { id: "ciu-int-u02", num: "02", title: "Finding, recording and learning collocations",  subtitle: "record, highlight, vocabulary notebook" },
        { id: "ciu-int-u03", num: "03", title: "Using your dictionary",                         subtitle: "dictionary entry, example sentence, headword" },
        { id: "ciu-int-u04", num: "04", title: "Types of collocation",                          subtitle: "verb+noun, adj+noun, adv+adj" },
        { id: "ciu-int-u05", num: "05", title: "Register",                                      subtitle: "formal, informal, academic, spoken" },
      ],
    },
    {
      title: "🔤 Grammatical Aspects of Collocations",
      subsections: [
        { label: "Grammar & Verbs", unitIds: ["ciu-int-u06","ciu-int-u07","ciu-int-u08","ciu-int-u09"] },
      ],
      units: [
        { id: "ciu-int-u06", num: "06", title: "Intensifying adverbs",  subtitle: "highly unlikely, utterly ridiculous, strongly object" },
        { id: "ciu-int-u07", num: "07", title: "Everyday verbs 1",      subtitle: "make a mistake, do your best, do damage" },
        { id: "ciu-int-u08", num: "08", title: "Everyday verbs 2",      subtitle: "go bald, become extinct, fall ill" },
        { id: "ciu-int-u09", num: "09", title: "Everyday verbs 3",      subtitle: "have fun, take action, pay a compliment" },
      ],
    },
    {
      title: "🔍 Special Aspects of Collocation",
      subsections: [
        { label: "Synonyms & Metaphor", unitIds: ["ciu-int-u10","ciu-int-u11","ciu-int-u12"] },
      ],
      units: [
        { id: "ciu-int-u10", num: "10", title: "Synonyms and confusable words 1", subtitle: "close a meeting, antique furniture, only child" },
        { id: "ciu-int-u11", num: "11", title: "Synonyms and confusable words 2", subtitle: "gain power, achieve your goals, defeat an opponent" },
        { id: "ciu-int-u12", num: "12", title: "Metaphor",                        subtitle: "sunny smile, ideas flow, heated discussion" },
      ],
    },
    {
      title: "✈️ Travel and the Environment",
      subsections: [
        { label: "Travel & Places", unitIds: ["ciu-int-u13","ciu-int-u14","ciu-int-u15","ciu-int-u16"] },
      ],
      units: [
        { id: "ciu-int-u13", num: "13", title: "Weather",         subtitle: "strong wind, blanket of fog, river bursts its banks" },
        { id: "ciu-int-u14", num: "14", title: "Travel",          subtitle: "tiring journey, aisle seat, family-run hotel" },
        { id: "ciu-int-u15", num: "15", title: "Countryside",     subtitle: "surrounding countryside, well worth seeing" },
        { id: "ciu-int-u16", num: "16", title: "Towns and cities", subtitle: "lined with shops, sprawling city, volume of traffic" },
      ],
    },
    {
      title: "👥 People and Relationships",
      subsections: [
        { label: "People & Feelings", unitIds: ["ciu-int-u17","ciu-int-u18","ciu-int-u19","ciu-int-u20","ciu-int-u21"] },
      ],
      units: [
        { id: "ciu-int-u17", num: "17", title: "People: character and behaviour", subtitle: "have a vivid imagination, lose your patience" },
        { id: "ciu-int-u18", num: "18", title: "People: physical appearance",     subtitle: "slender waist, immaculately groomed" },
        { id: "ciu-int-u19", num: "19", title: "Families",                        subtitle: "distant cousin, expecting a baby, stable home" },
        { id: "ciu-int-u20", num: "20", title: "Relationships",                   subtitle: "casual acquaintance, love at first sight" },
        { id: "ciu-int-u21", num: "21", title: "Feelings and emotions",           subtitle: "lasting happiness, worried sick, emotional wreck" },
      ],
    },
    {
      title: "🎭 Leisure and Lifestyle",
      subsections: [
        { label: "Leisure", unitIds: ["ciu-int-u22","ciu-int-u23","ciu-int-u24","ciu-int-u25","ciu-int-u26","ciu-int-u27"] },
      ],
      units: [
        { id: "ciu-int-u22", num: "22", title: "Houses, flats and rooms", subtitle: "move into a flat, spacious living room" },
        { id: "ciu-int-u23", num: "23", title: "Eating and drinking",     subtitle: "nourishing meal, spoil your appetite, dying of hunger" },
        { id: "ciu-int-u24", num: "24", title: "Films and books",         subtitle: "film critic, go on the stage, renew a library book" },
        { id: "ciu-int-u25", num: "25", title: "Music",                   subtitle: "give a performance, go on tour, strum a guitar" },
        { id: "ciu-int-u26", num: "26", title: "Sport",                   subtitle: "go snowboarding, take a penalty" },
        { id: "ciu-int-u27", num: "27", title: "Health and illness",      subtitle: "catch a cold, vigorous exercise, be taken ill" },
      ],
    },
    {
      title: "💼 Work and Study",
      subsections: [
        { label: "Professional & Academic", unitIds: ["ciu-int-u28","ciu-int-u29","ciu-int-u30","ciu-int-u31","ciu-int-u32","ciu-int-u33"] },
      ],
      units: [
        { id: "ciu-int-u28", num: "28", title: "Computers",                              subtitle: "forward a message, e-mail bounces" },
        { id: "ciu-int-u29", num: "29", title: "Study and learning",                     subtitle: "do research, attend a lecture, first draft" },
        { id: "ciu-int-u30", num: "30", title: "Work",                                   subtitle: "high-powered job, hand in your notice" },
        { id: "ciu-int-u31", num: "31", title: "Business",                               subtitle: "set up a business, launch a product, rival company" },
        { id: "ciu-int-u32", num: "32", title: "Academic writing 1: giving opinions",    subtitle: "key factor, challenge a theory, carry out research" },
        { id: "ciu-int-u33", num: "33", title: "Academic writing 2: structuring an argument", subtitle: "make reference to, argue convincingly, research suggests" },
      ],
    },
    {
      title: "🏛️ Society and Institutions",
      subsections: [
        { label: "Society & World", unitIds: ["ciu-int-u34","ciu-int-u35","ciu-int-u36","ciu-int-u37","ciu-int-u38","ciu-int-u39"] },
      ],
      units: [
        { id: "ciu-int-u34", num: "34", title: "Laws and punishments", subtitle: "break the law, bend the rules, fair trial" },
        { id: "ciu-int-u35", num: "35", title: "Crime",                subtitle: "hardened criminal, juvenile crime, tackle crime" },
        { id: "ciu-int-u36", num: "36", title: "News",                 subtitle: "hit the headlines, hold talks, take hostage" },
        { id: "ciu-int-u37", num: "37", title: "Money",                subtitle: "squander money, price soars, go cheap" },
        { id: "ciu-int-u38", num: "38", title: "War and peace",        subtitle: "war breaks out, restore order, call a truce" },
        { id: "ciu-int-u39", num: "39", title: "Global problems",      subtitle: "irreparable damage, eradicate poverty, earthquake hits" },
      ],
    },
    {
      title: "🔷 Basic Concepts",
      subsections: [
        { label: "Concepts", unitIds: ["ciu-int-u40","ciu-int-u41","ciu-int-u42","ciu-int-u43","ciu-int-u44","ciu-int-u45","ciu-int-u46","ciu-int-u47","ciu-int-u48","ciu-int-u49","ciu-int-u50"] },
      ],
      units: [
        { id: "ciu-int-u40", num: "40", title: "Time",               subtitle: "save time, ungodly hours, from dawn till dusk" },
        { id: "ciu-int-u41", num: "41", title: "Sound",              subtitle: "break the silence, excessive noise, almighty bang" },
        { id: "ciu-int-u42", num: "42", title: "Distance and size",  subtitle: "within commuting distance, painfully thin" },
        { id: "ciu-int-u43", num: "43", title: "Colour and light",   subtitle: "bright colour, beam of light, shed some light on" },
        { id: "ciu-int-u44", num: "44", title: "Texture",            subtitle: "choppy sea, soft pillow, ice melts" },
        { id: "ciu-int-u45", num: "45", title: "Taste and smell",    subtitle: "fragrant perfume, have a taste, smell danger" },
        { id: "ciu-int-u46", num: "46", title: "Number and frequency", subtitle: "significant number, come to a total of, rare species" },
        { id: "ciu-int-u47", num: "47", title: "Movement and speed", subtitle: "prompt payment, painfully slow, lose your balance" },
        { id: "ciu-int-u48", num: "48", title: "Change",             subtitle: "make an adjustment, break a habit, change the subject" },
        { id: "ciu-int-u49", num: "49", title: "Ways of speaking",   subtitle: "brief chat, raise a subject, drop a hint" },
        { id: "ciu-int-u50", num: "50", title: "Ways of walking",    subtitle: "pace up and down, wander aimlessly, faltering steps" },
      ],
    },
    {
      title: "⚙️ Functions",
      subsections: [
        { label: "Communicative Functions", unitIds: ["ciu-int-u51","ciu-int-u52","ciu-int-u53","ciu-int-u54","ciu-int-u55","ciu-int-u56","ciu-int-u57","ciu-int-u58","ciu-int-u59","ciu-int-u60"] },
      ],
      units: [
        { id: "ciu-int-u51", num: "51", title: "Starting and finishing",             subtitle: "promising start, bring something to an end" },
        { id: "ciu-int-u52", num: "52", title: "Talking about success and failure",  subtitle: "make a breakthrough, fail miserably" },
        { id: "ciu-int-u53", num: "53", title: "Talking about cause and effect",     subtitle: "cause alarm, adverse effects, have a major impact" },
        { id: "ciu-int-u54", num: "54", title: "Remembering and sensing",            subtitle: "vaguely remember, blot out a memory, have a feeling" },
        { id: "ciu-int-u55", num: "55", title: "Agreeing and disagreeing",           subtitle: "settle a dispute, agree to differ, heated argument" },
        { id: "ciu-int-u56", num: "56", title: "Talking about beliefs and opinions", subtitle: "firmly believe, colour someone's judgement" },
        { id: "ciu-int-u57", num: "57", title: "Deciding and choosing",              subtitle: "arrive at a decision, have second thoughts, tough choice" },
        { id: "ciu-int-u58", num: "58", title: "Claiming and denying",               subtitle: "make the point that, contradictory evidence" },
        { id: "ciu-int-u59", num: "59", title: "Liking and disliking",               subtitle: "have a liking, state a preference, take offence" },
        { id: "ciu-int-u60", num: "60", title: "Praising and criticising",           subtitle: "offer your congratulations, speak highly of" },
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
// Colour palette — one slot per section (10 sections)
// ─────────────────────────────────────────────────────────────────────────────
const sectionColors = [
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc", icon: "🧠" },
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd", icon: "🔤" },
  { accent: "#0f766e", bg: "#f0fdfa", badge: "#ccfbf1", text: "#134e4a", border: "#5eead4", icon: "🔍" },
  { accent: "#0284c7", bg: "#f0f9ff", badge: "#e0f2fe", text: "#075985", border: "#7dd3fc", icon: "✈️" },
  { accent: "#be185d", bg: "#fdf2f8", badge: "#fce7f3", text: "#831843", border: "#f9a8d4", icon: "👥" },
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd", icon: "🎭" },
  { accent: "#065f46", bg: "#f0fdf4", badge: "#d1fae5", text: "#022c22", border: "#6ee7b7", icon: "💼" },
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d", icon: "🏛️" },
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd", icon: "🔷" },
  { accent: "#a16207", bg: "#fefce8", badge: "#fef9c3", text: "#713f12", border: "#fde047", icon: "⚙️" },
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
export default function CIUIntermediatePage() {
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
            <Link href="/english/collocations" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Collocations</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#064e3b", fontWeight: 700 }}>CIU Intermediate</span>
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
              <span style={{ fontSize: "32px" }}>📘</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#dbeafe", color: "#1e40af", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              INTERMEDIATE
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
                              path={`/english/collocations/ciu-intermediate/${unit.id}`}
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
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>Full access to every collocation unit with exercises and examples.</p>
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
