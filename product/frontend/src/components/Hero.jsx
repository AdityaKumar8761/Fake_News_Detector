export default function Hero() {
  return (
    <section
      id="home"
      style={{
        textAlign: "center",
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
      <h1
        style={{
          fontSize: "clamp(40px,7vw,72px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
        }}
      >
        Deep Analysis.
        <br />
        <span style={{ color: "#86868b" }}>Verified Accuracy.</span>
      </h1>

      <p
        style={{
          marginTop: 20,
          fontSize: 20,
          color: "#86868b",
          maxWidth: 700,
          marginInline: "auto",
        }}
      >
        State-of-the-art misinformation detection powered by RoBERTa.
        Built for the modern information era.
      </p>
    </section>
  );
}