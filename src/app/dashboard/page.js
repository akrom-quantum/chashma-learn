"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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
const db   = getFirestore(app);

export default function DashboardPage() {
  const [user, setUser]     = useState(null);
  const [role, setRole]     = useState("viewer");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const ref  = doc(db, "users", firebaseUser.uid);
            const snap = await getDoc(ref);
            if (!snap.exists()) {
              await setDoc(ref, {
                uid:       firebaseUser.uid,
                email:     firebaseUser.email,
                name:      firebaseUser.displayName || "",
                role:      "viewer",
                createdAt: new Date(),
              });
              setRole("viewer");
            } else {
              setRole(snap.data().role);
            }
          } catch (err) {
            console.error("Firestore error:", err);
          }
          setUser(firebaseUser);
        } else {
          window.location.href = "/login";
        }
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading your dashboard...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none" }}>
            Chashma Learn
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "14px", color: "#6b7280" }}>{user.displayName || user.email}</span>
            <span style={{ fontSize: "12px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase" }}>
              {role}
            </span>
            <button
              onClick={handleLogout}
              style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", backgroundColor: "#036c48", padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "'Manrope', sans-serif" }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 32px 48px" }}>

        {/* Welcome */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", marginBottom: "8px" }}>
            Welcome, {user.displayName || user.email} 👋
          </h1>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>
            Your role is <strong style={{ color: "#036c48" }}>{role}</strong>. Choose a learning mode to begin.
          </p>
        </div>

        {/* Mode cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "48px" }}>
          {[
            { href: "/english", icon: "language",  title: "General English", desc: "Grammar, vocabulary, writing and more" },
            { href: "/ielts",   icon: "school",     title: "IELTS Academic",  desc: "Complete IELTS preparation"            },
            { href: "/sat",     icon: "menu_book",  title: "SAT Preparation", desc: "Digital SAT mastery"                   },
          ].map((mode) => (
            <Link
              key={mode.href}
              href={mode.href}
              style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px", textDecoration: "none", display: "block" }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>{mode.icon}</span>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>{mode.title}</h3>
              <p style={{ fontSize: "14px", color: "#6b7280" }}>{mode.desc}</p>
            </Link>
          ))}
        </div>

        {/* Progress placeholder */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", marginBottom: "20px" }}>My Progress</h2>
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>You haven't started any lessons yet. Pick a mode above to begin.</p>
        </div>

      </div>
    </div>
  );
}
