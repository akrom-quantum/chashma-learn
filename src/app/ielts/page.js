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
  appId:             "1:1059701555295:web:104a64e41d60252a28dbea",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db   = getFirestore(app, "chashma-learn");

const skills = [
  {
    id: "listening",
    icon: "headphones",
    label: "Listening",
    color: "#7c3aed",
    lightBg: "#f5f3ff",
    sections: [
      {
        type: "Tips",
        icon: "lightbulb",
        items: [
          { title: "Part 1 Tips — Social Conversations",    desc: "Strategies for everyday social conversations and form filling" },
          { title: "Part 2 Tips — Monologues",              desc: "How to follow a single speaker in a non-academic context"       },
          { title: "Part 3 Tips — Academic Discussions",    desc: "Strategies for multi-speaker academic discussions"              },
          { title: "Part 4 Tips — Academic Lectures",       desc: "Advanced strategies for complex academic lectures"             },
        ],
      },
      {
        type: "Topics",
        icon: "topic",
        items: [
          { title: "Daily Life & Social Settings",   desc: "Common topics in Parts 1 and 2" },
          { title: "Education & Study",              desc: "University and academic topics"  },
          { title: "Work & Business",                desc: "Professional context topics"     },
          { title: "Science & Technology",           desc: "Academic lecture topics"         },
        ],
      },
      {
        type: "Practice",
        icon: "quiz",
        items: [
          { title: "Part 1 Practice — Form Filling",         desc: "20 minutes · 10 questions" },
          { title: "Part 2 Practice — Map & Diagram",        desc: "20 minutes · 10 questions" },
          { title: "Part 3 Practice — Discussion",           desc: "20 minutes · 10 questions" },
          { title: "Part 4 Practice — Lecture",              desc: "20 minutes · 10 questions" },
          { title: "Full Practice Test",                     desc: "40 minutes · 40 questions" },
        ],
      },
      {
        type: "Prediction Tests",
        icon: "predict",
        items: [
          { title: "Prediction Test 1 — Full Listening", desc: "40 minutes · 40 questions · Band scored" },
          { title: "Prediction Test 2 — Full Listening", desc: "40 minutes · 40 questions · Band scored" },
          { title: "Prediction Test 3 — Full Listening", desc: "40 minutes · 40 questions · Band scored" },
        ],
      },
    ],
  },
  {
    id: "reading",
    icon: "menu_book",
    label: "Reading",
    color: "#0369a1",
    lightBg: "#f0f9ff",
    sections: [
      {
        type: "Tips",
        icon: "lightbulb",
        items: [
          { title: "True/False/Not Given Strategy",        desc: "Master the most common IELTS question type" },
          { title: "Matching Headings Strategy",           desc: "How to match headings efficiently"          },
          { title: "Summary Completion Strategy",          desc: "Techniques for summary and note completion" },
          { title: "Multiple Choice Strategy",             desc: "Eliminating wrong answers systematically"  },
        ],
      },
      {
        type: "Topics",
        icon: "topic",
        items: [
          { title: "Environment & Climate",   desc: "Common reading passage topic" },
          { title: "Technology & Innovation", desc: "Frequent academic topic"      },
          { title: "History & Society",       desc: "Social science passages"      },
          { title: "Science & Medicine",      desc: "Scientific journal style"     },
        ],
      },
      {
        type: "Practice",
        icon: "quiz",
        items: [
          { title: "Passage 1 Practice — Easy",    desc: "20 minutes · 13 questions" },
          { title: "Passage 2 Practice — Medium",  desc: "20 minutes · 13 questions" },
          { title: "Passage 3 Practice — Hard",    desc: "20 minutes · 14 questions" },
          { title: "Full Practice Test",           desc: "60 minutes · 40 questions" },
        ],
      },
      {
        type: "Prediction Tests",
        icon: "predict",
        items: [
          { title: "Prediction Test 1 — Full Reading", desc: "60 minutes · 40 questions · Band scored" },
          { title: "Prediction Test 2 — Full Reading", desc: "60 minutes · 40 questions · Band scored" },
          { title: "Prediction Test 3 — Full Reading", desc: "60 minutes · 40 questions · Band scored" },
        ],
      },
    ],
  },
  {
    id: "speaking",
    icon: "mic",
    label: "Speaking",
    color: "#b45309",
    lightBg: "#fffbeb",
    sections: [
      {
        type: "Tips",
        icon: "lightbulb",
        items: [
          { title: "Part 1 Tips — Introduction",    desc: "How to answer personal questions naturally"     },
          { title: "Part 2 Tips — Long Turn",       desc: "How to speak for 2 minutes from a cue card"    },
          { title: "Part 3 Tips — Discussion",      desc: "Strategies for abstract analytical questions"   },
          { title: "Fluency & Coherence Tips",      desc: "How to speak smoothly without long pauses"     },
        ],
      },
      {
        type: "Topics",
        icon: "topic",
        items: [
          { title: "Part 1 Common Topics",   desc: "Home, family, work, hobbies, daily life" },
          { title: "Part 2 Cue Card Topics", desc: "Most predicted cue card topics"          },
          { title: "Part 3 Discussion Topics", desc: "Abstract and societal discussion topics" },
          { title: "Band 9 Vocabulary",      desc: "High-scoring vocabulary by topic"        },
        ],
      },
      {
        type: "Practice",
        icon: "quiz",
        items: [
          { title: "Part 1 Practice Session",   desc: "10 questions · Self-assessment" },
          { title: "Part 2 Practice Session",   desc: "5 cue cards · Timed responses"  },
          { title: "Part 3 Practice Session",   desc: "10 questions · Model answers"   },
          { title: "Full Mock Speaking Test",   desc: "All 3 parts · Band 9 samples"   },
        ],
      },
      {
        type: "Prediction Tests",
        icon: "predict",
        items: [
          { title: "Predicted Topics — Test 1", desc: "Most likely Part 1, 2, and 3 topics" },
          { title: "Predicted Topics — Test 2", desc: "Most likely Part 1, 2, and 3 topics" },
          { title: "Predicted Topics — Test 3", desc: "Most likely Part 1, 2, and 3 topics" },
        ],
      },
    ],
  },
  {
    id: "writing",
    icon: "edit_note",
    label: "Writing",
    color: "#065f46",
    lightBg: "#f0fdf4",
    sections: [
      {
        type: "Tips",
        icon: "lightbulb",
        items: [
          { title: "Task 1 Tips — Charts & Graphs",   desc: "How to describe visual data accurately"        },
          { title: "Task 1 Tips — Processes & Maps",  desc: "Describing processes and map changes"          },
          { title: "Task 2 Tips — Essay Structure",   desc: "Introduction, body, conclusion framework"      },
          { title: "Task 2 Tips — Argument Types",    desc: "Opinion, discussion, problem-solution essays"  },
        ],
      },
      {
        type: "Topics",
        icon: "topic",
        items: [
          { title: "Task 1 Common Chart Types",   desc: "Bar, line, pie, table, process, map" },
          { title: "Task 2 Common Topics",        desc: "Environment, technology, education"  },
          { title: "Band 9 Vocabulary for Writing", desc: "Academic phrases and connectors"   },
          { title: "Grammar for Writing",         desc: "Complex structures that score high"  },
        ],
      },
      {
        type: "Practice",
        icon: "quiz",
        items: [
          { title: "Task 1 Practice — Bar Chart",   desc: "20 minutes · Band 9 model answer" },
          { title: "Task 1 Practice — Line Graph",  desc: "20 minutes · Band 9 model answer" },
          { title: "Task 2 Practice — Opinion",     desc: "40 minutes · Band 9 model answer" },
          { title: "Task 2 Practice — Discussion",  desc: "40 minutes · Band 9 model answer" },
        ],
      },
      {
        type: "Prediction Tests",
        icon: "predict",
        items: [
          { title: "Prediction Test 1 — Full Writing", desc: "Task 1 + Task 2 · Band scored" },
          { title: "Prediction Test 2 — Full Writing", desc: "Task 1 + Task 2 · Band scored" },
          { title: "Prediction Test 3 — Full Writing", desc: "Task 1 + Task 2 · Band scored" },
        ],
      },
    ],
  },
];

