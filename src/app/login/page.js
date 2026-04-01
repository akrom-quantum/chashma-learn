"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

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

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = "/dashboard";
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError("");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex" }}>

      {/* Left panel */}
      <div style={{ width: "50%", backgroundColor: "#036c48", padding: "64px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#ffffff", letterSpacing: "-1px", marginBottom: "16px" }}>
            Chashma Learn
          </h1>
          <p style={{ fontSize: "16px", color: "#a7f3d0", lineHeight: 1.7, maxWidth: "400px", fontWeight: 300 }}>
            Your journey to mastering English starts here. IELTS, SAT, and General English — all in one place.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            { value: "3",    label: "Learning Modes" },
            { value: "100+", label: "Lessons"        },
            { value: "98%",  label: "Pass Rate"      },
          ].map((stat) => (
            <div key={stat.label}>
              <p style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff" }}>{stat.value}</p>
              <p style={{ fontSize: "12px", color: "#6ee7b7", marginTop: "4px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: "50%", backgroundColor: "#f9f9f8", padding: "64px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>

          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", marginBottom: "8px" }}>
            Welcome back
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "32px" }}>
            Sign in to access your dashboard.
          </p>

          {error && (
            <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", fontSize: "13px", color: "#dc2626", fontWeight: 500 }}>
              {error}
            </div>
          )}

          <button
            onClick={handleGoogle}
            disabled={loading}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "12px", borderRadius: "8px", border: "1px solid #e5e7eb", backgroundColor: "#ffffff", fontSize: "14px", fontWeight: 600, color: "#111827", cursor: "pointer", marginBottom: "24px", opacity: loading ? 0.7 : 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
            <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
          </div>

          <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", backgroundColor: "#ffffff", outline: "none", fontFamily: "'Manrope', sans-serif" }}
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Password
                </label>
                <Link href="/forgot-password" style={{ fontSize: "12px", color: "#036c48", fontWeight: 600, textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", backgroundColor: "#ffffff", outline: "none", fontFamily: "'Manrope', sans-serif" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "14px", borderRadius: "8px", backgroundColor: "#036c48", color: "#ffffff", fontSize: "15px", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Manrope', sans-serif", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: "#036c48", fontWeight: 700, textDecoration: "none" }}>
              Create account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
