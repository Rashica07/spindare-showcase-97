export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  read: number;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "flatlist-memory-leak",
    category: "React Native",
    title: "How I fixed a memory leak in FlatList that was crashing Spindare's social feed",
    excerpt: "A real-time social feed with 1000+ posts was grinding to a halt. Here's how I tracked the leak and fixed it for good.",
    date: "Mar 28, 2026",
    read: 7,
    content: `
## The Problem

About six weeks into building Spindare's social feed, I started noticing something wrong. The feed would load fine — scroll fast, render smoothly — but after about 90 seconds of continuous use, frame rate would drop from 60fps to under 20. After three minutes, the app crashed entirely on lower-end iPhones.

The feed was using a standard \`FlatList\` with a real-time Supabase Realtime subscription pushing new posts. On the surface, everything looked fine. Under the hood, something was eating memory alive.

## Diagnosing with Flipper

First step: open Flipper and watch the memory profile while scrolling. Within 60 seconds I could see it: memory climbing steadily with no GC cycles cleaning it up. The heap was growing ~4MB per minute on a feed with 1000 posts.

The two usual suspects for FlatList memory leaks are:

1. **Unregistered event listeners** — listeners added inside \`renderItem\` that never get cleaned up
2. **Image caching** — images loading into memory and never releasing

In our case it was both, plus a third thing I didn't expect.

## Root Cause #1: Inline handlers in renderItem

Our \`renderItem\` was creating new function instances on every render:

\`\`\`tsx
renderItem={({ item }) => (
  <FeedPost
    post={item}
    onLike={() => handleLike(item.id)}        // new function every render
    onComment={() => openComments(item.id)}   // new function every render
  />
)}
\`\`\`

Every scroll event re-renders visible cells. Each re-render creates two new closures per post. With 1000 posts and rapid scrolling, that's thousands of closures never getting freed.

**Fix:** \`useCallback\` with stable references, and pass \`item.id\` as a prop instead of capturing it in a closure:

\`\`\`tsx
const handleLike = useCallback((id: string) => {
  // handler logic
}, []);

renderItem={({ item }) => (
  <FeedPost
    post={item}
    postId={item.id}
    onLike={handleLike}
    onComment={handleComment}
  />
)}
\`\`\`

## Root Cause #2: Supabase channel subscription inside renderItem

This was the worse one. We had a component that subscribed to real-time updates for each individual post (for live like counts). The subscription was being created in \`useEffect\` but only cleaned up when the component unmounted — and FlatList's virtualization was unmounting and remounting cells constantly.

\`\`\`tsx
useEffect(() => {
  const channel = supabase.channel(\`post:\${postId}\`)
    .on('postgres_changes', { ... }, handleUpdate)
    .subscribe();
  // missing return () => supabase.removeChannel(channel)
}, [postId]);
\`\`\`

Missing the cleanup function meant every virtualized unmount left a dangling Supabase WebSocket subscription. With 1000 posts in the feed, we could have hundreds of open channels simultaneously.

**Fix:** Always return the cleanup from \`useEffect\`:

\`\`\`tsx
useEffect(() => {
  const channel = supabase.channel(\`post:\${postId}\`)
    .on('postgres_changes', { ... }, handleUpdate)
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [postId]);
\`\`\`

## Root Cause #3: keyExtractor returning index

This one is subtle. We had:

\`\`\`tsx
keyExtractor={(item, index) => index.toString()}
\`\`\`

When new posts arrive at the top of the feed (real-time), all existing keys shift. React Native's reconciler thinks every item changed and re-renders the entire list. Use a stable ID:

\`\`\`tsx
keyExtractor={(item) => item.id}
\`\`\`

## The Result

After all three fixes, memory growth dropped from ~4MB/min to essentially flat. The feed now runs at 60fps for 10+ minutes of continuous use with no crashes, even on iPhone 12 Mini with limited RAM.

**The lesson:** FlatList memory issues are almost always about three things — stable keys, cleanup in useEffect, and avoiding inline function creation in renderItem. Get those right and you rarely have to look further.
    `,
  },
  {
    slug: "auth-flow-48-hours",
    category: "Architecture",
    title: "Why I rebuilt Spindare's authentication flow in 48 hours — and don't regret it",
    excerpt: "The old auth setup worked fine until it didn't. An honest breakdown of the decision, the rewrite, and what I'd do differently.",
    date: "Mar 14, 2026",
    read: 9,
    content: `
## The Situation

It was a Tuesday. Spindare's auth had been running on a vanilla Clerk setup for two months — email/password, Google OAuth, JWT to Supabase via the Clerk webhook. It worked. Users could sign in, sign out, sessions persisted, nothing was on fire.

Then we decided to add the ban system.

## Why the Old Setup Broke Down

The requirement was simple: banned users should be blocked at every layer — API calls, real-time subscriptions, even reading public data. Our old flow:

1. User signs in via Clerk
2. Clerk issues a JWT
3. JWT is passed to Supabase as a custom auth token
4. Supabase RLS policies check \`auth.uid()\`

The problem: Clerk's JWT had a 1-hour expiry. A banned user who was active when the ban happened would continue to have valid Supabase access for up to 60 minutes. We had no mechanism to invalidate their session mid-flight.

On top of that, our Supabase RLS policies were checking \`auth.uid()\` but our ban table lived in a separate schema that wasn't being checked at the policy level. Banned users could still read posts, still open WebSocket channels. The ban only blocked writes.

## The 48-Hour Rewrite

I didn't want to patch this. Patching auth is how you get security holes. I decided to rebuild the entire auth flow with the ban system as a first-class citizen.

**New architecture:**

\`\`\`
Clerk (identity) → Edge Function (validation + ban check) → Supabase JWT (short-lived)
\`\`\`

Every authenticated Supabase request now goes through a Supabase Edge Function that:
1. Validates the Clerk JWT
2. Checks the ban table for the user's UID
3. If banned, returns 403 immediately
4. If clean, mints a new short-lived Supabase JWT (15 min expiry) and returns it

The client caches this token and refreshes it before expiry. If a ban happens mid-session, the next token refresh fails with 403 and the client is forced to sign out.

\`\`\`typescript
// Edge Function: /functions/v1/auth-token
const { userId } = await verifyClerkToken(req.headers.get('Authorization'));

const { data: ban } = await supabase
  .from('bans')
  .select('id')
  .eq('user_id', userId)
  .single();

if (ban) {
  return new Response('Forbidden', { status: 403 });
}

const token = await mintSupabaseJWT(userId);
return new Response(JSON.stringify({ token }), { status: 200 });
\`\`\`

**RLS policies** now check a custom claim in the JWT rather than \`auth.uid()\` directly, so the policy layer is tightly coupled to our token minting logic.

## What I'd Do Differently

**Start with short-lived tokens.** The 1-hour Clerk JWT was a mistake from day one. Any auth token that lasts more than 15 minutes in a mobile app is asking for problems. Short tokens force you to build proper refresh logic, which then makes mid-session invalidation essentially free.

**Design the ban system before auth, not after.** We built auth assuming all users were valid indefinitely. Adding bans after the fact required a full rewrite. If I'd sketched the trust model upfront — "how do we revoke access instantly?" — the architecture would have been right the first time.

**Don't be afraid to rewrite.** 48 hours felt like a lot when I started. Looking back, it was the right call. The patched version would have had subtle holes that I'd be hunting down for months.

## The Result

Bans now take effect within 15 minutes maximum (the token refresh window). For serious violations we have a force-invalidation endpoint that nukes the cached token client-side via a push notification. The RLS layer is tight, auditable, and doesn't have any "works fine until it doesn't" edge cases.

Auth is one of those things where doing it right once is worth far more than patching something indefinitely.
    `,
  },
  {
    slug: "supabase-vs-firebase",
    category: "Backend",
    title: "Supabase Realtime vs Firebase for social feeds: what I found after stress-testing both",
    excerpt: "I needed a real-time feed for 10k+ concurrent users. Both promised it. Only one delivered.",
    date: "Feb 22, 2026",
    read: 11,
    content: `
## Background

When we started building Spindare's social feed, the architecture decision I spent the most time on was real-time data. A social feed lives or dies on latency. If a user posts a challenge and their friends see it 30 seconds later, that's not a social feed — that's email.

I evaluated Firebase Realtime Database and Supabase Realtime over about two weeks. Here's what I found.

## The Test Setup

I built the same basic feed in both — a list of posts, each with like counts, comment counts, and a timestamp. New posts should appear at the top in real time. Like counts should update live.

Simulated load: 500 concurrent WebSocket connections, each subscribed to the same feed channel, with 50 writes per second (mix of new posts and like updates).

I ran this from a $5 DigitalOcean droplet using \`k6\` for load generation.

## Firebase: What Surprised Me

Firebase's Realtime Database handled the WebSocket connections easily. Connection latency was low, and the SDK's automatic reconnect logic was solid. Under 500 concurrent connections, writes propagated in under 200ms consistently.

Where it fell apart: **data modeling**.

Firebase's document model pushed me toward denormalizing aggressively. To show a post with author info, like count, and comment count in real time, I ended up with a structure where updates to any of those three things triggered re-renders of the entire post object. At 50 writes/second with 500 listeners, that's 25,000 event callbacks per second on the client side.

The SDK batches these, but the result was visible jank on the feed scroll whenever like storms happened (lots of users liking the same post at once). The feed would stutter as the reconciler processed the burst.

Firestore handled this better with its granular field-level update model, but Firestore's real-time pricing at scale gets scary fast.

## Supabase Realtime: What Worked

Supabase Realtime uses Postgres logical replication under the hood, which means you're subscribing to actual database changes — row-level, column-level if you want. This maps much better to a social feed's actual data model.

\`\`\`typescript
supabase
  .channel('feed')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'posts' },
    (payload) => insertPost(payload.new)
  )
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'posts', filter: 'id=eq.' + postId },
    (payload) => updateLikeCount(payload.new.like_count)
  )
  .subscribe();
\`\`\`

Granular subscriptions meant like count updates only triggered re-renders for the specific post being liked, not the entire feed. Under the same 500-connection / 50-writes-per-second load, the feed stayed smooth.

## Where Supabase Falls Short

Connection limits. Supabase's free tier caps you at 200 concurrent Realtime connections. The Pro plan raises this to 500. For a scaling social app, you'll hit this fast.

The workaround: use Realtime only for critical live updates (new posts appearing, notification badges) and poll for less-time-sensitive data (like counts on older posts). We implemented a hybrid — Realtime for new posts and notifications, 30-second polling for like/comment counts on posts older than 2 minutes.

Also: Supabase Realtime's filter syntax is limited. Complex multi-table joins aren't supported in the subscription filter — you subscribe to a table and filter client-side if needed.

## The Decision

We went with Supabase Realtime. The Postgres-native data model and granular subscriptions were worth more to us than Firebase's connection scalability at this stage. When we hit the connection ceiling, we'll shard by feed segment or move critical real-time paths to a dedicated WebSocket server.

The real answer to "which one scales" is: neither, at true scale. Both require architectural changes when you hit tens of thousands of concurrent connections. But for a social app at launch scale (under 5,000 DAU), Supabase Realtime with a hybrid polling strategy handles it cleanly without the data modeling headaches.
    `,
  },
  {
    slug: "react-native-design-system",
    category: "Design",
    title: "Building a design system for a 300-component React Native app",
    excerpt: "When your app has 300 components and 3 developers, design tokens aren't optional. This is how we built ours.",
    date: "Feb 8, 2026",
    read: 8,
    content: `
## Why We Needed a Design System

Spindare hit 100 components before we had any formal system. Everything worked, but opening a new screen and trying to match the color of a button from a screen built two months ago meant digging through files, copy-pasting hex values, and hoping nothing drifted.

By 200 components, the drift was visible. Slightly different border radii, subtly inconsistent spacing between interactive elements, three different shades of "gray" that were all meant to be the same thing. On a phone screen, these details matter.

At 300 components across three developers (me, my uncle, and Daniel), a design system wasn't optional. It was either invest a week in building one or spend months fixing visual inconsistencies one by one.

## The Token Layer

We started at the bottom: design tokens. Every visual constant goes here before it goes anywhere else.

\`\`\`typescript
// tokens/colors.ts
export const colors = {
  background: {
    primary: '#0A0A0F',
    secondary: '#13131A',
    tertiary: '#1C1C26',
    elevated: '#222230',
  },
  accent: {
    primary: '#F5A623',
    soft: 'rgba(245, 166, 35, 0.15)',
    border: 'rgba(245, 166, 35, 0.3)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255,255,255,0.65)',
    tertiary: 'rgba(255,255,255,0.35)',
    muted: 'rgba(255,255,255,0.2)',
  },
  // ...
} as const;
\`\`\`

\`\`\`typescript
// tokens/spacing.ts
export const spacing = {
  xs: 4, sm: 8, md: 12, lg: 16,
  xl: 24, xxl: 32, xxxl: 48,
} as const;

export const radius = {
  sm: 6, md: 10, lg: 16, xl: 24, full: 9999,
} as const;
\`\`\`

The \`as const\` is important — it gives TypeScript literal types so you get autocomplete and type errors if you use a token that doesn't exist.

## The Component Layer

On top of tokens, we built a set of primitive components that all other components compose from. The most important ones:

**\`<Box />\`** — basically a \`View\` but it accepts spacing/color tokens as props:

\`\`\`tsx
<Box px="lg" py="md" bg="secondary" radius="md">
  {children}
</Box>
\`\`\`

**\`<Text />\`** — a typed text component with preset variants:

\`\`\`tsx
<Text variant="heading" size="xl">Post title</Text>
<Text variant="body" color="secondary">Post content</Text>
<Text variant="label" color="muted">3 min ago</Text>
\`\`\`

**\`<Pressable />\`** — wraps React Native's Pressable with standard feedback styles, haptics, and disabled state handling baked in.

Every other component in the app is built from these three primitives. When we want to update how disabled states look globally, we change it in \`<Pressable />\` and it propagates everywhere.

## Keeping It Consistent: The Rules

Rules that have saved us the most time:

**1. No raw hex values outside of tokens.** If you need a color that's not in the token file, add it there first. Never write \`#F5A623\` in a component file.

**2. No \`StyleSheet.create\` for one-off styles.** If a style is used once and can be expressed with tokens via Box/Text, do that. \`StyleSheet.create\` is for reusable, named styles only.

**3. Every new component gets a Storybook story.** We use Storybook for React Native to preview components in isolation. This caught probably 30% of design bugs before they ever hit a real screen.

**4. Spacing only from the scale.** No \`marginTop: 13\`. If 12 or 16 doesn't work, the layout needs to change, not the spacing value.

## What Saved Us the Most Time

Honestly: the \`Text\` component variants. Typography inconsistency was our biggest problem before the system. Having a fixed set of variants (\`heading\`, \`subheading\`, \`body\`, \`label\`, \`caption\`, \`mono\`) and enforcing that everything uses them meant we stopped having "close enough" font sizes scattered through the codebase.

The second biggest win: the token file as source of truth for dark mode. Because everything references tokens, adding a second theme was just adding a second set of token values and a context switch. No hunting through components for hardcoded colors.

## Where We'd Do It Differently

Start earlier. We built the design system at component 200. Starting at component 1 would have saved a lot of retroactive work converting old components to use tokens. Even a minimal token file and two primitive components from day one is infinitely better than adding them later.
    `,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
