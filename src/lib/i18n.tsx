"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "de" | "it" | "sq";

const en = {
  nav: {
    home: "Home", services: "Services", portfolio: "Portfolio",
    blog: "Blog", about: "About", contact: "Contact", quote: "Get a Quote",
  },
  home: {
    hero: {
      badge: "Professional Development Services",
      h1: "KIQA", h2: "DEV.",
      sub: "Full-stack developer from Kosovo. I build mobile apps and web platforms that ship — fast, clean, and built to last.",
      cta1: "View Services", cta2: "See Portfolio",
    },
    services: {
      label: "What We Build",
      title: "End-to-end development",
      sub: "From concept to App Store. One developer, full ownership.",
      items: [
        { name: "Mobile Apps", desc: "Native iOS & Android apps with React Native. Built to ship." },
        { name: "Web Platforms", desc: "Scalable web apps with Next.js and TypeScript." },
        { name: "UI/UX Design", desc: "Minimal, functional interfaces. Every pixel deliberate." },
        { name: "Backend & APIs", desc: "Supabase, Node.js, PostgreSQL. Fast, secure, scalable." },
      ],
    },
    featured: { label: "Selected Work", title: "Projects" },
    stats: {
      label: "By the numbers",
      items: [
        { value: "150k+", label: "Lines of code" },
        { value: "2", label: "Active projects" },
        { value: "3+", label: "Years building" },
        { value: "4", label: "Languages spoken" },
      ],
    },
    cta: {
      title: "Ready to build something?",
      sub: "Tell me about your project and let's make it real.",
      button: "Start a conversation",
    },
    testimonials: {
      label: "Testimonials",
      title: "What people say",
      items: [
        {
          quote: "Kristian delivered our landing page in under a week. Clean code, zero revisions, and he communicated clearly throughout. Rare for any developer, let alone one this young.",
          name: "Marco V.",
          role: "Startup founder",
          location: "Milan, Italy",
        },
        {
          quote: "Working with Kiqa on the Spindare codebase has been impressive. He architects things properly from the start — the kind of discipline that usually takes years to develop.",
          name: "Biba W.",
          role: "Co-founder, Spindare",
          location: "Kosovo",
        },
        {
          quote: "He built a full booking and payments flow for my business in two weeks. Stripe integration, email notifications, everything. Agencies I've worked with couldn't match this.",
          name: "Luca R.",
          role: "Business owner",
          location: "Lecco, Italy",
        },
      ],
    },
  },
  services: {
    hero: {
      label: "Services",
      title: "What I offer",
      sub: "Professional development services for startups, businesses, and founders who need things done right.",
    },
    items: [
      {
        name: "Mobile App Development",
        desc: "React Native apps for iOS and Android — from MVP to App Store. I handle everything: architecture, UI, APIs, deployment.",
        features: ["React Native & Expo", "iOS & Android", "App Store & Play Store submission", "Push notifications", "Offline-first support", "Performance optimization"],
      },
      {
        name: "Web Development",
        desc: "Fast, modern web applications built with Next.js and TypeScript. SEO-ready, server-side rendered, production-grade.",
        features: ["Next.js 15+", "TypeScript", "SEO & Core Web Vitals", "Server-side rendering", "Responsive design", "CMS integration"],
      },
      {
        name: "UI/UX Design",
        desc: "Clean, minimal interfaces that convert. I design with Figma and build the components myself — no handoff friction.",
        features: ["Figma prototypes", "Design systems", "Component libraries", "Dark/light mode", "Accessibility (WCAG)", "Micro-interactions"],
      },
      {
        name: "Backend & APIs",
        desc: "Scalable backend systems. Auth, databases, storage, real-time — all set up properly from day one.",
        features: ["Supabase & PostgreSQL", "Node.js & REST APIs", "Authentication (Clerk, JWT)", "File storage (S3/B2)", "Real-time with websockets", "Cloud deployment"],
      },
      {
        name: "Technical Consulting",
        desc: "Architecture review, code audit, or just a second opinion on your stack. I'll tell you the truth.",
        features: ["Code audits", "Architecture planning", "Performance analysis", "Tech stack selection", "Security review", "Roadmap planning"],
      },
    ],
    process: {
      title: "How it works",
      steps: [
        { n: "01", title: "Discovery", desc: "We talk about your project, goals, and timeline. No commitment required." },
        { n: "02", title: "Proposal", desc: "I send a detailed scope, timeline, and fixed price. No surprises." },
        { n: "03", title: "Build", desc: "Regular updates, clean commits, and working builds throughout." },
        { n: "04", title: "Launch", desc: "Deployment, documentation, and support after go-live." },
      ],
    },
    cta: { title: "Start a project", sub: "Let's discuss what you're building.", button: "Get a free quote" },
  },
  portfolio: {
    hero: {
      label: "Portfolio",
      title: "Selected work",
      sub: "Projects I've built — professional, personal, and everything in between.",
    },
    filters: ["All", "Mobile", "Web"],
    status: { live: "Live", dev: "In Development", soon: "Coming Soon" },
    viewProject: "View Project", viewCode: "View Code", hire: "Hire me for this",
    projects: [
      {
        name: "Spindare",
        type: "Mobile",
        status: "dev",
        year: "2025–2026",
        desc: "Daily challenge social app. Spin a wheel, get a challenge from 200+ curated picks, share it with friends. TikTok-style feed meets real-world accountability.",
        detail: "UI/UX lead on a 3-person team. 300+ components, 150k+ lines of code. iOS launch September 2026.",
        stack: ["React Native", "TypeScript", "Supabase", "Clerk", "Expo"],
        link: "https://github.com/biba-work/spindare",
      },
      {
        name: "TravelMe",
        type: "Mobile",
        status: "soon",
        year: "2026",
        desc: "AI-powered travel planner. Describe your trip in plain language — flights, hotels, itinerary. No more switching between 10 apps.",
        detail: "Built solo. React Native + OpenAI API + Node.js backend.",
        stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"],
        link: "https://github.com/rashica07/booking-fallc",
      },
      {
        name: "KIQA DEV",
        type: "Web",
        status: "live",
        year: "2026",
        desc: "This professional portfolio and service site. Dark, minimal, fast. Built with Next.js and custom CSS — no Tailwind.",
        detail: "Geist Mono + DM Sans. 80px grid overlay. Framer Motion animations. Multilingual.",
        stack: ["Next.js", "TypeScript", "Framer Motion", "CSS"],
        link: "/",
      },
    ],
  },
  blog: {
    hero: {
      label: "Blog",
      title: "Writing",
      sub: "Thoughts on code, building products, and shipping fast.",
    },
    readMore: "Read post", minRead: "min read",
    categories: ["All", "React Native", "Architecture", "Backend", "Design"],
    posts: [
      {
        slug: "flatlist-memory-leak",
        category: "React Native",
        title: "How I fixed a memory leak in FlatList that was crashing Spindare's social feed",
        excerpt: "A real-time social feed with 1000+ posts was grinding to a halt. Here's how I tracked the leak and fixed it for good.",
        date: "Mar 28, 2026", read: 7,
      },
      {
        slug: "auth-flow-48-hours",
        category: "Architecture",
        title: "Why I rebuilt Spindare's authentication flow in 48 hours — and don't regret it",
        excerpt: "The old auth setup worked fine until it didn't. An honest breakdown of the decision, the rewrite, and what I'd do differently.",
        date: "Mar 14, 2026", read: 9,
      },
      {
        slug: "supabase-vs-firebase",
        category: "Backend",
        title: "Supabase Realtime vs Firebase for social feeds: what I found after stress-testing both",
        excerpt: "I needed a real-time feed for 10k+ concurrent users. Both promised it. Only one delivered.",
        date: "Feb 22, 2026", read: 11,
      },
      {
        slug: "react-native-design-system",
        category: "Design",
        title: "Building a design system for a 300-component React Native app",
        excerpt: "When your app has 300 components and 3 developers, design tokens aren't optional. This is how we built ours.",
        date: "Feb 8, 2026", read: 8,
      },
    ],
  },
  about: {
    hero: {
      label: "About",
      title: "Kristian Gjergji",
      sub: "Full-Stack Developer · Product Designer · Mobile Engineer",
    },
    bio: {
      title: "About",
      p1: "Self-employed developer specializing in mobile-first applications and full-stack development. Passionate about building products that people actually use and iterating until they work.",
      p2: "Currently leading UI/UX development for Spindare, a social gamification platform with 300+ components and 150,000+ lines of production code. I believe in shipping fast, solving real problems through technology, and writing code that's maintainable at scale.",
      p3: "At KIQA DEV I offer end-to-end development services — from architecture and design to deployment and ongoing maintenance. Open to select freelance projects starting June 2026.",
    },
    skills: {
      title: "Tech Stack",
      categories: [
        {
          name: "Mobile",
          items: ["React Native", "Expo", "iOS / Android", "EAS Build", "App Store Deployment"],
        },
        {
          name: "Frontend",
          items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "Responsive Design"],
        },
        {
          name: "Backend & Data",
          items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Real-time sync", "Clerk Auth"],
        },
        {
          name: "Tools & Services",
          items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat", "Backblaze B2"],
        },
      ],
    },
    experience: {
      title: "Experience",
      items: [
        { year: "2025–Now", role: "Co-Founder & Lead UI/UX Developer — Spindare", desc: "Leading all frontend and mobile development on a distributed team. 300+ components, 150k+ lines of React Native TypeScript." },
        { year: "2024–Now", role: "Self-Employed Developer — KIQA DEV", desc: "Full-stack web and mobile development for clients. End-to-end delivery from architecture to deployment." },
        { year: "2025", role: "Hardware Engineering — Custom Gaming Console", desc: "Engineered a custom high-performance gaming console with custom APU, 32GB RAM, and titanium/aluminum chassis." },
        { year: "2022–Now", role: "Self-Taught Developer", desc: "Intensive self-directed learning from frontend fundamentals to production-grade full-stack applications." },
      ],
    },
    values: {
      title: "How I work",
      items: [
        { title: "Ship fast, iterate faster", desc: "Bias toward action and rapid prototyping. Ship early, measure, improve." },
        { title: "User-first thinking", desc: "Every technical decision serves user experience. Performance is a feature." },
        { title: "Type-safe everything", desc: "TypeScript everywhere. Reliable, maintainable, self-documenting code." },
        { title: "Ownership mindset", desc: "I treat every project like it's mine — because while we work together, it is." },
      ],
    },
  },
  contact: {
    hero: {
      label: "Contact",
      title: "Get in touch",
      sub: "Have a project in mind? Let's talk. I usually respond within 24 hours.",
    },
    form: {
      name: "Your name", namePh: "Kristian Gjergji",
      email: "Email address", emailPh: "you@example.com",
      subject: "Subject", subjectPh: "Project inquiry",
      message: "Message", messagePh: "Tell me about your project, timeline, and budget...",
      send: "Send Message", sending: "Sending...",
      sent: "Message sent.", sentSub: "I'll get back to you within 24 hours.",
      another: "Send another",
    },
    info: {
      title: "Contact details",
      email: "newkiqaa@gmail.com",
      discord: "@kodibkfg",
      github: "github.com/rashica07",
      twitter: "@kristiangjergj4",
      location: "Kosovo / Italy",
      hours: "Response time",
      hoursValue: "Within 24 hours",
    },
    map: { title: "Location — Kosovo" },
  },
  footer: {
    tagline: "Professional development services.",
    nav: { services: "Services", portfolio: "Portfolio", blog: "Blog", about: "About", contact: "Contact" },
    legal: "© 2026 KIQA DEV. All rights reserved.",
    built: "Built with Next.js & TypeScript",
  },
  common: {
    viewAll: "View all", getQuote: "Get a quote", learnMore: "Learn more",
    liveNow: "Live", inDev: "In Development", comingSoon: "Coming Soon",
    backHome: "Back to home",
  },
};

