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
  id:      "illustrated-stories-2",
  title:   "Illustrated Everyday Expressions with Stories 2",
  authors: "Casey Malarcher & Andrea Janzen",
  cover:   "/books/illustrated-stories-2.jpg",
  subject: "speaking",
  lessons: [
    { id: "lesson-01", num: "01", expressions: ["be composed of", "clean off", "come across", "dress up", "fall asleep", "fill out", "in retrospect", "on the whole", "set out", "wait on"] },
    { id: "lesson-02", num: "02", expressions: ["be crazy about", "call it a day", "concentrate on", "get along with", "have a point", "more often than not", "never mind", "take a look at", "turn out", "wrap up"] },
    { id: "lesson-03", num: "03", expressions: ["bring up", "by all means", "by chance", "carry on", "draw the line at", "fix up", "get lost", "high time", "lose one's temper", "pull over"] },
    { id: "lesson-04", num: "04", expressions: ["a steal", "at hand", "get better", "more or less", "on hand", "on one's own", "refer to A as B", "take one's time", "think highly of", "try out"] },
    { id: "lesson-05", num: "05", expressions: ["as of yet", "at one's fingertips", "brand-new", "cut in", "dwell on", "get a hold of", "learn (something) by heart", "mix up", "take by surprise", "take time off"] },
    { id: "lesson-06", num: "06", expressions: ["as a rule", "be at a loss", "come up with", "for short", "in spite of", "look to A for B", "neither A nor B", "point out", "run into", "when it comes to"] },
    { id: "lesson-07", num: "07", expressions: ["add to", "day after day", "go through", "have to", "give rise to", "in short", "of one's own accord", "once and for all", "hit upon", "resign oneself to"] },
    { id: "lesson-08", num: "08", expressions: ["at times", "be likely to", "be opposed to", "by accident", "come from", "feel for", "for the sake of", "get away with", "stand a chance", "without question"] },
    { id: "lesson-09", num: "09", expressions: ["as usual", "back up", "be cut out for", "catch on", "for ages", "hand over", "serve one right", "take apart", "turn down", "work out"] },
    { id: "lesson-10", num: "10", expressions: ["abide by", "apart from", "as if", "go for", "go without saying", "keep one's fingers crossed", "make sure", "run over", "take up", "tend to"] },
    { id: "lesson-11", num: "11", expressions: ["blow up", "bring back", "burn down", "catch fire", "come to", "for the most part", "make one's way", "no matter", "sort of", "tear down"] },
    { id: "lesson-12", num: "12", expressions: ["be free to", "become of", "die of", "furnish A with B", "keep track of", "no way", "on the other hand", "stand to reason", "turn up", "what if"] },
    { id: "lesson-13", num: "13", expressions: ["at first glance", "attend to", "back and forth", "be no use -ing", "clear-cut", "drive one crazy", "fed up with", "play a part in", "take into account", "turn into"] },
    { id: "lesson-14", num: "14", expressions: ["be bound to", "day in and day out", "for sale", "give birth to", "give in", "hand out", "in one's way", "make a difference", "tell A from B", "upside down"] },
    { id: "lesson-15", num: "15", expressions: ["as soon as", "attribute A to B", "be apt to", "cut down on", "end up", "get over", "get used to", "in comparison with", "in no time", "used to"] },
    { id: "lesson-16", num: "16", expressions: ["beats me", "date back to", "have access to", "lead the way", "let down", "might as well", "not at all", "put out", "stand out", "think over"] },
    { id: "lesson-17", num: "17", expressions: ["a far cry from", "be better off", "be out of the question", "get through", "ill at ease", "in charge of", "look into", "think nothing of it", "think up", "what's up?"] },
    { id: "lesson-18", num: "18", expressions: ["catch a cold", "close call", "do without", "dry out", "fool around", "get nowhere with", "hold back", "in time", "pay off", "succeed in"] },
    { id: "lesson-19", num: "19", expressions: ["all in all", "burst out", "change one's mind", "criticize A for B", "cross out", "get the better of", "in regard to", "look over", "name A after B", "stick around"] },
    { id: "lesson-20", num: "20", expressions: ["all along", "be true of", "cut out", "every so often", "on account of", "pass away", "speak up", "stay put", "suffer from", "under the weather"] },
    { id: "lesson-21", num: "21", expressions: ["amount to", "at (the) most", "be broke", "come to an end", "deal with", "either A or B", "fall short of", "in need (of)", "or so", "pay back"] },
    { id: "lesson-22", num: "22", expressions: ["as far as", "be up to one", "carry out", "follow up on", "get even with", "in light of", "no wonder", "now that", "up to now", "use up"] },
    { id: "lesson-23", num: "23", expressions: ["be concerned about", "break down", "get stuck", "have nothing to do with", "look on A as B", "put away", "relieve A of B", "take for granted", "to say nothing of", "trade in"] },
    { id: "lesson-24", num: "24", expressions: ["as for", "deal in", "dream up", "find fault with", "get out of", "go wrong", "in addition to", "mess up", "sell out", "thanks to"] },
    { id: "lesson-25", num: "25", expressions: ["anything but", "go Dutch", "hang out", "in accordance with", "in terms of", "keep one's word", "lay off", "live up to", "see eye to eye", "settle down"] },
    { id: "lesson-26", num: "26", expressions: ["drop someone a line", "how come", "in brief", "keep off", "let go of", "lie down", "on behalf of", "owing to", "rule out", "yield to"] },
    { id: "lesson-27", num: "27", expressions: ["as a matter of fact", "at random", "in favor of", "keep up", "make a point of", "make room for", "on the spot", "sum up", "waste one's breath", "you bet"] },
    { id: "lesson-28", num: "28", expressions: ["come about", "do away with", "in advance", "from scratch", "in the long run", "on average", "set aside", "settle for", "so far, so good", "take over"] },
    { id: "lesson-29", num: "29", expressions: ["as to", "by and large", "due to", "fall behind", "lose track of", "make believe", "on no account", "originate from", "pull one's leg", "throw up"] },
    { id: "lesson-30", num: "30", expressions: ["be well off", "for good", "let alone", "look back on", "lose one's head", "make faces", "regardless of", "result in", "stand up to", "what for"] },
  ],
};

