export default function TestPage() {
  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h1>Environment Check</h1>
      <p>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✅ Found" : "❌ Missing"}</p>
      <p>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "✅ Found" : "❌ Missing"}</p>
      <p>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "✅ Found" : "❌ Missing"}</p>
    </div>
  );
}