const de: typeof en = {
  nav: {
    home: "Startseite", services: "Leistungen", portfolio: "Portfolio",
    blog: "Blog", about: "Über mich", contact: "Kontakt", quote: "Angebot anfordern",
  },
  home: {
    hero: {
      badge: "Professionelle Entwicklungsdienstleistungen",
      h1: "KIQA", h2: "DEV.",
      sub: "Full-Stack-Entwickler aus dem Kosovo. Ich baue Mobile Apps und Web-Plattformen — schnell, sauber und nachhaltig.",
      cta1: "Leistungen ansehen", cta2: "Portfolio",
    },
    services: {
      label: "Was wir bauen",
      title: "Ganzheitliche Entwicklung",
      sub: "Vom Konzept bis zum App Store. Ein Entwickler, volle Verantwortung.",
      items: [
        { name: "Mobile Apps", desc: "Native iOS & Android Apps mit React Native. Bereit zum Launch." },
        { name: "Web-Plattformen", desc: "Skalierbare Web-Apps mit Next.js und TypeScript." },
        { name: "UI/UX Design", desc: "Minimale, funktionale Interfaces. Jedes Pixel bewusst gesetzt." },
        { name: "Backend & APIs", desc: "Supabase, Node.js, PostgreSQL. Schnell, sicher, skalierbar." },
      ],
    },
    featured: { label: "Ausgewählte Arbeiten", title: "Projekte" },
    stats: {
      label: "In Zahlen",
      items: [
        { value: "150k+", label: "Codezeilen" },
        { value: "2", label: "Aktive Projekte" },
        { value: "3+", label: "Jahre Erfahrung" },
        { value: "4", label: "Gesprochene Sprachen" },
      ],
    },
    cta: {
      title: "Bereit, etwas zu bauen?",
      sub: "Erzähl mir von deinem Projekt — ich mache es Wirklichkeit.",
      button: "Gespräch starten",
    },
    testimonials: {
      label: "Referenzen",
      title: "Was andere sagen",
      items: en.home.testimonials.items,
    },
  },
  services: {
    hero: {
      label: "Leistungen",
      title: "Was ich anbiete",
      sub: "Professionelle Entwicklungsleistungen für Startups, Unternehmen und Gründer.",
    },
    items: [
      {
        name: "Mobile App-Entwicklung",
        desc: "React Native Apps für iOS und Android — vom MVP bis zum App Store. Ich übernehme alles: Architektur, UI, APIs, Deployment.",
        features: ["React Native & Expo", "iOS & Android", "App Store Einreichung", "Push-Benachrichtigungen", "Offline-First", "Performance-Optimierung"],
      },
      {
        name: "Web-Entwicklung",
        desc: "Schnelle, moderne Web-Anwendungen mit Next.js und TypeScript. SEO-ready, server-seitig gerendert, produktionsreif.",
        features: ["Next.js 15+", "TypeScript", "SEO & Core Web Vitals", "Server-Side Rendering", "Responsive Design", "CMS-Integration"],
      },
      {
        name: "UI/UX Design",
        desc: "Klare, minimale Interfaces, die konvertieren. Ich designe in Figma und baue die Komponenten selbst.",
        features: ["Figma-Prototypen", "Design-Systeme", "Komponentenbibliotheken", "Dark/Light Mode", "Barrierefreiheit", "Micro-Interaktionen"],
      },
      {
        name: "Backend & APIs",
        desc: "Skalierbare Backend-Systeme. Auth, Datenbanken, Storage, Echtzeit — von Anfang an richtig aufgebaut.",
        features: ["Supabase & PostgreSQL", "Node.js & REST APIs", "Authentifizierung", "Datei-Storage", "Echtzeit mit WebSockets", "Cloud-Deployment"],
      },
      {
        name: "Technische Beratung",
        desc: "Architektur-Review, Code-Audit oder einfach eine zweite Meinung zu deinem Stack.",
        features: ["Code-Audits", "Architekturplanung", "Performance-Analyse", "Tech-Stack-Auswahl", "Sicherheitsreview", "Roadmap-Planung"],
      },
    ],
    process: {
      title: "So läuft es ab",
      steps: [
        { n: "01", title: "Discovery", desc: "Wir besprechen dein Projekt, Ziele und Zeitplan. Keine Verpflichtung." },
        { n: "02", title: "Angebot", desc: "Ich sende einen detaillierten Scope, Zeitplan und Festpreis." },
        { n: "03", title: "Entwicklung", desc: "Regelmäßige Updates, sauberer Code und funktionierende Builds." },
        { n: "04", title: "Launch", desc: "Deployment, Dokumentation und Support nach dem Go-Live." },
      ],
    },
    cta: { title: "Projekt starten", sub: "Lass uns über das sprechen, was du baust.", button: "Kostenloses Angebot" },
  },
  portfolio: {
    hero: {
      label: "Portfolio",
      title: "Ausgewählte Projekte",
      sub: "Projekte, die ich gebaut habe — professionell, persönlich und alles dazwischen.",
    },
    filters: ["Alle", "Mobile", "Web"],
    status: { live: "Live", dev: "In Entwicklung", soon: "Demnächst" },
    viewProject: "Projekt ansehen", viewCode: "Code ansehen", hire: "Beauftrage mich",
    projects: en.portfolio.projects,
  },
  blog: {
    hero: {
      label: "Blog",
      title: "Artikel",
      sub: "Gedanken über Code, Produktentwicklung und schnelles Shipping.",
    },
    readMore: "Artikel lesen", minRead: "Min. Lesezeit",
    categories: ["Alle", "React Native", "Architektur", "Backend", "Design"],
    posts: en.blog.posts,
  },
  about: {
    hero: {
      label: "Über mich",
      title: "Kristian Gjergji",
      sub: "Entwickler. Builder. 14 Jahre alt.",
    },
    bio: {
      title: "Über mich",
      p1: "Ich bin Kristian — online bekannt als Kiqa. Ich habe mit 11 Jahren aus reiner Neugier mit dem Programmieren begonnen und seither nicht aufgehört. Ich bin 14, aus dem Kosovo, und lebe derzeit in Italien.",
      p2: "Ich bin der UI/UX-Lead von Spindare, einer täglichen Challenge-Social-App, die von einem 3-Personen-Team entwickelt wird. Der Codebase umfasst 150k+ Zeilen und geht im September 2026 in den App Store.",
      p3: "Ich habe KIQA DEV gegründet, um professionelle Entwicklungsdienstleistungen für Unternehmen und Gründer anzubieten, die jemanden brauchen, der wirklich liefert.",
    },
    skills: {
      title: "Tech Stack",
      categories: en.about.skills.categories,
    },
    experience: {
      title: "Erfahrung",
      items: [
        { year: "2025–2026", role: "UI/UX Lead — Spindare", desc: "Leitung der gesamten Frontend- und Mobile-Entwicklung in einem 3-Personen-Team." },
        { year: "2026", role: "Gründer — KIQA DEV", desc: "Professionelle Entwicklungsdienstleistungen für Unternehmen und Startups." },
        { year: "2026", role: "Solo-Entwickler — TravelMe", desc: "Entwurf und Entwicklung eines KI-gestützten Reiseplaners." },
        { year: "2022–2024", role: "Autodidaktischer Entwickler", desc: "React, TypeScript, Node.js und Mobile-Entwicklung durch reale Projekte erlernt." },
      ],
    },
    values: {
      title: "Meine Arbeitsweise",
      items: [
        { title: "Schnell liefern, sauber liefern", desc: "Schnelligkeit ohne Qualität ist nur technische Schulden." },
        { title: "Keine Tutorials, nur Projekte", desc: "Alles, was ich weiß, habe ich durch echte Projekte gelernt." },
        { title: "Ehrliche Kommunikation", desc: "Ich sage dir, was ich bauen kann, wann und für wie viel." },
        { title: "Ownership-Mindset", desc: "Ich behandle jedes Projekt so, als wäre es meins." },
      ],
    },
  },
  contact: {
    hero: {
      label: "Kontakt",
      title: "Kontakt aufnehmen",
      sub: "Hast du ein Projekt? Lass uns reden. Ich antworte in der Regel innerhalb von 24 Stunden.",
    },
    form: {
      name: "Dein Name", namePh: "Max Mustermann",
      email: "E-Mail-Adresse", emailPh: "du@beispiel.de",
      subject: "Betreff", subjectPh: "Projektanfrage",
      message: "Nachricht", messagePh: "Erzähl mir von deinem Projekt, Zeitplan und Budget...",
      send: "Nachricht senden", sending: "Wird gesendet...",
      sent: "Nachricht gesendet.", sentSub: "Ich melde mich innerhalb von 24 Stunden.",
      another: "Weitere Nachricht",
    },
    info: {
      title: "Kontaktdaten",
      email: "newkiqaa@gmail.com",
      discord: "@kodibkfg",
      github: "github.com/rashica07",
      twitter: "@kristiangjergj4",
      location: "Kosovo / Italien",
      hours: "Antwortzeit",
      hoursValue: "Innerhalb von 24 Stunden",
    },
    map: { title: "Standort — Kosovo" },
  },
  footer: {
    tagline: "Professionelle Entwicklungsdienstleistungen.",
    nav: { services: "Leistungen", portfolio: "Portfolio", blog: "Blog", about: "Über mich", contact: "Kontakt" },
    legal: "© 2026 KIQA DEV. Alle Rechte vorbehalten.",
    built: "Erstellt mit Next.js & TypeScript",
  },
  common: {
    viewAll: "Alle ansehen", getQuote: "Angebot", learnMore: "Mehr erfahren",
    liveNow: "Live", inDev: "In Entwicklung", comingSoon: "Demnächst",
    backHome: "Zurück zur Startseite",
  },
};

