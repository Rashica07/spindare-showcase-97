export function SkeletonCard({ height = 200 }: { height?: number }) {
  return <div className="skeleton" style={{ height, borderRadius: 6 }} />;
}

export function SkeletonText({ width = "100%", height = 14 }: { width?: string | number; height?: number }) {
  return <div className="skeleton skeleton-text" style={{ width, height, borderRadius: 4 }} />;
}

export function SkeletonGrid({ cols = 2, rows = 2, height = 220 }: { cols?: number; rows?: number; height?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <SkeletonCard key={i} height={height} />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div style={{ padding: "104px 48px" }}>
      <div className="skeleton skeleton-text" style={{ width: 160, height: 28, borderRadius: 14, marginBottom: 44 }} />
      <div className="skeleton" style={{ width: "55%", height: 120, borderRadius: 6, marginBottom: 12 }} />
      <div className="skeleton" style={{ width: "40%", height: 120, borderRadius: 6, marginBottom: 36 }} />
      <div className="skeleton skeleton-text" style={{ width: "50%", height: 18, marginBottom: 10 }} />
      <div className="skeleton skeleton-text" style={{ width: "40%", height: 18, marginBottom: 40 }} />
      <div style={{ display: "flex", gap: 12 }}>
        <div className="skeleton" style={{ width: 140, height: 44, borderRadius: 4 }} />
        <div className="skeleton" style={{ width: 120, height: 44, borderRadius: 4 }} />
      </div>
    </div>
  );
}
