export type BlogLang = "en" | "de" | "it" | "sq";

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  read: number;
  content: string;
  content_de?: string;
  content_it?: string;
  content_sq?: string;
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
    onLike={() => handleLike(item.id)}
    onComment={() => openComments(item.id)}
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
    content_de: `
## Das Problem

Etwa sechs Wochen nach dem Aufbau von Spindares Social Feed fiel mir etwas Merkwürdiges auf. Der Feed lud problemlos — scrollte flüssig, renderte schnell — aber nach rund 90 Sekunden kontinuierlicher Nutzung sackte die Framerate von 60fps auf unter 20. Nach drei Minuten stürzte die App auf älteren iPhones komplett ab.

Der Feed nutzte eine Standard-\`FlatList\` mit einem Supabase Realtime-Abonnement, das neue Posts einschob. Auf den ersten Blick sah alles gut aus. Unter der Haube fraß etwas den Speicher leer.

## Diagnose mit Flipper

Erster Schritt: Flipper öffnen und das Speicherprofil beim Scrollen beobachten. Innerhalb von 60 Sekunden war es klar: Der Speicher stieg stetig an, ohne dass GC-Zyklen aufräumten. Der Heap wuchs ~4 MB pro Minute bei einem Feed mit 1.000 Posts.

Die zwei üblichen Verdächtigen bei FlatList-Speicherlecks sind:

1. **Nicht abgemeldete Event-Listener** — Listener, die innerhalb von \`renderItem\` hinzugefügt werden und nie bereinigt werden
2. **Bild-Caching** — Bilder, die in den Speicher geladen werden und nie freigegeben werden

In unserem Fall waren es beide, plus ein drittes Problem, das ich nicht erwartet hatte.

## Ursache #1: Inline-Handler in renderItem

Unser \`renderItem\` erstellte bei jedem Render neue Funktionsinstanzen:

\`\`\`tsx
renderItem={({ item }) => (
  <FeedPost
    post={item}
    onLike={() => handleLike(item.id)}
    onComment={() => openComments(item.id)}
  />
)}
\`\`\`

Jedes Scroll-Ereignis rendert sichtbare Zellen neu. Jedes Re-Render erstellt zwei neue Closures pro Post. Bei 1.000 Posts und schnellem Scrollen entstehen Tausende Closures, die nie freigegeben werden.

**Fix:** \`useCallback\` mit stabilen Referenzen, und \`item.id\` als Prop übergeben statt in einem Closure zu erfassen:

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

## Ursache #2: Supabase-Channel-Abonnement innerhalb von renderItem

Das war das ernstere Problem. Wir hatten eine Komponente, die Echtzeit-Updates für jeden einzelnen Post abonnierte (für Live-Like-Zähler). Das Abonnement wurde in \`useEffect\` erstellt, aber nur beim Unmount der Komponente bereinigt — und FlatLists Virtualisierung mountete und unmountete Zellen ständig.

\`\`\`tsx
useEffect(() => {
  const channel = supabase.channel(\`post:\${postId}\`)
    .on('postgres_changes', { ... }, handleUpdate)
    .subscribe();
  // fehlende return () => supabase.removeChannel(channel)
}, [postId]);
\`\`\`

Die fehlende Cleanup-Funktion bedeutete, dass jeder virtualisierte Unmount ein hängendes Supabase WebSocket-Abonnement hinterließ. Bei 1.000 Posts im Feed konnten Hunderte offener Channels gleichzeitig existieren.

**Fix:** Immer die Cleanup-Funktion aus \`useEffect\` zurückgeben:

\`\`\`tsx
useEffect(() => {
  const channel = supabase.channel(\`post:\${postId}\`)
    .on('postgres_changes', { ... }, handleUpdate)
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [postId]);
\`\`\`

## Ursache #3: keyExtractor gibt Index zurück

Das ist subtil. Wir hatten:

\`\`\`tsx
keyExtractor={(item, index) => index.toString()}
\`\`\`

Wenn neue Posts oben im Feed erscheinen, verschieben sich alle vorhandenen Keys. React Natives Reconciler denkt, jedes Element hat sich verändert und rendert die gesamte Liste neu. Verwende stattdessen eine stabile ID:

\`\`\`tsx
keyExtractor={(item) => item.id}
\`\`\`

## Das Ergebnis

Nach allen drei Fixes sank das Speicherwachstum von ~4 MB/Min auf nahezu null. Der Feed läuft jetzt 10+ Minuten kontinuierlich bei 60fps ohne Abstürze, selbst auf einem iPhone 12 Mini mit begrenztem RAM.

**Die Lektion:** FlatList-Speicherprobleme drehen sich fast immer um drei Dinge — stabile Keys, Cleanup in useEffect und das Vermeiden von Inline-Funktionserstellung in renderItem. Wer diese drei Punkte richtig umsetzt, muss selten weitersuchen.
    `,
    content_it: `
## Il Problema

Circa sei settimane dopo aver costruito il social feed di Spindare, iniziai a notare qualcosa di strano. Il feed si caricava bene — scrollava fluidamente, renderizzava senza problemi — ma dopo circa 90 secondi di utilizzo continuo, il framerate scendeva da 60fps a meno di 20. Dopo tre minuti, l'app crashava completamente sui vecchi iPhone.

Il feed usava una \`FlatList\` standard con un abbonamento Supabase Realtime che inseriva nuovi post. In superficie tutto sembrava a posto. Sotto al cofano, qualcosa stava consumando la memoria.

## Diagnosi con Flipper

Primo passo: aprire Flipper e osservare il profilo di memoria durante lo scroll. Nel giro di 60 secondi era chiaro: la memoria cresceva costantemente senza che alcun ciclo GC la liberasse. L'heap cresceva di ~4 MB al minuto su un feed con 1.000 post.

I due soliti sospettati per le memory leak in FlatList sono:

1. **Listener di eventi non rimossi** — listener aggiunti all'interno di \`renderItem\` che non vengono mai puliti
2. **Caching delle immagini** — immagini caricate in memoria che non vengono mai liberate

Nel nostro caso erano entrambi, più un terzo problema che non mi aspettavo.

## Causa #1: Handler inline in renderItem

Il nostro \`renderItem\` creava nuove istanze di funzione ad ogni render:

\`\`\`tsx
renderItem={({ item }) => (
  <FeedPost
    post={item}
    onLike={() => handleLike(item.id)}
    onComment={() => openComments(item.id)}
  />
)}
\`\`\`

Ogni evento di scroll ri-renderizza le celle visibili. Ogni re-render crea due nuove closure per post. Con 1.000 post e scroll rapido, si generano migliaia di closure che non vengono mai liberate.

**Fix:** \`useCallback\` con riferimenti stabili, e passare \`item.id\` come prop invece di catturarlo in una closure:

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

## Causa #2: Abbonamento al channel Supabase dentro renderItem

Questo era il problema più grave. Avevamo un componente che si abbonava agli aggiornamenti in tempo reale per ogni singolo post (per i contatori di like live). L'abbonamento veniva creato in \`useEffect\` ma pulito solo quando il componente veniva smontato — e la virtualizzazione di FlatList montava e smontava le celle continuamente.

\`\`\`tsx
useEffect(() => {
  const channel = supabase.channel(\`post:\${postId}\`)
    .on('postgres_changes', { ... }, handleUpdate)
    .subscribe();
  // mancava return () => supabase.removeChannel(channel)
}, [postId]);
\`\`\`

L'assenza della funzione di cleanup significava che ogni smontaggio virtualizzato lasciava un abbonamento WebSocket Supabase appeso. Con 1.000 post nel feed, potevano esistere simultaneamente centinaia di channel aperti.

**Fix:** Restituire sempre la cleanup da \`useEffect\`:

\`\`\`tsx
useEffect(() => {
  const channel = supabase.channel(\`post:\${postId}\`)
    .on('postgres_changes', { ... }, handleUpdate)
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [postId]);
\`\`\`

## Causa #3: keyExtractor che restituisce l'indice

Questo è sottile. Avevamo:

\`\`\`tsx
keyExtractor={(item, index) => index.toString()}
\`\`\`

Quando nuovi post appaiono in cima al feed (real-time), tutte le chiavi esistenti si spostano. Il reconciler di React Native pensa che ogni elemento sia cambiato e ri-renderizza l'intera lista. Usa un ID stabile:

\`\`\`tsx
keyExtractor={(item) => item.id}
\`\`\`

## Il Risultato

Dopo tutti e tre i fix, la crescita della memoria è scesa da ~4 MB/min a sostanzialmente piatta. Il feed ora gira a 60fps per 10+ minuti di utilizzo continuo senza crash, anche su iPhone 12 Mini con RAM limitata.

**La lezione:** I problemi di memoria in FlatList riguardano quasi sempre tre cose — chiavi stabili, cleanup in useEffect, e evitare la creazione di funzioni inline in renderItem. Azzecca quelle tre e raramente dovrai cercare altrove.
    `,
    content_sq: `
## Problemi

Rreth gjashtë javë pasi ndërtova feed-in social të Spindare, fillova të vëreja diçka të çuditshme. Feed-i ngarkohej mirë — scrollonte rrjedhshëm, renderizohej pa probleme — por pas rreth 90 sekondash të përdorimit të vazhdueshëm, framerate-i do të binte nga 60fps në nën 20. Pas tre minutash, aplikacioni crashonte plotësisht në iPhone-ët e vjetër.

Feed-i po përdorte një \`FlatList\` standarde me një abonim Supabase Realtime që futonte postime të reja. Në sipërfaqe gjithçka dukej mirë. Nën kapak, diçka po hante memorien.

## Diagnostikimi me Flipper

Hapi i parë: hapja e Flipper-it dhe vëzhgimi i profilit të memories gjatë scroll-it. Brenda 60 sekondash ishte e qartë: memoria po rritej vazhdimisht pa asnjë cikël GC pastrimi. Heap-i po rritej ~4 MB në minutë në një feed me 1.000 postime.

Dy të dyshuarit e zakonshëm për rrjedhjet e memories në FlatList janë:

1. **Event listener-ë të pa-larguar** — listener-ë të shtuar brenda \`renderItem\` që nuk pastrohen kurrë
2. **Caching i imazheve** — imazhe të ngarkuara në memorie që nuk lirohen kurrë

Në rastin tonë ishin të dy, plus një problem i tretë që nuk e prisja.

## Shkaku #1: Handler-ë inline në renderItem

\`renderItem\`-i ynë po krijonte instanca të reja funksionesh në çdo render:

\`\`\`tsx
renderItem={({ item }) => (
  <FeedPost
    post={item}
    onLike={() => handleLike(item.id)}
    onComment={() => openComments(item.id)}
  />
)}
\`\`\`

Çdo ngjarje scroll ri-renderiz qelizat e dukshme. Çdo ri-render krijon dy closure të reja për postim. Me 1.000 postime dhe scroll të shpejtë, kjo janë mijëra closure që nuk lirohen kurrë.

**Fix:** \`useCallback\` me referenca të qëndrueshme, dhe kalo \`item.id\` si prop në vend të kapjes së tij në një closure:

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

## Shkaku #2: Abonimi i channel-it Supabase brenda renderItem

Ky ishte problemi më i rëndë. Kishim një komponent që abonohej tek përditësimet në kohë reale për çdo postim individual (për numëratorët e live like-ve). Abonimet po krijoheshin në \`useEffect\` por po pastroheshin vetëm kur komponenti shpërbëhej — dhe virtualizimi i FlatList-it po montonte dhe shpërbënte qelizat vazhdimisht.

\`\`\`tsx
useEffect(() => {
  const channel = supabase.channel(\`post:\${postId}\`)
    .on('postgres_changes', { ... }, handleUpdate)
    .subscribe();
  // mungonte return () => supabase.removeChannel(channel)
}, [postId]);
\`\`\`

Mungesa e funksionit të pastrimit nënkuptonte që çdo shpërbërje e virtualizuar linte një abonim WebSocket Supabase të varur. Me 1.000 postime në feed, mund të ekzistonin njëkohësisht qindra channel-e të hapura.

**Fix:** Gjithmonë kthe pastrimin nga \`useEffect\`:

\`\`\`tsx
useEffect(() => {
  const channel = supabase.channel(\`post:\${postId}\`)
    .on('postgres_changes', { ... }, handleUpdate)
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [postId]);
\`\`\`

## Shkaku #3: keyExtractor kthen indeksin

Kjo është delikate. Kishim:

\`\`\`tsx
keyExtractor={(item, index) => index.toString()}
\`\`\`

Kur postime të reja shfaqen në krye të feed-it, të gjithë çelësat ekzistues zhvendosen. Rekonsileruesi i React Native-it mendon se çdo element ka ndryshuar dhe ri-renderiz të gjithë listën. Përdor një ID të qëndrueshme:

\`\`\`tsx
keyExtractor={(item) => item.id}
\`\`\`

## Rezultati

Pas të tre rregullimeve, rritja e memories u ul nga ~4 MB/min në praktikisht zero. Feed-i tani funksionon me 60fps për 10+ minuta të përdorimit të vazhdueshëm pa crash, edhe në iPhone 12 Mini me RAM të kufizuar.

**Mësimi:** Problemet e memories në FlatList ka të bëjë gjithmonë me tre gjëra — çelësa të qëndrueshëm, pastrim në useEffect dhe shmangja e krijimit të funksioneve inline në renderItem. Zbato mirë ato tri dhe rrallë do të duhet të kërkosh më tutje.
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
    content_de: `
