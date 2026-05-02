"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const TOTAL_UNITS = 733; // sum of all GE book units

export default function GEProgressSummary() {
  const { user, loading: authLoading } = useAuth();
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoading(false); return; }

    async function load() {
      try {
        const q    = query(collection(db, "unit_progress"), where("uid", "==", user.uid));
        const snap = await getDocs(q);
        const done = snap.docs.filter(d =>
          d.data().lessonRead === true || d.data().exercisesDone === true
        ).length;
        setCompleted(done);
      } catch {
        setCompleted(0);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user, authLoading]);

  if (authLoading || !user) return null;

  const pct = Math.round((completed / TOTAL_UNITS) * 100);

  return (
    <div style={{
      background: "#ecfdf5", border: "1px solid #bbf7d0",
      borderRadius: 12, padding: "20px 24px", marginBottom: 48,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Your progress</div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
            {loading ? "Loading…" : `${completed} of ${TOTAL_UNITS} units started`}
          </div>
        </div>
        {!loading && (
          <span style={{ fontSize: 28, fontWeight: 800, color: "#059669" }}>{pct}%</span>
        )}
      </div>
      <div style={{ height: 8, background: "#d1fae5", borderRadius: 4 }}>
        <div style={{
          height: 8, borderRadius: 4,
          background: "#059669",
          width: `${pct}%`,
          transition: "width 0.4s ease",
        }} />
      </div>
    </div>
  );
}
