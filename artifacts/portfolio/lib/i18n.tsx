'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "it" | "sq" | "de";

export const translations = {
  en: {
    nav: { home: "Home", services: "Services", portfolio: "Work", blog: "Writing", about: "About", contact: "Contact", quote: "Start a Project" },
    hero: {
      badge: "Available for new projects · Kosovo / Italy",
      h1Line1: "I build digital products",
      h1Line2: "your customers",
      h1Line3: "actually use —",
      h1Line4: "and come back to.",
      sub: "I take ideas from a conversation to a live product. Apps, websites, and online platforms — built to perform, delivered on time, no surprises.",
      cta1: "Tell me about your project",
      cta2: "See my work",
      available: "Taking on new projects from August 2026"
    },
    services: {
      label: "Services",
      title: "Clear price. Clear scope. Done.",
      sub: "No hidden costs, no delays, no middlemen. Every project comes with a fixed price and a delivery date I stand behind.",
      getProposal: "Get a proposal for this service",
      items: [
        {
          name: "Mobile App",
          tagline: "Your idea, live on the App Store and Google Play in 6 weeks.",
          price: "From €799",
          timeline: "6 weeks",
          desc: "I build your app from start to finish — design, development, and submission to both stores. One fixed price, one point of contact, six weeks.",
          features: ["React Native", "iOS & Android", "Supabase", "App Store & Play Store submission", "Push notifications", "30-day support after launch"]
        },
        {
          name: "Landing Page",
          tagline: "A website that makes people stop and pay attention — in 7 days.",
          price: "From €299",
          timeline: "7 days",
          desc: "A fast, good-looking page built to turn visitors into customers. Delivered in 7 days, ready to generate leads from day one.",
          features: ["Next.js", "3D visuals & animations", "Optimised for search engines", "Fast load on all devices", "Vercel + Cloudflare", "Ready for a content system"]
        },
        {
          name: "Web Platform",
          tagline: "A full product on the web — accounts, payments, dashboards — in 3 weeks.",
          price: "From €1,299",
          timeline: "3 weeks",
          desc: "Everything your business needs in one product: user accounts, payments, dashboards, and more. Built to handle real usage from day one.",
          features: ["Next.js", "Supabase / PostgreSQL", "User accounts & login", "Admin dashboard", "Live data updates", "Deployment included"]
        },
        {
          name: "Custom Backend",
          tagline: "The foundation your product needs — built in 2 weeks.",
          price: "From €499",
          timeline: "2 weeks",
          desc: "A solid, reliable backbone for your app or website. Built to scale as your business grows, with full documentation handed over at the end.",
          features: ["Node.js", "PostgreSQL", "Login & user management", "File storage", "Live data sync", "Full documentation"]
        }
      ]
    },
    work: {
      label: "Selected Work",
      title: "Real projects. Real results.",
      projects: [
        {
          name: "Torre Group",
          type: "Web",
          status: "Live",
          year: "2024",
          desc: "A corporate web platform for Torre Group, comprising MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA, and TORRE HOME. Premium design reflecting high-quality construction and real estate.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"]
        },
        {
          name: "Spindare",
          type: "Mobile",
          status: "In Development",
          year: "2025–2026",
          desc: "A social app where users earn rewards for their daily habits. I led the entire product — from the first screen to launch preparation. Shipping on iOS this September.",
          stack: ["React Native", "TypeScript", "Supabase", "Clerk", "Expo"]
        },
        {
          name: "TravelMe",
          type: "Mobile",
          status: "Coming Soon",
          year: "2026",
          desc: "An app that plans your entire trip from a single message. Tell it where you want to go and what you're into, and it handles everything else.",
          stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"]
        },
        {
          name: "KIQA DEV",
          type: "Web",
          status: "Live",
          year: "2026",
          desc: "This site — built in four languages, with smooth animations and a 3D background. Designed to get clients to reach out.",
          stack: ["Next.js", "TypeScript", "Three.js", "Framer Motion"]
        }
      ]
    },
    stats: [
      { value: "150k+", label: "Lines written for live products" },
      { value: "3+", label: "Years building professionally" },
      { value: "4", label: "Languages spoken" },
      { value: "6wk", label: "From idea to App Store" }
    ],
    process: {
      label: "How it works",
      title: "Simple from start to finish",
      steps: [
        { n: "01", title: "We talk", desc: "A 30-minute call to understand what you need, when you need it, and what a good result looks like. No commitment." },
        { n: "02", title: "You get a proposal", desc: "A written breakdown — what I'll build, what it costs, and when it'll be done. In your inbox within 24 hours." },
        { n: "03", title: "I build it", desc: "Regular updates, early previews, and a direct line to me throughout. You're never left wondering." },
        { n: "04", title: "You go live", desc: "Your product launches. I hand over everything — code, accounts, documentation — plus 30 days of support." }
      ]
    },
    testimonials: [
      { quote: "Kristian delivered our landing page in under a week. Clean work, zero revisions, and clear communication throughout. Rare for any developer, let alone one this young.", name: "Marco V.", role: "Startup founder", location: "Milan, Italy" },
      { quote: "Working with Kiqa on Spindare has been impressive. He approaches every problem with discipline and care that usually takes years to develop.", name: "Biba W.", role: "Co-founder, Spindare", location: "Kosovo" },
      { quote: "He built a full booking and payments flow for my business in two weeks. Payments, email notifications, everything. Agencies I've worked with couldn't get close.", name: "Luca R.", role: "Business owner", location: "Lecco, Italy" }
    ],
    funnel: {
      label: "Start a Project",
      title: "Tell me about your project",
      sub: "Fill in the form below and I'll come back to you with a clear plan within 24 hours.",
      fields: {
        name: "Your name", namePh: "Your full name",
        email: "Business email", emailPh: "you@company.com",
        company: "Company or project name", companyPh: "Acme Ltd or your project name",
        service: "What do you need?",
        serviceOptions: ["Mobile App", "Landing Page", "Web Platform", "Custom Backend", "Not sure yet — let's talk"],
        budget: "Budget",
        budgetOptions: ["Under €500", "€500 – €1,500", "€1,500 – €3,000", "€3,000+", "Not sure yet"],
        timeline: "When do you need it?",
        timelineOptions: ["As soon as possible", "Within a month", "2–3 months", "No rush"],
        description: "Tell me about the project",
        descriptionPh: "What are you building, who is it for, and what does success look like for you?",
        submit: "Send my project brief",
        submitting: "Sending..."
      },
      success: { title: "Got it — I'll be in touch.", sub: "I'll review your brief and send you a clear proposal within 24 hours." }
    },
    about: {
      label: "About",
      title: "Kristian Gjergji",
      sub: "Developer · Builder · Founder",
      bio: [
        "I'm a self-employed developer based between Kosovo and Italy. I build mobile apps, websites, and web platforms for startups and business owners who need things done properly — and on time.",
        "Right now I'm co-leading product development on Spindare, a social app with hundreds of screens and a launch on iOS planned for September 2026.",
        "Through KIQA DEV, I work directly with founders and business owners — handling everything from the first design to going live — so they don't have to manage multiple agencies or freelancers."
      ],
      skills: [
        { name: "Mobile", items: ["React Native", "Expo", "iOS / Android", "EAS Build", "App Store Deployment"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Data", items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Real-time sync"] },
        { name: "Tools", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Now", role: "Co-Founder & Lead Developer — Spindare", desc: "Leading the full product build for a social rewards app — hundreds of screens, a full design system, and a launch date in September 2026." },
        { year: "2024–Now", role: "Founder — KIQA DEV", desc: "Running my own development practice. Working directly with startups and business owners across Italy and beyond." },
        { year: "2022–Now", role: "Self-Taught Developer", desc: "Started from zero in 2022. Spent three years building real products — not tutorials." }
      ],
      values: [
        { title: "I build, not just plan", desc: "I'd rather put something real in front of you in two weeks than spend months planning the perfect version." },
        { title: "I deliver on time", desc: "A deadline is a deadline. I've never shipped late and I don't plan to start." },
        { title: "I keep it simple", desc: "Clean solutions beat clever ones. I build things that are easy to understand, maintain, and grow." },
        { title: "I see it through", desc: "Once I take on a project, I see it to the end. You'll never wonder where I am." }
      ],
      stackLabel: "Stack",
      stackTitle: "Tech Stack",
      experienceLabel: "Experience",
      experienceTitle: "Timeline",
      approachLabel: "Approach",
      approachTitle: "How I work",
      ctaTitle: "Want to work together?",
      ctaSub: "Open to select freelance projects starting August 2026.",
      ctaButton: "Get in touch",
      metaLocation: "Location",
      metaLocationValue: "Lecco, Italy · Kosovo",
      metaFocus: "Focus",
      metaFocusValue: "Mobile-first development",
      metaAvailable: "Available",
      metaAvailableValue: "August 2026",
      metaResponse: "Response time",
      metaResponseValue: "Within 24h"
    },
    blog: {
      label: "Writing",
      title: "Notes from the work",
      sub: "Real stories from projects I've worked on — what went wrong, what worked, and what I'd do differently.",
      readMore: "Read post",
      minRead: "min read",
      noPosts: "No posts in this category yet.",
      latestNotes: "Latest Notes.",
      viewAllWriting: "View all writing",
      postNotFound: "Post not found",
      postNotFoundDesc: "This article doesn't exist or hasn't been published yet.",
      backToWriting: "Back to writing",
      byAuthor: "by",
      comingSoon: "Coming soon",
      comingSoonDesc: "Full article content is being written. Check back soon.",
      followGithub: "Follow on GitHub",
      writtenBy: "Written by",
      authorRole: "Developer · Kosovo / Italy",
      workWithMe: "Work with me →",
      readArticle: "Read article",
      categories: ["All", "React Native", "Architecture", "Backend", "Design", "AI"],
      posts: [
        { slug: "flatlist-memory-leak", category: "React Native", title: "How I fixed a memory leak that was crashing Spindare's social feed", excerpt: "The feed was slowing to a halt after a few minutes of use. Here's how I tracked down the problem and fixed it.", date: "Mar 28, 2026", read: 7 },
        { slug: "auth-flow-48-hours", category: "Architecture", title: "Why I rebuilt Spindare's login system in 48 hours — and don't regret it", excerpt: "The old setup worked fine until it didn't. An honest account of the decision, the rebuild, and what I'd do differently.", date: "Mar 14, 2026", read: 9 },
        { slug: "supabase-vs-firebase", category: "Backend", title: "Supabase vs Firebase for a social feed: what I found after testing both properly", excerpt: "I needed live updates for a large number of users at the same time. Both tools promised it. Only one delivered.", date: "Feb 22, 2026", read: 11 },
        { slug: "react-native-design-system", category: "Design", title: "How we built a design system for a mobile app with hundreds of screens", excerpt: "When your app has hundreds of components and a small team, having a shared set of rules isn't optional. This is how we did it.", date: "Feb 8, 2026", read: 8 },
        { slug: "travelme-ai-weekend", category: "AI", title: "How I built TravelMe's AI trip planner in a weekend", excerpt: "One message, a full itinerary. I had a weekend and an OpenAI API key. This is what I built, what surprised me, and what didn't work.", date: "Jun 12, 2026", read: 6 },
        { slug: "travelme-openai-vs-gemini", category: "AI", title: "Why I chose OpenAI over Gemini for TravelMe's recommendations engine", excerpt: "I tested both models properly for two weeks. The answer wasn't about price — it was about what happens when you tell the AI someone has a dietary restriction.", date: "Jun 20, 2026", read: 8 },
        { slug: "travelme-when-ai-is-wrong", category: "AI", title: "The hardest part of building an AI travel app: when the AI is confident and wrong", excerpt: "A restaurant that closed two years ago. Visa requirements that are out of date. The AI says it with full confidence. Here's how I'm handling it.", date: "Jun 25, 2026", read: 7 }
      ]
    },
    contact: {
      label: "Contact",
      title: "Get in touch",
      sub: "Tell me about your project and I'll get back to you within 24 hours.",
      detailsTitle: "Contact details",
      bookTitle: "Prefer to book directly?",
      bookDesc: "For immediate engagement, Discord is the fastest channel.",
      form: {
        name: "Your name", namePh: "Your full name",
        email: "Email address", emailPh: "you@example.com",
        subject: "Subject", subjectPh: "Project inquiry",
        message: "Message", messagePh: "Tell me about your project, when you need it, and your budget...",
        send: "Send Message", sending: "Sending...",
        sent: "Message sent.", sentSub: "I'll get back to you within 24 hours.",
        another: "Send another message"
      },
      chat: {
        intro: "Quick intake",
        greeting: "Hey — I'm the KIQA intake assistant. Three quick questions and I'll pass this straight to Kristian.",
        qService: "What kind of work do you need?",
        qTimeline: "What's your timeline?",
        qDescription: "Tell me a bit about the project.",
        descriptionPh: "What are you building, and what does a good result look like?",
        qName: "Nice — what's your name?",
        namePh: "Your full name",
        qMethod: "Last thing — how should Kristian reach you?",
        methodEmail: "Email",
        methodPhone: "Phone",
        emailPh: "you@example.com",
        phonePh: "+355 6X XXX XXXX",
        submit: "Send to Kristian",
        sending: "Sending...",
        typing: "typing",
        summaryIntro: "Here's what I've got:",
        restart: "Start over",
        switchMethod: "Switch to",
        phoneUnavailableTitle: "Phone unavailable",
        phoneUnavailableDesc: "Phone contact is currently unavailable. Please use email instead.",
        errorTitle: "Error",
        errorDesc: "Failed to send. Please email contact@kiqa-dev.it directly."
      },
      info: { email: "contact@kiqa-dev.it", discord: "@kodibkfg", github: "github.com/rashica07", location: "Kosovo / Italy", response: "Within 24 hours" }
    },
    footer: { tagline: "Quality work. Fixed price. On time.", legal: "© 2026 KIQA DEV. All rights reserved." },
    whatsapp: { tooltip: "Chat on WhatsApp", aria: "Message us on WhatsApp", prefill: "Hi Kristian, I'd like to talk about a project." },
    notFound: {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
      backHome: "← Back to home"
    },
    page: {
      allServices: "All services & pricing",
      viewAllProjects: "View all projects"
    },
    portfolio: {
      noProjects: "No projects in this category yet.",
      ctaTitle: "Want to see your project here?",
      ctaSub: "Let's build something production-grade together.",
      ctaButton: "Start a project"
    }
  },
  it: {
    nav: { home: "Home", services: "Servizi", portfolio: "Lavori", blog: "Articoli", about: "Chi sono", contact: "Contatti", quote: "Inizia un progetto" },
    hero: { badge: "Disponibile per nuovi progetti · Kosovo / Italia", h1Line1: "Creo prodotti digitali", h1Line2: "che i tuoi clienti", h1Line3: "usano davvero —", h1Line4: "e a cui tornano.", sub: "Trasformo le idee in prodotti reali. App, siti web e piattaforme — costruiti per funzionare, consegnati in tempo, senza sorprese.", cta1: "Parlami del tuo progetto", cta2: "Guarda i miei lavori", available: "Disponibile per nuovi progetti da agosto 2026" },
    services: {
      label: "Servizi", title: "Prezzo chiaro. Scopo chiaro. Fatto.", sub: "Nessun costo nascosto, nessun ritardo. Ogni progetto ha un prezzo fisso e una data di consegna.",
      getProposal: "Richiedi un preventivo per questo servizio",
      items: [
        { name: "App Mobile", tagline: "La tua idea, live su App Store e Google Play in 6 settimane.", price: "Da €799", timeline: "6 settimane", desc: "Creo la tua app dall'inizio alla fine — design, sviluppo e pubblicazione su entrambi gli store. Un prezzo fisso, un unico referente, sei settimane.", features: ["React Native", "iOS & Android", "Supabase", "Pubblicazione App Store & Play Store", "Notifiche push", "30 giorni di supporto post-lancio"] },
        { name: "Landing Page", tagline: "Un sito che cattura l'attenzione — in 7 giorni.", price: "Da €299", timeline: "7 giorni", desc: "Una pagina veloce e curata, costruita per trasformare i visitatori in clienti. Consegnata in 7 giorni, pronta a generare contatti dal primo giorno.", features: ["Next.js", "Grafica 3D & animazioni", "Ottimizzata per i motori di ricerca", "Veloce su ogni dispositivo", "Vercel + Cloudflare", "Pronta per un CMS"] },
        { name: "Piattaforma Web", tagline: "Un prodotto web completo — account, pagamenti, dashboard — in 3 settimane.", price: "Da €1.299", timeline: "3 settimane", desc: "Tutto ciò di cui la tua attività ha bisogno in un unico prodotto: account utenti, pagamenti, dashboard e altro. Costruito per gestire traffico reale dal primo giorno.", features: ["Next.js", "Supabase / PostgreSQL", "Account utenti & login", "Dashboard admin", "Aggiornamenti in tempo reale", "Deploy incluso"] },
        { name: "Backend Personalizzato", tagline: "Le fondamenta di cui il tuo prodotto ha bisogno — in 2 settimane.", price: "Da €499", timeline: "2 settimane", desc: "Una base solida e affidabile per la tua app o sito web. Costruita per crescere con la tua attività, con documentazione completa consegnata alla fine.", features: ["Node.js", "PostgreSQL", "Gestione accessi", "Archiviazione file", "Sincronizzazione dati live", "Documentazione completa"] }
      ]
    },
    work: {
      label: "Lavori Selezionati",
      title: "Progetti reali. Risultati reali.",
      projects: [
        {
          name: "Torre Group",
          type: "Web",
          status: "Live",
          year: "2024",
          desc: "Una piattaforma web aziendale per Torre Group, comprendente MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA e TORRE HOME. Design premium che riflette alta qualità nelle costruzioni e nel settore immobiliare.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"]
        },
        {
          name: "Spindare",
          type: "Mobile",
          status: "In Sviluppo",
          year: "2025–2026",
          desc: "Un'app social dove gli utenti guadagnano ricompense per le loro abitudini quotidiane. Ho guidato l'intero prodotto — dal primo schermo alla preparazione del lancio. In arrivo su iOS a settembre.",
          stack: ["React Native", "TypeScript", "Supabase", "Clerk", "Expo"]
        },
        {
          name: "TravelMe",
          type: "Mobile",
          status: "In Arrivo",
          year: "2026",
          desc: "Un'app che pianifica l'intero viaggio da un singolo messaggio. Digli dove vuoi andare e cosa ti piace, e gestisce tutto il resto.",
          stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"]
        },
        {
          name: "KIQA DEV",
          type: "Web",
          status: "Live",
          year: "2026",
          desc: "Questo sito — costruito in quattro lingue, con animazioni fluide e uno sfondo 3D. Progettato per far contattare i clienti.",
          stack: ["Next.js", "TypeScript", "Three.js", "Framer Motion"]
        }
      ]
    },
    stats: [
      { value: "150k+", label: "Righe scritte per prodotti in produzione" },
      { value: "3+", label: "Anni di sviluppo professionale" },
      { value: "4", label: "Lingue parlate" },
      { value: "6sett", label: "Da idea ad App Store" }
    ],
    process: {
      label: "Come funziona",
      title: "Semplice dall'inizio alla fine",
      steps: [
        { n: "01", title: "Parliamo", desc: "Una chiamata di 30 minuti per capire cosa ti serve, quando ne hai bisogno e come si presenta un buon risultato. Senza impegno." },
        { n: "02", title: "Ricevi una proposta", desc: "Un documento scritto — cosa costruirò, quanto costa e quando sarà pronto. Nella tua inbox entro 24 ore." },
        { n: "03", title: "Lo costruisco", desc: "Aggiornamenti regolari, anteprime anticipate e un filo diretto con me per tutta la durata. Non resti mai nel dubbio." },
        { n: "04", title: "Vai live", desc: "Il tuo prodotto viene lanciato. Ti consegno tutto — codice, account, documentazione — più 30 giorni di supporto." }
      ]
    },
    testimonials: [
      { quote: "Kristian ha consegnato la nostra landing page in meno di una settimana. Lavoro pulito, zero revisioni e comunicazione chiara dall'inizio alla fine. Raro per qualsiasi sviluppatore, figurarsi uno così giovane.", name: "Marco V.", role: "Founder di startup", location: "Milano, Italia" },
      { quote: "Lavorare con Kiqa su Spindare è stato impressionante. Affronta ogni problema con disciplina e cura che di solito richiedono anni per svilupparsi.", name: "Biba W.", role: "Co-founder, Spindare", location: "Kosovo" },
      { quote: "Ha costruito un sistema completo di prenotazioni e pagamenti per la mia attività in due settimane. Pagamenti, notifiche email, tutto. Le agenzie con cui ho lavorato non ci si avvicinavano.", name: "Luca R.", role: "Imprenditore", location: "Lecco, Italia" }
    ],
    funnel: { label: "Inizia un Progetto", title: "Parlami del tuo progetto", sub: "Compila il modulo e ti rispondo con un piano chiaro entro 24 ore.", fields: { name: "Il tuo nome", namePh: "Nome completo", email: "Email aziendale", emailPh: "tu@azienda.com", company: "Azienda o nome del progetto", companyPh: "Acme Srl o nome del progetto", service: "Cosa ti serve?", serviceOptions: ["App Mobile", "Landing Page", "Piattaforma Web", "Backend Personalizzato", "Non sono sicuro — parliamone"], budget: "Budget", budgetOptions: ["Meno di €500", "€500 – €1.500", "€1.500 – €3.000", "€3.000+", "Non sono sicuro"], timeline: "Quando ne hai bisogno?", timelineOptions: ["Il prima possibile", "Entro un mese", "2–3 mesi", "Nessuna fretta"], description: "Descrivimi il progetto", descriptionPh: "Cosa stai costruendo, per chi è, e come si presenta un buon risultato per te?", submit: "Invia il mio brief", submitting: "Invio in corso..." }, success: { title: "Ricevuto — ti rispondo presto.", sub: "Esaminerò il tuo brief e ti invierò una proposta chiara entro 24 ore." } },
    about: {
      label: "Chi sono",
      title: "Kristian Gjergji",
      sub: "Sviluppatore · Builder · Fondatore",
      bio: [
        "Sono uno sviluppatore freelance con base tra il Kosovo e l'Italia. Creo app mobile, siti web e piattaforme web per startup e imprenditori che hanno bisogno di un lavoro fatto bene — e in tempo.",
        "In questo momento sto co-guidando lo sviluppo di Spindare, un'app social con centinaia di schermate e un lancio su iOS previsto per settembre 2026.",
        "Attraverso KIQA DEV, lavoro direttamente con fondatori e imprenditori — gestendo tutto, dal primo design alla messa online — così non devono coordinare più agenzie o freelancer."
      ],
      skills: [
        { name: "Mobile", items: ["React Native", "Expo", "iOS / Android", "EAS Build", "App Store Deployment"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Dati", items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Sincronizzazione real-time"] },
        { name: "Strumenti", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Oggi", role: "Co-Fondatore & Lead Developer — Spindare", desc: "Guida completa dello sviluppo prodotto per un'app social di ricompense — centinaia di schermate, un design system completo e lancio previsto a settembre 2026." },
        { year: "2024–Oggi", role: "Fondatore — KIQA DEV", desc: "Gestione della mia attività di sviluppo. Lavoro direttamente con startup e imprenditori in Italia e oltre." },
        { year: "2022–Oggi", role: "Sviluppatore Autodidatta", desc: "Partito da zero nel 2022. Tre anni dedicati a costruire prodotti reali — non tutorial." }
      ],
      values: [
        { title: "Costruisco, non solo pianifico", desc: "Preferisco metterti qualcosa di reale davanti in due settimane piuttosto che passare mesi a pianificare la versione perfetta." },
        { title: "Consegno in tempo", desc: "Una scadenza è una scadenza. Non ho mai consegnato in ritardo e non intendo iniziare." },
        { title: "Mantengo le cose semplici", desc: "Le soluzioni pulite battono quelle furbe. Costruisco cose facili da capire, mantenere e far crescere." },
        { title: "Porto a termine", desc: "Una volta che accetto un progetto, lo porto alla fine. Non ti chiederai mai dove sono." }
      ],
      stackLabel: "Stack",
      stackTitle: "Stack Tecnologico",
      experienceLabel: "Esperienza",
      experienceTitle: "Percorso",
      approachLabel: "Approccio",
      approachTitle: "Come lavoro",
      ctaTitle: "Vuoi lavorare insieme?",
      ctaSub: "Disponibile per progetti freelance selezionati da agosto 2026.",
      ctaButton: "Contattami",
      metaLocation: "Posizione",
      metaLocationValue: "Lecco, Italia · Kosovo",
      metaFocus: "Focus",
      metaFocusValue: "Sviluppo mobile-first",
      metaAvailable: "Disponibile",
      metaAvailableValue: "Agosto 2026",
      metaResponse: "Tempo di risposta",
      metaResponseValue: "Entro 24 ore"
    },
    blog: {
      label: "Articoli",
      title: "Note dal lavoro",
      sub: "Storie vere da progetti su cui ho lavorato — cosa è andato storto, cosa ha funzionato e cosa farei diversamente.",
      readMore: "Leggi l'articolo",
      minRead: "min di lettura",
      noPosts: "Nessun articolo in questa categoria.",
      latestNotes: "Ultimi articoli.",
      viewAllWriting: "Tutti gli articoli",
      postNotFound: "Articolo non trovato",
      postNotFoundDesc: "Questo articolo non esiste o non è stato ancora pubblicato.",
      backToWriting: "Torna agli articoli",
      byAuthor: "di",
      comingSoon: "In arrivo",
      comingSoonDesc: "Il contenuto completo dell'articolo è in fase di scrittura. Torna presto.",
      followGithub: "Segui su GitHub",
      writtenBy: "Scritto da",
      authorRole: "Sviluppatore · Kosovo / Italia",
      workWithMe: "Lavora con me →",
      readArticle: "Leggi articolo",
      categories: ["Tutti", "React Native", "Architecture", "Backend", "Design", "AI"],
      posts: [
        { slug: "flatlist-memory-leak", category: "React Native", title: "Come ho risolto un memory leak che faceva crashare il feed social di Spindare", excerpt: "Il feed rallentava fino a bloccarsi dopo pochi minuti di utilizzo. Ecco come ho individuato il problema e l'ho risolto.", date: "28 Mar 2026", read: 7 },
        { slug: "auth-flow-48-hours", category: "Architecture", title: "Perché ho ricostruito il sistema di login di Spindare in 48 ore — e non me ne pento", excerpt: "Il vecchio sistema funzionava bene, finché non ha smesso. Un resoconto onesto della decisione, della ricostruzione e di cosa farei diversamente.", date: "14 Mar 2026", read: 9 },
        { slug: "supabase-vs-firebase", category: "Backend", title: "Supabase vs Firebase per un feed social: cosa ho scoperto testandoli entrambi seriamente", excerpt: "Avevo bisogno di aggiornamenti in tempo reale per molti utenti contemporaneamente. Entrambi lo promettevano. Solo uno ha mantenuto.", date: "22 Feb 2026", read: 11 },
        { slug: "react-native-design-system", category: "Design", title: "Come abbiamo costruito un design system per un'app mobile con centinaia di schermate", excerpt: "Quando la tua app ha centinaia di componenti e un piccolo team, avere un set condiviso di regole non è facoltativo. Ecco come abbiamo fatto.", date: "8 Feb 2026", read: 8 },
        { slug: "travelme-ai-weekend", category: "AI", title: "Come ho costruito il pianificatore di viaggi AI di TravelMe in un weekend", excerpt: "Un messaggio, un itinerario completo. Avevo un weekend e una chiave API OpenAI. Ecco cosa ho costruito, cosa mi ha sorpreso e cosa non ha funzionato.", date: "12 Giu 2026", read: 6 },
        { slug: "travelme-openai-vs-gemini", category: "AI", title: "Perché ho scelto OpenAI al posto di Gemini per il motore di raccomandazioni di TravelMe", excerpt: "Ho testato entrambi i modelli seriamente per due settimane. La risposta non riguardava il prezzo — ma cosa succede quando dici all'AI di una restrizione alimentare.", date: "20 Giu 2026", read: 8 },
        { slug: "travelme-when-ai-is-wrong", category: "AI", title: "La parte più difficile di un'app di viaggi AI: quando l'AI è sicura e sbaglia", excerpt: "Un ristorante chiuso da due anni. Requisiti per il visto non aggiornati. L'AI lo dice con piena sicurezza. Ecco come lo sto gestendo.", date: "25 Giu 2026", read: 7 }
      ]
    },
    contact: { label: "Contatti", title: "Scrivimi", sub: "Parlami del tuo progetto e ti rispondo entro 24 ore.",
      detailsTitle: "Dettagli di contatto",
      bookTitle: "Preferisci prenotare direttamente?",
      bookDesc: "Per un contatto immediato, Discord è il canale più veloce.",
      form: { name: "Il tuo nome", namePh: "Nome completo", email: "Email", emailPh: "tu@esempio.com", subject: "Oggetto", subjectPh: "Richiesta progetto", message: "Messaggio", messagePh: "Raccontami del tuo progetto...", send: "Invia messaggio", sending: "Invio in corso...", sent: "Messaggio inviato.", sentSub: "Ti rispondo entro 24 ore.", another: "Invia un altro messaggio" },
      chat: { intro: "Modulo rapido", greeting: "Ciao — sono l'assistente di raccolta di KIQA. Tre domande veloci e passo tutto a Kristian.", qService: "Di cosa hai bisogno?", qTimeline: "Quando ne hai bisogno?", qDescription: "Raccontami un po' del progetto.", descriptionPh: "Cosa stai costruendo e come si presenta un buon risultato?", qName: "Perfetto — come ti chiami?", namePh: "Nome completo", qMethod: "Ultima cosa — come deve contattarti Kristian?", methodEmail: "Email", methodPhone: "Telefono", emailPh: "tu@esempio.com", phonePh: "+39 3XX XXX XXXX", submit: "Invia a Kristian", sending: "Invio in corso...", typing: "sta scrivendo", summaryIntro: "Ecco cosa ho raccolto:", restart: "Ricomincia", switchMethod: "Passa a",
        phoneUnavailableTitle: "Telefono non disponibile",
        phoneUnavailableDesc: "Il contatto telefonico non è al momento disponibile. Usa l'email.",
        errorTitle: "Errore",
        errorDesc: "Invio fallito. Scrivi direttamente a contact@kiqa-dev.it."
      },
      info: { email: "contact@kiqa-dev.it", discord: "@kodibkfg", github: "github.com/rashica07", location: "Kosovo / Italia", response: "Entro 24 ore" }
    },
    footer: { tagline: "Lavoro di qualità. Prezzo fisso. Puntuale.", legal: "© 2026 KIQA DEV. Tutti i diritti riservati." },
    whatsapp: { tooltip: "Chatta su WhatsApp", aria: "Scrivici su WhatsApp", prefill: "Ciao Kristian, vorrei parlarti di un progetto." },
    notFound: {
      title: "Pagina non trovata",
      description: "La pagina che stai cercando non esiste.",
      backHome: "← Torna alla home"
    },
    page: {
      allServices: "Tutti i servizi e prezzi",
      viewAllProjects: "Vedi tutti i progetti"
    },
    portfolio: {
      noProjects: "Nessun progetto in questa categoria.",
      ctaTitle: "Vuoi vedere il tuo progetto qui?",
      ctaSub: "Costruiamo qualcosa di professionale insieme.",
      ctaButton: "Inizia un progetto"
    }
  },
  sq: {
    nav: { home: "Kryefaqja", services: "Shërbimet", portfolio: "Punët", blog: "Shkrimet", about: "Rreth meje", contact: "Kontakti", quote: "Fillo një projekt" },
    hero: { badge: "I disponueshëm për projekte të reja · Kosovë / Itali", h1Line1: "Ndërtoj produkte dixhitale", h1Line2: "që klientët tuaj", h1Line3: "i përdorin me të vërtetë —", h1Line4: "dhe kthehen përsëri.", sub: "Kthej idetë në produkte reale. Aplikacione, faqe web dhe platforma online — ndërtuara për të funksionuar, dorëzuara në kohë, pa surpriza.", cta1: "Tregomë për projektin tënd", cta2: "Shiko punët e mia", available: "Duke pranuar projekte të reja nga gushti 2026" },
    services: {
      label: "Shërbimet",
      title: "Çmim i qartë. Qëllim i qartë. Bërë.",
      sub: "Pa kosto të fshehura, pa vonesa, pa ndërmjetës. Çdo projekt vjen me çmim fiks dhe një datë dorëzimi që e mbroj.",
      getProposal: "Merr një ofertë për këtë shërbim",
      items: [
        { name: "Aplikacion Mobil", tagline: "Ideja jote, live në App Store dhe Google Play për 6 javë.", price: "Nga €799", timeline: "6 javë", desc: "Ndërtoj aplikacionin tënd nga fillimi në fund — dizajn, zhvillim dhe dorëzim në të dy dyqanet. Një çmim fiks, një pikë kontakti, gjashtë javë.", features: ["React Native", "iOS & Android", "Supabase", "Dorëzim në App Store & Play Store", "Njoftime push", "30 ditë mbështetje pas lansimit"] },
        { name: "Landing Page", tagline: "Një faqe web që bën njerëzit të ndalen e të kushtojnë vëmendje — për 7 ditë.", price: "Nga €299", timeline: "7 ditë", desc: "Një faqe e shpejtë dhe e bukur, ndërtuar për të kthyer vizitorët në klientë. Dorëzuar për 7 ditë, gati për të gjeneruar kontakte nga dita e parë.", features: ["Next.js", "Vizualizime 3D & animacione", "Optimizuar për motorët e kërkimit", "E shpejtë në çdo pajisje", "Vercel + Cloudflare", "E gatshme për CMS"] },
        { name: "Platformë Web", tagline: "Një produkt i plotë në web — llogari, pagesa, panele — për 3 javë.", price: "Nga €1,299", timeline: "3 javë", desc: "Gjithçka që biznesi yt ka nevojë në një produkt: llogari përdoruesish, pagesa, panele dhe më shumë. Ndërtuar për të trajtuar përdorim real nga dita e parë.", features: ["Next.js", "Supabase / PostgreSQL", "Llogari përdoruesish & login", "Panel administratori", "Përditësime në kohë reale", "Publikim i përfshirë"] },
        { name: "Backend i Personalizuar", tagline: "Themeli që produkti yt ka nevojë — ndërtuar për 2 javë.", price: "Nga €499", timeline: "2 javë", desc: "Një bazë solide dhe e besueshme për aplikacionin ose faqen tënde web. Ndërtuar për t'u rritur me biznesin tënd, me dokumentacion të plotë.", features: ["Node.js", "PostgreSQL", "Login & menaxhim përdoruesish", "Ruajtje skedarësh", "Sinkronizim të dhënash live", "Dokumentacion i plotë"] }
      ]
    },
    work: {
      label: "Punë të Zgjedhura",
      title: "Projekte reale. Rezultate reale.",
      projects: [
        {
          name: "Torre Group",
          type: "Web",
          status: "Live",
          year: "2024",
          desc: "Një platformë ueb korporative për Torre Group, e cila përfshin MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA, dhe TORRE HOME. Dizajn premium që reflekton cilësi të lartë në ndërtim dhe patundshmëri.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"]
        },
        {
          name: "Spindare",
          type: "Mobile",
          status: "Në Zhvillim",
          year: "2025–2026",
          desc: "Një aplikacion social ku përdoruesit fitojnë shpërblime për zakonet e tyre të përditshme. Udhëhoqa të gjithë produktin — nga ekrani i parë deri te përgatitja e lansimit. Do të dalë në iOS këtë shtator.",
          stack: ["React Native", "TypeScript", "Supabase", "Clerk", "Expo"]
        },
        {
          name: "TravelMe",
          type: "Mobile",
          status: "Së Shpejti",
          year: "2026",
          desc: "Një aplikacion që planifikon gjithë udhëtimin tënd nga një mesazh i vetëm. Thuaji ku do të shkosh dhe çfarë të pëlqen, dhe ai merret me gjithçka tjetër.",
          stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"]
        },
        {
          name: "KIQA DEV",
          type: "Web",
          status: "Live",
          year: "2026",
          desc: "Kjo faqe web — ndërtuar në katër gjuhë, me animacione të buta dhe sfond 3D. Dizajnuar për të bërë klientët të na kontaktojnë.",
          stack: ["Next.js", "TypeScript", "Three.js", "Framer Motion"]
        }
      ]
    },
    stats: [
      { value: "150k+", label: "Rreshta kodi të shkruara për produkte live" },
      { value: "3+", label: "Vite ndërtim profesional" },
      { value: "4", label: "Gjuhë të folura" },
      { value: "6javë", label: "Nga ideja në App Store" }
    ],
    process: {
      label: "Si funksionon",
      title: "Thjeshtë nga fillimi në fund",
      steps: [
        { n: "01", title: "Flasim", desc: "Një telefonatë 30-minutëshe për të kuptuar çfarë të nevojitet, kur e ke nevojë dhe si duket një rezultat i mirë. Pa asnjë detyrim." },
        { n: "02", title: "Merr një propozim", desc: "Një dokument i shkruar — çfarë do të ndërtoj, sa kushton dhe kur do të jetë gati. Në inbox-in tënd brenda 24 orëve." },
        { n: "03", title: "E ndërtoj", desc: "Përditësime të rregullta, pamje të hershme dhe një linjë direkte me mua gjatë gjithë kohës. Kurrë nuk mbetesh duke pyetur." },
        { n: "04", title: "Shkon live", desc: "Produkti yt lansohet. Të dorëzoj gjithçka — kodin, llogaritë, dokumentacionin — plus 30 ditë mbështetje." }
      ]
    },
    testimonials: [
      { quote: "Kristiani dorëzoi landing page-n tonë në më pak se një javë. Punë e pastër, zero rishikime dhe komunikim i qartë gjatë gjithë kohës. E rrallë për çdo zhvillues, e mos të thuash për dikë kaq të ri.", name: "Marco V.", role: "Themelues startup-i", location: "Milano, Itali" },
      { quote: "Puna me Kiqa në Spindare ka qenë mbresëlënëse. Ai i qaset çdo problemi me disiplinë dhe kujdes që zakonisht kërkon vite për t'u zhvilluar.", name: "Biba W.", role: "Bashkë-themeluese, Spindare", location: "Kosovë" },
      { quote: "Ndërtoi një sistem të plotë rezervimesh dhe pagesash për biznesin tim në dy javë. Pagesa, njoftime me email, gjithçka. Agjencitë me të cilat kam punuar nuk mund t'i afroheshin.", name: "Luca R.", role: "Pronar biznesi", location: "Lecco, Itali" }
    ],
    funnel: { label: "Fillo një Projekt", title: "Tregomë për projektin tënd", sub: "Plotëso formularin dhe do të të kthehem me një plan të qartë brenda 24 orëve.", fields: { name: "Emri yt", namePh: "Emri i plotë", email: "Email biznesi", emailPh: "ti@kompania.com", company: "Kompania ose emri i projektit", companyPh: "Emri i kompanisë", service: "Çfarë ke nevojë?", serviceOptions: ["Aplikacion Mobil", "Landing Page", "Platformë Web", "Backend i Personalizuar", "Nuk jam i sigurt — le të flasim"], budget: "Buxheti", budgetOptions: ["Nën €500", "€500 – €1,500", "€1,500 – €3,000", "€3,000+", "Nuk jam i sigurt"], timeline: "Kur ke nevojë?", timelineOptions: ["Sa më shpejt", "Brenda një muaji", "2–3 muaj", "Pa ngutje"], description: "Tregomë për projektin", descriptionPh: "Çfarë po ndërton dhe për kend është?", submit: "Dërgo brifin tim", submitting: "Duke dërguar..." }, success: { title: "Mora — do të kontaktoj shpejt.", sub: "Do ta shqyrtoj brifin tënd brenda 24 orëve." } },
    about: {
      label: "Rreth meje",
      title: "Kristian Gjergji",
      sub: "Zhvillues · Ndërtues · Themelues",
      bio: [
        "Jam një zhvillues i pavarur me bazë mes Kosovës dhe Italisë. Ndërtoj aplikacione mobile, faqe web dhe platforma web për startup-e dhe pronarë biznesi që kanë nevojë punë të bërë siç duhet — dhe në kohë.",
        "Tani jam duke bashkë-udhëhequr zhvillimin e produktit në Spindare, një aplikacion social me qindra ekrane dhe lansim në iOS të planifikuar për shtator 2026.",
        "Përmes KIQA DEV, punoj drejtpërdrejt me themelues dhe pronarë biznesi — duke trajtuar gjithçka nga dizajni i parë deri te publikimi — kështu ata nuk duhet të menaxhojnë shumë agjenci apo freelancer-ë."
      ],
      skills: [
        { name: "Mobile", items: ["React Native", "Expo", "iOS / Android", "EAS Build", "App Store Deployment"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Të dhëna", items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Sinkronizim real-time"] },
        { name: "Mjete", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Tani", role: "Bashkë-themelues & Zhvillues kryesor — Spindare", desc: "Udhëheqje e plotë e ndërtimit të produktit për një aplikacion social shpërblimesh — qindra ekrane, një design system i plotë dhe datë lansimi në shtator 2026." },
        { year: "2024–Tani", role: "Themelues — KIQA DEV", desc: "Drejtoj praktikën time të zhvillimit. Punoj drejtpërdrejt me startup-e dhe pronarë biznesi në Itali dhe më gjerë." },
        { year: "2022–Tani", role: "Zhvillues Vetë-mësuar", desc: "Fillova nga zeroja në 2022. Tri vite duke ndërtuar produkte reale — jo tutoriale." }
      ],
      values: [
        { title: "Ndërtoj, nuk vetëm planifikoj", desc: "Preferoj të të vë diçka reale para syve brenda dy javësh sesa të kaloj muaj duke planifikuar versionin perfekt." },
        { title: "Dorëzoj në kohë", desc: "Një afat është afat. Kurrë nuk kam dorëzuar me vonesë dhe nuk kam ndërmend të filloj." },
        { title: "E mbaj thjeshtë", desc: "Zgjidhjet e pastra fitojnë ndaj atyre të komplikuara. Ndërtoj gjëra që janë të lehta për t'u kuptuar, mirëmbajtur dhe rritur." },
        { title: "E çoj deri në fund", desc: "Sapo pranoj një projekt, e çoj deri në fund. Kurrë nuk do të pyesësh ku jam." }
      ],
      stackLabel: "Stack",
      stackTitle: "Stack Teknologjik",
      experienceLabel: "Përvoja",
      experienceTitle: "Rrugëtimi",
      approachLabel: "Qasja",
      approachTitle: "Si punoj",
      ctaTitle: "Do të punojmë së bashku?",
      ctaSub: "I hapur për projekte freelance të zgjedhura nga gushti 2026.",
      ctaButton: "Kontaktomë",
      metaLocation: "Vendndodhja",
      metaLocationValue: "Lecco, Itali · Kosovë",
      metaFocus: "Fokusi",
      metaFocusValue: "Zhvillim mobile-first",
      metaAvailable: "I disponueshëm",
      metaAvailableValue: "Gusht 2026",
      metaResponse: "Koha e përgjigjes",
      metaResponseValue: "Brenda 24 orëve"
    },
    blog: {
      label: "Shkrimet",
      title: "Shënime nga puna",
      sub: "Histori reale nga projekte ku kam punuar — çfarë shkoi keq, çfarë funksionoi dhe çfarë do të bëja ndryshe.",
      readMore: "Lexo postimin",
      minRead: "min lexim",
      noPosts: "Asnjë postim në këtë kategori ende.",
      latestNotes: "Shënimet e fundit.",
      viewAllWriting: "Shiko të gjitha shkrimet",
      postNotFound: "Postimi nuk u gjet",
      postNotFoundDesc: "Ky artikull nuk ekziston ose nuk është publikuar ende.",
      backToWriting: "Kthehu te shkrimet",
      byAuthor: "nga",
      comingSoon: "Së shpejti",
      comingSoonDesc: "Përmbajtja e plotë e artikullit po shkruhet. Kthehu përsëri së shpejti.",
      followGithub: "Ndiq në GitHub",
      writtenBy: "Shkruar nga",
      authorRole: "Zhvillues · Kosovë / Itali",
      workWithMe: "Puno me mua →",
      readArticle: "Lexo artikullin",
      categories: ["Të gjitha", "React Native", "Architecture", "Backend", "Design", "AI"],
      posts: [
        { slug: "flatlist-memory-leak", category: "React Native", title: "Si e rregullova një memory leak që po bënte crash feed-in social të Spindare-s", excerpt: "Feed-i po ngadalesohej deri në ndalim pas disa minutash përdorimi. Ja si e gjeta problemin dhe e rregullova.", date: "28 Mar 2026", read: 7 },
        { slug: "auth-flow-48-hours", category: "Architecture", title: "Pse e rindërtova sistemin e login-it të Spindare-s brenda 48 orësh — dhe nuk pendohem", excerpt: "Sistemi i vjetër funksiononte mirë derisa nuk funksionoi më. Një rrëfim i sinqertë i vendimit, rindërtimit dhe çfarë do të bëja ndryshe.", date: "14 Mar 2026", read: 9 },
        { slug: "supabase-vs-firebase", category: "Backend", title: "Supabase kundrejt Firebase për një feed social: çfarë zbulova pasi i testova të dy seriozisht", excerpt: "Kisha nevojë për përditësime në kohë reale për shumë përdorues njëkohësisht. Të dy e premtuan. Vetëm njëri e mbajti.", date: "22 Shk 2026", read: 11 },
        { slug: "react-native-design-system", category: "Design", title: "Si ndërtuam një design system për një aplikacion mobil me qindra ekrane", excerpt: "Kur aplikacioni yt ka qindra komponentë dhe një ekip të vogël, të kesh një set rregullash të përbashkëta nuk është opsionale. Kështu e bëmë.", date: "8 Shk 2026", read: 8 },
        { slug: "travelme-ai-weekend", category: "AI", title: "Si e ndërtova planifikuesin e udhëtimeve AI të TravelMe brenda një fundjave", excerpt: "Një mesazh, një itinerar i plotë. Kisha një fundjave dhe një çelës API OpenAI. Ja çfarë ndërtova, çfarë më befasoi dhe çfarë nuk funksionoi.", date: "12 Qer 2026", read: 6 },
        { slug: "travelme-openai-vs-gemini", category: "AI", title: "Pse zgjodha OpenAI në vend të Gemini për motorin e rekomandimeve të TravelMe", excerpt: "I testova të dy modelet seriozisht për dy javë. Përgjigjja nuk kishte të bënte me çmimin — por çfarë ndodh kur i thua AI-t për një kufizim ushqimor.", date: "20 Qer 2026", read: 8 },
        { slug: "travelme-when-ai-is-wrong", category: "AI", title: "Pjesa më e vështirë e ndërtimit të një app udhëtimesh AI: kur AI-ja është e sigurt dhe gabon", excerpt: "Një restorant i mbyllur dy vite më parë. Kërkesat për vizë që janë të vjetruara. AI-ja e thotë me besim të plotë. Ja si po e trajtoj.", date: "25 Qer 2026", read: 7 }
      ]
    },
    contact: { label: "Kontakti", title: "Kontaktomë", sub: "Tregomë për projektin tënd dhe do të kthehem brenda 24 orëve.",
      detailsTitle: "Detajet e kontaktit",
      bookTitle: "Preferon të rezervosh direkt?",
      bookDesc: "Për kontakt të menjëhershëm, Discord është kanali më i shpejtë.",
      form: { name: "Emri yt", namePh: "Emri i plotë", email: "Adresa email", emailPh: "ti@shembull.com", subject: "Subjekti", subjectPh: "Kërkesë projekti", message: "Mesazhi", messagePh: "Tregomë për projektin tënd...", send: "Dërgo mesazhin", sending: "Duke dërguar...", sent: "Mesazhi u dërgua.", sentSub: "Do të kthehem brenda 24 orëve.", another: "Dërgo një mesazh tjetër" },
      chat: { intro: "Formular i shpejtë", greeting: "Përshëndetje — jam asistenti i pritjes së KIQA. Tri pyetje të shpejta dhe ia dërgoj Kristianit.", qService: "Çfarë pune ke nevojë?", qTimeline: "Kur ke nevojë?", qDescription: "Më trego pak për projektin.", descriptionPh: "Çfarë po ndërton dhe si duket një rezultat i mirë?", qName: "Bukur — si e ke emrin?", namePh: "Emri i plotë", qMethod: "Gjë e fundit — si duhet të të kontaktojë Kristiani?", methodEmail: "Email", methodPhone: "Telefon", emailPh: "ti@shembull.com", phonePh: "+383 4X XXX XXX", submit: "Dërgo te Kristiani", sending: "Duke dërguar...", typing: "duke shkruar", summaryIntro: "Ja çfarë kam mbledhur:", restart: "Fillo nga fillimi", switchMethod: "Kalo te",
        phoneUnavailableTitle: "Telefoni nuk disponohet",
        phoneUnavailableDesc: "Kontakti telefonik nuk është i disponueshëm për momentin. Përdor email-in.",
        errorTitle: "Gabim",
        errorDesc: "Dërgimi dështoi. Dërgo email direkt te contact@kiqa-dev.it."
      },
      info: { email: "contact@kiqa-dev.it", discord: "@kodibkfg", github: "github.com/rashica07", location: "Kosovë / Itali", response: "Brenda 24 orëve" }
    },
    footer: { tagline: "Punë cilësore. Çmim fiks. Në kohë.", legal: "© 2026 KIQA DEV. Të gjitha të drejtat të rezervuara." },
    whatsapp: { tooltip: "Bisedo në WhatsApp", aria: "Na shkruaj në WhatsApp", prefill: "Përshëndetje Kristian, dua të flasim për një projekt." },
    notFound: {
      title: "Faqja nuk u gjet",
      description: "Faqja që po kërkon nuk ekziston.",
      backHome: "← Kthehu në kryefaqe"
    },
    page: {
      allServices: "Të gjitha shërbimet dhe çmimet",
      viewAllProjects: "Shiko të gjitha projektet"
    },
    portfolio: {
      noProjects: "Asnjë projekt në këtë kategori ende.",
      ctaTitle: "Do ta shohësh projektin tënd këtu?",
      ctaSub: "Le të ndërtojmë diçka profesionale së bashku.",
      ctaButton: "Fillo një projekt"
    }
  },
  de: {
    nav: { home: "Start", services: "Leistungen", portfolio: "Projekte", blog: "Blog", about: "Über mich", contact: "Kontakt", quote: "Projekt starten" },
    hero: { badge: "Verfügbar für neue Projekte · Kosovo / Italien", h1Line1: "Ich entwickle digitale Produkte,", h1Line2: "die deine Kunden", h1Line3: "wirklich nutzen —", h1Line4: "und immer wieder öffnen.", sub: "Ich bringe Ideen von einem Gespräch zu einem fertigen Produkt. Apps, Websites und Online-Plattformen — gebaut um zu funktionieren, pünktlich geliefert, ohne Überraschungen.", cta1: "Erzähl mir von deinem Projekt", cta2: "Meine Projekte ansehen", available: "Neue Projekte ab August 2026" },
    services: {
      label: "Leistungen", title: "Klarer Preis. Klarer Umfang. Fertig.", sub: "Keine versteckten Kosten, keine Verzögerungen, keine Zwischenhändler. Jedes Projekt kommt mit einem Festpreis und einem Liefertermin, hinter dem ich stehe.",
      getProposal: "Angebot für diese Leistung anfordern",
      items: [
        { name: "Mobile App", tagline: "Deine Idee, live im App Store und Google Play in 6 Wochen.", price: "Ab €799", timeline: "6 Wochen", desc: "Ich entwickle deine App von Anfang bis Ende — Design, Entwicklung und Einreichung in beiden Stores. Ein Festpreis, ein Ansprechpartner, sechs Wochen.", features: ["React Native", "iOS & Android", "Supabase", "App Store & Play Store Einreichung", "Push-Benachrichtigungen", "30 Tage Support nach Launch"] },
        { name: "Landing Page", tagline: "Eine Website, die Menschen aufhorchen lässt — in 7 Tagen.", price: "Ab €299", timeline: "7 Tage", desc: "Eine schnelle, ansprechende Seite, die Besucher in Kunden verwandelt. In 7 Tagen geliefert, bereit ab Tag eins Leads zu generieren.", features: ["Next.js", "3D-Grafik & Animationen", "Suchmaschinenoptimiert", "Schnell auf allen Geräten", "Vercel + Cloudflare", "CMS-bereit"] },
        { name: "Web-Plattform", tagline: "Ein vollständiges Webprodukt — Konten, Zahlungen, Dashboards — in 3 Wochen.", price: "Ab €1.299", timeline: "3 Wochen", desc: "Alles, was dein Unternehmen braucht, in einem Produkt: Benutzerkonten, Zahlungen, Dashboards und mehr. Gebaut für echte Nutzung ab Tag eins.", features: ["Next.js", "Supabase / PostgreSQL", "Benutzerkonten & Login", "Admin-Dashboard", "Echtzeit-Updates", "Deployment inklusive"] },
        { name: "Individuelles Backend", tagline: "Das Fundament, das dein Produkt braucht — in 2 Wochen.", price: "Ab €499", timeline: "2 Wochen", desc: "Eine solide, zuverlässige Grundlage für deine App oder Website. Gebaut um mit deinem Unternehmen zu wachsen, mit vollständiger Dokumentation am Ende.", features: ["Node.js", "PostgreSQL", "Login & Nutzerverwaltung", "Dateispeicherung", "Live-Datensynchronisation", "Vollständige Dokumentation"] }
      ]
    },
    work: {
      label: "Ausgewählte Projekte",
      title: "Echte Projekte. Echte Ergebnisse.",
      projects: [
        {
          name: "Torre Group",
          type: "Web",
          status: "Live",
          year: "2024",
          desc: "Eine Unternehmens-Webplattform für die Torre Group, bestehend aus MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA und TORRE HOME. Premium-Design, das hohe Qualität in Bau und Immobilien widerspiegelt.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"]
        },
        {
          name: "Spindare",
          type: "Mobile",
          status: "In Entwicklung",
          year: "2025–2026",
          desc: "Eine Social-App, bei der Nutzer Belohnungen für ihre täglichen Gewohnheiten verdienen. Ich habe das gesamte Produkt geleitet — vom ersten Bildschirm bis zur Launch-Vorbereitung. Erscheint diesen September auf iOS.",
          stack: ["React Native", "TypeScript", "Supabase", "Clerk", "Expo"]
        },
        {
          name: "TravelMe",
          type: "Mobile",
          status: "Demnächst",
          year: "2026",
          desc: "Eine App, die deine gesamte Reise aus einer einzigen Nachricht plant. Sag ihr, wohin du willst und was dich interessiert, und sie kümmert sich um den Rest.",
          stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"]
        },
        {
          name: "KIQA DEV",
          type: "Web",
          status: "Live",
          year: "2026",
          desc: "Diese Website — in vier Sprachen gebaut, mit flüssigen Animationen und einem 3D-Hintergrund. Entworfen, damit Kunden sich melden.",
          stack: ["Next.js", "TypeScript", "Three.js", "Framer Motion"]
        }
      ]
    },
    stats: [
      { value: "150k+", label: "Geschriebene Zeilen für Live-Produkte" },
      { value: "3+", label: "Jahre professionelle Entwicklung" },
      { value: "4", label: "Gesprochene Sprachen" },
      { value: "6Wo", label: "Von der Idee zum App Store" }
    ],
    process: {
      label: "So funktioniert's",
      title: "Einfach von Anfang bis Ende",
      steps: [
        { n: "01", title: "Wir reden", desc: "Ein 30-minütiges Gespräch, um zu verstehen, was du brauchst, wann du es brauchst und wie ein gutes Ergebnis aussieht. Unverbindlich." },
        { n: "02", title: "Du bekommst ein Angebot", desc: "Eine schriftliche Aufstellung — was ich baue, was es kostet und wann es fertig ist. Innerhalb von 24 Stunden in deinem Postfach." },
        { n: "03", title: "Ich baue es", desc: "Regelmäßige Updates, frühe Vorschauen und ein direkter Draht zu mir während der gesamten Zeit. Du wunderst dich nie." },
        { n: "04", title: "Du gehst live", desc: "Dein Produkt wird gelauncht. Ich übergebe alles — Code, Konten, Dokumentation — plus 30 Tage Support." }
      ]
    },
    testimonials: [
      { quote: "Kristian hat unsere Landing Page in unter einer Woche geliefert. Saubere Arbeit, null Korrekturen und klare Kommunikation die ganze Zeit. Selten für jeden Entwickler, geschweige denn einen so jungen.", name: "Marco V.", role: "Startup-Gründer", location: "Mailand, Italien" },
      { quote: "Die Zusammenarbeit mit Kiqa bei Spindare war beeindruckend. Er geht jedes Problem mit einer Disziplin und Sorgfalt an, die normalerweise Jahre braucht, um sich zu entwickeln.", name: "Biba W.", role: "Mitgründerin, Spindare", location: "Kosovo" },
      { quote: "Er hat ein komplettes Buchungs- und Zahlungssystem für mein Unternehmen in zwei Wochen gebaut. Zahlungen, E-Mail-Benachrichtigungen, alles. Agenturen, mit denen ich gearbeitet habe, kamen nicht mal in die Nähe.", name: "Luca R.", role: "Unternehmer", location: "Lecco, Italien" }
    ],
    funnel: { label: "Projekt starten", title: "Erzähl mir von deinem Projekt", sub: "Füll das Formular aus und ich melde mich innerhalb von 24 Stunden mit einem klaren Plan.", fields: { name: "Dein Name", namePh: "Vollständiger Name", email: "Geschäftliche E-Mail", emailPh: "du@unternehmen.de", company: "Unternehmen oder Projektname", companyPh: "Muster GmbH", service: "Was brauchst du?", serviceOptions: ["Mobile App", "Landing Page", "Web-Plattform", "Individuelles Backend", "Noch unsicher — lass uns reden"], budget: "Budget", budgetOptions: ["Unter €500", "€500 – €1.500", "€1.500 – €3.000", "€3.000+", "Noch unsicher"], timeline: "Wann brauchst du es?", timelineOptions: ["So schnell wie möglich", "Innerhalb eines Monats", "2–3 Monate", "Kein Zeitdruck"], description: "Beschreib mir das Projekt", descriptionPh: "Was baust du, für wen ist es und wie sieht Erfolg für dich aus?", submit: "Brief absenden", submitting: "Wird gesendet..." }, success: { title: "Erhalten — ich melde mich bald.", sub: "Ich werde dein Brief prüfen und dir innerhalb von 24 Stunden einen klaren Vorschlag schicken." } },
    about: {
      label: "Über mich",
      title: "Kristian Gjergji",
      sub: "Entwickler · Builder · Gründer",
      bio: [
        "Ich bin ein selbstständiger Entwickler mit Basis zwischen Kosovo und Italien. Ich baue mobile Apps, Websites und Web-Plattformen für Startups und Unternehmer, die Dinge richtig gemacht brauchen — und pünktlich.",
        "Gerade leite ich gemeinsam die Produktentwicklung bei Spindare, einer Social-App mit hunderten Bildschirmen und einem geplanten iOS-Launch im September 2026.",
        "Über KIQA DEV arbeite ich direkt mit Gründern und Unternehmern — ich kümmere mich um alles vom ersten Design bis zum Go-Live — damit sie nicht mehrere Agenturen oder Freelancer koordinieren müssen."
      ],
      skills: [
        { name: "Mobile", items: ["React Native", "Expo", "iOS / Android", "EAS Build", "App Store Deployment"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Daten", items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Echtzeit-Synchronisation"] },
        { name: "Werkzeuge", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Jetzt", role: "Mitgründer & Lead Developer — Spindare", desc: "Vollständige Leitung des Produktbaus für eine Social-Rewards-App — hunderte Bildschirme, ein vollständiges Design-System und Launch im September 2026." },
        { year: "2024–Jetzt", role: "Gründer — KIQA DEV", desc: "Führung meiner eigenen Entwicklungspraxis. Direkte Zusammenarbeit mit Startups und Unternehmern in Italien und darüber hinaus." },
        { year: "2022–Jetzt", role: "Autodidaktischer Entwickler", desc: "Bei null angefangen in 2022. Drei Jahre damit verbracht, echte Produkte zu bauen — keine Tutorials." }
      ],
      values: [
        { title: "Ich baue, nicht nur planen", desc: "Ich stelle dir lieber in zwei Wochen etwas Echtes vor die Nase, als monatelang die perfekte Version zu planen." },
        { title: "Ich liefere pünktlich", desc: "Eine Deadline ist eine Deadline. Ich habe noch nie zu spät geliefert und habe nicht vor, damit anzufangen." },
        { title: "Ich halte es einfach", desc: "Saubere Lösungen schlagen clevere. Ich baue Dinge, die leicht zu verstehen, zu warten und zu erweitern sind." },
        { title: "Ich ziehe es durch", desc: "Sobald ich ein Projekt annehme, bringe ich es zu Ende. Du wirst dich nie fragen, wo ich bin." }
      ],
      stackLabel: "Stack",
      stackTitle: "Tech-Stack",
      experienceLabel: "Erfahrung",
      experienceTitle: "Werdegang",
      approachLabel: "Arbeitsweise",
      approachTitle: "Wie ich arbeite",
      ctaTitle: "Zusammenarbeiten?",
      ctaSub: "Offen für ausgewählte Freelance-Projekte ab August 2026.",
      ctaButton: "Kontakt aufnehmen",
      metaLocation: "Standort",
      metaLocationValue: "Lecco, Italien · Kosovo",
      metaFocus: "Fokus",
      metaFocusValue: "Mobile-first-Entwicklung",
      metaAvailable: "Verfügbar",
      metaAvailableValue: "August 2026",
      metaResponse: "Antwortzeit",
      metaResponseValue: "Innerhalb von 24 Std."
    },
    blog: {
      label: "Blog",
      title: "Notizen aus der Arbeit",
      sub: "Echte Geschichten aus Projekten, an denen ich gearbeitet habe — was schief ging, was funktionierte und was ich anders machen würde.",
      readMore: "Artikel lesen",
      minRead: "Min. Lesezeit",
      noPosts: "Noch keine Beiträge in dieser Kategorie.",
      latestNotes: "Neueste Notizen.",
      viewAllWriting: "Alle Artikel ansehen",
      postNotFound: "Beitrag nicht gefunden",
      postNotFoundDesc: "Dieser Artikel existiert nicht oder wurde noch nicht veröffentlicht.",
      backToWriting: "Zurück zum Blog",
      byAuthor: "von",
      comingSoon: "Demnächst",
      comingSoonDesc: "Der vollständige Artikelinhalt wird gerade geschrieben. Schau bald wieder vorbei.",
      followGithub: "Auf GitHub folgen",
      writtenBy: "Geschrieben von",
      authorRole: "Entwickler · Kosovo / Italien",
      workWithMe: "Mit mir arbeiten →",
      readArticle: "Artikel lesen",
      categories: ["Alle", "React Native", "Architecture", "Backend", "Design", "AI"],
      posts: [
        { slug: "flatlist-memory-leak", category: "React Native", title: "Wie ich ein Memory Leak behoben habe, das Spindares Social Feed zum Absturz brachte", excerpt: "Der Feed wurde nach ein paar Minuten Nutzung immer langsamer. So habe ich das Problem gefunden und behoben.", date: "28. Mär 2026", read: 7 },
        { slug: "auth-flow-48-hours", category: "Architecture", title: "Warum ich Spindares Login-System in 48 Stunden neu gebaut habe — und es nicht bereue", excerpt: "Das alte System funktionierte gut, bis es das nicht mehr tat. Ein ehrlicher Bericht über die Entscheidung, den Umbau und was ich anders machen würde.", date: "14. Mär 2026", read: 9 },
        { slug: "supabase-vs-firebase", category: "Backend", title: "Supabase vs Firebase für einen Social Feed: was ich nach ordentlichem Testen beider herausfand", excerpt: "Ich brauchte Live-Updates für eine große Anzahl gleichzeitiger Nutzer. Beide Tools versprachen es. Nur eines hielt das Versprechen.", date: "22. Feb 2026", read: 11 },
        { slug: "react-native-design-system", category: "Design", title: "Wie wir ein Design-System für eine mobile App mit hunderten Bildschirmen gebaut haben", excerpt: "Wenn deine App hunderte Komponenten und ein kleines Team hat, ist ein gemeinsames Regelwerk keine Option. So haben wir es gemacht.", date: "8. Feb 2026", read: 8 },
        { slug: "travelme-ai-weekend", category: "AI", title: "Wie ich TravelMes KI-Reiseplaner an einem Wochenende gebaut habe", excerpt: "Eine Nachricht, ein kompletter Reiseplan. Ich hatte ein Wochenende und einen OpenAI-API-Schlüssel. Das habe ich gebaut, was mich überrascht hat und was nicht funktionierte.", date: "12. Jun 2026", read: 6 },
        { slug: "travelme-openai-vs-gemini", category: "AI", title: "Warum ich OpenAI statt Gemini für TravelMes Empfehlungsmaschine gewählt habe", excerpt: "Ich habe beide Modelle zwei Wochen lang ordentlich getestet. Die Antwort hatte nichts mit dem Preis zu tun — sondern damit, was passiert, wenn man der KI von einer Ernährungseinschränkung erzählt.", date: "20. Jun 2026", read: 8 },
        { slug: "travelme-when-ai-is-wrong", category: "AI", title: "Das Schwierigste beim Bau einer KI-Reise-App: wenn die KI selbstbewusst und falsch ist", excerpt: "Ein Restaurant, das vor zwei Jahren geschlossen hat. Visa-Anforderungen, die veraltet sind. Die KI sagt es mit vollem Selbstvertrauen. So gehe ich damit um.", date: "25. Jun 2026", read: 7 }
      ]
    },
    contact: { label: "Kontakt", title: "Schreib mir", sub: "Erzähl mir von deinem Projekt und ich melde mich innerhalb von 24 Stunden.",
      detailsTitle: "Kontaktdaten",
      bookTitle: "Lieber direkt buchen?",
      bookDesc: "Für sofortige Kontaktaufnahme ist Discord der schnellste Kanal.",
      form: { name: "Dein Name", namePh: "Vollständiger Name", email: "E-Mail-Adresse", emailPh: "du@beispiel.de", subject: "Betreff", subjectPh: "Projektanfrage", message: "Nachricht", messagePh: "Erzähl mir von deinem Projekt...", send: "Nachricht senden", sending: "Wird gesendet...", sent: "Nachricht gesendet.", sentSub: "Ich melde mich innerhalb von 24 Stunden.", another: "Weitere Nachricht senden" },
      chat: { intro: "Kurzer Fragebogen", greeting: "Hallo — ich bin der KIQA-Intake-Assistent. Drei kurze Fragen, dann leite ich alles an Kristian weiter.", qService: "Was für eine Arbeit brauchst du?", qTimeline: "Wie ist dein Zeitrahmen?", qDescription: "Erzähl mir kurz vom Projekt.", descriptionPh: "Was baust du und wie sieht ein gutes Ergebnis aus?", qName: "Schön — wie heißt du?", namePh: "Vollständiger Name", qMethod: "Letzte Frage — wie soll Kristian dich erreichen?", methodEmail: "E-Mail", methodPhone: "Telefon", emailPh: "du@beispiel.de", phonePh: "+49 1XX XXXX XXXX", submit: "An Kristian senden", sending: "Wird gesendet...", typing: "schreibt", summaryIntro: "Das habe ich notiert:", restart: "Neu starten", switchMethod: "Wechseln zu",
        phoneUnavailableTitle: "Telefon nicht verfügbar",
        phoneUnavailableDesc: "Telefonischer Kontakt ist derzeit nicht verfügbar. Bitte nutze E-Mail.",
        errorTitle: "Fehler",
        errorDesc: "Senden fehlgeschlagen. Bitte schreibe direkt an contact@kiqa-dev.it."
      },
      info: { email: "contact@kiqa-dev.it", discord: "@kodibkfg", github: "github.com/rashica07", location: "Kosovo / Italien", response: "Innerhalb von 24 Stunden" }
    },
    footer: { tagline: "Qualitätsarbeit. Festpreis. Pünktlich.", legal: "© 2026 KIQA DEV. Alle Rechte vorbehalten." },
    whatsapp: { tooltip: "Auf WhatsApp chatten", aria: "Schreib uns auf WhatsApp", prefill: "Hallo Kristian, ich möchte über ein Projekt sprechen." },
    notFound: {
      title: "Seite nicht gefunden",
      description: "Die Seite, die du suchst, existiert nicht.",
      backHome: "← Zurück zur Startseite"
    },
    page: {
      allServices: "Alle Leistungen & Preise",
      viewAllProjects: "Alle Projekte ansehen"
    },
    portfolio: {
      noProjects: "Noch keine Projekte in dieser Kategorie.",
      ctaTitle: "Willst du dein Projekt hier sehen?",
      ctaSub: "Lass uns gemeinsam etwas Professionelles bauen.",
      ctaButton: "Projekt starten"
    }
  }
};

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

