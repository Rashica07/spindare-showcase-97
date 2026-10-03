'use client';

import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/lib/i18n";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransitionLoader } from "@/components/PageTransitionLoader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PulseStatusDot } from "@/components/PulseStatusDot";

declare global {
  interface Window { __kiqaHydrated?: boolean }
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Tells the inline script in app/layout.tsx the app is interactive. If
  // hydration only finished after its timeout (slow network), switch the
  // JS-only UI back on.
  useEffect(() => {
    window.__kiqaHydrated = true;
    document.documentElement.classList.remove("js-failed");
  }, []);

  return (
    <I18nProvider>
      {/* js-only: the overlay is server-rendered and only JS can dismiss it,
          so without working JS (off, blocked, too-old browser) skip it
          instead of covering the page forever. */}
      <div className="js-only loader-slot"><LoadingScreen /></div>
      <PageTransitionLoader />
      {children}
      <WhatsAppButton />
      <PulseStatusDot />
      <Toaster />
    </I18nProvider>
  );
}
