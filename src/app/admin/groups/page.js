"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
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

const MODES = ["General English", "IELTS Academic", "SAT Preparation", "Mixed"];

export default function AdminGroupsPage() {
  const [role, setRole]             = useState(null);
  const [loading, setLoading]       = useState(true);
  const [groups, setGroups]         = useState([]);
  const [learners, setLearners]     = useState([]);
  const [view, setView]             = useState("list");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [saving, setSaving]         = useState(false);

  const [newGroup, setNewGroup] = useState({ name: "", mode: "General English", description: "" });

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
    const [groupSnap, userSnap] = await Promise.all([
      getDocs(collection(db, "groups")),
      getDocs(collection(db, "users")),
    ]);
    const allGroups = groupSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const allLearners = userSnap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((u) => u.role === "learner" || u.role === "admin" || u.role === "owner");
    setGroups(allGroups);
    setLearners(allLearners);
  };

  const createGroup = async () => {
    if (!newGroup.name.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "groups"), {
        name:        newGroup.name.trim(),
        mode:        newGroup.mode,
        description: newGroup.description.trim(),
        members:     [],
        createdAt:   serverTimestamp(),
      });
      setNewGroup({ name: "", mode: "General English", description: "" });
      await loadData();
      setView("list");
    } catch (err) { alert("Error: " + err.message); }
    setSaving(false);
  };

  const deleteGroup = async (groupId) => {
    if (!confirm("Delete this group?")) return;
    await deleteDoc(doc(db, "groups", groupId));
    await loadData();
    if (selectedGroup?.id === groupId) { setSelectedGroup(null); setView("list"); }
  };

  const toggleMember = async (group, uid) => {
    const members = group.members || [];
    const updated = members.includes(uid)
      ? members.filter((m) => m !== uid)
      : [...members, uid];
    await updateDoc(doc(db, "groups", group.id), { members: updated });
    await loadData();
    setSelectedGroup((prev) => prev ? { ...prev, members: updated } : prev);
  };

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading groups...</p>
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
            <Link href="/admin" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none" }}>Admin</Link>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>Groups</span>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/admin" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", padding: "6px 14px", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
              User Management
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
              Groups
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              {groups.length} groups · {learners.length} learners available
            </p>
          </div>
          <button
            onClick={() => setView(view === "create" ? "list" : "create")}
            style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 700, fontFamily: "'Manrope', sans-serif", display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              {view === "create" ? "close" : "add"}
            </span>
            {view === "create" ? "Cancel" : "New Group"}
          </button>
        </div>

        {/* Create group form */}
        {view === "create" && (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "28px", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#111827", marginBottom: "20px" }}>Create New Group</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Group Name *
                </label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="e.g. IELTS Band 7 — October 2025"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "'Manrope', sans-serif", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Mode
                </label>
                <select
                  value={newGroup.mode}
                  onChange={(e) => setNewGroup({ ...newGroup, mode: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "'Manrope', sans-serif", outline: "none", backgroundColor: "#ffffff" }}
                >
                  {MODES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Description (optional)
              </label>
              <input
                type="text"
                value={newGroup.description}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                placeholder="Brief description of this group"
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "'Manrope', sans-serif", outline: "none" }}
              />
            </div>
            <button
              onClick={createGroup}
              disabled={saving || !newGroup.name.trim()}
              style={{ backgroundColor: saving || !newGroup.name.trim() ? "#9ca3af" : "#036c48", color: "#ffffff", padding: "10px 24px", borderRadius: "8px", border: "none", cursor: saving ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: 700, fontFamily: "'Manrope', sans-serif" }}
            >
              {saving ? "Creating..." : "Create Group"}
            </button>
          </div>
        )}

        {/* Group detail view */}
        {selectedGroup && view === "detail" && (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "28px", marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", marginBottom: "4px" }}>{selectedGroup.name}</h2>
                <p style={{ fontSize: "13px", color: "#9ca3af" }}>{selectedGroup.mode} · {(selectedGroup.members || []).length} members</p>
              </div>
              <button
                onClick={() => { setSelectedGroup(null); setView("list"); }}
                style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontSize: "13px", color: "#6b7280", fontFamily: "'Manrope', sans-serif" }}
              >
                ← Back to list
              </button>
            </div>

            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#374151", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Manage Members
            </h3>

            {learners.length === 0 ? (
              <p style={{ fontSize: "14px", color: "#9ca3af" }}>No learners available. Upgrade users to Learner role first.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                {learners.map((learner) => {
                  const isMember = (selectedGroup.members || []).includes(learner.uid);
                  return (
                    <div
                      key={learner.uid}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${isMember ? "#6ee7b7" : "#e5e7eb"}`, backgroundColor: isMember ? "#f0fdf4" : "#ffffff" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48" }}>
                          {(learner.name || learner.email || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{learner.name || "No name"}</p>
                          <p style={{ fontSize: "11px", color: "#9ca3af" }}>{learner.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleMember(selectedGroup, learner.uid)}
                        style={{
                          padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer",
                          fontSize: "12px", fontWeight: 700, fontFamily: "'Manrope', sans-serif",
                          backgroundColor: isMember ? "#fee2e2" : "#d1fae5",
                          color: isMember ? "#b91c1c" : "#036c48",
                        }}
                      >
                        {isMember ? "Remove" : "Add"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick links to group sub-pages */}
            <div style={{ marginTop: "28px", paddingTop: "24px", borderTop: "1px solid #f3f4f6" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#374151", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Group Tools
              </h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  { icon: "assignment",    label: "Assignments",  href: `/admin/groups/${selectedGroup.id}/assignments` },
                  { icon: "event_available", label: "Attendance", href: `/admin/groups/${selectedGroup.id}/attendance`  },
                  { icon: "grade",         label: "Scores",       href: `/admin/groups/${selectedGroup.id}/scores`      },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px", fontWeight: 600, color: "#374151", textDecoration: "none", backgroundColor: "#f9fafb" }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "#036c48" }}>{tool.icon}</span>
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Groups list */}
        {view !== "detail" && (
          groups.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#d1d5db", display: "block", marginBottom: "16px" }}>group</span>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>No groups yet</h3>
              <p style={{ fontSize: "14px", color: "#9ca3af" }}>Create your first group to start organizing students.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              {groups.map((group) => (
                <div
                  key={group.id}
                  style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}
                >
                  <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>{group.name}</h3>
                      <p style={{ fontSize: "12px", color: "#9ca3af" }}>{group.mode}</p>
                      {group.description && <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px" }}>{group.description}</p>}
                    </div>
                    <button
                      onClick={() => deleteGroup(group.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#fca5a5", padding: "4px" }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>delete</span>
                    </button>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#9ca3af" }}>group</span>
                      <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>
                        {(group.members || []).length} members
                      </span>
                    </div>
                    <button
                      onClick={() => { setSelectedGroup(group); setView("detail"); }}
                      style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "7px 16px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700, fontFamily: "'Manrope', sans-serif" }}
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
