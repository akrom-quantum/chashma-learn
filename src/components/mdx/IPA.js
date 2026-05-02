export function IPA({ children }) {
  return (
    <code style={{
      fontFamily: "monospace",
      background: "#f0f4ff",
      color: "#1e40af",
      padding: "1px 5px",
      borderRadius: 4,
      fontSize: "0.95em",
    }}>
      /{children}/
    </code>
  );
}

export default IPA;
