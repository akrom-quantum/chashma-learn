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
  id:      "piu-intermediate",
  title:   "English Pronunciation in Use",
  level:   "Intermediate",
  authors: "Mark Hancock",
  cover:   "/books/piu-intermediate.jpg",
  sections: [
    {
      title: "Section 1 — Letters and Sounds",
      subsections: null,
      units: [
        { id: "unit-01", num: "01", title: "Bye, buy",               subtitle: "Introducing letters and sounds" },
        { id: "unit-02", num: "02", title: "Plane, plan",             subtitle: "/eɪ/, /æ/" },
        { id: "unit-03", num: "03", title: "Back, pack",              subtitle: "/b/, /p/" },
        { id: "unit-04", num: "04", title: "Rice, rise",              subtitle: "/s/, /z/" },
        { id: "unit-05", num: "05", title: "Down town",               subtitle: "/d/, /t/" },
        { id: "unit-06", num: "06", title: "Meet, met",               subtitle: "/iː/, /e/" },
        { id: "unit-07", num: "07", title: "Carrot, cabbage",         subtitle: "/ə/, /ɪ/" },
        { id: "unit-08", num: "08", title: "Few, view",               subtitle: "/f/, /v/" },
        { id: "unit-09", num: "09", title: "Gate, Kate",              subtitle: "/g/, /k/" },
        { id: "unit-10", num: "10", title: "Hear, we're, year",       subtitle: "/h/, /w/, /j/" },
        { id: "unit-11", num: "11", title: "Wine, win",               subtitle: "/aɪ/, /ɪ/" },
        { id: "unit-12", num: "12", title: "Sheep, jeep, cheap",      subtitle: "/ʃ/, /dʒ/, /tʃ/" },
        { id: "unit-13", num: "13", title: "Flies, fries",            subtitle: "/l/, /r/" },
        { id: "unit-14", num: "14", title: "Car, care",               subtitle: "/ɑː(r)/, /eə(r)/" },
        { id: "unit-15", num: "15", title: "Some, sun, sung",         subtitle: "/m/, /n/, /ŋ/" },
        { id: "unit-16", num: "16", title: "Note, not",               subtitle: "/əʊ/, /ɒ/" },
        { id: "unit-17", num: "17", title: "Arthur's mother",         subtitle: "/θ/, /ð/" },
        { id: "unit-18", num: "18", title: "Sun, full, June",         subtitle: "/ʌ/, /ʊ/, /uː/" },
        { id: "unit-19", num: "19", title: "Shirt, short",            subtitle: "/ɜː(r)/, /ɔː(r)/" },
        { id: "unit-20", num: "20", title: "Toy, town",               subtitle: "/ɔɪ/, /aʊ/" },
      ],
    },
    {
      title: "Section 2 — Syllables, Words and Sentences",
      subsections: [
        { label: "Introducing",     unitIds: ["unit-21", "unit-22", "unit-23"] },
        { label: "Syllables",       unitIds: ["unit-24", "unit-25", "unit-26", "unit-27"] },
        { label: "Word Stress",     unitIds: ["unit-28", "unit-29", "unit-30", "unit-31"] },
        { label: "Sentence Stress", unitIds: ["unit-32", "unit-33", "unit-34", "unit-35", "unit-36", "unit-37", "unit-38", "unit-39", "unit-40"] },
      ],
      units: [
        { id: "unit-21", num: "21", title: "Eye, my, mine",                  subtitle: "Introducing syllables" },
        { id: "unit-22", num: "22", title: "Saturday September 13th",         subtitle: "Introducing word stress" },
        { id: "unit-23", num: "23", title: "Remember, he told her",           subtitle: "Introducing sentence stress" },
        { id: "unit-24", num: "24", title: "Oh, no snow!",                    subtitle: "Consonants at the start of syllables" },
        { id: "unit-25", num: "25", title: "Go – goal – gold",                subtitle: "Consonants at the end of syllables" },
        { id: "unit-26", num: "26", title: "Paul's calls, Max's faxes",       subtitle: "Syllables: plural and other –s endings" },
        { id: "unit-27", num: "27", title: "Pete played, Rita rested",        subtitle: "Syllables: adding past tense endings" },
        { id: "unit-28", num: "28", title: "REcord, reCORD",                  subtitle: "Stress in two-syllable words" },
        { id: "unit-29", num: "29", title: "Second hand, bookshop",           subtitle: "Stress in compound words" },
        { id: "unit-30", num: "30", title: "Unforgettable",                   subtitle: "Stress in longer words 1" },
        { id: "unit-31", num: "31", title: "Public, publicity",               subtitle: "Stress in longer words 2" },
        { id: "unit-32", num: "32", title: "DON'T LOOK NOW!",                 subtitle: "Sentences with all the words stressed" },
        { id: "unit-33", num: "33", title: "THAT could be the MAN",           subtitle: "Unstressed words" },
        { id: "unit-34", num: "34", title: "I'll ask her (Alaska)",           subtitle: "Pronouns and contractions" },
        { id: "unit-35", num: "35", title: "She was FIRST",                   subtitle: "Pronouncing the verb be" },
        { id: "unit-36", num: "36", title: "WHAT do you THINK?",              subtitle: "Auxiliary verbs" },
        { id: "unit-37", num: "37", title: "A PIECE of CHEESE",               subtitle: "Pronouncing short words (a, of, or)" },
        { id: "unit-38", num: "38", title: "Pets enter, pet centre",          subtitle: "Joining words 1" },
        { id: "unit-39", num: "39", title: "After eight, after rate",         subtitle: "Joining words 2" },
        { id: "unit-40", num: "40", title: "Greet guests, Greek guests",      subtitle: "Joining words 3" },
      ],
    },
    {
      title: "Section 3 — Conversation",
      subsections: null,
      units: [
        { id: "unit-41", num: "41", title: "Could you say that again?",           subtitle: "Understanding conversation" },
        { id: "unit-42", num: "42", title: "'Was that the question?' he asked",   subtitle: "Reading aloud: pronouncing punctuation" },
        { id: "unit-43", num: "43", title: "A shirt and a tie / a shirt and tie", subtitle: "Grouping words" },
        { id: "unit-44", num: "44", title: "Ehm …",                               subtitle: "Showing that you want to continue" },
        { id: "unit-45", num: "45", title: "Well, anyway …",                      subtitle: "Telling a story" },
        { id: "unit-46", num: "46", title: "I mean, it's sort of like …",         subtitle: "Understanding small talk" },
        { id: "unit-47", num: "47", title: "Right, OK …",                         subtitle: "Understanding instructions" },
        { id: "unit-48", num: "48", title: "'Like father like son' as they say",  subtitle: "Quoting speech" },
        { id: "unit-49", num: "49", title: "He _will_ win",                       subtitle: "Introduction to emphatic stress" },
        { id: "unit-50", num: "50", title: "Schwartz … Pedro Schwartz",           subtitle: "Emphasising added details" },
        { id: "unit-51", num: "51", title: "I think you're in _my_ seat",         subtitle: "Emphasising important words" },
        { id: "unit-52", num: "52", title: "Chips or salad?",                     subtitle: "Emphasising contrasting alternatives" },
        { id: "unit-53", num: "53", title: "Fifty? No, fifteen!",                 subtitle: "Emphasising corrections" },
        { id: "unit-54", num: "54", title: "Look who's talking!",                 subtitle: "Introducing tones" },
        { id: "unit-55", num: "55", title: "Here? Yes, here!",                    subtitle: "Asking and checking tones" },
        { id: "unit-56", num: "56", title: "Where were you born?",                subtitle: "Tones in asking for information" },
        { id: "unit-57", num: "57", title: "We're closed tomorrow",               subtitle: "Tones in new and old information" },
        { id: "unit-58", num: "58", title: "Oh, really?",                         subtitle: "Continuing or finishing tones" },
        { id: "unit-59", num: "59", title: "It's fun, isn't it?",                 subtitle: "Agreeing and disagreeing tones" },
        { id: "unit-60", num: "60", title: "It was brilliant!",                   subtitle: "High tones" },
      ],
    },
    {
      title: "Section 4 — Reference",
      subsections: null,
      units: [
        { id: "unit-d1", num: "D1", title: "Introduction to phonemic symbols",     subtitle: null },
        { id: "unit-d2", num: "D2", title: "Pronunciation test",                   subtitle: null },
        { id: "unit-d3", num: "D3", title: "Guide for speakers of specific languages", subtitle: null },
        { id: "unit-d4", num: "D4", title: "Sound pairs",                          subtitle: null },
        { id: "unit-d5", num: "D5", title: "Sentence stress phrasebook",           subtitle: null },
        { id: "unit-d6", num: "D6", title: "Glossary",                             subtitle: null },
      ],
    },
  ],
};

