"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
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
const db   = getFirestore(app, "chashma-learn");

export default function AnalyticsPage() {
  const [role, setRole]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [users, setUsers]       = useState([]);
  const [groups, setGroups]     = useState([]);
  const [filter, setFilter]     = useState("7days");
  const [stats, setStats]       = useState(null);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        const userSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        const r = userSnap.exists() ? userSnap.data().role : "viewer";
        if (r !== "admin" && r !== "owner") { window.location.href = "/dashboard"; return; }
        setRole(r);
        await loadData();
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, []);

  const loadData = async () => {
    const [userSnap, groupSnap] = await Promise.all([
      getDocs(collection(db, "users")),
      getDocs(collection(db, "groups")),
    ]);

    const allUsers  = userSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const allGroups = groupSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    setUsers(allUsers);
    setGroups(allGroups);

    // Load all assignments across all groups
    let totalAssignments = 0;
    let totalCompleted   = 0;
    let attendanceRecords = [];

    for (const group of allGroups) {
      const [assignSnap, attendSnap] = await Promise.all([
        getDocs(collection(db, "groups", group.id, "assignments")),
        getDocs(collection(db, "groups", group.id, "attendance")),
      ]);

      assignSnap.docs.forEach((d) => {
        const data = d.data();
        const assignedCount  = (data.assignedTo || []).length;
        const completedCount = (data.completedBy || []).length;
        totalAssignments += assignedCount;
        totalCompleted   += completedCount;
      });

      attendSnap.docs.forEach((d) => {
        attendanceRecords.push({ ...d.data(), groupName: group.name });
      });
    }

    const roleCount = { viewer: 0, learner: 0, admin: 0, owner: 0 };
    allUsers.forEach((u) => { if (roleCount[u.role] !== undefined) roleCount[u.role]++; });

    const recentAttendance = attendanceRecords
      .sort((a, b) => b.date?.localeCompare(a.date))
      .slice(0, 20);

    const presentCount = attendanceRecords.filter((a) => a.status === "present").length;
    const absentCount  = attendanceRecords.filter((a) => a.status === "absent").length;
    const lateCount    = attendanceRecords.filter((a) => a.status === "late").length;

    setStats({
      totalUsers:      allUsers.length,
      totalLearners:   roleCount.learner,
      totalGroups:     allGroups.length,
      totalAssignments,
      totalCompleted,
      completionRate:  totalAssignments > 0 ? Math.round((totalCompleted / totalAssignments) * 100) : 0,
      roleCount,
      recentAttendance,
      presentCount,
      absentCount,
      lateCount,
      attendanceRate:  attendanceRecords.length > 0
        ? Math.round((presentCount / attendanceRecords.length) * 100) : 0,
    });
  };

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading analytics...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9f9f8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5e7eb", position: "fixed", top: 0, width: "100%", zIndex: 50 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px" }}>
            <Link href="/" style={{ fontSize: "18px", fontWeight: 800, color: "#064e3b", textDecoration: "none" }}>Chashma Learn</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <Link href="/admin" style={{ color: "#6b7280", textDecoration: "none" }}>Admin</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ fontWeight: 600, color: "#111827" }}>Analytics</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/admin" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", padding: "6px 14px", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
              User Management
            </Link>
            <Link href="/admin/groups" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", padding: "6px 14px", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
              Groups
            </Link>
            <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", padding: "6px 14px", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 32px 48px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", marginBottom: "6px" }}>
              Analytics
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>Platform overview and student activity</p>
          </div>
          <div style={{ display: "flex", gap: "6px", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "4px" }}>
            {[
              { id: "7days",   label: "Last 7 days" },
              { id: "alltime", label: "All time"     },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer",
                  fontSize: "12px", fontWeight: 700, fontFamily: "'Manrope', sans-serif",
                  backgroundColor: filter === f.id ? "#036c48" : "transparent",
                  color: filter === f.id ? "#ffffff" : "#6b7280",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Total Users",        value: stats?.totalUsers,      icon: "people",        bg: "#f0fdf4", color: "#036c48" },
            { label: "Active Learners",    value: stats?.totalLearners,   icon: "school",        bg: "#eff6ff", color: "#1d4ed8" },
            { label: "Groups",             value: stats?.totalGroups,     icon: "group",         bg: "#fefce8", color: "#854d0e" },
            { label: "Completion Rate",    value: `${stats?.completionRate}%`, icon: "task_alt", bg: "#fdf4ff", color: "#7e22ce" },
          ].map((card) => (
            <div key={card.label} style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>{card.label}</p>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: card.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "16px", color: card.color }}>{card.icon}</span>
                </div>
              </div>
              <p style={{ fontSize: "28px", fontWeight: 800, color: "#111827" }}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>

          {/* User roles breakdown */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#111827", marginBottom: "20px" }}>Users by Role</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { role: "owner",   label: "Owner",   color: "#92400e", bg: "#fef3c7", count: stats?.roleCount.owner   },
                { role: "admin",   label: "Admin",   color: "#1d4ed8", bg: "#dbeafe", count: stats?.roleCount.admin   },
                { role: "learner", label: "Learner", color: "#036c48", bg: "#d1fae5", count: stats?.roleCount.learner },
                { role: "viewer",  label: "Viewer",  color: "#6b7280", bg: "#f3f4f6", count: stats?.roleCount.viewer  },
              ].map((r) => {
                const pct = stats?.totalUsers > 0 ? Math.round((r.count / stats.totalUsers) * 100) : 0;
                return (
                  <div key={r.role}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, backgroundColor: r.bg, color: r.color, padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase" }}>
                          {r.label}
                        </span>
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{r.count} <span style={{ color: "#9ca3af", fontWeight: 400 }}>({pct}%)</span></span>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "#f3f4f6", borderRadius: "999px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, backgroundColor: r.color, borderRadius: "999px", transition: "width 0.5s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assignment completion */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#111827", marginBottom: "20px" }}>Assignment Completion</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <div style={{ position: "relative", width: "120px", height: "120px" }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#f3f4f6" strokeWidth="12"/>
                  <circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke="#036c48" strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - (stats?.completionRate || 0) / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: "24px", fontWeight: 800, color: "#111827" }}>{stats?.completionRate}%</p>
                  <p style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 600 }}>Complete</p>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#f0fdf4", borderRadius: "8px" }}>
                <p style={{ fontSize: "20px", fontWeight: 800, color: "#036c48" }}>{stats?.totalCompleted}</p>
                <p style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600 }}>Completed</p>
              </div>
              <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <p style={{ fontSize: "20px", fontWeight: 800, color: "#6b7280" }}>{stats?.totalAssignments}</p>
                <p style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600 }}>Total Assigned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance overview */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#111827", marginBottom: "20px" }}>Attendance Overview</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
            {[
              { label: "Attendance Rate", value: `${stats?.attendanceRate}%`, color: "#036c48", bg: "#d1fae5" },
              { label: "Present",         value: stats?.presentCount,         color: "#036c48", bg: "#d1fae5" },
              { label: "Absent",          value: stats?.absentCount,          color: "#b91c1c", bg: "#fee2e2" },
              { label: "Late",            value: stats?.lateCount,            color: "#854d0e", bg: "#fef9c3" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "16px", borderRadius: "10px", backgroundColor: s.bg, textAlign: "center" }}>
                <p style={{ fontSize: "24px", fontWeight: 800, color: s.color }}>{s.value}</p>
                <p style={{ fontSize: "11px", fontWeight: 600, color: s.color, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "4px" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Recent attendance log */}
          {stats?.recentAttendance?.length > 0 && (
            <>
              <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>Recent Records</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {stats.recentAttendance.slice(0, 8).map((record, i) => {
                  const statusColors = {
                    present: { bg: "#d1fae5", color: "#036c48" },
                    absent:  { bg: "#fee2e2", color: "#b91c1c" },
                    late:    { bg: "#fef9c3", color: "#854d0e" },
                    excused: { bg: "#dbeafe", color: "#1d4ed8" },
                  };
                  const sc = statusColors[record.status] || { bg: "#f3f4f6", color: "#6b7280" };
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "28px", height: "28px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#036c48" }}>
                          {(record.name || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{record.name}</p>
                          <p style={{ fontSize: "11px", color: "#9ca3af" }}>{record.groupName} · {record.date}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: sc.bg, color: sc.color, padding: "2px 10px", borderRadius: "999px", textTransform: "capitalize" }}>
                        {record.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Groups summary */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#111827", marginBottom: "20px" }}>Groups Summary</h2>
          {groups.length === 0 ? (
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>No groups created yet.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
              {groups.map((group) => (
                <div key={group.id} style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>{group.name}</p>
                    <p style={{ fontSize: "12px", color: "#9ca3af" }}>{group.mode}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "18px", fontWeight: 800, color: "#036c48" }}>{(group.members || []).length}</p>
                    <p style={{ fontSize: "11px", color: "#9ca3af" }}>members</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
