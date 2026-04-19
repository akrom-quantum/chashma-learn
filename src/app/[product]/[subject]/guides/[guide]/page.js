// src/app/[product]/[subject]/guides/[guide]/page.js
// Guide-Page (Shape 3). Server component resolves content, delegates to GuideClient.

import { notFound } from "next/navigation";
import {
  getGuide,
  getSubject,
  getProduct,
} from "@/content/registry";
import GuideClient from "./GuideClient";

export const dynamic = "force-dynamic";

export default async function GuidePage({ params }) {
  const { product, subject, guide } = await params;

  const p = getProduct(product);
  const s = getSubject(product, subject);
  const g = getGuide(product, subject, guide);

  if (!p || !s || !g) notFound();

  const breadcrumb = [
    { label: p.title, href: `/${product}` },
    { label: s.title, href: `/${product}/${subject}` },
    { label: "Guides", href: `/${product}/${subject}/guides` },
    { label: g.meta?.title || guide },
  ];

  return (
    <GuideClient
      product={product}
      subject={subject}
      guideId={guide}
      meta={g.meta}
      breadcrumb={breadcrumb}
    />
  );
}
