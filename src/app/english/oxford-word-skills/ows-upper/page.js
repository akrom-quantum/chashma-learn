"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";

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

// ─────────────────────────────────────────────
// BOOK REGISTRY — Add your books here manually
// Each book has: title, authors, level, cover,
// and sections (each section has units array)
// ─────────────────────────────────────────────
const bookRegistry = {

  // ── PRONUNCIATION ──────────────────────────
  "piu-elementary": {
    title:   "Pronunciation in Use",
    level:   "Elementary",
    authors: "Jonathan Marks",
    cover:   "/books/piu-elementary.jpg",
    subject: "pronunciation",
    sections: [
      {
        title: "Section 1 — Sounds & Letters",
        units: [
          { id: "unit-1", title: "Unit 1 — Vowel Sounds A" },
          { id: "unit-2", title: "Unit 2 — Vowel Sounds B" },
          { id: "unit-3", title: "Unit 3 — Consonant Sounds" },
          { id: "unit-4", title: "Unit 4 — Word Stress" },
        ],
      },
      {
        title: "Section 2 — Natural Speech",
        units: [
          { id: "unit-5", title: "Unit 5 — Sentence Stress"   },
          { id: "unit-6", title: "Unit 6 — Weak Forms"        },
          { id: "unit-7", title: "Unit 7 — Connected Speech"  },
          { id: "unit-8", title: "Unit 8 — Intonation Basics" },
        ],
      },
    ],
  },

  "piu-intermediate": {
    title:   "Pronunciation in Use",
    level:   "Intermediate",
    authors: "Mark Hancock",
    cover:   "/books/piu-intermediate.jpg",
    subject: "pronunciation",
    sections: [
      {
        title: "Section 1 — Phonemes",
        units: [
          { id: "unit-1", title: "Unit 1 — Short Vowels"     },
          { id: "unit-2", title: "Unit 2 — Long Vowels"      },
          { id: "unit-3", title: "Unit 3 — Diphthongs"       },
          { id: "unit-4", title: "Unit 4 — Consonant Pairs"  },
        ],
      },
      {
        title: "Section 2 — Stress & Rhythm",
        units: [
          { id: "unit-5", title: "Unit 5 — Word Stress Rules"    },
          { id: "unit-6", title: "Unit 6 — Sentence Rhythm"      },
          { id: "unit-7", title: "Unit 7 — Thought Groups"       },
          { id: "unit-8", title: "Unit 8 — Intonation Patterns"  },
        ],
      },
    ],
  },

  "piu-advanced": {
    title:   "Pronunciation in Use",
    level:   "Advanced",
    authors: "Martin Hewings",
    cover:   "/books/piu-advanced.jpg",
    subject: "pronunciation",
    sections: [
      {
        title: "Section 1 — Advanced Sounds",
        units: [
          { id: "unit-1", title: "Unit 1 — Problematic Vowels"    },
          { id: "unit-2", title: "Unit 2 — Problematic Consonants"},
          { id: "unit-3", title: "Unit 3 — Assimilation"          },
          { id: "unit-4", title: "Unit 4 — Elision"               },
        ],
      },
      {
        title: "Section 2 — Discourse & Style",
        units: [
          { id: "unit-5", title: "Unit 5 — Nuclear Stress"        },
          { id: "unit-6", title: "Unit 6 — Tone Choices"          },
          { id: "unit-7", title: "Unit 7 — Discourse Intonation"  },
          { id: "unit-8", title: "Unit 8 — Accent & Variety"      },
        ],
      },
    ],
  },

  "unified-pronunciation": {
    title:   "Unified Pronunciation Book",
    level:   null,
    authors: "Prepared by Akrom Nabi",
    cover:   "/books/unified-pronunciation.jpg",
    subject: "pronunciation",
    unified: true,
    sections: [
      {
        title: "Section 1 — Core Pronunciation",
        units: [
          { id: "unit-1", title: "Unit 1 — Introduction to Phonetics" },
          { id: "unit-2", title: "Unit 2 — Vowel Chart"               },
          { id: "unit-3", title: "Unit 3 — Consonant Chart"           },
        ],
      },
      {
        title: "Section 2 — Applied Pronunciation",
        units: [
          { id: "unit-4", title: "Unit 4 — Stress Patterns"   },
          { id: "unit-5", title: "Unit 5 — Intonation Guide"  },
          { id: "unit-6", title: "Unit 6 — Practice Dialogues"},
        ],
      },
    ],
  },

  // ── OXFORD WORD SKILLS ─────────────────────
  "ows-elementary": {
    title:   "Oxford Word Skills",
    level:   "Elementary",
    authors: "Ruth Gairns, Stuart Redman",
    cover:   "/books/ows-elementary.jpg",
    subject: "oxford-word-skills",
    sections: [
      {
        title: "Section 1 — Everyday Words",
        units: [
          { id: "unit-1", title: "Unit 1 — People & Family"   },
          { id: "unit-2", title: "Unit 2 — Daily Routines"    },
          { id: "unit-3", title: "Unit 3 — Food & Drink"      },
          { id: "unit-4", title: "Unit 4 — Places & Locations"},
        ],
      },
      {
        title: "Section 2 — Describing the World",
        units: [
          { id: "unit-5", title: "Unit 5 — Adjectives"        },
          { id: "unit-6", title: "Unit 6 — Colours & Sizes"   },
          { id: "unit-7", title: "Unit 7 — Time & Numbers"    },
          { id: "unit-8", title: "Unit 8 — Weather & Nature"  },
        ],
      },
    ],
  },

  "ows-intermediate": {
    title:   "Oxford Word Skills",
    level:   "Intermediate",
    authors: "Ruth Gairns, Stuart Redman",
    cover:   "/books/ows-intermediate.jpg",
    subject: "oxford-word-skills",
    sections: [
      {
        title: "Section 1 — Social & Work Vocabulary",
        units: [
          { id: "unit-1", title: "Unit 1 — Work & Jobs"         },
          { id: "unit-2", title: "Unit 2 — Money & Shopping"    },
          { id: "unit-3", title: "Unit 3 — Travel & Transport"  },
          { id: "unit-4", title: "Unit 4 — Health & Body"       },
        ],
      },
      {
        title: "Section 2 — Abstract Vocabulary",
        units: [
          { id: "unit-5", title: "Unit 5 — Feelings & Emotions" },
          { id: "unit-6", title: "Unit 6 — Ideas & Opinions"    },
          { id: "unit-7", title: "Unit 7 — Society & Culture"   },
          { id: "unit-8", title: "Unit 8 — Technology & Media"  },
        ],
      },
    ],
  },

  "ows-upper": {
    title:   "Oxford Word Skills",
    level:   "Upper-Intermediate & Advanced",
    authors: "Ruth Gairns, Stuart Redman",
    cover:   "/books/ows-upper.jpg",
    subject: "oxford-word-skills",
    sections: [
      {
        title: "Section 1 — Academic Vocabulary",
        units: [
          { id: "unit-1", title: "Unit 1 — Academic Word List A" },
          { id: "unit-2", title: "Unit 2 — Academic Word List B" },
          { id: "unit-3", title: "Unit 3 — Formal Language"      },
          { id: "unit-4", title: "Unit 4 — Discourse Markers"    },
        ],
      },
      {
        title: "Section 2 — Advanced Topics",
        units: [
          { id: "unit-5", title: "Unit 5 — Science & Research"   },
          { id: "unit-6", title: "Unit 6 — Law & Politics"       },
          { id: "unit-7", title: "Unit 7 — Business & Economics" },
          { id: "unit-8", title: "Unit 8 — Arts & Literature"    },
        ],
      },
    ],
  },

  "unified-word-skills": {
    title:   "Unified Word Skills Book",
    level:   null,
    authors: "Prepared by Akrom Nabi",
    cover:   "/books/unified-word-skills.jpg",
    subject: "oxford-word-skills",
    unified: true,
    sections: [
      {
        title: "Section 1 — Foundation Words",
        units: [
          { id: "unit-1", title: "Unit 1 — Core Nouns"    },
          { id: "unit-2", title: "Unit 2 — Core Verbs"    },
          { id: "unit-3", title: "Unit 3 — Core Adjectives"},
        ],
      },
      {
        title: "Section 2 — Extended Vocabulary",
        units: [
          { id: "unit-4", title: "Unit 4 — Topic Vocabulary A" },
          { id: "unit-5", title: "Unit 5 — Topic Vocabulary B" },
          { id: "unit-6", title: "Unit 6 — Review & Practice"  },
        ],
      },
    ],
  },

  // ── GRAMMAR ────────────────────────────────
  "oegc-basic": {
    title:   "Oxford English Grammar Course",
    level:   "Basic",
    authors: "Michael Swan, Catherine Walter",
    cover:   "/books/oegc-basic.jpg",
    subject: "grammar",
    sections: [
      {
        title: "Section 1 — Tenses",
        units: [
          { id: "unit-1", title: "Unit 1 — Present Simple"     },
          { id: "unit-2", title: "Unit 2 — Present Continuous" },
          { id: "unit-3", title: "Unit 3 — Past Simple"        },
          { id: "unit-4", title: "Unit 4 — Future Forms"       },
        ],
      },
      {
        title: "Section 2 — Structure",
        units: [
          { id: "unit-5", title: "Unit 5 — Questions"          },
          { id: "unit-6", title: "Unit 6 — Negatives"          },
          { id: "unit-7", title: "Unit 7 — Articles"           },
          { id: "unit-8", title: "Unit 8 — Nouns & Pronouns"   },
        ],
      },
    ],
  },

  "oegc-intermediate": {
    title:   "Oxford English Grammar Course",
    level:   "Intermediate",
    authors: "Michael Swan, Catherine Walter",
    cover:   "/books/oegc-intermediate.jpg",
    subject: "grammar",
    sections: [
      {
        title: "Section 1 — Perfect Tenses",
        units: [
          { id: "unit-1", title: "Unit 1 — Present Perfect Simple"      },
          { id: "unit-2", title: "Unit 2 — Present Perfect Continuous"  },
          { id: "unit-3", title: "Unit 3 — Past Perfect"                },
          { id: "unit-4", title: "Unit 4 — Future Perfect"              },
        ],
      },
      {
        title: "Section 2 — Complex Grammar",
        units: [
          { id: "unit-5", title: "Unit 5 — Conditionals"    },
          { id: "unit-6", title: "Unit 6 — Modal Verbs"     },
          { id: "unit-7", title: "Unit 7 — Passive Voice"   },
          { id: "unit-8", title: "Unit 8 — Reported Speech" },
        ],
      },
    ],
  },

  "oegc-advanced": {
    title:   "Oxford English Grammar Course",
    level:   "Advanced",
    authors: "Michael Swan, Catherine Walter",
    cover:   "/books/oegc-advanced.jpg",
    subject: "grammar",
    sections: [
      {
        title: "Section 1 — Advanced Structures",
        units: [
          { id: "unit-1", title: "Unit 1 — Inversion"               },
          { id: "unit-2", title: "Unit 2 — Cleft Sentences"         },
          { id: "unit-3", title: "Unit 3 — Subjunctive"             },
          { id: "unit-4", title: "Unit 4 — Participle Clauses"      },
        ],
      },
      {
        title: "Section 2 — Style & Discourse",
        units: [
          { id: "unit-5", title: "Unit 5 — Emphasis & Focus"        },
          { id: "unit-6", title: "Unit 6 — Cohesion & Reference"    },
          { id: "unit-7", title: "Unit 7 — Register & Style"        },
          { id: "unit-8", title: "Unit 8 — Academic Grammar"        },
        ],
      },
    ],
  },

  "unified-grammar": {
    title:   "Unified English Grammar Course",
    level:   null,
    authors: "Prepared by Akrom Nabi",
    cover:   "/books/unified-grammar.jpg",
    subject: "grammar",
    unified: true,
    sections: [
      {
        title: "Section 1 — Core Grammar",
        units: [
          { id: "unit-1", title: "Unit 1 — Tenses Overview"    },
          { id: "unit-2", title: "Unit 2 — Sentence Structure"  },
          { id: "unit-3", title: "Unit 3 — Common Errors"       },
        ],
      },
      {
        title: "Section 2 — Applied Grammar",
        units: [
          { id: "unit-4", title: "Unit 4 — Grammar in Writing"  },
          { id: "unit-5", title: "Unit 5 — Grammar in Speaking" },
          { id: "unit-6", title: "Unit 6 — Grammar Tests"       },
        ],
      },
    ],
  },

  // ── Add remaining books following same pattern ──
  // vocabulary, collocations, phrasal-verbs,
  // idioms, speaking, writing books go here
};

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

