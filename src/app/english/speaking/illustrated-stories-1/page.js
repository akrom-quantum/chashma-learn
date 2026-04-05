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
  id:      "illustrated-stories-1",
  title:   "Illustrated Everyday Expressions with Stories 1",
  authors: "Casey Malarcher & Andrea Janzen",
  cover:   "/books/illustrated-stories-1.jpg",
  subject: "speaking",
  lessons: [
    {
      id: "lesson-01", num: "01",
      title: "The Sun, the Moon, and the Bat",
      expressions: ["a couple of", "a long time ago", "a lot of", "all of a sudden", "again and again", "all the time", "arrive at/in", "as a result", "ask for", "at a time"],
    },
    {
      id: "lesson-02", num: "02",
      title: "The Man Who Learned from His Cow",
      expressions: ["at first", "at last", "at least", "at once", "be about to", "be afraid of", "be angry with", "be different from", "be excited about", "be famous for"],
    },
    {
      id: "lesson-03", num: "03",
      title: "The Man Who Tried to Change Fate",
      expressions: ["be filled with", "be fond of", "be good at", "be in trouble", "be interested in", "be late for", "be pleased with", "be proud of", "be ready to", "be surprised by/at"],
    },
    {
      id: "lesson-04", num: "04",
      title: "The Jindo Dog",
      expressions: ["be thankful for", "be used to", "be willing to", "because of", "belong to", "blow out", "break away from", "break out", "bring about", "call off"],
    },
    {
      id: "lesson-05", num: "05",
      title: "The Wait-and-See Man",
      expressions: ["call up", "calm down", "can't afford", "can't help -ing", "catch up with", "cheer up", "come true", "congratulations on", "count on", "cry out for"],
    },
    {
      id: "lesson-06", num: "06",
      title: "Three Rabbits",
      expressions: ["cut off", "depend on", "die out", "do one's best", "dream of", "drop by", "enjoy oneself", "fall in love with", "feel like -ing", "figure out"],
    },
    {
      id: "lesson-07", num: "07",
      title: "The Girl Who Dressed Like a Boy",
      expressions: ["find out", "for the first time", "from now on", "from time to time", "get back", "get in touch with", "get married to", "get off", "get rid of", "get tired of"],
    },
    {
      id: "lesson-08", num: "08",
      title: "The Foolish Brahman",
      expressions: ["get together", "give a hand", "give away", "give it a try", "give up", "go on", "grow up", "had better", "have a good time", "have no idea"],
    },
    {
      id: "lesson-09", num: "09",
      title: "The Seal's Skin",
      expressions: ["have trouble with", "hear from", "help oneself to", "hold on", "hurry up", "in a hurry", "in fact", "in front of", "in search of", "in the meantime"],
    },
    {
      id: "lesson-10", num: "10",
      title: "Ivanko the Bear's Son",
      expressions: ["in the middle of", "in vain", "instead of", "just in time", "keep in mind", "keep on", "keep an eye on", "laugh at", "lead to", "look after"],
    },
    {
      id: "lesson-11", num: "11",
      title: "Strong Wind",
      expressions: ["look for", "look forward to", "look like", "look out", "look up to", "make friends with", "make fun of", "make sense", "make up one's mind", "make use of"],
    },
    {
      id: "lesson-12", num: "12",
      title: "Brer Fox's Shoes",
      expressions: ["of course", "on foot", "on purpose", "on time", "once in a while", "out of breath", "pay attention to", "pick up", "play tricks on", "pass by"],
    },
    {
      id: "lesson-13", num: "13",
      title: "The Kalligooroo",
      expressions: ["protect from", "put off", "put on", "put up with", "remind of", "right away", "run away", "run out of", "see off", "show off"],
    },
    {
      id: "lesson-14", num: "14",
      title: "The Wild Pigeon",
      expressions: ["show up", "slow down", "sooner or later", "stand for", "stay up", "stick to", "take advantage of", "take care of", "take off", "take part in"],
    },
    {
      id: "lesson-15", num: "15",
      title: "Pedro Tricks His Boss",
      expressions: ["talk over", "take turns", "think about", "throw away", "try on", "turn off", "turn on", "wait for", "would like to", "write down"],
    },
  ],
};

const totalLessons = bookData.lessons.length;

// Rotating accent colors per lesson (5-color cycle)
const lessonAccents = [
  { accent: "#059669", badge: "#d1fae5", text: "#065f46" },
  { accent: "#2563eb", badge: "#dbeafe", text: "#1e3a8a" },
  { accent: "#d97706", badge: "#fde68a", text: "#78350f" },
  { accent: "#9333ea", badge: "#f3e8ff", text: "#581c87" },
  { accent: "#db2777", badge: "#fce7f3", text: "#831843" },
];

