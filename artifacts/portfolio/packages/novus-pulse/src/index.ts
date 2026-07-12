/**
 * @kiq/novus-pulse — Lightweight TypeScript client for the Novus Pulse API.
 *
 * Works in: Next.js, React, React Native, Node.js 18+, vanilla browser JS.
 * Zero runtime dependencies.
 *
 * @example
 * ```ts
 * import { NovusPulse } from '@kiq/novus-pulse';
 *
 * const pulse = new NovusPulse({
 *   baseUrl: 'https://api.novuspulse.dev',
 * });
 *
 * await pulse.login({ email: 'owner@cafe.com', password: 'SecurePass123!' });
 * const pages = await pulse.getPages();
 * ```
 *
 * @packageDocumentation
 */

// Main client
export { NovusPulse } from './novus-pulse';

// All types — exported for consumers to use in their own code
export type {
  NovusPulseConfig,
  AuthTokens,
  RegisterInput,
  LoginInput,
  RegisterResponse,
  LoginResponse,
  User,
  UpdateUserInput,
  Tenant,
  TenantPlan,
  CreateTenantInput,
  UpdateTenantInput,
  Page,
  CreatePageInput,
  UpdatePageInput,
  Photo,
  CreatePhotoInput,
  UpdatePhotoInput,
  NovusPulseErrorData,
} from './types';

// Error class (exported as value, not just type)
export { NovusPulseError } from './types';
