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

const subjects = [
  {
    id:    "pronunciation",
    label: "Pronunciation",
    icon:  "🎙️",
    books: [
      { id: "piu-elementary",   title: "Pronunciation in Use",  level: "Elementary",              authors: "Jonathan Marks",                    cover: "/books/piu-elementary.jpg"   },
      { id: "piu-intermediate", title: "Pronunciation in Use",  level: "Intermediate",            authors: "Mark Hancock",                      cover: "/books/piu-intermediate.jpg" },
      { id: "piu-advanced",     title: "Pronunciation in Use",  level: "Advanced",                authors: "Martin Hewings",                    cover: "/books/piu-advanced.jpg"     },
      { id: "unified-pronunciation", title: "Unified Pronunciation Book", level: null,           authors: "Prepared by Akrom Nabi",            cover: "/books/unified-pronunciation.jpg", unified: true },
    ],
  },
  {
    id:    "oxford-word-skills",
    label: "Oxford Word Skills",
    icon:  "📘",
    books: [
      { id: "ows-elementary",   title: "Oxford Word Skills",    level: "Elementary",              authors: "Ruth Gairns, Stuart Redman",         cover: "/books/ows-elementary.jpg"   },
      { id: "ows-intermediate", title: "Oxford Word Skills",    level: "Intermediate",            authors: "Ruth Gairns, Stuart Redman",         cover: "/books/ows-intermediate.jpg" },
      { id: "ows-upper",        title: "Oxford Word Skills",    level: "Upper-Intermediate & Advanced", authors: "Ruth Gairns, Stuart Redman",   cover: "/books/ows-upper.jpg"        },
      { id: "unified-word-skills", title: "Unified Word Skills Book", level: null,               authors: "Prepared by Akrom Nabi",            cover: "/books/unified-word-skills.jpg", unified: true },
    ],
  },
  {
    id:    "vocabulary",
    label: "Vocabulary",
    icon:  "📚",
    books: [
      { id: "viu-elementary",       title: "Vocabulary in Use", level: "Elementary",              authors: "Michael McCarthy, Felicity O'Dell",  cover: "/books/viu-elementary.jpg"       },
      { id: "viu-pre-intermediate", title: "Vocabulary in Use", level: "Pre-Intermediate & Intermediate", authors: "Stuart Redman",            cover: "/books/viu-pre-intermediate.jpg" },
      { id: "viu-upper",            title: "Vocabulary in Use", level: "Upper-Intermediate",      authors: "Michael McCarthy, Felicity O'Dell",  cover: "/books/viu-upper.jpg"            },
      { id: "viu-advanced",         title: "Vocabulary in Use", level: "Advanced",                authors: "Michael McCarthy, Felicity O'Dell",  cover: "/books/viu-advanced.jpg"         },
      { id: "unified-vocabulary",   title: "Unified Vocabulary Book", level: null,               authors: "Prepared by Akrom Nabi",            cover: "/books/unified-vocabulary.jpg", unified: true },
    ],
  },
  {
    id:    "grammar",
    label: "Grammar",
    icon:  "✏️",
    books: [
      { id: "oegc-basic",        title: "Oxford English Grammar Course", level: "Basic",          authors: "Michael Swan, Catherine Walter",     cover: "/books/oegc-basic.jpg"        },
      { id: "oegc-intermediate", title: "Oxford English Grammar Course", level: "Intermediate",   authors: "Michael Swan, Catherine Walter",     cover: "/books/oegc-intermediate.jpg" },
      { id: "oegc-advanced",     title: "Oxford English Grammar Course", level: "Advanced",       authors: "Michael Swan, Catherine Walter",     cover: "/books/oegc-advanced.jpg"     },
      { id: "unified-grammar",   title: "Unified English Grammar Course", level: null,            authors: "Prepared by Akrom Nabi",            cover: "/books/unified-grammar.jpg", unified: true },
    ],
  },
  {
    id:    "collocations",
    label: "Collocations",
    icon:  "🔗",
    books: [
      { id: "ciu-intermediate", title: "Collocations in Use",          level: "Intermediate",    authors: "Michael McCarthy, Felicity O'Dell",  cover: "/books/ciu-intermediate.jpg" },
      { id: "ciu-advanced",     title: "Collocations in Use",          level: "Advanced",        authors: "Michael McCarthy, Felicity O'Dell",  cover: "/books/ciu-advanced.jpg"     },
      { id: "unified-collocations", title: "Unified Collocations Book", level: null,             authors: "Prepared by Akrom Nabi",            cover: "/books/unified-collocations.jpg", unified: true },
    ],
  },
  {
    id:    "phrasal-verbs",
    label: "Phrasal Verbs",
    icon:  "🔀",
    books: [
      { id: "pviu-intermediate", title: "Phrasal Verbs in Use",        level: "Intermediate",    authors: "Michael McCarthy, Felicity O'Dell",  cover: "/books/pviu-intermediate.jpg" },
      { id: "pviu-advanced",     title: "Phrasal Verbs in Use",        level: "Advanced",        authors: "Michael McCarthy, Felicity O'Dell",  cover: "/books/pviu-advanced.jpg"     },
      { id: "unified-phrasal",   title: "Unified Phrasal Verbs Book",  level: null,              authors: "Prepared by Akrom Nabi",            cover: "/books/unified-phrasal.jpg", unified: true },
    ],
  },
  {
    id:    "idioms",
    label: "Idioms",
    icon:  "💬",
    books: [
      { id: "iiu-intermediate", title: "Idioms in Use",                level: "Intermediate",    authors: "Michael McCarthy, Felicity O'Dell",  cover: "/books/iiu-intermediate.jpg" },
      { id: "iiu-advanced",     title: "Idioms in Use",                level: "Advanced",        authors: "Michael McCarthy, Felicity O'Dell",  cover: "/books/iiu-advanced.jpg"     },
    ],
  },
  {
    id:    "speaking",
    label: "Speaking",
    icon:  "🗣️",
    books: [
      { id: "social-expressions",    title: "Social Expressions",                    level: null, authors: "Betty Kirkpatrick",                  cover: "/books/social-expressions.jpg"    },
      { id: "everyday-idioms",       title: "Everyday Idioms",                       level: null, authors: "Betty Kirkpatrick",                  cover: "/books/everyday-idioms.jpg"       },
      { id: "advanced-everyday",     title: "Advanced Everyday English",             level: null, authors: "Steven Collins",                     cover: "/books/advanced-everyday.jpg"     },
      { id: "practical-everyday",    title: "Practical Everyday English",            level: null, authors: "Steven Collins",                     cover: "/books/practical-everyday.jpg"    },
      { id: "illustrated-stories-1", title: "Illustrated Everyday Expressions with Stories 1", level: null, authors: "Casey Malarcher",        cover: "/books/illustrated-stories-1.jpg" },
      { id: "illustrated-stories-2", title: "Illustrated Everyday Expressions with Stories 2", level: null, authors: "Casey Malarcher",        cover: "/books/illustrated-stories-2.jpg" },
    ],
  },
  {
    id:    "writing",
    label: "Writing",
    icon:  "📝",
    books: [
      { id: "writing-academic-english",  title: "Writing Academic English",                    level: null, authors: "Alice Oshima, Ann Hogue",               cover: "/books/writing-academic-english.jpg"  },
      { id: "cambridge-study-writing",   title: "Cambridge Study Writing",                     level: null, authors: "Liz Hamp-Lyons",                        cover: "/books/cambridge-study-writing.jpg"   },
      { id: "inside-writing-4",          title: "Inside Writing 4",                            level: null, authors: "Nigel A. Caplan, Jennifer Bixby",       cover: "/books/inside-writing-4.jpg"          },
      { id: "longman-writing-4",         title: "Longman Academic Writing Series 4",           level: "Essays",                                               authors: "Alice Oshima, Ann Hogue",           cover: "/books/longman-writing-4.jpg"         },
      { id: "longman-writing-5",         title: "Longman Academic Writing Series 5",           level: "Essays to Research Papers",                            authors: "Alice Oshima, Ann Hogue",           cover: "/books/longman-writing-5.jpg"         },
      { id: "50-steps-writing",          title: "50 Steps to Improving Your Academic Writing", level: null, authors: "Chris Sowton",                          cover: "/books/50-steps-writing.jpg"          },
      { id: "unified-writing",           title: "Unified Writing Book",                        level: null, authors: "Prepared by Akrom Nabi",                cover: "/books/unified-writing.jpg", unified: true },
    ],
  },
];