export default function BookPage() {
  const { subject, book: bookId } = useParams();
  const [user, setUser]           = useState(null);
  const [role, setRole]           = useState(null);
  const [loading, setLoading]     = useState(true);

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

  const bookData = bookRegistry[bookId];
  const isLearner = role === "learner" || role === "admin" || role === "owner";

  // Count total free units (first 3 across all sections)
  let unitCount = 0;

  if (!bookData) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>📚</p>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>Book not found</h2>
          <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "24px" }}>This book has not been added yet.</p>
          <Link href={`/english/oxford-word-skills`} style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "10px 24px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 700 }}>
            Back to Oxford Word Skills
          </Link>
        </div>
      </div>
    );
  }

  const lc = bookData.level ? (levelColor[bookData.level] || { bg: "#f3f4f6", color: "#6b7280" }) : null;
  const totalUnits = bookData.sections.reduce((acc, s) => acc + s.units.length, 0);

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #f0fdf4", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", flexWrap: "wrap" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <img src="/logo.png" alt="Chashma Learn" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english" style={{ color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>General English</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#111827", fontWeight: 600 }}>{bookData.title}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Dashboard</Link>
            <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48" }}>
              {(user?.displayName || user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "100px 32px 64px" }}>

        {/* Book header */}
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "32px", alignItems: "start", marginBottom: "48px" }}>

          {/* Cover */}
          <div style={{ width: "160px", aspectRatio: "3/4", backgroundColor: "#f3f4f6", borderRadius: "10px", overflow: "hidden", border: bookData.unified ? "2px solid #bbf7d0" : "1px solid #e5e7eb", flexShrink: 0 }}>
            <img
              src={bookData.cover}
              alt={bookData.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            />
            <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "36px" }}>📚</span>
              <span style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", padding: "0 8px" }}>Cover coming soon</span>
            </div>
          </div>

          {/* Info */}
          <div>
            {bookData.unified && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#036c48", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                ✓ Prepared by Akrom Nabi
              </div>
            )}
            {lc && (
              <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, backgroundColor: lc.bg, color: lc.color, padding: "3px 10px", borderRadius: "999px", marginBottom: "10px" }}>
                {bookData.level}
              </span>
            )}
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: "8px" }}>
              {bookData.title}
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>{bookData.authors}</p>
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b" }}>{bookData.sections.length}</p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>Sections</p>
              </div>
              <div>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b" }}>{totalUnits}</p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>Units</p>
              </div>
              <div>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#036c48" }}>3</p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>Free units</p>
              </div>
            </div>
          </div>
        </div>

        {/* Viewer banner */}
        {!isLearner && (
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "12px 20px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "18px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500 }}>
              Units 1–3 are free. <Link href="/dashboard" style={{ color: "#036c48", fontWeight: 700, textDecoration: "none" }}>Upgrade to Learner</Link> to unlock all {totalUnits} units.
            </p>
          </div>
        )}

        {/* Sections & Units */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {bookData.sections.map((section, si) => (
            <div key={si}>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#374151", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #f3f4f6" }}>
                {section.title}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {section.units.map((unit) => {
                  unitCount++;
                  const isFree   = unitCount <= 3;
                  const locked   = !isLearner && !isFree;
                  const unitNum  = unitCount;
                  return (
                    <Link
                      key={unit.id}
                      href={locked ? "#" : `/english/${subject}/${bookId}/${unit.id}`}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "14px 18px", backgroundColor: "#ffffff",
                        border: `1px solid ${locked ? "#f3f4f6" : "#e5e7eb"}`,
                        borderRadius: "10px", textDecoration: "none",
                        opacity: locked ? 0.6 : 1,
                        cursor: locked ? "not-allowed" : "pointer",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: locked ? "#f3f4f6" : "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: locked ? "#9ca3af" : "#036c48", flexShrink: 0 }}>
                          {unitNum}
                        </div>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: 600, color: locked ? "#9ca3af" : "#111827" }}>{unit.title}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
                            <span style={{ fontSize: "11px", color: "#9ca3af" }}>Topic · Practice</span>
                            {isFree && (
                              <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "1px 6px", borderRadius: "999px" }}>FREE</span>
                            )}
                          </div>
                        </div>
                      </div>
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
