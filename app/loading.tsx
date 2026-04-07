export default function Loading() {
  return (
    <div
      style={{
        paddingTop: "calc(var(--nav-h, 64px) + 64px)",
        paddingInline: "clamp(20px, 5vw, 48px)",
        maxWidth: 1080,
        margin: "0 auto",
      }}
    >
      <div className="skeleton" style={{ width: 100, height: 11, borderRadius: 4, marginBottom: 48 }} />
      <div className="skeleton" style={{ width: "55%", height: 56, borderRadius: 6, marginBottom: 12 }} />
      <div className="skeleton" style={{ width: "38%", height: 56, borderRadius: 6, marginBottom: 32 }} />
      <div className="skeleton skeleton-text" style={{ width: "60%", marginBottom: 10 }} />
      <div className="skeleton skeleton-text" style={{ width: "45%", marginBottom: 48 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 24 }}>
        {[220, 220, 220].map((h, i) => (
          <div key={i} className="skeleton" style={{ height: h, borderRadius: 6 }} />
        ))}
      </div>
    </div>
  );
}
