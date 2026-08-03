// ─────────────────────────────────────────────────────────
// Novus Pulse Client SDK — TypeScript Interfaces
// These mirror the backend's entities and DTOs exactly.
// ─────────────────────────────────────────────────────────

// ── Configuration ───────────────────────────────────────

export interface NovusPulseConfig {
  /**
   * Base URL of the Novus Pulse API server.
   * Example: "https://api.novuspulse.dev" or "http://localhost:3000"
   * Do NOT include a trailing slash or the /api/v1 prefix — the SDK adds it.
   */
  baseUrl: string;

  /**
   * Optional: Pre-set an access token (e.g., from localStorage on page load).
   * If not set, call .login() or .register() first.
   */
  accessToken?: string;

  /**
   * Optional: Pre-set a refresh token for auto-renewal.
   */
  refreshToken?: string;

  /**
   * Optional: Called whenever tokens are refreshed (login, register, or auto-refresh).
   * Use this to persist tokens to localStorage, AsyncStorage, cookies, etc.
   *
   * Example:
   * ```ts
   * onTokenRefresh: (tokens) => {
   *   localStorage.setItem('accessToken', tokens.accessToken);
   *   localStorage.setItem('refreshToken', tokens.refreshToken);
   * }
   * ```
   */
  onTokenRefresh?: (tokens: AuthTokens) => void;

  /**
   * Optional: Called when authentication fails and cannot be recovered
   * (e.g., refresh token expired). Use this to redirect to login.
   */
  onAuthError?: (error: NovusPulseError) => void;

  /**
   * Optional: Custom fetch implementation. Defaults to globalThis.fetch.
   * Useful for testing or environments without native fetch.
   */
  fetch?: typeof globalThis.fetch;

  /**
   * Optional: Automatically connect to the WebSocket server if tokens are present.
   * Defaults to true.
   */
  autoConnectSocket?: boolean;
}

// ── Auth ────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  tenantName: string;
  tenantSlug: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterResponse extends AuthTokens {
  user: User;
  tenant: Tenant;
}

export interface LoginResponse extends AuthTokens {
  user: User & {
    /** Tenant billing plan — drives feature entitlements in dashboards. */
    plan?: TenantPlan;
    tenantSlug?: string | null;
  };
}

/** Billing plans — 'starter' is the trial tier. */
export type TenantPlan = 'starter' | 'studio' | 'agency';

// ── Users ──────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'tenant_owner' | 'tenant_worker';
  tenantId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

// ── Tenants ────────────────────────────────────────────

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: TenantPlan;
  ownerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantInput {
  name: string;
  slug: string;
  plan?: TenantPlan;
}

export interface UpdateTenantInput {
  name?: string;
  slug?: string;
  plan?: TenantPlan;
}

// ── Pages ──────────────────────────────────────────────

export interface Page {
  id: string;
  tenantId: string;
  title: string;
  slug: string;
  /**
   * Content type: 'page' | 'product' | 'article' | 'event', or any
   * custom string a tenant's developer defines.
   */
  type: string;
  content: Record<string, unknown>;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePageInput {
  title: string;
  slug: string;
  type?: string;
  content?: Record<string, unknown>;
  published?: boolean;
}

export interface UpdatePageInput {
  title?: string;
  slug?: string;
  type?: string;
  content?: Record<string, unknown>;
  published?: boolean;
}

// ── Photos ─────────────────────────────────────────────

export interface Photo {
  id: string;
  tenantId: string;
  url: string;
  filename: string;
  size: number;
  uploadedBy: string;
  createdAt: string;
}

export interface CreatePhotoInput {
  url: string;
  filename: string;
  size: number;
}

export interface UpdatePhotoInput {
  url?: string;
  filename?: string;
  size?: number;
}

// ── Errors ─────────────────────────────────────────────

export interface NovusPulseErrorData {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp?: string;
  path?: string;
}

export class NovusPulseError extends Error {
  public readonly statusCode: number;
  public readonly errors: string[];
  public readonly errorType: string;
  public readonly timestamp?: string;
  public readonly path?: string;

  constructor(data: NovusPulseErrorData) {
    const messages = Array.isArray(data.message) ? data.message : [data.message];
    super(messages.join(', '));

    this.name = 'NovusPulseError';
    this.statusCode = data.statusCode;
    this.errors = messages;
    this.errorType = data.error;
    this.timestamp = data.timestamp;
    this.path = data.path;
  }

  /** True if the error is a 401 Unauthorized */
  get isUnauthorized(): boolean {
    return this.statusCode === 401;
  }

  /** True if the error is a 403 Forbidden */
  get isForbidden(): boolean {
    return this.statusCode === 403;
  }

  /** True if the error is a 404 Not Found */
  get isNotFound(): boolean {
    return this.statusCode === 404;
  }

  /** True if the error is a 429 Too Many Requests (rate limited) */
  get isRateLimited(): boolean {
    return this.statusCode === 429;
  }

  /** True if the error is a validation error (400 with field-level messages) */
  get isValidationError(): boolean {
    return this.statusCode === 400 && this.errors.length > 1;
  }
}
