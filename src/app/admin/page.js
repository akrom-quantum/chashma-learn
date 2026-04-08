"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import Link from "next/link";

const ROLES = ["viewer", "learner", "admin", "owner"];

const roleBadgeColor = {
  viewer:  { bg: "#f3f4f6", color: "#6b7280"  },
  learner: { bg: "#d1fae5", color: "#036c48"  },
  admin:   { bg: "#dbeafe", color: "#1d4ed8"  },
  owner:   { bg: "#fef3c7", color: "#92400e"  },
};

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [users, setUsers]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(null);
  const [search, setSearch]           = useState("");
  const [filterRole, setFilterRole]   = useState("all");

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) {
          window.location.href = "/login";
          return;
        }
        const userDoc = await getDocs(collection(db, "users"));
        const allUsers = [];
        userDoc.forEach((d) => allUsers.push({ id: d.id, ...d.data() }));
        const me = allUsers.find((u) => u.uid === firebaseUser.uid);
        if (!me || (me.role !== "owner" && me.role !== "admin")) {
          window.location.href = "/dashboard";
          return;
        }
        setCurrentUser(firebaseUser);
        setCurrentRole(me.role);
        setUsers(allUsers);
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, []);

  const updateRole = async (uid, newRole) => {
    setSaving(uid);
    try {
      const ref = doc(db, "users", uid);
      await updateDoc(ref, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.uid === uid ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      alert("Failed to update role: " + err.message);
    }
    setSaving(null);
  };

  const filtered = users.filter((u) => {
    const matchSearch = u.email?.toLowerCase().includes(search.toLowerCase()) ||
                        u.name?.toLowerCase().includes(search.toLowerCase());
    const matchRole   = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading admin panel...</p>
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
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none" }}>
              Chashma Learn
            </Link>
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>→</span>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>Admin Panel</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, backgroundColor: "#fef3c7", color: "#92400e", padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase" }}>
              {currentRole}
            </span>
            <Link href="/dashboard" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 32px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", marginBottom: "8px" }}>
            User Management
          </h1>
          <p style={{ fontSize: "15px", color: "#6b7280" }}>
            {users.length} total users — manage roles and access
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {ROLES.map((r) => {
            const count = users.filter((u) => u.role === r).length;
            const colors = roleBadgeColor[r];
            return (
              <div key={r} style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px" }}>
                <p style={{ fontSize: "28px", fontWeight: 800, color: "#111827" }}>{count}</p>
                <p style={{ fontSize: "12px", fontWeight: 700, color: colors.color, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "4px" }}>{r}s</p>
              </div>
            );
          })}
        </div>

        {/* Search and filter */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: "10px 16px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "'Manrope', sans-serif", outline: "none" }}
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "'Manrope', sans-serif", outline: "none", backgroundColor: "#ffffff" }}
          >
            <option value="all">All roles</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Users table */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>

          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px 160px", padding: "12px 24px", backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Name</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Current Role</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Change Role</span>
          </div>

          {/* Table rows */}
          {filtered.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
              No users found
            </div>
          ) : (
            filtered.map((u, i) => {
              const colors = roleBadgeColor[u.role] || roleBadgeColor.viewer;
              const isMe   = u.uid === currentUser?.uid;
              return (
                <div
                  key={u.id}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px 160px", padding: "16px 24px", borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "center", backgroundColor: isMe ? "#f0fdf4" : "transparent" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48", flexShrink: 0 }}>
                      {(u.name || u.email || "?")[0].toUpperCase()}
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                      {u.name || "No name"} {isMe && <span style={{ fontSize: "10px", color: "#036c48" }}>(you)</span>}
                    </span>
                  </div>
                  <span style={{ fontSize: "13px", color: "#6b7280" }}>{u.email}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, backgroundColor: colors.bg, color: colors.color, padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.5px", display: "inline-block" }}>
                    {u.role}
                  </span>
                  <select
                    value={u.role}
                    disabled={saving === u.uid || (currentRole === "admin" && u.role === "owner")}
                    onChange={(e) => updateRole(u.uid, e.target.value)}
                    style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "13px", fontFamily: "'Manrope', sans-serif", outline: "none", backgroundColor: saving === u.uid ? "#f3f4f6" : "#ffffff", cursor: "pointer" }}
                  >
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