const allUnits   = bookData.sections.flatMap((s) => s.units);
const totalUnits = allUnits.length;

let _idx = 0;
const unitIndexMap = {};
bookData.sections.forEach((sec) =>
  sec.units.forEach((u) => { unitIndexMap[u.id] = ++_idx; })
);

const sectionColors = [
  { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46", border: "#bbf7d0", icon: "🔤" },
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e", border: "#7dd3fc", icon: "🔊" },
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95", border: "#c4b5fd", icon: "💬" },
  { accent: "#64748b", bg: "#f8fafc", badge: "#e2e8f0", text: "#1e293b", border: "#cbd5e1", icon: "📖" },
];

const subsectionColors = [
  { bg: "#fef9c3", text: "#854d0e", border: "#fde68a" },
  { bg: "#dbeafe", text: "#1e3a5f", border: "#93c5fd" },
  { bg: "#fce7f3", text: "#831843", border: "#f9a8d4" },
  { bg: "#dcfce7", text: "#14532d", border: "#86efac" },
];

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

export default function PIUIntermediatePage() {
  const [user, setUser]     = useState(null);
  const [role, setRole]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({ 0: true, 1: true, 2: true, 3: true });

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

  const isLearner   = role === "learner" || role === "admin" || role === "owner";
  const toggleSec   = (i) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

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
            <Link href="/english/pronunciation" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Pronunciation</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#064e3b", fontWeight: 700 }}>PIU Intermediate</span>
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
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#dbeafe", color: "#1d4ed8", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
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
            const sc     = sectionColors[si] || sectionColors[0];
            const isOpen = expanded[si] !== false;

            // Build subsection lookup map
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
                        const gIdx   = unitIndexMap[unit.id];
                        const isFree = gIdx <= 3;
                        const locked = !isLearner && !isFree;
                        const sub    = subsecMap[unit.id];
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
                              path={`/english/pronunciation/piu-intermediate/${unit.id}`}
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
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>Full access to every unit, Topic explanations, and Practice exercises.</p>
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
