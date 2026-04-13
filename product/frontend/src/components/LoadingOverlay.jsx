export default function LoadingOverlay({ loading }) {

  if (!loading) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(10px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      color: "#fff"
    }}>
      <div style={{
        width: 70,
        height: 70,
        borderRadius: "50%",
        border: "4px solid rgba(255,255,255,0.1)",
        borderTop: "4px solid #0071e3",
        animation: "spin 1s linear infinite"
      }} />

      <h2 style={{ marginTop: 25, fontWeight: 600 }}>
        AI is analyzing news...
      </h2>

      <p style={{ color: "#aaa", marginTop: 10 }}>
        Checking language patterns & credibility signals
      </p>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}