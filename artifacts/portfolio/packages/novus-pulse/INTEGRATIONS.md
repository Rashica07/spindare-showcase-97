# Installing @kiq/novus-pulse in Any App

Three ways to install, easiest first:

| Method | When | How |
|--------|------|-----|
| **npm registry** | Commercial distribution | `npm publish --access public` once in `framework/`, then anyone runs `npm install @kiq/novus-pulse` |
| **Tarball** | Sharing without publishing | `npm pack` in `framework/` → produces `kiq-novus-pulse-0.1.0.tgz` → in the target app: `npm install /path/to/kiq-novus-pulse-0.1.0.tgz` |
| **file: link** | Local dev only | `npm install ../path/to/framework` |

> After changing the SDK, run `npm run build` in `framework/` before packing/publishing.

Every integration below needs only two values:
- **API URL** — e.g. `https://api.yourdomain.com` (dev: `http://localhost:3000`)
- **Tenant slug** — e.g. `admin-workspace`

No passwords, no API keys — public integrations only ever see **published** content.

---

## Next.js / React / Vite (webapp)

```tsx
'use client'; // Next.js App Router only

import { useEffect, useState } from 'react';
import { NovusPulse } from '@kiq/novus-pulse';

export function useContent(slug: string) {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const pulse = new NovusPulse({ baseUrl: 'http://localhost:3000' });

    pulse.getPublicPages('admin-workspace').then((pages) => {
      const page = pages.find((p) => p.slug === slug);
      if (page) setContent(page.content);
    });

    pulse.subscribePublic('admin-workspace');
    const onUpdate = (p: any) => p.slug === slug && setContent(p.content);
    pulse.on('page.updated', onUpdate);

    return () => pulse.off('page.updated', onUpdate);
  }, [slug]);

  return content;
}
```

## React Native (mobile)

Identical to the React hook above — the SDK uses native `fetch` and
socket.io-client, both of which work in React Native out of the box.
No extra setup.

## Framer

Add a **Code Component** (Assets → Code → New):

```tsx
import { useEffect, useState } from "react"

export default function PulseText({ slug = "home", field = "hero.h1Line1" }) {
    const [value, setValue] = useState("…")

    useEffect(() => {
        fetch("https://api.yourdomain.com/api/v1/public/admin-workspace/pages")
            .then((r) => r.json())
            .then((pages) => {
                const page = pages.find((p) => p.slug === slug)
                const v = field.split(".").reduce((a, k) => a?.[k], page?.content)
                if (v) setValue(String(v))
            })
    }, [slug, field])

    return <span>{value}</span>
}
```

Drop it on the canvas, set `field` to any content path (e.g. `hero.sub`).
For live updates add `import { io } from "https://esm.sh/socket.io-client@4"` and
`io(API).emit("subscribe_public", { tenantSlug: "admin-workspace" })`.

## WordPress

Server-side (no CORS setup needed) — add to your theme's `functions.php`:

```php
function novus_pulse_content($atts) {
    $a = shortcode_atts(['slug' => 'home', 'field' => 'hero.h1Line1'], $atts);
    $res = wp_remote_get('https://api.yourdomain.com/api/v1/public/admin-workspace/pages');
    if (is_wp_error($res)) return '';
    $pages = json_decode(wp_remote_retrieve_body($res), true);
    foreach ($pages as $page) {
        if ($page['slug'] === $a['slug']) {
            $value = $page['content'];
            foreach (explode('.', $a['field']) as $key) {
                $value = $value[$key] ?? null;
            }
            return esc_html(is_string($value) ? $value : '');
        }
    }
    return '';
}
add_shortcode('novus_pulse', 'novus_pulse_content');
```

Then anywhere in a post/page: `[novus_pulse slug="home" field="hero.sub"]`

## Vanilla JS (any website)

```html
<script type="module">
  const API = 'https://api.yourdomain.com';
  const pages = await fetch(`${API}/api/v1/public/admin-workspace/pages`).then(r => r.json());
  const home = pages.find(p => p.slug === 'home');
  document.querySelector('#headline').textContent = home.content.hero.h1Line1;
</script>
```

---

## Production checklist

- [ ] Add every frontend's origin to `CORS_ORIGINS` in the backend `.env`
- [ ] Use strong random `JWT_SECRET` / `JWT_REFRESH_SECRET` (never the defaults)
- [ ] Serve the API over HTTPS
- [ ] Frontends use ONLY the public endpoint + `subscribePublic` — never ship admin credentials in a client app
