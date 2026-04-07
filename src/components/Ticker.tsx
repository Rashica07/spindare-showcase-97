"use client";

const items = [
  "FULL STACK DEVELOPER",
  "MOBILE APPS",
  "WEB PLATFORMS",
  "REACT NATIVE",
  "NEXT.JS",
  "OPEN TO FREELANCE",
  "14 YEARS OLD",
  "BASED IN ITALY",
  "SHIPS FAST",
  "TYPESCRIPT",
  "SUPABASE",
  "BUILDS REAL PRODUCTS",
];

export function Ticker() {
  const repeated = [...items, ...items];

  return (
    <div className="ticker-wrapper" aria-hidden="true">
      <div className="ticker-track">
        {repeated.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span className="ticker-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