## Die Situation

Es war ein Dienstag. Spindares Auth lief seit zwei Monaten auf einem Standard-Clerk-Setup — E-Mail/Passwort, Google OAuth, JWT zu Supabase über den Clerk-Webhook. Es funktionierte. Nutzer konnten sich anmelden, abmelden, Sessions blieben erhalten, nichts brannte.

Dann entschieden wir uns, das Ban-System hinzuzufügen.

## Warum das alte System versagte

Die Anforderung war einfach: Gebannte Nutzer sollen auf allen Ebenen gesperrt werden — API-Aufrufe, Echtzeit-Abonnements, sogar das Lesen öffentlicher Daten. Unser alter Ablauf:

1. Nutzer meldet sich über Clerk an
2. Clerk stellt ein JWT aus
3. JWT wird als Custom-Auth-Token an Supabase übergeben
4. Supabase RLS-Richtlinien prüfen \`auth.uid()\`

Das Problem: Clerks JWT hatte eine 1-Stunden-Ablaufzeit. Ein gebannter Nutzer, der zum Zeitpunkt des Bans aktiv war, hätte bis zu 60 Minuten lang weiterhin gültigen Supabase-Zugriff. Wir hatten keine Möglichkeit, seine Session sofort zu invalidieren.

Außerdem prüften unsere Supabase RLS-Richtlinien zwar \`auth.uid()\`, aber unsere Ban-Tabelle befand sich in einem separaten Schema, das auf Richtlinienebene nicht geprüft wurde. Gebannte Nutzer konnten weiterhin Posts lesen und WebSocket-Channels öffnen. Der Ban blockierte nur Schreibvorgänge.

## Der 48-Stunden-Umbau

Ich wollte das nicht patchen. Auth zu patchen ist der Weg, wie man Sicherheitslücken bekommt. Ich entschied mich, den gesamten Auth-Ablauf mit dem Ban-System als erstklassigem Bestandteil neu aufzubauen.

**Neue Architektur:**

\`\`\`
Clerk (Identity) → Edge Function (Validierung + Ban-Check) → Supabase JWT (kurzlebig)
\`\`\`

Jede authentifizierte Supabase-Anfrage läuft jetzt durch eine Supabase Edge Function, die:
1. Das Clerk JWT validiert
2. Die Ban-Tabelle auf die UID des Nutzers prüft
3. Bei einem Ban sofort 403 zurückgibt
4. Bei einem sauberen Check ein neues kurzlebiges Supabase JWT (15 Min. Ablaufzeit) ausstellt

Der Client cached dieses Token und erneuert es vor Ablauf. Wenn ein Ban mitten in einer Session ausgesprochen wird, schlägt die nächste Token-Erneuerung mit 403 fehl und der Client wird zum Abmelden gezwungen.

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

**RLS-Richtlinien** prüfen jetzt einen Custom Claim im JWT statt direkt \`auth.uid()\`, sodass die Richtlinienebene eng mit unserer Token-Erstellungslogik verknüpft ist.

## Was ich anders machen würde

**Von Anfang an kurzlebige Tokens verwenden.** Das 1-Stunden Clerk JWT war von Beginn an ein Fehler. Jedes Auth-Token in einer mobilen App, das länger als 15 Minuten gültig ist, schafft unnötige Risiken. Kurze Tokens zwingen einen dazu, saubere Refresh-Logik zu bauen, was die sofortige Invalidierung praktisch kostenlos macht.

**Das Ban-System vor der Auth entwerfen, nicht danach.** Wir bauten die Auth unter der Annahme, dass alle Nutzer dauerhaft gültig sind. Das Ban-System nachträglich einzubauen erforderte einen kompletten Umbau. Hätte ich das Vertrauensmodell von Anfang an skizziert — "Wie entziehen wir sofort Zugriff?" — wäre die Architektur beim ersten Mal richtig gewesen.

**Keine Angst vor Rewrites.** 48 Stunden fühlten sich zu Beginn viel an. Im Nachhinein war es die richtige Entscheidung. Die gepatchte Version hätte subtile Lücken gehabt, die ich noch monatelang aufgespürt hätte.

## Das Ergebnis

Bans greifen jetzt maximal innerhalb von 15 Minuten (das Token-Refresh-Fenster). Bei schwerwiegenden Verstößen haben wir einen Force-Invalidierungsendpunkt, der das gecachte Token client-seitig über eine Push-Benachrichtigung löscht. Die RLS-Ebene ist kompakt, auditierbar und hat keine "funktioniert — bis es das nicht mehr tut"-Randfälle.

Auth ist eines jener Dinge, bei denen es einmal richtig zu machen weit mehr wert ist als es dauerhaft zu patchen.
    `,
    content_it: `
## La Situazione

Era un martedì. L'auth di Spindare girava su un setup Clerk standard da due mesi — email/password, Google OAuth, JWT a Supabase via Clerk webhook. Funzionava. Gli utenti potevano accedere, disconnettersi, le sessioni persistevano, niente era in fiamme.

Poi decidemmo di aggiungere il sistema di ban.

## Perché il vecchio sistema ha ceduto

Il requisito era semplice: gli utenti bannati devono essere bloccati a ogni livello — chiamate API, abbonamenti real-time, persino la lettura di dati pubblici. Il nostro vecchio flusso:

1. L'utente accede tramite Clerk
2. Clerk emette un JWT
3. Il JWT viene passato a Supabase come token di autenticazione personalizzato
4. Le policy RLS di Supabase verificano \`auth.uid()\`

Il problema: il JWT di Clerk aveva una scadenza di 1 ora. Un utente bannato che era attivo al momento del ban avrebbe continuato ad avere accesso Supabase valido per fino a 60 minuti. Non avevamo nessun meccanismo per invalidare la sua sessione in tempo reale.

Inoltre, le nostre policy RLS di Supabase controllavano \`auth.uid()\` ma la nostra tabella dei ban si trovava in uno schema separato che non veniva controllato a livello di policy. Gli utenti bannati potevano ancora leggere i post, aprire channel WebSocket. Il ban bloccava solo le scritture.

## La riscrittura in 48 ore

Non volevo fare patching. Fare patching all'auth è il modo in cui ci si ritrova con falle di sicurezza. Decisi di ricostruire l'intero flusso di autenticazione con il sistema di ban come componente di primo livello.

**Nuova architettura:**

\`\`\`
Clerk (identità) → Edge Function (validazione + controllo ban) → Supabase JWT (breve durata)
\`\`\`

Ogni richiesta Supabase autenticata ora passa attraverso una Supabase Edge Function che:
1. Valida il JWT di Clerk
2. Controlla la tabella dei ban per l'UID dell'utente
3. Se bannato, restituisce 403 immediatamente
4. Se non bannato, conia un nuovo JWT Supabase a breve scadenza (15 min) e lo restituisce

Il client mette in cache questo token e lo aggiorna prima della scadenza. Se un ban avviene a metà sessione, il successivo aggiornamento del token fallisce con 403 e il client viene forzato a disconnettersi.

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

**Le policy RLS** ora controllano un claim personalizzato nel JWT invece di \`auth.uid()\` direttamente, quindi il livello delle policy è strettamente accoppiato alla nostra logica di coniazione dei token.

## Cosa farei diversamente

**Iniziare con token a breve scadenza.** Il JWT di Clerk da 1 ora era un errore fin dall'inizio. Qualsiasi token di autenticazione che dura più di 15 minuti in un'app mobile crea rischi inutili. I token brevi ti obbligano a costruire una logica di refresh corretta, che poi rende l'invalidazione a metà sessione quasi gratuita.

**Progettare il sistema di ban prima dell'auth, non dopo.** Abbiamo costruito l'auth assumendo che tutti gli utenti fossero validi indefinitamente. Aggiungere i ban dopo il fatto ha richiesto una riscrittura completa. Se avessi abbozzato il modello di fiducia dall'inizio — "come revochiamo l'accesso istantaneamente?" — l'architettura sarebbe stata giusta fin dalla prima volta.

**Non aver paura dei rewrite.** 48 ore sembravano tante quando ho iniziato. Guardando indietro, era la scelta giusta. La versione patchata avrebbe avuto falle sottili che avrei cacciato per mesi.

## Il Risultato

I ban ora entrano in vigore al massimo entro 15 minuti (la finestra di refresh del token). Per le violazioni gravi abbiamo un endpoint di force-invalidation che elimina il token in cache lato client tramite una notifica push. Il livello RLS è compatto, verificabile e non ha casi limite del tipo "funziona fino a quando non funziona più".

L'auth è una di quelle cose dove farlo bene una volta vale molto di più che farlo patchare indefinitamente.
    `,
    content_sq: `
## Situata

Ishte e martë. Auth-i i Spindare po punonte me një konfigurim standard Clerk prej dy muajsh — email/fjalëkalim, Google OAuth, JWT në Supabase nëpërmjet webhook-ut të Clerk. Funksiononte. Përdoruesit mund të hynin, dilnin, sesionet qëndronin, asgjë nuk po digjej.

Pastaj vendosëm të shtonim sistemin e ndalimit.

## Pse sistemi i vjetër dështoi

Kërkesa ishte e thjeshtë: përdoruesit e ndaluar duhet të bllokohen në çdo nivel — thirrje API, aboname në kohë reale, madje leximi i të dhënave publike. Rrjedha jonë e vjetër:

1. Përdoruesi hyn nëpërmjet Clerk
2. Clerk lëshon një JWT
3. JWT kalohet Supabase si token autentikimi i personalizuar
4. Politikat RLS të Supabase kontrollojnë \`auth.uid()\`

Problemi: JWT-ja e Clerk kishte skadim 1 ore. Një përdorues i ndaluar që ishte aktiv kur ndodhi ndalimi do të kishte akses të vlefshëm Supabase deri në 60 minuta. Nuk kishim mekanizëm për të invaliduar sesionin e tyre gjatë rrjedhës.

Përveç kësaj, politikat tona RLS po kontrollonin \`auth.uid()\` por tabela jonë e ndalimeve ndodhej në një skemë të veçantë që nuk po kontrollohej në nivelin e politikave. Përdoruesit e ndaluar mund të lexonin ende postimet, të hapnin channel-e WebSocket. Ndalimi bllokonte vetëm shkrimet.

## Rishkrimi 48-orësh

Nuk doja të bëja patch. Patch-imi i auth-it është mënyra si krijohen vrimat e sigurisë. Vendosa të rindërtoja të gjithë rrjedhën e autentikimit me sistemin e ndalimit si komponent kryesor.

**Arkitektura e re:**

\`\`\`
Clerk (identiteti) → Edge Function (validim + kontroll ndalimi) → Supabase JWT (jetëshkurtër)
\`\`\`

Çdo kërkesë e autentikuar Supabase tani kalon nëpërmjet një Supabase Edge Function që:
1. Validon JWT-në e Clerk
2. Kontrollon tabelën e ndalimeve për UID-in e përdoruesit
3. Nëse është ndaluar, kthen 403 menjëherë
4. Nëse është i pastër, krijon një JWT të ri Supabase jetëshkurtër (15 min skadim) dhe e kthen atë

Klienti cache-on këtë token dhe e rifreskojë para skadimit. Nëse ndodh një ndalim gjatë sesionit, rifreskhimi i ardhshëm i token-it dështon me 403 dhe klienti detyrohet të dalë.

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

**Politikat RLS** tani kontrollojnë një claim të personalizuar në JWT në vend të \`auth.uid()\` drejtpërdrejt, kështu që niveli i politikave është i lidhur ngushtë me logjikën tonë të krijimit të token-eve.

## Çfarë do të bëja ndryshe

**Filloni me token-ë jetëshkurtër.** JWT-ja 1-orëshe e Clerk ishte gabim që nga fillimi. Çdo token autentikimi që zgjat më shumë se 15 minuta në një aplikacion mobil krijon rreziqe të panevojshme. Token-ët e shkurtër të detyrojnë të ndërtosh logjikë të duhur rifreskimi, gjë që e bën invalidimin gjatë sesionit praktikisht pa kosto.

**Projektoni sistemin e ndalimit para auth-it, jo pas.** Ne ndërtuam auth-in duke supozuar që të gjithë përdoruesit janë të vlefshëm përgjithmonë. Shtimi i ndalimeve pas faktit kërkoi rishkrim të plotë. Nëse do ta kishim skicuar modelin e besimit që në fillim — "si revokojmë aksesin menjëherë?" — arkitektura do të ishte e saktë herën e parë.

**Mos kini frikë nga rishkrimet.** 48 orët dukeshin shumë kur fillova. Duke parë prapa, ishte vendimi i duhur. Versioni i patchuar do të kishte vrima delikate që do t'i gjurmoja me muaj.

## Rezultati

Ndalimi tani hyn në fuqi brenda maksimum 15 minutave (dritarja e rifreskim të token-it). Për shkeljet e rënda kemi një endpoint të force-invalidimit që fshin token-in e cache-uar nga klienti nëpërmjet një njoftimi push. Niveli RLS është kompakt, i auditueshem dhe nuk ka raste të tipit "funksionon mirë derisa nuk funksionon".

Auth-i është një nga ato gjëra ku ta bësh saktë një herë vlen shumë më tepër se ta rregullosh vazhdimisht.
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
    content_de: `
