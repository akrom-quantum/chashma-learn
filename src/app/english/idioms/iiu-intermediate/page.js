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
// BOOK DATA — English Idioms in Use: Intermediate (Cambridge)
// ─────────────────────────────────────────────────────────────────────────────
const bookData = {
  id:      "iiu-intermediate",
  title:   "English Idioms in Use",
  level:   "Intermediate",
  authors: "Cambridge University Press",
  cover:   "/books/iiu-intermediate.jpg",
  sections: [
    {
      title: "📚 Learning about Idioms",
      subsections: [
        { label: "Foundations", unitIds: ["iiu-int-u01", "iiu-int-u02"] },
      ],
      units: [
        { id: "iiu-int-u01", num: "01", title: "What are idioms?",    subtitle: "definition, types, how idioms work" },
        { id: "iiu-int-u02", num: "02", title: "Using your dictionary", subtitle: "finding idioms, example entries, tips" },
      ],
    },
    {
      title: "💬 Idioms to Talk About …",
      subsections: [
        { label: "Emotions & Mind",   unitIds: ["iiu-int-u03","iiu-int-u04","iiu-int-u05","iiu-int-u06"] },
        { label: "Goals & Problems",  unitIds: ["iiu-int-u07","iiu-int-u08","iiu-int-u09"] },
        { label: "Power & Talk",      unitIds: ["iiu-int-u10","iiu-int-u11","iiu-int-u12"] },
        { label: "People & Opinions", unitIds: ["iiu-int-u13","iiu-int-u14","iiu-int-u15","iiu-int-u16"] },
        { label: "Risk & Effort",     unitIds: ["iiu-int-u17","iiu-int-u18","iiu-int-u19","iiu-int-u20"] },
        { label: "Society & Life",    unitIds: ["iiu-int-u21","iiu-int-u22","iiu-int-u23","iiu-int-u24","iiu-int-u25","iiu-int-u26"] },
        { label: "Communication",     unitIds: ["iiu-int-u27","iiu-int-u28","iiu-int-u29","iiu-int-u30"] },
      ],
      units: [
        { id: "iiu-int-u03", num: "03", title: "Happiness and sadness",                subtitle: "on cloud nine, down in the dumps" },
        { id: "iiu-int-u04", num: "04", title: "Anger",                                subtitle: "lose your temper, hit the roof" },
        { id: "iiu-int-u05", num: "05", title: "Knowing and understanding",            subtitle: "in the dark, get the picture" },
        { id: "iiu-int-u06", num: "06", title: "Experience and perception",            subtitle: "see through, learn the ropes" },
        { id: "iiu-int-u07", num: "07", title: "Success and failure",                  subtitle: "make it, fall flat, hit the jackpot" },
        { id: "iiu-int-u08", num: "08", title: "Having problems",                      subtitle: "in a fix, up against it" },
        { id: "iiu-int-u09", num: "09", title: "Dealing with problems",                subtitle: "face the music, bite the bullet" },
        { id: "iiu-int-u10", num: "10", title: "Power and authority",                  subtitle: "call the shots, upper hand" },
        { id: "iiu-int-u11", num: "11", title: "Structuring and talking about arguments", subtitle: "on the one hand, to sum up" },
        { id: "iiu-int-u12", num: "12", title: "Conversational responses",             subtitle: "fair enough, tell me about it" },
        { id: "iiu-int-u13", num: "13", title: "Praise and criticism",                 subtitle: "head and shoulders above, leave a lot to be desired" },
        { id: "iiu-int-u14", num: "14", title: "Opinions on people and actions",       subtitle: "not my cup of tea, larger than life" },
        { id: "iiu-int-u15", num: "15", title: "Behaviour and attitudes",              subtitle: "toe the line, stick to your guns" },
        { id: "iiu-int-u16", num: "16", title: "Reacting to what others say",          subtitle: "you're telling me, pull the other one" },
        { id: "iiu-int-u17", num: "17", title: "Danger",                               subtitle: "on thin ice, skating on thin ice" },
        { id: "iiu-int-u18", num: "18", title: "Effort",                               subtitle: "go the extra mile, pull your weight" },
        { id: "iiu-int-u19", num: "19", title: "Necessity and desirability",           subtitle: "crying need, leave something to be desired" },
        { id: "iiu-int-u20", num: "20", title: "Probability and luck",                 subtitle: "touch wood, odds are" },
        { id: "iiu-int-u21", num: "21", title: "Social status",                        subtitle: "keep up with the Joneses, born with a silver spoon" },
        { id: "iiu-int-u22", num: "22", title: "Human relationships",                  subtitle: "hit it off, get on like a house on fire" },
        { id: "iiu-int-u23", num: "23", title: "Size and position",                    subtitle: "larger than life, in the middle of nowhere" },
        { id: "iiu-int-u24", num: "24", title: "Money",                                subtitle: "in the red, splash out, tighten your belt" },
        { id: "iiu-int-u25", num: "25", title: "Work",                                 subtitle: "clock in, hard graft, on the job" },
        { id: "iiu-int-u26", num: "26", title: "Speed, distance and intensity",        subtitle: "in a flash, miles apart, full blast" },
        { id: "iiu-int-u27", num: "27", title: "Communication 1: words and language",  subtitle: "put it bluntly, read between the lines" },
        { id: "iiu-int-u28", num: "28", title: "Communication 2: expressing yourself", subtitle: "get your point across, talk at cross-purposes" },
        { id: "iiu-int-u29", num: "29", title: "Life and experience: proverbs",         subtitle: "every cloud has a silver lining, actions speak louder" },
        { id: "iiu-int-u30", num: "30", title: "Memory",                               subtitle: "on the tip of your tongue, ring a bell" },
      ],
    },
    {
      title: "🌐 Idioms from the Topic Area of …",
      subsections: [
        { label: "Nature & Elements", unitIds: ["iiu-int-u31","iiu-int-u32","iiu-int-u33","iiu-int-u34","iiu-int-u43","iiu-int-u44"] },
        { label: "Objects & Places",  unitIds: ["iiu-int-u35","iiu-int-u41","iiu-int-u42"] },
        { label: "Games & Animals",   unitIds: ["iiu-int-u36","iiu-int-u37","iiu-int-u38"] },
        { label: "Conflict & Food",   unitIds: ["iiu-int-u39","iiu-int-u40"] },
        { label: "Arts & Science",    unitIds: ["iiu-int-u45","iiu-int-u46"] },
      ],
      units: [
        { id: "iiu-int-u31", num: "31", title: "Time 1: the past and the future",      subtitle: "in the old days, down the line" },
        { id: "iiu-int-u32", num: "32", title: "Time 2: clocks and frequency",         subtitle: "around the clock, once in a blue moon" },
        { id: "iiu-int-u33", num: "33", title: "The elements",                         subtitle: "under the weather, weather the storm" },
        { id: "iiu-int-u34", num: "34", title: "Colour",                               subtitle: "out of the blue, green with envy, grey area" },
        { id: "iiu-int-u35", num: "35", title: "Clothes",                              subtitle: "wear the trousers, hot under the collar" },
        { id: "iiu-int-u36", num: "36", title: "Games and sport",                      subtitle: "level playing field, move the goalposts" },
        { id: "iiu-int-u37", num: "37", title: "Animals 1: describing people",         subtitle: "eager beaver, dark horse, old fox" },
        { id: "iiu-int-u38", num: "38", title: "Animals 2: describing situations",     subtitle: "a can of worms, a red herring, the last straw" },
        { id: "iiu-int-u39", num: "39", title: "Weapons and war",                      subtitle: "up in arms, under fire, call a truce" },
        { id: "iiu-int-u40", num: "40", title: "Food",                                 subtitle: "a piece of cake, in a pickle, food for thought" },
        { id: "iiu-int-u41", num: "41", title: "Roads",                                subtitle: "hit the road, at a crossroads, end of the road" },
        { id: "iiu-int-u42", num: "42", title: "Houses and household objects",         subtitle: "on the shelf, off the wall, hit the ceiling" },
        { id: "iiu-int-u43", num: "43", title: "Nature",                               subtitle: "root and branch, blossoming friendship, uphill battle" },
        { id: "iiu-int-u44", num: "44", title: "Boats and sailing",                    subtitle: "plain sailing, rock the boat, miss the boat" },
        { id: "iiu-int-u45", num: "45", title: "Science, technology and machines",     subtitle: "run like clockwork, on autopilot, fuel the debate" },
        { id: "iiu-int-u46", num: "46", title: "Music and theatre",                    subtitle: "steal the show, play it by ear, face the music" },
      ],
    },
    {
      title: "🔑 Idioms Using These Keywords",
      subsections: [
        { label: "Body: Hands & Feet", unitIds: ["iiu-int-u47","iiu-int-u48","iiu-int-u49"] },
        { label: "Body: Head & Face",  unitIds: ["iiu-int-u50","iiu-int-u51","iiu-int-u52","iiu-int-u53"] },
        { label: "Body: Inner",        unitIds: ["iiu-int-u54","iiu-int-u55","iiu-int-u56"] },
        { label: "Key Adjectives",     unitIds: ["iiu-int-u57","iiu-int-u58","iiu-int-u60"] },
        { label: "Key Nouns & Verbs",  unitIds: ["iiu-int-u59","iiu-int-u61","iiu-int-u62"] },
      ],
      units: [
        { id: "iiu-int-u47", num: "47", title: "Finger, thumb, hand",                  subtitle: "at your fingertips, rule of thumb, old hand" },
        { id: "iiu-int-u48", num: "48", title: "Foot, heel, toe",                      subtitle: "get cold feet, on your heels, toe the line" },
        { id: "iiu-int-u49", num: "49", title: "Bones, shoulder, arm, leg",            subtitle: "bone of contention, shoulder the burden, cost an arm" },
        { id: "iiu-int-u50", num: "50", title: "Head",                                 subtitle: "off the top of your head, lose your head, head start" },
        { id: "iiu-int-u51", num: "51", title: "Face, hair, neck, chest",              subtitle: "face the facts, get it off your chest, save face" },
        { id: "iiu-int-u52", num: "52", title: "Eyes",                                 subtitle: "turn a blind eye, see eye to eye, eagle-eyed" },
        { id: "iiu-int-u53", num: "53", title: "Ear, lips, mouth, nose, teeth, tongue", subtitle: "keep your lips sealed, bite your tongue, hard to swallow" },
        { id: "iiu-int-u54", num: "54", title: "Heart",                                subtitle: "take heart, heart of gold, wear your heart on your sleeve" },
        { id: "iiu-int-u55", num: "55", title: "Brain, mind, blood and guts",          subtitle: "rack your brain, make up your mind, blood is thicker" },
        { id: "iiu-int-u56", num: "56", title: "Back",                                 subtitle: "behind your back, have your back, back to square one" },
        { id: "iiu-int-u57", num: "57", title: "Long",                                 subtitle: "in the long run, long shot, before long" },
        { id: "iiu-int-u58", num: "58", title: "Line",                                 subtitle: "draw the line, along the lines of, out of line" },
        { id: "iiu-int-u59", num: "59", title: "Act, action, activity",                subtitle: "catch in the act, a tough act to follow, into action" },
        { id: "iiu-int-u60", num: "60", title: "Good and bad",                         subtitle: "in good faith, for good, a bad egg" },
        { id: "iiu-int-u61", num: "61", title: "Ground",                               subtitle: "break new ground, stand your ground, get off the ground" },
        { id: "iiu-int-u62", num: "62", title: "Similes and idioms with like and as",  subtitle: "like a fish out of water, as cool as a cucumber" },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Derived indices
// ─────────────────────────────────────────────────────────────────────────────
const allUnits   = bookData.sections.flatMap((s) => s.units);
const totalUnits = allUnits.length; // 62

let _idx = 0;
const unitIndexMap: Record<string, number> = {};
bookData.sections.forEach((sec) =>
  sec.units.forEach((u) => { unitIndexMap[u.id] = ++_idx; })
);

// ─────────────────────────────────────────────────────────────────────────────
// Colour palette — one slot per section (4 sections)
// Warm amber → teal → indigo → rose (idioms = vivid language → vivid colours)
// ─────────────────────────────────────────────────────────────────────────────
const sectionColors = [
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f", border: "#fcd34d", icon: "📚" },
  { accent: "#0e7490", bg: "#ecfeff", badge: "#cffafe", text: "#164e63", border: "#67e8f9", icon: "💬" },
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#dbeafe", text: "#1e3a8a", border: "#93c5fd", icon: "🌐" },
  { accent: "#9333ea", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd", icon: "🔑" },
];

const subsectionColors = [
  { bg: "#fef9c3", text: "#854d0e",  border: "#fde68a" },
  { bg: "#cffafe", text: "#155e75",  border: "#67e8f9" },
  { bg: "#fce7f3", text: "#831843",  border: "#f9a8d4" },
  { bg: "#dcfce7", text: "#14532d",  border: "#86efac" },
  { bg: "#ede9fe", text: "#4c1d95",  border: "#c4b5fd" },
  { bg: "#fef3c7", text: "#92400e",  border: "#fcd34d" },
  { bg: "#dbeafe", text: "#1e3a8a",  border: "#93c5fd" },
];

// ─────────────────────────────────────────────────────────────────────────────
// UnitRow
// ─────────────────────────────────────────────────────────────────────────────
function UnitRow({ unit, isFree, locked, sc, isLast, path }: any) {
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
export default function IIUIntermediatePage() {
  const [user, setUser]         = useState<any>(null);
  const [role, setRole]         = useState<string | null>(null);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState<Record<number, boolean>>(
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
  const toggleSec = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

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
            <Link href="/english/idioms" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Idioms</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#064e3b", fontWeight: 700 }}>IIU Intermediate</span>
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
            <img
              src={bookData.cover}
              alt={bookData.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e: any) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px", backgroundColor: "#f3f4f6" }}>
              <span style={{ fontSize: "32px" }}>📘</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#cffafe", color: "#155e75", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              INTERMEDIATE
            </span>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>{bookData.title}</h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>{bookData.authors}</p>
            <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
              {[
                { val: bookData.sections.length, label: "Sections" },
                { val: totalUnits,               label: "Units" },
                { val: 3,                        label: "Free units", hi: true },
              ].map(({ val, label, hi }: any) => (
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

            const subsecMap: Record<string, { label: string; colorIdx: number }> = {};
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
                      let lastLabel: string | null = null;
                      return section.units.map((unit, ui) => {
                        const gIdx   = unitIndexMap[unit.id];
                        const isFree = gIdx <= 3;
                        const locked = !isLearner && !isFree;
                        const sub    = subsecMap[unit.id];
                        const showSub = sub && sub.label !== lastLabel;
                        if (showSub) lastLabel = sub.label;
                        const subColor = sub ? subsectionColors[sub.colorIdx % subsectionColors.length] : null;

                        return (
                          <div key={unit.id}>
                            {showSub && subColor && (
                              <div style={{ padding: "7px 20px", backgroundColor: subColor.bg, borderTop: ui === 0 ? "none" : `1px solid ${sc.border}`, borderBottom: `1px solid ${subColor.border}` }}>
                                <span style={{ fontSize: "10px", fontWeight: 800, color: subColor.text, textTransform: "uppercase", letterSpacing: "0.6px" }}>{sub!.label}</span>
                              </div>
                            )}
                            <UnitRow
                              unit={unit} isFree={isFree} locked={locked} sc={sc}
                              isLast={ui === section.units.length - 1}
                              path={`/english/idioms/iiu-intermediate/${unit.id}`}
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
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>Full access to every idioms unit with exercises and examples.</p>
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
