"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
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

const STATUS_COLOR = {
  present: { bg: "#d1fae5", color: "#036c48", label: "Present" },
  absent:  { bg: "#fee2e2", color: "#b91c1c", label: "Absent"  },
  late:    { bg: "#fef9c3", color: "#854d0e", label: "Late"    },
  excused: { bg: "#dbeafe", color: "#1d4ed8", label: "Excused" },
};

export default function MyGroupsPage() {
  const [user, setUser]         = useState(null);
  const [role, setRole]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [myGroups, setMyGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [activeTab, setActiveTab] = useState("assignments");
  const [loadingGroup, setLoadingGroup] = useState(false);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        const userSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        const r = userSnap.exists() ? userSnap.data().role : "viewer";
        if (r === "viewer") { window.location.href = "/dashboard"; return; }
        setRole(r);
        setUser(firebaseUser);

        const groupSnap = await getDocs(collection(db, "groups"));
        const allGroups = groupSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        const mine = allGroups.filter((g) => (g.members || []).includes(firebaseUser.uid));
        setMyGroups(mine);
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, []);

  const loadGroupData = async (group) => {
    setLoadingGroup(true);
    setSelectedGroup(group);
    setActiveTab("assignments");

    const [assignSnap, attendSnap, scoresSnap] = await Promise.all([
      getDocs(collection(db, "groups", group.id, "assignments")),
      getDocs(collection(db, "groups", group.id, "attendance")),
      getDoc(doc(db, "groups", group.id, "scores", user.uid)),
    ]);

    const assignments = assignSnap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((a) => (a.assignedTo || []).includes(user.uid))
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

    const attendance = attendSnap.docs
      .map((d) => d.data())
      .filter((a) => a.uid === user.uid)
      .sort((a, b) => b.date?.localeCompare(a.date));

    const scores = scoresSnap.exists() ? scoresSnap.data() : {};
    delete scores.updatedAt;

    setGroupData({ assignments, attendance, scores });
    setLoadingGroup(false);
  };

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading your groups...</p>
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
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none" }}>Chashma Learn</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>My Groups</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/dashboard" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Dashboard</Link>
            <span style={{
              fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase",
              backgroundColor: role === "owner" ? "#fef3c7" : role === "admin" ? "#dbeafe" : "#d1fae5",
              color: role === "owner" ? "#92400e" : role === "admin" ? "#1d4ed8" : "#036c48",
            }}>
              {role}
            </span>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 32px 48px" }}>

        {!selectedGroup ? (
          <>
            {/* Groups list */}
            <div style={{ marginBottom: "32px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", marginBottom: "8px" }}>
                My Groups
              </h1>
              <p style={{ fontSize: "14px", color: "#6b7280" }}>
                You are enrolled in {myGroups.length} group{myGroups.length !== 1 ? "s" : ""}.
              </p>
            </div>

            {myGroups.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#d1d5db", display: "block", marginBottom: "16px" }}>group</span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>Not in any group yet</h3>
                <p style={{ fontSize: "14px", color: "#9ca3af" }}>Your teacher will add you to a group when your enrollment is confirmed.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                {myGroups.map((group) => (
                  <div
                    key={group.id}
                    onClick={() => loadGroupData(group)}
                    style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px", cursor: "pointer" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "22px" }}>group</span>
                      </div>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>{group.name}</h3>
                        <p style={{ fontSize: "12px", color: "#9ca3af" }}>{group.mode}</p>
                      </div>
                    </div>
                    {group.description && (
                      <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>{group.description}</p>
                    )}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                        {(group.members || []).length} members
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#036c48", display: "flex", alignItems: "center", gap: "4px" }}>
                        View details
                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Group detail */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
              <button
                onClick={() => { setSelectedGroup(null); setGroupData(null); }}
                style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontSize: "13px", color: "#6b7280", fontFamily: "'Manrope', sans-serif", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_back</span>
                My Groups
              </button>
              <div>
                <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>
                  {selectedGroup.name}
                </h1>
                <p style={{ fontSize: "13px", color: "#9ca3af" }}>{selectedGroup.mode}</p>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "4px", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "4px", marginBottom: "24px", width: "fit-content" }}>
              {[
                { id: "assignments", icon: "assignment",     label: "Assignments" },
                { id: "attendance",  icon: "event_available", label: "Attendance"  },
                { id: "scores",      icon: "grade",           label: "My Scores"   },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "8px 18px", borderRadius: "7px", border: "none", cursor: "pointer",
                    fontSize: "13px", fontWeight: 600, fontFamily: "'Manrope', sans-serif",
                    backgroundColor: activeTab === tab.id ? "#036c48" : "transparent",
                    color: activeTab === tab.id ? "#ffffff" : "#6b7280",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {loadingGroup ? (
              <div style={{ textAlign: "center", padding: "60px" }}>
                <div style={{ width: "32px", height: "32px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : (
              <>
                {/* Assignments tab */}
                {activeTab === "assignments" && (
                  <div>
                    {!groupData?.assignments?.length ? (
                      <div style={{ textAlign: "center", padding: "60px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                        <p style={{ fontSize: "14px", color: "#9ca3af" }}>No assignments yet.</p>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {groupData.assignments.map((a) => {
                          const isDone   = (a.completedBy || []).includes(user.uid);
                          const isOverdue = a.dueDate && new Date(a.dueDate) < new Date() && !isDone;
                          return (
                            <div key={a.id} style={{ backgroundColor: "#ffffff", border: `1px solid ${isOverdue ? "#fecaca" : isDone ? "#6ee7b7" : "#e5e7eb"}`, borderRadius: "12px", padding: "20px 24px" }}>
                              <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: "16px" }}>
                                <div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>{a.title}</h3>
                                    <span style={{
                                      fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px",
                                      backgroundColor: isDone ? "#d1fae5" : isOverdue ? "#fee2e2" : "#f3f4f6",
                                      color: isDone ? "#036c48" : isOverdue ? "#b91c1c" : "#6b7280",
                                    }}>
                                      {isDone ? "Completed" : isOverdue ? "Overdue" : "Pending"}
                                    </span>
                                  </div>
                                  {a.description && <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>{a.description}</p>}
                                  {a.dueDate && (
                                    <span style={{ fontSize: "12px", color: "#9ca3af", display: "flex", alignItems: "center", gap: "4px" }}>
                                      <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>calendar_today</span>
                                      Due: {a.dueDate}
                                    </span>
                                  )}
                                </div>
                                <div style={{ flexShrink: 0 }}>
                                  {isDone ? (
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#036c48" }}>
                                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>check_circle</span>
                                      <span style={{ fontSize: "13px", fontWeight: 600 }}>Done</span>
                                    </div>
                                  ) : (
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#9ca3af" }}>
                                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>radio_button_unchecked</span>
                                      <span style={{ fontSize: "13px", fontWeight: 600 }}>Pending</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Attendance tab */}
                {activeTab === "attendance" && (
                  <div>
                    {!groupData?.attendance?.length ? (
                      <div style={{ textAlign: "center", padding: "60px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                        <p style={{ fontSize: "14px", color: "#9ca3af" }}>No attendance records yet.</p>
                      </div>
                    ) : (
                      <>
                        {/* Attendance summary */}
                        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                          {["present", "absent", "late", "excused"].map((status) => {
                            const count = groupData.attendance.filter((a) => a.status === status).length;
                            const sc    = STATUS_COLOR[status];
                            return (
                              <div key={status} style={{ padding: "12px 20px", borderRadius: "10px", backgroundColor: sc.bg, display: "flex", gap: "8px", alignItems: "center" }}>
                                <span style={{ fontSize: "20px", fontWeight: 800, color: sc.color }}>{count}</span>
                                <span style={{ fontSize: "12px", fontWeight: 600, color: sc.color }}>{sc.label}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
                          {groupData.attendance.map((record, i) => {
                            const sc = STATUS_COLOR[record.status] || { bg: "#f3f4f6", color: "#6b7280", label: record.status };
                            return (
                              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: i < groupData.attendance.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "#9ca3af" }}>calendar_today</span>
                                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{record.date}</span>
                                </div>
                                <span style={{ fontSize: "12px", fontWeight: 700, backgroundColor: sc.bg, color: sc.color, padding: "3px 12px", borderRadius: "999px" }}>
                                  {sc.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Scores tab */}
                {activeTab === "scores" && (
                  <div>
                    {!groupData?.scores || Object.keys(groupData.scores).length === 0 ? (
                      <div style={{ textAlign: "center", padding: "60px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                        <p style={{ fontSize: "14px", color: "#9ca3af" }}>No scores recorded yet.</p>
                      </div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                        {Object.entries(groupData.scores).map(([testName, score]) => {
                          const num = parseFloat(score);
                          const sc  = isNaN(num) ? { bg: "#f3f4f6", color: "#6b7280" }
                            : num >= 80 ? { bg: "#d1fae5", color: "#036c48" }
                            : num >= 60 ? { bg: "#fef9c3", color: "#854d0e" }
                            : { bg: "#fee2e2", color: "#b91c1c" };
                          return (
                            <div key={testName} style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <div>
                                <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}>Test</p>
                                <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>{testName}</p>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}>Score</p>
                                <span style={{ fontSize: "22px", fontWeight: 800, color: sc.color, backgroundColor: sc.bg, padding: "4px 14px", borderRadius: "8px" }}>
                                  {score}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
