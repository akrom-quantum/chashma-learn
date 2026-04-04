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
// BOOK DATA — English Phrasal Verbs in Use: Intermediate
// ─────────────────────────────────────────────────────────────────────────────
const bookData = {
  title:   "English Phrasal Verbs in Use",
  level:   "Intermediate",
  authors: "Michael McCarthy, Felicity O'Dell",
  cover:   "/books/pviu-intermediate.jpg",
  subject: "phrasal-verbs",
  bookId:  "pviu-intermediate",
  sections: [
    {
      title: "Section 1 — Learning about Phrasal Verbs",
      units: [
        { id: "unit-1",  title: "Unit 1 — Phrasal verbs: the basics"                   },
        { id: "unit-2",  title: "Unit 2 — Phrasal verbs: what they mean"               },
        { id: "unit-3",  title: "Unit 3 — Particles in phrasal verbs"                  },
        { id: "unit-4",  title: "Unit 4 — Nouns and adjectives based on phrasal verbs" },
        { id: "unit-5",  title: "Unit 5 — Metaphor and register"                       },
      ],
    },
    {
      title: "Section 2 — Key Verbs",
      units: [
        { id: "unit-6",  title: "Unit 6 — Come"  },
        { id: "unit-7",  title: "Unit 7 — Get"   },
        { id: "unit-8",  title: "Unit 8 — Go"    },
        { id: "unit-9",  title: "Unit 9 — Look"  },
        { id: "unit-10", title: "Unit 10 — Make" },
        { id: "unit-11", title: "Unit 11 — Put"  },
        { id: "unit-12", title: "Unit 12 — Take" },
      ],
    },
    {
      title: "Section 3 — Key Particles",
      units: [
        { id: "unit-13", title: "Unit 13 — Up"               },
        { id: "unit-14", title: "Unit 14 — Out"              },
        { id: "unit-15", title: "Unit 15 — Off"              },
        { id: "unit-16", title: "Unit 16 — On and in"        },
        { id: "unit-17", title: "Unit 17 — Down and over"    },
        { id: "unit-18", title: "Unit 18 — Around and about" },
        { id: "unit-19", title: "Unit 19 — For and with"     },
        { id: "unit-20", title: "Unit 20 — Through and back" },
        { id: "unit-21", title: "Unit 21 — Into and away"    },
      ],
    },
    {
      title: "Section 4 — Concepts",
      units: [
        { id: "unit-22", title: "Unit 22 — Time: spending time"                    },
        { id: "unit-23", title: "Unit 23 — Time: passing of time"                  },
        { id: "unit-24", title: "Unit 24 — Location"                               },
        { id: "unit-25", title: "Unit 25 — Cause and effect"                       },
        { id: "unit-26", title: "Unit 26 — Change"                                 },
        { id: "unit-27", title: "Unit 27 — Success and failure"                    },
        { id: "unit-28", title: "Unit 28 — Starting and finishing"                 },
        { id: "unit-29", title: "Unit 29 — Actions and movement"                   },
        { id: "unit-30", title: "Unit 30 — Destroying and reacting to destruction" },
        { id: "unit-31", title: "Unit 31 — Communication"                          },
      ],
    },
    {
      title: "Section 5 — Functions",
      units: [
        { id: "unit-32", title: "Unit 32 — Describing people and places"   },
        { id: "unit-33", title: "Unit 33 — Describing public events"       },
        { id: "unit-34", title: "Unit 34 — Describing situations"          },
        { id: "unit-35", title: "Unit 35 — Giving and getting information" },
        { id: "unit-36", title: "Unit 36 — Solving problems"               },
        { id: "unit-37", title: "Unit 37 — Decisions and plans"            },
        { id: "unit-38", title: "Unit 38 — Disagreeing"                    },
        { id: "unit-39", title: "Unit 39 — Persuading"                     },
        { id: "unit-40", title: "Unit 40 — Praising and criticising"       },
        { id: "unit-41", title: "Unit 41 — Exclamations and warnings"      },
      ],
    },
    {
      title: "Section 6 — Work, Study and Finance",
      units: [
        { id: "unit-42", title: "Unit 42 — The classroom and learning"       },
        { id: "unit-43", title: "Unit 43 — Student life: courses and exams"  },
        { id: "unit-44", title: "Unit 44 — Student life: reading and writing" },
        { id: "unit-45", title: "Unit 45 — Work: jobs and career"            },
        { id: "unit-46", title: "Unit 46 — Work: being busy"                 },
        { id: "unit-47", title: "Unit 47 — Money: salaries, bills, payments" },
        { id: "unit-48", title: "Unit 48 — Money: buying and selling"        },
        { id: "unit-49", title: "Unit 49 — Business"                         },
        { id: "unit-50", title: "Unit 50 — Telephoning"                      },
      ],
    },
    {
      title: "Section 7 — Personal Life",
      units: [
        { id: "unit-51", title: "Unit 51 — Feelings"               },
        { id: "unit-52", title: "Unit 52 — Relationships"          },
        { id: "unit-53", title: "Unit 53 — Relationships: problems" },
        { id: "unit-54", title: "Unit 54 — Secrets and conversations" },
        { id: "unit-55", title: "Unit 55 — Stages through life"    },
        { id: "unit-56", title: "Unit 56 — Health"                 },
        { id: "unit-57", title: "Unit 57 — Sport"                  },
        { id: "unit-58", title: "Unit 58 — Homes and daily routines" },
        { id: "unit-59", title: "Unit 59 — Socialising"            },
        { id: "unit-60", title: "Unit 60 — Food and drink"         },
      ],
    },
    {
      title: "Section 8 — The World Around Us",
      units: [
        { id: "unit-61", title: "Unit 61 — Weather"                            },
        { id: "unit-62", title: "Unit 62 — Travel"                             },
        { id: "unit-63", title: "Unit 63 — Driving"                            },
        { id: "unit-64", title: "Unit 64 — Technology"                         },
        { id: "unit-65", title: "Unit 65 — Computers"                          },
        { id: "unit-66", title: "Unit 66 — News"                               },
        { id: "unit-67", title: "Unit 67 — Crime"                              },
        { id: "unit-68", title: "Unit 68 — Power and authority"                },
        { id: "unit-69", title: "Unit 69 — American and Australian phrasal verbs" },
        { id: "unit-70", title: "Unit 70 — New phrasal verbs"                  },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// LEVEL BADGE COLOURS
// ─────────────────────────────────────────────────────────────────────────────
const levelColor = {
  "Intermediate": { bg: "#d1fae5", color: "#036c48" },
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PVIUIntermediatePage() {
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        try {
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          setRole(snap.exists() ? snap.data().role : "viewer");
        } catch {
          setRole("viewer");
        }
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, []);

  // ── Loading spinner ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        fontFamily: "'Manrope', sans-serif",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "44px", height: "44px",
            border: "3px solid #d1fae5",
            borderTop: "3px solid #036c48",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px",
          }} />
          <p style={{ fontSize: "14px", color: "#9ca3af", fontFamily: "'Manrope', sans-serif" }}>
            Loading...
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Derived values ─────────────────────────────────────────────────────────
  const isLearner  = role === "learner" || role === "admin" || role === "owner";
  const lc         = levelColor[bookData.level] || { bg: "#f3f4f6", color: "#6b7280" };
  const totalUnits = bookData.sections.reduce((acc, s) => acc + s.units.length, 0);

  // Running unit counter across all sections (reset per render, not per section)
  let unitCounter = 0;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{
        backgroundColor: "rgba(255,255,255,0.95)",
        borderBottom: "1px solid #f0fdf4",
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{
          padding: "0 32px", height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", flexWrap: "wrap" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <img src="/logo.png" alt="Chashma Learn" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>
              General English
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link
              href="/english/phrasal-verbs"
              style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}
            >
              Phrasal Verbs
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#111827", fontWeight: 600 }}>{bookData.title}</span>
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>
              Dashboard
            </Link>
            <div style={{
              width: "32px", height: "32px", borderRadius: "999px",
              backgroundColor: "#d1fae5",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px", fontWeight: 700, color: "#036c48",
            }}>
              {(user?.displayName || user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "100px 32px 64px" }}>

        {/* ── Book header ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          gap: "32px",
          alignItems: "start",
          marginBottom: "48px",
        }}>

          {/* Cover */}
          <div style={{
            width: "160px", aspectRatio: "3/4",
            backgroundColor: "#f3f4f6",
            borderRadius: "10px", overflow: "hidden",
            border: "1px solid #e5e7eb",
            flexShrink: 0,
          }}>
            <img
              src={bookData.cover}
              alt={bookData.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div style={{
              display: "none", width: "100%", height: "100%",
              alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: "6px",
            }}>
              <span style={{ fontSize: "36px" }}>📚</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px" }}>
                Cover coming soon
              </span>
            </div>
          </div>

          {/* Info */}
          <div>
            {/* Level badge */}
            <span style={{
              display: "inline-block", fontSize: "11px", fontWeight: 700,
              backgroundColor: lc.bg, color: lc.color,
              padding: "3px 10px", borderRadius: "999px", marginBottom: "10px",
            }}>
              {bookData.level}
            </span>

            <h1 style={{
              fontSize: "28px", fontWeight: 800, color: "#064e3b",
              letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: "8px",
            }}>
              {bookData.title}
            </h1>

            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
              {bookData.authors}
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b" }}>
                  {bookData.sections.length}
                </p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>Sections</p>
              </div>
              <div>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b" }}>
                  {totalUnits}
                </p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>Units</p>
              </div>
              <div>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#036c48" }}>3</p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>Free units</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Viewer upgrade banner ── */}
        {!isLearner && (
          <div style={{
            backgroundColor: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: "10px",
            padding: "12px 20px",
            marginBottom: "32px",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <span style={{ fontSize: "18px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500 }}>
              Units 1–3 are free.{" "}
              <Link
                href="/dashboard"
                style={{ color: "#036c48", fontWeight: 700, textDecoration: "none" }}
              >
                Upgrade to Learner
              </Link>{" "}
              to unlock all {totalUnits} units.
            </p>
          </div>
        )}

        {/* ── Sections & Units ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {bookData.sections.map((section, si) => (
            <div key={si}>
              {/* Section heading */}
              <h2 style={{
                fontSize: "15px", fontWeight: 700, color: "#374151",
                marginBottom: "12px", paddingBottom: "8px",
                borderBottom: "1px solid #f3f4f6",
              }}>
                {section.title}
              </h2>

              {/* Unit rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {section.units.map((unit) => {
                  unitCounter++;
                  const isFree  = unitCounter <= 3;
                  const locked  = !isLearner && !isFree;
                  const unitNum = unitCounter;

                  return (
                    <Link
                      key={unit.id}
                      href={
                        locked
                          ? "#"
                          : `/english/phrasal-verbs/pviu-intermediate/${unit.id}`
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 18px",
                        backgroundColor: "#ffffff",
                        border: `1px solid ${locked ? "#f3f4f6" : "#e5e7eb"}`,
                        borderRadius: "10px",
                        textDecoration: "none",
                        opacity: locked ? 0.6 : 1,
                        cursor: locked ? "not-allowed" : "pointer",
                        transition: "box-shadow 0.15s ease, border-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!locked) {
                          e.currentTarget.style.boxShadow = "0 2px 8px rgba(3,108,72,0.08)";
                          e.currentTarget.style.borderColor = "#bbf7d0";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = locked ? "#f3f4f6" : "#e5e7eb";
                      }}
                    >
                      {/* Left: number badge + title */}
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{
                          width: "36px", height: "36px",
                          borderRadius: "8px",
                          backgroundColor: locked ? "#f3f4f6" : "#f0fdf4",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "13px", fontWeight: 800,
                          color: locked ? "#9ca3af" : "#036c48",
                          flexShrink: 0,
                        }}>
                          {unitNum}
                        </div>
                        <div>
                          <p style={{
                            fontSize: "14px", fontWeight: 600,
                            color: locked ? "#9ca3af" : "#111827",
                          }}>
                            {unit.title}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
                            <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                              Topic · Practice
                            </span>
                            {isFree && (
                              <span style={{
                                fontSize: "10px", fontWeight: 700,
                                backgroundColor: "#d1fae5", color: "#036c48",
                                padding: "1px 6px", borderRadius: "999px",
                              }}>
                                FREE
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: lock or arrow */}
                      <div style={{ flexShrink: 0 }}>
                        {locked ? (
                          <span style={{ fontSize: "16px" }}>🔒</span>
                        ) : (
                          <span style={{ fontSize: "18px", color: "#d1d5db" }}>›</span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
