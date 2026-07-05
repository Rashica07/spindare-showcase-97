---
name: Monorepo /api path collision
description: Why Next.js app routes under app/api/* can silently 404 in this workspace, and how to avoid it.
---

In this pnpm monorepo, each artifact registers a `previewPath` / route prefix with the shared proxy (see `.replit-artifact/artifact.toml` per artifact). If a separate `api` artifact reserves the `/api` prefix, any *other* artifact's own Next.js route handlers under `app/api/*` are shadowed by the proxy and silently 404 in the browser — the Next.js dev server logs look fine, but requests never reach it.

**Why:** the proxy routes by path prefix across artifacts, not per-app; `/api/*` isn't automatically "owned" by the app that defines it in code.

**How to apply:** before adding a Next.js (or any web app) API route, check `.replit-artifact/artifact.toml` of sibling artifacts in the workspace for reserved path prefixes (e.g. `paths = ["/api"]`). If `/api` is already claimed by another artifact, put your app's own server routes under a different path (e.g. `/submit-contact`) instead of `/api/...`. Confirm with an actual e2e test (not just `curl` against the dev server directly) since a raw dev-server curl bypasses the proxy and won't reveal the collision.
