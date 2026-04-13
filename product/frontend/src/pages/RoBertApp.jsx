import { useState } from "react";
import { predictText, predictURL, predictImage } from "../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #000000;
    color: #f5f5f7;
    min-height: 100vh;
  }

  ::selection { background: rgba(0, 113, 227, 0.3); }

  .glass {
    background: rgba(22, 22, 23, 0.7);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
  }

  .grain {
    position: relative;
  }

  .grain::after {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    opacity: 0.03;
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuA74qtybVvNtfovDVtobSxRUx9ky6MCvWJDCzCEw8pdtH7LQGlxP5Uc2NRG7uor_Wkv7Dj8JKN4lQF8KRo1tghwPmQaMBt3NFs5Fph8IMf9FL5mt8nwCxg8Qs2hB8jTQmvcPgga4mf0MVWu1s4Asg35jAV3a43j702SupDzzKv_iMBRraBAkJl3p_18My26iJy6_o9at2L2ANW1ejOF6mJEhIfrRYvsimkv5oPNLkG8pZN1t8bQnbMdF7B7-9hdmDoR0d2AZsY9sOk);
    z-index: 1;
  }

  a, button, .glass, .bento-card, .group-card, input, textarea {
    transition: all 0.3s ease-out !important;
  }

  .glass:hover, .bento-card:hover {
    transform: scale(1.02);
    border-color: rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0 20px 40px -10px rgba(0, 113, 227, 0.15);
    z-index: 20;
  }

  nav a {
    position: relative;
  }

  nav a::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0;
    width: 0; height: 1px;
    background: white;
    transition: width 0.3s ease-out;
  }

  nav a:hover::after { width: 100%; }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .shimmer-hover:hover {
    background: linear-gradient(90deg, #0071e3 0%, #4facfe 25%, #0071e3 50%, #4facfe 75%, #0071e3 100%);
    background-size: 200% auto;
    animation: shimmer 1.5s infinite linear;
  }

  .shimmer-hover-white:hover {
    background: linear-gradient(90deg, #ffffff 0%, #e5e7eb 25%, #ffffff 50%, #e5e7eb 75%, #ffffff 100%);
    background-size: 200% auto;
    animation: shimmer 1.5s infinite linear;
  }

  .bento-card { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .bento-card:hover { transform: scale(1.02); }

  .bar-item {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border-radius: 6px 6px 0 0;
    cursor: pointer;
    transition: all 0.5s;
  }
  .bar-item:hover { background: #0071e3; transform: translateY(-4px); }

  .nav-link {
    font-size: 12px;
    font-weight: 500;
    color: #86868b;
    text-decoration: none;
    transition: color 0.3s;
  }
  .nav-link:hover { color: #fff; }

  .footer-link {
    font-size: 12px;
    color: #86868b;
    text-decoration: none;
    transition: color 0.3s;
  }
  .footer-link:hover { color: #fff; }

  .tab-btn-active {
    background: rgba(255,255,255,0.1);
    color: #fff;
    font-weight: 600;
  }
  .tab-btn-inactive {
    color: #86868b;
    font-weight: 500;
  }
  .tab-btn-inactive:hover { color: #fff; }

  .insight-card {
    padding: 16px;
    border-radius: 12px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    transition: border-color 0.3s;
  }
  .insight-card:hover { border-color: rgba(255,255,255,0.2); }

  .period-btn-active {
    background: #fff;
    color: #000;
    font-weight: 700;
    font-size: 11px;
    padding: 4px 16px;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
  }
  .period-btn-inactive {
    background: transparent;
    color: #86868b;
    font-weight: 700;
    font-size: 11px;
    padding: 4px 16px;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
  }
  .period-btn-inactive:hover { color: #fff; }

  .progress-bar {
    height: 4px;
    background: rgba(255,255,255,0.05);
    border-radius: 9999px;
    overflow: hidden;
    width: 100%;
  }
  .progress-fill {
    height: 100%;
    background: #0071e3;
  }

  .help-btn:hover .help-icon { color: #0071e3; }
`;

const MaterialIcon = ({ name, style }) => (
  <span className="material-symbols-outlined" style={style}>{name}</span>
);

export default function RoBertaApp() {
  const [activeTab, setActiveTab] = useState("text");
  const [activePeriod, setActivePeriod] = useState("monthly");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);
  const [displayConfidence, setDisplayConfidence] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setShowResult(false);
      setDisplayConfidence(0);

      let res;

      if (activeTab === "text") {
        res = await predictText(text);
      }

      if (activeTab === "url") {
        res = await predictURL(url);
      }

      if (activeTab === "image") {
        res = await predictImage(file);
      }

      const finalPrediction = res.data.prediction;
      const finalConfidence = Math.round(res.data.confidence * 100);

      setPrediction(finalPrediction);

      // ⭐ ANIMATION
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setDisplayConfidence(current);

        if (current >= finalConfidence) {
          clearInterval(interval);
          setLoading(false);
          setShowResult(true);
        }
      }, 20);

    } catch (err) {
      alert("Server Error");
      setLoading(false);
    }
  };

  const tabs = [
    { id: "text", icon: "subject", label: "Text Analysis" },
    { id: "image", icon: "image", label: "Image" },
    { id: "url", icon: "link", label: "URL Check" },
  ];

  const bars = [45, 65, 55, 85, 70, 40, 90, 65, 50, 75, 80, 100];

  return (
    <>
      <style>{styles}</style>
      <div className="grain" style={{ minHeight: "100vh", background: "#000" }}>

        {/* Header */}
        <header className="glass" style={{
          position: "sticky", top: 0, zIndex: 100, width: "100%",
          borderBottom: "1px solid rgba(255,255,255,0.12)"
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", opacity: 1, transition: "opacity 0.3s" }}
                  onMouseOver={e => e.currentTarget.style.opacity = 0.8}
                  onMouseOut={e => e.currentTarget.style.opacity = 1}>
                  <MaterialIcon name="verified_user" style={{ color: "#fff", fontSize: 20 }} />
                  <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>
                    RoBERTa <span style={{ color: "#86868b" }}>Pro</span>
                  </span>
                </a>
                <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
                  {["Home", "Analytics", "API", "Support"].map(item => (
                    <a key={item} href="#" className="nav-link">{item}</a>
                  ))}
                </nav>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <button style={{ fontSize: 12, color: "#fff", background: "none", border: "none", cursor: "pointer", transition: "color 0.3s" }}
                  onMouseOver={e => e.currentTarget.style.color = "#0071e3"}
                  onMouseOut={e => e.currentTarget.style.color = "#fff"}>
                  Sign In
                </button>
                <button className="shimmer-hover" style={{
                  background: "#0071e3", color: "#fff", fontSize: 12, fontWeight: 500,
                  padding: "4px 12px", borderRadius: 9999, border: "none", cursor: "pointer"
                }}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", display: "flex", flexDirection: "column", gap: 96 }}>

          {/* Hero */}
          <section style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h1 style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.1 }}>
                Deep Analysis. <br />
                <span style={{ color: "#86868b" }}>Verified Accuracy.</span>
              </h1>
              <p style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "#86868b", maxWidth: 640, margin: "0 auto", fontWeight: 500 }}>
                State-of-the-art misinformation detection powered by RoBERTa. Built for the modern information era.
              </p>
            </div>
          </section>

          {/* Workspace */}
          <section style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, position: "relative", zIndex: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: 24 }}>

              {/* Input */}
              <div className="glass" style={{
                border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24,
                overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 500
              }}>
                {/* Tabs */}
                <div style={{ display: "flex", padding: 8, gap: 4, background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                  {tabs.map(tab => (
                    <button key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={activeTab === tab.id ? "tab-btn-active" : "tab-btn-inactive"}
                      style={{
                        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                        gap: 8, padding: "8px", fontSize: 13, borderRadius: 12, border: "none", cursor: "pointer",
                        background: activeTab === tab.id ? "rgba(255,255,255,0.1)" : "transparent",
                        color: activeTab === tab.id ? "#fff" : "#86868b"
                      }}>
                      <MaterialIcon name={tab.icon} style={{ fontSize: 16 }} />
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div style={{ padding: 32, display: "flex", flexDirection: "column", flexGrow: 1, gap: 24 }}>
                  <div style={{ flexGrow: 1 }}>
                    <textarea
                      value={text}
                      onChange={e => setText(e.target.value)}
                      placeholder="Paste article content to begin analysis..."
                      style={{
                        width: "100%", minHeight: 300, background: "transparent", border: "none",
                        color: "#fff", fontSize: 20, fontWeight: 500, resize: "none",
                        outline: "none", lineHeight: 1.6, fontFamily: "inherit",
                        "::placeholder": { color: "#424245" }
                      }}
                    />
                    {activeTab === "url" && (
                      <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste news article URL..."
                        style={{
                          width: "100%",
                          marginTop: 20,
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.2)",
                          padding: 12,
                          color: "#fff",
                          borderRadius: 10,
                          fontSize: 14,
                          fontFamily: "inherit",
                          outline: "none"
                        }}
                      />
                    )}
                    {activeTab === "image" && (
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ marginTop: 20, color: "#fff" }}
                      />
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                    <p style={{ fontSize: 12, color: "#86868b" }}>Maximum 5,000 characters for deep scanning.</p>
                    <button className="shimmer-hover-white" onClick={handleAnalyze} style={{
                      padding: "12px 32px", background: "#fff", color: "#000",
                      fontWeight: 600, borderRadius: 9999, border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 8, fontSize: 14,
                      opacity: loading ? 0.7 : 1
                    }}>
                      <span>{loading ? "Analyzing..." : "Analyze Now"}</span>
                      <MaterialIcon name="arrow_forward_ios" style={{ fontSize: 14 }} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="glass" style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 32, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
                  <h3 style={{ fontWeight: 600, color: "#86868b", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}>Analysis</h3>
                  <span style={{
                    padding: "4px 12px", borderRadius: 9999, fontSize: 11, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.05em",
                    background: loading ? "rgba(255,255,255,0.05)" : showResult && prediction === "FAKE" ? "rgba(239,68,68,0.1)" : showResult && prediction === "REAL" ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)",
                    color: loading ? "#86868b" : showResult && prediction === "FAKE" ? "#ef4444" : showResult && prediction === "REAL" ? "#22c55e" : "#86868b",
                    border: `1px solid ${loading ? "rgba(255,255,255,0.1)" : showResult && prediction === "FAKE" ? "rgba(239,68,68,0.2)" : showResult && prediction === "REAL" ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.1)"}`
                  }}>
                    {loading
                      ? "Scanning..."
                      : showResult
                      ? prediction === "FAKE"
                          ? "High Risk"
                          : "Verified"
                      : "Waiting"}
                  </span>
                </div>

                <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 48 }}>
                  {/* Score */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="128" height="128">
                        <circle cx="64" cy="64" r="58" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                        <circle cx="64" cy="64" r="58" fill="transparent" stroke="#0071e3" strokeWidth="6"
                          strokeDasharray="364.4" strokeDashoffset="43.7" />
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 36, fontWeight: 700 }}>
                          {loading ? "..." : showResult ? displayConfidence : "--"}
                        </span>
                        <span style={{ fontSize: 10, color: "#86868b", textTransform: "uppercase", fontWeight: 700, letterSpacing: "-0.02em" }}>Certainty</span>
                      </div>
                    </div>
                  </div>

                  {/* Insights */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { icon: "psychology", title: "Linguistic Pattern Match", desc: "Syntactic structures correlate with verified misinformation templates." },
                      { icon: "database", title: "Source Reliability", desc: "Metadata cross-referencing suggests high volatility history." }
                    ].map(item => (
                      <div key={item.title} className="insight-card">
                        <div style={{ display: "flex", gap: 12 }}>
                          <MaterialIcon name={item.icon} style={{ color: "#0071e3", fontSize: 20, flexShrink: 0 }} />
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 500, color: "#fff", marginBottom: 4 }}>{item.title}</p>
                            <p style={{ fontSize: 12, lineHeight: 1.6, color: "#86868b" }}>{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button style={{
                  marginTop: 32, width: "100%", padding: "12px", fontSize: 13, fontWeight: 600,
                  color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, background: "transparent", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
                  onMouseOver={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                  onMouseOut={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
                  <MaterialIcon name="ios_share" style={{ fontSize: 16 }} />
                  Detailed Report
                </button>
              </div>
            </div>
          </section>

          {/* Analytics */}
          <section style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 8px" }}>
              <div>
                <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>System Performance</h2>
                <p style={{ color: "#86868b", fontSize: 18 }}>Real-time global monitoring</p>
              </div>
              <div style={{ display: "flex", padding: 4, background: "rgba(255,255,255,0.05)", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.12)" }}>
                <button className={activePeriod === "monthly" ? "period-btn-active" : "period-btn-inactive"} onClick={() => setActivePeriod("monthly")}>Monthly</button>
                <button className={activePeriod === "lifetime" ? "period-btn-active" : "period-btn-inactive"} onClick={() => setActivePeriod("lifetime")}>Lifetime</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {/* Stats */}
              {[
                { icon: "monitoring", iconColor: "#0071e3", label: "Total Scan", value: "124.8K", valueColor: "#fff" },
                { icon: "dangerous", iconColor: "#ef4444", label: "Fake Flagged", value: "42.3K", valueColor: "#ef4444" },
                { icon: "verified", iconColor: "#22c55e", label: "Verified Real", value: "82.5K", valueColor: "#22c55e" },
                { icon: "precision_manufacturing", iconColor: "#0071e3", label: "Precision", value: "94.8%", valueColor: "#fff" },
              ].map(stat => (
                <div key={stat.label} className="bento-card glass" style={{
                  border: "1px solid rgba(255,255,255,0.12)", padding: 24, borderRadius: 18,
                  display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32
                }}>
                  <MaterialIcon name={stat.icon} style={{ color: stat.iconColor, fontSize: 24 }} />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{stat.label}</p>
                    <p style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", color: stat.valueColor }}>{stat.value}</p>
                  </div>
                </div>
              ))}

              {/* Bar Chart */}
              <div className="glass" style={{ gridColumn: "span 3", border: "1px solid rgba(255,255,255,0.12)", padding: 32, borderRadius: 18 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
                  <h3 style={{ fontWeight: 600, color: "#86868b", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}>Global Activity Trends</h3>
                  <div style={{ display: "flex", gap: 16 }}>
                    {[{ color: "#0071e3", label: "Verified" }, { color: "rgba(255,255,255,0.2)", label: "Suspicious" }].map(l => (
                      <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, display: "inline-block" }} />
                        <span style={{ fontSize: 11, fontWeight: 500, color: "#86868b" }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ height: 256, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, padding: "0 8px" }}>
                  {bars.map((h, i) => (
                    <div key={i} className="bar-item" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              {/* Pie Chart */}
              <div className="glass" style={{ border: "1px solid rgba(255,255,255,0.12)", padding: 32, borderRadius: 18, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <h3 style={{ fontWeight: 600, color: "#86868b", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", width: "100%", textAlign: "left", marginBottom: 32 }}>Content Mix</h3>
                <div style={{ position: "relative", width: 176, height: 176, marginBottom: 32 }}>
                  <svg width="176" height="176" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="88" cy="88" r="76" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
                    <circle cx="88" cy="88" r="76" fill="transparent" stroke="#0071e3" strokeWidth="16"
                      strokeDasharray="477.5" strokeDashoffset="143.2" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 30, fontWeight: 700 }}>70%</span>
                    <span style={{ fontSize: 10, color: "#86868b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Real</span>
                  </div>
                </div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600 }}>
                    <span style={{ color: "#86868b" }}>Verified Sources</span>
                    <span style={{ color: "#fff" }}>70%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer style={{ marginTop: 160, borderTop: "1px solid rgba(255,255,255,0.12)", padding: "48px 0", background: "rgba(22,22,23,0.5)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 48, marginBottom: 64 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product</h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {["How it works", "Pricing", "API Docs"].map(item => (
                    <li key={item}><a href="#" className="footer-link">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>Company</h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {["About", "Ethics", "Contact"].map(item => (
                    <li key={item}><a href="#" className="footer-link">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, gridColumn: "span 2" }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>Precision Fact-Checking</h4>
                <p style={{ fontSize: 12, lineHeight: 1.7, color: "#86868b", maxWidth: 380 }}>
                  RoBERTa AI is a high-performance transformer model optimized for identifying linguistic signatures of disinformation.
                </p>
              </div>
            </div>
            <div style={{ paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
              <p style={{ fontSize: 11, color: "#86868b" }}>Copyright © 2024 FactGuard Systems. All rights reserved.</p>
              <div style={{ display: "flex", gap: 24 }}>
                <a href="#" className="footer-link" style={{ fontSize: 11 }}>Privacy Policy</a>
                <a href="#" className="footer-link" style={{ fontSize: 11, borderLeft: "1px solid rgba(255,255,255,0.12)", paddingLeft: 24 }}>Terms of Use</a>
                <a href="#" className="footer-link" style={{ fontSize: 11, borderLeft: "1px solid rgba(255,255,255,0.12)", paddingLeft: 24 }}>Site Map</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Help Button */}
        <button className="glass help-btn" style={{
          position: "fixed", bottom: 32, right: 32, width: 48, height: 48,
          border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "50%",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 100
        }}>
          <MaterialIcon name="help" style={{ fontSize: 20 }} className="help-icon" />
        </button>
      </div>
    </>
  );
}