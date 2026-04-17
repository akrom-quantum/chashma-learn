// src/components/content/Table.js
// Wraps GFM tables with horizontal scroll for overflow.

export default function Table({ children, ...rest }) {
  return (
    <div style={{ overflowX: "auto", margin: "16px 0" }}>
      <table {...rest} style={{ minWidth: "100%", borderCollapse: "collapse" }}>
        {children}
      </table>
    </div>
  );
}
