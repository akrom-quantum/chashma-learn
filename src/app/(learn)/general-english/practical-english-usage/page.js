import Link from "next/link";
import { peuEntries } from "@/velite";
export const metadata = { title: "Practical English Usage — Chashma Learn" };

export default function PEUOverview() {
  const grammar = peuEntries.filter(e => e.part === "grammar").sort((a,b) => a.entryNumber - b.entryNumber);
  const vocab   = peuEntries.filter(e => e.part === "vocabulary").sort((a,b) => a.entryNumber - b.entryNumber);
  const total   = 635; // full entry count when all stubs are added

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <nav style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>
        <a href="/general-english" style={{ color: "#9ca3af", textDecoration: "none" }}>General English</a>
        {" › "}<span style={{ color: "#374151" }}>Practical English Usage</span>
      </nav>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", color: "#111827" }}>
        Practical English Usage
      </h1>
      <p style={{ fontSize: 16, color: "#6b7280", margin: "0 0 20px", lineHeight: 1.6 }}>
        Michael Swan's authoritative reference — {total} entries covering grammar, vocabulary and usage.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {["2 parts", `${total} entries`, "Reference format"].map(s => (
          <span key={s} style={{ fontSize: 13, fontWeight: 600, background: "#f0f4ff",
            color: "#3730a3", border: "1px solid #c7d2fe", padding: "4px 12px", borderRadius: 20 }}>{s}</span>
        ))}
      </div>

      {[
        { label: "Part 1 — Grammar", entries: grammar, sub: "grammar" },
        { label: "Part 2 — Vocabulary", entries: vocab, sub: "vocabulary" },
      ].map(({ label, entries, sub }) => entries.length > 0 && (
        <div key={sub} style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#111827" }}>{label}</h2>
            {sub === "vocabulary" && (
              <Link href="/general-english/practical-english-usage/word-problems"
                style={{ fontSize: 13, color: "#3730a3", textDecoration: "none" }}>
                A–Z Word Problems →
              </Link>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {entries.map(entry => (
              <Link key={entry.slug} href={`/general-english/practical-english-usage/${entry.slug}`}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "9px 14px",
                  border: "1px solid #e5e7eb", borderRadius: 8, textDecoration: "none",
                  background: "#fff", fontSize: 14, color: "#1f2937",
                }}>
                <span style={{ color: "#9ca3af", minWidth: 36, fontSize: 12, fontWeight: 700 }}>
                  #{entry.entryNumber}
                </span>
                {entry.title}
              </Link>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 10, fontStyle: "italic" }}>
            Showing {entries.length} representative entries. Full {total} entries coming soon.
          </p>
        </div>
      ))}
    </div>
  );
}
