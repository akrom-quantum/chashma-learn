"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, getDocs, setDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";

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
const db   = getFirestore(app, "chashma-learn");

const STATUS = { present: "Present", absent: "Absent", late: "Late", excused: "Excused" };
const STATUS_COLOR = {
  present: { bg: "#d1fae5", color: "#036c48" },
  absent:  { bg: "#fee2e2", color: "#b91c1c" },
  late:    { bg: "#fef9c3", color: "#854d0e" },
  excused: { bg: "#dbeafe", color: "#1d4ed8" },
  none:    { bg: "#f3f4f6", color: "#6b7280" },
};

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export default function AttendancePage() {
  const { groupId }         = useParams();
  const [role, setRole]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [group, setGroup]   = useState(null);
  const [members, setMembers] = useState([]);
  const [date, setDate]     = useState(todayStr());
  const [attendance, setAttendance] = useState({});
  const [saving, setSaving] = useState(false);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        const userSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        const r = userSnap.exists() ? userSnap.data().role : "viewer";
        if (r !== "admin" && r !== "owner") { window.location.href = "/dashboard"; return; }
        setRole(r);
        await loadGroup();
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, [groupId]);

  useEffect(() => {
    if (group) loadAttendance();
  }, [date, group]);

  const loadGroup = async () => {
    const groupSnap = await getDoc(doc(db, "groups", groupId));
    if (!groupSnap.exists()) { window.location.href = "/admin/groups"; return; }
    const groupData = { id: groupSnap.id, ...groupSnap.data() };
    setGroup(groupData);

    const memberUids = groupData.members || [];
    const memberDocs = await Promise.all(
      memberUids.map((uid) => getDoc(doc(db, "users", uid)))
    );
    setMembers(memberDocs.filter((d) => d.exists()).map((d) => ({ id: d.id, ...d.data() })));

    const sessSnap = await getDocs(collection(db, "groups", groupId, "attendance"));
    const sessDates = [...new Set(sessSnap.docs.map((d) => d.data().date))].sort().reverse();
    setSessions(sessDates);
  };

  const loadAttendance = async () => {
    const snap = await getDocs(collection(db, "groups", groupId, "attendance"));
    const rec  = {};
    snap.docs.forEach((d) => {
      const data = d.data();
      if (data.date === date) rec[data.uid] = data.status;
    });
    setAttendance(rec);
  };

  const setStatus = (uid, status) => {
    setAttendance((prev) => ({ ...prev, [uid]: status }));
  };

  const saveAttendance = async () => {
    setSaving(true);
    try {
      await Promise.all(
        members.map((m) => {
          const status = attendance[m.uid] || "absent";
          const docId  = `${date}_${m.uid}`;
          return setDoc(doc(db, "groups", groupId, "attendance", docId), {
            uid:       m.uid,
            name:      m.name || m.email,
            date,
            status,
            savedAt:   serverTimestamp(),
          });
        })
      );
      const sessDates = [...new Set([date, ...sessions])].sort().reverse();
      setSessions(sessDates);
      alert("Attendance saved successfully.");
    } catch (err) { alert("Error saving: " + err.message); }
    setSaving(false);
  };

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading attendance...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const presentCount = Object.values(attendance).filter((s) => s === "present").length;
  const absentCount  = Object.values(attendance).filter((s) => s === "absent").length;
  const lateCount    = Object.values(attendance).filter((s) => s === "late").length;

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px" }}>
            <Link href="/" style={{ fontSize: "18px", fontWeight: 800, color: "#064e3b", textDecoration: "none" }}>Chashma Learn</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/admin/groups" style={{ color: "#6b7280", textDecoration: "none" }}>Groups</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#6b7280" }}>{group?.name}</span>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ fontWeight: 600, color: "#111827" }}>Attendance</span>
          </div>
          <Link href={`/admin/groups`} style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", padding: "6px 14px", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
            Back to Groups
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "100px 32px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", marginBottom: "6px" }}>
            Attendance — {group?.name}
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>{members.length} members in this group</p>
        </div>

        {/* Date selector + stats */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px", fontFamily: "'Manrope', sans-serif", outline: "none" }}
            />
          </div>
          {[
            { label: "Present", count: presentCount, color: "#036c48", bg: "#d1fae5" },
            { label: "Absent",  count: absentCount,  color: "#b91c1c", bg: "#fee2e2" },
            { label: "Late",    count: lateCount,     color: "#854d0e", bg: "#fef9c3" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "999px", backgroundColor: stat.bg }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: stat.color }}>{stat.count}</span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: stat.color }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Members attendance table */}
        {members.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>No members in this group yet. Add members from the group management page.</p>
          </div>
        ) : (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
            <div style={{ padding: "14px 20px", backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Student</span>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Status</span>
            </div>
            {members.map((member, i) => {
              const status = attendance[member.uid] || "none";
              const sc = STATUS_COLOR[status];
              return (
                <div key={member.uid} style={{ padding: "16px 20px", borderBottom: i < members.length - 1 ? "1px solid #f3f4f6" : "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "#036c48" }}>
                      {(member.name || member.email || "?")[0].toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{member.name || "No name"}</p>
                      <p style={{ fontSize: "12px", color: "#9ca3af" }}>{member.email}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {Object.entries(STATUS).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setStatus(member.uid, key)}
                        style={{
                          padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer",
                          fontSize: "12px", fontWeight: 700, fontFamily: "'Manrope', sans-serif",
                          backgroundColor: status === key ? STATUS_COLOR[key].bg : "#f3f4f6",
                          color: status === key ? STATUS_COLOR[key].color : "#9ca3af",
                          outline: status === key ? `2px solid ${STATUS_COLOR[key].color}` : "none",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {members.length > 0 && (
          <button
            onClick={saveAttendance}
            disabled={saving}
            style={{ backgroundColor: saving ? "#9ca3af" : "#036c48", color: "#ffffff", padding: "12px 28px", borderRadius: "8px", border: "none", cursor: saving ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: 700, fontFamily: "'Manrope', sans-serif' " }}
          >
            {saving ? "Saving..." : "Save Attendance"}
          </button>
        )}

        {/* Past sessions */}
        {sessions.length > 0 && (
          <div style={{ marginTop: "40px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "12px" }}>Past Sessions</h2>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {sessions.map((s) => (
                <button
                  key={s}
                  onClick={() => setDate(s)}
                  style={{
                    padding: "6px 14px", borderRadius: "6px", border: "1px solid #e5e7eb", cursor: "pointer",
                    fontSize: "13px", fontWeight: 600, fontFamily: "'Manrope', sans-serif",
                    backgroundColor: date === s ? "#036c48" : "#ffffff",
                    color: date === s ? "#ffffff" : "#6b7280",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
