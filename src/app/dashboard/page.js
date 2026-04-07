"use client";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const modes = [
  {
    href:  "/english",
    icon:  "📖",
    title: "General English",
    desc:  "Grammar, vocabulary, writing, pronunciation and more",
    tags:  ["Grammar", "Vocabulary", "Writing"],
    free:  true,
  },
  {
    href:  "/ielts",
    icon:  "🎯",
    title: "IELTS Academic",
    desc:  "Complete preparation for all four IELTS skills",
    tags:  ["Listening", "Reading", "Writing", "Speaking"],
    free:  false,
  },
  {
    href:  "/sat",
    icon:  "✏️",
    title: "SAT Preparation",
    desc:  "Digital SAT English, vocabulary and math",
    tags:  ["English", "Vocabulary", "Math"],
    free:  false,
  },
];

export default function DashboardPage() {
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState("viewer");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) { window.location.href = "/login"; return; }
        try {
          const ref  = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(ref);
          if (!snap.exists()) {
            await setDoc(ref, { uid: firebaseUser.uid, email: firebaseUser.email, name: firebaseUser.displayName || "", role: "viewer", createdAt: new Date() });
            setRole("viewer");
          } else {
            setRole(snap.data().role);
          }
        } catch { setRole("viewer"); }
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "44px", height: "44px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#9ca3af", fontFamily: "'Manrope', sans-serif" }}>Loading your dashboard...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return null;

  const isAdminOrOwner = role === "admin" || role === "owner";
  const isLearner      = role === "learner" || role === "admin" || role === "owner";
  const firstName      = user.displayName?.split(" ")[0] || user.email?.split("@")[0] || "there";

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "rgba(255,255,255,0.95)", borderBottom: "1px solid #f0fdf4", position: "fixed", top: 0, width: "100%", zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src="/logo.png" alt="Chashma Learn" style={{ width: "36px", height: "36px", objectFit: "contain" }} />
        <span style={{ fontSize: "18px", fontWeight: 800, color: "#064e3b", letterSpacing: "-0.5px" }}>Chashma Learn</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {isAdminOrOwner && (
              <Link href="/admin" style={{ fontSize: "13px", fontWeight: 600, color: "#036c48", textDecoration: "none", padding: "7px 14px", border: "1px solid #bbf7d0", borderRadius: "8px", backgroundColor: "#f0fdf4" }}>
                Admin Panel
              </Link>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #f3f4f6" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "999px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#036c48" }}>
                {(user.displayName || user.email || "?")[0].toUpperCase()}
              </div>
              <span style={{ fontSize: "13px", color: "#374151", fontWeight: 600, maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.displayName || user.email}
              </span>
              <span style={{
                fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.3px",
                backgroundColor: role === "owner" ? "#fef3c7" : role === "admin" ? "#dbeafe" : role === "learner" ? "#d1fae5" : "#f3f4f6",
                color: role === "owner" ? "#92400e" : role === "admin" ? "#1d4ed8" : role === "learner" ? "#036c48" : "#6b7280",
              }}>
                {role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280", backgroundColor: "transparent", padding: "7px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", cursor: "pointer", fontFamily: "'Manrope', sans-serif" }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 32px 64px" }}>

        {/* Welcome header */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "13px", color: "#9ca3af", fontWeight: 500, marginBottom: "6px" }}>{greeting()},</p>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#064e3b", letterSpacing: "-1px", marginBottom: "8px" }}>
            {firstName} 👋
          </h1>
          <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.6 }}>
            {role === "viewer"  && "You have limited access. Contact the admin to upgrade your account and unlock all content."}
            {role === "learner" && "Welcome back. Pick up where you left off or explore a new topic today."}
            {role === "admin"   && "You have admin access. Manage students, groups, and content from your panel."}
            {role === "owner"   && "You have full access. Manage the entire platform from your admin panel."}
          </p>
        </div>

        {/* Viewer upgrade notice */}
        {role === "viewer" && (
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "12px", padding: "16px 24px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "40px", height: "40px", backgroundColor: "#fef3c7", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "20px" }}>🔒</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#92400e", marginBottom: "2px" }}>Limited Access</p>
              <p style={{ fontSize: "13px", color: "#b45309" }}>Pay and contact the admin to be upgraded to Learner and unlock all lessons, PDFs, and practice tests.</p>
            </div>
            <Link href="mailto:admin@chashmalearn.com" style={{ fontSize: "13px", fontWeight: 700, color: "#92400e", textDecoration: "none", padding: "8px 16px", backgroundColor: "#fef3c7", borderRadius: "8px", whiteSpace: "nowrap" }}>
              Contact Admin
            </Link>
          </div>
        )}

        {/* My Groups quick link */}
        {isLearner && (
          <Link
            href="/my-groups"
            style={{ display: "flex", alignItems: "center", gap: "16px", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px 20px", textDecoration: "none", marginBottom: "32px" }}
          >
            <div style={{ width: "44px", height: "44px", backgroundColor: "#d1fae5", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "22px" }}>👥</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>My Groups</p>
              <p style={{ fontSize: "13px", color: "#9ca3af" }}>View your assignments, attendance records and test scores</p>
            </div>
            <span style={{ fontSize: "20px", color: "#d1d5db" }}>›</span>
          </Link>
        )}

        {/* Admin quick actions */}
        {isAdminOrOwner && (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px 24px", marginBottom: "32px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "16px" }}>Admin Tools</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { href: "/admin",           icon: "👤", label: "Manage Users"   },
                { href: "/admin/groups",    icon: "👥", label: "Manage Groups"  },
                { href: "/admin/analytics", icon: "📊", label: "Analytics"      },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px", fontWeight: 600, color: "#374151", textDecoration: "none", backgroundColor: "#f9fafb" }}
                >
                  <span style={{ fontSize: "16px" }}>{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Learning Modes
          </p>
          <Link href="/courses" style={{ fontSize: "13px", color: "#036c48", fontWeight: 600, textDecoration: "none" }}>
            View all →
          </Link>
        </div>

        {/* Mode cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "40px" }}>
          {modes.map((mode) => {
            const locked = !mode.free && !isLearner;
            return (
              <Link
                key={mode.href}
                href={locked ? "#" : mode.href}
                style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "24px", textDecoration: "none", display: "flex", flexDirection: "column", gap: "14px", position: "relative", opacity: locked ? 0.6 : 1, cursor: locked ? "not-allowed" : "pointer" }}
              >
                {locked && (
                  <div style={{ position: "absolute", top: "12px", right: "12px", width: "24px", height: "24px", backgroundColor: "#f3f4f6", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "12px" }}>🔒</span>
                  </div>
                )}
                {mode.free && (
                  <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "2px 8px", borderRadius: "999px" }}>FREE</span>
                  </div>
                )}
                <span style={{ fontSize: "32px" }}>{mode.icon}</span>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>{mode.title}</h3>
                  <p style={{ fontSize: "13px", color: "#9ca3af", lineHeight: 1.5 }}>{mode.desc}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {mode.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", backgroundColor: "#f3f4f6", color: "#6b7280" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                {!locked && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "auto" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#036c48" }}>Start learning</span>
                    <span style={{ fontSize: "16px", color: "#036c48" }}>→</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Progress placeholder */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>My Progress</p>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>Coming soon</span>
          </div>
          {isLearner ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {[
                { label: "Lessons completed", value: "0", icon: "📚" },
                { label: "Practice sessions",  value: "0", icon: "✍️" },
                { label: "Day streak",          value: "0", icon: "🔥" },
              ].map((stat) => (
                <div key={stat.label} style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                  <span style={{ fontSize: "24px", display: "block", marginBottom: "8px" }}>{stat.icon}</span>
                  <p style={{ fontSize: "24px", fontWeight: 800, color: "#064e3b", marginBottom: "4px" }}>{stat.value}</p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>Upgrade to Learner to track your progress.</p>
          )}
        </div>

      </div>
    </div>
  );
}
