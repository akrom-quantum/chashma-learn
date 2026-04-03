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

export default function ScoresPage() {
  const { groupId }           = useParams();
  const [role, setRole]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [group, setGroup]     = useState(null);
  const [members, setMembers] = useState([]);
  const [scores, setScores]   = useState({});
  const [tests, setTests]     = useState([]);
  const [showAddTest, setShowAddTest] = useState(false);
  const [newTestName, setNewTestName] = useState("");
  const [saving, setSaving]   = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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

    const scoresSnap = await getDocs(collection(db, "groups", groupId, "scores"));
    const scoresMap  = {};
    scoresSnap.docs.forEach((d) => { scoresMap[d.id] = d.data(); });
    setScores(scoresMap);

    const testSet = new Set();
    scoresSnap.docs.forEach((d) => {
      const data = d.data();
      Object.keys(data).forEach((k) => { if (k !== "updatedAt") testSet.add(k); });
    });
    setTests([...testSet]);
  };

  const addTest = () => {
    if (!newTestName.trim()) return;
    if (tests.includes(newTestName.trim())) { alert("Test already exists."); return; }
    setTests((prev) => [...prev, newTestName.trim()]);
    setNewTestName("");
    setShowAddTest(false);
  };

  const updateScore = (uid, testName, value) => {
    setScores((prev) => ({
      ...prev,
      [uid]: { ...(prev[uid] || {}), [testName]: value },
    }));
  };

  const saveScores = async () => {
    setSaving(true);
    try {
      await Promise.all(
        members.map((m) => {
          const memberScores = scores[m.uid] || {};
          return setDoc(doc(db, "groups", groupId, "scores", m.uid), {
            ...memberScores,
            updatedAt: serverTimestamp(),
          });
        })
      );
      alert("Scores saved successfully.");
    } catch (err) { alert("Error saving: " + err.message); }
    setSaving(false);
  };

  const getScoreColor = (score) => {
    if (!score || score === "") return { color: "#9ca3af", bg: "#f3f4f6" };
    const num = parseFloat(score);
    if (isNaN(num)) return { color: "#6b7280", bg: "#f9fafb" };
    if (num >= 80) return { color: "#036c48", bg: "#d1fae5" };
    if (num >= 60) return { color: "#854d0e", bg: "#fef9c3" };
    return { color: "#b91c1c", bg: "#fee2e2" };
  };

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading scores...</p>
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
            <span style={{ fontWeight: 600, color: "#111827" }}>Scores</span>
          </div>
          <Link href="/admin/groups" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", padding: "6px 14px", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
            Back to Groups
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 32px 48px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", marginBottom: "6px" }}>
              Scores — {group?.name}
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              {members.length} students · {tests.length} tests
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setShowAddTest(!showAddTest)}
              style={{ backgroundColor: "#ffffff", color: "#036c48", padding: "10px 18px", borderRadius: "8px", border: "1px solid #036c48", cursor: "pointer", fontSize: "13px", fontWeight: 700, fontFamily: "'Manrope', sans-serif", display: "flex", alignItems: "center", gap: "6px" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>add</span>
              Add Test
            </button>
            <button
              onClick={saveScores}
              disabled={saving}
              style={{ backgroundColor: saving ? "#9ca3af" : "#036c48", color: "#ffffff", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700, fontFamily: "'Manrope', sans-serif" }}
            >
              {saving ? "Saving..." : "Save All Scores"}
            </button>
          </div>
        </div>

        {/* Add test input */}
        {showAddTest && (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={newTestName}
              onChange={(e) => setNewTestName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTest()}
              placeholder="e.g. IELTS Mock Test 1"
              style={{ flex: 1, padding: "8px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "'Manrope', sans-serif", outline: "none" }}
            />
            <button
              onClick={addTest}
              style={{ backgroundColor: "#036c48", color: "#ffffff", padding: "8px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700, fontFamily: "'Manrope', sans-serif" }}
            >
              Add
            </button>
          </div>
        )}

        {members.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>No members in this group yet.</p>
          </div>
        ) : tests.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#d1d5db", display: "block", marginBottom: "16px" }}>grade</span>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>No tests yet</h3>
            <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "20px" }}>Add a test name first, then enter scores for each student.</p>
          </div>
        ) : (
          <>
            {/* Scores table */}
            <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "auto", marginBottom: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Student
                    </th>
                    {tests.map((test) => (
                      <th key={test} style={{ padding: "14px 16px", textAlign: "center", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
                        {test}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, i) => (
                    <tr
                      key={member.uid}
                      style={{ borderBottom: i < members.length - 1 ? "1px solid #f3f4f6" : "none", backgroundColor: selectedStudent === member.uid ? "#f0fdf4" : "transparent", cursor: "pointer" }}
                      onClick={() => setSelectedStudent(selectedStudent === member.uid ? null : member.uid)}
                    >
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#036c48", flexShrink: 0 }}>
                            {(member.name || member.email || "?")[0].toUpperCase()}
                          </div>
                          <div>
                            <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{member.name || "No name"}</p>
                            <p style={{ fontSize: "11px", color: "#9ca3af" }}>{member.email}</p>
                          </div>
                        </div>
                      </td>
                      {tests.map((test) => {
                        const score = scores[member.uid]?.[test] || "";
                        const sc    = getScoreColor(score);
                        return (
                          <td key={test} style={{ padding: "10px 16px", textAlign: "center" }}>
                            <input
                              type="text"
                              value={score}
                              onChange={(e) => updateScore(member.uid, test, e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              placeholder="—"
                              style={{
                                width: "70px", padding: "6px 8px", borderRadius: "6px",
                                border: `1px solid ${score ? sc.bg : "#e5e7eb"}`,
                                backgroundColor: score ? sc.bg : "#ffffff",
                                color: score ? sc.color : "#9ca3af",
                                fontSize: "13px", fontWeight: 700, textAlign: "center",
                                fontFamily: "'Manrope', sans-serif", outline: "none",
                              }}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Color legend */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 600 }}>Score colors:</span>
              {[
                { label: "80%+",    bg: "#d1fae5", color: "#036c48" },
                { label: "60–79%",  bg: "#fef9c3", color: "#854d0e" },
                { label: "Below 60%", bg: "#fee2e2", color: "#b91c1c" },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: c.bg, border: `1px solid ${c.color}` }} />
                  <span style={{ fontSize: "12px", color: "#6b7280" }}>{c.label}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "12px", color: "#9ca3af" }}>
              Tip — Enter any value (number, band score like 7.5, or grade like A+). Click Save All Scores when done.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
