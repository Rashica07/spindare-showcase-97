'use client';

import { usePulseSync } from './PulseSyncProvider';

/**
 * Tiny real-time connection indicator, dev-only. Lets you visually confirm
 * whether the live sync socket is actually connected in this tab — useful
 * for isolating "content doesn't update live" reports (backend down vs.
 * browser/network blocking the websocket vs. a real bug in this pipeline).
 */
export function PulseStatusDot() {
  const { isConnected } = usePulseSync();

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono text-muted-foreground">
      <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
      Pulse {isConnected ? 'live' : 'offline'}
    </div>
  );
}