## Hintergrund

Als wir begannen, Spindares Social Feed zu bauen, war die Architekturentscheidung, auf die ich die meiste Zeit verwendet habe, die Echtzeit-Datenübertragung. Ein Social Feed steht und fällt mit der Latenz. Wenn ein Nutzer eine Challenge postet und seine Freunde sie 30 Sekunden später sehen, ist das kein Social Feed — das ist E-Mail.

Ich evaluierte Firebase Realtime Database und Supabase Realtime über etwa zwei Wochen. Hier sind meine Erkenntnisse.

## Der Testaufbau

Ich baute denselben grundlegenden Feed in beiden Systemen — eine Liste von Posts, jeweils mit Like-Zählern, Kommentarzählern und einem Zeitstempel. Neue Posts sollen in Echtzeit oben erscheinen. Like-Zähler sollen live aktualisiert werden.

Simulierte Last: 500 gleichzeitige WebSocket-Verbindungen, alle am gleichen Feed-Channel abonniert, mit 50 Schreibvorgängen pro Sekunde (Mix aus neuen Posts und Like-Updates).

Ich führte dies von einem $5 DigitalOcean Droplet aus mit \`k6\` für die Lastgenerierung.

## Firebase: Was mich überraschte

Firebase Realtime Database bewältigte die WebSocket-Verbindungen problemlos. Die Verbindungslatenz war niedrig und die automatische Reconnect-Logik des SDKs war solide. Unter 500 gleichzeitigen Verbindungen wurden Schreibvorgänge konsistent in unter 200ms propagiert.

Wo es versagte: **Datenmodellierung**.

Firebases Dokumentenmodell drängte mich dazu, aggressiv zu denormalisieren. Um einen Post mit Autor-Info, Like-Zähler und Kommentarzähler in Echtzeit anzuzeigen, landete ich bei einer Struktur, bei der Updates an einem dieser drei Dinge ein Re-Render des gesamten Post-Objekts auslösten. Bei 50 Schreibvorgängen/Sek. mit 500 Listenern sind das 25.000 Event-Callbacks pro Sekunde auf der Client-Seite.

Das SDK batcht diese, aber das Ergebnis war sichtbares Ruckeln beim Feed-Scrollen, wann immer Like-Stürme auftraten (viele Nutzer liken denselben Post gleichzeitig).

Firestore behandelte das besser mit seinem granularen Feld-Level-Update-Modell, aber Firestores Echtzeit-Preisgestaltung im großen Maßstab wird schnell erschreckend.

## Supabase Realtime: Was funktionierte

Supabase Realtime verwendet unter der Haube Postgres Logical Replication, was bedeutet, dass man tatsächliche Datenbankänderungen abonniert — auf Zeilen- oder Spaltenebene. Das passt viel besser zum eigentlichen Datenmodell eines Social Feeds.

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

Granulare Abonnements bedeuteten, dass Like-Zähler-Updates nur Re-Renders für den konkret gelikten Post auslösten — nicht für den gesamten Feed. Unter der gleichen Last blieb der Feed flüssig.

## Wo Supabase schwächelt

Verbindungslimits. Supabaes kostenloses Tier begrenzt gleichzeitige Realtime-Verbindungen auf 200. Der Pro-Plan erhöht das auf 500. Für eine wachsende Social-App erreicht man diese Grenze schnell.

Der Workaround: Realtime nur für kritische Live-Updates verwenden (neue Posts, Benachrichtigungs-Badges) und für weniger zeitkritische Daten pollen. Wir implementierten eine hybride Lösung — Realtime für neue Posts und Benachrichtigungen, 30-Sekunden-Polling für Like/Kommentar-Zähler bei Posts älter als 2 Minuten.

Außerdem: Supabase Realtimes Filtersyntax ist begrenzt. Komplexe Multi-Table-Joins werden in Abonnementfiltern nicht unterstützt — man abonniert eine Tabelle und filtert bei Bedarf client-seitig.

## Die Entscheidung

Wir entschieden uns für Supabase Realtime. Das Postgres-native Datenmodell und granulare Abonnements waren uns mehr wert als Firebases Verbindungsskalierbarkeit in dieser Phase. Wenn wir das Verbindungslimit erreichen, werden wir nach Feed-Segmenten sharden oder kritische Echtzeit-Pfade auf einen dedizierten WebSocket-Server verlagern.

Die ehrliche Antwort auf "welches skaliert besser" lautet: keines, bei echter Scale. Beide erfordern Architekturänderungen, wenn man Zehntausende gleichzeitiger Verbindungen erreicht. Aber für eine Social App auf Launch-Scale (unter 5.000 DAU) bewältigt Supabase Realtime mit einer Hybrid-Polling-Strategie dies sauber ohne die Datenmodellierungs-Kopfschmerzen.
    `,
    content_it: `
## Contesto

Quando abbiamo iniziato a costruire il social feed di Spindare, la decisione architetturale su cui ho trascorso più tempo è stata i dati in tempo reale. Un social feed vive o muore sulla latenza. Se un utente posta una challenge e i suoi amici la vedono 30 secondi dopo, quello non è un social feed — è una email.

Ho valutato Firebase Realtime Database e Supabase Realtime per circa due settimane. Ecco cosa ho trovato.

## Il setup del test

Ho costruito lo stesso feed di base in entrambi — una lista di post, ognuno con contatori di like, contatori di commenti e un timestamp. I nuovi post devono apparire in cima in tempo reale. I contatori di like devono aggiornarsi dal vivo.

Carico simulato: 500 connessioni WebSocket concorrenti, ognuna abbonata allo stesso channel del feed, con 50 scritture al secondo (mix di nuovi post e aggiornamenti dei like).

Ho eseguito questo da un droplet DigitalOcean da $5 usando \`k6\` per la generazione del carico.

## Firebase: cosa mi ha sorpreso

Firebase Realtime Database ha gestito le connessioni WebSocket facilmente. La latenza di connessione era bassa e la logica di riconnessione automatica dell'SDK era solida. Con 500 connessioni concorrenti, le scritture si propagavano in meno di 200ms costantemente.

Dove ha ceduto: la **modellazione dei dati**.

Il modello a documenti di Firebase mi ha spinto verso una denormalizzazione aggressiva. Per mostrare un post con le informazioni sull'autore, il contatore dei like e quello dei commenti in tempo reale, sono finito con una struttura dove gli aggiornamenti a uno qualsiasi di questi tre elementi scatenava re-render dell'intero oggetto post. A 50 scritture/sec con 500 ascoltatori, sono 25.000 callback di eventi al secondo lato client.

L'SDK li raggruppa, ma il risultato era un jank visibile durante lo scroll del feed ogni volta che si verificavano like storm.

Firestore gestiva questo meglio con il suo modello di aggiornamento a livello di campo granulare, ma il pricing real-time di Firestore su larga scala diventa rapidamente spaventoso.

## Supabase Realtime: cosa ha funzionato

Supabase Realtime usa la replica logica di Postgres sotto il cofano, il che significa che stai abbonandoti a vere modifiche del database — a livello di riga, a livello di colonna se vuoi. Questo si adatta molto meglio al modello dati effettivo di un social feed.

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

Gli abbonamenti granulari significavano che gli aggiornamenti del contatore di like scatenavano re-render solo per il post specifico che veniva messo in like, non per l'intero feed. Con lo stesso carico, il feed rimaneva fluido.

## I limiti di Supabase

Limiti di connessione. Il piano gratuito di Supabase limita le connessioni Realtime concorrenti a 200. Il piano Pro porta questo a 500. Per un'app social in crescita, ci si arriva velocemente.

Il workaround: usare Realtime solo per gli aggiornamenti live critici (nuovi post, badge di notifica) e fare polling per i dati meno time-sensitive. Abbiamo implementato un ibrido — Realtime per nuovi post e notifiche, polling a 30 secondi per i contatori di like/commenti sui post più vecchi di 2 minuti.

Inoltre: la sintassi dei filtri di Supabase Realtime è limitata. I join complessi su più tabelle non sono supportati nel filtro di abbonamento — ci si abbona a una tabella e si filtra lato client se necessario.

## La Decisione

Siamo andati con Supabase Realtime. Il modello dati nativo di Postgres e gli abbonamenti granulari valevano di più per noi rispetto alla scalabilità delle connessioni di Firebase in questa fase. Quando raggiungeremo il limite di connessioni, faremo sharding per segmento di feed o sposteremo i percorsi real-time critici su un server WebSocket dedicato.

La vera risposta a "quale scala meglio" è: nessuno dei due, a vera scala. Entrambi richiedono modifiche architetturali quando si raggiungono decine di migliaia di connessioni concorrenti. Ma per un'app social a scala di lancio (sotto i 5.000 DAU), Supabase Realtime con una strategia di polling ibrida la gestisce in modo pulito senza i mal di testa della modellazione dei dati.
    `,
    content_sq: `
## Konteksti

Kur filluam të ndërtojmë feed-in social të Spindare, vendimi arkitekturor mbi të cilin kalova më shumë kohë ishte të dhënat në kohë reale. Një feed social jeton ose vdes nga latencia. Nëse një përdorues poston një sfidë dhe miqtë e tij e shohin 30 sekonda më vonë, ai nuk është feed social — është email.

Vlerësova Firebase Realtime Database dhe Supabase Realtime gjatë rreth dy javësh. Ja çfarë gjeta.

## Konfigurimi i testit

Ndërtova të njëjtin feed bazë në të dyja — një listë postimesh, secila me numëratorë like-sh, numëratorë komentesh dhe timestamp. Postimet e reja duhet të shfaqen në krye në kohë reale. Numëratorët e like-ve duhet të përditësohen live.

Ngarkesë e simuluar: 500 lidhje WebSocket njëkohëse, secila e abonuar në të njëjtin channel feed, me 50 shkrime në sekondë (mix i postimeve të reja dhe përditësimeve të like-ve).

E ekzekutova nga një droplet DigitalOcean $5 duke përdorur \`k6\` për gjenerimin e ngarkesës.

## Firebase: Çfarë më surprizoi

Firebase Realtime Database i menaxhoi lidhjet WebSocket me lehtësi. Latencia e lidhjes ishte e ulët dhe logjika e rilidhjeve automatike të SDK-së ishte solide. Nën 500 lidhje njëkohëse, shkrimet u propaguan konsistentisht në nën 200ms.

Ku dështoi: **modelimi i të dhënave**.

Modeli i dokumenteve të Firebase më detyroi të denormalizoj agresivisht. Për të shfaqur një postim me informacionin e autorit, numëratorin e like-ve dhe atë të komenteve në kohë reale, përfundova me një strukturë ku përditësimet e ndonjërit prej këtyre tre gjërave shkaktonin ri-render të gjithë objektit postimit. Me 50 shkrime/sek me 500 dëgjues, kjo janë 25.000 callbacks ngjarjesh në sekondë nga ana e klientit.

SDK-ja i grumbullon këto, por rezultati ishte hezitim i dukshëm gjatë scroll-it të feed-it sa herë që ndodhnin stuhi like-sh.

Firestore e trajtonte këtë më mirë me modelin e tij granular të përditësimit në nivel fushe, por çmimet e Firestore-it në kohë reale në shkallë të mëdha bëhen shumë shpejt të frikshme.

## Supabase Realtime: Çfarë funksionoi

Supabase Realtime përdor replikimin logjik të Postgres nën kapak, që do të thotë se po abonohesh tek ndryshimet aktuale të bazës së të dhënave — në nivel rreshti, nivel kolone nëse dëshiron. Kjo përputhet shumë më mirë me modelin aktual të të dhënave të një feed-i social.

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

Abonimet granulare nënkuptonin se përditësimet e numëratorëve të like-ve shkaktonin ri-render vetëm për postimin specifik që po merkte like, jo për të gjithë feed-in. Nën të njëjtën ngarkesë, feed-i mbeti i rrjedhshëm.

## Ku Supabase ka mangësi

Limitet e lidhjeve. Nivelja falas e Supabase kufizon lidhjet njëkohëse Realtime në 200. Plani Pro e ngre këtë në 500. Për një aplikacion social në rritje, do të arrihen shpejt.

Zgjidhja: të përdoret Realtime vetëm për përditësimet live kritike (postime të reja, shenjues njoftimesh) dhe të bëhet polling për të dhënat më pak time-sensitive. Ne implementuam një hibrid — Realtime për postime të reja dhe njoftime, polling 30-sekondshe për numëratorët e like/koment në postimet më të vjetra se 2 minuta.

Gjithashtu: sintaksa e filtrave të Supabase Realtime është e kufizuar. Join-ët komplekse në shumë tabela nuk mbështeten në filtrat e abonimit — abonohesh tek një tabelë dhe filtron nga ana e klientit nëse nevojitet.

## Vendimi

Zgjodhëm Supabase Realtime. Modeli i të dhënave nativ i Postgres dhe abonimet granulare kishin vlerë më të madhe për ne sesa shkallëzueshmëria e lidhjeve të Firebase-it në këtë fazë. Kur arrijmë kufirin e lidhjeve, do të shardojmë sipas segmentit të feed-it ose do të zhvendosim rrugët kritike në kohë reale në një server WebSocket të dedikuar.

Përgjigjja e vërtetë ndaj "cili shkallëzohet" është: asnjëri, në shkallë të vërtetë. Të dy kërkojnë ndryshime arkitekturore kur arrin dhjetëra mijëra lidhje njëkohëse. Por për një aplikacion social në shkallë lansimi (nën 5.000 DAU), Supabase Realtime me një strategji hibride polling e menaxhon qartë pa dhimbjet e kokës të modelimit të të dhënave.
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
    content_de: `
