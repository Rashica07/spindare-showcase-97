'use client';

export function PageWatermark({ text }: { text: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        fontFamily: 'var(--font-dm-mono, "DM Mono", monospace)',
        fontSize: 'clamp(72px, 16vw, 220px)',
        fontWeight: 900,
        color: 'rgba(255,255,255,0.032)',
        letterSpacing: '-0.05em',
        lineHeight: 1,
        position: 'absolute',
        right: '-1%',
        bottom: '-18%',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {text}
    </span>
  );
}
