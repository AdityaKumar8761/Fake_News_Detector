export default function ApiDocs() {
  return (
    <section id="api" style={{ padding: "60px", paddingBottom: "120px" }}>
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 30, fontWeight: 700 }}>API Documentation</h2>
        <p style={{ color: "#86868b", fontSize: 18 }}>
          Integrate RoBERTa Pro directly into your applications.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {/* Endpoint 1: Text */}
        <div className="glass bento-card" style={{ padding: 32, borderRadius: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <span style={{ background: "#22c55e", padding: "4px 12px", borderRadius: 6, fontSize: 13, fontWeight: 700, color: "#000" }}>POST</span>
            <span style={{ fontSize: 18, fontFamily: "monospace", color: "#fff" }}>/predict-text</span>
          </div>
          <p style={{ color: "#86868b", fontSize: 14, marginBottom: 20 }}>Analyze raw textual content for misinformation signatures.</p>
          <div style={{ background: "rgba(0,0,0,0.5)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ fontSize: 12, color: "#86868b", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Request Body (JSON)</p>
            <pre style={{ margin: 0, color: "#a5d6ff", fontFamily: "monospace", fontSize: 13 }}>
              {`{
  "text": "Your news article content here..."
}`}
            </pre>
          </div>
        </div>

        {/* Endpoint 2: URL */}
        <div className="glass bento-card" style={{ padding: 32, borderRadius: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <span style={{ background: "#22c55e", padding: "4px 12px", borderRadius: 6, fontSize: 13, fontWeight: 700, color: "#000" }}>POST</span>
            <span style={{ fontSize: 18, fontFamily: "monospace", color: "#fff" }}>/predict-url</span>
          </div>
          <p style={{ color: "#86868b", fontSize: 14, marginBottom: 20 }}>Automatically scrape and analyze content from a news article URL.</p>
          <div style={{ background: "rgba(0,0,0,0.5)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ fontSize: 12, color: "#86868b", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Request Body (JSON)</p>
            <pre style={{ margin: 0, color: "#a5d6ff", fontFamily: "monospace", fontSize: 13 }}>
              {`{
  "url": "https://example.com/news-article"
}`}
            </pre>
          </div>
        </div>

        {/* Endpoint 3: Image */}
        <div className="glass bento-card" style={{ padding: 32, borderRadius: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <span style={{ background: "#22c55e", padding: "4px 12px", borderRadius: 6, fontSize: 13, fontWeight: 700, color: "#000" }}>POST</span>
            <span style={{ fontSize: 18, fontFamily: "monospace", color: "#fff" }}>/predict-image</span>
          </div>
          <p style={{ color: "#86868b", fontSize: 14, marginBottom: 20 }}>Extract text from an image (OCR) and run misinformation detection.</p>
          <div style={{ background: "rgba(0,0,0,0.5)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ fontSize: 12, color: "#86868b", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Request (Multipart/Form-Data)</p>
            <pre style={{ margin: 0, color: "#a5d6ff", fontFamily: "monospace", fontSize: 13 }}>
              {`file: <Image File>`}
            </pre>
          </div>
        </div>

        {/* Response Format */}
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Standard Response</h3>
          <div style={{ background: "rgba(0,0,0,0.5)", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
            <pre style={{ margin: 0, color: "#7ee787", fontFamily: "monospace", fontSize: 13 }}>
              {`{
  "prediction": "FAKE" | "REAL",
  "confidence": 0.985,
  "extracted_text": "..." // Only for image/url endpoints
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
