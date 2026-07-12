# @kiq/novus-pulse

Lightweight TypeScript client for the [Novus Pulse](https://api.novuspulse.dev) multi-tenant API.

Uses native `fetch` for HTTP (Node 18+, browsers, React Native) and `socket.io-client` for real-time sync.

## Install

```bash
npm install @kiq/novus-pulse
```

## Quick Start

```ts
import { NovusPulse } from '@kiq/novus-pulse';

const pulse = new NovusPulse({
  baseUrl: 'https://api.novuspulse.dev',
  onTokenRefresh: (tokens) => {
    // Persist tokens (localStorage, AsyncStorage, cookies, etc.)
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  },
});

// Register a new tenant
const { user, tenant } = await pulse.register({
  email: 'owner@barcelona.cafe',
  password: 'SecurePass123!',
  firstName: 'Carlos',
  lastName: 'García',
  tenantName: 'Barcelona Café',
  tenantSlug: 'barcelona-cafe',
});

// Login
await pulse.login({ email: 'owner@barcelona.cafe', password: 'SecurePass123!' });

// CRUD — automatically scoped to your tenant
const pages = await pulse.getPages();
const page = await pulse.createPage({
  title: 'Welcome',
  slug: 'welcome',
  content: { blocks: [{ type: 'text', value: 'Hello!' }] },
  published: true,
});
await pulse.updatePage(page.id, { published: false });
await pulse.deletePage(page.id);

// Public pages (no auth needed — for your frontend sites)
const publicPages = await pulse.getPublicPages('barcelona-cafe');
```

## Real-Time Sync (no auth needed)

Any frontend — Next.js, React, React Native, Framer, WordPress — can subscribe
to a tenant's **published** content and re-render the instant it changes in the CMS:

```ts
const pulse = new NovusPulse({ baseUrl: 'https://api.novuspulse.dev' });

// 1. Initial content
const pages = await pulse.getPublicPages('barcelona-cafe');

// 2. Live updates
pulse.subscribePublic('barcelona-cafe');
pulse.on('page.updated', (page) => rerender(page));
pulse.on('page.created', (page) => addPage(page));
pulse.on('page.deleted', ({ id, slug }) => removePage(id));
```

Authenticated clients (`login()` / `register()`) automatically join their
tenant's private room and receive the same events for *all* pages, drafts included.

## Restoring Tokens

On app load, restore tokens from your storage:

```ts
const pulse = new NovusPulse({
  baseUrl: 'https://api.novuspulse.dev',
  accessToken: localStorage.getItem('accessToken') ?? undefined,
  refreshToken: localStorage.getItem('refreshToken') ?? undefined,
  onTokenRefresh: (tokens) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  },
  onAuthError: () => {
    // Redirect to login
    window.location.href = '/login';
  },
});
```

## Auto Token Refresh

The SDK automatically handles expired access tokens:

1. A request returns `401 Unauthorized`
2. The SDK calls `/auth/refresh` with your stored refresh token
3. If successful, the original request is retried with the new token
4. Your `onTokenRefresh` callback is called to persist the new tokens
5. If refresh fails, `onAuthError` is called

Concurrent requests that hit 401 simultaneously share a single refresh call (no race conditions).

## Error Handling

```ts
import { NovusPulseError } from '@kiq/novus-pulse';

try {
  await pulse.createPage({ title: 'Test', slug: 'test' });
} catch (error) {
  if (error instanceof NovusPulseError) {
    console.log(error.statusCode);    // 400
    console.log(error.errors);        // ['slug must be URL-safe...']
    console.log(error.isNotFound);    // false
    console.log(error.isRateLimited); // false
  }
}
```

## API Reference

### Auth
| Method | Description |
|--------|-------------|
| `register(input)` | Register tenant + owner, stores tokens |
| `login(input)` | Login, stores tokens |
| `refresh()` | Manually refresh tokens |
| `logout()` | Logout, clears tokens |
| `isAuthenticated` | Check if tokens are set |
| `setAuthTokens(tokens)` | Manually set tokens |
| `clearTokens()` | Clear all tokens |

### Pages
| Method | Description |
|--------|-------------|
| `getPages()` | List pages (tenant-scoped) |
| `getPage(id)` | Get page by ID |
| `createPage(input)` | Create page |
| `updatePage(id, input)` | Update page |
| `deletePage(id)` | Delete page |
| `getPublicPages(slug)` | Public pages (no auth) |

### Real-Time
| Method | Description |
|--------|-------------|
| `subscribePublic(slug)` | Join a tenant's public content stream (no auth) |
| `unsubscribePublic(slug)` | Leave the public stream |
| `on(event, cb)` | Listen: `page.created` / `page.updated` / `page.deleted` |
| `off(event, cb?)` | Stop listening |
| `realtimeConnected` | Whether the socket is currently connected |

### Photos
| Method | Description |
|--------|-------------|
| `getPhotos()` | List photos (tenant-scoped) |
| `getPhoto(id)` | Get photo by ID |
| `createPhoto(input)` | Create photo metadata |
| `updatePhoto(id, input)` | Update photo |
| `deletePhoto(id)` | Delete photo |

### Users
| Method | Description |
|--------|-------------|
| `getProfile()` | Get current user |
| `getUsers()` | List users (tenant-scoped) |
| `getUser(id)` | Get user by ID |
| `updateUser(id, input)` | Update user |
| `deleteUser(id)` | Delete user |

### Tenants (super_admin only)
| Method | Description |
|--------|-------------|
| `getTenants()` | List all tenants |
| `getTenant(id)` | Get tenant by ID |
| `createTenant(input)` | Create tenant |
| `updateTenant(id, input)` | Update tenant |
| `deleteTenant(id)` | Delete tenant |

## Compatibility

| Environment | Support |
|-------------|---------|
| Node.js 18+ | ✅ |
| Next.js (App Router) | ✅ |
| Next.js (Pages Router) | ✅ |
| React (CRA/Vite) | ✅ |
| React Native | ✅ |
| Vanilla Browser JS | ✅ |
| Framer (via fetch) | ✅ |
| WordPress (via fetch) | ✅ |

## License

MIT
