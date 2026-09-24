'use client';

import { useEffect, useRef, useState } from "react";
import { Herr_Von_Muellerhoff } from "next/font/google";

// Self-hosted at build time like the other fonts. Not preloaded: it only
// appears at the very bottom of the page.
const signatureFont = Herr_Von_Muellerhoff({ weight: "400", subsets: ["latin"], display: "swap", preload: false });

/**
 * Handwritten sign-off at the end of every page. Once scrolled into view the
 * ink sweeps in left to right while the letters close up and sharpen, so it
 * reads as being written. Without JS (or with reduced motion) it's simply
 * shown; the hidden starting state only applies while JS is running.
 */
export function Signature() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setSigned(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSigned(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <p ref={ref} className={`signature ${signatureFont.className}`} data-signed={signed || undefined} data-testid="footer-signature">
      <span className="signature-ink">Gjergji K.</span>
    </p>
  );
}
