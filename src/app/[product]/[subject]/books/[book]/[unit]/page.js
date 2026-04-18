// src/app/[product]/[subject]/books/[book]/[unit]/page.js
// Book-Unit page (Shape 1). Server component resolves content, delegates to UnitClient.

import { notFound } from "next/navigation";
import { getUnit, getBook, getSubject, getProduct } from "@/content/registry";
import UnitClient from "./UnitClient";

export const dynamic = "force-dynamic";

export default async function UnitPage({ params }) {
  const { product, subject, book, unit } = await params;

  const p = getProduct(product);
  const s = getSubject(product, subject);
  const b = getBook(product, subject, book);
  const u = getUnit(product, subject, book, unit);

  if (!p || !s || !b || !u) notFound();

  const breadcrumb = [
    { label: p.title, href: `/${product}` },
    { label: s.title, href: `/${product}/${subject}` },
    { label: b.title, href: `/${product}/${subject}/books/${book}` },
    { label: u.meta?.title || unit },
  ];

  return (
    <UnitClient
      product={product}
      subject={subject}
      book={book}
      unitId={unit}
      meta={u.meta}
      breadcrumb={breadcrumb}
    />
  );
}
