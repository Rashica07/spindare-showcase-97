export interface BlogSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'code' | 'callout' | 'divider';
  text: string;
  language?: string;
}

export interface BlogArticle {
  slug: string;
  sections: BlogSection[];
}

const EN_ARTICLES: BlogArticle[] = [
  {
    slug: "flatlist-memory-leak",
    sections: [
      { type: 'paragraph', text: "It started with a Slack message from Biba: 'The feed is slowing down after a few minutes.' I thought it was a network issue. It wasn't. After three hours of debugging, I found a memory leak growing at about 12MB per minute — silently, until the app ran out of memory and scrolling became impossible." },
      { type: 'heading', text: "What was happening" },
      { type: 'paragraph', text: "Spindare's social feed renders posts with video previews, user avatars, like animations, and real-time comment counts. Each item manages its own subscriptions and event listeners. The FlatList was rendering quickly and the UX felt smooth — but something underneath was accumulating." },
      { type: 'paragraph', text: "The symptom was consistent: after 4-5 minutes of scrolling, frame rate dropped from 60fps to around 20-30fps. Older Android devices hit it first. The JS heap kept growing even when items scrolled off-screen." },
      { type: 'heading', text: "How I found it" },
      { type: 'paragraph', text: "I opened React DevTools Profiler and connected to a real device via Metro. My first suspicion was that items were staying in memory after unmount — a classic FlatList problem. But it wasn't that." },
      { type: 'paragraph', text: "I added a counter to track how many active Supabase subscriptions were open. Opening the feed, I subscribed to comments for each visible post. Scrolling, new posts came in, new subscriptions opened — but old ones never closed. After two minutes: 47 active subscriptions for a feed showing 5 posts at a time." },
      { type: 'code', language: 'typescript', text: `// The problem — subscriptions were never cleaned up
function PostItem({ postId }: { postId: string }) {
  useEffect(() => {
    const channel = supabase
      .channel(\`comments:\${postId}\`)
      .on('postgres_changes', { event: '*', schema: 'public',
        table: 'comments', filter: \`post_id=eq.\${postId}\` },
        handleUpdate)
      .subscribe();

    return () => {
      // This cleanup ran late or not at all during fast scrolling
      supabase.removeChannel(channel);
    };
  }, [postId]);
}` },
      { type: 'paragraph', text: "The problem was that React Native's FlatList uses a virtualisation window. When items scroll far enough out of view, they get unmounted. But because of postId as the useEffect dependency and key reuse, the cleanup was firing late — or not at all — during fast scrolling." },
      { type: 'heading', text: "The fix" },
      { type: 'paragraph', text: "I moved the subscription logic out of the individual post component and into a centralised subscription manager at the feed level. Instead of each FlatList cell managing its own Supabase channel, I built a reference-counted registry." },
      { type: 'code', language: 'typescript', text: `// Centralised subscription manager with ref counting
class SubscriptionManager {
  private channels = new Map<string, {
    channel: RealtimeChannel;
    refCount: number;
  }>();

  subscribe(postId: string, handler: (payload: any) => void) {
    const key = \`comments:\${postId}\`;
    if (this.channels.has(key)) {
      this.channels.get(key)!.refCount++;
      return;
    }
    const channel = supabase
      .channel(key)
      .on('postgres_changes', { event: '*', schema: 'public',
        table: 'comments', filter: \`post_id=eq.\${postId}\` },
        handler)
      .subscribe();
    this.channels.set(key, { channel, refCount: 1 });
  }

  unsubscribe(postId: string) {
    const key = \`comments:\${postId}\`;
    const entry = this.channels.get(key);
    if (!entry) return;
    entry.refCount--;
    if (entry.refCount === 0) {
      supabase.removeChannel(entry.channel);
      this.channels.delete(key);
    }
  }
}

export const subscriptionManager = new SubscriptionManager();` },
      { type: 'paragraph', text: "With this in place, rapid FlatList recycling no longer leaked subscriptions. If two posts with the same ID appeared, they shared one channel. When the last subscriber unmounted, the channel closed cleanly." },
      { type: 'heading', text: "The results" },
      { type: 'paragraph', text: "After the fix, memory growth during a 10-minute scroll session went from +120MB to +4MB — the 4MB being legitimate data cache. Frame rate stayed locked at 60fps. Biba's Slack message the next day: 'It's smooth.'" },
      { type: 'callout', text: "If you're using Supabase real-time subscriptions inside FlatList or FlashList components, always ref-count them. Never assume that useEffect cleanup fires reliably during virtualisation recycling." },
      { type: 'heading', text: "What I'd do differently" },
      { type: 'paragraph', text: "I'd write the subscription manager before the feed component. The leak is obvious in hindsight — but built in isolation, where the component is the only thing rendered, the memory problem was invisible. Integration is where these issues appear. Testing in isolation isn't enough for real-time components." },
    ]
  },
  {
    slug: "auth-flow-48-hours",
    sections: [
      { type: 'paragraph', text: "The old login system worked fine... until it didn't. We had Expo's AuthSession for the OAuth flow, a custom token refresh hook, and session state in AsyncStorage with an in-memory mirror. It covered 90% of cases — until a user reported random logouts mid-session, and another reported that switching from WiFi to mobile data killed the session." },
      { type: 'heading', text: "What broke" },
      { type: 'paragraph', text: "The core problem: token refresh logic was spread across three places — the API client, the auth hook, and a background task. When two parts tried to refresh simultaneously (which happened on fast app backgrounding/foregrounding), they raced each other. One would succeed and write the new token. The other, milliseconds later, would write the old token, overwriting the valid one. The next API call returned 401 and the app logged the user out." },
      { type: 'paragraph', text: "The network switch problem was simpler: we were checking token validity on a timer instead of per-request. On mobile data, expired tokens slipped through until the next interval." },
      { type: 'heading', text: "The decision to rebuild" },
      { type: 'paragraph', text: "I could have patched both bugs with locks and more careful AsyncStorage coordination. But after mapping the problem, I realised the architecture itself was wrong. Auth responsibility was spread across too much surface area. A login system needs one place that owns the tokens, one that refreshes them, and everything else only consumes — never writes." },
      { type: 'paragraph', text: "Clerk had been on my radar for a while. I'd used it in other projects and it handles exactly the failure modes we were hitting. The question was whether 48 hours was realistic. It was. The Clerk Expo SDK is genuinely good." },
      { type: 'heading', text: "The rebuild" },
      { type: 'paragraph', text: "Day one: I installed the Clerk Expo SDK, wrapped the root navigator with ClerkProvider, and replaced our useAuth hook with Clerk's. Every screen that checked session state needed one import change. The OAuth setup with Google took about 40 minutes — mostly getting the redirect scheme right in app.json." },
      { type: 'code', language: 'typescript', text: `// Before — custom auth hook managing tokens manually
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const stored = await AsyncStorage.getItem('session');
    if (stored) setSession(JSON.parse(stored));
    const interval = setInterval(refreshIfNeeded, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return { session, isSignedIn: !!session };
}

// After — Clerk handles everything
import { useUser, useAuth } from '@clerk/clerk-expo';
export function useAuth() {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  return { isSignedIn, userId, user };
}` },
      { type: 'paragraph', text: "Day two: I migrated existing users. We had around 200 accounts in Supabase's auth.users. I wrote a script that called Clerk's Backend API to create matching users with the same email addresses, then updated the database to store Clerk user IDs alongside the old Supabase UUIDs." },
      { type: 'heading', text: "How the new architecture looks" },
      { type: 'paragraph', text: "Clerk handles all token management, refresh, and storage. Our Supabase client receives a JWT from Clerk on every request. The app itself never touches tokens." },
      { type: 'code', language: 'typescript', text: `// Supabase client using Clerk JWT
import { createClient } from '@supabase/supabase-js';
import { useSession } from '@clerk/clerk-expo';

export function useSupabaseClient() {
  const { session } = useSession();
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      fetch: async (url, options = {}) => {
        const clerkToken = await session?.getToken({ template: 'supabase' });
        const headers = new Headers(options?.headers);
        headers.set('Authorization', \`Bearer \${clerkToken}\`);
        return fetch(url, { ...options, headers });
      },
    },
  });
}` },
      { type: 'callout', text: "If your auth system has token refresh logic in more than one place, it will race condition eventually. The fix isn't better locking — it's consolidating ownership." },
      { type: 'heading', text: "What I'd do differently" },
      { type: 'paragraph', text: "Start with Clerk. I spent three months building something Clerk had already solved correctly. The custom auth logic felt like control — it was just complexity. The 48-hour rebuild produced a more stable system than three months of custom work." },
    ]
  },
  {
    slug: "supabase-vs-firebase",
    sections: [
      { type: 'paragraph', text: "Spindare is a social app. Its core is a feed where thousands of users post, react, and comment in real-time. When choosing the backend, the most important decision wasn't pricing or integrations — it was real-time performance at scale. I tested both before choosing." },
      { type: 'heading', text: "What I was testing" },
      { type: 'paragraph', text: "I built the same feature in both: a social feed that showed new posts in real-time, live-updated like counts, and comment counts without polling. I tested with simulated concurrent users — from 10 to 500 — measuring latency, delivery rate, and client-side CPU usage during extended real-time connections." },
      { type: 'heading', text: "Testing Firebase" },
      { type: 'paragraph', text: "Firebase Realtime Database is fast for simple key-value structures. At 10 concurrent users, delivery was near-instant — under 100ms. The SDK handled reconnection after network drops cleanly." },
      { type: 'paragraph', text: "The problems showed up when I needed relational data. Spindare's feed items need user data, post metadata, reaction counts, and comment counts. In Firestore, you either denormalise everything (and keep it in sync across multiple writes) or make multiple reads per item. I ended up writing fan-out functions for every write operation." },
      { type: 'code', language: 'javascript', text: `// Firestore: fan-out required for every like
exports.onLike = functions.firestore
  .document('likes/{likeId}')
  .onCreate(async (snap) => {
    const { postId, userId } = snap.data();
    await db.doc(\`posts/\${postId}\`).update({ likeCount: FieldValue.increment(1) });
    await db.doc(\`users/\${userId}\`).update({ likedPosts: FieldValue.arrayUnion(postId) });
    const followers = await db.collection('followers')
      .where('followingId', '==', userId).get();
    const batch = db.batch();
    followers.docs.forEach(doc => {
      batch.update(db.doc(\`feeds/\${doc.data().followerId}/posts/\${postId}\`),
        { likeCount: FieldValue.increment(1) });
    });
    return batch.commit();
  });` },
      { type: 'paragraph', text: "This worked, but it meant duplicating business logic between client and Cloud Functions. Every data structure change required updates in multiple places. For a feed with many event types, this became unmanageable quickly." },
      { type: 'heading', text: "Testing Supabase" },
      { type: 'paragraph', text: "Supabase's real-time is built on PostgreSQL's logical replication via WebSocket. The mental model is simpler for relational data: write to a normalised table, and subscribers receive the changed row." },
      { type: 'paragraph', text: "The same like operation in Supabase was a single INSERT into the likes table. A PostgreSQL trigger calculated the updated count and the real-time channel broadcast it to subscribers. No fan-out logic in client code." },
      { type: 'code', language: 'sql', text: `-- PostgreSQL trigger: update like count on insert
CREATE OR REPLACE FUNCTION update_like_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts
  SET like_count = (SELECT COUNT(*) FROM likes WHERE post_id = NEW.post_id)
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_insert
  AFTER INSERT ON likes
  FOR EACH ROW EXECUTE FUNCTION update_like_count();` },
      { type: 'paragraph', text: "Supabase's real-time latency was slightly higher than Firebase at low concurrency — around 150-200ms versus Firebase's 80-100ms. But variance was lower. Firebase occasionally spiked to 800ms+ during reconnection events. Supabase was consistent." },
      { type: 'heading', text: "The 500 concurrent connections test" },
      { type: 'paragraph', text: "At 500 simulated concurrent connections, Supabase held. Message delivery rate stayed above 98%. Firebase Realtime Database also held, but Firestore with complex queries showed inconsistent delivery — some clients missed updates and required a manual refetch to recover." },
      { type: 'callout', text: "Supabase real-time works best for row-level events on normalised tables. If you have a complex document structure that requires fan-out, Firestore might fit better — but plan for the operational overhead of keeping multiple documents in sync." },
      { type: 'heading', text: "What I chose and why" },
      { type: 'paragraph', text: "Supabase. The decision came down to data model fit. Spindare's data is inherently relational — users follow users, posts belong to users, comments belong to posts. Trying to model that in Firestore's document model produced a fan-out problem that would get worse as features expanded. Measured latency in production: 120ms p50, 280ms p99." },
    ]
  },
  {
    slug: "react-native-design-system",
    sections: [
      { type: 'paragraph', text: "When Spindare hit 80 screens, we had a problem. The same button existed in four slightly different versions across the app — different padding, different font weight, different press opacity. Every new screen required decisions that should have already been made." },
      { type: 'heading', text: "Why we needed a design system" },
      { type: 'paragraph', text: "Two developers working on the same app without a shared component library will always diverge. It's not carelessness — it's the natural result of making local decisions in isolation. Without a single source of truth, consistency requires constant coordination. That doesn't scale." },
      { type: 'heading', text: "Starting with tokens, not components" },
      { type: 'paragraph', text: "The first week wasn't spent building components. It was spent agreeing on tokens — the values that everything else would derive from. Colours, spacing, typography, border radii, shadows." },
      { type: 'code', language: 'typescript', text: `// design-tokens.ts
export const tokens = {
  color: {
    primary: '#FF6B2B',
    primaryMuted: '#FF6B2B26',
    surface: '#0F0F0F',
    surfaceElevated: '#1A1A1A',
    border: '#2A2A2A',
    text: { primary: '#FAFAFA', secondary: '#A1A1AA', muted: '#71717A' },
  },
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  radius: { sm: 6, md: 12, lg: 16, full: 9999 },
  font: {
    size: { xs: 11, sm: 13, md: 15, lg: 17, xl: 20, xxl: 28 },
    weight: { regular: '400', medium: '500', semibold: '600', bold: '700' },
  },
} as const;` },
      { type: 'paragraph', text: "The tokens had to be exhaustive before we built a single component. If a designer or developer needed to deviate from a token to make something look right, that was a signal the token system was incomplete — not a reason to hardcode a value." },
      { type: 'heading', text: "The component architecture" },
      { type: 'paragraph', text: "We organised components into three layers: primitives, composites, and templates. Primitives were Text, View, Icon, Image — wrappers that consumed tokens directly. Composites were Button, Card, Avatar, Input — built from primitives with no hardcoded values. Templates were screen-level layouts that combined composites." },
      { type: 'code', language: 'typescript', text: `// Button — built entirely from tokens
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ label, variant = 'primary', size = 'md', onPress, disabled }: ButtonProps) {
  const styles = useButtonStyles(variant, size);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.container, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}` },
      { type: 'heading', text: "What we got wrong first" },
      { type: 'paragraph', text: "We tried to build the system bottom-up — starting with the most atomic primitives. It was a mistake. We spent two weeks building Text and View wrappers before we had any real signal on what the system needed to support. The primitives kept changing as we discovered new requirements from composites." },
      { type: 'paragraph', text: "The better approach was to start from real screens — Feed, Profile, Post Detail — and extract components by finding repetition. Top-down design system development is faster and produces components shaped by real usage patterns." },
      { type: 'callout', text: "Build the design system tokens first, then extract components from real screens — not the other way around. Components built in isolation often don't fit the actual usage patterns you discover when building screens." },
      { type: 'heading', text: "Where we are now" },
      { type: 'paragraph', text: "Spindare's design system now has 14 primitive components, 31 composites, and covers all 200+ screens. Adding a new screen takes about 40% less time than it did before the system. The app looks consistent — not 'almost consistent', but genuinely consistent." },
    ]
  }
];

