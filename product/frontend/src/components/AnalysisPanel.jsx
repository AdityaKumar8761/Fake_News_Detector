import { useEffect, useState } from "react";
export default function AnalysisPanel({ prediction, confidence, loading }) {


const [displayPercent, setDisplayPercent] = useState(0);

useEffect(() => {
  if (!prediction) return;

  let start = 0;
  const final = Math.round(confidence * 100);

  const interval = setInterval(() => {
    start += 1;
    setDisplayPercent(start);
    if (start >= final) clearInterval(interval);
  }, 15);

  return () => clearInterval(interval);
}, [prediction, confidence]);

  const riskText =
    loading
      ? "Scanning..."
      : prediction === "FAKE"
      ? "FAKE"
      : prediction === "REAL"
      ? "REAL"
      : "Waiting";

  const riskColor =
    prediction === "FAKE"
      ? "#ef4444"
      : prediction === "REAL"
      ? "#22c55e"
      : "#86868b";

  return (
    <div
      className="glass"
      style={{
        padding: 32,
        display: "flex",
        flexDirection: "column",
        minHeight: 420,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        <h3
          style={{
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#86868b",
          }}
        >
          Analysis
        </h3>

        <span
          style={{
            padding: "4px 12px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            background: `${riskColor}20`,
            color: riskColor,
            border: `1px solid ${riskColor}40`,
          }}
        >
          {riskText}
        </span>
      </div>

      {/* CONFIDENCE CIRCLE */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            position: "relative",
            width: 140,
            height: 140,
            margin: "0 auto",
          }}
        >
          <svg width="140" height="140">
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="transparent"
              stroke="rgba(58, 67, 68, 0.56)"
              strokeWidth="8"
            />
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="transparent"
              stroke="#1bb5cd"
              strokeWidth="8"
              strokeDasharray={377}
              strokeDashoffset={377 - (377 * displayPercent) / 100}
              style={{
                transition: "stroke-dashoffset 0.6s ease",
              }}
            />
          </svg>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 34, fontWeight: 700 }}>
              {loading ? "..." : prediction ? displayPercent : "--"}
            </span>

            <span
              style={{
                fontSize: 10,
                color: "#86868b",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Certainty
            </span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
        <InsightCard 
          icon="psychology" 
          title="Linguistic Pattern Match" 
          desc="Syntactic structures correlate with verified misinformation templates." 
        />
        <InsightCard 
          icon="database" 
          title="Source Reliability" 
          desc="Metadata cross-referencing suggests high volatility history." 
        />
      </div>
      {/* REPORT BUTTON */}
      <button
        style={{
          marginTop: "auto",
          padding: 12,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "transparent",
          color: "#86868b",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Detailed Report
      </button>
    </div>
  );
}

/* ---------- SMALL CARD COMPONENT ---------- */

function InsightCard({ icon, title, desc }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        display: "flex",
        gap: 12,
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ color: "#0071e3" }}
      >
        {icon}
      </span>

      <div>
        <p style={{ fontSize: 13, fontWeight: 500 }}>{title}</p>
        <p style={{ fontSize: 12, color: "#86868b" }}>{desc}</p>
      </div>
    </div>
  );
}