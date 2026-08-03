'use client';

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransitionLoader } from "@/components/PageTransitionLoader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PulseStatusDot } from "@/components/PulseStatusDot";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider>
          <LoadingScreen />
          <PageTransitionLoader />
          {children}
          <WhatsAppButton />
          <PulseStatusDot />
          <Toaster />
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
