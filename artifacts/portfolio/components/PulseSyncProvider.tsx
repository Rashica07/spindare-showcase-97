'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { NovusPulse } from '@/lib/novus-pulse';

// Public content pipeline — no credentials needed.
// The site reads published content via the public endpoint and stays in
// sync through the public realtime room for this tenant.
const PULSE_URL = process.env.NEXT_PUBLIC_PULSE_URL || 'http://localhost:3000';
const PULSE_TENANT = process.env.NEXT_PUBLIC_PULSE_TENANT || 'admin-workspace';
const HOME_SLUG = 'home';

interface PulseContextType {
  pulseData: any;
  isConnected: boolean;
}

const PulseContext = createContext<PulseContextType>({
  pulseData: null,
  isConnected: false,
});

export const usePulseSync = () => useContext(PulseContext);

export function PulseSyncProvider({ children }: { children: React.ReactNode }) {
  const [pulseData, setPulseData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const pulse = new NovusPulse({ baseUrl: PULSE_URL });

    // 1. Initial published content (public REST endpoint)
    pulse
      .getPublicPages(PULSE_TENANT)
      .then((pages) => {
        const homePage = pages.find((p: any) => p.slug === HOME_SLUG);
        if (homePage?.content) {
          setPulseData(homePage.content);
        }
      })
      .catch((err) => console.error('Failed to fetch initial pulse data', err));

    // 2. Live updates (public realtime room — published pages only)
    pulse.subscribePublic(PULSE_TENANT);

    const onPage = (payload: any) => {
      if (payload?.slug === HOME_SLUG && payload.content) {
        setPulseData(payload.content);
      }
    };
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    pulse.on('page.updated', onPage);
    pulse.on('page.created', onPage);
    pulse.on('connect', onConnect);
    pulse.on('disconnect', onDisconnect);

    return () => {
      pulse.off('page.updated', onPage);
      pulse.off('page.created', onPage);
      pulse.off('connect', onConnect);
      pulse.off('disconnect', onDisconnect);
      pulse.unsubscribePublic(PULSE_TENANT);
    };
  }, []);

  return (
    <PulseContext.Provider value={{ pulseData, isConnected }}>
      {children}
    </PulseContext.Provider>
  );
}
