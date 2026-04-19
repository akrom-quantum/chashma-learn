// src/app/[product]/[subject]/topics/[category]/[topic]/page.js
// Topic-Page (Shape 2). Server component resolves content, delegates to TopicClient.

import { notFound } from "next/navigation";
import {
  getTopic,
  getTopicCategory,
  getSubject,
  getProduct,
} from "@/content/registry";
import TopicClient from "./TopicClient";

export const dynamic = "force-dynamic";

export default async function TopicPage({ params }) {
  const { product, subject, category, topic } = await params;

  const p = getProduct(product);
  const s = getSubject(product, subject);
  const c = getTopicCategory(product, subject, category);
  const t = getTopic(product, subject, category, topic);

  if (!p || !s || !c || !t) notFound();

  const breadcrumb = [
    { label: p.title, href: `/${product}` },
    { label: s.title, href: `/${product}/${subject}` },
    { label: "Topics", href: `/${product}/${subject}/topics` },
    { label: c.title, href: `/${product}/${subject}/topics/${category}` },
    { label: t.meta?.title || topic },
  ];

  return (
    <TopicClient
      product={product}
      subject={subject}
      category={category}
      topicId={topic}
      meta={t.meta}
      breadcrumb={breadcrumb}
    />
  );
}
