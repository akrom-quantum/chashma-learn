"use client";

// src/app/[product]/[subject]/guides/[guide]/GuideClient.js
// Client wrapper for a Guide-Page. Loads the guide's TopicContent from the
// registry and renders it inside PageShell.

import { useMemo } from "react";
import PageShell from "@/components/shell/PageShell";
import { getGuide } from "@/content/registry";

export default function GuideClient({
  product,
  subject,
  guideId,
  meta,
  breadcrumb,
}) {
  const guide = useMemo(
    () => getGuide(product, subject, guideId),
    [product, subject, guideId]
  );

  if (!guide) return null;

  const { TopicContent, tocItems = [] } = guide;

  return (
    <PageShell
      product={product}
      subject={subject}
      breadcrumb={breadcrumb}
      shape="guide"
      title={meta?.title || guideId}
      meta={meta}
      tocItems={tocItems}
      progressKey={`${product}/${subject}/guides/${guideId}`}
      completionType="read"
    >
      <TopicContent />
    </PageShell>
  );
}