const totalLessons = bookData.lessons.length;

const lessonAccents = [
  { accent: "#059669", badge: "#d1fae5", text: "#065f46" },
  { accent: "#2563eb", badge: "#dbeafe", text: "#1e3a8a" },
  { accent: "#d97706", badge: "#fde68a", text: "#78350f" },
  { accent: "#9333ea", badge: "#f3e8ff", text: "#581c87" },
  { accent: "#db2777", badge: "#fce7f3", text: "#831843" },
];

export default function IllustratedStories2Page() {
  const [user, setUser]         = useState(null);
  const [role, setRole]         = useState(null);
  const [loading, setLoading]   = useState(true);
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
            <span style={{ color: "#065f46", fontWeight: 700 }}>Illustrated Stories 2</span>
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
                { val: totalLessons,        label: "Lessons" },
                { val: totalLessons * 10,   label: "Expressions" },
                { val: 3,                   label: "Free lessons", highlight: true },
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

        {/* ── UPGRADE BANNER ── */}
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
            const isFree = idx < 3;
            const locked = !isLearner && !isFree;
            const isOpen = !!expanded[lesson.id];
            const ac     = lessonAccents[idx % lessonAccents.length];

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
                {/* Lesson header */}
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", cursor: locked ? "not-allowed" : "pointer", backgroundColor: isOpen ? ac.badge + "55" : "#ffffff", transition: "background-color 0.15s" }}
                  onClick={() => { if (!locked) toggleLesson(lesson.id); }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
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
                        Lesson {lesson.num}
                      </p>
                      <p style={{ fontSize: "11px", color: locked ? "#d1d5db" : "#9ca3af", margin: "3px 0 0", fontWeight: 500 }}>
                        {lesson.expressions.length} expressions
                      </p>
                    </div>
                  </div>

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

                {/* Expressions panel */}
                {isOpen && !locked && (
                  <div style={{ borderTop: `1px solid ${ac.badge}`, padding: "14px 18px 16px", backgroundColor: "#fafafa" }}>
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

                    <Link
                      href={`/english/speaking/illustrated-stories-2/${lesson.id}`}
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
