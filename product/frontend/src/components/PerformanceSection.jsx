export default function PerformanceSection({
  totalScans,
  fakeCount,
  realCount,
  precision,
  realPercent,
  history
}) {

  const lastPredictions = history.slice(0, 12);
  const chartData = [...lastPredictions];
  while (chartData.length < 12) {
    chartData.push(null);
  }

  return (
    <section id="analytics" style={{ padding: "60px" }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 40
      }}>
        <div>
          <h2 style={{ fontSize: 30, fontWeight: 700 }}>
            System Performance
          </h2>
          <p style={{ color: "#86868b", fontSize: 18 }}>
            Real-time global monitoring
          </p>
        </div>

      </div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 24
      }}>

        {/* STAT CARDS */}
        <StatCard icon="monitoring" title="Total Scan" value={totalScans} />
        <StatCard icon="dangerous" title="Fake Flagged" value={fakeCount} color="#ef4444" />
        <StatCard icon="verified" title="Verified Real" value={realCount} color="#22c55e" />
        <StatCard icon="precision_manufacturing" title="Precision" value={`${precision}%`} />

        {/* BAR CHART */}
        <div className="glass" style={{
          gridColumn: "span 3",
          padding: 32,
          borderRadius: 20
        }}>
          <h3 style={{
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#86868b",
            marginBottom: 30
          }}>
            Global Activity Trends
          </h3>

          <div style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 12,
            height: 240,
            paddingTop: 30
          }}>
            {chartData.map((item, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: item ? `${Math.max(item.confidence * 100, 5)}%` : "100%",
                  background: !item 
                    ? "rgba(255, 255, 255, 0.02)"
                    : item.prediction === "FAKE"
                      ? "linear-gradient(180deg, rgba(239,68,68,0.8) 0%, rgba(239,68,68,0.1) 100%)"
                      : "linear-gradient(180deg, rgba(34,197,94,0.8) 0%, rgba(34,197,94,0.1) 100%)",
                  boxShadow: item 
                    ? item.prediction === "FAKE"
                      ? "0 -4px 20px -8px rgba(239,68,68,0.8)"
                      : "0 -4px 20px -8px rgba(34,197,94,0.8)"
                    : "none",
                  borderRadius: "8px 8px 0 0",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderTop: item 
                    ? `2px solid ${item.prediction === "FAKE" ? "#fca5a5" : "#86efac"}` 
                    : "1px dashed rgba(255, 255, 255, 0.05)",
                  position: "relative",
                  opacity: item ? 1 : 0.6
                }}
              >
                {item && (
                   <span style={{ 
                     position: "absolute", 
                     top: -24, 
                     left: "50%", 
                     transform: "translateX(-50%)", 
                     fontSize: 11, 
                     fontWeight: 700, 
                     color: item.prediction === "FAKE" ? "#fca5a5" : "#86efac",
                     textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                   }}>
                     {Math.round(item.confidence * 100)}
                   </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PIE CARD */}
        <div className="glass" style={{
          padding: 32,
          borderRadius: 20,
          textAlign: "center"
        }}>
          <h3 style={{
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#86868b",
            marginBottom: 30,
            textAlign: "left"
          }}>
            Content Mix
          </h3>

          <div style={{
            position: "relative",
            width: 160,
            height: 160,
            margin: "0 auto 30px"
          }}>
            <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="80" cy="80" r="70"
                fill="transparent"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="14"
              />
              <circle cx="80" cy="80" r="70"
                fill="transparent"
                stroke="#0071e3"
                strokeWidth="14"
                strokeDasharray="439"
                strokeDashoffset="132"
              />
            </svg>

            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ fontSize: 30, fontWeight: 700 }}>{realPercent}%</span>
              <span style={{
                fontSize: 10,
                color: "#86868b",
                textTransform: "uppercase",
                fontWeight: 700
              }}>
                Real
              </span>
            </div>
          </div>

          <p style={{ fontSize: 12, color: "#86868b" }}>
            Verified Sources
          </p>
        </div>

      </div>
    </section>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function StatCard({ icon, title, value, color = "#fff" }) {
  return (
    <div className="glass bento-card"
      style={{
        padding: 24,
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        gap: 30
      }}
    >
      <span className="material-symbols-outlined"
        style={{ color: color === "#fff" ? "#0071e3" : color }}>
        {icon}
      </span>

      <div>
        <p style={{
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#86868b"
        }}>
          {title}
        </p>

        <h2 style={{ fontSize: 30, fontWeight: 700, color }}>
          {value}
        </h2>
      </div>
    </div>
  );
}
