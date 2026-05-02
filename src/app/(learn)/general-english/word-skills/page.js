import Link from "next/link";
import { wordSkillsUnits } from "@/velite";

export const metadata = {
  title: "Oxford Word Skills — Chashma Learn",
  description: "172 thematic vocabulary units from Elementary to Upper-Intermediate.",
};

const LEVELS = [
  { id: "elementary",         label: "Elementary",          cefr: "A1–A2" },
  { id: "intermediate",       label: "Intermediate",        cefr: "B1"    },
  { id: "upper-intermediate", label: "Upper-Intermediate",  cefr: "B1–B2" },
];

export default function WordSkillsOverview() {
  const total = wordSkillsUnits.length;
  const byLevel = Object.fromEntries(LEVELS.map(l => [
    l.id, wordSkillsUnits.filter(u => u.sourceLevel === l.id).sort((a,b) => a.unit - b.unit),
  ]));

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
      <nav style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>
        <a href="/general-english" style={{ color: "#9ca3af", textDecoration: "none" }}>General English</a>
        {" › "}<span style={{ color: "#374151" }}>Word Skills</span>
      </nav>

      <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", color: "#111827" }}>
        Oxford Word Skills
      </h1>
      <p style={{ fontSize: 16, color: "#6b7280", margin: "0 0 20px", lineHeight: 1.6 }}>
        172 thematic vocabulary units — from everyday expressions to academic English.
        Elementary through Upper-Intermediate in one unified sequence.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {[`${total} units`, "Elementary → Upper-Int", "Unified edition"].map(s => (
          <span key={s} style={{ fontSize: 13, fontWeight: 600, background: "#faf5ff",
            color: "#7c3aed", border: "1px solid #ddd6fe", padding: "4px 12px", borderRadius: 20 }}>
            {s}
          </span>
        ))}
      </div>

      {LEVELS.map(level => (
        <div key={level.id} style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#111827" }}>
              {level.label}
            </h2>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>{level.cefr}</span>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>·</span>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>{byLevel[level.id].length} units</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8 }}>
            {byLevel[level.id].map(unit => (
              <Link key={unit.slug} href={`/general-english/word-skills/${unit.slug}`}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", border: "1px solid #e5e7eb",
                  borderRadius: 8, textDecoration: "none", background: "#fff",
                  transition: "border-color 0.1s",
                }}>
                <span style={{ fontSize: 12, color: "#9ca3af", minWidth: 24, fontWeight: 700 }}>
                  {unit.unit}
                </span>
                <span style={{ flex: 1, fontSize: 13, color: "#1f2937", lineHeight: 1.3 }}>
                  {unit.title}
                </span>
                <span style={{ fontSize: 10, color: "#c4b5fd", flexShrink: 0 }}>›</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
