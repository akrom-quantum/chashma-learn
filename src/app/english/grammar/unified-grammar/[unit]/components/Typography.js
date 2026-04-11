export function H2({ id, children }) {
  return <h2 id={id} style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginBottom: "16px", marginTop: "40px", letterSpacing: "-0.5px", borderBottom: "2px solid #f3f4f6", paddingBottom: "10px", scrollMarginTop: "80px" }}>{children}</h2>;
}
export function H3({ id, children }) {
  return <h3 id={id} style={{ fontSize: "17px", fontWeight: 700, color: "#1f2937", marginBottom: "12px", marginTop: "28px", scrollMarginTop: "80px" }}>{children}</h3>;
}
export function P({ children }) {
  return <p style={{ fontSize: "15px", color: "#374151", lineHeight: 1.8, marginBottom: "16px" }}>{children}</p>;
}
export function Bold({ children }) {
  return <strong style={{ fontWeight: 700, color: "#111827" }}>{children}</strong>;
}
export function Em({ children }) {
  return <em style={{ fontStyle: "italic", color: "#036c48" }}>{children}</em>;
}
export function Code({ children }) {
  return <code style={{ fontFamily: "monospace", backgroundColor: "#f3f4f6", padding: "2px 7px", borderRadius: "5px", fontSize: "13px", color: "#be185d" }}>{children}</code>;
}
