"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

const units = [
  { id: "unit-1", title: "Unit 1", desc: "Introduction and foundations", free: true  },
  { id: "unit-2", title: "Unit 2", desc: "Core concepts",                free: true  },
  { id: "unit-3", title: "Unit 3", desc: "Building fluency",             free: true  },
  { id: "unit-4", title: "Unit 4", desc: "Intermediate structures",      free: false },
  { id: "unit-5", title: "Unit 5", desc: "Advanced patterns",            free: false },
  { id: "unit-6", title: "Unit 6", desc: "Complex expressions",          free: false },
  { id: "unit-7", title: "Unit 7", desc: "Mastery topics",               free: false },
  { id: "unit-8", title: "Unit 8", desc: "Review and consolidation",     free: false },
];

export default function BookContentsClient({ subject, book }) {
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
        } catch { setRole("viewer"); }
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, []);

  if (loading) return (
    <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "44px", height: "44px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ fontSize: "14px", color: "#9ca3af" }}>Loading...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const isLearner = role === "learner" || role === "admin" || role === "owner";
  const bookTitle = book?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const subjectTitle = subject?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #f0fdf4", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <img src="/logo.png" alt="Chashma Learn" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/english" style={{ color: "#6b7280", textDecoration: "none" }}>General English</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#111827", fontWeight: 600 }}>{bookTitle}</span>
          </div>
          <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48" }}>
            {(user?.displayName || user?.email || "?")[0].toUpperCase()}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "96px 32px 64px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
            {subjectTitle}
          </p>
          <h1 style={{ fontSize: "30px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px", marginBottom: "8px" }}>
            {bookTitle}
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            {isLearner ? "All units unlocked" : "Units 1–3 are free. Upgrade to access all units."}
          </p>
        </div>

        {/* Units list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {units.map((unit, i) => {
            const locked = !unit.free && !isLearner;
            return (
              <Link
                key={unit.id}
                href={locked ? "#" : `/english/${subject}/${book}/${unit.id}`}
                style={{
                  display: "flex", alignItems: "center", gap: "16px",
                  backgroundColor: "#ffffff", border: "1px solid #e5e7eb",
                  borderRadius: "12px", padding: "16px 20px", textDecoration: "none",
                  opacity: locked ? 0.5 : 1, cursor: locked ? "not-allowed" : "pointer",
                }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: locked ? "#f3f4f6" : "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "14px" }}>{locked ? "🔒" : `${i + 1}`}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827", marginBottom: "2px" }}>{unit.title}</p>
                  <p style={{ fontSize: "13px", color: "#9ca3af" }}>{unit.desc}</p>
                </div>
                {unit.free && (
                  <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "2px 8px", borderRadius: "999px" }}>FREE</span>
                )}
                {!locked && <span style={{ fontSize: "18px", color: "#d1d5db" }}>›</span>}
              </Link>
            );
          })}
        </div>

        {/* Upgrade banner for viewers */}
        {!isLearner && (
          <div style={{ marginTop: "32px", backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "24px" }}>🔒</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#92400e", marginBottom: "4px" }}>Unlock all units</p>
              <p style={{ fontSize: "13px", color: "#b45309" }}>Contact the admin to upgrade your account to Learner.</p>
            </div>
            <Link href="/dashboard" style={{ fontSize: "13px", fontWeight: 700, color: "#92400e", textDecoration: "none", padding: "8px 16px", backgroundColor: "#fef3c7", borderRadius: "8px", whiteSpace: "nowrap" }}>
              Upgrade
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
