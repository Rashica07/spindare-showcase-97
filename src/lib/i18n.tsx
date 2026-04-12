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
      badge: "Kristian Gjergji · Developer · Lecco, Italy",
      h1: "I build apps", h2: "that ship.",
      sub: "14 years old, based in Lecco. I do mobile and web — React Native, Next.js, Supabase. Serious about what I build.",
      spindare: "Currently building",
      avail: "Available for freelance from June 2026",
      cta1: "View Portfolio", cta2: "Get in touch",
    },
    services: {
      label: "Services",
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
      title: "Taking on projects from mid-2026.",
      sub: "Currently heads-down on Spindare — iOS launch September 2026. A few freelance slots open after that.",
      button: "Get in touch",
    },
    testimonials: {
      label: "From clients & collaborators",
      title: "In their words",
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
    caseStudies: {
      label: "Case Studies",
      title: "Under the hood",
      sub: "Architecture decisions, technical depth, and what it actually took to build these.",
    },
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
    newsletter: {
      title: "Get updates when I ship something new",
      sub: "No spam. Occasional posts, projects, and things worth reading.",
      done: "You're in. I'll be in touch.",
      subscribe: "Subscribe",
      sending: "...",
    },
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
        { title: "I learn by building", desc: "Every project teaches me something new. I'd rather build and learn than plan forever." },
        { title: "Make it work, then make it better", desc: "First version ships fast. Then I improve based on what actually matters." },
        { title: "TypeScript everywhere", desc: "I write TypeScript for everything. It catches bugs early and makes refactoring painless." },
        { title: "I finish what I start", desc: "If I take on a project, I see it through. No half-built prototypes." },
      ],
    },
    collab: {
      label: "The team",
      title: "Who I build with",
      name: "Daniel F.",
      role: "Lead Developer · Spindare",
      note: "Working with Daniel on Spindare has been invaluable. As the technical lead, he's helped me level up my architecture skills and navigate complex backend challenges.",
      context: "Co-founder & uncle",
    },
    cta: {
      title: "Want to work together?",
      sub: "I'm open to freelance projects, collabs, and interesting builds.",
      button: "Get in touch",
    },
  },
  devHub: {
    hero: {
      label: "Developer Hub",
      role: "Full-stack & mobile developer · Lecco, Italy",
      sub: "Building production apps since 2023. Currently leading development on Spindare — a social gamification platform targeting iOS launch September 2026 — while taking on freelance web and mobile projects.",
      contact: "Get in touch",
    },
    projects: {
      label: "Current Projects",
      title: "What I'm building",
      spindareRole: "Lead Developer · UI/UX · 3-person team",
      spindareBadge: "In Development",
      spindareDesc: "A social gamification platform where users spin for daily challenges, complete them, and share with friends. Built for iOS and Android with React Native, TypeScript, and Supabase Realtime.",
      travelmeRole: "Solo Project · Full-stack",
      travelmeBadge: "Coming Soon",
      travelmeDesc: "Describe your trip in plain language — TravelMe generates a full itinerary: flights, hotels, local experiences, day-by-day plan. No more juggling 10 apps.",
    },
    stack: {
      label: "What I Work With",
      title: "Tech stack",
    },
    adl: {
      label: "Architecture Decision Log",
      title: "Why I chose what I chose",
      sub: "Technical decisions with reasoning — every choice has a why.",
    },
    exp: {
      label: "Experience",
      title: "Timeline",
      spindareRole: "Co-Founder & Lead Developer",
      spindareDate: "Jan 2025 – Present",
      spindareBullets: [
        "Leading all frontend and mobile development on a 3-person team",
        "Architected the full component library and design system from scratch",
        "Integrated real-time features with Supabase Realtime across the social feed",
        "Built in-app messaging, streak tracking, and AI challenge generation",
      ],
      kiqaRole: "Freelance Developer",
      kiqaDate: "2024 – Present",
      kiqaBullets: [
        "Full-stack web and mobile projects for clients across Europe",
        "Focus on React Native apps and Next.js web platforms",
        "End-to-end delivery: design, build, deploy, maintain",
      ],
    },
    oss: {
      label: "Open Source",
      title: "Public work",
      sub: "Early in my open source journey — but everything I build is built in public.",
      spindareDesc: "Daily challenge social app. React Native · TypeScript · Supabase. 150k+ lines, 300+ components.",
      travelmeDesc: "TravelMe — AI travel planner. React Native · OpenAI API · Node.js · MongoDB.",
      profileDesc: "All public repositories, commit history, and ongoing work. Building more every week.",
      viewProfile: "View profile",
    },
    cta: {
      title: "Got a project in mind?",
      sub: "Open to freelance work, collabs, and interesting builds. Available from June 2026.",
      discord: "Discord",
    },
  },
  contact: {
    hero: {
      label: "Contact",
      title: "Get in touch",
      sub: "Tell me about your project. I'll reply within 24 hours.",
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
      email: "contact@kiqa-dev.it",
      discord: "@kodibkfg",
      github: "github.com/rashica07",
      twitter: "@kristiangjergj4",
      location: "Kosovo / Italy",
      hours: "Response time",
      hoursValue: "Within 24 hours",
    },
    map: { title: "Location — Kosovo" },
    status: {
      title: "Current Status",
      statusLabel: "Status",
      statusValue: "Focused on Spindare launch",
      freelanceLabel: "Available for freelance",
      freelanceValue: "June 2026",
      bookingLabel: "Booking for",
      bookingValue: "July–August 2026 projects",
      responseLabel: "Response time",
      responseValue: "Within 24 hours",
    },
    faq: {
      label: "FAQ",
      title: "Common questions",
      items: [
        { q: "How old are you?", a: "I'm 14. Age doesn't define skill — my code does. Spindare has 150k+ lines and 300+ components. Judge the work, not the birth year." },
        { q: "Can you work with clients outside Italy?", a: "Yes. I work fully remote and have no geographic restrictions. Timezone differences are manageable — I'm flexible." },
        { q: "What's your availability right now?", a: "Currently focused on Spindare's iOS launch (September 2026). Open for new freelance work from June 2026. I can discuss your project now and plan accordingly." },
        { q: "Do you work alone or with a team?", a: "Usually solo — I handle everything end-to-end. For larger projects, I collaborate with Daniel F. (Lead Developer, Spindare co-founder) when needed." },
        { q: "What's your rate?", a: "Depends on scope, timeline, and complexity. I work on fixed-price projects — no hourly surprises. See the Services page for starting ranges, or email me with your project details." },
        { q: "Can you start immediately?", a: "Not until June 2026. Spindare's launch is the current priority. That said, I'm happy to plan ahead — booking slots fill up, so reach out now." },
      ],
    },
    errors: {
      fillAll: "Please fill in all fields.",
      invalidEmail: "Please enter a valid email.",
      tooLong: "Message must be under 2000 characters.",
      serverError: "Something went wrong.",
      networkError: "Network error. Check your connection.",
    },
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
  cv: {
    savePdf: "Save as PDF", printCv: "Print CV",
    note: "CV content is in English (international professional standard)",
    generating: "Generating…",
    summary: "Professional Summary", experience: "Experience",
    projects: "Projects", skills: "Technical Skills",
    education: "Education", onePage: "One-Page Summary",
    titleLine: "Full-Stack Developer · Product Designer · Mobile Engineer",
    location: "Lecco, Italy · Remote-friendly",
    summaryText: "Self-employed developer specializing in mobile-first applications and full-stack development. Currently leading UI/UX development for Spindare, a social gamification platform with 300+ components and production-grade architecture. Passionate about shipping clean, performant products that solve real problems. Open to select freelance projects starting June 2026.",
    exp: {
      spindare: {
        role: "Co-Founder & Lead UI/UX Developer",
        date: "Jan 2025 – Present · Remote",
        bullets: [
          "Architected a 300+ component library and full design system for a React Native application from scratch",
          "Built 300+ TypeScript components with comprehensive type safety across iOS and Android platforms",
          "Implemented real-time social feed with Supabase Realtime subscriptions and offline-first architecture",
          "Integrated Stream Chat for production messaging with JWT authentication",
          "Built custom authentication flow with Clerk integration and Supabase ban system",
          "Reduced app bundle size by 40% through code-splitting optimization",
          "Collaborated with cross-functional distributed team across Italy and Albania",
        ],
        stats: ["300+ components", "150,000+ lines of code", "iOS launch Sep 2026"],
      },
      kiqa: {
        role: "Self-Employed Developer",
        date: "2024 – Present · Italy",
        bullets: [
          "Full-stack development services focusing on React Native mobile apps and Next.js web platforms",
          "End-to-end delivery: architecture, UI/UX design, development, deployment, and maintenance",
          "Mobile app development for iOS and Android; web application development",
          "Database architecture, cloud infrastructure setup, and performance optimization",
        ],
      },
    },
    proj: {
      inDev: "In Development", hardware: "Hardware", web: "Web", soon: "Coming Soon", stack: "Stack",
      spindare: { desc: "Social gamification platform — users spin a wheel for daily challenges, complete them, and share with friends. Built for iOS and Android with real-time social feed, 200+ curated challenges, offline-first architecture, and production-grade messaging." },
      console: { desc: "Engineered a high-performance custom gaming console combining hardware expertise with system-level optimization. Custom APU architecture, 32GB unified RAM, 10TB storage, titanium/aluminum composite chassis with liquid metal cooling. Multi-platform compatibility across PS1/2/3/5 and PC." },
      portfolio: { desc: "Professional portfolio showcasing development work and services. Multi-page Next.js site with 4-language support, SEO optimization, and Cloudflare CDN delivery." },
      travel: { desc: "AI travel planner — describe your trip in plain language, get a full itinerary with flights, hotels, and day-by-day plan." },
    },
    skillLabels: {
      expert: "Expert", proficient: "Proficient", mobileFront: "Mobile / Frontend",
      backendDb: "Backend & Database", infra: "Infrastructure & Tools",
      services: "Services & APIs", spoken: "Languages Spoken", practices: "Development Practices",
      spokenValue: "Albanian (Native) · English (Fluent) · Italian (Intermediate) · German (Basic)",
      practicesValue: "Agile, component-driven development, type-safe programming, mobile-first design, performance optimization",
    },
    oneP: {
      langs: "Languages", frontend: "Frontend", backend: "Backend", tools: "Tools",
      expLabel: "Experience", approach: "Approach", contact: "Contact",
      tagline: "Self-employed developer building production-grade applications with modern tech stacks.",
      approachValue: "Ship fast. Iterate constantly. Build things people use.",
      spindareExp: "Lead UI/UX for social mobile app",
      freelanceExp: "Full-stack development services",
      selfTaughtExp: "Intensive programming education",
      freelance: "Freelance", selfTaught: "Self-taught",
    },
    edu: {
      role: "Self-Taught Developer",
      desc: "Intensive self-directed learning focused on modern web and mobile development. Progressed from frontend fundamentals to production-grade full-stack applications.",
      bullets: [
        "Frontend: HTML/CSS → JavaScript → React → React Native → TypeScript",
        "Backend: REST APIs → PostgreSQL → Supabase → Serverless edge computing",
        "Infrastructure: Git → CI/CD → Cloud deployment → Production monitoring",
      ],
    },
  },
  ticker: {
    items: [
      "FULL STACK DEVELOPER", "MOBILE APPS", "WEB PLATFORMS",
      "REACT NATIVE", "NEXT.JS", "OPEN TO FREELANCE",
      "14 YEARS OLD", "BASED IN ITALY", "TYPESCRIPT", "SUPABASE",
    ],
  },
};

