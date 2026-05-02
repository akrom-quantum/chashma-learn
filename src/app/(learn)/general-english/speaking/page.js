import Link from "next/link";
import { speakingUnits } from "@/velite";
export const metadata = { title: "Speaking — Chashma Learn" };

export default function SpeakingOverview() {
  const social   = speakingUnits.filter(u => u.subSection === "social-expressions").sort((a,b) => a.unit - b.unit);
  const everyday = speakingUnits.filter(u => u.subSection === "everyday-idioms").sort((a,b) => a.unit - b.unit);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <nav style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>
        <a href="/general-english" style={{ color: "#9ca3af", textDecoration: "none" }}>General English</a>
        {" › "}<span style={{ color: "#374151" }}>Speaking</span>
      </nav>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", color: "#111827" }}>Speaking</h1>
      <p style={{ fontSize: 16, color: "#6b7280", margin: "0 0 28px", lineHeight: 1.6 }}>
        Dialogue-based practice — social expressions and everyday idioms in authentic conversation contexts.
      </p>

      {[
        { label: "Social Expressions", units: social, sub: "social-expressions", color: "#0284c7" },
        { label: "Everyday Idioms", units: everyday, sub: "everyday-idioms", color: "#7c3aed" },
      ].map(({ label, units, sub, color }) => (
        <div key={sub} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#111827" }}>
            {label} <span style={{ fontSize: 13, fontWeight: 400, color: "#9ca3af" }}>({units.length} dialogues)</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
            {units.map(unit => (
              <Link key={unit.slug} href={`/general-english/speaking/${sub}/${unit.slug}`}
                style={{
                  display: "flex", gap: 8, padding: "10px 12px",
                  border: "1px solid #e5e7eb", borderRadius: 8,
                  textDecoration: "none", background: "#fff",
                }}>
                <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, minWidth: 20 }}>{unit.unit}</span>
                <span style={{ fontSize: 13, color: "#1f2937", lineHeight: 1.3 }}>{unit.title}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
