"use client";

// src/app/[product]/[subject]/topics/[category]/[topic]/TopicClient.js
// Client wrapper for a Topic-Page. Loads the topic's TopicContent from the
// registry and renders it inside PageShell.

import { useMemo } from "react";
import PageShell from "@/components/shell/PageShell";
import { getTopic } from "@/content/registry";

export default function TopicClient({
  product,
  subject,
  category,
  topicId,
  meta,
  breadcrumb,
}) {
  // Re-resolve on the client to access the TopicContent component reference.
  // (Server components can't pass React components as props across the boundary.)
  const topic = useMemo(
    () => getTopic(product, subject, category, topicId),
    [product, subject, category, topicId]
  );

  if (!topic) return null;

  const { TopicContent, tocItems = [] } = topic;

  return (
    <PageShell
      product={product}
      subject={subject}
      breadcrumb={breadcrumb}
      shape="topic"
      title={meta?.title || topicId}
      meta={meta}
      tocItems={tocItems}
      progressKey={`${product}/${subject}/topics/${category}/${topicId}`}
      completionType="read"
    >
      <TopicContent />
    </PageShell>
  );
}
