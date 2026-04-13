export default function Header() {
  return (
    <header
      className="glass"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <span className="material-symbols-outlined">verified_user</span>
              RoBERTa <span style={{ color: "#86868b" }}>Pro</span>
            </div>

            {/* NAV */}
            <nav style={{ display: "flex", gap: 32, cursor: "pointer" }}>
              <span className="nav-link" onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}>Home</span>
              <span className="nav-link" onClick={() => document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" })}>Workspace</span>
              <span className="nav-link" onClick={() => document.getElementById("analytics")?.scrollIntoView({ behavior: "smooth" })}>Analytics</span>
              <span className="nav-link" onClick={() => document.getElementById("support")?.scrollIntoView({ behavior: "smooth" })}>Support</span>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}