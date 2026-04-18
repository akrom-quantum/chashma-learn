// src/app/[product]/[subject]/index/[list]/page.js
// Index-List (Shape 5) — browse vocab words, phrasal verbs, idioms, affixes.

import Link from "next/link";
import { getIndexList } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function IndexListPage({ params }) {
  const { product, subject, list } = await params;
  const l = getIndexList(product, subject, list);

  if (!l) {
    return (
      <main style={wrap}>
        <nav style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
          <Link href={`/${product}/${subject}`} style={{ color: "#036c48", textDecoration: "none" }}>← {subject}</Link>
        </nav>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Index not yet authored</h1>
        <p style={{ color: "#6b7280" }}>
          <code>{product}/{subject}/index/{list}</code> is not registered.
        </p>
      </main>
    );
  }

  const items = Object.values(l.items || {});

  return (
    <main style={wrap}>
      <nav style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
        <Link href={`/${product}/${subject}`} style={{ color: "#036c48", textDecoration: "none" }}>← {subject}</Link>
      </nav>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>{l.title}</h1>
      <p style={{ color: "#6b7280", marginBottom: 24 }}>
        {items.length} {l.itemType}{items.length !== 1 ? "s" : ""}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8 }}>
        {items.map(item => (
          <Link
            key={item.id}
            href={`/${product}/${subject}/index/${list}/${item.id}`}
            style={{
              display: "block",
              padding: 12,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontWeight: 700, color: "#036c48", marginBottom: 2 }}>{item.term}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{item.partOfSpeech}</div>
            <div style={{ fontSize: 13, color: "#374151", marginTop: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {item.definition}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

const wrap = { maxWidth: 1100, margin: "0 auto", padding: "48px 24px", fontFamily: "Manrope, sans-serif" };
