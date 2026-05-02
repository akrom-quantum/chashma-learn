// Styled native HTML element overrides for MDX content.

function H2({ children, id }) {
  return (
    <h2 id={id} style={{
      fontSize: 21,
      fontWeight: 700,
      color: "#0f172a",
      margin: "48px 0 16px",
      paddingBottom: 12,
      borderBottom: "1px solid #e5e7eb",
      lineHeight: 1.3,
      scrollMarginTop: 72,
      letterSpacing: "-0.015em",
    }}>
      {children}
    </h2>
  );
}

function H3({ children, id }) {
  return (
    <h3 id={id} style={{
      fontSize: 17,
      fontWeight: 600,
      color: "#1e293b",
      margin: "32px 0 12px",
      lineHeight: 1.4,
      scrollMarginTop: 72,
    }}>
      {children}
    </h3>
  );
}

function H4({ children, id }) {
  return (
    <h4 id={id} style={{
      fontSize: 13,
      fontWeight: 700,
      color: "#475569",
      margin: "24px 0 8px",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      scrollMarginTop: 72,
    }}>
      {children}
    </h4>
  );
}

function P({ children }) {
  return (
    <p style={{
      fontSize: 16,
      lineHeight: 1.85,
      color: "#374151",
      margin: "0 0 18px",
    }}>
      {children}
    </p>
  );
}

function UL({ children }) {
  return (
    <ul style={{
      paddingLeft: 22,
      margin: "0 0 18px",
      display: "flex",
      flexDirection: "column",
      gap: 7,
    }}>
      {children}
    </ul>
  );
}

function OL({ children }) {
  return (
    <ol style={{
      paddingLeft: 22,
      margin: "0 0 18px",
      display: "flex",
      flexDirection: "column",
      gap: 7,
    }}>
      {children}
    </ol>
  );
}

function LI({ children }) {
  return (
    <li style={{ fontSize: 16, color: "#374151", lineHeight: 1.75 }}>
      {children}
    </li>
  );
}

function Strong({ children }) {
  return <strong style={{ fontWeight: 700, color: "#0f172a" }}>{children}</strong>;
}

function Em({ children }) {
  return <em style={{ fontStyle: "italic", color: "#374151" }}>{children}</em>;
}

function Code({ children }) {
  return (
    <code style={{
      fontFamily: "'Fira Mono', 'Consolas', monospace",
      background: "#f1f5f9",
      color: "#0f172a",
      padding: "2px 7px",
      borderRadius: 5,
      fontSize: "0.875em",
      fontWeight: 500,
      border: "1px solid #e2e8f0",
    }}>
      {children}
    </code>
  );
}

function HR() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "32px 0" }} />;
}

function A({ href, children }) {
  return (
    <a href={href} style={{
      color: "#059669",
      textDecoration: "underline",
      textUnderlineOffset: 3,
    }}>
      {children}
    </a>
  );
}

export const Prose = {
  h2: H2, h3: H3, h4: H4,
  p: P, ul: UL, ol: OL, li: LI,
  strong: Strong, em: Em, code: Code,
  hr: HR, a: A,
};
