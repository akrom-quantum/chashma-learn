"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

// ─────────────────────────────────────────────
// STYLE COMPONENTS
// ─────────────────────────────────────────────
function Note({ children })    { return <div style={{ backgroundColor: "#f0f9ff", border: "1px solid #bae6fd", borderLeft: "4px solid #0284c7", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#0284c7", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Note</p><div style={{ fontSize: "15px", color: "#0c4a6e", lineHeight: 1.7 }}>{children}</div></div>; }
function Warning({ children }) { return <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderLeft: "4px solid #f59e0b", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#b45309", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>⚠️ Warning</p><div style={{ fontSize: "15px", color: "#78350f", lineHeight: 1.7 }}>{children}</div></div>; }
function Tip({ children })     { return <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderLeft: "4px solid #16a34a", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>💡 Tip</p><div style={{ fontSize: "15px", color: "#14532d", lineHeight: 1.7 }}>{children}</div></div>; }
function Info({ children })    { return <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #ddd6fe", borderLeft: "4px solid #7c3aed", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#6d28d9", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>ℹ️ Info</p><div style={{ fontSize: "15px", color: "#2e1065", lineHeight: 1.7 }}>{children}</div></div>; }
function Danger({ children })  { return <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderLeft: "4px solid #dc2626", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#b91c1c", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>🚫 Important</p><div style={{ fontSize: "15px", color: "#7f1d1d", lineHeight: 1.7 }}>{children}</div></div>; }
function Success({ children }) { return <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderLeft: "4px solid #036c48", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#036c48", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>✅ Correct</p><div style={{ fontSize: "15px", color: "#064e3b", lineHeight: 1.7 }}>{children}</div></div>; }
function Failure({ children }) { return <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderLeft: "4px solid #dc2626", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#b91c1c", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>❌ Wrong</p><div style={{ fontSize: "15px", color: "#7f1d1d", lineHeight: 1.7 }}>{children}</div></div>; }
function Abstract({ children }){ return <div style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #475569", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>📋 Overview</p><div style={{ fontSize: "15px", color: "#1e293b", lineHeight: 1.7 }}>{children}</div></div>; }
function Example({ children }) { return <div style={{ backgroundColor: "#fdf4ff", border: "1px solid #f0abfc", borderLeft: "4px solid #a21caf", borderRadius: "0 10px 10px 0", padding: "16px 20px", margin: "20px 0" }}><p style={{ fontSize: "13px", fontWeight: 700, color: "#86198f", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>📌 Example</p><div style={{ fontSize: "15px", color: "#4a044e", lineHeight: 1.7 }}>{children}</div></div>; }

function Quote({ children, author }) {
  return (
    <blockquote style={{ borderLeft: "3px solid #d1fae5", paddingLeft: "20px", margin: "24px 0", fontStyle: "italic" }}>
      <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.7 }}>{children}</p>
      {author && <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "8px", fontStyle: "normal", fontWeight: 600 }}>— {author}</p>}
    </blockquote>
  );
}

function H2({ children }) { return <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px", marginTop: "40px", marginBottom: "16px", paddingBottom: "8px", borderBottom: "2px solid #f0fdf4" }}>{children}</h2>; }
function H3({ children }) { return <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", marginTop: "28px", marginBottom: "12px" }}>{children}</h3>; }
function P({ children })  { return <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.8, marginBottom: "16px" }}>{children}</p>; }
function Bold({ children }){ return <strong style={{ fontWeight: 700, color: "#111827" }}>{children}</strong>; }
function Em({ children })  { return <em style={{ fontStyle: "italic", color: "#374151" }}>{children}</em>; }
function Code({ children }){ return <code style={{ backgroundColor: "#f3f4f6", padding: "2px 6px", borderRadius: "4px", fontSize: "14px", fontFamily: "monospace", color: "#036c48" }}>{children}</code>; }

function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto", margin: "20px 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0fdf4", borderBottom: "2px solid #bbf7d0" }}>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "#064e3b", fontSize: "13px" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: "1px solid #f3f4f6", backgroundColor: ri % 2 === 0 ? "#ffffff" : "#fafafa" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "10px 14px", color: "#374151", lineHeight: 1.5 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UL({ items }) {
  return (
    <ul style={{ margin: "12px 0 16px 0", paddingLeft: "0", listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px", fontSize: "15px", color: "#374151", lineHeight: 1.6 }}>
          <span style={{ color: "#036c48", fontWeight: 700, marginTop: "2px", flexShrink: 0 }}>•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function OL({ items }) {
  return (
    <ol style={{ margin: "12px 0 16px 0", paddingLeft: "0", listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px", fontSize: "15px", color: "#374151", lineHeight: 1.6 }}>
          <span style={{ color: "#036c48", fontWeight: 700, minWidth: "24px", flexShrink: 0 }}>{i + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

// ─────────────────────────────────────────────
// UNIT NAVIGATION REGISTRY
// ─────────────────────────────────────────────
const unitRegistry = {
  "unit-1": { title: "Unit 1", prev: null,     next: "unit-2" },
  "unit-2": { title: "Unit 2", prev: "unit-1", next: "unit-3" },
  "unit-3": { title: "Unit 3", prev: "unit-2", next: "unit-4" },
  "unit-4": { title: "Unit 4", prev: "unit-3", next: "unit-5" },
  "unit-5": { title: "Unit 5", prev: "unit-4", next: "unit-6" },
  "unit-6": { title: "Unit 6", prev: "unit-5", next: "unit-7" },
  "unit-7": { title: "Unit 7", prev: "unit-6", next: "unit-8" },
  "unit-8": { title: "Unit 8", prev: "unit-7", next: null     },
};

// ─────────────────────────────────────────────
// CONTENT — paste converted JSX here per unit
// ─────────────────────────────────────────────

function TopicContent({ unitId }) {
  if (unitId === "unit-1") {
    return (
      <div>
        <Abstract>
          <P>Unit 1 topic content goes here. Paste your converted JSX content below this line.</P>
        </Abstract>
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <p style={{ fontSize: "32px", marginBottom: "12px" }}>📝</p>
      <p style={{ fontSize: "15px", color: "#9ca3af" }}>Content for this unit is coming soon.</p>
    </div>
  );
}

function PracticeContent({ unitId }) {
  if (unitId === "unit-1") {
    return (
      <div>
        <Info>
          <P>Unit 1 practice content goes here. Paste your converted JSX exercises below this line.</P>
        </Info>
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <p style={{ fontSize: "32px", marginBottom: "12px" }}>✍️</p>
      <p style={{ fontSize: "15px", color: "#9ca3af" }}>Practice exercises for this unit are coming soon.</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN CLIENT COMPONENT
// ─────────────────────────────────────────────
export default function UnitClient({ subject, book, unitId }) {
  const [user, setUser]           = useState(null);
  const [role, setRole]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState("topic");

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

  const isLearner = role === "learner" || role === "admin" || role === "owner";
  const unitNum   = parseInt(unitId?.replace("unit-", "") || "1");
  const isFree    = unitNum <= 3;
  const locked    = !isLearner && !isFree;
  const unitNav   = unitRegistry[unitId] || {};

  if (locked) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "400px", padding: "40px" }}>
          <div style={{ width: "72px", height: "72px", backgroundColor: "#f3f4f6", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "32px" }}>🔒</div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginBottom: "10px" }}>This unit is locked</h2>
          <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.6, marginBottom: "28px" }}>
            Units 1–3 are free. Upgrade to Learner to unlock all units in this book.
          </p>
          <Link href="/dashboard" style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none", display: "inline-block", marginBottom: "12px" }}>
            Upgrade to Learner
          </Link>
          <br />
          <Link href={`/english/${subject}/${book}`} style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "none" }}>
            ← Back to book contents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #f0fdf4", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", flexWrap: "wrap" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <img src="/logo.png" alt="Chashma Learn" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english" style={{ color: "#6b7280", textDecoration: "none" }}>General English</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href={`/english/${subject}/${book}`} style={{ color: "#6b7280", textDecoration: "none" }}>Contents</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#111827", fontWeight: 600 }}>{unitRegistry[unitId]?.title || unitId}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: isFree ? "#fef9c3" : "#d1fae5", color: isFree ? "#854d0e" : "#036c48", padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase" }}>
              {isFree ? "Free" : "Learner"}
            </span>
            <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48" }}>
              {(user?.displayName || user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "88px 32px 80px" }}>

        {/* Unit header */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
            {subject?.replace(/-/g, " ")} · {book?.replace(/-/g, " ")}
          </p>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#064e3b", letterSpacing: "-1px", lineHeight: 1.1 }}>
            {unitRegistry[unitId]?.title || unitId}
          </h1>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: "4px", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "4px", marginBottom: "36px", width: "fit-content" }}>
          {[
            { id: "topic",    label: "Topic",    icon: "📖" },
            { id: "practice", label: "Practice", icon: "✍️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "9px 22px", borderRadius: "7px", border: "none", cursor: "pointer",
                fontSize: "14px", fontWeight: 600, fontFamily: "'Manrope', sans-serif",
                display: "flex", alignItems: "center", gap: "7px",
                backgroundColor: activeTab === tab.id ? "#036c48" : "transparent",
                color: activeTab === tab.id ? "#ffffff" : "#6b7280",
                transition: "all 0.15s",
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "40px 48px", minHeight: "400px" }}>
        
          {activeTab === "topic"    && <TopicContent    unitId={unitId} />}
          {activeTab === "practice" && <PracticeContent unitId={unitId} />}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", gap: "16px" }}>
          {unitNav.prev ? (
            <Link
              href={`/english/${subject}/${book}/${unitNav.prev}`}
              style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px 20px", flex: 1 }}
            >
              <span style={{ fontSize: "20px", color: "#9ca3af" }}>←</span>
              <div>
                <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>Previous</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{unitRegistry[unitNav.prev]?.title}</p>
              </div>
            </Link>
          ) : <div style={{ flex: 1 }} />}

          {unitNav.next ? (
            <Link
              href={`/english/${subject}/${book}/${unitNav.next}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", textDecoration: "none", backgroundColor: "#036c48", border: "none", borderRadius: "10px", padding: "14px 20px", flex: 1 }}
            >
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "11px", color: "#6ee7b7", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>Next</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>{unitRegistry[unitNav.next]?.title}</p>
              </div>
              <span style={{ fontSize: "20px", color: "#6ee7b7" }}>→</span>
            </Link>
          ) : (
            <Link
              href={`/english/${subject}/${book}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "14px 20px", flex: 1 }}
            >
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#036c48" }}>✓ Back to Contents</p>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