const IT_ARTICLES: BlogArticle[] = [
  {
    slug: "flatlist-memory-leak",
    sections: [
      { type: 'paragraph', text: "È iniziato con un messaggio Slack di Biba: «Il feed si rallenta dopo qualche minuto.» Pensavo fosse un problema di rete. Non lo era. Dopo tre ore di debug, ho trovato un memory leak che cresceva di circa 12 MB al minuto — silenziosamente, fino a quando l'app esauriva la memoria e lo scroll diventava impossibile." },
      { type: 'heading', text: "Cosa stava succedendo" },
      { type: 'paragraph', text: "Il feed social di Spindare renderizza post con anteprime video, avatar, animazioni like e contatori commenti in tempo reale. Ogni elemento gestisce le proprie subscription ed event listener. La FlatList rendeva velocemente — ma qualcosa sotto si stava accumulando." },
      { type: 'paragraph', text: "Il sintomo era costante: dopo 4–5 minuti di scroll, il frame rate scendeva da 60fps a circa 20–30fps. I dispositivi Android più vecchi lo subivano prima. L'heap JS continuava a crescere anche quando gli elementi uscivano dallo schermo." },
      { type: 'heading', text: "Come l'ho trovato" },
      { type: 'paragraph', text: "Ho aperto il React DevTools Profiler collegato a un dispositivo reale via Metro. Il primo sospetto: gli elementi rimanevano in memoria dopo l'unmount. Ma non era quello." },
      { type: 'paragraph', text: "Ho aggiunto un contatore per tracciare le subscription Supabase attive. Aprendo il feed mi iscrivevo ai commenti di ogni post visibile. Scrollando, nuove subscription si aprivano — ma quelle vecchie non si chiudevano mai. Dopo due minuti: 47 subscription attive per un feed che mostrava 5 post alla volta." },
      { type: 'code', language: 'typescript', text: `// Il problema — le subscription non venivano mai pulite
function PostItem({ postId }: { postId: string }) {
  useEffect(() => {
    const channel = supabase
      .channel(\`comments:\${postId}\`)
      .on('postgres_changes', { event: '*', schema: 'public',
        table: 'comments', filter: \`post_id=eq.\${postId}\` },
        handleUpdate)
      .subscribe();
    return () => {
      // Questo cleanup si attivava tardi o mai durante lo scroll veloce
      supabase.removeChannel(channel);
    };
  }, [postId]);
}` },
      { type: 'paragraph', text: "Il problema: FlatList usa la virtualizzazione — quando gli elementi escono dalla finestra, vengono unmontati. Ma a causa di postId come dipendenza del useEffect e il riuso delle key, il cleanup si attivava tardi — o mai — durante lo scroll rapido." },
      { type: 'heading', text: "La soluzione" },
      { type: 'paragraph', text: "Ho spostato la logica delle subscription fuori dal componente post individuale in un gestore centralizzato a livello di feed, con reference counting." },
      { type: 'code', language: 'typescript', text: `// Gestore centralizzato delle subscription con ref counting
class SubscriptionManager {
  private channels = new Map<string, { channel: RealtimeChannel; refCount: number }>();

  subscribe(postId: string, handler: (payload: any) => void) {
    const key = \`comments:\${postId}\`;
    if (this.channels.has(key)) { this.channels.get(key)!.refCount++; return; }
    const channel = supabase.channel(key)
      .on('postgres_changes', { event: '*', schema: 'public',
        table: 'comments', filter: \`post_id=eq.\${postId}\` }, handler)
      .subscribe();
    this.channels.set(key, { channel, refCount: 1 });
  }

  unsubscribe(postId: string) {
    const key = \`comments:\${postId}\`;
    const entry = this.channels.get(key);
    if (!entry) return;
    entry.refCount--;
    if (entry.refCount === 0) { supabase.removeChannel(entry.channel); this.channels.delete(key); }
  }
}
export const subscriptionManager = new SubscriptionManager();` },
      { type: 'paragraph', text: "Con questa soluzione, il riciclo rapido della FlatList non perdeva più subscription. Se due post con lo stesso ID comparivano, condividevano un canale. Quando l'ultimo subscriber si smontava, il canale si chiudeva correttamente." },
      { type: 'heading', text: "I risultati" },
      { type: 'paragraph', text: "Dopo la correzione, la crescita di memoria in una sessione di scroll di 10 minuti è passata da +120 MB a +4 MB. Il frame rate è rimasto a 60fps. Messaggio Slack di Biba il giorno dopo: «È fluido.»" },
      { type: 'callout', text: "Se usi le subscription real-time di Supabase dentro componenti FlatList o FlashList, conta sempre i riferimenti. Non assumere mai che il cleanup del useEffect si attivi in modo affidabile durante il riciclo della virtualizzazione." },
      { type: 'heading', text: "Cosa avrei fatto diversamente" },
      { type: 'paragraph', text: "Avrei scritto il gestore delle subscription prima del componente feed. Il leak è ovvio in retrospettiva — ma costruito in isolamento, il problema era invisibile. L'integrazione è dove questi problemi emergono. Il testing isolato non basta per i componenti real-time." },
    ]
  },
  {
    slug: "auth-flow-48-hours",
    sections: [
      { type: 'paragraph', text: "Il vecchio sistema di login funzionava bene... fino a quando non ha smesso. Avevamo AuthSession di Expo per il flusso OAuth, un hook custom per il refresh del token e lo stato della sessione in AsyncStorage. Copriva il 90% dei casi — finché un utente ha segnalato logout casuali a metà sessione." },
      { type: 'heading', text: "Cosa si è rotto" },
      { type: 'paragraph', text: "Il problema principale: la logica di refresh del token era distribuita in tre punti — il client API, l'auth hook e un background task. Quando due parti tentavano di refreshare simultaneamente, si mettevano in gara. Una riusciva e scriveva il nuovo token. L'altra, millisecondi dopo, scriveva il vecchio token, sovrascrivendo quello valido. La chiamata API successiva dava 401 e l'app disconnetteva l'utente." },
      { type: 'paragraph', text: "Il problema del cambio rete era più semplice: verificavamo la validità del token con un timer invece che ad ogni richiesta. Con i dati mobili, i token scaduti passavano fino al prossimo intervallo." },
      { type: 'heading', text: "La decisione di ricostruire" },
      { type: 'paragraph', text: "Avrei potuto rattoppare entrambi i bug con lock e coordinazione AsyncStorage più attenta. Ma dopo aver mappato il problema, ho capito che l'architettura stessa era sbagliata. La responsabilità dell'auth era distribuita su troppa superficie. Un sistema di login deve avere un unico punto che possiede i token, uno che li rinfresca, e tutto il resto deve solo consumare — mai scrivere." },
      { type: 'paragraph', text: "Clerk era sul mio radar da un po'. L'avevo usato in altri progetti e gestisce esattamente i failure mode che stavamo affrontando. La domanda era se 48 ore fossero realistiche. Lo erano." },
      { type: 'heading', text: "La ricostruzione" },
      { type: 'paragraph', text: "Giorno uno: ho installato il Clerk Expo SDK, avvolto il root navigator con ClerkProvider e sostituito il nostro hook useAuth con quello di Clerk. Ogni schermata che controllava lo stato della sessione ha richiesto un solo cambio di import." },
      { type: 'code', language: 'typescript', text: `// Prima — hook auth custom che gestiva i token manualmente
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const stored = await AsyncStorage.getItem('session');
    if (stored) setSession(JSON.parse(stored));
    const interval = setInterval(refreshIfNeeded, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return { session, isSignedIn: !!session };
}

// Dopo — Clerk gestisce tutto
import { useUser, useAuth } from '@clerk/clerk-expo';
export function useAuth() {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  return { isSignedIn, userId, user };
}` },
      { type: 'paragraph', text: "Giorno due: ho migrato gli utenti esistenti. Avevamo circa 200 account. Ho scritto uno script che chiamava la Backend API di Clerk per creare utenti corrispondenti con gli stessi indirizzi email, poi aggiornato il database per memorizzare gli ID utente Clerk accanto ai vecchi UUID Supabase." },
      { type: 'heading', text: "Come appare la nuova architettura" },
      { type: 'paragraph', text: "Clerk gestisce tutto il token management, refresh e storage. Il nostro client Supabase riceve un JWT da Clerk ad ogni richiesta. L'app stessa non tocca mai i token." },
      { type: 'code', language: 'typescript', text: `// Client Supabase che usa il JWT di Clerk
import { createClient } from '@supabase/supabase-js';
import { useSession } from '@clerk/clerk-expo';

export function useSupabaseClient() {
  const { session } = useSession();
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      fetch: async (url, options = {}) => {
        const clerkToken = await session?.getToken({ template: 'supabase' });
        const headers = new Headers(options?.headers);
        headers.set('Authorization', \`Bearer \${clerkToken}\`);
        return fetch(url, { ...options, headers });
      },
    },
  });
}` },
      { type: 'callout', text: "Se il tuo sistema di auth ha logica di refresh del token in più di un posto, prima o poi andrà in race condition. La soluzione non è un lock migliore — è consolidare la proprietà." },
      { type: 'heading', text: "Cosa avrei fatto diversamente" },
      { type: 'paragraph', text: "Avrei iniziato con Clerk. Ho trascorso tre mesi costruendo qualcosa che Clerk aveva già risolto correttamente. La logica auth custom sembrava controllo — era solo complessità. La ricostruzione in 48 ore ha prodotto un sistema più stabile di tre mesi di lavoro custom." },
    ]
  },
  {
    slug: "supabase-vs-firebase",
    sections: [
      { type: 'paragraph', text: "Spindare è un'app social. Il suo cuore è un feed dove migliaia di utenti postano, reagiscono e commentano in tempo reale. Scegliendo il backend, la decisione più importante non riguardava i prezzi o le integrazioni — riguardava le prestazioni real-time in scala. Ho testato entrambi prima di scegliere." },
      { type: 'heading', text: "Cosa stavo testando" },
      { type: 'paragraph', text: "Ho costruito la stessa funzionalità in entrambi: un feed social con nuovi post in tempo reale, contatori like aggiornati live e contatori commenti senza polling. Ho testato con utenti concorrenti simulati — da 10 a 500 — misurando latenza, tasso di consegna e uso CPU del client." },
      { type: 'heading', text: "Test con Firebase" },
      { type: 'paragraph', text: "Firebase Realtime Database è veloce per strutture chiave-valore semplici. A 10 utenti concorrenti, la consegna era quasi istantanea — sotto i 100ms. L'SDK gestiva la riconnessione dopo interruzioni di rete in modo pulito." },
      { type: 'paragraph', text: "I problemi sono apparsi quando avevo bisogno di dati relazionali. Gli elementi del feed di Spindare necessitano di dati utente, metadati post, contatori reazioni e commenti. In Firestore, si denormalizza tutto o si fanno letture multiple per elemento. Ho finito per scrivere funzioni fan-out per ogni operazione di scrittura." },
      { type: 'code', language: 'javascript', text: `// Firestore: fan-out necessario per ogni like
exports.onLike = functions.firestore
  .document('likes/{likeId}')
  .onCreate(async (snap) => {
    const { postId, userId } = snap.data();
    await db.doc(\`posts/\${postId}\`).update({ likeCount: FieldValue.increment(1) });
    await db.doc(\`users/\${userId}\`).update({ likedPosts: FieldValue.arrayUnion(postId) });
    const followers = await db.collection('followers')
      .where('followingId', '==', userId).get();
    const batch = db.batch();
    followers.docs.forEach(doc => {
      batch.update(db.doc(\`feeds/\${doc.data().followerId}/posts/\${postId}\`),
        { likeCount: FieldValue.increment(1) });
    });
    return batch.commit();
  });` },
      { type: 'paragraph', text: "Funzionava, ma significava duplicare la logica business tra client e Cloud Functions. Ogni cambio di struttura dati richiedeva aggiornamenti in più punti." },
      { type: 'heading', text: "Test con Supabase" },
      { type: 'paragraph', text: "Il real-time di Supabase è costruito sulla replica logica di PostgreSQL via WebSocket. Il modello mentale è più semplice per i dati relazionali: scrivi in una tabella normalizzata e i subscriber ricevono la riga modificata." },
      { type: 'paragraph', text: "La stessa operazione like in Supabase era un singolo INSERT nella tabella likes. Un trigger PostgreSQL calcolava il contatore aggiornato e il canale real-time lo trasmetteva ai subscriber. Nessuna logica fan-out nel codice client." },
      { type: 'code', language: 'sql', text: `-- Trigger PostgreSQL: aggiorna il contatore like all'inserimento
CREATE OR REPLACE FUNCTION update_like_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts
  SET like_count = (SELECT COUNT(*) FROM likes WHERE post_id = NEW.post_id)
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_insert
  AFTER INSERT ON likes
  FOR EACH ROW EXECUTE FUNCTION update_like_count();` },
      { type: 'paragraph', text: "La latenza real-time di Supabase era leggermente più alta di Firebase a bassa concorrenza — circa 150–200ms contro gli 80–100ms di Firebase. Ma la varianza era più bassa. Firebase occasionalmente raggiungeva gli 800ms+ durante eventi di riconnessione. Supabase era consistente." },
      { type: 'heading', text: "Il test a 500 connessioni concorrenti" },
      { type: 'paragraph', text: "A 500 connessioni concorrenti simulate, Supabase ha tenuto. Il tasso di consegna messaggi è rimasto sopra il 98%. Firebase Realtime Database ha tenuto anche lui, ma Firestore con query complesse ha mostrato consegna inconsistente." },
      { type: 'callout', text: "Il real-time di Supabase funziona meglio per eventi row-level su tabelle normalizzate. Se hai una struttura documento complessa che richiede fan-out, Firestore potrebbe adattarsi meglio — ma pianifica l'overhead operativo di mantenere più documenti sincronizzati." },
      { type: 'heading', text: "Cosa ho scelto e perché" },
      { type: 'paragraph', text: "Supabase. La decisione è venuta dall'adattamento del modello dati. I dati di Spindare sono intrinsecamente relazionali. PostgreSQL lo gestisce naturalmente. Latenza misurata in produzione: 120ms p50, 280ms p99." },
    ]
  },
  {
    slug: "react-native-design-system",
    sections: [
      { type: 'paragraph', text: "Quando Spindare ha raggiunto 80 schermate, avevamo un problema. Lo stesso pulsante esisteva in quattro versioni leggermente diverse — padding diverso, peso font diverso, opacità press diversa. Ogni nuova schermata richiedeva decisioni che avrebbero dovuto essere già prese." },
      { type: 'heading', text: "Perché avevamo bisogno di un design system" },
      { type: 'paragraph', text: "Due sviluppatori che lavorano sulla stessa app senza una libreria di componenti condivisa divergeranno sempre. Non è negligenza — è la conseguenza naturale di prendere decisioni locali in isolamento. Senza una fonte unica di verità, la coerenza richiede coordinazione costante. Questo non scala." },
      { type: 'heading', text: "Iniziare dai token, non dai componenti" },
      { type: 'paragraph', text: "La prima settimana non è stata dedicata a costruire componenti. È stata dedicata ad accordarsi sui token — i valori da cui tutto il resto sarebbe derivato. Colori, spaziatura, tipografia, border radius, ombre." },
      { type: 'code', language: 'typescript', text: `// design-tokens.ts
export const tokens = {
  color: {
    primary: '#FF6B2B',
    primaryMuted: '#FF6B2B26',
    surface: '#0F0F0F',
    surfaceElevated: '#1A1A1A',
    border: '#2A2A2A',
    text: { primary: '#FAFAFA', secondary: '#A1A1AA', muted: '#71717A' },
  },
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  radius: { sm: 6, md: 12, lg: 16, full: 9999 },
  font: {
    size: { xs: 11, sm: 13, md: 15, lg: 17, xl: 20, xxl: 28 },
    weight: { regular: '400', medium: '500', semibold: '600', bold: '700' },
  },
} as const;` },
      { type: 'paragraph', text: "I token dovevano essere esaustivi prima di costruire un singolo componente. Se un designer o sviluppatore aveva bisogno di deviare da un token, era un segnale che il sistema di token era incompleto — non una ragione per hardcodare un valore." },
      { type: 'heading', text: "L'architettura dei componenti" },
      { type: 'paragraph', text: "Abbiamo organizzato i componenti in tre livelli: primitivi, compositi e template. I primitivi erano Text, View, Icon, Image — wrapper che consumavano direttamente i token. I compositi erano Button, Card, Avatar, Input — costruiti dai primitivi senza valori hardcodati." },
      { type: 'code', language: 'typescript', text: `// Button — costruito interamente dai token
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ label, variant = 'primary', size = 'md', onPress, disabled }: ButtonProps) {
  const styles = useButtonStyles(variant, size);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.container, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}` },
      { type: 'heading', text: "Cosa abbiamo sbagliato all'inizio" },
      { type: 'paragraph', text: "Abbiamo provato a costruire il sistema dal basso — iniziando dai primitivi più atomici. È stato un errore. Abbiamo trascorso due settimane costruendo wrapper Text e View prima di avere qualsiasi segnale reale su cosa il sistema doveva supportare. I primitivi continuavano a cambiare man mano che scoprivamo nuovi requisiti dai compositi." },
      { type: 'paragraph', text: "L'approccio migliore era iniziare dalle schermate reali — Feed, Profilo, Post — ed estrarre componenti trovando le ripetizioni. Lo sviluppo top-down del design system è più veloce e produce componenti modellati dall'utilizzo reale." },
      { type: 'callout', text: "Costruisci prima i token del design system, poi estrai i componenti dalle schermate reali — non viceversa. I componenti costruiti in isolamento spesso non si adattano ai pattern di utilizzo reale." },
      { type: 'heading', text: "Dove siamo ora" },
      { type: 'paragraph', text: "Il design system di Spindare ha attualmente 14 componenti primitivi, 31 compositi e copre tutte le 200+ schermate. Aggiungere una nuova schermata richiede circa il 40% di tempo in meno. L'app appare coerente — non «quasi coerente», ma davvero coerente." },
    ]
  }
];

