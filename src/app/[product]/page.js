// src/app/[product]/page.js
// Product hub — e.g. /english, /ielts, /sat

import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, listSubjectsForProduct } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  const { product } = await params;
  const p = getProduct(product);
  if (!p) notFound();

  const subjects = listSubjectsForProduct(product);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px", fontFamily: "Manrope, sans-serif" }}>
      <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 12 }}>{p.title}</h1>
      <p style={{ fontSize: 18, color: "#6b7280", marginBottom: 40 }}>{p.description}</p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16,
      }}>
        {subjects.map(s => (
          <Link
            key={s.id}
            href={`/${product}/${s.id}`}
            style={{
              display: "block",
              padding: 24,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              textDecoration: "none",
              color: "inherit",
              transition: "border-color 0.1s, transform 0.1s",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#036c48" }}>
              {s.title}
            </h3>
            <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
              {s.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