const de: typeof en = {
  nav: {
    home: "Startseite", services: "Leistungen", portfolio: "Portfolio",
    blog: "Blog", about: "Über mich", contact: "Kontakt", quote: "Angebot anfordern",
  },
  home: {
    hero: {
      badge: "Kristian Gjergji · Entwickler · Lecco, Italien",
      h1: "Ich baue Apps", h2: "die funktionieren.",
      sub: "14 Jahre alt, in Lecco. Mobile und Web — React Native, Next.js, Supabase. Ich nehme ernst, was ich baue.",
      spindare: "Aktuell im Bau",
      avail: "Verfügbar für Freelance ab Juni 2026",
      cta1: "Portfolio ansehen", cta2: "Kontakt aufnehmen",
    },
    services: {
      label: "Leistungen",
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
      title: "Projekte ab Mitte 2026.",
      sub: "Derzeit voll mit Spindare — iOS-Launch September 2026. Danach einige Freelance-Slots frei.",
      button: "Kontakt aufnehmen",
    },
    testimonials: {
      label: "Von Kunden & Mitarbeitern",
      title: "In ihren Worten",
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
    caseStudies: {
      label: "Fallstudien",
      title: "Unter der Haube",
      sub: "Architekturentscheidungen, technische Tiefe und was es wirklich gebraucht hat, das zu bauen.",
    },
  },
  blog: {
    hero: {
      label: "Blog",
      title: "Artikel",
      sub: "Gedanken über Code, Produktentwicklung und schnelles Shipping.",
    },
    readMore: "Artikel lesen", minRead: "Min. Lesezeit",
    categories: ["Alle", "React Native", "Architektur", "Backend", "Design"],
    posts: [
      {
        slug: "flatlist-memory-leak",
        category: "React Native",
        title: "Wie ich einen Memory Leak in FlatList behoben habe, der Spindares Social Feed zum Absturz brachte",
        excerpt: "Ein Echtzeit-Feed mit 1.000+ Posts kam zum Stillstand. So habe ich den Leak gefunden und dauerhaft behoben.",
        date: "28. Mär. 2026", read: 7,
      },
      {
        slug: "auth-flow-48-hours",
        category: "Architecture",
        title: "Warum ich Spindares Authentifizierungsfluss in 48 Stunden neu gebaut habe — ohne Reue",
        excerpt: "Das alte Auth-Setup funktionierte — bis es das nicht mehr tat. Eine ehrliche Analyse der Entscheidung, der Neuimplementierung und was ich anders machen würde.",
        date: "14. Mär. 2026", read: 9,
      },
      {
        slug: "supabase-vs-firebase",
        category: "Backend",
        title: "Supabase Realtime vs Firebase für Social Feeds: meine Erkenntnisse nach Stresstests beider Lösungen",
        excerpt: "Ich brauchte einen Echtzeit-Feed für 10.000+ gleichzeitige Nutzer. Beide haben es versprochen. Nur eine hat geliefert.",
        date: "22. Feb. 2026", read: 11,
      },
      {
        slug: "react-native-design-system",
        category: "Design",
        title: "Ein Design System für eine React Native App mit 300 Komponenten aufbauen",
        excerpt: "Wenn deine App 300 Komponenten und 3 Entwickler hat, sind Design Tokens keine Option. So haben wir unsere gebaut.",
        date: "8. Feb. 2026", read: 8,
      },
    ],
    newsletter: {
      title: "Updates erhalten, wenn ich etwas Neues shippe",
      sub: "Kein Spam. Gelegentliche Posts, Projekte und Lesenswertes.",
      done: "Du bist dabei. Ich melde mich.",
      subscribe: "Abonnieren",
      sending: "...",
    },
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
        { title: "Ich lerne durch Bauen", desc: "Jedes Projekt bringt mir etwas Neues bei. Lieber bauen und lernen als ewig planen." },
        { title: "Erst funktionieren, dann verbessern", desc: "Die erste Version wird schnell geliefert. Dann verbessere ich, was wirklich zählt." },
        { title: "Überall TypeScript", desc: "Ich schreibe TypeScript für alles. Es fängt Fehler früh ab und macht Refactoring schmerzlos." },
        { title: "Ich bringe zu Ende, was ich anfange", desc: "Wenn ich ein Projekt übernehme, ziehe ich es durch. Keine halbfertigen Prototypen." },
      ],
    },
    collab: {
      label: "Das Team",
      title: "Mit wem ich baue",
      name: "Daniel F.",
      role: "Lead Developer · Spindare",
      note: "Die Arbeit mit Daniel an Spindare war unschätzbar. Als technischer Leiter hat er mir geholfen, meine Architekturkenntnisse zu verbessern und komplexe Backend-Herausforderungen zu meistern.",
      context: "Mitgründer & Onkel",
    },
    cta: {
      title: "Lust auf eine Zusammenarbeit?",
      sub: "Ich bin offen für Freelance-Projekte, Kollaborationen und interessante Builds.",
      button: "Kontakt aufnehmen",
    },
  },
  devHub: {
    hero: {
      label: "Developer Hub",
      role: "Full-Stack & Mobile-Entwickler · Lecco, Italien",
      sub: "Ich entwickle seit 2023 Produktions-Apps. Derzeit leite ich Spindare — eine Social-Gamification-Plattform für iOS-Launch September 2026 — und nehme Freelance-Projekte an.",
      contact: "Kontakt aufnehmen",
    },
    projects: {
      label: "Aktuelle Projekte",
      title: "Was ich baue",
      spindareRole: "Lead Developer · UI/UX · 3-Personen-Team",
      spindareBadge: "In Entwicklung",
      spindareDesc: "Eine Social-Gamification-Plattform, bei der Nutzer täglich Challenges drehen, erfüllen und mit Freunden teilen. Für iOS und Android mit React Native, TypeScript und Supabase Realtime.",
      travelmeRole: "Solo-Projekt · Full-Stack",
      travelmeBadge: "Demnächst",
      travelmeDesc: "Beschreibe deine Reise in natürlicher Sprache — TravelMe erstellt einen vollständigen Reiseplan mit Flügen, Hotels und Tagesplan. Kein Jonglieren mit 10 Apps mehr.",
    },
    stack: {
      label: "Womit ich arbeite",
      title: "Tech Stack",
    },
    adl: {
      label: "Architekturentscheidungs-Log",
      title: "Warum ich gewählt habe, was ich gewählt habe",
      sub: "Technische Entscheidungen mit Begründung — jede Wahl hat ein Warum.",
    },
    exp: {
      label: "Erfahrung",
      title: "Zeitlinie",
      spindareRole: "Mitgründer & Lead Developer",
      spindareDate: "Jan 2025 – Heute",
      spindareBullets: en.devHub.exp.spindareBullets,
      kiqaRole: "Freelance-Entwickler",
      kiqaDate: "2024 – Heute",
      kiqaBullets: en.devHub.exp.kiqaBullets,
    },
    oss: {
      label: "Open Source",
      title: "Öffentliche Arbeit",
      sub: "Früh in meiner Open-Source-Reise — aber alles, was ich baue, baue ich in der Öffentlichkeit.",
      spindareDesc: "Tägliche Challenge-Social-App. React Native · TypeScript · Supabase. 150k+ Zeilen, 300+ Komponenten.",
      travelmeDesc: "TravelMe — KI-Reiseplaner. React Native · OpenAI API · Node.js · MongoDB.",
      profileDesc: "Alle öffentlichen Repositories, Commit-Historie und laufende Arbeit. Jede Woche mehr.",
      viewProfile: "Profil ansehen",
    },
    cta: {
      title: "Ein Projekt im Sinn?",
      sub: "Offen für Freelance-Arbeit, Kollaborationen und interessante Builds. Verfügbar ab Juni 2026.",
      discord: "Discord",
    },
  },
  contact: {
    hero: {
      label: "Kontakt",
      title: "Kontakt aufnehmen",
      sub: "Erzähl mir von deinem Projekt. Ich antworte innerhalb von 24 Stunden.",
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
      email: "contact@kiqa-dev.it",
      discord: "@kodibkfg",
      github: "github.com/rashica07",
      twitter: "@kristiangjergj4",
      location: "Kosovo / Italien",
      hours: "Antwortzeit",
      hoursValue: "Innerhalb von 24 Stunden",
    },
    map: { title: "Standort — Kosovo" },
    status: {
      title: "Aktueller Status",
      statusLabel: "Status",
      statusValue: "Fokussiert auf Spindare-Launch",
      freelanceLabel: "Verfügbar für Freelance",
      freelanceValue: "Juni 2026",
      bookingLabel: "Buchung für",
      bookingValue: "Juli–August 2026 Projekte",
      responseLabel: "Antwortzeit",
      responseValue: "Innerhalb von 24 Stunden",
    },
    faq: {
      label: "FAQ",
      title: "Häufige Fragen",
      items: [
        { q: "Wie alt bist du?", a: "Ich bin 14. Alter definiert keine Fähigkeiten — mein Code schon. Spindare hat 150k+ Zeilen und 300+ Komponenten. Beurteile die Arbeit, nicht das Geburtsjahr." },
        { q: "Kannst du mit Kunden außerhalb Italiens arbeiten?", a: "Ja. Ich arbeite vollständig remote und habe keine geografischen Einschränkungen. Zeitzonenunterschiede sind handhabbar — ich bin flexibel." },
        { q: "Wie ist deine aktuelle Verfügbarkeit?", a: "Aktuell fokussiert auf Spindares iOS-Launch (September 2026). Offen für neue Freelance-Arbeit ab Juni 2026. Wir können dein Projekt jetzt besprechen und entsprechend planen." },
        { q: "Arbeitest du alleine oder im Team?", a: "Meistens solo — ich übernehme alles von Anfang bis Ende. Für größere Projekte arbeite ich mit Daniel F. (Lead-Entwickler, Spindare-Mitgründer) zusammen, wenn nötig." },
        { q: "Was ist dein Stundensatz?", a: "Hängt von Umfang, Zeitplan und Komplexität ab. Ich arbeite zu Festpreisen — keine stündlichen Überraschungen. Sieh dir die Dienste-Seite für Ausgangsbereiche an." },
        { q: "Kannst du sofort anfangen?", a: "Nicht bis Juni 2026. Spindares Launch hat aktuell Priorität. Ich plane aber gerne im Voraus — Zeitfenster füllen sich, also melde dich jetzt." },
      ],
    },
    errors: {
      fillAll: "Bitte fülle alle Felder aus.",
      invalidEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
      tooLong: "Nachricht muss unter 2000 Zeichen sein.",
      serverError: "Etwas ist schiefgelaufen.",
      networkError: "Netzwerkfehler. Überprüfe deine Verbindung.",
    },
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
  cv: {
    savePdf: "Als PDF speichern", printCv: "CV drucken",
    note: "Der CV-Inhalt ist auf Englisch (internationaler Berufsstandard)",
    generating: "Wird erstellt…",
    summary: "Berufliche Zusammenfassung", experience: "Erfahrung",
    projects: "Projekte", skills: "Technische Fähigkeiten",
    education: "Ausbildung", onePage: "Einseitige Zusammenfassung",
    titleLine: "Full-Stack-Entwickler · Produktdesigner · Mobile Engineer",
    location: "Lecco, Italien · Remote-freundlich",
    summaryText: "Selbstständiger Entwickler mit Spezialisierung auf mobile-first Applikationen und Full-Stack-Entwicklung. Derzeit leite ich die UI/UX-Entwicklung von Spindare, einer Social-Gamification-Plattform mit 300+ Komponenten und produktionsreifer Architektur. Leidenschaft für saubere, performante Produkte, die echte Probleme lösen. Offen für ausgewählte Freelance-Projekte ab Juni 2026.",
    exp: {
      spindare: {
        role: "Mitgründer & Lead UI/UX-Entwickler",
        date: "Jan 2025 – Heute · Remote",
        bullets: [
          "Architektur einer 300+ Komponentenbibliothek und vollständigem Design System für eine React Native App von Grund auf",
          "300+ TypeScript-Komponenten mit umfassender Typsicherheit für iOS und Android entwickelt",
          "Echtzeit-Social-Feed mit Supabase Realtime und Offline-First-Architektur implementiert",
          "Stream Chat für Produktionsmessaging mit JWT-Authentifizierung integriert",
          "Benutzerdefinierter Authentifizierungsfluss mit Clerk-Integration und Supabase-Bansystem entwickelt",
          "App-Bundle-Größe um 40% durch Code-Splitting-Optimierung reduziert",
          "Mit einem verteilten Cross-Functional-Team aus Italien und Albanien zusammengearbeitet",
        ],
        stats: ["300+ Komponenten", "150.000+ Codezeilen", "iOS-Launch Sep 2026"],
      },
      kiqa: {
        role: "Selbstständiger Entwickler",
        date: "2024 – Heute · Italien",
        bullets: [
          "Full-Stack-Entwicklungsdienstleistungen mit Schwerpunkt auf React Native Mobile Apps und Next.js Web-Plattformen",
          "End-to-End-Lieferung: Architektur, UI/UX-Design, Entwicklung, Deployment und Wartung",
          "Mobile App-Entwicklung für iOS und Android; Web-Applikationsentwicklung",
          "Datenbankarchitektur, Cloud-Infrastruktur-Setup und Performance-Optimierung",
        ],
      },
    },
    proj: {
      inDev: "In Entwicklung", hardware: "Hardware", web: "Web", soon: "Demnächst", stack: "Stack",
      spindare: { desc: "Social-Gamification-Plattform — Nutzer drehen ein Rad für tägliche Challenges, erfüllen sie und teilen sie mit Freunden. Für iOS und Android entwickelt mit Echtzeit-Social-Feed, 200+ kuratierten Challenges, Offline-First-Architektur und Produktionsmessaging." },
      console: { desc: "Entwicklung einer leistungsstarken Gaming-Konsole, die Hardware-Expertise mit System-Level-Optimierung verbindet. Custom APU-Architektur, 32 GB Unified RAM, 10 TB Speicher, Titan-Aluminium-Verbundgehäuse mit Flüssigmetallkühlung. Multi-Plattform-Kompatibilität für PS1/2/3/5 und PC." },
      portfolio: { desc: "Professionelles Portfolio zur Präsentation von Entwicklungsarbeiten und Dienstleistungen. Mehrseitige Next.js-Website mit 4-Sprachen-Unterstützung, SEO-Optimierung und Cloudflare CDN-Auslieferung." },
      travel: { desc: "KI-Reiseplaner — beschreibe deine Reise in natürlicher Sprache, erhalte einen vollständigen Reiseplan mit Flügen, Hotels und tagesgenauem Plan." },
    },
    skillLabels: {
      expert: "Experte", proficient: "Fortgeschritten", mobileFront: "Mobile / Frontend",
      backendDb: "Backend & Datenbank", infra: "Infrastruktur & Tools",
      services: "Dienste & APIs", spoken: "Gesprochene Sprachen", practices: "Entwicklungspraktiken",
      spokenValue: "Albanisch (Muttersprache) · Englisch (Fließend) · Italienisch (Mittelstufe) · Deutsch (Grundkenntnisse)",
      practicesValue: "Agile, komponentenbasierte Entwicklung, typsichere Programmierung, Mobile-First-Design, Performance-Optimierung",
    },
    oneP: {
      langs: "Sprachen", frontend: "Frontend", backend: "Backend", tools: "Tools",
      expLabel: "Erfahrung", approach: "Ansatz", contact: "Kontakt",
      tagline: "Selbstständiger Entwickler, der produktionsreife Apps mit modernen Tech-Stacks baut.",
      approachValue: "Schnell liefern. Ständig iterieren. Dinge bauen, die Menschen nutzen.",
      spindareExp: "Lead UI/UX für Social Mobile App",
      freelanceExp: "Full-Stack-Entwicklungsdienstleistungen",
      selfTaughtExp: "Intensives Selbststudium Programmierung",
      freelance: "Freelance", selfTaught: "Autodidaktisch",
    },
    edu: {
      role: "Autodidaktischer Entwickler",
      desc: "Intensives Selbststudium mit Fokus auf moderne Web- und Mobile-Entwicklung. Fortschritt von Frontend-Grundlagen bis hin zu produktionsreifen Full-Stack-Anwendungen.",
      bullets: [
        "Frontend: HTML/CSS → JavaScript → React → React Native → TypeScript",
        "Backend: REST APIs → PostgreSQL → Supabase → Serverless Edge Computing",
        "Infrastruktur: Git → CI/CD → Cloud-Deployment → Produktionsüberwachung",
      ],
    },
  },
  ticker: {
    items: [
      "FULL STACK ENTWICKLER", "MOBILE APPS", "WEB PLATTFORMEN",
      "REACT NATIVE", "NEXT.JS", "OFFEN FÜR FREELANCE",
      "14 JAHRE ALT", "BASIERT IN ITALIEN", "TYPESCRIPT", "SUPABASE",
    ],
  },
};