const SQ_ARTICLES: BlogArticle[] = [
  {
    slug: "flatlist-memory-leak",
    sections: [
      { type: 'paragraph', text: "Filloi me një mesazh Slack nga Biba: «Feed-i po ngadalësohet pas disa minutave.» Mendova se ishte problem rrjeti. Nuk ishte. Pas tre orësh debugimi, gjeta një memory leak që rritej rreth 12 MB në minutë — në heshtje, derisa aplikacioni mbeti pa memorie dhe scroll-i u bë i pamundur." },
      { type: 'heading', text: "Çfarë po ndodhte" },
      { type: 'paragraph', text: "Feed-i social i Spindare-s renderizonte postimet me pamje paraprake video, avatar-ë, animacione like-sh dhe numërues komentesh në kohë reale. Çdo element kishte subscription-et dhe event listener-ët e vet. FlatList-i rendonte shpejt — por diçka nën sipërfaqe po grumbullohej." },
      { type: 'paragraph', text: "Simptoma ishte e qëndrueshme: pas 4–5 minutash scroll-imi, frame rate-i binte nga 60fps në 20–30fps. Pajisjet Android më të vjetra e vuanin më herët. Heap-i JS vazhdonte të rritej edhe kur elementët dilnin jashtë ekranit." },
      { type: 'heading', text: "Si e gjeta" },
      { type: 'paragraph', text: "Hapa React DevTools Profiler të lidhur me një pajisje reale. Dyshimi i parë: elementët po qëndronin gjallë pas unmount-it. Por nuk ishte ajo." },
      { type: 'paragraph', text: "Shtova një numërues për të gjurmuar subscription-et aktive të Supabase-it. Duke hapur feed-in, abonoheshëm te komentet e çdo postimi të dukshëm. Duke scroll-uar, subscription-e të reja hapeshin — por ato të vjetrat nuk mbylleshin kurrë. Pas dy minutash: 47 subscription aktive për një feed që shfaqte 5 postime." },
      { type: 'code', language: 'typescript', text: `// Problemi — subscription-et nuk pastroheshin kurrë
function PostItem({ postId }: { postId: string }) {
  useEffect(() => {
    const channel = supabase
      .channel(\`comments:\${postId}\`)
      .on('postgres_changes', { event: '*', schema: 'public',
        table: 'comments', filter: \`post_id=eq.\${postId}\` }, handleUpdate)
      .subscribe();
    return () => {
      // Ky cleanup aktivizohej vonë ose aspak gjatë scroll-imit të shpejtë
      supabase.removeChannel(channel);
    };
  }, [postId]);
}` },
      { type: 'paragraph', text: "Problemi: FlatList-i përdor virtualizim — kur elementët dalin nga dritarja, unmount-ohen. Por me postId si varësi e useEffect dhe ripërdorimin e çelësave, cleanup-i aktivizohej vonë — ose aspak — gjatë scroll-imit të shpejtë." },
      { type: 'heading', text: "Zgjidhja" },
      { type: 'paragraph', text: "E zhvendosa logjikën e subscription-eve jashtë komponentit individual të postimit, në një menaxhues të centralizuar me numërim referencash në nivel feed-i." },
      { type: 'code', language: 'typescript', text: `// Menaxhues i centralizuar i subscription-eve me ref counting
class SubscriptionManager {
  private channels = new Map<string, { channel: RealtimeChannel; refCount: number }>();

  subscribe(postId: string, handler: (payload: any) => void) {
    const key = \`comments:\${postId}\`;
    if (this.channels.has(key)) { this.channels.get(key)!.refCount++; return; }
    const channel = supabase.channel(key)
      .on('postgres_changes', { event: '*', schema: 'public',
        table: 'comments', filter: \`post_id=eq.\${postId}\` }, handler)
      .subscribe();
    this.channels.set(key, { channel, refCount: 1 });
  }

  unsubscribe(postId: string) {
    const key = \`comments:\${postId}\`;
    const entry = this.channels.get(key);
    if (!entry) return;
    entry.refCount--;
    if (entry.refCount === 0) { supabase.removeChannel(entry.channel); this.channels.delete(key); }
  }
}
export const subscriptionManager = new SubscriptionManager();` },
      { type: 'paragraph', text: "Me këtë zgjidhje, riciklimi i shpejtë i FlatList-it nuk humbisnin më subscription-et. Nëse dy postime me të njëjtin ID shfaqeshin, ndanin një kanal. Kur abonuesi i fundit unmount-ohej, kanali mbyllej saktë." },
      { type: 'heading', text: "Rezultatet" },
      { type: 'paragraph', text: "Pas rregullimit, rritja e memories gjatë 10 minutave scroll-imi shkoi nga +120 MB në +4 MB. Frame rate-i mbeti i kyçur në 60fps. Mesazhi Slack i Bibës ditën tjetër: «Është i rrjedhshëm.»" },
      { type: 'callout', text: "Nëse përdor subscription-et real-time të Supabase-it brenda FlatList ose FlashList, gjithmonë numëro referencat. Mos supozoni kurrë se cleanup-i i useEffect aktivizohet me besueshmëri gjatë virtualizimit." },
      { type: 'heading', text: "Çfarë do të bëja ndryshe" },
      { type: 'paragraph', text: "Do ta shkruaja menaxhuesin e subscription-eve para komponentit të feed-it. Rrjedhja e memories është e qartë retrospektivisht — por e ndërtuar në izolim, problemi ishte i padukshëm. Integrimi është vendi ku këto probleme shfaqen." },
    ]
  },
  {
    slug: "auth-flow-48-hours",
    sections: [
      { type: 'paragraph', text: "Sistemi i vjetër i hyrjes funksiononte mirë... derisa ndaloi. Kishim AuthSession të Expo-s për rrjedhën OAuth, një hook të personalizuar për rifreskim token-i dhe gjendjen e sesionit në AsyncStorage. Mbulonte 90% të rasteve — derisa një përdorues raportoi logout-e të rastësishme gjatë sesionit." },
      { type: 'heading', text: "Çfarë u prish" },
      { type: 'paragraph', text: "Problemi rrënjësor: logjika e rifreskimit të token-it ishte e shpërndarë në tre vende — klienti API, hook-u i autentifikimit dhe një background task. Kur dy pjesë përpiqeshin të rifreskonin njëkohësisht, garoheshin. Njëra kishte sukses dhe shkruante token-in e ri. Tjetra, milisekonda më vonë, mbishkruante atë të vlefshëm. Thirrja e radhës API jepte 401 dhe aplikacioni çregjistronte përdoruesin." },
      { type: 'paragraph', text: "Problemi i ndërrimit të rrjetit ishte më i thjeshtë: po kontrollonim vlefshmërinë e token-it me temporizator, jo me çdo kërkesë. Me të dhënat mobile, token-et e skaduara kalonin deri në intervalin e radhës." },
      { type: 'heading', text: "Vendimi për rindërtim" },
      { type: 'paragraph', text: "Mund të kisha arnuar të dy bug-jet me kyçje dhe koordinim më të kujdesshëm. Por pas hartimit të problemit, kuptova se arkitektura vetë ishte e gabuar. Sistemi i hyrjes duhet të ketë një vend që zotëron token-et, një që i rifreshon — dhe gjithçka tjetër vetëm konsumon, kurrë nuk shkruan." },
      { type: 'paragraph', text: "Clerk-u ishte në radarin tim prej kohësh. E kisha përdorur në projekte të tjera dhe trajton pikërisht rastet e dështimit që po hasnim. Pyetja ishte nëse 48 orë ishin realiste. Ishin." },
      { type: 'heading', text: "Rindërtimi" },
      { type: 'paragraph', text: "Dita e parë: instalova Clerk Expo SDK-në, mbështolla root navigator-in me ClerkProvider dhe zëvendësova hook-un tonë useAuth me atë të Clerk-ut. Çdo ekran që kontrollonte gjendjen e sesionit kishte nevojë për një ndryshim të vetëm importi." },
      { type: 'code', language: 'typescript', text: `// Para — hook auth i personalizuar me menaxhim manual token-esh
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const stored = await AsyncStorage.getItem('session');
    if (stored) setSession(JSON.parse(stored));
    const interval = setInterval(refreshIfNeeded, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return { session, isSignedIn: !!session };
}

// Pas — Clerk menaxhon gjithçka
import { useUser, useAuth } from '@clerk/clerk-expo';
export function useAuth() {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  return { isSignedIn, userId, user };
}` },
      { type: 'paragraph', text: "Dita e dytë: migrova përdoruesit ekzistues. Kishim rreth 200 llogari. Shkrova një skript që thërriste Backend API-në e Clerk-ut për të krijuar përdorues përkatës me të njëjtat adresa email, pastaj përditësova bazën e të dhënave." },
      { type: 'heading', text: "Si duket arkitektura e re" },
      { type: 'paragraph', text: "Clerk-u menaxhon të gjithë menaxhimin e token-eve, rifreskimin dhe ruajtjen. Klienti ynë Supabase merr JWT nga Clerk-u me çdo kërkesë. Vetë aplikacioni nuk prek kurrë token-et." },
      { type: 'code', language: 'typescript', text: `// Klienti Supabase që përdor JWT të Clerk-ut
import { createClient } from '@supabase/supabase-js';
import { useSession } from '@clerk/clerk-expo';

export function useSupabaseClient() {
  const { session } = useSession();
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      fetch: async (url, options = {}) => {
        const clerkToken = await session?.getToken({ template: 'supabase' });
        const headers = new Headers(options?.headers);
        headers.set('Authorization', \`Bearer \${clerkToken}\`);
        return fetch(url, { ...options, headers });
      },
    },
  });
}` },
      { type: 'callout', text: "Nëse sistemi yt i autentifikimit ka logjikë rifreskim token-i në më shumë se një vend, do të garo-jë me veten përfundimisht. Rregullimi nuk është kyçje më e mirë — është konsolidim i pronësisë." },
      { type: 'heading', text: "Çfarë do të bëja ndryshe" },
      { type: 'paragraph', text: "Do të filloja me Clerk-un. Kalova tre muaj duke ndërtuar diçka që Clerk-u e kishte zgjidhur tashmë saktë. Logjika auth e personalizuar dukej si kontroll — ishte vetëm kompleksitet. Rindërtimi 48-orësh prodhoi sistem më të qëndrueshëm se tre muaj punë me kod të personalizuar." },
    ]
  },
  {
    slug: "supabase-vs-firebase",
    sections: [
      { type: 'paragraph', text: "Spindare është aplikacion social. Zemra e tij është feed-i ku mijëra përdorues postojnë, reagojnë dhe komentojnë në kohë reale. Kur po zgjidhja backend-in, vendimi më i rëndësishëm ishte performanca real-time në shkallë. I testova të dyja përpara se të zgjidhja." },
      { type: 'heading', text: "Çfarë po testonim" },
      { type: 'paragraph', text: "Ndërtova të njëjtën veçuri në të dyja: feed social me postime të reja në kohë reale, numërim like të përditësuar live dhe numërim komentesh pa polling. Testova me 10 deri 500 përdorues të njëkohshëm të simuluar." },
      { type: 'heading', text: "Testimi i Firebase-it" },
      { type: 'paragraph', text: "Firebase Realtime Database është i shpejtë për struktura të thjeshta çelës-vlerë. Me 10 përdorues njëkohshëm, dorëzimi ishte gati i menjëhershëm — nën 100ms. SDK-ja trajtonte rikonektimin pas rënieve të rrjetit në mënyrë të pastër." },
      { type: 'paragraph', text: "Problemet u shfaqën kur kisha nevojë për të dhëna relacionale. Elementët e feed-it të Spindare-s kanë nevojë për të dhëna përdoruesi, metadatë postimi, numërim reaksionesh dhe komentesh. Në Firestore, ose denormalizoni gjithçka ose bëni lexime të shumëfishta për element." },
      { type: 'code', language: 'javascript', text: `// Firestore: fan-out i nevojshëm për çdo like
exports.onLike = functions.firestore
  .document('likes/{likeId}')
  .onCreate(async (snap) => {
    const { postId, userId } = snap.data();
    await db.doc(\`posts/\${postId}\`).update({ likeCount: FieldValue.increment(1) });
    await db.doc(\`users/\${userId}\`).update({ likedPosts: FieldValue.arrayUnion(postId) });
    const followers = await db.collection('followers')
      .where('followingId', '==', userId).get();
    const batch = db.batch();
    followers.docs.forEach(doc => {
      batch.update(db.doc(\`feeds/\${doc.data().followerId}/posts/\${postId}\`),
        { likeCount: FieldValue.increment(1) });
    });
    return batch.commit();
  });` },
      { type: 'paragraph', text: "Kjo funksiononte, por nënkuptonte dyfishim të logjikës së biznesit midis klientit dhe Cloud Functions. Çdo ndryshim i strukturës së të dhënave kërkonte përditësime në vende të shumta." },
      { type: 'heading', text: "Testimi i Supabase-it" },
      { type: 'paragraph', text: "Real-time-i i Supabase-it është ndërtuar mbi replikimin logjik të PostgreSQL-it via WebSocket. Modeli mendor është më i thjeshtë për të dhënat relacionale: shkruaj në një tabelë të normalizuar dhe abonuesit marrin rreshtin e ndryshuar." },
      { type: 'paragraph', text: "I njëjti operacion like në Supabase ishte një INSERT i vetëm në tabelën likes. Një trigger PostgreSQL llogariste numërimin e përditësuar dhe kanali real-time e transmetonte te abonuesit. Asnjë logjikë fan-out në kodin e klientit." },
      { type: 'code', language: 'sql', text: `-- Trigger PostgreSQL: përditëso numërimin e like-ve pas INSERT
CREATE OR REPLACE FUNCTION update_like_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts
  SET like_count = (SELECT COUNT(*) FROM likes WHERE post_id = NEW.post_id)
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_insert
  AFTER INSERT ON likes
  FOR EACH ROW EXECUTE FUNCTION update_like_count();` },
      { type: 'paragraph', text: "Latenca real-time e Supabase-it ishte pak më e lartë se Firebase-i me njëkohësi të ulët — rreth 150–200ms kundrejt 80–100ms. Por varianca ishte më e ulët. Firebase ndonjëherë arrinte 800ms+ gjatë ngjarjeve të rikonektimit. Supabase ishte konsistent." },
      { type: 'heading', text: "Testi me 500 lidhje njëkohësisht" },
      { type: 'paragraph', text: "Me 500 lidhje njëkohësisht të simuluara, Supabase-i qëndroi. Shkalla e dorëzimit të mesazheve mbeti mbi 98%. Firebase Realtime Database gjithashtu qëndroi, por Firestore me pyetje komplekse tregoi dorëzim jo-konsistent." },
      { type: 'callout', text: "Real-time-i i Supabase-it funksionon më mirë për ngjarje row-level në tabela të normalizuara. Nëse keni strukturë dokumenti komplekse që kërkon fan-out, Firestore mund të përshtaten më mirë — por planifikoni overhead-in operacional." },
      { type: 'heading', text: "Çfarë zgjodha dhe pse" },
      { type: 'paragraph', text: "Supabase. Vendimi erdhi nga përputhja e modelit të të dhënave. Të dhënat e Spindare-s janë natyrshëm relacionale. PostgreSQL-i e trajton këtë natyrshëm. Latenca e matur në prodhim: 120ms p50, 280ms p99." },
    ]
  },
  {
    slug: "react-native-design-system",
    sections: [
      { type: 'paragraph', text: "Kur Spindare arriti 80 ekrane, kishim problem. I njëjti buton ekzistonte në katër versione pak të ndryshme — mbushje të ndryshme, peshë fonti të ndryshme. Çdo ekran i ri kërkonte vendime që duhej të ishin marrë tashmë." },
      { type: 'heading', text: "Pse kishim nevojë për sistem dizajni" },
      { type: 'paragraph', text: "Dy zhvillues që punojnë në të njëjtin aplikacion pa bibliotekë komponentësh të ndarë gjithmonë do të divergjojnë. Nuk është pakujdesi — është pasoja natyrale e marrjes së vendimeve lokale në izolim. Pa burim të vetëm të së vërtetës, konsistenca kërkon koordinim të vazhdueshëm. Kjo nuk shkallëzon." },
      { type: 'heading', text: "Fillimi me token-et, jo komponentët" },
      { type: 'paragraph', text: "Java e parë nuk u shpenzua duke ndërtuar komponentë. U shpenzua duke rënë dakord mbi token-et — vlerat nga të cilat do të derivohej gjithçka tjetër." },
      { type: 'code', language: 'typescript', text: `// design-tokens.ts
export const tokens = {
  color: {
    primary: '#FF6B2B',
    primaryMuted: '#FF6B2B26',
    surface: '#0F0F0F',
    surfaceElevated: '#1A1A1A',
    border: '#2A2A2A',
    text: { primary: '#FAFAFA', secondary: '#A1A1AA', muted: '#71717A' },
  },
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  radius: { sm: 6, md: 12, lg: 16, full: 9999 },
  font: {
    size: { xs: 11, sm: 13, md: 15, lg: 17, xl: 20, xxl: 28 },
    weight: { regular: '400', medium: '500', semibold: '600', bold: '700' },
  },
} as const;` },
      { type: 'paragraph', text: "Token-et duhej të ishin shteruese para ndërtimit të ndonjë komponenti. Nëse një dizajner ose zhvillues kishte nevojë të devijonte nga një token, ishte sinjal se sistemi i token-eve ishte jo i plotë." },
      { type: 'heading', text: "Arkitektura e komponentëve" },
      { type: 'paragraph', text: "Organizuam komponentët në tre nivele: primitivë, kompozitë dhe template. Primitivët ishin Text, View, Icon, Image — wrapper-ë që konsumonin token-et drejtpërdrejt. Kompozitët ishin Button, Card, Avatar, Input — ndërtuar nga primitivët pa vlera të hardkoduara." },
      { type: 'code', language: 'typescript', text: `// Button — i ndërtuar tërësisht nga token-et
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ label, variant = 'primary', size = 'md', onPress, disabled }: ButtonProps) {
  const styles = useButtonStyles(variant, size);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.container, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}` },
      { type: 'heading', text: "Çfarë gabimë fillimisht" },
      { type: 'paragraph', text: "Provuam të ndërtojmë sistemin nga poshtë-lart — duke filluar me primitivët më atomikë. Ishte gabim. Kaluam dy javë duke ndërtuar wrapper-ë Text dhe View para se të kishim sinjale reale mbi atë që sistemi duhej të mbështeste." },
      { type: 'paragraph', text: "Qasja më e mirë ishte fillimi me ekranet reale — Feed, Profil, Postim — dhe nxjerrja e komponentëve duke gjetur përsëritjet. Zhvillimi top-down i sistemit të dizajnit është më i shpejtë dhe prodhon komponentë të modeluar nga modelet reale të përdorimit." },
      { type: 'callout', text: "Ndërtoni fillimisht token-et e sistemit të dizajnit, pastaj nxirrni komponentët nga ekranet reale — jo anasjelltas. Komponentët e ndërtuar në izolim shpesh nuk përshtaten me modelet reale të përdorimit." },
      { type: 'heading', text: "Ku jemi tani" },
      { type: 'paragraph', text: "Sistemi i dizajnit i Spindare-s ka aktualisht 14 komponentë primitivë, 31 kompozitë dhe mbulon të gjitha 200+ ekranet. Shtimi i një ekrani të ri kërkon rreth 40% më pak kohë. Aplikacioni duket konsistent — jo «pothuajse konsistent», por vërtet konsistent." },
    ]
  }
];

