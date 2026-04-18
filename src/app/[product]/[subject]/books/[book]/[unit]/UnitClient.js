"use client";

// src/app/[product]/[subject]/books/[book]/[unit]/UnitClient.js
// Client wrapper: loads MDX component dynamically, renders inside PageShell.

import { useState, useEffect, useMemo } from "react";
import PageShell from "@/components/shell/PageShell";
import ContentRenderer from "@/components/content/ContentRenderer";
import { WikiLinkContext } from "@/components/content/WikiLink";
import { getUnit } from "@/content/registry";

export default function UnitClient({ product, subject, book, unitId, meta, breadcrumb }) {
  const [activeTab, setActiveTab] = useState("topic");
  const unit = useMemo(() => getUnit(product, subject, book, unitId), [product, subject, book, unitId]);

  if (!unit) return <div style={{ padding: 48 }}>Unit not found.</div>;

  const TopicContent = unit.TopicContent;
  const PracticeContent = unit.PracticeContent;
  const hasPractice = meta?.hasPractice !== false && !!PracticeContent;

  // Use author-provided TOC if present, otherwise fall back to auto-generated one
  const tocItems = meta?.tocItems?.length
    ? meta.tocItems
    : (TopicContent?.__autoToc || []);

  const tabs = hasPractice
    ? [
        { id: "topic", label: "Topic" },
        { id: "practice", label: "Practice" },
      ]
    : null;

  return (
    <WikiLinkContext.Provider value={{ product, subject }}>
      <PageShell
        product={product}
        subject={subject}
        book={book}
        breadcrumb={breadcrumb}
        shape="book-unit"
        title={meta?.title}
        meta={meta}
        tocItems={activeTab === "topic" ? tocItems : []}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        progressKey={`${book}/${unitId}`}
        completionType={activeTab === "practice" ? "done" : "read"}
      >
        <ContentRenderer activeTab={activeTab}>
          {activeTab === "topic" && TopicContent && <TopicContent />}
          {activeTab === "practice" && PracticeContent && <PracticeContent />}
          {activeTab === "practice" && !PracticeContent && (
            <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>
              Practice exercises coming soon.
            </div>
          )}
        </ContentRenderer>
      </PageShell>
    </WikiLinkContext.Provider>
  );
}
