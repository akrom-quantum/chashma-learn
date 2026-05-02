"use client";

import { useProgress } from "@/lib/useProgress";

/**
 * Mark-as-read/done toggle.
 * Phase 1: localStorage for guests.
 * Phase 5 (now): Firestore for authenticated users, localStorage fallback for guests.
 *
 * Props:
 *   unitSlug   string
 *   type       "read" | "done"
 */
export default function CompletionToggle({ unitSlug, type = "read" }) {
  const { lessonRead, exercisesDone, loading, toggle } = useProgress(unitSlug);
  const done = type === "read" ? lessonRead : exercisesDone;

  const label = type === "read"
    ? (done ? "✓ Marked as read" : "Mark as read")
    : (done ? "✓ Exercises done" : "Mark as done");

  return (
    <div style={{
      marginTop: 32, paddingTop: 24, borderTop: "1px solid #e5e7eb",
      display: "flex", justifyContent: "flex-end",
    }}>
      <button
        onClick={() => toggle(type)}
        disabled={loading}
        style={{
          padding: "9px 20px",
          background: done ? "#ecfdf5" : "#fff",
          border: `2px solid ${done ? "#10b981" : "#d1d5db"}`,
          borderRadius: 8, fontSize: 14, fontWeight: 600,
          color: done ? "#059669" : "#374151",
          cursor: loading ? "default" : "pointer",
          fontFamily: "inherit", opacity: loading ? 0.6 : 1,
          transition: "all 0.15s",
        }}
      >
        {label}
      </button>
    </div>
  );
}
