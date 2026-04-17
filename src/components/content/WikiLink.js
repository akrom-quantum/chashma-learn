// src/components/content/WikiLink.js
// Renders [[wiki-links]] from MDX. Attempts to resolve slug to a known topic,
// falling back to a styled span if no route exists yet.

"use client";

import Link from "next/link";
import { useContext, createContext } from "react";

// Provided by PageShell so WikiLink knows the current product/subject context
export const WikiLinkContext = createContext({ product: null, subject: null });

export default function WikiLink({ to, children }) {
  const { product, subject } = useContext(WikiLinkContext);

  // If we know the context, build a topic URL. Otherwise render as styled text.
  if (product && subject) {
    const href = `/${product}/${subject}/topics/_resolve/${to}`;
    return (
      <Link
        href={href}
        style={{
          color: "#036c48",
          textDecoration: "none",
          borderBottom: "1px dashed #036c48",
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <span style={{
      color: "#036c48",
      borderBottom: "1px dashed #036c48",
      cursor: "help",
    }} title={`Link target: ${to}`}>
      {children}
    </span>
  );
}
