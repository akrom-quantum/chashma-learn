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
  id:      "viu-advanced",
  title:   "English Vocabulary in Use",
  level:   "Advanced",
  authors: "Michael McCarthy & Felicity O'Dell",
  cover:   "/books/viu-advanced.jpg",
  subject: "vocabulary",
  sections: [
    {
      title: "Work and Study",
      icon: "💼",
      units: [
        { id: "unit-01", num: "01", title: "Cramming for success: study and academic work" },
        { id: "unit-02", num: "02", title: "Education: debates and issues" },
        { id: "unit-03", num: "03", title: "Applying for a job" },
        { id: "unit-04", num: "04", title: "Job interviews" },
        { id: "unit-05", num: "05", title: "At work: colleagues and routines" },
        { id: "unit-06", num: "06", title: "At work: job satisfaction" },
        { id: "unit-07", num: "07", title: "At work: careers" },
      ],
    },
    {
      title: "People and Relationships",
      icon: "🧑‍🤝‍🧑",
      units: [
        { id: "unit-08", num: "08", title: "Describing people: positive and negative qualities" },
        { id: "unit-09", num: "09", title: "Describing people: appearance and mannerisms" },
        { id: "unit-10", num: "10", title: "Describing people: personality and character traits" },
        { id: "unit-11", num: "11", title: "Relationships: friends forever" },
        { id: "unit-12", num: "12", title: "Relationships: ups and downs" },
        { id: "unit-13", num: "13", title: "Emotions and reactions" },
        { id: "unit-14", num: "14", title: "Negative feelings" },
        { id: "unit-15", num: "15", title: "Birth and death: from cradle to grave" },
      ],
    },
    {
      title: "Leisure and Lifestyle",
      icon: "🎭",
      units: [
        { id: "unit-16", num: "16", title: "Free time: relaxation and leisure" },
        { id: "unit-17", num: "17", title: "All the rage: clothes and fashion" },
        { id: "unit-18", num: "18", title: "Home styles, lifestyles" },
        { id: "unit-19", num: "19", title: "Socialising and networking" },
        { id: "unit-20", num: "20", title: "The performance arts: reviews and critiques" },
        { id: "unit-21", num: "21", title: "The visual arts" },
        { id: "unit-22", num: "22", title: "Talking about books" },
        { id: "unit-23", num: "23", title: "Food: a recipe for disaster" },
        { id: "unit-24", num: "24", title: "Dinner's on me: entertaining and eating out" },
      ],
    },
    {
      title: "Travel",
      icon: "✈️",
      units: [
        { id: "unit-25", num: "25", title: "On the road: traffic and driving" },
        { id: "unit-26", num: "26", title: "Travel and accommodation" },
        { id: "unit-27", num: "27", title: "Attracting tourists" },
      ],
    },
    {
      title: "The Environment",
      icon: "🌿",
      units: [
        { id: "unit-28", num: "28", title: "Describing the world" },
        { id: "unit-29", num: "29", title: "Weather and climate" },
        { id: "unit-30", num: "30", title: "Brick walls and glass ceilings" },
        { id: "unit-31", num: "31", title: "Taking root and reaping rewards" },
        { id: "unit-32", num: "32", title: "The animal kingdom" },
        { id: "unit-33", num: "33", title: "Our endangered world" },
      ],
    },
    {
      title: "Society and Institutions",
      icon: "🏛️",
      units: [
        { id: "unit-34", num: "34", title: "Here to help: customer service" },
        { id: "unit-35", num: "35", title: "Authorities: customs and police" },
        { id: "unit-36", num: "36", title: "Beliefs" },
        { id: "unit-37", num: "37", title: "Festivals in their cultural context" },
        { id: "unit-38", num: "38", title: "Talking about language" },
        { id: "unit-39", num: "39", title: "History: since the dawn of civilisation" },
        { id: "unit-40", num: "40", title: "The haves and the have-nots" },
        { id: "unit-41", num: "41", title: "British politics" },
        { id: "unit-42", num: "42", title: "International politics" },
        { id: "unit-43", num: "43", title: "The letter of the law" },
        { id: "unit-44", num: "44", title: "War and peace" },
        { id: "unit-45", num: "45", title: "Economy and finance" },
        { id: "unit-46", num: "46", title: "Personal finance: making ends meet" },
      ],
    },
    {
      title: "The Media",
      icon: "📰",
      units: [
        { id: "unit-47", num: "47", title: "The media: in print" },
        { id: "unit-48", num: "48", title: "The media: internet and email" },
        { id: "unit-49", num: "49", title: "Advertising" },
        { id: "unit-50", num: "50", title: "The news: gathering and delivering" },
      ],
    },
    {
      title: "Health",
      icon: "🏥",
      units: [
        { id: "unit-51", num: "51", title: "Healthcare" },
        { id: "unit-52", num: "52", title: "Illness: feeling under the weather" },
        { id: "unit-53", num: "53", title: "Medical language" },
        { id: "unit-54", num: "54", title: "Diet, sport and fitness" },
      ],
    },
    {
      title: "Technology",
      icon: "⚙️",
      units: [
        { id: "unit-55", num: "55", title: "Industries: from manufacturing to service" },
        { id: "unit-56", num: "56", title: "Technology and its impact" },
        { id: "unit-57", num: "57", title: "Technology of the future" },
        { id: "unit-58", num: "58", title: "Energy: from fossil fuels to windmills" },
      ],
    },
    {
      title: "Basic Concepts",
      icon: "💡",
      units: [
        { id: "unit-59", num: "59", title: "Space: no room to swing a cat" },
        { id: "unit-60", num: "60", title: "Time: once in a blue moon" },
        { id: "unit-61", num: "61", title: "Motion: taking steps" },
        { id: "unit-62", num: "62", title: "Manner: behaviour and body language" },
        { id: "unit-63", num: "63", title: "Sounds: listen up!" },
        { id: "unit-64", num: "64", title: "Weight and density" },
        { id: "unit-65", num: "65", title: "All the colours of the rainbow" },
        { id: "unit-66", num: "66", title: "Speed: fast and slow" },
        { id: "unit-67", num: "67", title: "Cause and effect" },
        { id: "unit-68", num: "68", title: "Spot the difference: making comparisons" },
        { id: "unit-69", num: "69", title: "Difficulties and dilemmas" },
        { id: "unit-70", num: "70", title: "Modality: expressing facts, opinions, desires" },
        { id: "unit-71", num: "71", title: "Number: statistics and quantity" },
      ],
    },
    {
      title: "Functional Vocabulary",
      icon: "🗣️",
      units: [
        { id: "unit-72", num: "72", title: "Permission: getting the go-ahead" },
        { id: "unit-73", num: "73", title: "Complaining and protesting" },
        { id: "unit-74", num: "74", title: "Apology, regret and reconciliation" },
        { id: "unit-75", num: "75", title: "A pat on the back: complimenting and praising" },
        { id: "unit-76", num: "76", title: "Promises and bets" },
        { id: "unit-77", num: "77", title: "Reminiscences and regrets" },
        { id: "unit-78", num: "78", title: "Agreement, disagreement and compromise" },
        { id: "unit-79", num: "79", title: "Academic writing: making sense" },
        { id: "unit-80", num: "80", title: "Academic writing: text structure" },
        { id: "unit-81", num: "81", title: "Writing: style and format" },
        { id: "unit-82", num: "82", title: "Whatchamacallit: being indirect" },
        { id: "unit-83", num: "83", title: "Give or take: more vague expressions" },
        { id: "unit-84", num: "84", title: "The way you say it" },
      ],
    },
    {
      title: "Words and Meanings",
      icon: "📖",
      units: [
        { id: "unit-85", num: "85", title: "Abbreviations and acronyms" },
        { id: "unit-86", num: "86", title: "Prefixes: creating new meanings" },
        { id: "unit-87", num: "87", title: "Suffixes: forming new words" },
        { id: "unit-88", num: "88", title: "Word-building and word-blending" },
        { id: "unit-89", num: "89", title: "English: a global language" },
        { id: "unit-90", num: "90", title: "Easily confused words" },
        { id: "unit-91", num: "91", title: "One word, many meanings" },
      ],
    },
    {
      title: "Fixed Expressions and Figurative Language",
      icon: "🎨",
      units: [
        { id: "unit-92", num: "92", title: "Collocation: which words go together" },
        { id: "unit-93", num: "93", title: "Metaphor: seeing the light" },
        { id: "unit-94", num: "94", title: "Idioms for everyday situations and feelings" },
        { id: "unit-95", num: "95", title: "Brushing up on phrasal verbs" },
        { id: "unit-96", num: "96", title: "Connotation: making associations" },
      ],
    },
    {
      title: "Language Variation",
      icon: "🌐",
      units: [
        { id: "unit-97",  num: "97",  title: "Register: degrees of formality" },
        { id: "unit-98",  num: "98",  title: "Divided by a common language" },
        { id: "unit-99",  num: "99",  title: "Language and gender" },
        { id: "unit-100", num: "100", title: "In the headlines" },
        { id: "unit-101", num: "101", title: "Red tape" },
      ],
    },
  ],
};

