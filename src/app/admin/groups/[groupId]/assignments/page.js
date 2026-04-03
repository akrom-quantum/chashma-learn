"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
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

const TYPE_COLOR = {
  "Group":      { bg: "#d1fae5", color: "#036c48"  },
  "Individual": { bg: "#dbeafe", color: "#1d4ed8"  },
};

export default function AssignmentsPage() {
  const { groupId }           = useParams();
  const [role, setRole]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [group, setGroup]     = useState(null);
  const [members, setMembers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const emptyForm = { title: "", description: "", dueDate: "", type: "Group", assignedTo: [] };
  const [form, setForm] = useState(emptyForm);

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
  }, [groupId]);

  const loadData = async () => {
    const groupSnap = await getDoc(doc(db, "groups", groupId));
    if (!groupSnap.exists()) { window.location.href = "/admin/groups"; return; }
    const groupData = { id: groupSnap.id, ...groupSnap.data() };
    setGroup(groupData);

    const memberUids = groupData.members || [];
    const memberDocs = await Promise.all(memberUids.map((uid) => getDoc(doc(db, "users", uid))));
    const memberList = memberDocs.filter((d) => d.exists()).map((d) => ({ id: d.id, ...d.data() }));
    setMembers(memberList);

    const assignSnap = await getDocs(collection(db, "groups", groupId, "assignments"));
    const list = assignSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    setAssignments(list);
  };

  const createAssignment = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "groups", groupId, "assignments"), {
        title:       form.title.trim(),
        description: form.description.trim(),
        dueDate:     form.dueDate,
        type:        form.type,
        assignedTo:  form.type === "Group" ? members.map((m) => m.uid) : form.assignedTo,
        completedBy: [],
        createdAt:   serverTimestamp(),
      });
      setForm(emptyForm);
      setShowForm(false);
      await loadData();
    } catch (err) { alert("Error: " + err.message); }
    setSaving(false);
  };

  const toggleComplete = async (assignment, uid) => {
    const completed = assignment.completedBy || [];
    const updated   = completed.includes(uid)
      ? completed.filter((u) => u !== uid)
      : [...completed, uid];
    await updateDoc(doc(db, "groups", groupId, "assignments", assignment.id), { completedBy: updated });
    await loadData();
  };

  const deleteAssignment = async (id) => {
    if (!confirm("Delete this assignment?")) return;
    await deleteDoc(doc(db, "groups", groupId, "assignments", id));
    await loadData();
  };

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading assignments...</p>
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
            <Link href="/admin/groups" style={{ color: "#6b7280", textDecoration: "none" }}>Groups</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#6b7280" }}>{group?.name}</span>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ fontWeight: 600, color: "#111827" }}>Assignments</span>
          </div>
          <Link href="/admin/groups" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", padding: "6px 14px", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
            Back to Groups
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "100px 32px 48px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", marginBottom: "6px" }}>
              Assignments — {group?.name}
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>{assignments.length} assignments · {members.length} members</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 700, fontFamily: "'Manrope', sans-serif", display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{showForm ? "close" : "add"}</span>
            {showForm ? "Cancel" : "New Assignment"}
          </button>
        </div>

        {/* Create form */}
        {showForm && (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#111827", marginBottom: "20px" }}>New Assignment</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. IELTS Reading Practice Set 1"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "'Manrope', sans-serif", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Due Date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "'Manrope', sans-serif", outline: "none" }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Instructions or details for this assignment..."
                rows={3}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "'Manrope', sans-serif", outline: "none", resize: "vertical" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Assignment Type</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {["Group", "Individual"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm({ ...form, type: t, assignedTo: [] })}
                    style={{
                      padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer",
                      fontSize: "13px", fontWeight: 700, fontFamily: "'Manrope', sans-serif",
                      backgroundColor: form.type === t ? "#036c48" : "#f3f4f6",
                      color: form.type === t ? "#ffffff" : "#6b7280",
                    }}
                  >
                    {t === "Group" ? "Whole Group" : "Individual Students"}
                  </button>
                ))}
              </div>
            </div>

            {form.type === "Individual" && (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Select Students
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                  {members.map((m) => {
                    const selected = form.assignedTo.includes(m.uid);
                    return (
                      <button
                        key={m.uid}
                        onClick={() => setForm((prev) => ({
                          ...prev,
                          assignedTo: selected
                            ? prev.assignedTo.filter((u) => u !== m.uid)
                            : [...prev.assignedTo, m.uid],
                        }))}
                        style={{
                          padding: "10px 14px", borderRadius: "8px", border: "none", cursor: "pointer",
                          textAlign: "left", fontSize: "13px", fontWeight: 600, fontFamily: "'Manrope', sans-serif",
                          backgroundColor: selected ? "#d1fae5" : "#f3f4f6",
                          color: selected ? "#036c48" : "#6b7280",
                          display: "flex", alignItems: "center", gap: "8px",
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                          {selected ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        {m.name || m.email}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={createAssignment}
              disabled={saving || !form.title.trim()}
              style={{ backgroundColor: saving || !form.title.trim() ? "#9ca3af" : "#036c48", color: "#ffffff", padding: "10px 24px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 700, fontFamily: "'Manrope', sans-serif" }}
            >
              {saving ? "Creating..." : "Create Assignment"}
            </button>
          </div>
        )}

        {/* Assignments list */}
        {assignments.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#d1d5db", display: "block", marginBottom: "16px" }}>assignment</span>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>No assignments yet</h3>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>Create your first assignment for this group.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {assignments.map((assignment) => {
              const tc         = TYPE_COLOR[assignment.type] || TYPE_COLOR["Group"];
              const assigned   = assignment.assignedTo || [];
              const completed  = assignment.completedBy || [];
              const isExpanded = expandedId === assignment.id;
              const isOverdue  = assignment.dueDate && new Date(assignment.dueDate) < new Date() && completed.length < assigned.length;

              return (
                <div key={assignment.id} style={{ backgroundColor: "#ffffff", border: `1px solid ${isOverdue ? "#fecaca" : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden" }}>

                  {/* Assignment header */}
                  <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>{assignment.title}</h3>
                        <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: tc.bg, color: tc.color, padding: "2px 8px", borderRadius: "999px" }}>
                          {assignment.type}
                        </span>
                        {isOverdue && (
                          <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#fee2e2", color: "#b91c1c", padding: "2px 8px", borderRadius: "999px" }}>
                            Overdue
                          </span>
                        )}
                      </div>
                      {assignment.description && (
                        <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>{assignment.description}</p>
                      )}
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        {assignment.dueDate && (
                          <span style={{ fontSize: "12px", color: "#9ca3af", display: "flex", alignItems: "center", gap: "4px" }}>
                            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>calendar_today</span>
                            Due: {assignment.dueDate}
                          </span>
                        )}
                        <span style={{ fontSize: "12px", color: "#9ca3af", display: "flex", alignItems: "center", gap: "4px" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>check_circle</span>
                          {completed.length}/{assigned.length} completed
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : assignment.id)}
                        style={{ padding: "7px 14px", borderRadius: "6px", border: "1px solid #e5e7eb", cursor: "pointer", fontSize: "12px", fontWeight: 600, fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", color: "#374151" }}
                      >
                        {isExpanded ? "Hide" : "Manage"}
                      </button>
                      <button
                        onClick={() => deleteAssignment(assignment.id)}
                        style={{ padding: "7px 10px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: "#fee2e2", color: "#b91c1c" }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded: student completion */}
                  {isExpanded && (
                    <div style={{ borderTop: "1px solid #f3f4f6", padding: "16px 24px", backgroundColor: "#fafafa" }}>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
                        Student Completion
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                        {assigned.map((uid) => {
                          const member    = members.find((m) => m.uid === uid);
                          const isDone    = completed.includes(uid);
                          if (!member) return null;
                          return (
                            <div
                              key={uid}
                              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "8px", backgroundColor: isDone ? "#f0fdf4" : "#ffffff", border: `1px solid ${isDone ? "#6ee7b7" : "#e5e7eb"}` }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{ width: "28px", height: "28px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#036c48" }}>
                                  {(member.name || member.email || "?")[0].toUpperCase()}
                                </div>
                                <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{member.name || member.email}</span>
                              </div>
                              <button
                                onClick={() => toggleComplete(assignment, uid)}
                                style={{
                                  padding: "4px 10px", borderRadius: "6px", border: "none", cursor: "pointer",
                                  fontSize: "11px", fontWeight: 700, fontFamily: "'Manrope', sans-serif",
                                  backgroundColor: isDone ? "#d1fae5" : "#f3f4f6",
                                  color: isDone ? "#036c48" : "#9ca3af",
                                }}
                              >
                                {isDone ? "✓ Done" : "Mark Done"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
