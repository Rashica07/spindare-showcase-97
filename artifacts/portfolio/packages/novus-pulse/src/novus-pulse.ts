import {
  NovusPulseConfig,
  AuthTokens,
  RegisterInput,
  LoginInput,
  RegisterResponse,
  LoginResponse,
  User,
  UpdateUserInput,
  Tenant,
  CreateTenantInput,
  UpdateTenantInput,
  Page,
  CreatePageInput,
  UpdatePageInput,
  Photo,
  CreatePhotoInput,
  UpdatePhotoInput,
  NovusPulseError,
  NovusPulseErrorData,
} from './types';
import { io, Socket } from 'socket.io-client';

/**
 * NovusPulse — Lightweight TypeScript client for the Novus Pulse API.
 *
 * Works in: Next.js, React, React Native, Node.js 18+, vanilla browser JS.
 * Zero dependencies — uses native `fetch` (available everywhere since Node 18).
 *
 * Usage:
 * ```ts
 * import { NovusPulse } from '@kiq/novus-pulse';
 *
 * const pulse = new NovusPulse({
 *   baseUrl: 'https://api.novuspulse.dev',
 *   onTokenRefresh: (tokens) => {
 *     localStorage.setItem('accessToken', tokens.accessToken);
 *     localStorage.setItem('refreshToken', tokens.refreshToken);
 *   },
 * });
 *
 * // Login
 * const { user } = await pulse.login({ email: '...', password: '...' });
 *
 * // Fetch pages (automatically scoped to user's tenant)
 * const pages = await pulse.getPages();
 *
 * // Fetch public pages (no auth needed)
 * const publicPages = await pulse.getPublicPages('barcelona-cafe');
 * ```
 */
export class NovusPulse {
  private readonly baseUrl: string;
  private readonly apiPrefix = '/api/v1';
  private accessToken: string | null;
  private refreshToken: string | null;
  private readonly onTokenRefresh?: (tokens: AuthTokens) => void;
  private readonly onAuthError?: (error: NovusPulseError) => void;
  private readonly fetchFn: typeof globalThis.fetch;
  private isRefreshing = false;
  private refreshPromise: Promise<AuthTokens> | null = null;
  private readonly autoConnectSocket: boolean;
  private socket: Socket | null = null;
  /** Tenant slugs this client wants public (unauthenticated) realtime updates for. */
  private readonly publicSubscriptions = new Set<string>();
  /**
   * Registered realtime handlers. Kept here (not only on the socket) so they
   * survive socket re-creation — e.g. handlers added before login(), or when
   * the socket reconnects with a new token.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly eventHandlers = new Map<string, Set<(...args: any[]) => void>>();

  constructor(config: NovusPulseConfig) {
    // Strip trailing slash from baseUrl
    this.baseUrl = config.baseUrl.replace(/\/+$/, '');
    this.accessToken = config.accessToken ?? null;
    this.refreshToken = config.refreshToken ?? null;
    this.onTokenRefresh = config.onTokenRefresh;
    this.onAuthError = config.onAuthError;
    this.fetchFn = config.fetch ?? globalThis.fetch.bind(globalThis);
    this.autoConnectSocket = config.autoConnectSocket ?? true;

    if (this.accessToken && this.autoConnectSocket) {
      this.connectSocket();
    }
  }

  // ════════════════════════════════════════════════════════
  // AUTH
  // ════════════════════════════════════════════════════════

  /**
   * Register a new tenant and owner account.
   * Automatically stores tokens after registration.
   */
  async register(input: RegisterInput): Promise<RegisterResponse> {
    const data = await this.request<RegisterResponse>('POST', '/auth/register', input, {
      skipAuth: true,
    });
    this.setTokens(data);
    return data;
  }

  /**
   * Login with email and password.
   * Automatically stores tokens after login.
   */
  async login(input: LoginInput): Promise<LoginResponse> {
    const data = await this.request<LoginResponse>('POST', '/auth/login', input, {
      skipAuth: true,
    });
    this.setTokens(data);
    return data;
  }

