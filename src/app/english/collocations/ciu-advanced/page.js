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
// BOOK DATA — English Collocations in Use: Advanced (Cambridge)
// ─────────────────────────────────────────────────────────────────────────────
const bookData = {
  id:      "ciu-advanced",
  title:   "English Collocations in Use",
  level:   "Advanced",
  authors: "Cambridge University Press",
  cover:   "/books/ciu-advanced.jpg",
  sections: [
    {
      title: "🧠 Learning About Collocations",
      subsections: [
        { label: "Introduction", unitIds: ["ciu-adv-u01","ciu-adv-u02","ciu-adv-u03","ciu-adv-u04","ciu-adv-u05","ciu-adv-u06"] },
      ],
      units: [
        { id: "ciu-adv-u01", num: "01", title: "Introducing collocations",                    subtitle: "word partner, natural English, collocate" },
        { id: "ciu-adv-u02", num: "02", title: "Strong, fixed and weak collocations",         subtitle: "fixed phrase, open collocation, restricted" },
        { id: "ciu-adv-u03", num: "03", title: "Grammatical categories of collocation",       subtitle: "verb+noun, adj+noun, adv+verb" },
        { id: "ciu-adv-u04", num: "04", title: "Using your dictionary and other resources",   subtitle: "corpus, concordance, collocation dictionary" },
        { id: "ciu-adv-u05", num: "05", title: "Finding and working on collocations in texts",subtitle: "highlight, notice, record collocations" },
        { id: "ciu-adv-u06", num: "06", title: "Register",                                    subtitle: "formal, informal, academic, spoken" },
      ],
    },
    {
      title: "🔤 Varieties of Collocations",
      subsections: [
        { label: "Core Varieties", unitIds: ["ciu-adv-u07","ciu-adv-u08","ciu-adv-u09","ciu-adv-u10","ciu-adv-u11"] },
      ],
      units: [
        { id: "ciu-adv-u07", num: "07", title: "Metaphor",                              subtitle: "foot the bill, heavy burden, run into trouble" },
        { id: "ciu-adv-u08", num: "08", title: "Intensifying and softening adverbs",    subtitle: "deeply offensive, spotlessly clean, wildly inaccurate" },
        { id: "ciu-adv-u09", num: "09", title: "Make and verbs that mean make",         subtitle: "make a contribution, make a habit of, turn in a profit" },
        { id: "ciu-adv-u10", num: "10", title: "Communicating",                         subtitle: "generally speaking, talk business, get a message across" },
        { id: "ciu-adv-u11", num: "11", title: "Collocations with phrasal verbs",       subtitle: "take up office, work up an appetite, see off an intruder" },
      ],
    },
    {
      title: "💼 Work and Study",
      subsections: [
        { label: "Professional & Academic", unitIds: ["ciu-adv-u12","ciu-adv-u13","ciu-adv-u14","ciu-adv-u15","ciu-adv-u16","ciu-adv-u17","ciu-adv-u18"] },
      ],
      units: [
        { id: "ciu-adv-u12", num: "12", title: "Working life",                           subtitle: "make a living, take up a post, move up the ladder" },
        { id: "ciu-adv-u13", num: "13", title: "New employment",                         subtitle: "fit the job description, land a new job, menial tasks" },
        { id: "ciu-adv-u14", num: "14", title: "Thoughts and ideas",                     subtitle: "bear in mind, widespread belief, jump to conclusions" },
        { id: "ciu-adv-u15", num: "15", title: "Business reports",                       subtitle: "fierce competition, stimulate growth, hike in prices" },
        { id: "ciu-adv-u16", num: "16", title: "Customer services",                      subtitle: "fit for purpose, kick up a fuss, grounds for complaint" },
        { id: "ciu-adv-u17", num: "17", title: "Student life",                           subtitle: "gifted child, mature student, thirst for knowledge" },
        { id: "ciu-adv-u18", num: "18", title: "Writing essays, assignments and reports",subtitle: "working hypothesis, confront issues, critical analysis" },
      ],
    },
    {
      title: "🎭 Leisure and Lifestyle",
      subsections: [
        { label: "Leisure", unitIds: ["ciu-adv-u19","ciu-adv-u20","ciu-adv-u21","ciu-adv-u22","ciu-adv-u23","ciu-adv-u24","ciu-adv-u25","ciu-adv-u26","ciu-adv-u27","ciu-adv-u28","ciu-adv-u29"] },
      ],
      units: [
        { id: "ciu-adv-u19", num: "19", title: "Social life",              subtitle: "call for a celebration, social whirl, play host to" },
        { id: "ciu-adv-u20", num: "20", title: "Talking",                  subtitle: "juicy gossip, broach the subject, opening gambit" },
        { id: "ciu-adv-u21", num: "21", title: "News",                     subtitle: "declare independence, reach agreement, bow to pressure" },
        { id: "ciu-adv-u22", num: "22", title: "Current affairs",          subtitle: "refuse point-blank, decline to comment, gauge reaction" },
        { id: "ciu-adv-u23", num: "23", title: "Festivals and celebrations",subtitle: "date back to, movable feast, propose a toast" },
        { id: "ciu-adv-u24", num: "24", title: "Advertisements and fashion",subtitle: "set the trend, fashion victim, flawless complexion" },
        { id: "ciu-adv-u25", num: "25", title: "Traffic and driving",       subtitle: "lengthy delays, grind the gears, bear left" },
        { id: "ciu-adv-u26", num: "26", title: "Travel and adventure",      subtitle: "get itchy feet, off the beaten track, leg of the journey" },
        { id: "ciu-adv-u27", num: "27", title: "Sport",                     subtitle: "keep in shape, reach fever pitch, score an own goal" },
        { id: "ciu-adv-u28", num: "28", title: "Plans and decisions",       subtitle: "toy with an idea, tentative suggestion, deciding factor" },
        { id: "ciu-adv-u29", num: "29", title: "Film and book reviews",     subtitle: "star-studded cast, glowing reviews, hold one's attention" },
      ],
    },
    {
      title: "🌍 The Modern World",
      subsections: [
        { label: "Society & World", unitIds: ["ciu-adv-u30","ciu-adv-u31","ciu-adv-u32","ciu-adv-u33","ciu-adv-u34","ciu-adv-u35","ciu-adv-u36","ciu-adv-u37","ciu-adv-u38","ciu-adv-u39"] },
      ],
      units: [
        { id: "ciu-adv-u30", num: "30", title: "Regulations and authority", subtitle: "minimise danger, grant permission, faceless bureaucrats" },
        { id: "ciu-adv-u31", num: "31", title: "The environment",           subtitle: "dump waste, searing heat, offset carbon emissions" },
        { id: "ciu-adv-u32", num: "32", title: "Town and country life",     subtitle: "back of beyond, rural idyll, urban regeneration" },
        { id: "ciu-adv-u33", num: "33", title: "Personal finance",          subtitle: "clear one's debts, agreed credit limit, identity theft" },
        { id: "ciu-adv-u34", num: "34", title: "The economy",               subtitle: "curb inflation, safeguard one's interests, plummeting profits" },
        { id: "ciu-adv-u35", num: "35", title: "Social issues",             subtitle: "antisocial behaviour, dysfunctional family, unfit for human habitation" },
        { id: "ciu-adv-u36", num: "36", title: "Science and technology",    subtitle: "harness technology, cutting edge design, wireless hotspots" },
        { id: "ciu-adv-u37", num: "37", title: "Health and medicine",       subtitle: "build up resistance, adverse reaction, shake off a cold" },
        { id: "ciu-adv-u38", num: "38", title: "Criminal justice",          subtitle: "custodial sentences, beyond reasonable doubt, trumped-up charges" },
        { id: "ciu-adv-u39", num: "39", title: "War and peace",             subtitle: "deploy troops, pre-emptive strike, collateral damage" },
      ],
    },
    {
      title: "👥 People",
      subsections: [
        { label: "People & Character", unitIds: ["ciu-adv-u40","ciu-adv-u41","ciu-adv-u42","ciu-adv-u43","ciu-adv-u44","ciu-adv-u45"] },
      ],
      units: [
        { id: "ciu-adv-u40", num: "40", title: "Friendship",                  subtitle: "lifelong friends, platonic relationship, heal the rift" },
        { id: "ciu-adv-u41", num: "41", title: "Youth and age",               subtitle: "child prodigy, go through a midlife crisis, senior moment" },
        { id: "ciu-adv-u42", num: "42", title: "Celebrities and heroes",      subtitle: "go into rehab, kiss and tell, heap praise on" },
        { id: "ciu-adv-u43", num: "43", title: "Criticising people",          subtitle: "bone idle, poison the atmosphere, nasty piece of work" },
        { id: "ciu-adv-u44", num: "44", title: "References",                  subtitle: "act as a referee, accumulate experience, financial acumen" },
        { id: "ciu-adv-u45", num: "45", title: "Appearance and personality",  subtitle: "boundless energy, stubborn streak, act one's age" },
      ],
    },
    {
      title: "🔷 Basic Concepts",
      subsections: [
        { label: "Concepts", unitIds: ["ciu-adv-u46","ciu-adv-u47","ciu-adv-u48","ciu-adv-u49","ciu-adv-u50","ciu-adv-u51"] },
      ],
      units: [
        { id: "ciu-adv-u46", num: "46", title: "Time and space",        subtitle: "cramped conditions, waste of space, go down in history" },
        { id: "ciu-adv-u47", num: "47", title: "Sound",                 subtitle: "husky voice, incessant noise, let out a cry" },
        { id: "ciu-adv-u48", num: "48", title: "Making things easier",  subtitle: "viable options, simplicity itself, take the easy way out" },
        { id: "ciu-adv-u49", num: "49", title: "Difficulty",            subtitle: "severe blow, hinder progress, encounter difficulties" },
        { id: "ciu-adv-u50", num: "50", title: "Quantity and size",     subtitle: "finite number, endless supply, unknown quantity" },
        { id: "ciu-adv-u51", num: "51", title: "Change",                subtitle: "sweeping changes, would make a change, sudden shift" },
      ],
    },
    {
      title: "⚙️ Functions",
      subsections: [
        { label: "Communicative Functions", unitIds: ["ciu-adv-u52","ciu-adv-u53","ciu-adv-u54","ciu-adv-u55","ciu-adv-u56","ciu-adv-u57","ciu-adv-u58","ciu-adv-u59","ciu-adv-u60"] },
      ],
      units: [
        { id: "ciu-adv-u52", num: "52", title: "Stopping and starting",            subtitle: "bring a halt to, close off a street, dispel rumours" },
        { id: "ciu-adv-u53", num: "53", title: "Cause and effect",                 subtitle: "root cause, provoke an outcry, dire consequences" },
        { id: "ciu-adv-u54", num: "54", title: "Describing groups and amounts",    subtitle: "swarm of bees, flurry of activity, stroke of genius" },
        { id: "ciu-adv-u55", num: "55", title: "Comparing and contrasting",        subtitle: "bear little resemblance to, polar opposites, draw a comparison between" },
        { id: "ciu-adv-u56", num: "56", title: "Making an effort",                 subtitle: "give it one's best shot, abortive attempt, worth a try" },
        { id: "ciu-adv-u57", num: "57", title: "Social English",                   subtitle: "not lose any sleep, to be brutally honest, be on the go" },
        { id: "ciu-adv-u58", num: "58", title: "Discussing issues",                subtitle: "make a commitment, give a straight answer, miss the point" },
        { id: "ciu-adv-u59", num: "59", title: "Negative situations and feelings", subtitle: "nasty shock, take exception to, suffer at the hands of" },
        { id: "ciu-adv-u60", num: "60", title: "Positive situations and feelings", subtitle: "sense of achievement, state of euphoria, derive pleasure from" },
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
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc", icon: "🧠" },
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd", icon: "🔤" },
  { accent: "#065f46", bg: "#f0fdf4", badge: "#d1fae5", text: "#022c22", border: "#6ee7b7", icon: "💼" },
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd", icon: "🎭" },
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d", icon: "🌍" },
  { accent: "#be185d", bg: "#fdf2f8", badge: "#fce7f3", text: "#831843", border: "#f9a8d4", icon: "👥" },
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
export default function CIUAdvancedPage() {
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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>CIU Advanced</span>
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
              <span style={{ fontSize: "32px" }}>📗</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#fecdd3", color: "#9f1239", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              ADVANCED
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
                              path={`/english/collocations/ciu-advanced/${unit.id}`}
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
