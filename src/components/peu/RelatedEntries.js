import Link from "next/link";

export default function RelatedEntries({ entries = [] }) {
  if (entries.length === 0) return null;
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase",
        letterSpacing: 0.6, color: "#9ca3af", margin: "0 0 10px" }}>
        Related entries
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {entries.map(entry => (
          <Link key={entry.slug} href={`/general-english/practical-english-usage/${entry.slug}`}
            style={{
              display: "block", padding: "6px 8px", borderRadius: 6,
              textDecoration: "none", fontSize: 13, color: "#374151",
              background: "#f9fafb", border: "1px solid #f3f4f6",
              lineHeight: 1.4,
            }}>
            <span style={{ color: "#9ca3af", marginRight: 6, fontSize: 11 }}>
              #{entry.entryNumber}
            </span>
            {entry.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