## Warum wir ein Design System brauchten

Spindare hatte 100 Komponenten, bevor wir ein formales System hatten. Alles funktionierte, aber eine neue Seite zu öffnen und zu versuchen, die Farbe eines Buttons von einer Seite zu finden, die zwei Monate zuvor gebaut wurde, bedeutete: Dateien durchsuchen, Hex-Werte kopieren und hoffen, dass nichts abweicht.

Bei 200 Komponenten war die Abweichung sichtbar. Leicht unterschiedliche Border Radii, subtil inkonsistente Abstände zwischen interaktiven Elementen, drei verschiedene Grautöne, die alle dasselbe sein sollten. Auf einem Telefonbildschirm sind diese Details wichtig.

Bei 300 Komponenten über drei Entwickler (ich, mein Onkel und Daniel) war ein Design System keine Option mehr. Es war entweder eine Woche investieren und eines bauen oder Monate damit verbringen, visuelle Inkonsistenzen einzeln zu beheben.

## Die Token-Ebene

Wir begannen von unten: Design Tokens. Jede visuelle Konstante kommt hier an, bevor sie irgendwo anders hingeht.

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

Das \`as const\` ist wichtig — es gibt TypeScript Literal-Typen, sodass man Autovervollständigung und Typfehler bekommt, wenn man ein Token verwendet, das nicht existiert.

## Die Komponentenebene

Auf Basis der Tokens bauten wir eine Reihe primitiver Komponenten, aus denen alle anderen Komponenten zusammengesetzt werden. Die wichtigsten:

**\`<Box />\`** — im Grunde ein \`View\`, aber es akzeptiert Spacing/Color-Tokens als Props:

\`\`\`tsx
<Box px="lg" py="md" bg="secondary" radius="md">
  {children}
</Box>
\`\`\`

**\`<Text />\`** — eine typisierte Text-Komponente mit vordefinierten Varianten:

\`\`\`tsx
<Text variant="heading" size="xl">Post title</Text>
<Text variant="body" color="secondary">Post content</Text>
<Text variant="label" color="muted">3 min ago</Text>
\`\`\`

**\`<Pressable />\`** — kapselt Reacts Native Pressable mit eingebautem Standard-Feedback-Stilen, Haptics und Behandlung von deaktivierten Zuständen.

Jede andere Komponente in der App wird aus diesen drei Primitiven aufgebaut. Wenn wir global ändern möchten, wie deaktivierte Zustände aussehen, ändern wir es in \`<Pressable />\` und es verbreitet sich überall.

## Konsistenz gewährleisten: Die Regeln

Regeln, die uns die meiste Zeit gespart haben:

**1. Keine rohen Hex-Werte außerhalb von Tokens.** Wenn man eine Farbe braucht, die nicht in der Token-Datei ist, zuerst dort eintragen. Niemals \`#F5A623\` in einer Komponenten-Datei schreiben.

**2. Kein \`StyleSheet.create\` für einmalige Stile.** Wenn ein Stil einmal verwendet wird und mit Tokens über Box/Text ausgedrückt werden kann, das tun. \`StyleSheet.create\` ist nur für wiederverwendbare, benannte Stile.

**3. Jede neue Komponente bekommt eine Storybook-Story.** Wir verwenden Storybook für React Native, um Komponenten isoliert zu betrachten. Das hat wahrscheinlich 30% der Design-Bugs gefangen, bevor sie je einen echten Bildschirm erreichten.

**4. Abstände nur aus der Skala.** Kein \`marginTop: 13\`. Wenn 12 oder 16 nicht funktioniert, muss das Layout sich ändern, nicht der Abstandswert.

## Was uns die meiste Zeit gespart hat

Ehrlich gesagt: die \`Text\`-Komponentenvarianten. Typografie-Inkonsistenz war unser größtes Problem vor dem System. Ein festes Set von Varianten (\`heading\`, \`subheading\`, \`body\`, \`label\`, \`caption\`, \`mono\`) zu haben und durchzusetzen, dass alles diese verwendet, bedeutete, dass wir aufhörten, "nah genug" Schriftgrößen im Code zu haben.

Der zweitgrößte Gewinn: die Token-Datei als Quelle der Wahrheit für den Dark Mode. Da alles Tokens referenziert, war das Hinzufügen eines zweiten Themes nur das Hinzufügen eines zweiten Sets von Token-Werten und eines Context-Switches. Kein Suchen durch Komponenten nach hartcodierten Farben.

## Was wir anders machen würden

Früher anfangen. Wir bauten das Design System bei Komponente 200. Von Komponente 1 an zu starten hätte viel nachträgliche Arbeit beim Umstellen alter Komponenten auf Tokens gespart. Selbst eine minimale Token-Datei und zwei primitive Komponenten von Beginn an ist unendlich besser als sie nachträglich hinzuzufügen.
    `,
    content_it: `
## Perché ne avevamo bisogno

Spindare aveva 100 componenti prima di avere un sistema formale. Tutto funzionava, ma aprire una nuova schermata e cercare di abbinare il colore di un pulsante da una schermata costruita due mesi prima significava frugare tra i file, copiare valori hex e sperare che nulla si fosse discostato.

A 200 componenti, la deriva era visibile. Border radius leggermente diversi, spaziatura inconsistente tra elementi interattivi, tre sfumature diverse di "grigio" che avrebbero dovuto essere tutte uguali. Su uno schermo di telefono, questi dettagli contano.

A 300 componenti distribuiti tra tre sviluppatori (io, mio zio e Daniel), un design system non era più opzionale. Era o investire una settimana per costruirne uno o trascorrere mesi a correggere le inconsistenze visive una per una.

## Il livello dei token

Abbiamo iniziato dal basso: i design token. Ogni costante visiva va qui prima di andare da qualsiasi altra parte.

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

Il \`as const\` è importante — dà a TypeScript tipi letterali così si ottiene autocompletamento e errori di tipo se si usa un token che non esiste.

## Il livello dei componenti

Sopra ai token, abbiamo costruito un set di componenti primitivi da cui tutti gli altri componenti si compongono. I più importanti:

**\`<Box />\`** — fondamentalmente una \`View\` ma accetta token di spaziatura/colore come props:

\`\`\`tsx
<Box px="lg" py="md" bg="secondary" radius="md">
  {children}
</Box>
\`\`\`

**\`<Text />\`** — un componente di testo tipizzato con varianti predefinite:

\`\`\`tsx
<Text variant="heading" size="xl">Post title</Text>
<Text variant="body" color="secondary">Post content</Text>
<Text variant="label" color="muted">3 min ago</Text>
\`\`\`

**\`<Pressable />\`** — racchiude Pressable di React Native con stili di feedback standard, haptics e gestione degli stati disabilitati integrata.

Ogni altro componente nell'app è costruito da questi tre primitivi. Quando vogliamo aggiornare globalmente l'aspetto degli stati disabilitati, lo cambiamo in \`<Pressable />\` e si propaga ovunque.

## Mantenere la coerenza: Le regole

Regole che ci hanno fatto risparmiare il maggior tempo:

**1. Nessun valore hex grezzo al di fuori dei token.** Se hai bisogno di un colore che non è nel file dei token, aggiungilo lì prima. Non scrivere mai \`#F5A623\` in un file componente.

**2. Nessun \`StyleSheet.create\` per stili una-tantum.** Se uno stile viene usato una volta e può essere espresso con token tramite Box/Text, fallo così. \`StyleSheet.create\` è solo per stili riutilizzabili e nominati.

**3. Ogni nuovo componente riceve una storia Storybook.** Usiamo Storybook per React Native per anteprima dei componenti in isolamento. Questo ha intercettato probabilmente il 30% dei bug di design prima che raggiungessero una schermata reale.

**4. Spaziatura solo dalla scala.** Nessun \`marginTop: 13\`. Se 12 o 16 non funziona, il layout deve cambiare, non il valore di spaziatura.

## Cosa ci ha salvato di più

Onestamente: le varianti del componente \`Text\`. L'inconsistenza tipografica era il nostro problema più grande prima del sistema. Avere un set fisso di varianti (\`heading\`, \`subheading\`, \`body\`, \`label\`, \`caption\`, \`mono\`) e imporre che tutto le utilizzi significava che abbiamo smesso di avere dimensioni di font "abbastanza vicine" sparse nel codebase.

Il secondo guadagno più grande: il file dei token come source of truth per la dark mode. Poiché tutto riferisce ai token, aggiungere un secondo tema significava solo aggiungere un secondo set di valori token e un context switch. Nessuna caccia nei componenti per colori hardcoded.

## Cosa faremmo diversamente

Iniziare prima. Abbiamo costruito il design system al componente 200. Iniziare dal componente 1 avrebbe risparmiato molto lavoro retroattivo di conversione dei vecchi componenti ai token. Anche un file token minimale e due componenti primitivi fin dal primo giorno è infinitamente meglio che aggiungerli in seguito.
    `,
    content_sq: `
## Pse kishim nevojë për një sistem dizajni

Spindare kishte 100 komponentë para se të kishim ndonjë sistem formal. Gjithçka funksiononte, por hapja e një ekrani të ri dhe përpjekja për të përputhur ngjyrën e një butoni nga një ekran i ndërtuar dy muaj më parë nënkuptonte gërmim në skedarë, kopjim vlerash hex dhe shpresë se asgjë nuk kishte larguar.

Në 200 komponentë, largimi ishte i dukshëm. Rreze kufiri pak të ndryshme, hapësira jokonsistente midis elementeve ndërvepruese, tre hije të ndryshme të "grisë" që duhej të ishin të njëjtat. Në ekranin e telefonit, këto detaje kanë rëndësi.

Në 300 komponentë nëpër tre zhvillues (unë, xhaxhai im dhe Daniel), një sistem dizajni nuk ishte opsional. Ishte ose të investosh një javë për të ndërtuar një ose të kalosh muaj duke rregulluar gjëra jokonsistente vizualisht një nga një.

## Shtresa e tokenëve

Filluam nga fundi: tokenët e dizajnit. Çdo konstantë vizuale shkon këtu para se të shkojë diku tjetër.

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

\`as const\` është e rëndësishme — i jep TypeScript-it tipet literale kështu që fiton plotësim automatik dhe gabime tipesh nëse përdor një token që nuk ekziston.

## Shtresa e komponentëve

Mbi tokenët, ndërtuam një set komponentësh primitivë nga të cilët komponohen të gjithë komponentët e tjerë. Më të rëndësishmit:

**\`<Box />\`** — në thelb një \`View\` por pranon tokenë hapësire/ngjyre si props:

\`\`\`tsx
<Box px="lg" py="md" bg="secondary" radius="md">
  {children}
</Box>
\`\`\`

**\`<Text />\`** — një komponent teksti i tipizuar me variante të paracaktuara:

\`\`\`tsx
<Text variant="heading" size="xl">Post title</Text>
<Text variant="body" color="secondary">Post content</Text>
<Text variant="label" color="muted">3 min ago</Text>
\`\`\`

**\`<Pressable />\`** — mbështet Pressable-in e React Native me stile feedback standarde, haptics dhe trajtim i gjendjeve të çaktivizuara të integruara.

Çdo komponent tjetër në aplikacion është ndërtuar nga këta tre primitivë. Kur duam të përditësojmë globalisht se si duken gjendjet e çaktivizuara, e ndryshojmë në \`<Pressable />\` dhe propagohet kudo.

## Ruajtja e qëndrueshmërisë: Rregullat

Rregullat që na kanë kursyer më shumë kohë:

**1. Asnjë vlerë hex e papërpunuar jashtë tokenëve.** Nëse keni nevojë për një ngjyrë që nuk është në skedarin e tokenëve, shtojeni atje fillimisht. Mos shkruaj kurrë \`#F5A623\` në një skedar komponenti.

**2. Asnjë \`StyleSheet.create\` për stile të njëhershme.** Nëse një stil përdoret njëherë dhe mund të shprehet me tokenë nëpërmjet Box/Text, bëje kështu. \`StyleSheet.create\` është vetëm për stile të ripërdorshme dhe të emërtuara.

**3. Çdo komponent i ri merr një histori Storybook.** Përdorim Storybook për React Native për të shikuar komponentët në izolim. Kjo kapi rreth 30% të defekteve të dizajnit para se të arrinin ndonjëherë në ekranin real.

**4. Hapësira vetëm nga shkalla.** Asnjë \`marginTop: 13\`. Nëse 12 ose 16 nuk funksionon, paraqitja duhet të ndryshojë, jo vlera e hapësirës.

## Çfarë na shpëtoi më shumë

Sinqerisht: variantet e komponentit \`Text\`. Jokonsistenca tipografike ishte problemi ynë më i madh para sistemit. Të kesh një set fiks variantesh (\`heading\`, \`subheading\`, \`body\`, \`label\`, \`caption\`, \`mono\`) dhe të imponosh që gjithçka i përdor ato nënkuptonte se ndaluam të kishim madhësi fontesh "mjaft afër" të shpërndara në codebase.

Fitorja e dytë më e madhe: skedari i tokenëve si burim i vetëm i vërtetës për modalitetin e errët. Meqenëse gjithçka i referohet tokenëve, shtimi i një teme të dytë ishte thjesht shtimi i një seti të dytë vlerash tokenësh dhe ndërrimi i kontekstit. Asnjë gjueti nëpër komponentë për ngjyra të koduara ngushtë.

## Çfarë do të bënim ndryshe

Të fillonim më herët. Ne ndërtuam sistemin e dizajnit në komponentin 200. Fillimi nga komponenti 1 do të kishte kursyer shumë punë retroaktive të konvertimit të komponentëve të vjetër në tokenë. Edhe një skedar minimal tokenësh dhe dy komponentë primitivë që nga dita e parë është pafundësisht më mirë se t'i shtosh ato më vonë.
    `,
  },
];

export function getPost(slug: string, lang: BlogLang = "en"): BlogPost | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return undefined;
  const content =
    lang === "de" ? (post.content_de ?? post.content) :
    lang === "it" ? (post.content_it ?? post.content) :
    lang === "sq" ? (post.content_sq ?? post.content) :
    post.content;
  return { ...post, content };
}
