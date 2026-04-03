"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";

export default function CoursesPage() {
  const modes = [
    {
      href: "/english",
      icon: "language",
      badge: "Foundational",
      title: "General English",
      desc: "Grammar, vocabulary, writing, pronunciation, idioms, and collocations — from foundations to fluency.",
      features: ["Oxford Word Skills", "Grammar & Vocabulary", "Writing & Pronunciation", "Idioms & Phrasal Verbs"],
      btnText: "Begin Track",
      featured: false,
    },
    {
      href: "/ielts",
      icon: "school",
      badge: "Most Popular",
      title: "IELTS Academic",
      desc: "Complete preparation for all four IELTS skills with tips, topics, practice, and prediction tests.",
      features: ["Listening & Reading", "Speaking & Writing", "Practice Tests", "Prediction Tests"],
      btnText: "Enroll in IELTS",
      featured: true,
    },
    {
      href: "/sat",
      icon: "menu_book",
      badge: "New",
      title: "SAT Preparation",
      desc: "Strategic mastery for the Digital SAT — English, vocabulary, and math with unit-based structure.",
      features: ["English Units & Practice", "Topic & Structure Vocab", "Math Units & Practice", "Digital SAT Format"],
      btnText: "Start SAT Prep",
      featured: false,
    },
  ];

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none", letterSpacing: "-0.5px" }}>
            Chashma Learn
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <Link href="/courses" style={{ fontSize: "14px", color: "#036c48", textDecoration: "none", fontWeight: 700, borderBottom: "2px solid #036c48", paddingBottom: "2px" }}>Courses</Link>
            <Link href="/resources" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Resources</Link>
            <Link href="/login" style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", backgroundColor: "#036c48", padding: "8px 20px", borderRadius: "8px", textDecoration: "none" }}>
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ paddingTop: "100px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "inline-block", backgroundColor: "#d1fae5", color: "#036c48", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>
          Course Selection
        </div>
        <h1 style={{ fontSize: "48px", fontWeight: 800, color: "#111827", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "16px" }}>
          Choose Your Path
        </h1>
        <p style={{ fontSize: "17px", color: "#6b7280", maxWidth: "520px", lineHeight: 1.7, fontWeight: 300 }}>
          Three specialized tracks built by an experienced teacher. Each designed for measurable, real-world results.
        </p>
      </div>

      {/* CARDS */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px 80px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
        {modes.map((mode) => (
          <div
            key={mode.href}
            style={{
              backgroundColor: mode.featured ? "#036c48" : "#ffffff",
              borderRadius: "16px",
              border: mode.featured ? "none" : "1px solid #e5e7eb",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Top bar */}
            <div style={{ backgroundColor: mode.featured ? "#064e3b" : "#f3f4f6", padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="material-symbols-outlined" style={{ color: mode.featured ? "#6ee7b7" : "#036c48", fontSize: "22px" }}>{mode.icon}</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: mode.featured ? "#6ee7b7" : "#036c48", textTransform: "uppercase", letterSpacing: "1px" }}>{mode.badge}</span>
              </div>
              {mode.featured && (
                <span style={{ fontSize: "10px", fontWeight: 800, color: "#064e3b", backgroundColor: "#6ee7b7", padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Popular
                </span>
              )}
            </div>

            {/* Body */}
            <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: mode.featured ? "#ffffff" : "#111827", letterSpacing: "-0.5px", marginBottom: "10px" }}>
                  {mode.title}
                </h3>
                <p style={{ fontSize: "14px", color: mode.featured ? "#a7f3d0" : "#6b7280", lineHeight: 1.6, fontWeight: 300 }}>
                  {mode.desc}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {mode.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span className="material-symbols-outlined" style={{ color: mode.featured ? "#6ee7b7" : "#036c48", fontSize: "18px" }}>check_circle</span>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: mode.featured ? "#d1fae5" : "#374151" }}>{f}</span>
                  </div>
                ))}
              </div>

              <Link
                href={mode.href}
                style={{
                  marginTop: "auto",
                  display: "block",
                  textAlign: "center",
                  padding: "13px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  backgroundColor: mode.featured ? "#ffffff" : "#036c48",
                  color: mode.featured ? "#036c48" : "#ffffff",
                }}
              >
                {mode.btnText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e5e7eb", padding: "32px", backgroundColor: "#f9f9f8" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#064e3b" }}>Chashma Learn</span>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>© 2025 Chashma Learn. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}
