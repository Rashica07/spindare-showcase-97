export const dynamic = "force-static";

const SECTIONS = [
  {
    id: "identity",
    label: "01 / IDENTITY",
    content: [
      { key: "Name", val: "Kristian" },
      { key: "Brand", val: "KIQA DEV" },
      { key: "Role", val: "Full-Stack Mobile Developer" },
      { key: "Location", val: "Kosovo / Italy" },
      { key: "Stack", val: "React Native, Next.js, TypeScript, Supabase, Clerk, Tailwind, Framer Motion, Three.js" },
      { key: "Languages spoken", val: "Albanian, Italian, English, German" },
      { key: "Contact", val: "contact@kiqa-dev.it" },
      { key: "GitHub", val: "github.com/rashica07" },
      { key: "Status", val: "Open to freelance contracts" },
    ],
  },
  {
    id: "about",
    label: "02 / ABOUT",
    paragraphs: [
      "I build production mobile apps that ship on time and stay maintainable after launch. My focus is the full stack from database schema to UI animation — the parts that most contractors split between two or three people.",
      "I've shipped Spindare, a social fitness app with real-time feeds, live reaction counts, subscription management, and OAuth authentication. I'm currently building TravelMe, an AI-powered trip planner that generates complete itineraries from a single message.",
      "My background spans React Native, backend with Supabase and PostgreSQL, and frontend polish with Next.js and Framer Motion. I write clean TypeScript, design with tokens, and document decisions so future maintainers don't have to guess.",
      "I work with small teams and solo founders who need someone who can own a feature end-to-end without constant supervision. I take on fixed-price projects and communicate clearly when scope changes.",
    ],
  },
  {
    id: "values",
    label: "03 / WORKING PRINCIPLES",
    items: [
      { title: "Quality over cleverness", desc: "Clean, understandable code is better than impressive code. I build things that are easy to maintain and extend." },
      { title: "Real delivery", desc: "Once I take a project, I finish it. No ghosting, no handoffs mid-way through." },
      { title: "Direct communication", desc: "I surface problems early. If something changes the scope or timeline, I say so before it becomes a surprise." },
      { title: "Detail where it matters", desc: "Animations, transitions, and edge cases. The polish that separates good apps from great ones." },
    ],
  },
  {
    id: "services",
    label: "04 / SERVICES",
    items: [
      { title: "React Native App Development", desc: "Full-stack mobile app from zero to App Store. Includes auth, database, real-time features, push notifications, and submission." },
      { title: "App Redesign & Refactor", desc: "Take an existing app and improve performance, code quality, or design. Component library setup, design system, or architectural overhaul." },
      { title: "Supabase / Backend Integration", desc: "Database design, row-level security, real-time subscriptions, Edge Functions, and Supabase + Clerk integration." },
      { title: "Next.js Web App", desc: "Marketing site or full product. Static generation, server components, API routes, and performance optimisation." },
    ],
  },
  {
    id: "projects",
    label: "05 / PROJECTS",
    projects: [
      {
        name: "Spindare",
        tagline: "Social fitness app — production, 2025–2026",
        description: "Full social platform built with React Native and Expo. Real-time social feed with video previews, like animations, and live comment counts. Supabase backend with PostgreSQL triggers for live counters. Clerk authentication with Google and Apple OAuth. Custom design system covering 200+ screens. Subscription management via in-app purchase. iOS and Android.",
        tech: ["React Native", "Expo", "Supabase", "Clerk", "PostgreSQL", "TypeScript", "Reanimated 3", "React Query"],
        highlights: [
          "Fixed FlatList memory leak growing +120MB/session — traced to 47 concurrent Supabase subscriptions for 5 visible posts",
          "Rebuilt auth from scratch in 48h after race condition between 3 token-refresh locations",
          "Chose Supabase over Firebase after 500-user concurrency test: 120ms p50 latency, fan-out-free architecture",
          "14 primitive components, 31 composites, token-first design system",
        ],
      },
      {
        name: "TravelMe",
        tagline: "AI travel planner — in development, 2026",
        description: "One-message trip planning powered by OpenAI. Send a single natural language message and receive a complete itinerary with flights, hotels, restaurants, and day-by-day schedule. Built with React Native and Next.js backend. LLM orchestration with function calling for structured output.",
        tech: ["React Native", "Expo", "Next.js", "OpenAI", "Supabase", "TypeScript"],
        highlights: [
          "Single-message UX — no multi-step forms, no dropdown menus",
          "Structured output from LLM function calling for reliable itinerary parsing",
          "Tested GPT-4o, Claude Sonnet, Gemini Pro, and Mistral for trip planning quality",
        ],
      },
    ],
  },
  {
    id: "stats",
    label: "06 / NUMBERS",
    items: [
      { key: "Screens built", val: "200+" },
      { key: "Projects shipped", val: "4+" },
      { key: "Lines of TypeScript written", val: "~50k" },
      { key: "App Store submissions", val: "2" },
      { key: "Hours lost to Expo SDK upgrades", val: "Many" },
    ],
  },
  {
    id: "blog",
    label: "07 / BLOG — TECHNICAL ARTICLES",
    posts: [
      {
        slug: "flatlist-memory-leak",
        title: "How I fixed a memory leak that was crashing Spindare's social feed",
        category: "React Native",
        date: "Mar 28, 2026",
        readMin: 7,
        summary: "The feed was slowing to a halt after a few minutes. The root cause: 47 active Supabase subscriptions for a feed showing 5 posts, caused by FlatList virtualisation firing useEffect cleanup late during fast scrolling. Fixed with a reference-counted subscription manager at feed level.",
        url: "/blog/flatlist-memory-leak",
      },
      {
        slug: "auth-flow-48-hours",
        title: "Why I rebuilt Spindare's login system in 48 hours — and don't regret it",
        category: "Architecture",
        date: "Mar 14, 2026",
        readMin: 9,
        summary: "Token refresh logic spread across 3 locations caused a race condition: two simultaneous refreshes would overwrite each other, logging users out. Rebuilt with Clerk in 48 hours. 200 accounts migrated on day two. More stable than 3 months of custom auth.",
        url: "/blog/auth-flow-48-hours",
      },
      {
        slug: "supabase-vs-firebase",
        title: "Supabase vs Firebase for a social feed: what I found after testing both",
        category: "Backend",
        date: "Feb 22, 2026",
        readMin: 11,
        summary: "Tested both at 10–500 simulated concurrent users. Supabase: 120ms p50, 280ms p99, >98% delivery at 500 connections. Firebase Realtime Database comparable, but Firestore with relational data required fan-out functions that duplicated business logic. Chose Supabase for the normalised data model fit.",
        url: "/blog/supabase-vs-firebase",
      },
      {
        slug: "react-native-design-system",
        title: "How we built a design system for a mobile app with hundreds of screens",
        category: "Design",
        date: "Feb 8, 2026",
        readMin: 8,
        summary: "At 80 screens, the same button existed in 4 versions. Built a token-first system: colours, spacing, typography, border radii agreed before any component. 14 primitives, 31 composites. New screens take 40% less time. Key lesson: extract components from real screens top-down, not bottom-up from atoms.",
        url: "/blog/react-native-design-system",
      },
      {
        slug: "travelme-ai-architecture",
        title: "Building an AI trip planner: the architecture decisions behind TravelMe",
        category: "AI",
        date: "Coming soon",
        readMin: 8,
        summary: "The architecture behind TravelMe — how one message becomes a full itinerary. Coming soon.",
        url: "/blog/travelme-ai-architecture",
      },
      {
        slug: "travelme-single-message-ux",
        title: "One message. One trip. Designing TravelMe's core UX from scratch",
        category: "Design",
        date: "Coming soon",
        readMin: 6,
        summary: "How the single-message travel interaction was designed. Coming soon.",
        url: "/blog/travelme-single-message-ux",
      },
      {
        slug: "travelme-llm-comparison",
        title: "Why I chose OpenAI for TravelMe — and what almost changed my mind",
        category: "AI",
        date: "Coming soon",
        readMin: 7,
        summary: "Testing GPT-4o, Claude, Gemini, and Mistral for structured trip planning output. Coming soon.",
        url: "/blog/travelme-llm-comparison",
      },
    ],
  },
  {
    id: "contact",
    label: "08 / CONTACT",
    content: [
      { key: "Email", val: "contact@kiqa-dev.it" },
      { key: "Discord", val: "@kodibkfg" },
      { key: "GitHub", val: "github.com/rashica07" },
      { key: "Location", val: "Kosovo / Italy" },
      { key: "Response time", val: "Within 24 hours" },
    ],
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kristian",
  alternateName: "KIQA DEV",
  url: "https://kiqa-dev.it",
  email: "contact@kiqa-dev.it",
  jobTitle: "Full-Stack Mobile Developer",
  knowsAbout: ["React Native", "TypeScript", "Supabase", "Clerk", "Next.js", "Mobile App Development"],
  sameAs: ["https://github.com/rashica07"],
  address: { "@type": "PostalAddress", addressCountry: ["Kosovo", "IT"] },
};

export default function LLMPage() {
  return (
    <div style={{ margin: 0, padding: 0, minHeight: "100vh", backgroundColor: "#0d0d0d", color: "#e8e8e8", fontFamily: "'DM Mono', 'Courier New', monospace", position: "relative", zIndex: 9999 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 32px 80px" }}>

        {/* Header */}
        <header style={{ borderBottom: "1px solid #2a2a2a", paddingBottom: 32, marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#FF6B2B" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#FF6B2B", textTransform: "uppercase" }}>KIQA DEV · AI-READABLE VERSION</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#ffffff", margin: 0, lineHeight: 1.2 }}>
            Kristian — Full-Stack Mobile Developer
          </h1>
          <p style={{ margin: "12px 0 0", fontSize: 14, color: "#888", lineHeight: 1.7 }}>
            This page contains the complete content of the KIQA DEV portfolio in static HTML,
            optimised for AI crawlers, language models, and search engines.
            Human-facing site: <a href="/" style={{ color: "#FF6B2B", textDecoration: "none" }}>kiqa-dev.it</a> ·
            Content index: <a href="/llms.txt" style={{ color: "#FF6B2B", textDecoration: "none" }}>llms.txt</a>
          </p>
        </header>

        {/* Identity */}
        <section aria-label="Identity" style={{ marginBottom: 56 }}>
          <SectionLabel>{SECTIONS[0].label}</SectionLabel>
          <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "160px 1fr", rowGap: 10 }}>
            {SECTIONS[0].content!.map(({ key, val }) => (
              <>
                <dt key={`dt-${key}`} style={{ fontSize: 12, color: "#666", letterSpacing: "0.05em", paddingTop: 1 }}>{key}</dt>
                <dd key={`dd-${key}`} style={{ fontSize: 14, color: "#e0e0e0", margin: 0 }}>{val}</dd>
              </>
            ))}
          </dl>
        </section>

        {/* About */}
        <section aria-label="About" style={{ marginBottom: 56 }}>
          <SectionLabel>{SECTIONS[1].label}</SectionLabel>
          {SECTIONS[1].paragraphs!.map((p, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: 1.85, color: "#c8c8c8", margin: "0 0 18px" }}>{p}</p>
          ))}
        </section>

        {/* Working Principles */}
        <section aria-label="Working Principles" style={{ marginBottom: 56 }}>
          <SectionLabel>{SECTIONS[2].label}</SectionLabel>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {SECTIONS[2].items!.map((item) => (
              <li key={item.title} style={{ borderLeft: "2px solid #2a2a2a", paddingLeft: 16 }}>
                <div style={{ fontSize: 13, color: "#FF6B2B", fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.7 }}>{item.desc}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* Services */}
        <section aria-label="Services" style={{ marginBottom: 56 }}>
          <SectionLabel>{SECTIONS[3].label}</SectionLabel>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {SECTIONS[3].items!.map((item) => (
              <li key={item.title} style={{ padding: "16px 20px", border: "1px solid #1e1e1e", borderRadius: 8, backgroundColor: "#111" }}>
                <div style={{ fontSize: 13, color: "#ffffff", fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{item.desc}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section aria-label="Projects" style={{ marginBottom: 56 }}>
          <SectionLabel>{SECTIONS[4].label}</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {SECTIONS[4].projects!.map((proj) => (
              <article key={proj.name} style={{ padding: "24px", border: "1px solid #1e1e1e", borderRadius: 8, backgroundColor: "#111" }}>
                <h2 style={{ fontSize: 18, color: "#ffffff", margin: "0 0 4px", fontWeight: 700 }}>{proj.name}</h2>
                <div style={{ fontSize: 11, color: "#FF6B2B", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{proj.tagline}</div>
                <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.8, margin: "0 0 16px" }}>{proj.description}</p>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Tech Stack</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {proj.tech.map((t) => (
                      <span key={t} style={{ fontSize: 11, padding: "3px 8px", border: "1px solid #2a2a2a", borderRadius: 4, color: "#888" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Key Technical Decisions</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                    {proj.highlights.map((h) => (
                      <li key={h} style={{ fontSize: 12, color: "#888", paddingLeft: 14, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: "#FF6B2B" }}>›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section aria-label="Stats" style={{ marginBottom: 56 }}>
          <SectionLabel>{SECTIONS[5].label}</SectionLabel>
          <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "200px 1fr", rowGap: 10 }}>
            {SECTIONS[5].items!.map((item) => (
              <>
                <dt key={`dt-${item.key}`} style={{ fontSize: 12, color: "#666", letterSpacing: "0.05em", paddingTop: 1 }}>{item.key}</dt>
                <dd key={`dd-${item.key}`} style={{ fontSize: 14, color: "#e0e0e0", margin: 0 }}>{item.val}</dd>
              </>
            ))}
          </dl>
        </section>

        {/* Blog */}
        <section aria-label="Blog articles" style={{ marginBottom: 56 }}>
          <SectionLabel>{SECTIONS[6].label}</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {SECTIONS[6].posts!.map((post) => (
              <article key={post.slug} style={{ padding: "20px", border: "1px solid #1e1e1e", borderRadius: 8, backgroundColor: "#111" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF6B2B", padding: "2px 7px", border: "1px solid rgba(255,107,43,0.3)", borderRadius: 10 }}>{post.category}</span>
                  <span style={{ fontSize: 11, color: "#555" }}>{post.date}</span>
                  <span style={{ fontSize: 11, color: "#555" }}>{post.readMin} min</span>
                </div>
                <h3 style={{ fontSize: 15, color: "#ffffff", margin: "0 0 8px", fontWeight: 600, lineHeight: 1.4 }}>
                  <a href={post.url} style={{ color: "inherit", textDecoration: "none" }}>{post.title}</a>
                </h3>
                <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.7 }}>{post.summary}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section aria-label="Contact" style={{ marginBottom: 40 }}>
          <SectionLabel>{SECTIONS[7].label}</SectionLabel>
          <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "160px 1fr", rowGap: 10 }}>
            {SECTIONS[7].content!.map(({ key, val }) => (
              <>
                <dt key={`dt-${key}`} style={{ fontSize: 12, color: "#666", letterSpacing: "0.05em", paddingTop: 1 }}>{key}</dt>
                <dd key={`dd-${key}`} style={{ fontSize: 14, color: "#e0e0e0", margin: 0 }}>{val}</dd>
              </>
            ))}
          </dl>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid #1e1e1e", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 11, color: "#444" }}>© 2026 KIQA DEV. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="/" style={{ fontSize: 11, color: "#555", textDecoration: "none" }}>Portfolio</a>
            <a href="/llms.txt" style={{ fontSize: 11, color: "#555", textDecoration: "none" }}>llms.txt</a>
            <a href="/robots.txt" style={{ fontSize: 11, color: "#555", textDecoration: "none" }}>robots.txt</a>
          </div>
        </footer>

      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#FF6B2B", textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
      {children}
      <div style={{ flex: 1, height: 1, backgroundColor: "#1e1e1e" }} />
    </div>
  );
}