export default function IELTSPage() {
  const [user, setUser]             = useState(null);
  const [role, setRole]             = useState(null);
  const [loading, setLoading]       = useState(true);
  const [activeSkill, setActiveSkill] = useState("listening");
  const [activeSection, setActiveSection] = useState("Tips");

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) {
          window.location.href = "/login";
          return;
        }
        try {
          const ref  = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(ref);
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

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const isLearner = role === "learner" || role === "admin" || role === "owner";
  const currentSkill = skills.find((s) => s.id === activeSkill);
  const currentSection = currentSkill.sections.find((s) => s.type === activeSection);

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none" }}>
              Chashma Learn
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>IELTS Academic</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/dashboard" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Dashboard</Link>
            <span style={{
              fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase",
              backgroundColor: role === "owner" ? "#fef3c7" : role === "admin" ? "#dbeafe" : role === "learner" ? "#d1fae5" : "#f3f4f6",
              color: role === "owner" ? "#92400e" : role === "admin" ? "#1d4ed8" : role === "learner" ? "#036c48" : "#6b7280",
            }}>
              {role}
            </span>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: "64px" }}>

        {/* Viewer banner */}
        {!isLearner && (
          <div style={{ backgroundColor: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "12px 32px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="material-symbols-outlined" style={{ color: "#d97706", fontSize: "18px" }}>lock</span>
            <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 500 }}>
              IELTS is a premium track — <Link href="/dashboard" style={{ color: "#036c48", fontWeight: 700 }}>upgrade to Learner</Link> to access all content.
            </p>
          </div>
        )}

        {/* Skill tabs */}
        <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb", padding: "0 32px", display: "flex", gap: "4px" }}>
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => { setActiveSkill(skill.id); setActiveSection("Tips"); }}
              style={{
                padding: "16px 24px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 600,
                fontFamily: "'Manrope', sans-serif", backgroundColor: "transparent",
                color: activeSkill === skill.id ? skill.color : "#6b7280",
                borderBottom: activeSkill === skill.id ? `2px solid ${skill.color}` : "2px solid transparent",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{skill.icon}</span>
              {skill.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {!isLearner ? (
          <div style={{ maxWidth: "600px", margin: "80px auto", textAlign: "center", padding: "0 32px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "999px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "32px", color: "#9ca3af" }}>lock</span>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginBottom: "12px" }}>IELTS Content is Locked</h2>
            <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.6, marginBottom: "24px" }}>
              All IELTS materials are available for Learners only. Contact the admin to upgrade your account.
            </p>
            <Link href="/dashboard" style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
              Back to Dashboard
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex" }}>

            {/* Sub-section sidebar */}
            <aside style={{ width: "200px", height: "calc(100vh - 113px)", position: "sticky", top: "113px", backgroundColor: "#ffffff", borderRight: "1px solid #e5e7eb", padding: "16px 8px", flexShrink: 0 }}>
              {currentSkill.sections.map((section) => (
                <button
                  key={section.type}
                  onClick={() => setActiveSection(section.type)}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: "8px", border: "none",
                    cursor: "pointer", textAlign: "left", fontSize: "13px", fontWeight: 600,
                    fontFamily: "'Manrope', sans-serif", marginBottom: "2px",
                    backgroundColor: activeSection === section.type ? currentSkill.lightBg : "transparent",
                    color: activeSection === section.type ? currentSkill.color : "#6b7280",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{section.icon}</span>
                  {section.type}
                </button>
              ))}
            </aside>

            {/* Content area */}
            <main style={{ flex: 1, padding: "32px 40px" }}>
              <div style={{ marginBottom: "28px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#111827", marginBottom: "6px" }}>
                  {currentSkill.label} — {activeSection}
                </h2>
                <p style={{ fontSize: "13px", color: "#9ca3af" }}>
                  {currentSection.items.length} items available
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                {currentSection.items.map((item, i) => (
                  <Link
                    key={i}
                    href={`/ielts/${activeSkill}/${activeSection.toLowerCase().replace(" ", "-")}/${i + 1}`}
                    style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: currentSkill.lightBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: currentSkill.color, flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>{item.title}</p>
                        <p style={{ fontSize: "12px", color: "#9ca3af" }}>{item.desc}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#d1d5db", flexShrink: 0 }}>chevron_right</span>
                  </Link>
                ))}
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