const it: typeof en = {
  nav: {
    home: "Home", services: "Servizi", portfolio: "Portfolio",
    blog: "Blog", about: "Chi sono", contact: "Contatti", quote: "Richiedi un preventivo",
  },
  home: {
    hero: {
      badge: "Servizi di Sviluppo Professionale",
      h1: "KIQA", h2: "DEV.",
      sub: "Sviluppatore full-stack dal Kosovo. Creo app mobile e piattaforme web — veloci, pulite e durature.",
      cta1: "Vedi i Servizi", cta2: "Portfolio",
    },
    services: {
      label: "Cosa costruiamo",
      title: "Sviluppo completo",
      sub: "Dal concetto all'App Store. Un solo sviluppatore, responsabilità totale.",
      items: [
        { name: "App Mobile", desc: "App native iOS & Android con React Native. Pronte per il lancio." },
        { name: "Piattaforme Web", desc: "Applicazioni web scalabili con Next.js e TypeScript." },
        { name: "Design UI/UX", desc: "Interfacce minimali e funzionali. Ogni pixel è intenzionale." },
        { name: "Backend & API", desc: "Supabase, Node.js, PostgreSQL. Veloci, sicure, scalabili." },
      ],
    },
    featured: { label: "Lavori selezionati", title: "Progetti" },
    stats: {
      label: "I numeri",
      items: [
        { value: "150k+", label: "Righe di codice" },
        { value: "2", label: "Progetti attivi" },
        { value: "3+", label: "Anni di sviluppo" },
        { value: "4", label: "Lingue parlate" },
      ],
    },
    cta: {
      title: "Pronto a costruire qualcosa?",
      sub: "Raccontami del tuo progetto e lo realizziamo insieme.",
      button: "Inizia una conversazione",
    },
    testimonials: {
      label: "Testimonianze",
      title: "Cosa dicono di me",
      items: en.home.testimonials.items,
    },
  },
  services: {
    hero: {
      label: "Servizi",
      title: "Cosa offro",
      sub: "Servizi di sviluppo professionale per startup, aziende e fondatori.",
    },
    items: [
      {
        name: "Sviluppo App Mobile",
        desc: "App React Native per iOS e Android — dall'MVP all'App Store. Mi occupo di tutto.",
        features: ["React Native & Expo", "iOS & Android", "Pubblicazione App Store", "Notifiche push", "Supporto offline", "Ottimizzazione performance"],
      },
      {
        name: "Sviluppo Web",
        desc: "Applicazioni web moderne e veloci con Next.js e TypeScript. SEO-ready, server-side rendered.",
        features: ["Next.js 15+", "TypeScript", "SEO & Core Web Vitals", "Rendering lato server", "Design responsive", "Integrazione CMS"],
      },
      {
        name: "Design UI/UX",
        desc: "Interfacce pulite e minimali che convertono. Progetto in Figma e costruisco i componenti io stesso.",
        features: ["Prototipi Figma", "Design system", "Librerie componenti", "Dark/Light mode", "Accessibilità", "Micro-interazioni"],
      },
      {
        name: "Backend & API",
        desc: "Sistemi backend scalabili. Auth, database, storage, real-time — tutto configurato correttamente.",
        features: ["Supabase & PostgreSQL", "Node.js & REST API", "Autenticazione", "Storage file", "Real-time websockets", "Deploy cloud"],
      },
      {
        name: "Consulenza Tecnica",
        desc: "Revisione architettura, audit del codice o semplicemente un secondo parere sul tuo stack.",
        features: ["Audit del codice", "Pianificazione architettura", "Analisi performance", "Selezione tech stack", "Revisione sicurezza", "Pianificazione roadmap"],
      },
    ],
    process: {
      title: "Come funziona",
      steps: [
        { n: "01", title: "Analisi", desc: "Parliamo del tuo progetto, obiettivi e tempistiche. Senza impegno." },
        { n: "02", title: "Proposta", desc: "Invio un piano dettagliato, timeline e prezzo fisso. Nessuna sorpresa." },
        { n: "03", title: "Sviluppo", desc: "Aggiornamenti regolari, codice pulito e build funzionanti." },
        { n: "04", title: "Lancio", desc: "Deploy, documentazione e supporto dopo il go-live." },
      ],
    },
    cta: { title: "Inizia un progetto", sub: "Parliamo di cosa stai costruendo.", button: "Richiedi un preventivo gratuito" },
  },
  portfolio: {
    hero: {
      label: "Portfolio",
      title: "Lavori selezionati",
      sub: "Progetti che ho costruito — professionali, personali e tutto il resto.",
    },
    filters: ["Tutti", "Mobile", "Web"],
    status: { live: "Live", dev: "In Sviluppo", soon: "Prossimamente" },
    viewProject: "Vedi progetto", viewCode: "Vedi codice", hire: "Assumimi per questo",
    projects: en.portfolio.projects,
  },
  blog: {
    hero: {
      label: "Blog",
      title: "Articoli",
      sub: "Pensieri su codice, prodotti e sviluppo veloce.",
    },
    readMore: "Leggi articolo", minRead: "min di lettura",
    categories: ["Tutti", "React Native", "Architettura", "Backend", "Design"],
    posts: en.blog.posts,
  },
  about: {
    hero: {
      label: "Chi sono",
      title: "Kristian Gjergji",
      sub: "Sviluppatore. Builder. 14 anni.",
    },
    bio: {
      title: "Background",
      p1: "Sono Kristian — conosciuto online come Kiqa. Ho iniziato a programmare a 11 anni per pura curiosità e non mi sono più fermato. Ho 14 anni, vengo dal Kosovo e vivo attualmente in Italia.",
      p2: "Sono il responsabile UI/UX di Spindare, un'app social di sfide giornaliere sviluppata da un team di 3 persone. Il codebase conta 150k+ righe e arriva sull'App Store a settembre 2026.",
      p3: "Ho fondato KIQA DEV per offrire servizi di sviluppo professionale ad aziende e fondatori che hanno bisogno di qualcuno che consegna davvero.",
    },
    skills: { title: "Tech Stack", categories: en.about.skills.categories },
    experience: {
      title: "Esperienza",
      items: [
        { year: "2025–2026", role: "UI/UX Lead — Spindare", desc: "Responsabile di tutto lo sviluppo frontend e mobile in un team di 3 persone." },
        { year: "2026", role: "Fondatore — KIQA DEV", desc: "Servizi di sviluppo professionale per aziende e startup." },
        { year: "2026", role: "Sviluppatore Solo — TravelMe", desc: "Progettazione e sviluppo di un pianificatore di viaggi basato su AI." },
        { year: "2022–2024", role: "Sviluppatore Autodidatta", desc: "Ho imparato React, TypeScript, Node.js e sviluppo mobile costruendo progetti reali." },
      ],
    },
    values: {
      title: "Come lavoro",
      items: [
        { title: "Consegna rapida e pulita", desc: "La velocità senza qualità è solo debito tecnico." },
        { title: "Niente tutorial, solo progetti", desc: "Tutto quello che so, l'ho imparato costruendo qualcosa di reale." },
        { title: "Comunicazione onesta", desc: "Ti dico cosa posso costruire, quando e per quanto." },
        { title: "Mentalità di proprietà", desc: "Tratto ogni progetto come se fosse mio." },
      ],
    },
  },
  contact: {
    hero: {
      label: "Contatti",
      title: "Contattami",
      sub: "Hai un progetto in mente? Parliamone. Di solito rispondo entro 24 ore.",
    },
    form: {
      name: "Il tuo nome", namePh: "Mario Rossi",
      email: "Indirizzo email", emailPh: "tu@esempio.it",
      subject: "Oggetto", subjectPh: "Richiesta progetto",
      message: "Messaggio", messagePh: "Raccontami del tuo progetto, tempistiche e budget...",
      send: "Invia messaggio", sending: "Invio in corso...",
      sent: "Messaggio inviato.", sentSub: "Ti risponderò entro 24 ore.",
      another: "Invia un altro",
    },
    info: {
      title: "Dettagli di contatto",
      email: "newkiqaa@gmail.com",
      discord: "@kodibkfg",
      github: "github.com/rashica07",
      twitter: "@kristiangjergj4",
      location: "Kosovo / Italia",
      hours: "Tempo di risposta",
      hoursValue: "Entro 24 ore",
    },
    map: { title: "Posizione — Kosovo" },
  },
  footer: {
    tagline: "Servizi di sviluppo professionale.",
    nav: { services: "Servizi", portfolio: "Portfolio", blog: "Blog", about: "Chi sono", contact: "Contatti" },
    legal: "© 2026 KIQA DEV. Tutti i diritti riservati.",
    built: "Costruito con Next.js & TypeScript",
  },
  common: {
    viewAll: "Vedi tutti", getQuote: "Preventivo", learnMore: "Scopri di più",
    liveNow: "Live", inDev: "In Sviluppo", comingSoon: "Prossimamente",
    backHome: "Torna alla home",
  },
};

