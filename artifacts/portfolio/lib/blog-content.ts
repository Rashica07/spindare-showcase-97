export type BlogSection =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'code'; language: string; text: string }
  | { type: 'callout'; text: string }
  | { type: 'divider' };

export interface BlogArticle {
  slug: string;
  sections: BlogSection[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'flatlist-memory-leak',
    sections: [
      {
        type: 'paragraph',
        text: "It started with a Slack message from Biba: \"The feed is getting slow after a few minutes.\" I thought it was a network issue. It wasn't. After three hours of digging, I found a memory leak that was growing at about 12MB per minute — quietly, invisibly, until the app ran out of headroom and the scroll turned to molasses.",
      },
      {
        type: 'heading',
        text: 'What was happening',
      },
      {
        type: 'paragraph',
        text: "Spindare's social feed renders posts with video previews, user avatars, like animations, and real-time comment counts. Each item is its own mini-world of subscriptions and event listeners. The FlatList was rendering them fast and the UX felt smooth — but something underneath was accumulating.",
      },
      {
        type: 'paragraph',
        text: "The symptom was consistent: after 4–5 minutes of scrolling, frame rate would drop from 60fps to around 30–20fps. Older Android devices hit it sooner. The JS thread heap kept growing even as items scrolled off screen.",
      },
      {
        type: 'heading',
        text: 'Tracking it down',
      },
      {
        type: 'paragraph',
        text: "I opened the React DevTools Profiler and connected to a real device via Metro. My first suspicion was that items were being kept alive in memory after unmounting — a classic FlatList problem when you use closures that capture external state. But that wasn't the culprit.",
      },
      {
        type: 'paragraph',
        text: "I added a counter to track how many Supabase real-time subscriptions were active at any moment. When I opened the feed, I subscribed to comments for each visible post. When I scrolled, new posts came in, new subscriptions opened — but the old ones never closed. After two minutes of scrolling, I had 47 active subscriptions for a feed that showed 5 posts at a time.",
      },
      {
        type: 'code',
        language: 'typescript',
        text: `// The original code — the bug is in the cleanup
useEffect(() => {
  const channel = supabase
    .channel(\`comments-\${postId}\`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments', filter: \`post_id=eq.\${postId}\` }, handleNewComment)
    .subscribe();

  // This cleanup never ran reliably when FlatList recycled the cell
  return () => { supabase.removeChannel(channel); };
}, [postId]);`,
      },
      {
        type: 'paragraph',
        text: "The issue was that React Native's FlatList uses a virtualization window — it unmounts items that scroll far enough out of view. But because I was creating the subscription inside a useEffect with postId as a dependency, and because the component sometimes re-mounted with the same postId (due to key reuse), the cleanup function fired late or not at all during rapid scrolling.",
      },
      {
        type: 'heading',
        text: 'The fix',
      },
      {
        type: 'paragraph',
        text: "I moved the subscription logic out of the individual post component and into a centralized subscription manager. Instead of each FlatList cell managing its own Supabase channel, I built a simple ref-counted registry at the feed level.",
      },
      {
        type: 'code',
        language: 'typescript',
        text: `// Centralized subscription manager — ref-counted
const subscriptionRegistry = new Map<string, { channel: RealtimeChannel; count: number }>();

export function subscribeToPost(postId: string, handler: CommentHandler) {
  const key = \`comments-\${postId}\`;
  const existing = subscriptionRegistry.get(key);

  if (existing) {
    existing.count++;
    return () => unsubscribeFromPost(postId);
  }

  const channel = supabase
    .channel(key)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments', filter: \`post_id=eq.\${postId}\` }, handler)
    .subscribe();

  subscriptionRegistry.set(key, { channel, count: 1 });
  return () => unsubscribeFromPost(postId);
}

function unsubscribeFromPost(postId: string) {
  const key = \`comments-\${postId}\`;
  const entry = subscriptionRegistry.get(key);
  if (!entry) return;
  entry.count--;
  if (entry.count <= 0) {
    supabase.removeChannel(entry.channel);
    subscriptionRegistry.delete(key);
  }
}`,
      },
      {
        type: 'paragraph',
        text: "With this in place, rapid FlatList recycling no longer leaked subscriptions. If two posts with the same ID appeared (edge case in our feed logic), they shared one channel. When the last subscriber unmounted, the channel closed cleanly.",
      },
      {
        type: 'heading',
        text: 'The results',
      },
      {
        type: 'paragraph',
        text: "After the fix, memory growth during a 10-minute scroll session went from +120MB to +4MB — the 4MB being legitimate data cache. Frame rate stayed locked at 60fps throughout. The Slack message from Biba the next day: \"It's smooth.\"",
      },
      {
        type: 'callout',
        text: "If you use Supabase real-time subscriptions inside FlatList or FlashList components, always count references. Never assume useEffect cleanup will fire reliably during virtualization recycling — verify it with a counter.",
      },
      {
        type: 'heading',
        text: "What I'd do differently",
      },
      {
        type: 'paragraph',
        text: "I'd write the subscription manager first, before the feed component. It's easy to see the leak in hindsight — but I built the post component in isolation, where the memory problem was invisible. Integration is where these issues appear. Testing in isolation isn't enough for real-time components.",
      },
    ],
  },
  {
    slug: 'auth-flow-48-hours',
    sections: [
      {
        type: 'paragraph',
        text: "The old login system worked fine until it didn't. We had Expo's AuthSession handling the OAuth flow, a custom token refresh hook, and session state stored in AsyncStorage with an in-memory mirror. It covered 90% of cases — until a user reported that they were getting logged out randomly mid-session, and another reported that switching from WiFi to mobile data killed their session entirely. These were not edge cases. These were customers.",
      },
      {
        type: 'heading',
        text: 'What broke',
      },
      {
        type: 'paragraph',
        text: "The root problem was that our token refresh logic was split across three places: the API client, the auth hook, and a background task. When two parts tried to refresh simultaneously — which happened when the app backgrounded and foregrounded quickly — they'd race each other. One would succeed and write a new token to AsyncStorage. The other, milliseconds later, would write the old token it had started with, overwriting the valid one. The next API call would 401, and the app would sign the user out.",
      },
      {
        type: 'paragraph',
        text: "The network switch issue was simpler: we were checking token validity on a timer rather than on each request. When data returned after a mobile switch, the timer hadn't fired yet, so expired tokens slipped through until the next interval.",
      },
      {
        type: 'heading',
        text: 'The decision to rebuild',
      },
      {
        type: 'paragraph',
        text: "I could have patched both bugs with locks and more careful AsyncStorage coordination. But after mapping the problem, I realized the architecture itself was wrong. We had spread auth responsibility across too much surface area. A login system should have one place that owns tokens, one place that refreshes them, and everything else should just consume — never write.",
      },
      {
        type: 'paragraph',
        text: "Clerk had been on my radar for a while. I'd used it on other projects and it handles exactly the failure modes we were hitting: token refresh races, network transitions, background/foreground lifecycle. The question was whether 48 hours was realistic. It was. Clerk's Expo SDK is good.",
      },
      {
        type: 'heading',
        text: 'The rebuild',
      },
      {
        type: 'paragraph',
        text: "Day one: I installed the Clerk Expo SDK, wrapped the root navigator with ClerkProvider, and replaced our custom useAuth hook with Clerk's. Every screen that checked session state needed one import change. The Google OAuth setup took about 40 minutes — most of that was configuring the redirect scheme in app.json correctly.",
      },
      {
        type: 'code',
        language: 'typescript',
        text: `// Before: custom hook with AsyncStorage and race conditions
const { token, isLoading, signOut } = useCustomAuth();

// After: one line, handles everything
const { isSignedIn, isLoaded, signOut } = useAuth();`,
      },
      {
        type: 'paragraph',
        text: "Day two: I migrated existing users. We had about 200 accounts in our Supabase auth.users table. I wrote a script that called Clerk's Backend API to create matching users with the same email addresses, then updated our database to store Clerk user IDs alongside the old Supabase UUIDs. During transition, the app checked both. After one week, we dropped the fallback.",
      },
      {
        type: 'heading',
        text: 'What the new architecture looks like',
      },
      {
        type: 'paragraph',
        text: "Clerk handles all token management, refresh, and storage. Our Supabase client receives a JWT from Clerk on each request — we pass it via the Authorization header and Supabase validates it against the Clerk JWKS endpoint. The app itself never touches tokens. It doesn't need to.",
      },
      {
        type: 'code',
        language: 'typescript',
        text: `// API client — gets a fresh token on every call, no caching needed
async function getAuthenticatedClient() {
  const token = await getToken({ template: 'supabase' });
  return supabase.auth.setSession({ access_token: token!, refresh_token: '' });
}`,
      },
      {
        type: 'callout',
        text: "If your auth system has token refresh logic in more than one place, it will race eventually. The fix isn't better locking — it's consolidating ownership.",
      },
      {
        type: 'heading',
        text: "What I'd do differently",
      },
      {
        type: 'paragraph',
        text: "Start with Clerk. I spent three months building something that Clerk already solved correctly. The custom auth logic felt like ownership — like I was in control — but it was just complexity. The 48-hour rebuild produced a more stable system than three months of custom work. Not every tool is worth replacing, but auth is genuinely hard to get right under all conditions. Use infrastructure that has already solved it.",
      },
    ],
  },
  {
    slug: 'supabase-vs-firebase',
    sections: [
      {
        type: 'paragraph',
        text: "Spindare is a social app. At its core, it's a feed where thousands of users post, react, and comment in real time. When I was choosing the backend, the decision that mattered most wasn't storage pricing or auth integrations — it was real-time performance at scale. I needed live feed updates to feel instant. Both Supabase and Firebase promised it. I tested both properly before choosing.",
      },
      {
        type: 'heading',
        text: 'What I was testing for',
      },
      {
        type: 'paragraph',
        text: "I built the same feature in both: a social feed that showed new posts as they were created by other users, updated like counts in real time, and displayed comment counts without polling. I tested with simulated concurrent users — starting at 10, going up to 500 — and measured latency, message delivery rate, and client-side CPU usage during sustained real-time connections.",
      },
      {
        type: 'heading',
        text: 'Testing Firebase',
      },
      {
        type: 'paragraph',
        text: "Firebase Realtime Database is fast for simple key-value structures. I set up a feed collection and listened to new documents with onSnapshot. At 10 concurrent users, delivery was near-instant — under 100ms consistently. The SDK handled reconnection after network drops cleanly.",
      },
      {
        type: 'paragraph',
        text: "The problems appeared when I needed to do anything relational. Spindare's feed items need user data, post metadata, reaction counts, and comment counts. In Firestore, you either denormalize everything (and keep it in sync across multiple writes) or you do multiple reads per item. I found myself writing fan-out functions for every write operation — when a user liked a post, I needed to update the post document, the user's activity document, the notification for the post author, and the feed items for the user's followers. Four writes, all in a transaction, every time.",
      },
      {
        type: 'code',
        language: 'typescript',
        text: `// Firebase: liking a post required 4 coordinated writes
await runTransaction(db, async (t) => {
  t.update(postRef, { likeCount: increment(1) });
  t.set(likeRef, { userId, postId, createdAt: serverTimestamp() });
  t.set(notifRef, { type: 'like', fromUserId: userId, toUserId: post.authorId });
  t.update(userActivityRef, { lastActive: serverTimestamp() });
});`,
      },
      {
        type: 'paragraph',
        text: "This worked, but it meant duplicating business logic across client and Cloud Functions. Every data shape change required updating multiple places. For a feed with many event types — likes, comments, follows, reposts — this became unmaintainable fast.",
      },
      {
        type: 'heading',
        text: 'Testing Supabase',
      },
      {
        type: 'paragraph',
        text: "Supabase's real-time is built on PostgreSQL logical replication via the pglistener extension. It sends row-level change events over a WebSocket. The mental model is simpler for relational data: you write to a normalized table, and subscribers get the changed row.",
      },
      {
        type: 'paragraph',
        text: "The same like operation in Supabase was a single INSERT into a likes table. A PostgreSQL trigger computed the updated count and the real-time channel broadcast it to subscribers. No fan-out logic in client code. No Cloud Functions for basic writes.",
      },
      {
        type: 'code',
        language: 'sql',
        text: `-- A trigger handles the denormalization server-side
CREATE OR REPLACE FUNCTION update_like_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts SET like_count = (
    SELECT COUNT(*) FROM likes WHERE post_id = NEW.post_id
  ) WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_insert
AFTER INSERT ON likes
FOR EACH ROW EXECUTE FUNCTION update_like_count();`,
      },
      {
        type: 'paragraph',
        text: "Real-time latency on Supabase was slightly higher than Firebase at low concurrency — around 150–200ms versus Firebase's 80–100ms. But the variance was lower. Firebase occasionally spiked to 800ms+ during reconnection events. Supabase was consistent.",
      },
      {
        type: 'heading',
        text: 'The comparison at 500 concurrent connections',
      },
      {
        type: 'paragraph',
        text: "At 500 simulated concurrent connections, Supabase held steady. Message delivery rate stayed above 98%. Firebase's Realtime Database also held, but Firestore's onSnapshot with complex queries started showing inconsistent delivery — some clients missed events and had to re-fetch on the next write.",
      },
      {
        type: 'callout',
        text: "Supabase real-time works best for row-level events on normalized tables. If you have a complex document structure that requires fan-out, Firestore may fit better — but plan for the operational overhead of keeping multiple documents in sync.",
      },
      {
        type: 'heading',
        text: 'What I chose and why',
      },
      {
        type: 'paragraph',
        text: "Supabase. The decision came down to data model fit. Spindare's data is inherently relational — users follow users, posts belong to users, comments belong to posts, likes belong to both users and posts. PostgreSQL handles this naturally. Trying to model it in Firestore's document model produced a fan-out problem that would have grown worse as the feature set expanded.",
      },
      {
        type: 'paragraph',
        text: "The real-time performance difference was acceptable. We optimized Supabase latency by choosing the right Supabase region (eu-central-1 for our primarily European user base) and by filtering subscriptions at the server level rather than client-side. Final measured latency for feed updates in production: 120ms p50, 280ms p99.",
      },
      {
        type: 'paragraph',
        text: "Firebase would have worked. But it would have required more code, more Cloud Functions, and more places for things to go wrong. For a social feed backed by relational data, Supabase was the right tool.",
      },
    ],
  },
  {
    slug: 'react-native-design-system',
    sections: [
      {
        type: 'paragraph',
        text: "When Spindare hit 80 screens, we had a problem. The same button existed in four slightly different versions — different padding, different font weight, different press opacity. The same card background appeared in three shades of near-identical grey. Every new screen required decisions that should have already been made. We were rebuilding the same components from scratch, diverging from each other slightly each time.",
      },
      {
        type: 'heading',
        text: 'Why we needed a design system',
      },
      {
        type: 'paragraph',
        text: "Two developers working on the same app without a shared component library will always diverge. It's not carelessness — it's a natural consequence of making local decisions in isolation. Without a single source of truth, consistency requires constant coordination. That doesn't scale.",
      },
      {
        type: 'paragraph',
        text: "We also had a Figma file that had drifted significantly from the actual app. Our designer was specifying things that didn't exist in code, and our code had things that weren't in Figma. Building a design system forced us to close that gap.",
      },
      {
        type: 'heading',
        text: 'Starting with tokens, not components',
      },
      {
        type: 'paragraph',
        text: "The first week was not spent building components. It was spent agreeing on tokens — the values that everything else would be derived from. Colors, spacing, typography, border radii, shadows.",
      },
      {
        type: 'code',
        language: 'typescript',
        text: `// tokens.ts — single source of truth
export const colors = {
  brand: {
    primary: '#F97316',
    primaryLight: '#FB923C',
    primaryDark: '#EA6D0E',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#090C11',
  },
  semantic: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
  },
} as const;

export const spacing = {
  1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48,
} as const;

export const radius = {
  sm: 6, md: 10, lg: 16, xl: 24, full: 9999,
} as const;`,
      },
      {
        type: 'paragraph',
        text: "Tokens had to be exhaustive before we built a single component. If a designer or developer needed to deviate from a token to make something look right, that was a signal the token system was incomplete — not a reason to hardcode a value.",
      },
      {
        type: 'heading',
        text: 'The component architecture',
      },
      {
        type: 'paragraph',
        text: "We organized components into three levels: primitives, composites, and templates. Primitives were Text, View, Icon, Image — wrappers that consumed tokens directly. Composites were Button, Card, Avatar, Input — built from primitives with no hardcoded values. Templates were screen-level layouts — FeedScreen, ProfileScreen — that combined composites.",
      },
      {
        type: 'paragraph',
        text: "The rule was strict: a composite could not reference tokens directly — it had to go through a primitive. This kept the token dependency graph clean. When we needed to update spacing across the app, changing a token propagated everywhere automatically.",
      },
      {
        type: 'code',
        language: 'typescript',
        text: `// Button composite — built entirely from primitives and tokens
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onPress: () => void;
  loading?: boolean;
}

export function Button({ label, variant = 'primary', size = 'md', onPress, loading }: ButtonProps) {
  const styles = buttonStyles[variant][size];
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed && { opacity: 0.85 }]}>
      {loading ? <ActivityIndicator color={styles.textColor} size="small" /> : (
        <Text style={[styles.label]}>{label}</Text>
      )}
    </Pressable>
  );
}`,
      },
      {
        type: 'heading',
        text: 'What we got wrong first',
      },
      {
        type: 'paragraph',
        text: "We tried to build the system bottom-up — starting with the most atomic primitives and working up to full components. This was a mistake. We spent two weeks building Text and View wrappers before we had any real signal about what the system needed to support. The primitives kept changing as we discovered new requirements from the composites.",
      },
      {
        type: 'paragraph',
        text: "The better approach was to start with the real screens — the Feed, the Profile, the Post — and extract components as we found repetition. Top-down design system development is faster and produces components that are shaped by actual usage rather than theoretical completeness.",
      },
      {
        type: 'callout',
        text: "Build your design system tokens first, then extract components from real screens — not the other way around. Components built in isolation often don't fit real usage patterns.",
      },
      {
        type: 'heading',
        text: 'Where we are now',
      },
      {
        type: 'paragraph',
        text: "The Spindare design system currently has 14 primitive components, 31 composites, and covers all 200+ screens in the app. Adding a new screen takes about 40% less time than it did before the system existed. More importantly, the app looks consistent — not \"kind of consistent\" but actually consistent. That matters when you're about to put it in front of real users on the App Store.",
      },
    ],
  },
];
