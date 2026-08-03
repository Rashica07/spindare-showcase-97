/**
 * @kiq/novus-pulse — Lightweight TypeScript client for the Novus Pulse API.
 *
 * Inlined into the project to avoid external package resolution issues.
 *
 * @example
 * ```ts
 * import { NovusPulse } from '@/lib/novus-pulse';
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