export default function IllustratedStories1Page() {
  const [user, setUser]     = useState(null);
  const [role, setRole]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

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

  const toggleLesson = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "44px", height: "44px", border: "3px solid #d1fae5", borderTop: "3px solid #059669", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
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
            <Link href="/english/speaking" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Speaking</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#065f46", fontWeight: 700 }}>Illustrated Stories 1</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Dashboard</Link>
            <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#065f46" }}>
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
              <span style={{ fontSize: "32px" }}>📖</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px", lineHeight: 1.4 }}>Cover coming soon</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: "999px", marginBottom: "10px", letterSpacing: "0.3px" }}>
              SPEAKING
            </span>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.4px", lineHeight: 1.25, marginBottom: "6px" }}>
              {bookData.title}
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontWeight: 500 }}>
              {bookData.authors}
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
              {[
                { val: totalLessons, label: "Lessons" },
                { val: totalLessons * 20, label: "Expressions" },
                { val: 3, label: "Free lessons", highlight: true },
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
                <div style={{ width: `${(3 / totalLessons) * 100}%`, height: "100%", backgroundColor: "#059669", borderRadius: "999px" }} />
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>3 of {totalLessons} unlocked</span>
            </div>
          </div>
        </div>

        {/* ── UPGRADE BANNER (viewers only) ── */}
        {!isLearner && (
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "14px 20px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#065f46", fontWeight: 500, lineHeight: 1.5 }}>
              Lessons 1–3 are free.{" "}
              <Link href="/dashboard" style={{ color: "#059669", fontWeight: 700, textDecoration: "none" }}>Upgrade to Learner</Link>{" "}
              to unlock all {totalLessons} lessons and access both Topic and Practice tabs.
            </p>
          </div>
        )}

        {/* ── LESSONS LIST ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {bookData.lessons.map((lesson, idx) => {
            const isFree  = idx < 3;
            const locked  = !isLearner && !isFree;
            const isOpen  = !!expanded[lesson.id];
            const ac      = lessonAccents[idx % lessonAccents.length];

            return (
              <div
                key={lesson.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: `1px solid ${isOpen ? ac.badge : "#e5e7eb"}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  opacity: locked ? 0.65 : 1,
                  transition: "border-color 0.2s, opacity 0.2s",
                }}
              >
                {/* ── Lesson header row ── */}
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", cursor: locked ? "not-allowed" : "pointer", backgroundColor: isOpen ? ac.badge + "55" : "#ffffff", transition: "background-color 0.15s" }}
                  onClick={() => { if (!locked) toggleLesson(lesson.id); }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    {/* Lesson number badge */}
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "8px", flexShrink: 0,
                      backgroundColor: locked ? "#f3f4f6" : ac.badge,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: 800,
                      color: locked ? "#9ca3af" : ac.text,
                      letterSpacing: "-0.3px",
                    }}>
                      {lesson.num}
                    </div>

                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: locked ? "#9ca3af" : "#111827", margin: 0, lineHeight: 1.3 }}>
                        {lesson.title}
                      </p>
                      <p style={{ fontSize: "11px", color: locked ? "#d1d5db" : "#9ca3af", margin: "3px 0 0", fontWeight: 500 }}>
                        {lesson.expressions.length} expressions
                      </p>
                    </div>
                  </div>

                  {/* Right controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                    {isFree && (
                      <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#059669", padding: "2px 8px", borderRadius: "999px" }}>
                        FREE
                      </span>
                    )}
                    {locked ? (
                      <span style={{ fontSize: "15px" }}>🔒</span>
                    ) : (
                      <span style={{ fontSize: "17px", color: "#9ca3af", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                    )}
                  </div>
                </div>

                {/* ── Expressions panel ── */}
                {isOpen && !locked && (
                  <div style={{ borderTop: `1px solid ${ac.badge}`, padding: "14px 18px 16px", backgroundColor: "#fafafa" }}>

                    {/* Expression chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "16px" }}>
                      {lesson.expressions.map((expr) => (
                        <span
                          key={expr}
                          style={{
                            fontSize: "12px", fontWeight: 600,
                            backgroundColor: "#ffffff",
                            color: ac.text,
                            border: `1px solid ${ac.badge}`,
                            padding: "4px 10px",
                            borderRadius: "6px",
                            letterSpacing: "0.1px",
                            fontFamily: "monospace",
                          }}
                        >
                          {expr}
                        </span>
                      ))}
                    </div>

                    {/* Go to lesson button */}
                    <Link
                      href={`/english/speaking/illustrated-stories-1/${lesson.id}`}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        backgroundColor: ac.accent, color: "#ffffff",
                        padding: "8px 18px", borderRadius: "7px",
                        textDecoration: "none", fontSize: "13px", fontWeight: 700,
                      }}
                    >
                      Start Lesson {lesson.num} →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM CTA ── */}
        {!isLearner && (
          <div style={{ marginTop: "40px", backgroundColor: "#f0fdf4", border: "1px solid #a7f3d0", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>🎓</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#064e3b", marginBottom: "6px" }}>
              Unlock all {totalLessons} lessons
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              Get full access to every lesson, expression explanations, and Practice exercises.
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