const sq: typeof en = {
  nav: {
    home: "Kryefaqja", services: "Shërbime", portfolio: "Portofol",
    blog: "Blog", about: "Rreth meje", contact: "Kontakt", quote: "Kërko ofertë",
  },
  home: {
    hero: {
      badge: "Shërbime Profesionale Zhvillimi",
      h1: "KIQA", h2: "DEV.",
      sub: "Zhvillues full-stack nga Kosova. Ndërtoj aplikacione mobile dhe platforma web — shpejt, pastër dhe me qëndrueshmëri.",
      cta1: "Shiko Shërbimet", cta2: "Portofoli",
    },
    services: {
      label: "Çfarë ndërtojmë",
      title: "Zhvillim i plotë",
      sub: "Nga ideja deri te App Store. Një zhvillues, përgjegjësi e plotë.",
      items: [
        { name: "Aplikacione Mobile", desc: "Aplikacione native iOS & Android me React Native. Gati për lansim." },
        { name: "Platforma Web", desc: "Aplikacione web të shkallëzueshme me Next.js dhe TypeScript." },
        { name: "Dizajn UI/UX", desc: "Ndërfaqe minimale dhe funksionale. Çdo piksel i menduar." },
        { name: "Backend & API", desc: "Supabase, Node.js, PostgreSQL. Shpejt, i sigurt, i shkallëzueshëm." },
      ],
    },
    featured: { label: "Punë të zgjedhura", title: "Projekte" },
    stats: {
      label: "Me shifra",
      items: [
        { value: "150k+", label: "Rreshta kodi" },
        { value: "2", label: "Projekte aktive" },
        { value: "3+", label: "Vjet programim" },
        { value: "4", label: "Gjuhë të folura" },
      ],
    },
    cta: {
      title: "Gati të ndërtoni diçka?",
      sub: "Tregomëni për projektin tuaj dhe le ta bëjmë real.",
      button: "Fillo bisedën",
    },
    testimonials: {
      label: "Dëshmitë",
      title: "Çfarë thonë të tjerët",
      items: en.home.testimonials.items,
    },
  },
  services: {
    hero: {
      label: "Shërbime",
      title: "Çfarë ofroj",
      sub: "Shërbime profesionale zhvillimi për startup, biznese dhe themelues.",
    },
    items: [
      {
        name: "Zhvillim Aplikacionesh Mobile",
        desc: "Aplikacione React Native për iOS dhe Android — nga MVP deri te App Store. Merrem me gjithçka.",
        features: ["React Native & Expo", "iOS & Android", "Publikim App Store", "Njoftime push", "Mbështetje offline", "Optimizim performance"],
      },
      {
        name: "Zhvillim Web",
        desc: "Aplikacione web moderne dhe të shpejta me Next.js dhe TypeScript. Të optimizuara për SEO.",
        features: ["Next.js 15+", "TypeScript", "SEO & Core Web Vitals", "Renderim nga serveri", "Dizajn responsive", "Integrim CMS"],
      },
      {
        name: "Dizajn UI/UX",
        desc: "Ndërfaqe të pastra dhe minimale që konvertojnë. Dizajnoj në Figma dhe ndërtoj komponentët vetë.",
        features: ["Prototipe Figma", "Sisteme dizajni", "Bibliotekat komponentëve", "Modalitet errët/ndriçues", "Aksesueshmëri", "Mikro-ndërveprime"],
      },
      {
        name: "Backend & API",
        desc: "Sisteme backend të shkallëzueshme. Auth, databaza, ruajtje, kohë reale — gjithçka e konfiguruar saktë.",
        features: ["Supabase & PostgreSQL", "Node.js & REST API", "Autentifikim", "Ruajtje skedarësh", "Kohë reale", "Vendosje cloud"],
      },
      {
        name: "Konsulencë Teknike",
        desc: "Rishikim arkitekture, auditim kodi ose thjesht një mendim i dytë mbi stakun tuaj.",
        features: ["Auditim kodi", "Planifikim arkitekture", "Analizë performance", "Zgjedhje tech stack", "Rishikim sigurie", "Planifikim rrugëtimi"],
      },
    ],
    process: {
      title: "Si funksionon",
      steps: [
        { n: "01", title: "Zbulim", desc: "Diskutojmë projektin, qëllimet dhe afatet tuaja. Pa asnjë angazhim." },
        { n: "02", title: "Propozim", desc: "Dërgoj një plan të detajuar, afat kohor dhe çmim fiks. Asnjë surprizë." },
        { n: "03", title: "Ndërtim", desc: "Përditësime të rregullta, kod i pastër dhe build-e funksionale." },
        { n: "04", title: "Lansim", desc: "Vendosje, dokumentacion dhe mbështetje pas go-live." },
      ],
    },
    cta: { title: "Fillo një projekt", sub: "Le të diskutojmë çfarë po ndërtoni.", button: "Kërko ofertë falas" },
  },
  portfolio: {
    hero: {
      label: "Portofol",
      title: "Punë të zgjedhura",
      sub: "Projekte që kam ndërtuar — profesionale, personale dhe gjithçka mes tyre.",
    },
    filters: ["Të gjitha", "Mobile", "Web"],
    status: { live: "Live", dev: "Në Zhvillim", soon: "Së shpejti" },
    viewProject: "Shiko projektin", viewCode: "Shiko kodin", hire: "Punëso mua",
    projects: en.portfolio.projects,
  },
  blog: {
    hero: {
      label: "Blog",
      title: "Shkrime",
      sub: "Mendime mbi kod, ndërtim produktesh dhe lansim të shpejtë.",
    },
    readMore: "Lexo postin", minRead: "min lexim",
    categories: ["Të gjitha", "React Native", "Arkitekturë", "Backend", "Dizajn"],
    posts: en.blog.posts,
  },
  about: {
    hero: {
      label: "Rreth meje",
      title: "Kristian Gjergji",
      sub: "Zhvillues. Ndërtues. 14 vjeç.",
    },
    bio: {
      title: "Prejardhja",
      p1: "Jam Kristian — i njohur online si Kiqa. Fillova të programoj në moshën 11 vjeç nga kurioziteti i thjeshtë dhe nuk u ndalova. Jam 14 vjeç, nga Kosova, dhe jetoj aktualisht në Itali.",
      p2: "Jam drejtues UI/UX i Spindare, një aplikacion social sfidash ditore, i ndërtuar nga një ekip me 3 persona. Kodi i projektit ka mbi 150 mijë rreshta dhe do të publikohet në App Store në shtator 2026.",
      p3: "Themelova KIQA DEV për të ofruar shërbime profesionale zhvillimi për biznese dhe themelues që kanë nevojë për dikë që dorëzon me të vërtetë.",
    },
    skills: { title: "Tech Stack", categories: en.about.skills.categories },
    experience: {
      title: "Eksperiencë",
      items: [
        { year: "2025–2026", role: "Drejtues UI/UX — Spindare", desc: "Drejtoj të gjithë zhvillimin frontend dhe mobile në një ekip me 3 persona." },
        { year: "2026", role: "Themelues — KIQA DEV", desc: "Shërbime profesionale zhvillimi për biznese dhe startup." },
        { year: "2026", role: "Zhvillues Solo — TravelMe", desc: "Dizajnim dhe zhvillim i një planifikuesi udhëtimesh të bazuar në AI." },
        { year: "2022–2024", role: "Zhvillues Autodidakt", desc: "Mësova React, TypeScript, Node.js dhe zhvillim mobile duke ndërtuar projekte reale." },
      ],
    },
    values: {
      title: "Si punoj",
      items: [
        { title: "Dorëzo shpejt, dorëzo pastër", desc: "Shpejtësia pa cilësi është thjesht borxh teknik." },
        { title: "Pa tutorial, vetëm projekte", desc: "Gjithçka di, e mësova duke ndërtuar diçka reale." },
        { title: "Komunikim i sinqertë", desc: "Të tregoj çfarë mund të ndërtoj, kur dhe me sa." },
        { title: "Mentalitet pronësie", desc: "Çdo projekt e trajtoj sikur të jetë i imi." },
      ],
    },
  },
  contact: {
    hero: {
      label: "Kontakt",
      title: "Na kontaktoni",
      sub: "Keni një projekt në mendje? Le të flasim. Zakonisht përgjigjem brenda 24 orëve.",
    },
    form: {
      name: "Emri juaj", namePh: "Agim Berisha",
      email: "Adresa email", emailPh: "ju@shembull.com",
      subject: "Subjekti", subjectPh: "Kërkesë projekti",
      message: "Mesazhi", messagePh: "Tregomëni për projektin, afatin kohor dhe buxhetin...",
      send: "Dërgo mesazhin", sending: "Duke dërguar...",
      sent: "Mesazhi u dërgua.", sentSub: "Do të kthehem tek ju brenda 24 orëve.",
      another: "Dërgo tjetër",
    },
    info: {
      title: "Detajet e kontaktit",
      email: "newkiqaa@gmail.com",
      discord: "@kodibkfg",
      github: "github.com/rashica07",
      twitter: "@kristiangjergj4",
      location: "Kosovë / Itali",
      hours: "Koha e përgjigjes",
      hoursValue: "Brenda 24 orëve",
    },
    map: { title: "Vendndodhja — Kosovë" },
  },
  footer: {
    tagline: "Shërbime profesionale zhvillimi.",
    nav: { services: "Shërbime", portfolio: "Portofol", blog: "Blog", about: "Rreth meje", contact: "Kontakt" },
    legal: "© 2026 KIQA DEV. Të gjitha të drejtat të rezervuara.",
    built: "Ndërtuar me Next.js & TypeScript",
  },
  common: {
    viewAll: "Shiko të gjitha", getQuote: "Kërko ofertë", learnMore: "Mëso më shumë",
    liveNow: "Live", inDev: "Në Zhvillim", comingSoon: "Së shpejti",
    backHome: "Kthehu në kryefaqe",
  },
};

const translations = { en, de, it, sq };

type ContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof en;
};

const Ctx = createContext<ContextType>({ lang: "en", setLang: () => {}, t: en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("kiqa-lang") as Lang | null;
    if (saved && translations[saved]) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("kiqa-lang", l);
  };

  return (
    <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLanguage = () => useContext(Ctx);
