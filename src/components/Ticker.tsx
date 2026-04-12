"use client";
import { useLanguage } from "@/lib/i18n";

export function Ticker() {
  const { t } = useLanguage();
  const repeated = [...t.ticker.items, ...t.ticker.items];

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
