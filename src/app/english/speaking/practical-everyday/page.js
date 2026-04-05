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
  id:      "pmp-english-conversation",
  title:   "English Conversation",
  series:  "Practice Makes Perfect",
  authors: "Jean Yates, PhD",
  cover:   "/books/pmp-english-conversation.jpg",
  subject: "speaking",
  sections: [
    {
      title: "Section 1 — Getting Started",
      units: [
        { id: "unit-01", num: "01", title: "Introducing yourself and others" },
        { id: "unit-02", num: "02", title: "Expressing opinions, likes, and dislikes" },
        { id: "unit-03", num: "03", title: "Describing people, places, and things" },
        { id: "unit-04", num: "04", title: "Striking up a conversation" },
      ],
    },
    {
      title: "Section 2 — Planning & Interaction",
      units: [
        { id: "unit-05", num: "05", title: "Making dates and appointments" },
        { id: "unit-06", num: "06", title: "Expressing wants and needs" },
        { id: "unit-07", num: "07", title: "Making requests and offers" },
        { id: "unit-08", num: "08", title: "Expressing doubts and uncertainty" },
      ],
    },
    {
      title: "Section 3 — Advanced Conversation",
      units: [
        { id: "unit-09", num: "09", title: "Talking about future events" },
        { id: "unit-10", num: "10", title: "Making a case or arguing a point" },
        { id: "unit-11", num: "11", title: "Narrating a story" },
        { id: "unit-12", num: "12", title: "Retelling a conversation" },
        { id: "unit-13", num: "13", title: "Electronic conversation" },
      ],
    },
  ],
};

const allUnits   = bookData.sections.flatMap((s) => s.units);
const totalUnits = allUnits.length;

const sectionColors = [
  { accent: "#16a34a", bg: "#f0fdf4", badge: "#bbf7d0", text: "#14532d", icon: "👋" },
  { accent: "#2563eb", bg: "#eff6ff", badge: "#bfdbfe", text: "#1e3a8a", icon: "🗓️" },
  { accent: "#9333ea", bg: "#faf5ff", badge: "#e9d5ff", text: "#581c87", icon: "🎙️" },
];

export default function PMPEnglishConversationPage() {
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

  const toggleSection = (idx) =>
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));

  let globalIdx = 0;
  const unitIndexMap = {};
  bookData.sections.forEach((sec) =>
    sec.units.forEach((u) => { unitIndexMap[u.id] = ++globalIdx; })
  );

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "44px", height: "44px", border: "3px solid #bbf7d0", borderTop: "3px solid #16a34a", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.96)", borderBottom: "1px solid #dcfce7", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", flexWrap: "wrap" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <img src="/logo.png" alt="Chashma Learn" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>General English</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english/speaking" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Speaking</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#14532d", fontWeight: 700 }}>PMP: English Conversation</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Dashboard</Link>
            <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#14532d" }}>
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
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px", backgroundColor: "#f0fdf4" }}>
              <span style={{ fontSize: "32px" }}>🎙️</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          {/* Info */}
          <div>
            {/* Series badge */}
            <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, backgroundColor: "#e0e7ff", color: "#3730a3", padding: "2px 9px", borderRadius: "999px", marginBottom: "6px", letterSpacing: "0.3px" }}>
              PRACTICE MAKES PERFECT
            </span>

            <div style={{ marginBottom: "4px" }}>
              <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#bbf7d0", color: "#14532d", padding: "3px 10px", borderRadius: "999px", letterSpacing: "0.3px" }}>
                SPEAKING
              </span>
            </div>

            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#14532d", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "6px" }}>
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
                  <p style={{ fontSize: "22px", fontWeight: 800, color: highlight ? "#16a34a" : "#14532d", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: "6px", backgroundColor: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${(3 / totalUnits) * 100}%`, height: "100%", backgroundColor: "#16a34a", borderRadius: "999px" }} />
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>3 of {totalUnits} unlocked</span>
            </div>
          </div>
        </div>

        {/* ── UPGRADE BANNER (viewers only) ── */}
        {!isLearner && (
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "14px 20px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#14532d", fontWeight: 500, lineHeight: 1.5 }}>
              Units 1–3 are free.{" "}
              <Link href="/dashboard" style={{ color: "#16a34a", fontWeight: 700, textDecoration: "none" }}>Upgrade to Learner</Link>{" "}
              to unlock all {totalUnits} units and access both Topic and Practice tabs.
            </p>
          </div>
        )}

        {/* ── SECTIONS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {bookData.sections.map((section, si) => {
            const sc     = sectionColors[si] || sectionColors[0];
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
                    <span style={{ fontSize: "20px" }}>{sc.icon}</span>
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
                          href={locked ? "#" : `/english/speaking/pmp-english-conversation/${unit.id}`}
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
                          {/* Left side */}
                          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <div style={{
                              width: "38px", height: "38px", borderRadius: "8px",
                              backgroundColor: locked ? "#f3f4f6" : sc.badge,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "12px", fontWeight: 800,
                              color: locked ? "#9ca3af" : sc.text,
                              flexShrink: 0,
                              letterSpacing: "-0.3px",
                            }}>
                              {unit.num}
                            </div>
                            <p style={{ fontSize: "13px", fontWeight: 600, color: locked ? "#9ca3af" : "#111827", margin: 0, lineHeight: 1.3 }}>
                              {unit.title}
                            </p>
                          </div>

                          {/* Right side */}
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                            {isFree && (
                              <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#bbf7d0", color: "#16a34a", padding: "2px 8px", borderRadius: "999px", letterSpacing: "0.2px" }}>
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
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#14532d", marginBottom: "6px" }}>
              Unlock all {totalUnits} units
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              Get full access to every unit, Topic explanations, and Practice exercises.
            </p>
            <Link href="/dashboard" style={{ display: "inline-block", backgroundColor: "#16a34a", color: "#ffffff", padding: "10px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 700 }}>
              Upgrade to Learner
            </Link>
          </div>
        )}

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