const it: typeof en = {
  nav: {
    home: "Home", services: "Servizi", portfolio: "Portfolio",
    blog: "Blog", about: "Chi sono", contact: "Contatti", quote: "Richiedi un preventivo",
  },
  home: {
    hero: {
      badge: "Kristian Gjergji · Sviluppatore · Lecco, Italia",
      h1: "Creo app", h2: "che funzionano.",
      sub: "14 anni, vivo a Lecco. Faccio mobile e web — React Native, Next.js, Supabase. Serio su quello che costruisco.",
      spindare: "In sviluppo ora",
      avail: "Disponibile per freelance da giugno 2026",
      cta1: "Vedi Portfolio", cta2: "Contattami",
    },
    services: {
      label: "Servizi",
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
      title: "Accetto progetti dalla metà del 2026.",
      sub: "Attualmente concentrato su Spindare — lancio iOS settembre 2026. Alcuni slot freelance disponibili dopo.",
      button: "Contattami",
    },
    testimonials: {
      label: "Da clienti e collaboratori",
      title: "A modo loro",
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
    caseStudies: {
      label: "Casi Studio",
      title: "Sotto il cofano",
      sub: "Decisioni architetturali, profondità tecnica e cosa ha richiesto davvero costruirli.",
    },
  },
  blog: {
    hero: {
      label: "Blog",
      title: "Articoli",
      sub: "Pensieri su codice, prodotti e sviluppo veloce.",
    },
    readMore: "Leggi articolo", minRead: "min di lettura",
    categories: ["Tutti", "React Native", "Architettura", "Backend", "Design"],
    posts: [
      {
        slug: "flatlist-memory-leak",
        category: "React Native",
        title: "Come ho risolto un memory leak in FlatList che mandava in crash il social feed di Spindare",
        excerpt: "Un feed in tempo reale con 1.000+ post stava rallentando fino a bloccarsi. Ecco come ho individuato il leak e risolto il problema definitivamente.",
        date: "28 mar 2026", read: 7,
      },
      {
        slug: "auth-flow-48-hours",
        category: "Architecture",
        title: "Perché ho riscritto il flusso di autenticazione di Spindare in 48 ore — senza rimpianti",
        excerpt: "Il vecchio setup di autenticazione funzionava bene — finché non ha smesso. Un'analisi onesta della decisione, della riscrittura e di cosa farei diversamente.",
        date: "14 mar 2026", read: 9,
      },
      {
        slug: "supabase-vs-firebase",
        category: "Backend",
        title: "Supabase Realtime vs Firebase per i social feed: cosa ho scoperto dopo aver testato entrambi",
        excerpt: "Avevo bisogno di un feed in tempo reale per 10.000+ utenti simultanei. Entrambi lo promettevano. Solo uno ha mantenuto la promessa.",
        date: "22 feb 2026", read: 11,
      },
      {
        slug: "react-native-design-system",
        category: "Design",
        title: "Costruire un design system per un'app React Native con 300 componenti",
        excerpt: "Quando la tua app ha 300 componenti e 3 sviluppatori, i design token non sono opzionali. Ecco come li abbiamo costruiti.",
        date: "8 feb 2026", read: 8,
      },
    ],
    newsletter: {
      title: "Ricevi aggiornamenti quando pubblico qualcosa di nuovo",
      sub: "Niente spam. Post occasionali, progetti e cose che vale la pena leggere.",
      done: "Ci sei. Ti contatterò.",
      subscribe: "Iscriviti",
      sending: "...",
    },
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
        { title: "Imparo costruendo", desc: "Ogni progetto mi insegna qualcosa di nuovo. Preferisco costruire e imparare piuttosto che pianificare all'infinito." },
        { title: "Prima funziona, poi migliora", desc: "La prima versione esce veloce. Poi miglioro in base a quello che conta davvero." },
        { title: "TypeScript ovunque", desc: "Scrivo TypeScript per tutto. Trova i bug presto e rende il refactoring indolore." },
        { title: "Finisco quello che inizio", desc: "Se prendo un progetto, lo porto a termine. Nessun prototipo lasciato a metà." },
      ],
    },
    collab: {
      label: "Il team",
      title: "Con chi costruisco",
      name: "Daniel F.",
      role: "Lead Developer · Spindare",
      note: "Lavorare con Daniel su Spindare è stato prezioso. Come responsabile tecnico, mi ha aiutato a migliorare le mie competenze architetturali e ad affrontare sfide backend complesse.",
      context: "Co-fondatore e zio",
    },
    cta: {
      title: "Vuoi lavorare insieme?",
      sub: "Sono disponibile per progetti freelance, collaborazioni e build interessanti.",
      button: "Contattami",
    },
  },
  devHub: {
    hero: {
      label: "Developer Hub",
      role: "Sviluppatore full-stack & mobile · Lecco, Italia",
      sub: "Sviluppo app in produzione dal 2023. Attualmente guidando Spindare — una piattaforma di gamification sociale con lancio iOS settembre 2026 — mentre accetto progetti freelance.",
      contact: "Contattami",
    },
    projects: {
      label: "Progetti Attuali",
      title: "Cosa sto costruendo",
      spindareRole: "Lead Developer · UI/UX · Team di 3 persone",
      spindareBadge: "In Sviluppo",
      spindareDesc: "Una piattaforma di gamification sociale dove gli utenti girano per sfide giornaliere, le completano e le condividono con gli amici. Per iOS e Android con React Native, TypeScript e Supabase Realtime.",
      travelmeRole: "Progetto Solo · Full-stack",
      travelmeBadge: "Prossimamente",
      travelmeDesc: "Descrivi il tuo viaggio in linguaggio naturale — TravelMe genera un itinerario completo: voli, hotel, esperienze locali, piano giornaliero. Niente più 10 app da gestire.",
    },
    stack: {
      label: "Con cosa lavoro",
      title: "Tech stack",
    },
    adl: {
      label: "Registro Decisioni Architetturali",
      title: "Perché ho scelto quello che ho scelto",
      sub: "Decisioni tecniche con motivazioni — ogni scelta ha un perché.",
    },
    exp: {
      label: "Esperienza",
      title: "Cronologia",
      spindareRole: "Co-Fondatore & Lead Developer",
      spindareDate: "Gen 2025 – Presente",
      spindareBullets: en.devHub.exp.spindareBullets,
      kiqaRole: "Sviluppatore Freelance",
      kiqaDate: "2024 – Presente",
      kiqaBullets: en.devHub.exp.kiqaBullets,
    },
    oss: {
      label: "Open Source",
      title: "Lavoro pubblico",
      sub: "All'inizio del mio percorso open source — ma tutto quello che costruisco lo costruisco in pubblico.",
      spindareDesc: "App social di sfide giornaliere. React Native · TypeScript · Supabase. 150k+ righe, 300+ componenti.",
      travelmeDesc: "TravelMe — pianificatore viaggi AI. React Native · OpenAI API · Node.js · MongoDB.",
      profileDesc: "Tutti i repository pubblici, la cronologia dei commit e il lavoro in corso. Ogni settimana di più.",
      viewProfile: "Vedi profilo",
    },
    cta: {
      title: "Hai un progetto in mente?",
      sub: "Aperto a lavoro freelance, collaborazioni e build interessanti. Disponibile da giugno 2026.",
      discord: "Discord",
    },
  },
  contact: {
    hero: {
      label: "Contatti",
      title: "Contattami",
      sub: "Parlami del tuo progetto. Rispondo entro 24 ore.",
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
      email: "contact@kiqa-dev.it",
      discord: "@kodibkfg",
      github: "github.com/rashica07",
      twitter: "@kristiangjergj4",
      location: "Kosovo / Italia",
      hours: "Tempo di risposta",
      hoursValue: "Entro 24 ore",
    },
    map: { title: "Posizione — Kosovo" },
    status: {
      title: "Stato Attuale",
      statusLabel: "Stato",
      statusValue: "Concentrato sul lancio di Spindare",
      freelanceLabel: "Disponibile per freelance",
      freelanceValue: "Giugno 2026",
      bookingLabel: "Prenotazioni per",
      bookingValue: "Progetti luglio–agosto 2026",
      responseLabel: "Tempo di risposta",
      responseValue: "Entro 24 ore",
    },
    faq: {
      label: "FAQ",
      title: "Domande frequenti",
      items: [
        { q: "Quanti anni hai?", a: "Ho 14 anni. L'età non definisce le competenze — il mio codice sì. Spindare ha 150k+ righe e 300+ componenti. Giudica il lavoro, non l'anno di nascita." },
        { q: "Puoi lavorare con clienti fuori dall'Italia?", a: "Sì. Lavoro completamente da remoto e non ho restrizioni geografiche. Le differenze di fuso orario sono gestibili — sono flessibile." },
        { q: "Qual è la tua disponibilità attuale?", a: "Attualmente concentrato sul lancio iOS di Spindare (settembre 2026). Aperto a nuovi lavori freelance da giugno 2026. Possiamo discutere il tuo progetto ora e pianificare di conseguenza." },
        { q: "Lavori da solo o con un team?", a: "Di solito da solo — gestisco tutto dall'inizio alla fine. Per progetti più grandi, collaboro con Daniel F. (Lead Developer, co-fondatore Spindare) quando necessario." },
        { q: "Qual è la tua tariffa?", a: "Dipende da portata, tempi e complessità. Lavoro a prezzi fissi — nessuna sorpresa oraria. Vedi la pagina Servizi per i prezzi di partenza." },
        { q: "Puoi iniziare subito?", a: "Non prima di giugno 2026. Il lancio di Spindare è la priorità attuale. Sono però felice di pianificare in anticipo — i posti si riempiono, quindi contattami ora." },
      ],
    },
    errors: {
      fillAll: "Per favore compila tutti i campi.",
      invalidEmail: "Per favore inserisci un'email valida.",
      tooLong: "Il messaggio deve essere sotto i 2000 caratteri.",
      serverError: "Qualcosa è andato storto.",
      networkError: "Errore di rete. Controlla la connessione.",
    },
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
  cv: {
    savePdf: "Salva come PDF", printCv: "Stampa CV",
    note: "Il contenuto del CV è in inglese (standard professionale internazionale)",
    generating: "Generazione in corso…",
    summary: "Profilo Professionale", experience: "Esperienza",
    projects: "Progetti", skills: "Competenze Tecniche",
    education: "Formazione", onePage: "Riepilogo in Una Pagina",
    titleLine: "Sviluppatore Full-Stack · Product Designer · Mobile Engineer",
    location: "Lecco, Italia · Disponibile da remoto",
    summaryText: "Sviluppatore autonomo specializzato in applicazioni mobile-first e sviluppo full-stack. Attualmente guido lo sviluppo UI/UX di Spindare, una piattaforma di gamification sociale con 300+ componenti e architettura di produzione. Appassionato di prodotti performanti che risolvono problemi reali. Disponibile per progetti freelance selezionati a partire da giugno 2026.",
    exp: {
      spindare: {
        role: "Co-Fondatore & Lead UI/UX Developer",
        date: "Gen 2025 – Presente · Remoto",
        bullets: [
          "Progettato una libreria di 300+ componenti e un design system completo per un'app React Native da zero",
          "Sviluppato 300+ componenti TypeScript con type safety completa per iOS e Android",
          "Implementato un social feed in tempo reale con Supabase Realtime e architettura offline-first",
          "Integrato Stream Chat per la messaggistica in produzione con autenticazione JWT",
          "Sviluppato un flusso di autenticazione personalizzato con integrazione Clerk e sistema di ban Supabase",
          "Ridotto la dimensione del bundle dell'app del 40% tramite ottimizzazione del code-splitting",
          "Collaborato con un team distribuito e cross-funzionale tra Italia e Albania",
        ],
        stats: ["300+ componenti", "150.000+ righe di codice", "Lancio iOS set 2026"],
      },
      kiqa: {
        role: "Sviluppatore Autonomo",
        date: "2024 – Presente · Italia",
        bullets: [
          "Servizi di sviluppo full-stack con focus su app mobile React Native e piattaforme web Next.js",
          "Consegna end-to-end: architettura, design UI/UX, sviluppo, deployment e manutenzione",
          "Sviluppo di app mobile per iOS e Android; sviluppo di applicazioni web",
          "Architettura database, configurazione infrastruttura cloud e ottimizzazione delle performance",
        ],
      },
    },
    proj: {
      inDev: "In Sviluppo", hardware: "Hardware", web: "Web", soon: "Prossimamente", stack: "Stack",
      spindare: { desc: "Piattaforma di gamification sociale — gli utenti girano una ruota per sfide giornaliere, le completano e le condividono con gli amici. Sviluppata per iOS e Android con social feed in tempo reale, 200+ sfide curate, architettura offline-first e messaggistica di produzione." },
      console: { desc: "Progettazione di una console da gioco personalizzata ad alte prestazioni che combina competenze hardware con ottimizzazione a livello di sistema. Architettura APU personalizzata, 32 GB di RAM unificata, 10 TB di storage, chassis in titanio/alluminio composito con raffreddamento a metallo liquido. Compatibilità multi-piattaforma con PS1/2/3/5 e PC." },
      portfolio: { desc: "Portfolio professionale che presenta lavori di sviluppo e servizi. Sito Next.js multi-pagina con supporto a 4 lingue, ottimizzazione SEO e distribuzione Cloudflare CDN." },
      travel: { desc: "Pianificatore di viaggi AI — descrivi il tuo viaggio in linguaggio naturale, ottieni un itinerario completo con voli, hotel e piano giornaliero." },
    },
    skillLabels: {
      expert: "Esperto", proficient: "Avanzato", mobileFront: "Mobile / Frontend",
      backendDb: "Backend & Database", infra: "Infrastruttura & Tools",
      services: "Servizi & API", spoken: "Lingue Parlate", practices: "Pratiche di Sviluppo",
      spokenValue: "Albanese (Madrelingua) · Inglese (Fluente) · Italiano (Intermedio) · Tedesco (Base)",
      practicesValue: "Agile, sviluppo component-driven, programmazione type-safe, design mobile-first, ottimizzazione delle performance",
    },
    oneP: {
      langs: "Linguaggi", frontend: "Frontend", backend: "Backend", tools: "Tools",
      expLabel: "Esperienza", approach: "Approccio", contact: "Contatti",
      tagline: "Sviluppatore autonomo che crea applicazioni di produzione con stack tecnologici moderni.",
      approachValue: "Consegna rapida. Iterazione costante. Prodotti che le persone usano.",
      spindareExp: "Lead UI/UX per app mobile sociale",
      freelanceExp: "Servizi di sviluppo full-stack",
      selfTaughtExp: "Formazione informatica intensiva autodidatta",
      freelance: "Freelance", selfTaught: "Autodidatta",
    },
    edu: {
      role: "Sviluppatore Autodidatta",
      desc: "Apprendimento autodiretto intensivo focalizzato sullo sviluppo web e mobile moderno. Progressione dalle basi del frontend ad applicazioni full-stack di livello produzione.",
      bullets: [
        "Frontend: HTML/CSS → JavaScript → React → React Native → TypeScript",
        "Backend: REST APIs → PostgreSQL → Supabase → Edge computing serverless",
        "Infrastruttura: Git → CI/CD → Cloud deployment → Monitoraggio in produzione",
      ],
    },
  },
  ticker: {
    items: [
      "SVILUPPATORE FULL STACK", "APP MOBILE", "PIATTAFORME WEB",
      "REACT NATIVE", "NEXT.JS", "APERTO AL FREELANCE",
      "14 ANNI", "BASATO IN ITALIA", "TYPESCRIPT", "SUPABASE",
    ],
  },
};

