"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getUnit } from "@/content/index";

const SIDEBAR_TABS = [
  { icon: "menu_book",            label: "Oxford Word Skills", href: "/english/oxford-word-skills" },
  { icon: "spellcheck",           label: "Grammar",            href: "/english/grammar"            },
  { icon: "translate",            label: "Vocabulary",         href: "/english/vocabulary"         },
  { icon: "record_voice_over",    label: "Pronunciation",      href: "/english/pronunciation"      },
  { icon: "link",                 label: "Collocations",       href: "/english/collocations"       },
  { icon: "format_list_bulleted", label: "Phrasal Verbs",      href: "/english/phrasal-verbs"      },
  { icon: "auto_stories",         label: "Idioms",             href: "/english/idioms"             },
  { icon: "edit_note",            label: "Writing",            href: "/english/writing"            },
];

function toLabel(slug) {
  return slug ? slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) : "";
}

function TableOfContents({ items }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    items.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [items]);
  return (
    <aside style={{ width: "216px", flexShrink: 0, position: "sticky", top: "80px", alignSelf: "flex-start", maxHeight: "calc(100vh - 100px)", overflowY: "auto", paddingLeft: "20px" }}>
      <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "12px" }}>On This Page</p>
      <nav>
        {items.map(s => (
          <a key={s.id} href={`#${s.id}`}
            onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ display: "block", paddingLeft: s.level === 2 ? "12px" : "0", paddingTop: "5px", paddingBottom: "5px", fontSize: s.level === 2 ? "12px" : "13px", fontWeight: active === s.id ? 700 : s.level === 1 ? 600 : 400, color: active === s.id ? "#036c48" : s.level === 1 ? "#374151" : "#9ca3af", textDecoration: "none", borderLeft: active === s.id ? "2px solid #036c48" : "2px solid transparent", transition: "all 0.15s", lineHeight: 1.5 }}>
            {s.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function MarkCompleteBar({ label, isDone, onMark }) {
  return (
    <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "2px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <p style={{ fontSize: "14px", color: "#6b7280" }}>
        {isDone ? `✓ ${label} marked as complete.` : `Finished? Mark ${label.toLowerCase()} as complete.`}
      </p>
      <button onClick={onMark} disabled={isDone}
        style={{ padding: "12px 28px", backgroundColor: isDone ? "#d1fae5" : "#036c48", color: isDone ? "#16a34a" : "#ffffff", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: isDone ? "default" : "pointer" }}>
        {isDone ? `✓ ${label} Completed` : "Mark as Done"}
      </button>
    </div>
  );
}

export default function UnitClient({ subject, bookId, unitId }) {
  const { user } = useAuth();
  const [activeTab,    setActiveTab]    = useState("topic");
  const [showLeft,     setShowLeft]     = useState(true);
  const [showRight,    setShowRight]    = useState(true);
  const [topicRead,    setTopicRead]    = useState(false);
  const [practiceDone, setPracticeDone] = useState(false);
  const [saving,       setSaving]       = useState(false);

  const unit = getUnit(subject, bookId, unitId);
  const { meta, tocItems, TopicContent, PracticeContent } = unit || {};
  const subjectLabel = toLabel(subject);
  const bookLabel    = toLabel(bookId);
  const unitLabel    = toLabel(unitId);

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "progress", user.uid, bookId, unitId)).then(snap => {
      if (snap.exists()) {
        setTopicRead(!!snap.data().topicCompleted);
        setPracticeDone(!!snap.data().practiceCompleted);
      }
    }).catch(() => {});
  }, [user, bookId, unitId]);

  const saveProgress = async (updates) => {
    if (!user) return;
    setSaving(true);
    try { await setDoc(doc(db, "progress", user.uid, bookId, unitId), { ...updates, updatedAt: new Date() }, { merge: true }); }
    catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleMarkRead = async () => { setTopicRead(true);    await saveProgress({ topicCompleted: true,    topicCompletedAt:    new Date() }); };
  const handleMarkDone = async () => { setPracticeDone(true); await saveProgress({ practiceCompleted: true, practiceCompletedAt: new Date() }); };

  if (!unit) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>🚧</p>
          <p style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>Content coming soon</p>
          <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "24px" }}>{subject} / {bookId} / {unitId}</p>
          <Link href={`/english/${subject}/${bookId}`} style={{ fontSize: "14px", color: "#036c48", fontWeight: 700, textDecoration: "none" }}>← Back to book</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ padding: "0 20px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
            <button onClick={() => setShowLeft(v => !v)} style={{ width: "34px", height: "34px", borderRadius: "8px", border: "1px solid #e5e7eb", backgroundColor: showLeft ? "#d1fae5" : "#f9fafb", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px", color: showLeft ? "#036c48" : "#9ca3af" }}>menu</span>
            </button>
            <Link href="/" style={{ fontSize: "17px", fontWeight: 800, color: "#064e3b", textDecoration: "none", letterSpacing: "-0.5px", flexShrink: 0 }}>Chashma Learn</Link>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", overflow: "hidden" }}>
              <span style={{ color: "#e5e7eb" }}>›</span>
              <Link href={`/english/${subject}`} style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>{subjectLabel}</Link>
              <span style={{ color: "#e5e7eb" }}>›</span>
              <Link href={`/english/${subject}/${bookId}`} style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>{bookLabel}</Link>
              <span style={{ color: "#e5e7eb" }}>›</span>
              <span style={{ color: "#374151", fontWeight: 600, whiteSpace: "nowrap" }}>{unitLabel}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            {saving       && <span style={{ fontSize: "12px", color: "#9ca3af" }}>Saving…</span>}
            {topicRead    && <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "3px 10px", borderRadius: "999px" }}>Topic ✓</span>}
            {practiceDone && <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "3px 10px", borderRadius: "999px" }}>Practice ✓</span>}
            <button onClick={() => setShowRight(v => !v)} style={{ width: "34px", height: "34px", borderRadius: "8px", border: "1px solid #e5e7eb", backgroundColor: showRight ? "#d1fae5" : "#f9fafb", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px", color: showRight ? "#036c48" : "#9ca3af" }}>toc</span>
            </button>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Dashboard</Link>
          </div>
        </div>
      </nav>

      <div style={{ display: "flex", paddingTop: "64px" }}>
        {showLeft && (
          <aside style={{ width: "260px", flexShrink: 0, height: "calc(100vh - 64px)", position: "sticky", top: "64px", backgroundColor: "#ffffff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>language</span>
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>General English</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>{subjectLabel}</p>
                </div>
              </div>
            </div>
            <nav style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
              {SIDEBAR_TABS.map((tab) => {
                const isActive = tab.href.includes(subject);
                return (
                  <Link key={tab.href} href={tab.href} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", marginBottom: "2px", textDecoration: "none", backgroundColor: isActive ? "#d1fae5" : "transparent", color: isActive ? "#036c48" : "#6b7280", fontWeight: isActive ? 700 : 500, fontSize: "14px" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{tab.icon}</span>
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
            <div style={{ padding: "16px 20px", borderTop: "1px solid #f3f4f6" }}>
              <Link href="/courses" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_back</span>
                All Modes
              </Link>
            </div>
          </aside>
        )}

        <div style={{ flex: 1, display: "flex", minWidth: 0, padding: "48px", alignItems: "flex-start" }}>
          <div style={{ flex: 1, maxWidth: showRight && activeTab === "topic" ? "680px" : "860px", minWidth: 0 }}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{meta.level}</span>
            </div>
            <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "32px" }}>{meta.title}</h1>
            <div style={{ display: "flex", gap: "16px", marginBottom: "40px" }}>
              {[{ icon: "schedule", label: "Learning Time", value: meta.time }, { icon: "quiz", label: "Exercises", value: `${meta.questions}+` }].map((m) => (
                <div key={m.label} style={{ flex: 1, backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>{m.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>{m.label}</p>
                    <p style={{ fontSize: "16px", fontWeight: 800, color: "#111827" }}>{m.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px", backgroundColor: "#f3f4f6", borderRadius: "10px", padding: "4px", marginBottom: "40px", width: "fit-content" }}>
              {[{ id: "topic", label: "Topic", icon: "menu_book" }, { id: "practice", label: "Practice", icon: "edit" }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 700, backgroundColor: activeTab === tab.id ? "#ffffff" : "transparent", color: activeTab === tab.id ? "#036c48" : "#9ca3af", boxShadow: activeTab === tab.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{tab.icon}</span>
                  {tab.label}
                  {tab.id === "topic"    && topicRead    && <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#036c48" }} />}
                  {tab.id === "practice" && practiceDone && <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#036c48" }} />}
                </button>
              ))}
            </div>
            {activeTab === "topic"    && <><TopicContent    /><MarkCompleteBar label="Topic"    isDone={topicRead}    onMark={handleMarkRead} /></>}
            {activeTab === "practice" && <><PracticeContent /><MarkCompleteBar label="Practice" isDone={practiceDone} onMark={handleMarkDone} /></>}
          </div>
          {showRight && activeTab === "topic" && tocItems && <TableOfContents items={tocItems} />}
        </div>
      </div>
    </div>
  );
}
