"use client";

// src/components/shell/CompletionBar.js
// Handles "Mark as Read" (topic tab) and "Mark as Done" (practice tab).
// Writes to Firestore progress collection.

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";

export default function CompletionBar({ progressKey, type, activeTab, onMarkComplete }) {
  const { user } = useAuth();
  const [status, setStatus] = useState({ topicCompleted: false, practiceCompleted: false });
  const [saving, setSaving] = useState(false);

  // progressKey format: "bookId/unitId" e.g. "unified-grammar/unit-1"
  const [bookId, unitId] = progressKey?.split("/") || [];

  useEffect(() => {
    if (!user || !bookId || !unitId) return;
    const ref = doc(db, "progress", user.uid, bookId, unitId);
    getDoc(ref).then(snap => {
      if (snap.exists()) setStatus(snap.data());
    }).catch(() => {});
  }, [user, bookId, unitId]);

  if (!user || !bookId || !unitId) return null;

  const field = activeTab === "practice" ? "practiceCompleted" : "topicCompleted";
  const timeField = activeTab === "practice" ? "practiceCompletedAt" : "topicCompletedAt";
  const alreadyDone = status[field];
  const label = activeTab === "practice" ? "Mark as Done" : "Mark as Read";

  async function handleClick() {
    if (saving || alreadyDone) return;
    setSaving(true);
    try {
      const ref = doc(db, "progress", user.uid, bookId, unitId);
      const next = {
        ...status,
        [field]: true,
        [timeField]: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(ref, next, { merge: true });
      setStatus(next);
      onMarkComplete?.(field);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{
      marginTop: 24,
      padding: "16px 20px",
      background: "#fff",
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: "1px solid #e5e7eb",
    }}>
      <div style={{ fontSize: 14, color: "#6b7280" }}>
        {alreadyDone
          ? <span style={{ color: "#10b981", fontWeight: 600 }}>✓ Completed</span>
          : "Finished? Track your progress."}
      </div>
      <button
        onClick={handleClick}
        disabled={saving || alreadyDone}
        style={{
          background: alreadyDone ? "#d1fae5" : "#036c48",
          color: alreadyDone ? "#065f46" : "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 600,
          cursor: alreadyDone || saving ? "default" : "pointer",
          fontFamily: "inherit",
          opacity: saving ? 0.6 : 1,
        }}
      >
        {saving ? "Saving..." : alreadyDone ? "Done" : label}
      </button>
    </div>
  );
}