const allUnits   = bookData.sections.flatMap((s) => s.units);
const totalUnits = allUnits.length;

const sectionColors = [
  { accent: "#0369a1", bg: "#f0f9ff", badge: "#bae6fd", text: "#0c4a6e" },  // 0  Work & Study
  { accent: "#7c3aed", bg: "#faf5ff", badge: "#ede9fe", text: "#4c1d95" },  // 1  People
  { accent: "#b91c1c", bg: "#fff1f2", badge: "#fecdd3", text: "#881337" },  // 2  Leisure
  { accent: "#0f766e", bg: "#f0fdfa", badge: "#99f6e4", text: "#134e4a" },  // 3  Travel
  { accent: "#15803d", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d" },  // 4  Environment
  { accent: "#64748b", bg: "#f8fafc", badge: "#e2e8f0", text: "#1e293b" },  // 5  Society
  { accent: "#b45309", bg: "#fffbeb", badge: "#fde68a", text: "#78350f" },  // 6  Media
  { accent: "#dc2626", bg: "#fef2f2", badge: "#fecaca", text: "#7f1d1d" },  // 7  Health
  { accent: "#1d4ed8", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a" },  // 8  Technology
  { accent: "#c2410c", bg: "#fff7ed", badge: "#fed7aa", text: "#7c2d12" },  // 9  Basic Concepts
  { accent: "#0891b2", bg: "#ecfeff", badge: "#a5f3fc", text: "#164e63" },  // 10 Functional Vocab
  { accent: "#4f46e5", bg: "#eef2ff", badge: "#c7d2fe", text: "#312e81" },  // 11 Words & Meanings
  { accent: "#059669", bg: "#f0fdf4", badge: "#d1fae5", text: "#065f46" },  // 12 Fixed Expressions
  { accent: "#9333ea", bg: "#fdf4ff", badge: "#e9d5ff", text: "#581c87" },  // 13 Language Variation
];

export default function VIUAdvancedPage() {
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
            <span style={{ color: "#064e3b", fontWeight: 700 }}>VIU Advanced</span>
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
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#fce7f3", color: "#9d174d", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              ADVANCED
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
                          href={locked ? "#" : `/english/vocabulary/viu-advanced/${unit.id}`}
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
                              fontSize: "11px", fontWeight: 800,
                              color: locked ? "#9ca3af" : sc.text,
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
