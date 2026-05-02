"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

/**
 * Wraps content that requires a Learner role.
 * Viewers see a sign-in prompt instead of the gated content.
 *
 * Props:
 *   children    ReactNode
 *   message     string     — optional custom message
 */
export default function AuthGate({ children, message }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <div style={{
        textAlign: "center", padding: "48px 24px",
        border: "1px dashed #d1d5db", borderRadius: 12,
        background: "#fafafa",
      }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px", color: "#111827" }}>
          Sign in to practise
        </h3>
        <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 20px", maxWidth: 320, marginInline: "auto" }}>
          {message ?? "Create a free account to access practice exercises and track your progress."}
        </p>
        <Link href="/login" style={{
          display: "inline-block", padding: "10px 24px",
          background: "#059669", color: "#fff",
          borderRadius: 8, textDecoration: "none",
          fontSize: 14, fontWeight: 700,
        }}>
          Sign in
        </Link>
      </div>
    );
  }

  return children;
}
