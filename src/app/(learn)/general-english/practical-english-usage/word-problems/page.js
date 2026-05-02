import Link from "next/link";
import { peuEntries } from "@/velite";
export const metadata = { title: "Word Problems A–Z — Practical English Usage" };

export default function WordProblemsPage() {
  const entries = peuEntries
    .filter(e => e.part === "vocabulary" && e.section === "section-31-word-problems-a-z")
    .sort((a,b) => a.entryNumber - b.entryNumber);

  const byLetter = {};
  for (const e of entries) {
    const letter = e.title.charAt(0).toUpperCase();
    if (!byLetter[letter]) byLetter[letter] = [];
    byLetter[letter].push(e);
  }
  const letters = Object.keys(byLetter).sort();

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <nav style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>
        <a href="/general-english/practical-english-usage" style={{ color: "#9ca3af", textDecoration: "none" }}>
          Practical English Usage
        </a>
        {" › "}<span style={{ color: "#374151" }}>Word Problems A–Z</span>
      </nav>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px", color: "#111827" }}>
        Word Problems A–Z
      </h1>
      <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 28 }}>
        Entries 352–635. Alphabetical index of confusable words, usage problems and tricky vocabulary.
      </p>

      {letters.length === 0 ? (
        <p style={{ color: "#9ca3af", fontStyle: "italic" }}>
          Word problems entries (352–635) coming soon.
        </p>
      ) : letters.map(letter => (
        <div key={letter} style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#3730a3", margin: "0 0 10px" }}>{letter}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {byLetter[letter].map(e => (
              <Link key={e.slug} href={`/general-english/practical-english-usage/${e.slug}`}
                style={{ display: "flex", gap: 10, padding: "8px 12px",
                  border: "1px solid #e5e7eb", borderRadius: 6,
                  textDecoration: "none", fontSize: 14, color: "#1f2937" }}>
                <span style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, minWidth: 36 }}>
                  #{e.entryNumber}
                </span>
                {e.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
