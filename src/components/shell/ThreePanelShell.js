"use client";

import { useState, useEffect } from "react";

export default function ThreePanelShell({ sidebar, toc, children }) {
  const [leftOpen,  setLeftOpen]  = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 1024) { setLeftOpen(false);  setRightOpen(false); }
      else if (window.innerWidth < 1280) { setRightOpen(false); }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const showRight = !!toc && rightOpen;

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f8", fontFamily: "Manrope, sans-serif", display: "flex" }}>

      {/* Left panel */}
      <aside style={{
        width: leftOpen ? 256 : 0,
        flexShrink: 0,
        overflow: "hidden",
        transition: "width 0.2s ease",
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
      }}>
        <div style={{ width: 256 }}>
          {/* Sidebar collapse button */}
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "12px 12px 0",
          }}>
            <button
              onClick={() => setLeftOpen(false)}
              style={iconBtn}
              aria-label="Close sidebar"
              title="Close sidebar"
            >
              <CollapseLeftIcon />
            </button>
          </div>
          {sidebar}
        </div>
      </aside>

      {/* Expand sidebar button — visible when sidebar is closed */}
      {!leftOpen && (
        <button
          onClick={() => setLeftOpen(true)}
          style={{
            ...iconBtn,
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 40,
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          }}
          aria-label="Open sidebar"
          title="Open sidebar"
        >
          <ExpandLeftIcon />
        </button>
      )}

      {/* Main content */}
      <main id="shell-content" style={{ flex: 1, minWidth: 0 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 32px 80px" }}>
          {children}
        </div>
      </main>

      {/* Right panel */}
      <aside style={{
        width: showRight ? 232 : 0,
        flexShrink: 0,
        overflow: "hidden",
        transition: "width 0.2s ease",
        background: "#fff",
        borderLeft: "1px solid #e5e7eb",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
      }}>
        <div style={{ width: 232, padding: "28px 16px" }}>
          {/* TOC collapse button */}
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
            <button
              onClick={() => setRightOpen(false)}
              style={iconBtn}
              aria-label="Close table of contents"
              title="Close table of contents"
            >
              <CollapseRightIcon />
            </button>
          </div>
          {toc}
        </div>
      </aside>

      {/* Expand TOC button — visible when TOC is closed */}
      {toc && !rightOpen && (
        <button
          onClick={() => setRightOpen(true)}
          style={{
            ...iconBtn,
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 40,
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          }}
          aria-label="Open table of contents"
          title="Open table of contents"
        >
          <ExpandRightIcon />
        </button>
      )}

    </div>
  );
}

function CollapseLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="9,2 4,7 9,12" />
    </svg>
  );
}

function ExpandLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="5,2 10,7 5,12" />
    </svg>
  );
}

function CollapseRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="5,2 10,7 5,12" />
    </svg>
  );
}

function ExpandRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="9,2 4,7 9,12" />
    </svg>
  );
}

const iconBtn = {
  background: "transparent",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  width: 28,
  height: 28,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9ca3af",
  flexShrink: 0,
};
