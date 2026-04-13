export default function Footer() {
  return (
    <>
      {/* FOOTER */}
      <footer
        id="support"
        style={{
          marginTop: 120,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(22,22,23,0.5)",
          padding: "60px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          {/* GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 50,
              marginBottom: 60,
            }}
          >
            {/* COL 1 */}
            <div>
              <h4 style={titleStyle}>Product</h4>
              <FooterLink>How it works</FooterLink>
              <FooterLink>Pricing</FooterLink>
              <FooterLink>API Docs</FooterLink>
            </div>

            {/* COL 2 */}
            <div>
              <h4 style={titleStyle}>Company</h4>
              <FooterLink>About</FooterLink>
              <FooterLink>Ethics</FooterLink>
              <FooterLink>Contact</FooterLink>
            </div>

            {/* COL 3 */}
            <div style={{ gridColumn: "span 2" }}>
              <h4 style={titleStyle}>Precision Fact-Checking</h4>
              <p style={{ color: "#86868b", fontSize: 13, lineHeight: 1.7 }}>
                RoBERTa AI is a high-performance transformer model optimized
                for identifying linguistic signatures of misinformation across
                global news sources.
              </p>
            </div>
          </div>

          {/* DISCLAIMER */}
          <div style={{ 
            marginBottom: 30, 
            padding: "12px 20px", 
            background: "rgba(255, 255, 255, 0.03)", 
            border: "1px solid rgba(255, 255, 255, 0.1)", 
            borderRadius: 10,
            textAlign: "center" 
          }}>
            <p style={{ color: "#86868b", fontSize: 12, fontWeight: 500 }}>
              ⚠️ <strong style={{ color: "#fff" }}>Disclaimer:</strong> This application is a testing prototype and technical demonstration. It is not an authoritative, real-world fake news or misinformation detection service.
            </p>
          </div>

          {/* BOTTOM */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.12)",
              paddingTop: 30,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: 11, color: "#86868b" }}>
              © 2026 Fake News Detection System. All rights reserved.
            </p>

            <div style={{ display: "flex", gap: 30 }}>
              <FooterLink small>Privacy Policy</FooterLink>
              <FooterLink small>Terms of Use</FooterLink>
              <FooterLink small>Site Map</FooterLink>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING HELP BUTTON */}
      <button
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(22,22,23,0.7)",
          backdropFilter: "blur(20px)",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
        }}
      >
        <span className="material-symbols-outlined">help</span>
      </button>
    </>
  );
}

/* ---------- SMALL COMPONENT ---------- */

function FooterLink({ children, small }) {
  return (
    <p
      style={{
        fontSize: small ? 11 : 13,
        color: "#86868b",
        marginTop: 10,
        cursor: "pointer",
        transition: ".2s",
      }}
      onMouseOver={(e) => (e.target.style.color = "#fff")}
      onMouseOut={(e) => (e.target.style.color = "#86868b")}
    >
      {children}
    </p>
  );
}

const titleStyle = {
  fontSize: 12,
  fontWeight: 700,
  marginBottom: 15,
  letterSpacing: "0.08em",
};