const levelColor = {
  "Elementary":                    { bg: "#dcfce7", color: "#15803d" },
  "Pre-Intermediate & Intermediate":{ bg: "#d1fae5", color: "#036c48" },
  "Intermediate":                  { bg: "#d1fae5", color: "#036c48" },
  "Upper-Intermediate":            { bg: "#a7f3d0", color: "#065f46" },
  "Upper-Intermediate & Advanced": { bg: "#a7f3d0", color: "#065f46" },
  "Advanced":                      { bg: "#6ee7b7", color: "#064e3b" },
  "Basic":                         { bg: "#dcfce7", color: "#15803d" },
  "Essays":                        { bg: "#dbeafe", color: "#1d4ed8" },
  "Essays to Research Papers":     { bg: "#ede9fe", color: "#6d28d9" },
};

export default function EnglishPage() {
  const [user, setUser]             = useState(null);
  const [role, setRole]             = useState(null);
  const [loading, setLoading]       = useState(true);
  const [activeSubject, setActiveSubject] = useState("pronunciation");
  const [sidebarOpen, setSidebarOpen]     = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        try {
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          setRole(snap.exists() ? snap.data().role : "viewer");
        } catch { setRole("viewer"); }
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, []);

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "44px", height: "44px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#9ca3af", fontFamily: "'Manrope', sans-serif" }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const isLearner   = role === "learner" || role === "admin" || role === "owner";
  const currentSubject = subjects.find((s) => s.id === activeSubject);
  const sidebarWidth   = sidebarOpen ? "240px" : "60px";

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #f0fdf4", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "100%", padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <img src="/logo.png" alt="Chashma Learn" style={{ width: "34px", height: "34px", objectFit: "contain" }} />
              <span style={{ fontSize: "17px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px" }}>Chashma Learn</span>
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>General English</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Dashboard</Link>
            <Link href="/courses" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>All Courses</Link>
            <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48" }}>
              {(user?.displayName || user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <div style={{ display: "flex", paddingTop: "68px" }}>

        {/* SIDEBAR */}
        <aside style={{ width: sidebarWidth, minHeight: "calc(100vh - 68px)", position: "fixed", left: 0, top: "68px", backgroundColor: "#ffffff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", transition: "width 0.25s ease", overflow: "hidden", zIndex: 40 }}>

          {/* Toggle button */}
          <div style={{ padding: "12px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: sidebarOpen ? "space-between" : "center", alignItems: "center" }}>
            {sidebarOpen && (
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>Topics</span>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #e5e7eb", backgroundColor: "#f9fafb", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              <span style={{ fontSize: "14px", color: "#6b7280" }}>{sidebarOpen ? "←" : "→"}</span>
            </button>
          </div>

          {/* Nav items */}
          <nav style={{ flex: 1, padding: "8px", overflowY: "auto", overflowX: "hidden" }}>
            {subjects.map((subject) => {
              const active = subject.id === activeSubject;
              return (
                <button
                  key={subject.id}
                  onClick={() => setActiveSubject(subject.id)}
                  title={!sidebarOpen ? subject.label : ""}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "10px",
                    padding: sidebarOpen ? "10px 12px" : "10px 0", justifyContent: sidebarOpen ? "flex-start" : "center",
                    borderRadius: "8px", marginBottom: "2px", border: "none", cursor: "pointer",
                    textAlign: "left", fontFamily: "'Manrope', sans-serif",
                    backgroundColor: active ? "#f0fdf4" : "transparent",
                    color: active ? "#036c48" : "#6b7280",
                    fontWeight: active ? 700 : 500, fontSize: "13px",
                    borderLeft: active ? "3px solid #036c48" : "3px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: "18px", flexShrink: 0 }}>{subject.icon}</span>
                  {sidebarOpen && <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{subject.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Back link */}
          {sidebarOpen && (
            <div style={{ padding: "12px 16px", borderTop: "1px solid #f3f4f6" }}>
              <Link href="/courses" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#9ca3af", textDecoration: "none" }}>
                ← All Courses
              </Link>
            </div>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ marginLeft: sidebarWidth, flex: 1, padding: "36px 40px", transition: "margin-left 0.25s ease", minWidth: 0 }}>

          {/* Viewer banner */}
          {!isLearner && (
            <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "12px 20px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "18px" }}>🔒</span>
              <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500 }}>
                You can access all books and the first 3 units free.{" "}
                <Link href="/dashboard" style={{ color: "#036c48", fontWeight: 700, textDecoration: "none" }}>Upgrade to Learner</Link>
                {" "}to unlock all units.
              </p>
            </div>
          )}

          {/* Section header */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
              <span style={{ fontSize: "28px" }}>{currentSubject.icon}</span>
              <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px" }}>
                {currentSubject.label}
              </h1>
            </div>
            <p style={{ fontSize: "13px", color: "#9ca3af", marginLeft: "40px" }}>
              {currentSubject.books.length} books available
            </p>
          </div>

          {/* Book cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
            {currentSubject.books.map((book) => {
              const lc = book.level ? (levelColor[book.level] || { bg: "#f3f4f6", color: "#6b7280" }) : null;
              return (
                <Link
                  key={book.id}
                  href={`/english/${currentSubject.id}/${book.id}`}
                  style={{ backgroundColor: "#ffffff", border: book.unified ? "2px solid #bbf7d0" : "1px solid #e5e7eb", borderRadius: "14px", overflow: "hidden", textDecoration: "none", display: "flex", flexDirection: "column", transition: "box-shadow 0.15s" }}
                >
                  {/* Book cover */}
                  <div style={{ width: "100%", aspectRatio: "3/4", backgroundColor: book.unified ? "#f0fdf4" : "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                    <img
                      src={book.cover}
                      alt={book.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                    />
                    {/* Placeholder shown when image fails */}
                    <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", backgroundColor: book.unified ? "#f0fdf4" : "#f9fafb" }}>
                      <span style={{ fontSize: "40px" }}>{currentSubject.icon}</span>
                      <span style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 600, textAlign: "center", padding: "0 12px" }}>Cover coming soon</span>
                    </div>
                    {/* Unified badge */}
                    {book.unified && (
                      <div style={{ position: "absolute", top: "8px", right: "8px", backgroundColor: "#036c48", color: "#ffffff", fontSize: "9px", fontWeight: 800, padding: "3px 8px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                        By Akrom Nabi
                      </div>
                    )}
                  </div>

                  {/* Book info */}
                  <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{book.title}</p>
                    {book.level && lc && (
                      <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: lc.bg, color: lc.color, padding: "2px 8px", borderRadius: "999px", display: "inline-block", width: "fit-content" }}>
                        {book.level}
                      </span>
                    )}
                    <p style={{ fontSize: "11px", color: "#9ca3af", lineHeight: 1.4, marginTop: "2px" }}>{book.authors}</p>
                  </div>
                </Link>
              );
            })}
          </div>

        </main>
      </div>
    </div>
  );
}
