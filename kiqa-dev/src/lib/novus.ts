import { NovusPulse } from '@kiq/novus-pulse';

const PULSE_URL = process.env.NEXT_PUBLIC_PULSE_URL || 'http://localhost:3000';

export const pulse = new NovusPulse({
  baseUrl: PULSE_URL,
  autoConnectSocket: false,
});
