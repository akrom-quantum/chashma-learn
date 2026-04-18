// src/app/[product]/[subject]/index/[list]/[item]/page.js
// Individual item in an index list — full definition card.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndexItem, getIndexList } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function IndexItemPage({ params }) {
  const { product, subject, list, item } = await params;
  const l = getIndexList(product, subject, list);
  const i = getIndexItem(product, subject, list, item);
  if (!i) notFound();

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px", fontFamily: "Manrope, sans-serif" }}>
      <nav style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>
        <Link href={`/${product}/${subject}/index/${list}`} style={{ color: "#036c48", textDecoration: "none" }}>
          ← {l?.title || "Back"}
        </Link>
      </nav>

      <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 4 }}>{i.term}</h1>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, color: "#6b7280", fontSize: 14 }}>
        {i.partOfSpeech && <em>{i.partOfSpeech}</em>}
        {i.pronunciation && <span style={{ fontFamily: "monospace" }}>/{i.pronunciation}/</span>}
      </div>

      <section style={{ marginBottom: 24 }}>
        <SectionTitle>Definition</SectionTitle>
        <p style={{ fontSize: 16, lineHeight: 1.6, margin: 0 }}>{i.definition}</p>
      </section>

      {i.examples?.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <SectionTitle>Examples</SectionTitle>
          <ul style={{ paddingLeft: 20, color: "#4b5563", lineHeight: 1.7 }}>
            {i.examples.map((ex, idx) => <li key={idx} style={{ fontStyle: "italic" }}>“{ex}”</li>)}
          </ul>
        </section>
      )}

      {i.related?.length > 0 && (
        <section>
          <SectionTitle>Related</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {i.related.map(r => (
              <Link key={r} href={`/${product}/${subject}/index/${list}/${r}`} style={{
                background: "#ecfdf5",
                color: "#036c48",
                padding: "4px 12px",
                borderRadius: 4,
                fontSize: 13,
                textDecoration: "none",
                fontWeight: 600,
              }}>
                {r}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: 12,
      fontWeight: 700,
      color: "#9ca3af",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 8,
    }}>
      {children}
    </h2>
  );
}
