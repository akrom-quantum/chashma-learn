"use client";

// src/components/content/ContentRenderer.js
// Wraps MDX component rendering. The MDX default export IS a React component,
// so this is mostly a styled container + error boundary + scroll restoration.

import { useEffect, useRef } from "react";

export default function ContentRenderer({ children, activeTab }) {
  const ref = useRef(null);

  // Reset scroll when switching tabs
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = 0;
  }, [activeTab]);

  return (
    <article
      ref={ref}
      className="mdx-content"
      style={{
        fontSize: 16,
        lineHeight: 1.7,
        color: "#1f2937",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      {children}
      <MdxStyles />
    </article>
  );
}

// Scoped styles for MDX-rendered content so we don't sprinkle inline styles
// on every element in every MDX file.
function MdxStyles() {
  return (
    <style jsx global>{`
      .mdx-content h1 {
        font-size: 32px;
        font-weight: 800;
        margin: 32px 0 16px;
        color: #111827;
      }
      .mdx-content h2 {
        font-size: 24px;
        font-weight: 700;
        margin: 40px 0 12px;
        color: #111827;
        scroll-margin-top: 80px;
      }
      .mdx-content h3 {
        font-size: 19px;
        font-weight: 700;
        margin: 28px 0 8px;
        color: #1f2937;
        scroll-margin-top: 80px;
      }
      .mdx-content p { margin: 0 0 16px; }
      .mdx-content ul, .mdx-content ol {
        margin: 0 0 16px;
        padding-left: 24px;
      }
      .mdx-content li { margin-bottom: 6px; }
      .mdx-content code {
        background: #f3f4f6;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 14px;
        font-family: 'SF Mono', Monaco, monospace;
      }
      .mdx-content pre {
        background: #1f2937;
        color: #f9fafb;
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        margin: 16px 0;
      }
      .mdx-content pre code {
        background: transparent;
        padding: 0;
        color: inherit;
      }
      .mdx-content table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        font-size: 14px;
      }
      .mdx-content th, .mdx-content td {
        border: 1px solid #e5e7eb;
        padding: 10px 14px;
        text-align: left;
      }
      .mdx-content th {
        background: #f9fafb;
        font-weight: 700;
      }
      .mdx-content mark {
        background: #fef3c7;
        padding: 1px 4px;
        border-radius: 2px;
      }
      .mdx-content a {
        color: #036c48;
        text-decoration: underline;
      }
      .mdx-content hr {
        border: none;
        border-top: 1px solid #e5e7eb;
        margin: 32px 0;
      }
      .mdx-content blockquote {
        border-left: 3px solid #036c48;
        padding-left: 16px;
        margin: 16px 0;
        color: #4b5563;
        font-style: italic;
      }
    `}</style>
  );
}
