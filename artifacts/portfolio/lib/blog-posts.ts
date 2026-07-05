export type Section =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "code"; lang: string; lines: string[] }
  | { type: "quote"; text: string; by?: string }
  | { type: "callout"; emoji: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "divider" };

export interface BlogPostContent {
  slug: string;
  author: string;
  sections: Section[];
}

const posts: BlogPostContent[] = [
  {
    slug: "flatlist-memory-leak",
    author: "Kristian Gjergji",
    sections: [
      { type: "p", text: "Spindare's social feed worked perfectly during development. A few dozen mock posts, fast scrolls, clean renders. Then we got to a proper test build with real data — a few hundred posts, real images, real timestamps — and after about four minutes of scrolling the app would slow to a crawl. On older Android devices it would crash completely." },
      { type: "p", text: "This is the story of how I tracked it down, why it took longer than it should have, and what I'd check first if it happened again." },

      { type: "h2", text: "The symptom" },
      { type: "p", text: "Memory climbed steadily the longer the feed was open. JavaScript heap would sit at around 40 MB on launch and creep toward 200 MB after ten minutes. The performance monitor in Flipper made it obvious something was accumulating — but it wasn't obvious what." },
      { type: "p", text: "I ran the standard checks first. No massive images being stored in state. No obvious re-renders from incorrect useCallback dependencies. Redux slices looked clean. The feed component itself was straightforward: a FlatList rendering PostCard components, each with an image, some text, and an interaction row." },

      { type: "h2", text: "The first false lead" },
      { type: "p", text: "My first assumption was the images. We were using react-native-fast-image with a memory cache, and with hundreds of posts each with a 600px-wide image, it seemed obvious. I added aggressive cache limits and switched some thumbnails to lower resolution. Memory still climbed." },
      { type: "p", text: "Two hours wasted. The images were not the problem." },

      { type: "h2", text: "Finding the actual cause" },
      { type: "p", text: "I added logging to the PostCard component's mount and unmount cycles. Posts were mounting when scrolled into view — but a significant fraction were never unmounting. I expected FlatList's virtualisation to handle this. It was, mostly. But something was keeping a reference alive on the JavaScript side even after the native view was recycled." },
      { type: "p", text: "The culprit was in how we were handling real-time like counts. Each PostCard was subscribing to a Supabase realtime channel to get live updates for its specific post ID:" },
      { type: "code", lang: "typescript", lines: [
        "// PostCard.tsx — the broken version",
        "useEffect(() => {",
        "  const channel = supabase",
        "    .channel(`post-likes-${post.id}`)",
        "    .on('postgres_changes', {",
        "      event: 'UPDATE',",
        "      schema: 'public',",
        "      table: 'posts',",
        "      filter: `id=eq.${post.id}`,",
        "    }, (payload) => {",
        "      setLikes(payload.new.like_count);",
        "    })",
        "    .subscribe();",
        "}, []); // ← empty dependency array, no cleanup"
      ]},
      { type: "p", text: "No cleanup function. The channel was created when the card mounted, but never removed when the card unmounted. Worse, because the dependency array was empty, if a post re-rendered the old channel stayed open and a second one was created." },
      { type: "p", text: "With hundreds of posts in the feed, and each visible post holding an open WebSocket subscription, the memory just kept climbing." },

      { type: "h2", text: "The fix" },
      { type: "code", lang: "typescript", lines: [
        "// PostCard.tsx — fixed",
        "useEffect(() => {",
        "  const channel = supabase",
        "    .channel(`post-likes-${post.id}`)",
        "    .on('postgres_changes', {",
        "      event: 'UPDATE',",
        "      schema: 'public',",
        "      table: 'posts',",
        "      filter: `id=eq.${post.id}`,",
        "    }, (payload) => {",
        "      setLikes(payload.new.like_count);",
        "    })",
        "    .subscribe();",
        "",
        "  return () => {",
        "    supabase.removeChannel(channel);",
        "  };",
        "}, [post.id]); // ← correct dependency"
      ]},
      { type: "p", text: "After the fix, memory stabilised at around 55 MB regardless of how long the feed was open. The slow-down and crashes disappeared completely." },

      { type: "h2", text: "The deeper lesson" },
      { type: "p", text: "The real mistake wasn't missing the cleanup — it was subscribing per-card at all. For a feed with potentially thousands of posts, opening individual realtime channels for each one is always going to be expensive. The better approach is a single channel at the feed level that handles all post updates, and distributing the relevant updates down to the cards via React context or a local state manager." },
      { type: "p", text: "We shipped the cleanup fix for the September launch since it solved the crash. The architectural refactor is on the roadmap for the post-launch iteration." },

      { type: "callout", emoji: "📌", text: "If your React Native FlatList is leaking memory, check your useEffect cleanup functions in list item components before anything else — especially if those components subscribe to anything (realtime, events, timers, or animation listeners)." },
    ]
  },

  {
    slug: "auth-flow-48-hours",
    author: "Kristian Gjergji",
    sections: [
      { type: "p", text: "In March 2026, about two months before Spindare's planned iOS launch, we rebuilt the entire authentication flow from scratch in 48 hours. This is the honest account of why we did it, how it went, and what I'd do differently if I had to start over." },

      { type: "h2", text: "What we had" },
      { type: "p", text: "Our original auth system used Clerk for session management with a custom user profile layer on top in Supabase. On paper it was clean: Clerk handles the session, our database handles the user data, and a webhook keeps them in sync." },
      { type: "p", text: "In practice, the webhook sync was the problem. Clerk fires a webhook on user creation. Our Supabase edge function received it and wrote the user record. But under certain conditions — bad network, cold-start latency on the edge function, or just Clerk being slow — the record wasn't there when the user first logged in. The app would throw." },
      { type: "code", lang: "typescript", lines: [
        "// The failure path — simplified",
        "// 1. User signs up via Clerk",
        "// 2. Clerk fires webhook → Supabase Edge Function",
        "// 3. User is redirected to app — Clerk session exists",
        "// 4. App fetches user profile from Supabase",
        "// 5. Profile doesn't exist yet (webhook hasn't fired)",
        "// 6. App crashes or shows blank screen",
        "",
        "// We had a retry loop but it made the UX worse, not better",
        "const profile = await getUserProfile(clerkId);",
        "if (!profile) {",
        "  // Show loading spinner for up to 5 seconds",
        "  // If still no profile → error screen",
        "  // Users: confused, assumed the app was broken",
        "}"
      ]},
      { type: "p", text: "We patched it three times. Each patch made the code harder to reason about. The race condition never fully went away — it just became rarer." },

      { type: "h2", text: "The decision to rebuild" },
      { type: "p", text: "The final straw was a TestFlight session where a reviewer hit the bug twice in one day. It was two months before launch. We had time to fix it properly, or we could ship with a system we didn't fully trust." },
      { type: "p", text: "We chose to rebuild. The new approach: make Supabase the single source of truth for user identity. Clerk stays for session management and social login UX, but on first login we create the user profile synchronously — inside the sign-in handler, before the user reaches the app — not via webhook." },

      { type: "h2", text: "The rebuild" },
      { type: "p", text: "48 hours is tight for an auth system. Here's how we split the time:" },
      { type: "ol", items: [
        "Day 1 morning: Architecture review. Map every place in the codebase that touches auth. Identify what has to change vs what can stay.",
        "Day 1 afternoon: Write the new sign-in handler. Test it manually with fresh accounts, existing accounts, and edge cases (user exists in Clerk, not in DB; user exists in DB, not in Clerk).",
        "Day 1 evening: Update all downstream consumers. Everywhere the app fetched a user profile, change the assumptions about what's guaranteed to exist.",
        "Day 2 morning: Remove all the old webhook code. Delete the retry loops. Remove the edge function.",
        "Day 2 afternoon: Full regression test on TestFlight. Fix two bugs we found (one in the profile photo upload flow, one in the onboarding redirect logic).",
        "Day 2 evening: Ship to all testers."
      ]},
      { type: "p", text: "The new sign-in handler is simpler and more predictable:" },
      { type: "code", lang: "typescript", lines: [
        "// New approach: synchronous profile creation at sign-in",
        "async function handleSignIn(clerkUserId: string, email: string) {",
        "  // Check if profile already exists",
        "  let profile = await db.users.findUnique({",
        "    where: { clerk_id: clerkUserId }",
        "  });",
        "",
        "  // Create it if not — guaranteed before app load",
        "  if (!profile) {",
        "    profile = await db.users.create({",
        "      data: {",
        "        clerk_id: clerkUserId,",
        "        email,",
        "        username: generateUsername(email),",
        "        created_at: new Date(),",
        "      }",
        "    });",
        "  }",
        "",
        "  // Profile is guaranteed to exist from here",
        "  return profile;",
        "}"
      ]},

      { type: "h2", text: "What happened after" },
      { type: "p", text: "The race condition bug has not appeared once since the rebuild. The auth code is shorter, easier to read, and has no retry logic. Testers stopped mentioning login issues entirely." },
      { type: "p", text: "The one downside: the sign-in handler now does a database write on every login. For a user who logs in frequently, this is an unnecessary database round-trip most of the time. The `findUnique` before the `create` prevents duplicate writes, but the query still happens. At scale this would need caching or a different approach. For now, it's fast enough." },

      { type: "h2", text: "What I'd do differently" },
      { type: "p", text: "Skip the webhook approach entirely from the start. For any application where a user record needs to exist before the user reaches the app, create it synchronously at first login. Webhooks are fine for secondary side effects — sending a welcome email, creating analytics events — but not for data that the app depends on being there immediately." },
      { type: "callout", emoji: "⚡", text: "The best async operation is the one you don't need. If your app requires a piece of data to exist before the user sees anything, create it synchronously. Retry logic is a sign the architecture needs a rethink, not more retries." },
    ]
  },

  {
    slug: "supabase-vs-firebase",
    author: "Kristian Gjergji",
    sections: [
      { type: "p", text: "When I started building Spindare's feed, I needed realtime updates. Post like counts updating live, new posts appearing without a pull-to-refresh, activity indicators showing who's online. Both Supabase and Firebase offer this. I tested both properly before committing to one." },
      { type: "p", text: "This isn't a sponsored comparison. I'm not going to tell you one is objectively better. I'm going to tell you what I found when I actually used them for the specific thing I needed: a high-activity social feed with live updates." },

      { type: "h2", text: "The test setup" },
      { type: "p", text: "I built the same feed feature twice — once with each backend. Same React Native front end, same data shape, same test conditions. The test was: 200 simultaneous clients all subscribed to the same feed, receiving live updates when posts were liked or commented on. I ran this on a Saturday afternoon from my machine, using k6 for the load simulation." },
      { type: "ul", items: [
        "Supabase: Free plan, European region (Frankfurt), Postgres Realtime with row-level security enabled",
        "Firebase: Spark plan, European region, Firestore with security rules matching Supabase RLS",
        "Both tested with the same data: 500 posts, 200 concurrent readers, updates firing at roughly 10 per second"
      ]},

      { type: "h2", text: "Latency" },
      { type: "p", text: "Firebase was faster on initial connection. Firestore's client SDK is heavily optimised for cold start — a new listener is active within milliseconds. Supabase's Realtime is slightly slower on the first subscription because it goes through a PostgreSQL trigger pipeline." },
      { type: "p", text: "For subsequent updates, both were effectively instant from a user perspective — sub-100ms in both cases from the point of database write to the point of client notification. This difference is not something users would notice." },

      { type: "h2", text: "Reliability under load" },
      { type: "p", text: "This is where the tests diverged. Firebase handled the 200 concurrent clients without complaint. Supabase on the free plan started dropping connections around 150 simultaneous subscribers. I had to implement reconnection logic on the client." },
      { type: "p", text: "On the Pro plan, Supabase handled 200 concurrent clients reliably. The free tier's connection limit is real and it bites at social app scale earlier than you'd expect." },
      { type: "code", lang: "typescript", lines: [
        "// Supabase reconnection logic we had to add",
        "const channel = supabase.channel('feed')",
        "  .on('system', { event: 'disconnect' }, () => {",
        "    console.log('Supabase disconnected, reconnecting...');",
        "    setTimeout(() => channel.subscribe(), 2000);",
        "  })",
        "  .subscribe();"
      ]},

      { type: "h2", text: "SQL vs document model" },
      { type: "p", text: "This is where Supabase won for me decisively. Spindare's data is relational. Posts have users. Comments have posts and users. Likes are a join table. Leaderboards need aggregations." },
      { type: "p", text: "With Supabase I write real SQL and get real query power. Pagination, filtering, sorting, aggregations — all in one query, all with proper indexes. With Firebase I'm denormalising data, duplicating fields across documents, and writing fan-out functions in Cloud Functions every time I need something that SQL handles in two lines." },
      { type: "quote", text: "The moment you need a leaderboard, Firebase stops being fun.", by: "Every Firebase developer at some point" },
      { type: "p", text: "I spent about four hours trying to build Spindare's weekly points leaderboard in Firestore without server-side aggregation. It required a Cloud Function running every five minutes to pre-compute the rankings and store them in a separate collection. With Supabase it was one query with a GROUP BY and an index." },

      { type: "h2", text: "Row-level security" },
      { type: "p", text: "Supabase's RLS is more powerful than Firebase's security rules, but significantly harder to write correctly. Firebase security rules are declarative and relatively readable. Supabase RLS policies are SQL — expressive and fast, but easy to write a policy that accidentally blocks everything or allows too much." },
      { type: "p", text: "I broke our RLS configuration three times during development before I fully understood the model. Firebase security rules took an afternoon to learn properly." },

      { type: "h2", text: "The verdict" },
      { type: "p", text: "I chose Supabase for Spindare, and I don't regret it. The relational model was the deciding factor. For a social app where you need aggregations, joins, and real queries, Postgres is the right foundation. Firestore would have required increasingly complex workarounds as the data model grew." },
      { type: "ul", items: [
        "Choose Supabase if: your data is relational, you know SQL, you need real query power, or you're coming from a traditional backend background",
        "Choose Firebase if: you need maximum scalability out of the box, you're building something document-oriented (like a CMS or chat app), or your team doesn't know SQL",
        "If you're on the free tier of either: be aware that Supabase's free connection limits hit earlier than you'd expect for social apps"
      ]},
      { type: "callout", emoji: "🗃️", text: "If your data has relationships — users own posts, posts have comments, comments have likes — use a relational database. Forcing relational data into a document model creates complexity that compounds over time." },
    ]
  },

  {
    slug: "react-native-design-system",
    author: "Kristian Gjergji",
    sections: [
      { type: "p", text: "Spindare has hundreds of screens. A feed, a challenge system, a leaderboard, user profiles, settings, onboarding flows, notifications, a reward wheel, a social graph. When we started building it, we didn't have a design system. We had a Figma file and good intentions." },
      { type: "p", text: "By screen 40, the inconsistencies were already obvious. Buttons in different screens had slightly different padding. Border radii were inconsistent. Spacing was eyeballed. Dark mode had holes. This is how we fixed it — and what we'd do differently from the start." },

      { type: "h2", text: "Why a design system matters more for mobile" },
      { type: "p", text: "On the web, inconsistency is tolerable to a point. Users scroll past it. On mobile, users tap, swipe, and gesture through interfaces that need to feel native and predictable. A button that's 2dp taller on one screen than another is the kind of thing users notice without being able to articulate what's wrong. They just say the app 'feels off'." },
      { type: "p", text: "With hundreds of screens and a team of two, without a design system we were going to ship something that felt off." },

      { type: "h2", text: "The token layer" },
      { type: "p", text: "We started with a design token file. Not components yet — just values. Every colour, every spacing unit, every font size, every border radius, every shadow defined in one place:" },
      { type: "code", lang: "typescript", lines: [
        "// tokens.ts",
        "export const colors = {",
        "  primary: '#F97316',",
        "  primaryDark: '#C2410C',",
        "  background: '#0A0603',",
        "  backgroundElevated: '#141009',",
        "  surface: '#1C1510',",
        "  border: 'rgba(255,255,255,0.08)',",
        "  text: {",
        "    primary: 'rgba(255,255,255,0.92)',",
        "    secondary: 'rgba(255,255,255,0.52)',",
        "    muted: 'rgba(255,255,255,0.28)',",
        "  },",
        "} as const;",
        "",
        "export const spacing = {",
        "  xs: 4,",
        "  sm: 8,",
        "  md: 12,",
        "  lg: 16,",
        "  xl: 24,",
        "  '2xl': 32,",
        "  '3xl': 48,",
        "} as const;",
        "",
        "export const radius = {",
        "  sm: 6,",
        "  md: 12,",
        "  lg: 16,",
        "  xl: 24,",
        "  full: 9999,",
        "} as const;"
      ]},
      { type: "p", text: "This single file became the source of truth. Every StyleSheet in the app imports from here. No hardcoded colour hex strings anywhere. No magic numbers." },

      { type: "h2", text: "The component layer" },
      { type: "p", text: "With tokens established, we built primitive components that consumed them. Not full feature components — just the primitives that everything else is built from:" },
      { type: "ul", items: [
        "Text — with preset variants (h1, h2, body, caption, mono, label)",
        "Box — a styled View with token-aware margin, padding, and background props",
        "Button — primary, secondary, ghost, and destructive variants with loading and disabled states",
        "Avatar — with fallback initials, size variants, and online indicator",
        "Card — the surface component, with optional border and shadow",
        "Icon — a wrapper around our icon set with consistent sizing"
      ]},
      { type: "p", text: "Every feature component is composed from these primitives. A PostCard is a Card containing a Box, Avatar, Text components, and a row of Icon buttons. Nothing in PostCard creates its own padding or colour — it delegates that to the primitives." },

      { type: "h2", text: "Dark mode done right" },
      { type: "p", text: "Spindare is dark-first. We don't support light mode yet. This made the token layer simpler — no semantic colour mapping needed. But we still had to make sure dark mode was systematic rather than 'dark background with white text'." },
      { type: "p", text: "The key insight: dark UIs need more elevation levels than light ones. In light mode, surfaces are distinguished by hue (grey tints). In dark mode, you distinguish them by lightness — how far above the background a surface sits. We defined four elevation levels: background, surface (slightly raised), elevated (cards, modals), and overlay (bottom sheets, dialogs). Each level is a specific token, not a one-off colour choice." },

      { type: "h2", text: "What we skipped and paid for later" },
      { type: "p", text: "We didn't document the system. We knew what the tokens meant, but new screens added later would occasionally use the wrong token because there was no written guidance on when to use `surface` vs `elevated`. We fixed this eventually with a short internal wiki page, but it should have been written when we created the tokens." },
      { type: "p", text: "We also didn't build a component preview environment early enough. A Storybook equivalent for React Native — or even just a DevScreen with all the primitives rendered — would have caught visual regressions much earlier. We added one in month three. It caught four bugs immediately." },

      { type: "callout", emoji: "🎨", text: "The ROI on a design system front-loads the cost. The first week of building the token and primitive layer feels slow. Every week after that, building new screens becomes faster than it would have been without it. If you're building an app with more than 20 screens, start with the token layer on day one." },
    ]
  },

  {
    slug: "travelme-ai-weekend",
    author: "Kristian Gjergji",
    sections: [
      { type: "p", text: "TravelMe started as a question I asked myself on a Sunday: how hard would it be to build an app where you just describe a trip in plain language and get a complete, ready-to-go itinerary? I had the weekend, I had API access to OpenAI, and I wanted to find out." },
      { type: "p", text: "This is what I built, what didn't work, and what genuinely surprised me about how capable LLMs have become for this kind of task." },

      { type: "h2", text: "The idea" },
      { type: "p", text: "Most travel apps make you enter your destination, then your dates, then your interests, then your budget — five separate screens of structured input before you get anything useful. TravelMe's hypothesis is that one message is enough:" },
      { type: "quote", text: "I want to spend 5 days in Japan in October, I like food and architecture but hate tourist traps, budget around €2,000 including flights." },
      { type: "p", text: "From that single message, the app should produce: a day-by-day itinerary, accommodation suggestions, estimated costs, and a packing list. All tailored to exactly what was described." },

      { type: "h2", text: "The architecture" },
      { type: "p", text: "I kept it as simple as possible for the weekend build. A React Native app with a single chat-like input screen, a Node.js backend to handle the OpenAI call, and a results screen that renders the structured output." },
      { type: "p", text: "The key architectural decision was asking the model to return structured JSON rather than free-form text. This makes the output easy to render properly in the app, easier to validate, and easier to post-process." },
      { type: "code", lang: "typescript", lines: [
        "// The system prompt — simplified version",
        "const systemPrompt = `",
        "You are a travel planning expert. The user will describe a trip they want to take.",
        "Return a complete travel plan as structured JSON with the following shape:",
        "",
        "{",
        "  destination: string,",
        "  duration_days: number,",
        "  estimated_budget: { min: number, max: number, currency: string },",
        "  days: Array<{",
        "    day: number,",
        "    theme: string,",
        "    morning: { activity: string, location: string, tip: string },",
        "    afternoon: { activity: string, location: string, tip: string },",
        "    evening: { activity: string, location: string, tip: string },",
        "    estimated_cost: number",
        "  }>,",
        "  accommodation: Array<{ name: string, area: string, why: string, price_per_night: number }>,",
        "  packing_essentials: string[],",
        "  local_tips: string[]",
        "}",
        "",
        "Be specific. Avoid generic tourist suggestions unless they genuinely match the request.",
        "If the user said they hate tourist traps, don't suggest the Eiffel Tower.",
        "`;"
      ]},
      { type: "p", text: "One of the most impressive things about modern LLMs is how well they follow a JSON schema when it's described clearly. I didn't need to do any parsing gymnastics — the model returned valid JSON on the first try in about 90% of test cases." },

      { type: "h2", text: "What surprised me" },
      { type: "p", text: "The quality of the travel advice was genuinely good. When I described a trip to Kyoto and said I love traditional craftsmanship but not crowds, the model suggested Nishiki Market at 7am (before it gets busy), a specific lacquerware district I'd never heard of, and a ryokan in Arashiyama rather than the more obvious options in central Kyoto." },
      { type: "p", text: "This is not generic travel blog output. The model was applying the stated preferences — avoiding crowds, loving craftsmanship — to produce recommendations that actually matched the brief. For a weekend proof of concept, that felt remarkable." },

      { type: "h2", text: "What didn't work" },
      { type: "p", text: "Prices. The model's cost estimates were wildly inconsistent and often outdated. A meal that costs €8 in reality would come back as €15. A hotel that's €120/night would be estimated at €80. This is an inherent limitation of LLMs for anything time-sensitive — their knowledge has a cutoff date and they have no access to live pricing." },
      { type: "p", text: "For the production version of TravelMe, live pricing will come from APIs (Booking.com, Skyscanner, Google Places), not from the model. The model handles the planning logic; the APIs handle the current data." },

      { type: "h2", text: "Where it goes from here" },
      { type: "p", text: "The weekend proof of concept became TravelMe. The next steps are real API integrations for live pricing, user accounts so itineraries can be saved, and a sharing feature for planning trips with others. I'll write about each of these as they get built." },
      { type: "callout", emoji: "✈️", text: "LLMs are remarkably good at planning tasks when you give them clear structure constraints and specific context. The secret is not in prompting tricks — it's in being precise about the output format you need and specific about the user's preferences." },
    ]
  },

  {
    slug: "travelme-openai-vs-gemini",
    author: "Kristian Gjergji",
    sections: [
      { type: "p", text: "When I started building TravelMe, I knew the core product lived or died on the quality of the AI recommendations. The model had to understand nuanced travel preferences, produce structured JSON reliably, handle ambiguous requests gracefully, and do all of this at a cost that made a consumer app viable." },
      { type: "p", text: "I tested GPT-4o and Gemini 1.5 Pro seriously for two weeks. This is what I found." },

      { type: "h2", text: "The evaluation criteria" },
      { type: "p", text: "I evaluated both models across five things that matter specifically for TravelMe:" },
      { type: "ol", items: [
        "JSON output reliability — does it follow the schema consistently without requiring repair?",
        "Instruction following — does it honour stated preferences (no tourist traps, specific budget, dietary restrictions)?",
        "Specificity — does it give specific, useful suggestions or generic travel blog filler?",
        "Handling ambiguity — what does it do when the user's request is vague or contradictory?",
        "Cost per request — how much does a full itinerary generation cost at each price tier?"
      ]},

      { type: "h2", text: "JSON reliability" },
      { type: "p", text: "Both models handle structured JSON output well when you use the dedicated JSON mode (OpenAI) or response MIME type setting (Gemini). Without these settings, both occasionally add markdown code fences around the JSON or include explanatory text before or after it — both of which break JSON.parse()." },
      { type: "p", text: "With the settings enabled, OpenAI's JSON mode was slightly more reliable in my tests — about 97% valid JSON vs 94% for Gemini with the same schema. The 3% failures in Gemini were mostly truncated responses for long itineraries (10+ days), which suggests a max-tokens issue rather than a fundamental problem." },

      { type: "h2", text: "Instruction following" },
      { type: "p", text: "This is where the tests got interesting. I created a standard test prompt: a 7-day trip to Italy for someone who explicitly hates touristy restaurants, has a €150/day budget, is vegetarian, and wants to see lesser-known areas." },
      { type: "p", text: "GPT-4o followed all four constraints in every test run. No tourist traps, budget within range, all meals vegetarian, suggestions in non-obvious locations." },
      { type: "p", text: "Gemini 1.5 Pro followed three out of four consistently. The vegetarian constraint was honoured in about 80% of runs. In the remaining 20%, meat dishes would appear in restaurant suggestions, sometimes flagged with a note ('can be made vegetarian on request') and sometimes not. For a travel app where dietary restrictions can be a safety concern (religious dietary laws, allergies), 80% is not good enough." },

      { type: "h2", text: "Specificity" },
      { type: "p", text: "Both models produce specific suggestions, but GPT-4o's suggestions felt more curated. Asking for Rome without the tourist trap filter would get the Colosseum and the Vatican from both — expected. Applying the filter, GPT-4o suggested Quartiere Coppedè, the Protestant Cemetery in Testaccio, and a specific family-run osteria in Pigneto. Gemini suggested similar alternatives but stayed closer to the well-known neighbourhoods." },
      { type: "p", text: "This is partly about training data and partly about how the model interprets 'avoid tourist traps'. For TravelMe, where differentiation lives in exactly this kind of local knowledge, the difference matters." },

      { type: "h2", text: "Cost" },
      { type: "p", text: "Gemini 1.5 Pro is significantly cheaper. At the time of testing, a full 7-day itinerary generation was costing approximately:" },
      { type: "ul", items: [
        "GPT-4o: ~$0.04–0.07 per generation (depending on itinerary length)",
        "Gemini 1.5 Pro: ~$0.01–0.02 per generation",
        "GPT-4o-mini: ~$0.003–0.006 per generation (quality noticeably lower)"
      ]},
      { type: "p", text: "For a freemium app where free-tier users get a limited number of generations per month, GPT-4o is affordable. For a high-volume app with many free users, the cost difference would be significant." },

      { type: "h2", text: "The decision" },
      { type: "p", text: "I went with GPT-4o for TravelMe's initial launch. The instruction-following reliability was the deciding factor — specifically the dietary restriction handling. Travel planning is a domain where getting someone's preferences wrong has real consequences, not just a slightly off playlist recommendation." },
      { type: "p", text: "The cost difference is real, and I'll revisit Gemini once Google addresses the instruction-following consistency. I'm not permanently committed to OpenAI — the model layer in TravelMe's backend is intentionally abstracted so I can swap providers without changing the app." },
      { type: "code", lang: "typescript", lines: [
        "// Provider-agnostic interface in TravelMe's backend",
        "interface TravelPlannerModel {",
        "  generateItinerary(prompt: string): Promise<TravelPlan>;",
        "}",
        "",
        "// Easy to swap — OpenAI today, Gemini tomorrow",
        "class OpenAITravelPlanner implements TravelPlannerModel {",
        "  async generateItinerary(prompt: string): Promise<TravelPlan> {",
        "    // GPT-4o implementation",
        "  }",
        "}",
        "",
        "class GeminiTravelPlanner implements TravelPlannerModel {",
        "  async generateItinerary(prompt: string): Promise<TravelPlan> {",
        "    // Gemini implementation — ready when needed",
        "  }",
        "}"
      ]},
      { type: "callout", emoji: "🧠", text: "Abstract your AI provider from day one. The model landscape is changing fast — what's best today may not be best in six months. Keeping the interface clean means you can switch without rewriting your whole application." },
    ]
  },

  {
    slug: "travelme-when-ai-is-wrong",
    author: "Kristian Gjergji",
    sections: [
      { type: "p", text: "TravelMe's core promise is that you describe a trip and the AI handles the rest. What I didn't fully appreciate when I started building it is how a confident AI that gives wrong answers is, in some ways, worse than an app that gives no answers at all." },
      { type: "p", text: "This post is about the failure modes I found while testing TravelMe, how I'm handling them, and the philosophical tension at the centre of building AI travel products." },

      { type: "h2", text: "Confident and wrong" },
      { type: "p", text: "LLMs don't know when they don't know something. Ask GPT-4o about a restaurant that closed two years ago and it will recommend it enthusiastically, complete with opening hours that are no longer accurate. Ask it about a hiking trail that's currently closed due to landslide damage and it won't mention the closure — it can't, because it doesn't know." },
      { type: "p", text: "During testing I caught TravelMe recommending:" },
      { type: "ul", items: [
        "A museum in Lisbon that had relocated — the address was wrong by about 2km",
        "A beach in Sardinia described as 'quiet and local' that is now heavily developed and touristy",
        "A ryokan in Kyoto that had closed during COVID-19 and never reopened",
        "Visa requirements for Kosovo passports that were three years out of date"
      ]},
      { type: "p", text: "Each of these would have caused a real problem for a real traveller. The museum one is annoying — a wasted taxi journey. The visa one could theoretically strand someone at a border." },

      { type: "h2", text: "The disclosure problem" },
      { type: "p", text: "My first instinct was to add a disclaimer. Something like: 'AI-generated suggestions may be outdated. Always verify before booking.' But this is a band-aid, not a solution. Users don't read disclaimers. And a disclaimer doesn't fix the underlying problem — the app is presenting outdated information as confidently as current information." },
      { type: "p", text: "The better solution, which I'm implementing now, is to be explicit in the UI about what the AI knows and what it doesn't:" },
      { type: "ul", items: [
        "Practical information (prices, opening hours, addresses, visa requirements) is marked with a 'Verify before going' tag and linked to authoritative sources",
        "Experiential suggestions (what an area feels like, what type of traveller will enjoy a restaurant) are left as AI recommendations without the warning, because they're less likely to be dangerously wrong",
        "Time-sensitive information (weather, events, seasonal closures) is not AI-generated — it comes from live APIs or is flagged as requiring verification"
      ]},

      { type: "h2", text: "Grounding the model" },
      { type: "p", text: "A technique that improved accuracy significantly was adding explicit grounding instructions to the system prompt — telling the model to acknowledge uncertainty rather than confabulate:" },
      { type: "code", lang: "typescript", lines: [
        "// Added to system prompt",
        "`",
        "If you are not confident about specific practical details (exact opening hours,",
        "current prices, visa requirements, specific addresses), do not invent them.",
        "Instead, include a note in the relevant field:",
        "  'opening_hours_note': 'Verify current hours before visiting'",
        "",
        "You may be confident about experiential qualities (the atmosphere of an",
        "area, the type of cuisine, the general character of an accommodation type).",
        "You may not be confident about facts that change over time.",
        "`"
      ]},
      { type: "p", text: "This reduced the number of invented specifics significantly. The model became more likely to say 'typically open 9am–6pm' instead of '09:00–18:00' — flagging the uncertainty through imprecise language rather than omitting the information entirely." },

      { type: "h2", text: "The philosophical tension" },
      { type: "p", text: "Here's the tension I keep coming back to: TravelMe is useful precisely because it gives confident, specific answers. A vague itinerary — 'maybe visit some museums, food varies by area' — is worthless. The confidence is the product." },
      { type: "p", text: "But confidence without accuracy is worse than silence. And LLMs can't always distinguish between what they know well and what they're confabulating." },
      { type: "p", text: "My current position is that the solution is layering. The AI handles experiential planning — the parts it's good at, that don't change, where being wrong has low stakes. Live data handles the operational facts — the parts where being wrong matters. The UI makes the distinction clear." },
      { type: "p", text: "It's more engineering work. It would have been faster to just ship the pure AI output and add a disclaimer. But I've built apps for clients long enough to know that 'our AI might be wrong' is not a product strategy — it's an apology for not building properly." },

      { type: "callout", emoji: "⚠️", text: "AI is confident by default, not accurate by default. Design your product around this. For any information where being wrong has real consequences, don't trust the model — use a live data source, and be explicit in the UI about where the data comes from." },
    ]
  },
];

const bySlug: Record<string, BlogPostContent> = {};
posts.forEach(p => { bySlug[p.slug] = p; });

export function getBlogPost(slug: string): BlogPostContent | undefined {
  return bySlug[slug];
}

export function getAllSlugs(): string[] {
  return posts.map(p => p.slug);
}