  /**
   * Refresh tokens using the stored refresh token.
   * Called automatically when a request gets a 401 — you rarely need to call this manually.
   */
  async refresh(): Promise<AuthTokens> {
    if (!this.refreshToken) {
      throw new NovusPulseError({
        statusCode: 401,
        message: 'No refresh token available. Please login first.',
        error: 'Unauthorized',
      });
    }

    const data = await this.request<AuthTokens>(
      'POST',
      '/auth/refresh',
      { refreshToken: this.refreshToken },
      { skipAuth: true, skipAutoRefresh: true },
    );
    this.setTokens(data);
    return data;
  }

  /**
   * Logout — invalidates the refresh token on the server.
   * Clears stored tokens locally.
   */
  async logout(): Promise<void> {
    try {
      await this.request('POST', '/auth/logout');
    } finally {
      // Clear tokens even if the logout request fails
      this.clearTokens();
    }
  }

  /**
   * Check if the client currently has tokens set.
   * Note: tokens may be expired — this doesn't verify them.
   */
  get isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  /**
   * Manually set tokens (e.g., restored from localStorage on app init).
   */
  setAuthTokens(tokens: AuthTokens): void {
    this.setTokens(tokens);
  }

  /**
   * Clear all stored tokens.
   * Keeps the realtime socket alive (anonymously) if there are active
   * public subscriptions; otherwise disconnects it.
   */
  clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    if (this.publicSubscriptions.size > 0) {
      this.connectSocket();
    } else {
      this.disconnectSocket();
    }
  }

  // ════════════════════════════════════════════════════════
  // USERS
  // ════════════════════════════════════════════════════════

  /** Get the current authenticated user's profile. */
  async getProfile(): Promise<User> {
    return this.request<User>('GET', '/users/me');
  }

  /** List all users (scoped to your tenant, or all if super_admin). */
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('GET', '/users');
  }

  /** Get a user by ID. */
  async getUser(id: string): Promise<User> {
    return this.request<User>('GET', `/users/${id}`);
  }

  /** Update a user by ID. Requires tenant_owner or super_admin role. */
  async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    return this.request<User>('PUT', `/users/${id}`, input);
  }

  /** Delete a user by ID. Requires tenant_owner or super_admin role. */
  async deleteUser(id: string): Promise<void> {
    await this.request('DELETE', `/users/${id}`);
  }

  // ════════════════════════════════════════════════════════
  // TENANTS (super_admin only)
  // ════════════════════════════════════════════════════════

  /** List all tenants. Requires super_admin role. */
  async getTenants(): Promise<Tenant[]> {
    return this.request<Tenant[]>('GET', '/tenants');
  }

  /** Get a tenant by ID. Requires super_admin role. */
  async getTenant(id: string): Promise<Tenant> {
    return this.request<Tenant>('GET', `/tenants/${id}`);
  }

  /** Create a new tenant. Requires super_admin role. */
  async createTenant(input: CreateTenantInput): Promise<Tenant> {
    return this.request<Tenant>('POST', '/tenants', input);
  }

  /** Update a tenant. Requires super_admin role. */
  async updateTenant(id: string, input: UpdateTenantInput): Promise<Tenant> {
    return this.request<Tenant>('PUT', `/tenants/${id}`, input);
  }

  /** Delete a tenant. Requires super_admin role. */
  async deleteTenant(id: string): Promise<void> {
    await this.request('DELETE', `/tenants/${id}`);
  }

  // ════════════════════════════════════════════════════════
  // PAGES
  // ════════════════════════════════════════════════════════

  /**
   * List all pages (scoped to your tenant, or all if super_admin).
   * Pass a content type ('product', 'article', 'event', …) to list only
   * that type — the same data model, filtered.
   */
  async getPages(type?: string): Promise<Page[]> {
    const query = type ? `?type=${encodeURIComponent(type)}` : '';
    return this.request<Page[]>('GET', `/pages${query}`);
  }

  /** Get a single page by ID. */
  async getPage(id: string): Promise<Page> {
    return this.request<Page>('GET', `/pages/${id}`);
  }

  /** Create a new page in your tenant. */
  async createPage(input: CreatePageInput): Promise<Page> {
    return this.request<Page>('POST', '/pages', input);
  }

  /** Update a page by ID. */
  async updatePage(id: string, input: UpdatePageInput): Promise<Page> {
    return this.request<Page>('PUT', `/pages/${id}`, input);
  }

  /** Delete a page by ID. */
  async deletePage(id: string): Promise<void> {
    await this.request('DELETE', `/pages/${id}`);
  }

  /**
   * PUBLIC: Fetch published pages for a tenant by slug.
   * No authentication required — designed for frontend content display.
   *
   * Usage:
   * ```ts
   * const pages = await pulse.getPublicPages('barcelona-cafe');
   * ```
   */
  async getPublicPages(tenantSlug: string, type?: string): Promise<Page[]> {
    const query = type ? `?type=${encodeURIComponent(type)}` : '';
    return this.request<Page[]>('GET', `/public/${tenantSlug}/pages${query}`, undefined, {
      skipAuth: true,
    });
  }

  // ════════════════════════════════════════════════════════
  // PHOTOS
  // ════════════════════════════════════════════════════════

  /** List all photos (scoped to your tenant, or all if super_admin). */
  async getPhotos(): Promise<Photo[]> {
    return this.request<Photo[]>('GET', '/photos');
  }

  /** Get a single photo by ID. */
  async getPhoto(id: string): Promise<Photo> {
    return this.request<Photo>('GET', `/photos/${id}`);
  }

  /** Create photo metadata in your tenant. */
  async createPhoto(input: CreatePhotoInput): Promise<Photo> {
    return this.request<Photo>('POST', '/photos', input);
  }

  /** Update photo metadata by ID. */
  async updatePhoto(id: string, input: UpdatePhotoInput): Promise<Photo> {
    return this.request<Photo>('PUT', `/photos/${id}`, input);
  }

  /** Delete a photo by ID. */
  async deletePhoto(id: string): Promise<void> {
    await this.request('DELETE', `/photos/${id}`);
  }

  // ════════════════════════════════════════════════════════
  // INTERNAL: HTTP REQUEST LAYER
  // ════════════════════════════════════════════════════════

  /**
   * Core request method — all API calls go through here.
   *
   * Features:
   * - Automatically adds Authorization header with Bearer token
   * - Automatically retries with a refreshed token on 401
   * - Deduplicates concurrent refresh calls (one refresh at a time)
   * - Parses JSON responses and wraps errors in NovusPulseError
   */
  private async request<T = unknown>(
    method: string,
    path: string,
    body?: unknown,
    options?: { skipAuth?: boolean; skipAutoRefresh?: boolean },
  ): Promise<T> {
    const url = `${this.baseUrl}${this.apiPrefix}${path}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add auth header unless this is a public/auth endpoint
    if (!options?.skipAuth && this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await this.fetchFn(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Handle 401 — attempt auto-refresh if we have a refresh token
    if (
      response.status === 401 &&
      !options?.skipAuth &&
      !options?.skipAutoRefresh &&
      this.refreshToken
    ) {
      try {
        await this.autoRefresh();
        // Retry the original request with the new token
        return this.request<T>(method, path, body, {
          ...options,
          skipAutoRefresh: true, // Don't infinitely loop
        });
      } catch (refreshError) {
        // Refresh failed — notify the consumer and throw
        if (this.onAuthError && refreshError instanceof NovusPulseError) {
          this.onAuthError(refreshError);
        }
        throw refreshError;
      }
    }

    // Handle non-2xx responses
    if (!response.ok) {
      let errorData: NovusPulseErrorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          statusCode: response.status,
          message: response.statusText || 'Unknown error',
          error: 'UnknownError',
        };
      }
      const error = new NovusPulseError(errorData);
      // A 401 here means either there was no refresh token to try (this
      // client was built with an access token only), or refresh isn't
      // applicable — either way, the caller needs to know auth is dead
      // rather than silently failing every request forever.
      if (response.status === 401 && !options?.skipAuth && this.onAuthError) {
        this.onAuthError(error);
      }
      throw error;
    }

    // Handle 204 No Content (e.g., DELETE responses)
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  /**
   * Auto-refresh with deduplication.
   * If multiple requests hit 401 simultaneously, only ONE refresh call is made.
   * All waiting requests share the same refresh promise.
   */
  private async autoRefresh(): Promise<AuthTokens> {
    // If a refresh is already in flight, wait for it
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.refresh().finally(() => {
      this.isRefreshing = false;
      this.refreshPromise = null;
    });

    return this.refreshPromise;
  }

  /**
   * Store tokens internally and notify the consumer.
   */
  private setTokens(data: AuthTokens): void {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;

    if (this.autoConnectSocket) {
      this.connectSocket();
    }

    // Notify consumer so they can persist tokens
    if (this.onTokenRefresh) {
      this.onTokenRefresh({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    }
  }

  // ════════════════════════════════════════════════════════
  // REAL-TIME WEBSOCKETS
  // ════════════════════════════════════════════════════════

  private connectSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
    }

    // Anonymous connections are allowed when there are public subscriptions —
    // the server only lets them join public_* rooms (published content only).
    if (!this.accessToken && this.publicSubscriptions.size === 0) return;

    this.socket = io(this.baseUrl, {
      path: '/socket.io', // default
      auth: this.accessToken ? { token: this.accessToken } : {},
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('[Novus Pulse] Real-time socket connected');
      // (Re)join public rooms after every connect/reconnect
      for (const slug of this.publicSubscriptions) {
        this.socket?.emit('subscribe_public', { tenantSlug: slug });
      }
    });

    this.socket.on('disconnect', () => {
      console.log('[Novus Pulse] Real-time socket disconnected');
    });
    
    this.socket.on('connect_error', (err) => {
      console.error('[Novus Pulse] Socket connection error:', err.message);
    });

    // Re-attach every handler registered via .on() — they must survive
    // socket re-creation (login, logout, token refresh, public subscribe).
    for (const [event, callbacks] of this.eventHandlers) {
      for (const callback of callbacks) {
        this.socket.on(event, callback);
      }
    }
  }

  private disconnectSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Subscribe to PUBLIC realtime updates for a tenant's published content.
   * No authentication required — pairs with `getPublicPages(tenantSlug)`.
   *
   * Events received: `page.created`, `page.updated`, `page.deleted`
   * (only for pages with `published: true`).
   *
   * ```ts
   * const pulse = new NovusPulse({ baseUrl: 'http://localhost:3000' });
   * const pages = await pulse.getPublicPages('barcelona-cafe');
   * pulse.subscribePublic('barcelona-cafe');
   * pulse.on('page.updated', (page) => render(page));
   * ```
   */
  subscribePublic(tenantSlug: string): void {
    this.publicSubscriptions.add(tenantSlug);
    if (!this.socket) {
      this.connectSocket();
    } else if (this.socket.connected) {
      this.socket.emit('subscribe_public', { tenantSlug });
    }
    // If the socket exists but is still connecting, the 'connect'
    // handler joins all public rooms automatically.
  }

  /** Stop receiving public realtime updates for a tenant slug. */
  unsubscribePublic(tenantSlug: string): void {
    this.publicSubscriptions.delete(tenantSlug);
    if (this.publicSubscriptions.size === 0 && !this.accessToken) {
      this.disconnectSocket();
    }
  }

  /** Whether the realtime socket is currently connected. */
  get realtimeConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Subscribe to a real-time event.
   * Safe to call at any time — handlers registered before the socket exists
   * are attached automatically as soon as it connects.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event: string, callback: (...args: any[]) => void): void {
    let callbacks = this.eventHandlers.get(event);
    if (!callbacks) {
      callbacks = new Set();
      this.eventHandlers.set(event, callbacks);
    }
    const alreadyRegistered = callbacks.has(callback);
    callbacks.add(callback);

    if (
      !this.socket &&
      this.autoConnectSocket &&
      (this.accessToken || this.publicSubscriptions.size > 0)
    ) {
      // connectSocket() attaches all registered handlers itself
      this.connectSocket();
      return;
    }
    if (!alreadyRegistered) {
      this.socket?.on(event, callback);
    }
  }

  /** Unsubscribe from a real-time event. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off(event: string, callback?: (...args: any[]) => void): void {
    if (callback) {
      this.eventHandlers.get(event)?.delete(callback);
      this.socket?.off(event, callback);
    } else {
      this.eventHandlers.delete(event);
      this.socket?.off(event);
    }
  }
}