const sq: typeof en = {
  nav: {
    home: "Kryefaqja", services: "Shërbime", portfolio: "Portofol",
    blog: "Blog", about: "Rreth meje", contact: "Kontakt", quote: "Kërko ofertë",
  },
  home: {
    hero: {
      badge: "Kristian Gjergji · Zhvillues · Lecco, Itali",
      h1: "Ndërtoj aplikacione", h2: "që funksionojnë.",
      sub: "14 vjeç, i bazuar në Lecco. Bëj mobile dhe web — React Native, Next.js, Supabase. Serioz për atë që ndërtoj.",
      spindare: "Aktualisht në zhvillim",
      avail: "I disponueshëm për freelance nga qershori 2026",
      cta1: "Shiko Portofolin", cta2: "Na kontaktoni",
    },
    services: {
      label: "Shërbime",
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
      title: "Pranoj projekte nga mesi i 2026.",
      sub: "Aktualisht i fokusuar te Spindare — lansim iOS shtator 2026. Disa vende freelance pas kësaj.",
      button: "Na kontaktoni",
    },
    testimonials: {
      label: "Nga klientët & bashkëpunëtorët",
      title: "Me fjalët e tyre",
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
    caseStudies: {
      label: "Studime Rasti",
      title: "Nën kapakun",
      sub: "Vendimet arkitekturore, thellësia teknike dhe çfarë duhej vërtet për t'i ndërtuar.",
    },
  },
  blog: {
    hero: {
      label: "Blog",
      title: "Shkrime",
      sub: "Mendime mbi kod, ndërtim produktesh dhe lansim të shpejtë.",
    },
    readMore: "Lexo postin", minRead: "min lexim",
    categories: ["Të gjitha", "React Native", "Arkitekturë", "Backend", "Dizajn"],
    posts: [
      {
        slug: "flatlist-memory-leak",
        category: "React Native",
        title: "Si e zgjidha një rrjedhje memorie në FlatList që rrëzonte feed-in social të Spindare",
        excerpt: "Një feed në kohë reale me 1.000+ postime ishte duke u ngadalësuar deri në ndalje. Ja si e gjurmova rrjedhjen dhe e zgjidha përfundimisht.",
        date: "28 mar 2026", read: 7,
      },
      {
        slug: "auth-flow-48-hours",
        category: "Architecture",
        title: "Pse e rikonstruova rrjedhën e autentikimit të Spindare në 48 orë — pa pendim",
        excerpt: "Konfigurimi i vjetër i autentikimit funksiononte mirë — derisa nuk funksionoi. Një analizë e ndershme e vendimit, rishkrimit dhe çfarë do të bëja ndryshe.",
        date: "14 mar 2026", read: 9,
      },
      {
        slug: "supabase-vs-firebase",
        category: "Backend",
        title: "Supabase Realtime vs Firebase për feed-et sociale: çfarë gjeta pasi i testova të dyja",
        excerpt: "Kisha nevojë për një feed në kohë reale për 10.000+ përdorues të njëkohshëm. Të dyja premtuan. Vetëm njëra dha.",
        date: "22 shk 2026", read: 11,
      },
      {
        slug: "react-native-design-system",
        category: "Design",
        title: "Ndërtimi i një sistemi dizajni për një aplikacion React Native me 300 komponente",
        excerpt: "Kur aplikacioni yt ka 300 komponente dhe 3 zhvillues, design token-at nuk janë opsionale. Kështu i ndërtuam tonën.",
        date: "8 shk 2026", read: 8,
      },
    ],
    newsletter: {
      title: "Merr përditësime kur publikoj diçka të re",
      sub: "Pa spam. Postime të rastit, projekte dhe gjëra që ia vlen të lexosh.",
      done: "Je brenda. Do të kontaktoj.",
      subscribe: "Abonohu",
      sending: "...",
    },
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
        { title: "Mësoj duke ndërtuar", desc: "Çdo projekt më mëson diçka të re. Preferoj të ndërtoj dhe mësoj sesa të planifikoj përgjithmonë." },
        { title: "Fillimisht funksionon, pastaj përmirësohet", desc: "Versioni i parë del shpejt. Pastaj përmirësoj bazuar në atë që ka rëndësi." },
        { title: "TypeScript kudo", desc: "Shkruaj TypeScript për gjithçka. Kap gabimet herët dhe e bën refaktorimin pa dhimbje." },
        { title: "Mbaroj atë që filloj", desc: "Nëse marr një projekt, e çoj deri në fund. Asnjë prototip i lënë përgjysmë." },
      ],
    },
    collab: {
      label: "Ekipi",
      title: "Me kë ndërtoj",
      name: "Daniel F.",
      role: "Lead Developer · Spindare",
      note: "Puna me Danielin në Spindare ka qenë shumë e çmuar. Si drejtues teknik, ai m'ka ndihmuar të ngre aftësitë e mia të arkitekturës dhe të kaloj sfidat komplekse të backend-it.",
      context: "Bashkëthemelues & xhaxhai",
    },
    cta: {
      title: "Doni të punoni bashkë?",
      sub: "Jam i hapur për projekte freelance, bashkëpunime dhe ndërtime interesante.",
      button: "Na kontaktoni",
    },
  },
  devHub: {
    hero: {
      label: "Developer Hub",
      role: "Zhvillues full-stack & mobile · Lecco, Itali",
      sub: "Duke zhvilluar aplikacione produksioni nga 2023. Aktualisht duke drejtuar Spindare — një platformë gamifikimi social me lansim iOS shtator 2026 — duke pranuar edhe projekte freelance.",
      contact: "Na kontaktoni",
    },
    projects: {
      label: "Projektet Aktuale",
      title: "Çfarë po ndërtoj",
      spindareRole: "Lead Developer · UI/UX · Ekip me 3 persona",
      spindareBadge: "Në Zhvillim",
      spindareDesc: "Një platformë gamifikimi social ku përdoruesit rrotullojnë për sfida ditore, i përfundojnë dhe i ndajnë me miqtë. Ndërtuar për iOS dhe Android me React Native, TypeScript dhe Supabase Realtime.",
      travelmeRole: "Projekt Solo · Full-stack",
      travelmeBadge: "Së shpejti",
      travelmeDesc: "Përshkruaj udhëtimin tënd në gjuhë të zakonshme — TravelMe gjeneron një itinerar të plotë: fluturime, hotele, eksperienca lokale, plan ditor. Asnjë zhurmë me 10 aplikacione.",
    },
    stack: {
      label: "Me çfarë punoj",
      title: "Tech stack",
    },
    adl: {
      label: "Regjistri i Vendimeve Arkitekturore",
      title: "Pse zgjodha atë që zgjodha",
      sub: "Vendime teknike me arsyetime — çdo zgjedhje ka arsyen e saj.",
    },
    exp: {
      label: "Eksperiencë",
      title: "Afati kohor",
      spindareRole: "Bashkëthemelues & Lead Developer",
      spindareDate: "Jan 2025 – Tani",
      spindareBullets: en.devHub.exp.spindareBullets,
      kiqaRole: "Zhvillues Freelance",
      kiqaDate: "2024 – Tani",
      kiqaBullets: en.devHub.exp.kiqaBullets,
    },
    oss: {
      label: "Open Source",
      title: "Punë publike",
      sub: "Hershëm në udhëtimin tim open source — por gjithçka që ndërtoj, e ndërtoj publikisht.",
      spindareDesc: "Aplikacion social i sfidave ditore. React Native · TypeScript · Supabase. 150k+ rreshta, 300+ komponente.",
      travelmeDesc: "TravelMe — planifikues udhëtimesh AI. React Native · OpenAI API · Node.js · MongoDB.",
      profileDesc: "Të gjitha depot publike, historiku i commit-eve dhe punë aktuale. Çdo javë më shumë.",
      viewProfile: "Shiko profilin",
    },
    cta: {
      title: "Keni një projekt në mendje?",
      sub: "I hapur për punë freelance, bashkëpunime dhe ndërtime interesante. I disponueshëm nga qershori 2026.",
      discord: "Discord",
    },
  },
  contact: {
    hero: {
      label: "Kontakt",
      title: "Na kontaktoni",
      sub: "Tregomëni për projektin tuaj. Përgjigjem brenda 24 orëve.",
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
      email: "contact@kiqa-dev.it",
      discord: "@kodibkfg",
      github: "github.com/rashica07",
      twitter: "@kristiangjergj4",
      location: "Kosovë / Itali",
      hours: "Koha e përgjigjes",
      hoursValue: "Brenda 24 orëve",
    },
    map: { title: "Vendndodhja — Kosovë" },
    status: {
      title: "Statusi Aktual",
      statusLabel: "Statusi",
      statusValue: "I fokusuar në lansimin e Spindare",
      freelanceLabel: "I disponueshëm për freelance",
      freelanceValue: "Qershor 2026",
      bookingLabel: "Rezervime për",
      bookingValue: "Projekte korrik–gusht 2026",
      responseLabel: "Koha e përgjigjes",
      responseValue: "Brenda 24 orëve",
    },
    faq: {
      label: "FAQ",
      title: "Pyetje të shpeshta",
      items: [
        { q: "Sa vjeç je?", a: "Jam 14 vjeç. Mosha nuk përcakton aftësinë — kodi im po. Spindare ka 150k+ rreshta dhe 300+ komponentë. Gjyko punën, jo vitin e lindjes." },
        { q: "Mund të punosh me klientë jashtë Italisë?", a: "Po. Punoj plotësisht nga distanca dhe nuk kam kufizime gjeografike. Ndryshimet e orës janë të menaxhueshme — jam fleksibël." },
        { q: "Cila është disponueshmëria jote aktuale?", a: "Aktualisht i fokusuar në lansimin iOS të Spindare (shtator 2026). I hapur për punë të re freelance nga qershori 2026. Mund të diskutojmë projektin tënd tani dhe të planifikojmë." },
        { q: "Punon vetëm apo me ekip?", a: "Zakonisht vetëm — trajtoj gjithçka nga fillimi në fund. Për projekte më të mëdha, bashkëpunoj me Daniel F. (Drejtuesi kryesor, bashkëthemelues Spindare) kur nevojitet." },
        { q: "Cili është tarifa jote?", a: "Varet nga qëllimi, afati dhe kompleksiteti. Punoj me çmime fikse — pa surpriza orare. Shiko faqen e Shërbimeve për diapazones e fillimit." },
        { q: "Mund të fillosh menjëherë?", a: "Jo deri në qershor 2026. Lansimi i Spindare është prioriteti aktual. Megjithatë, jam i lumtur të planifikoj paraprakisht — hapësirat mbushen, kështu që kontaktomë tani." },
      ],
    },
    errors: {
      fillAll: "Ju lutemi plotësoni të gjitha fushat.",
      invalidEmail: "Ju lutemi vendosni një email të vlefshëm.",
      tooLong: "Mesazhi duhet të jetë nën 2000 karaktere.",
      serverError: "Diçka shkoi gabim.",
      networkError: "Gabim rrjeti. Kontrollo lidhjen.",
    },
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
  cv: {
    savePdf: "Ruaj si PDF", printCv: "Printo CV",
    note: "Përmbajtja e CV-së është në anglisht (standard ndërkombëtar profesional)",
    generating: "Duke gjeneruar…",
    summary: "Profili Profesional", experience: "Eksperiencë",
    projects: "Projekte", skills: "Aftësi Teknike",
    education: "Arsimim", onePage: "Përmbledhje në Një Faqe",
    titleLine: "Zhvillues Full-Stack · Dizajner Produkti · Inxhinier Mobile",
    location: "Lecco, Itali · Punë nga distanca",
    summaryText: "Zhvillues i pavarur i specializuar në aplikacione mobile-first dhe zhvillim full-stack. Aktualisht drejtoj zhvillimin UI/UX të Spindare, një platformë gamifikimi social me 300+ komponente dhe arkitekturë të nivelit të prodhimit. I apasionuar pas produkteve të pastra dhe performante që zgjidhin probleme reale. I hapur për projekte të zgjedhura freelance duke filluar nga qershori 2026.",
    exp: {
      spindare: {
        role: "Bashkëthemelues & Drejtues UI/UX",
        date: "Jan 2025 – Tani · Distancë",
        bullets: [
          "Hartoi një bibliotekë me 300+ komponentë dhe sistem të plotë dizajni për aplikacionin React Native nga e para",
          "Ndërtoi 300+ komponentë TypeScript me siguri të plotë tipash për iOS dhe Android",
          "Implementoi feed social në kohë reale me abonim Supabase Realtime dhe arkitekturë offline-first",
          "Integroi Stream Chat për mesazhe në prodhim me autentikim JWT",
          "Ndërtoi rrjedhë autentikimi të personalizuar me integrim Clerk dhe sistem ndalimesh Supabase",
          "Reduktoi madhësinë e bundle-it të aplikacionit me 40% nëpërmjet optimizimit të code-splitting",
          "Bashkëpunoi me ekip të shpërndarë ndërkombëtar midis Italisë dhe Shqipërisë",
        ],
        stats: ["300+ komponente", "150.000+ rreshta kodi", "Lansim iOS shtator 2026"],
      },
      kiqa: {
        role: "Zhvillues i Pavarur",
        date: "2024 – Tani · Itali",
        bullets: [
          "Shërbime zhvillimi full-stack me fokus në aplikacione mobile React Native dhe platforma web Next.js",
          "Dorëzim nga fillimi në fund: arkitekturë, dizajn UI/UX, zhvillim, deployment dhe mirëmbajtje",
          "Zhvillim aplikacionesh mobile për iOS dhe Android; zhvillim aplikacionesh web",
          "Arkitekturë bazash të dhënash, konfigurim infrastrukturë cloud dhe optimizim performance",
        ],
      },
    },
    proj: {
      inDev: "Në Zhvillim", hardware: "Hardware", web: "Web", soon: "Së Shpejti", stack: "Stack",
      spindare: { desc: "Platformë gamifikimi social — përdoruesit rrotullojnë një rrotë për sfida ditore, i përfundojnë dhe i ndajnë me miqtë. Ndërtuar për iOS dhe Android me feed social në kohë reale, 200+ sfida të kuruar, arkitekturë offline-first dhe mesazhe të nivelit të prodhimit." },
      console: { desc: "Inxhinierimi i një konsolle lojrash me performancë të lartë që kombinon ekspertizën hardware me optimizimin e nivelit të sistemit. Arkitekturë APU e personalizuar, 32 GB RAM të unifikuar, 10 TB ruajtje, kabinë titani/alumin kompozit me ftohje metali të lëngët. Pajtueshmëri me shumë platforma për PS1/2/3/5 dhe PC." },
      portfolio: { desc: "Portofol profesional që paraqet punët e zhvillimit dhe shërbimet. Faqe shumë-faqe Next.js me mbështetje 4 gjuhësh, optimizim SEO dhe shpërndarje Cloudflare CDN." },
      travel: { desc: "Planifikues udhëtimesh AI — përshkruaj udhëtimin tënd në gjuhë të natyrshme, merr një itinerar të plotë me fluturime, hotele dhe plan ditor." },
    },
    skillLabels: {
      expert: "Ekspert", proficient: "I avancuar", mobileFront: "Mobile / Frontend",
      backendDb: "Backend & Bazë të Dhënash", infra: "Infrastrukturë & Tools",
      services: "Shërbime & API", spoken: "Gjuhë të Folura", practices: "Praktika Zhvillimi",
      spokenValue: "Shqip (Amtare) · Anglisht (Rrjedhshëm) · Italisht (Mesatar) · Gjermanisht (Bazë)",
      practicesValue: "Agile, zhvillim i drejtuar nga komponente, programim i sigurt me tipa, dizajn mobile-first, optimizim performance",
    },
    oneP: {
      langs: "Gjuhë", frontend: "Frontend", backend: "Backend", tools: "Tools",
      expLabel: "Eksperiencë", approach: "Qasja", contact: "Kontakt",
      tagline: "Zhvillues i pavarur që ndërton aplikacione të nivelit prodhues me stack-e moderne.",
      approachValue: "Dorëzo shpejt. Itero vazhdimisht. Ndërto gjëra që njerëzit i përdorin.",
      spindareExp: "Drejtues UI/UX për aplikacion mobile social",
      freelanceExp: "Shërbime zhvillimi full-stack",
      selfTaughtExp: "Arsimim intensiv autodidakt programimi",
      freelance: "Freelance", selfTaught: "Autodidakt",
    },
    edu: {
      role: "Zhvillues Autodidakt",
      desc: "Mësim intensiv i drejtuar nga vetja i fokusuar në zhvillimin modern të web dhe mobile. Progresion nga bazat e frontend-it deri në aplikacione full-stack të nivelit të prodhimit.",
      bullets: [
        "Frontend: HTML/CSS → JavaScript → React → React Native → TypeScript",
        "Backend: REST APIs → PostgreSQL → Supabase → Serverless edge computing",
        "Infrastrukturë: Git → CI/CD → Deployment në cloud → Monitorim prodhimi",
      ],
    },
  },
  ticker: {
    items: [
      "ZHVILLUES FULL STACK", "APLIKACIONE MOBILE", "PLATFORMA WEB",
      "REACT NATIVE", "NEXT.JS", "I HAPUR PËR FREELANCE",
      "14 VJEÇ", "BAZUAR NË ITALI", "TYPESCRIPT", "SUPABASE",
    ],
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
