'use client';

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PulseStatusDot } from "@/components/PulseStatusDot";

declare global {
  interface Window { __kiqaHydrated?: boolean }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  // Tells the inline script in app/layout.tsx the app is interactive. If
  // hydration only finished after its timeout (slow network), switch the
  // JS-only UI back on.
  useEffect(() => {
    window.__kiqaHydrated = true;
    document.documentElement.classList.remove("js-failed");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider>
          {children}
          <WhatsAppButton />
          <PulseStatusDot />
          <Toaster />
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