function deepMerge<T extends object>(target: DeepPartial<T>, source: T): T {
  const result = { ...source } as T;
  for (const key in target) {
    const tVal = (target as Record<string, unknown>)[key];
    const sVal = (source as Record<string, unknown>)[key];
    if (tVal !== undefined && tVal !== null && tVal !== "") {
      if (typeof tVal === "object" && !Array.isArray(tVal) && typeof sVal === "object" && !Array.isArray(sVal)) {
        (result as Record<string, unknown>)[key] = deepMerge(tVal as DeepPartial<object>, sVal as object);
      } else if (Array.isArray(tVal) && tVal.length > 0) {
        (result as Record<string, unknown>)[key] = tVal;
      } else if (!Array.isArray(tVal)) {
        (result as Record<string, unknown>)[key] = tVal;
      }
    }
  }
  return result;
}

export type Translations = typeof translations.en;

const merged: Record<Lang, Translations> = {
  en: translations.en,
  it: deepMerge(translations.it as DeepPartial<Translations>, translations.en),
  sq: deepMerge(translations.sq as DeepPartial<Translations>, translations.en),
  de: deepMerge(translations.de as DeepPartial<Translations>, translations.en),
};

interface I18nCtx {
  t: Translations;
  lang: Lang;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nCtx>({
  t: merged.en,
  lang: "en",
  setLang: () => {},
});

function detectBrowserLang(): Lang | null {
  try {
    const candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const raw of candidates) {
      const code = raw.toLowerCase().split("-")[0];
      if (code === "it") return "it";
      if (code === "sq") return "sq";
      if (code === "de") return "de";
      if (code === "en") return "en";
    }
  } catch {}
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kiqa_lang") as Lang;
      if (stored && ["en","it","sq","de"].includes(stored)) {
        setLangState(stored);
        return;
      }
      const detected = detectBrowserLang();
      if (detected) setLangState(detected);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("kiqa_lang", l); } catch {}
  };

  return (
    <I18nContext.Provider value={{ t: merged[lang], lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLanguage() {
  return useContext(I18nContext);
}