const DE_ARTICLES: BlogArticle[] = [
  {
    slug: "flatlist-memory-leak",
    sections: [
      { type: 'paragraph', text: "Es begann mit einer Slack-Nachricht von Biba: «Der Feed wird nach ein paar Minuten langsam.» Ich dachte, es sei ein Netzwerkproblem. War es nicht. Nach drei Stunden Debugging fand ich ein Memory Leak, das etwa 12 MB pro Minute anwuchs — still und leise, bis der App der Speicher ausging und das Scrollen zäh wurde." },
      { type: 'heading', text: "Was passierte" },
      { type: 'paragraph', text: "Spindares Social Feed rendert Posts mit Video-Vorschauen, Avataren, Like-Animationen und Kommentarzählern in Echtzeit. Jedes Element verwaltet seine eigenen Subscriptions und Event Listener. Die FlatList renderte schnell — aber darunter sammelte sich etwas an." },
      { type: 'paragraph', text: "Das Symptom war konsistent: Nach 4–5 Minuten Scrollen fiel die Frame Rate von 60fps auf etwa 20–30fps. Ältere Android-Geräte traf es früher. Der JS-Heap wuchs weiter, auch wenn Elemente aus dem Sichtbereich gescrollt wurden." },
      { type: 'heading', text: "Die Fehlersuche" },
      { type: 'paragraph', text: "Ich öffnete den React DevTools Profiler und verband mich via Metro mit einem echten Gerät. Mein erster Verdacht: Elemente blieben nach dem Unmount im Speicher. Aber das war es nicht." },
      { type: 'paragraph', text: "Ich fügte einen Zähler hinzu, um aktive Supabase-Subscriptions zu verfolgen. Beim Öffnen des Feeds abonnierte ich die Kommentare jedes sichtbaren Posts. Beim Scrollen öffneten sich neue Subscriptions — aber die alten schlossen sich nie. Nach zwei Minuten: 47 aktive Subscriptions für einen Feed, der 5 Posts anzeigte." },
      { type: 'code', language: 'typescript', text: `// Das Problem — Subscriptions wurden nie bereinigt
function PostItem({ postId }: { postId: string }) {
  useEffect(() => {
    const channel = supabase
      .channel(\`comments:\${postId}\`)
      .on('postgres_changes', { event: '*', schema: 'public',
        table: 'comments', filter: \`post_id=eq.\${postId}\` }, handleUpdate)
      .subscribe();
    return () => {
      // Diese Bereinigung feuerte bei schnellem Scrollen spät oder gar nicht
      supabase.removeChannel(channel);
    };
  }, [postId]);
}` },
      { type: 'paragraph', text: "Das Problem: React Natives FlatList nutzt Virtualisierung — Elemente, die weit genug aus dem Sichtbereich scrollen, werden unmountet. Wegen postId als useEffect-Abhängigkeit und Key-Wiederverwendung aktivierte sich die Cleanup-Funktion bei schnellem Scrollen spät oder gar nicht." },
      { type: 'heading', text: "Die Lösung" },
      { type: 'paragraph', text: "Ich verschob die Subscription-Logik aus der einzelnen Post-Komponente in einen zentralisierten Subscription-Manager mit Reference Counting auf Feed-Ebene." },
      { type: 'code', language: 'typescript', text: `// Zentralisierter Subscription-Manager mit Ref Counting
class SubscriptionManager {
  private channels = new Map<string, { channel: RealtimeChannel; refCount: number }>();

  subscribe(postId: string, handler: (payload: any) => void) {
    const key = \`comments:\${postId}\`;
    if (this.channels.has(key)) { this.channels.get(key)!.refCount++; return; }
    const channel = supabase.channel(key)
      .on('postgres_changes', { event: '*', schema: 'public',
        table: 'comments', filter: \`post_id=eq.\${postId}\` }, handler)
      .subscribe();
    this.channels.set(key, { channel, refCount: 1 });
  }

  unsubscribe(postId: string) {
    const key = \`comments:\${postId}\`;
    const entry = this.channels.get(key);
    if (!entry) return;
    entry.refCount--;
    if (entry.refCount === 0) { supabase.removeChannel(entry.channel); this.channels.delete(key); }
  }
}
export const subscriptionManager = new SubscriptionManager();` },
      { type: 'paragraph', text: "Mit dieser Lösung verlor das schnelle FlatList-Recycling keine Subscriptions mehr. Wenn zwei Posts mit derselben ID erschienen, teilten sie sich einen Kanal. Wenn der letzte Subscriber unmountete, schloss sich der Kanal sauber." },
      { type: 'heading', text: "Die Ergebnisse" },
      { type: 'paragraph', text: "Nach dem Fix sank das Speicherwachstum in einer 10-minütigen Scroll-Sitzung von +120 MB auf +4 MB. Die Frame Rate blieb konstant bei 60fps. Bibas Slack-Nachricht am nächsten Tag: «Es läuft flüssig.»" },
      { type: 'callout', text: "Wenn du Supabase Echtzeit-Subscriptions in FlatList oder FlashList verwendest, zähle immer Referenzen. Gehe nie davon aus, dass die useEffect-Cleanup-Funktion beim Virtualisierungs-Recycling zuverlässig ausgelöst wird." },
      { type: 'heading', text: "Was ich anders machen würde" },
      { type: 'paragraph', text: "Ich hätte den Subscription-Manager vor der Feed-Komponente geschrieben. Das Leak ist im Nachhinein offensichtlich — aber in Isolation gebaut war das Problem unsichtbar. Integration ist der Ort, wo diese Probleme auftauchen." },
    ]
  },
  {
    slug: "auth-flow-48-hours",
    sections: [
      { type: 'paragraph', text: "Das alte Login-System funktionierte gut... bis es das nicht mehr tat. Wir hatten Expos AuthSession für den OAuth-Flow, einen benutzerdefinierten Token-Refresh-Hook und den Sitzungsstatus in AsyncStorage. Es deckte 90% der Fälle ab — bis ein Nutzer zufällige Logouts mitten in der Sitzung meldete." },
      { type: 'heading', text: "Was kaputtging" },
      { type: 'paragraph', text: "Das Kernproblem: Die Token-Refresh-Logik war auf drei Stellen verteilt — den API-Client, den Auth-Hook und einen Background-Task. Wenn zwei Teile gleichzeitig versuchten zu refreshen, rannten sie gegeneinander. Einer hatte Erfolg und schrieb das neue Token. Der andere überschrieb es Millisekunden später mit dem alten Token. Der nächste API-Aufruf gab 401 zurück und die App meldete den Nutzer ab." },
      { type: 'paragraph', text: "Das Netzwerkwechsel-Problem war einfacher: Wir überprüften die Token-Gültigkeit mit einem Timer statt bei jeder Anfrage. Mit mobilen Daten schlüpften abgelaufene Tokens durch bis zum nächsten Intervall." },
      { type: 'heading', text: "Die Entscheidung zum Neuaufbau" },
      { type: 'paragraph', text: "Ich hätte beide Bugs mit Locks und vorsichtigerer AsyncStorage-Koordination flicken können. Aber nach dem Mapping des Problems erkannte ich, dass die Architektur selbst falsch war. Ein Login-System braucht einen einzigen Ort, der Tokens besitzt, einen, der sie refresht — und alles andere konsumiert nur, schreibt nie." },
      { type: 'paragraph', text: "Clerk hatte ich schon eine Weile auf dem Radar. Ich hatte es in anderen Projekten verwendet und es behandelt genau die Fehlerszenarien, die wir trafen. Die Frage war, ob 48 Stunden realistisch waren. Sie waren es." },
      { type: 'heading', text: "Der Neuaufbau" },
      { type: 'paragraph', text: "Tag eins: Ich installierte das Clerk Expo SDK, umhüllte den Root-Navigator mit ClerkProvider und ersetzte unseren useAuth-Hook durch den von Clerk. Jeder Screen, der den Sitzungsstatus prüfte, brauchte nur eine Import-Änderung." },
      { type: 'code', language: 'typescript', text: `// Vorher — benutzerdefinierter Auth-Hook mit manuellem Token-Management
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const stored = await AsyncStorage.getItem('session');
    if (stored) setSession(JSON.parse(stored));
    const interval = setInterval(refreshIfNeeded, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return { session, isSignedIn: !!session };
}

// Nachher — Clerk verwaltet alles
import { useUser, useAuth } from '@clerk/clerk-expo';
export function useAuth() {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  return { isSignedIn, userId, user };
}` },
      { type: 'paragraph', text: "Tag zwei: Ich migrierte bestehende Nutzer. Wir hatten etwa 200 Konten. Ich schrieb ein Skript, das Clerks Backend API aufrief, um übereinstimmende Nutzer mit denselben E-Mail-Adressen zu erstellen, dann aktualisierte ich die Datenbank." },
      { type: 'heading', text: "Wie die neue Architektur aussieht" },
      { type: 'paragraph', text: "Clerk verwaltet das gesamte Token-Management, Refresh und Storage. Unser Supabase-Client erhält bei jeder Anfrage ein JWT von Clerk. Die App selbst berührt nie Tokens." },
      { type: 'code', language: 'typescript', text: `// Supabase-Client mit Clerk JWT
import { createClient } from '@supabase/supabase-js';
import { useSession } from '@clerk/clerk-expo';

export function useSupabaseClient() {
  const { session } = useSession();
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      fetch: async (url, options = {}) => {
        const clerkToken = await session?.getToken({ template: 'supabase' });
        const headers = new Headers(options?.headers);
        headers.set('Authorization', \`Bearer \${clerkToken}\`);
        return fetch(url, { ...options, headers });
      },
    },
  });
}` },
      { type: 'callout', text: "Wenn dein Auth-System Token-Refresh-Logik an mehr als einer Stelle hat, wird es irgendwann zu einer Race Condition kommen. Der Fix ist nicht besseres Locking — es ist die Konsolidierung des Eigentums." },
      { type: 'heading', text: "Was ich anders machen würde" },
      { type: 'paragraph', text: "Mit Clerk anfangen. Ich verbrachte drei Monate damit, etwas zu bauen, das Clerk bereits korrekt gelöst hatte. Die Custom-Auth-Logik fühlte sich wie Kontrolle an — es war nur Komplexität. Der 48-Stunden-Neuaufbau produzierte ein stabileres System als drei Monate Custom-Arbeit." },
    ]
  },
  {
    slug: "supabase-vs-firebase",
    sections: [
      { type: 'paragraph', text: "Spindare ist eine Social App. Ihr Kern ist ein Feed, in dem Tausende von Nutzern in Echtzeit posten, reagieren und kommentieren. Bei der Wahl des Backends war die wichtigste Entscheidung die Echtzeit-Performance in der Skalierung. Ich testete beide gründlich vor der Wahl." },
      { type: 'heading', text: "Was ich testete" },
      { type: 'paragraph', text: "Ich baute dieselbe Funktion in beiden: einen Social Feed mit neuen Posts in Echtzeit, Live-Like-Zählern und Kommentarzählern ohne Polling. Getestet mit 10 bis 500 simulierten gleichzeitigen Nutzern." },
      { type: 'heading', text: "Firebase testen" },
      { type: 'paragraph', text: "Firebase Realtime Database ist schnell für einfache Schlüssel-Wert-Strukturen. Bei 10 gleichzeitigen Nutzern war die Zustellung fast sofort — unter 100ms. Das SDK handhabte Wiederverbindungen nach Netzwerkausfällen sauber." },
      { type: 'paragraph', text: "Probleme traten auf, wenn ich relationale Daten brauchte. Spindares Feed-Elemente benötigen Nutzerdaten, Post-Metadaten, Reaktions- und Kommentarzähler. In Firestore muss man entweder alles denormalisieren oder mehrere Lesevorgänge pro Element machen. Ich schrieb Fan-Out-Funktionen für jede Schreiboperation." },
      { type: 'code', language: 'javascript', text: `// Firestore: Fan-Out für jeden Like erforderlich
exports.onLike = functions.firestore
  .document('likes/{likeId}')
  .onCreate(async (snap) => {
    const { postId, userId } = snap.data();
    await db.doc(\`posts/\${postId}\`).update({ likeCount: FieldValue.increment(1) });
    await db.doc(\`users/\${userId}\`).update({ likedPosts: FieldValue.arrayUnion(postId) });
    const followers = await db.collection('followers')
      .where('followingId', '==', userId).get();
    const batch = db.batch();
    followers.docs.forEach(doc => {
      batch.update(db.doc(\`feeds/\${doc.data().followerId}/posts/\${postId}\`),
        { likeCount: FieldValue.increment(1) });
    });
    return batch.commit();
  });` },
      { type: 'paragraph', text: "Das funktionierte, bedeutete aber, Business-Logik zwischen Client und Cloud Functions zu duplizieren. Jede Datenstrukturänderung erforderte Updates an mehreren Stellen." },
      { type: 'heading', text: "Supabase testen" },
      { type: 'paragraph', text: "Supabases Echtzeit ist auf PostgreSQLs logischer Replikation via WebSocket aufgebaut. Das mentale Modell ist einfacher für relationale Daten: schreibe in eine normalisierte Tabelle und Abonnenten erhalten die geänderte Zeile." },
      { type: 'paragraph', text: "Derselbe Like-Vorgang in Supabase war ein einzelnes INSERT in die Likes-Tabelle. Ein PostgreSQL-Trigger berechnete den aktualisierten Zähler und der Echtzeit-Kanal sendete ihn an Abonnenten. Keine Fan-Out-Logik im Client-Code." },
      { type: 'code', language: 'sql', text: `-- PostgreSQL-Trigger: Like-Zähler nach INSERT aktualisieren
CREATE OR REPLACE FUNCTION update_like_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts
  SET like_count = (SELECT COUNT(*) FROM likes WHERE post_id = NEW.post_id)
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_insert
  AFTER INSERT ON likes
  FOR EACH ROW EXECUTE FUNCTION update_like_count();` },
      { type: 'paragraph', text: "Supabases Echtzeit-Latenz war bei niedriger Parallelität etwas höher als Firebase — etwa 150–200ms gegenüber 80–100ms. Aber die Varianz war niedriger. Firebase erreichte gelegentlich 800ms+ bei Wiederverbindungsereignissen. Supabase war konsistent." },
      { type: 'heading', text: "Der 500-gleichzeitige-Verbindungen-Test" },
      { type: 'paragraph', text: "Bei 500 simulierten gleichzeitigen Verbindungen hielt Supabase stand. Die Nachrichtenzustellrate blieb über 98%. Firebase Realtime Database hielt ebenfalls stand, aber Firestore mit komplexen Abfragen zeigte inkonsistente Zustellung." },
      { type: 'callout', text: "Supabases Echtzeit funktioniert am besten für zeilenbasierte Ereignisse auf normalisierten Tabellen. Bei komplexen Dokumentstrukturen, die Fan-Out erfordern, passt Firestore möglicherweise besser — aber plane den operativen Overhead ein." },
      { type: 'heading', text: "Was ich wählte und warum" },
      { type: 'paragraph', text: "Supabase. Die Entscheidung fiel aufgrund der Datenmodell-Eignung. Spindares Daten sind inhärent relational. PostgreSQL handhabt das natürlich. Gemessene Latenz in der Produktion: 120ms p50, 280ms p99." },
    ]
  },
  {
    slug: "react-native-design-system",
    sections: [
      { type: 'paragraph', text: "Als Spindare 80 Screens erreichte, hatten wir ein Problem. Derselbe Button existierte in vier leicht unterschiedlichen Versionen — anderes Padding, anderes Schriftgewicht, andere Press-Opazität. Jeder neue Screen erforderte Entscheidungen, die längst getroffen sein sollten." },
      { type: 'heading', text: "Warum wir ein Design System brauchten" },
      { type: 'paragraph', text: "Zwei Entwickler, die ohne eine gemeinsame Komponentenbibliothek an derselben App arbeiten, werden immer auseinanderdriften. Es ist keine Nachlässigkeit — es ist die natürliche Folge lokaler Entscheidungen in Isolation. Ohne eine einzige Quelle der Wahrheit erfordert Konsistenz ständige Koordination. Das skaliert nicht." },
      { type: 'heading', text: "Mit Tokens beginnen, nicht mit Komponenten" },
      { type: 'paragraph', text: "Die erste Woche wurde nicht damit verbracht, Komponenten zu bauen. Sie wurde damit verbracht, sich auf Tokens zu einigen — die Werte, von denen alles andere abgeleitet würde." },
      { type: 'code', language: 'typescript', text: `// design-tokens.ts
export const tokens = {
  color: {
    primary: '#FF6B2B',
    primaryMuted: '#FF6B2B26',
    surface: '#0F0F0F',
    surfaceElevated: '#1A1A1A',
    border: '#2A2A2A',
    text: { primary: '#FAFAFA', secondary: '#A1A1AA', muted: '#71717A' },
  },
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  radius: { sm: 6, md: 12, lg: 16, full: 9999 },
  font: {
    size: { xs: 11, sm: 13, md: 15, lg: 17, xl: 20, xxl: 28 },
    weight: { regular: '400', medium: '500', semibold: '600', bold: '700' },
  },
} as const;` },
      { type: 'paragraph', text: "Die Tokens mussten erschöpfend sein, bevor wir eine einzige Komponente bauten. Wenn ein Designer oder Entwickler von einem Token abweichen musste, war das ein Signal, dass das Token-System unvollständig war." },
      { type: 'heading', text: "Die Komponentenarchitektur" },
      { type: 'paragraph', text: "Wir organisierten Komponenten in drei Ebenen: Primitiven, Composites und Templates. Primitiven waren Text, View, Icon, Image — Wrapper, die direkt Tokens konsumierten. Composites waren Button, Card, Avatar, Input — aus Primitiven gebaut ohne hartcodierte Werte." },
      { type: 'code', language: 'typescript', text: `// Button — vollständig aus Tokens gebaut
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ label, variant = 'primary', size = 'md', onPress, disabled }: ButtonProps) {
  const styles = useButtonStyles(variant, size);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.container, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}` },
      { type: 'heading', text: "Was wir zuerst falsch machten" },
      { type: 'paragraph', text: "Wir versuchten das System von unten nach oben zu bauen — beginnend mit den atomarsten Primitiven. Das war ein Fehler. Wir verbrachten zwei Wochen damit, Text- und View-Wrapper zu bauen, bevor wir echte Signale darüber hatten, was das System unterstützen musste." },
      { type: 'paragraph', text: "Der bessere Ansatz: Mit den echten Screens beginnen — Feed, Profil, Post-Detail — und Komponenten durch Wiederholungen extrahieren. Top-Down-Design-System-Entwicklung ist schneller und produziert Komponenten, die durch echte Nutzungsmuster geprägt sind." },
      { type: 'callout', text: "Baue zuerst die Design-System-Tokens, dann extrahiere Komponenten aus echten Screens — nicht umgekehrt. In Isolation gebaute Komponenten passen oft nicht zu den tatsächlichen Nutzungsmustern." },
      { type: 'heading', text: "Wo wir jetzt stehen" },
      { type: 'paragraph', text: "Spindares Design System hat derzeit 14 primitive Komponenten, 31 Composites und deckt alle 200+ Screens ab. Das Hinzufügen eines neuen Screens dauert etwa 40% weniger Zeit. Die App sieht konsistent aus — nicht 'fast konsistent', sondern wirklich konsistent." },
    ]
  }
];

export const BLOG_ARTICLES: Record<string, BlogArticle[]> = {
  en: EN_ARTICLES,
  it: IT_ARTICLES,
  sq: SQ_ARTICLES,
  de: DE_ARTICLES,
};
