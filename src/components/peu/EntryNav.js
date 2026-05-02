import Link from "next/link";

export default function EntryNav({ prev, next }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", gap: 12,
      marginTop: 32, paddingTop: 20, borderTop: "1px solid #e5e7eb",
    }}>
      {prev ? (
        <Link href={`/general-english/practical-english-usage/${prev.slug}`}
          style={navLink}>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>← Entry {prev.entryNumber}</span>
          <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{prev.title}</span>
        </Link>
      ) : <div />}
      {next ? (
        <Link href={`/general-english/practical-english-usage/${next.slug}`}
          style={{ ...navLink, textAlign: "right" }}>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>Entry {next.entryNumber} →</span>
          <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{next.title}</span>
        </Link>
      ) : <div />}
    </div>
  );
}

const navLink = {
  display: "flex", flexDirection: "column", gap: 2,
  padding: "10px 14px", border: "1px solid #e5e7eb",
  borderRadius: 8, textDecoration: "none", flex: 1, maxWidth: "48%",
  background: "#fff", transition: "border-color 0.1s",
};
