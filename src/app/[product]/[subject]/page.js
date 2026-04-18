// src/app/[product]/[subject]/page.js
// Subject hub — lists books, topics, guides, tests depending on what the subject offers.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubject, listBooksForSubject } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function SubjectPage({ params }) {
  const { product, subject } = await params;
  const s = getSubject(product, subject);
  if (!s) notFound();

  const books = listBooksForSubject(product, subject);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px", fontFamily: "Manrope, sans-serif" }}>
      <nav style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
        <Link href={`/${product}`} style={{ color: "#036c48", textDecoration: "none" }}>{product}</Link>
        <span style={{ margin: "0 8px" }}>›</span>
        <span style={{ color: "#111827", fontWeight: 600 }}>{s.title}</span>
      </nav>

      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>{s.title}</h1>
      {s.description && <p style={{ fontSize: 17, color: "#6b7280", marginBottom: 36 }}>{s.description}</p>}

      {books.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={sectionH}>Books</h2>
          <div style={cardGrid}>
            {books.map(b => (
              <Link key={b.id} href={`/${product}/${subject}/books/${b.id}`} style={cardLink}>
                <h3 style={cardTitle}>{b.title}</h3>
                {b.description && <p style={cardDesc}>{b.description}</p>}
                <div style={{ marginTop: 12, fontSize: 13, color: "#059669" }}>
                  {Object.keys(b.units || {}).length} units →
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {s.hasTopics && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={sectionH}>Topics</h2>
          <Link href={`/${product}/${subject}/topics`} style={sectionLink}>Browse topics →</Link>
        </section>
      )}

      {s.hasGuides && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={sectionH}>Question Type Guides</h2>
          <Link href={`/${product}/${subject}/guides`} style={sectionLink}>View all guides →</Link>
        </section>
      )}

      {s.hasTests && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={sectionH}>Practice Tests</h2>
          <Link href={`/${product}/${subject}/tests`} style={sectionLink}>Go to practice tests →</Link>
          <Link href={`/${product}/${subject}/drill`} style={{ ...sectionLink, marginLeft: 16 }}>Drill mode →</Link>
        </section>
      )}
    </main>
  );
}

const sectionH = { fontSize: 20, fontWeight: 700, marginBottom: 16, color: "#111827" };
const cardGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 };
const cardLink = { display: "block", padding: 20, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, textDecoration: "none", color: "inherit" };
const cardTitle = { fontSize: 16, fontWeight: 700, marginBottom: 6, color: "#036c48" };
const cardDesc = { fontSize: 13, color: "#6b7280", margin: 0 };
const sectionLink = { color: "#036c48", fontWeight: 600, textDecoration: "none", fontSize: 15 };
