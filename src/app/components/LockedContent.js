"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";

export default function LockedContent({ title }) {
  return (
    <div style={{ minHeight: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px", textAlign: "center" }}>
      <div style={{ width: "64px", height: "64px", borderRadius: "999px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "32px", color: "#9ca3af" }}>lock</span>
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginBottom: "10px" }}>
        {title || "Content Locked"}
      </h2>
      <p style={{ fontSize: "15px", color: "#6b7280", maxWidth: "400px", lineHeight: 1.6, marginBottom: "24px" }}>
        This content is available for Learners only. Contact the admin to upgrade your account.
      </p>
      <Link
        href="/dashboard"
        style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
