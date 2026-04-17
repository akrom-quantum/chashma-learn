"use client";

// src/components/shell/PageShell.js
// Universal layout for every content-rendering page. Handles left nav, right TOC,
// breadcrumb, tabs, and completion bar. Shape-specific differences are props.

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import Breadcrumb from "./Breadcrumb";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import TabBar from "./TabBar";
import CompletionBar from "./CompletionBar";

export default function PageShell({
  // Navigation context
  product,                // "english" | "ielts" | "sat"
  subject,                // subject slug
  book,                   // optional — only for Book-Unit
  breadcrumb,             // [{ label, href }, ...]

  // Content context
  shape,                  // "book-unit" | "topic" | "guide" | "test" | "index"
  title,
  meta,                   // { level, time, ... }
  tocItems,               // [{ id, label, level }]

  // Tab configuration
  tabs,                   // [{ id, label, completed }] — omit for no-tab shapes
  activeTab,
  onTabChange,

  // Completion
  progressKey,            // e.g. "unified-grammar/unit-1"
  completionType,         // "read" | "done" | "both"
  onMarkComplete,

  // Content
  children,
}) {
  const { user } = useAuth();
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  // Responsive: collapse sidebars on narrow screens
  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 1024) {
        setLeftOpen(false);
        setRightOpen(false);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fafbfc", fontFamily: "Manrope, sans-serif" }}>
      {/* Top breadcrumb bar */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "12px 24px",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setLeftOpen(v => !v)}
              aria-label="Toggle sidebar"
              style={iconBtn}
            >☰</button>
            <Breadcrumb items={breadcrumb} />
          </div>
          {tocItems?.length > 0 && (
            <button
              onClick={() => setRightOpen(v => !v)}
              aria-label="Toggle TOC"
              style={iconBtn}
            >≡</button>
          )}
        </div>
      </div>

      {/* Three-column layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `${leftOpen ? "260px" : "0"} 1fr ${rightOpen && tocItems?.length ? "240px" : "0"}`,
        transition: "grid-template-columns 0.2s ease",
        minHeight: "calc(100vh - 57px)",
      }}>
        <LeftSidebar open={leftOpen} product={product} subject={subject} book={book} />

        <main style={{ padding: "32px 40px", minWidth: 0, overflow: "hidden" }}>
          {/* Title + meta */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 8px", color: "#111827" }}>
              {title}
            </h1>
            {meta && (
              <div style={{ display: "flex", gap: 12, fontSize: 14, color: "#6b7280" }}>
                {meta.level && <MetaPill>{meta.level}</MetaPill>}
                {meta.time && <MetaPill>⏱ {meta.time}</MetaPill>}
                {meta.questions && <MetaPill>{meta.questions} questions</MetaPill>}
              </div>
            )}
          </div>

          {/* Tabs (if any) */}
          {tabs && tabs.length > 0 && (
            <TabBar tabs={tabs} active={activeTab} onChange={onTabChange} />
          )}

          {/* Main content */}
          <div style={{ background: "#fff", borderRadius: 8, padding: 32, marginTop: tabs?.length ? 16 : 0 }}>
            {children}
          </div>

          {/* Completion bar */}
          {user && completionType && (
            <CompletionBar
              progressKey={progressKey}
              type={completionType}
              activeTab={activeTab}
              onMarkComplete={onMarkComplete}
            />
          )}
        </main>

        <RightSidebar open={rightOpen && tocItems?.length > 0} items={tocItems} />
      </div>
    </div>
  );
}

function MetaPill({ children }) {
  return (
    <span style={{
      background: "#f3f4f6",
      padding: "4px 10px",
      borderRadius: 6,
      fontSize: 13,
    }}>{children}</span>
  );
}

const iconBtn = {
  background: "transparent",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  width: 36,
  height: 36,
  cursor: "pointer",
  fontSize: 16,
};
