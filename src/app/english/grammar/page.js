"use client";
import Link from "next/link";
import { useRequireAuth } from "@/lib/useRequireAuth";
import LockedContent from "@/app/components/LockedContent";

export default function GrammarLessonPage() {
  const { user, role, loading } = useRequireAuth();

  if (loading) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #d1fae5", borderTop: "3px solid #036c48", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading...</p>
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
          <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "#064e3b", textDecoration: "none" }}>
            Chashma Learn
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/dashboard" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Dashboard</Link>
            <Link href="/login" style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", backgroundColor: "#036c48", padding: "8px 20px", borderRadius: "8px", textDecoration: "none" }}>
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ display: "flex", paddingTop: "64px" }}>

        {/* SIDEBAR */}
        <aside style={{ width: "260px", height: "calc(100vh - 64px)", position: "fixed", left: 0, top: "64px", backgroundColor: "#ffffff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", padding: "24px 0" }}>
          <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>language</span>
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>General English</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>Academic Track</p>
              </div>
            </div>
          </div>
          <nav style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
            {[
              { icon: "menu_book",            label: "Oxford Word Skills", href: "/english/oxford",        locked: false },
              { icon: "spellcheck",           label: "Grammar",            href: "/english/grammar",       locked: false, active: true },
              { icon: "translate",            label: "Vocabulary",         href: "/english/vocabulary",    locked: role === "viewer" },
              { icon: "record_voice_over",    label: "Pronunciation",      href: "/english/pronunciation", locked: role === "viewer" },
              { icon: "link",                 label: "Collocations",       href: "/english/collocations",  locked: role === "viewer" },
              { icon: "format_list_bulleted", label: "Phrasal Verbs",      href: "/english/phrasal-verbs", locked: role === "viewer" },
              { icon: "auto_stories",         label: "Idioms",             href: "/english/idioms",        locked: role === "viewer" },
              { icon: "edit_note",            label: "Writing",            href: "/english/writing",       locked: role === "viewer" },
            ].map((tab) => (
              <Link
                key={tab.href}
                href={tab.locked ? "#" : tab.href}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: "10px", padding: "10px 12px", borderRadius: "8px", marginBottom: "2px",
                  textDecoration: "none",
                  backgroundColor: tab.active ? "#d1fae5" : "transparent",
                  color: tab.locked ? "#d1d5db" : tab.active ? "#036c48" : "#6b7280",
                  fontWeight: tab.active ? 700 : 500, fontSize: "14px",
                  cursor: tab.locked ? "not-allowed" : "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{tab.icon}</span>
                  {tab.label}
                </div>
                {tab.locked && <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#d1d5db" }}>lock</span>}
              </Link>
            ))}
          </nav>
          <div style={{ padding: "16px 20px", borderTop: "1px solid #f3f4f6" }}>
            <Link href="/courses" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_back</span>
              All Modes
            </Link>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ marginLeft: "260px", flex: 1, padding: "48px", maxWidth: "860px" }}>

          {/* Free sample badge */}
          {role === "viewer" && (
            <div style={{ backgroundColor: "#d1fae5", border: "1px solid #6ee7b7", borderRadius: "8px", padding: "12px 16px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "18px" }}>info</span>
              <p style={{ fontSize: "13px", color: "#065f46", fontWeight: 500 }}>
                You are viewing a free sample. <Link href="/dashboard" style={{ color: "#036c48", fontWeight: 700 }}>Upgrade to Learner</Link> to unlock all lessons.
              </p>
            </div>
          )}

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#d1fae5", color: "#036c48", padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Intermediate B1
            </span>
            <span style={{ color: "#d1d5db" }}>•</span>
            <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>Unit 4: Temporal Relationships</span>
          </div>

          <h1 style={{ fontSize: "42px", fontWeight: 800, color: "#111827", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "16px" }}>
            The Nuances of Present Perfect
          </h1>
          <p style={{ fontSize: "17px", color: "#6b7280", lineHeight: 1.7, maxWidth: "600px", fontWeight: 300, marginBottom: "40px" }}>
            Understanding how past actions impact the current moment through continuity and result.
          </p>

          {/* Meta cards */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "48px" }}>
            {[
              { icon: "schedule",   label: "Learning Time", value: "12 mins"     },
              { icon: "psychology", label: "Complexity",    value: "Level 3"     },
              { icon: "quiz",       label: "Practice",      value: "8 Questions" },
            ].map((meta) => (
              <div key={meta.label} style={{ flex: 1, backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>{meta.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>{meta.label}</p>
                  <p style={{ fontSize: "16px", fontWeight: 800, color: "#111827" }}>{meta.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formula box */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "32px", marginBottom: "40px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#111827", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "4px", height: "20px", backgroundColor: "#036c48", borderRadius: "2px", display: "inline-block" }} />
              The Structural Formula
            </h3>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginBottom: "24px" }}>
              {[
                { label: "Subject",         value: "S"          },
                { label: "+",               value: null         },
                { label: "Auxiliary",       value: "have / has" },
                { label: "+",               value: null         },
                { label: "Past Participle", value: "V3"         },
              ].map((item, i) =>
                item.value === null ? (
                  <span key={i} style={{ fontSize: "24px", color: "#d1d5db", fontWeight: 300 }}>+</span>
                ) : (
                  <div key={i} style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>{item.label}</p>
                    <span style={{ fontSize: "22px", fontWeight: 800, color: "#036c48", fontStyle: item.label === "Auxiliary" ? "italic" : "normal" }}>{item.value}</span>
                  </div>
                )
              )}
            </div>
            <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
              {[
                ["I ", "have finished", " my work."],
                ["She ", "has traveled", " to Italy."],
              ].map((ex, i) => (
                <div key={i} style={{ backgroundColor: "#f9f9f8", padding: "10px 16px", borderRadius: "8px", fontSize: "14px", color: "#374151" }}>
                  {ex[0]}<span style={{ color: "#036c48", fontWeight: 700 }}>{ex[1]}</span>{ex[2]}
                </div>
              ))}
            </div>
          </div>

          {/* Usage scenarios — locked for viewers after first one */}
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", marginBottom: "20px" }}>Usage Scenarios</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { num: "01", title: "Recent Completed Actions", body: "Used when an action was completed recently and its effect is still felt in the present.", example: `"I have just lost my keys." — The result: I cannot enter my house now.` },
                { num: "02", title: "Life Experiences",         body: "Referencing experiences at an unstated time before now. Focus is on the experience itself.", example: `"Have you ever seen the Northern Lights?"` },
                { num: "03", title: "Unfinished Time Periods",  body: "Used with time expressions like 'this week' or 'today' when the period is not yet over.", example: `"She has written three emails this morning."` },
              ].map((item, i) => {
                if (i > 0 && role === "viewer") {
                  return (
                    <div key={item.num} style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
                      <span className="material-symbols-outlined" style={{ color: "#d1d5db", fontSize: "24px" }}>lock</span>
                      <p style={{ fontSize: "14px", color: "#9ca3af" }}>Upgrade to Learner to unlock this scenario.</p>
                    </div>
                  );
                }
                return (
                  <div key={item.num} style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px", display: "flex", gap: "20px" }}>
                    <span style={{ fontSize: "28px", fontWeight: 800, color: "#d1fae5", minWidth: "40px" }}>{item.num}</span>
                    <div>
                      <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>{item.title}</h4>
                      <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6, marginBottom: "12px" }}>{item.body}</p>
                      <p style={{ fontSize: "14px", color: "#036c48", fontStyle: "italic", fontWeight: 600 }}>{item.example}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tip box */}
          <div style={{ backgroundColor: "#f0fdf4", borderLeft: "4px solid #036c48", borderRadius: "0 12px 12px 0", padding: "24px", marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span className="material-symbols-outlined" style={{ color: "#036c48", fontSize: "20px" }}>lightbulb</span>
              <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#064e3b" }}>Linguist's Tip</h4>
            </div>
            <p style={{ fontSize: "14px", color: "#166534", lineHeight: 1.6 }}>
              Avoid specific time markers like <strong>yesterday</strong> or <strong>last week</strong> with the Present Perfect. If you must specify when, switch to the Simple Past.
            </p>
          </div>

          {/* Lesson navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "32px", borderTop: "1px solid #e5e7eb" }}>
            <Link href="#" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "999px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#6b7280" }}>arrow_back</span>
              </div>
              <div>
                <p style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>Previous</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>Simple Past Foundations</p>
              </div>
            </Link>
            <Link href="#" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>Next</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>Present Perfect Continuous</p>
              </div>
              <div style={{ width: "40px", height: "40px", borderRadius: "999px", backgroundColor: "#036c48", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#ffffff" }}>arrow_forward</span>
              </div>
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}
