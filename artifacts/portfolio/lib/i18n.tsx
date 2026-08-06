'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "it" | "sq" | "de";

export const translations = {
  en: {
    nav: { home: "Home", services: "Services", portfolio: "Work", blog: "Writing", about: "About", contact: "Contact", quote: "Start a Project" },
    hero: {
      badge: "Available for new projects · Kosovo / Italy",
      h1Line1: "Apps and websites,",
      h1Line2: "live in weeks.",
      h1Line3: "Fixed price,",
      h1Line4: "agreed upfront.",
      sub: "I'm Kristian, a freelance developer working between Kosovo and Italy. I build mobile apps, landing pages, and web platforms for founders and small businesses. You get one point of contact and a delivery date in writing.",
      cta1: "Tell me about your project",
      cta2: "See my work",
      available: "Taking on new projects from August 2026"
    },
    services: {
      label: "Services",
      title: "What I build, and what it costs",
      sub: "Every project is quoted upfront with a delivery date. If the scope changes mid-build, I tell you what it costs before I do the work.",
      getProposal: "Get a proposal for this service",
      ctaTitle: "Not sure which one fits?",
      ctaSub: "Tell me about your project and I'll recommend the right scope and price.",
      items: [
        {
          name: "Mobile App",
          tagline: "From first screen to both app stores in 6 weeks.",
          price: "From €799",
          timeline: "6 weeks",
          desc: "Design, build, and store submission handled end to end. One fixed price and one point of contact for the whole six weeks.",
          features: ["React Native", "iOS & Android", "Supabase", "App Store & Play Store submission", "Push notifications", "30-day support after launch"]
        },
        {
          name: "Landing Page",
          tagline: "One page built to turn visitors into enquiries. Live in 7 days.",
          price: "From €299",
          timeline: "7 days",
          desc: "A fast single page with your copy, your brand, and a working contact form. Delivered in 7 days on your own domain.",
          features: ["Next.js", "3D visuals & animations", "Optimised for search engines", "Fast load on all devices", "Vercel + Cloudflare", "Ready for a content system"]
        },
        {
          name: "Web Platform",
          tagline: "Accounts, payments, and dashboards. Live in 3 weeks.",
          price: "From €1,299",
          timeline: "3 weeks",
          desc: "User accounts, billing, an admin dashboard, and a database that holds up under real traffic. Deployed and handed over at the end of week three.",
          features: ["Next.js", "Supabase / PostgreSQL", "User accounts & login", "Admin dashboard", "Live data updates", "Deployment included"]
        },
        {
          name: "Custom Backend",
          tagline: "An API and database for a product you already have. 2 weeks.",
          price: "From €499",
          timeline: "2 weeks",
          desc: "A documented API, a Postgres database, and authentication, ready for your existing frontend to plug into. You get the repository and the deployment access.",
          features: ["Node.js", "PostgreSQL", "Login & user management", "File storage", "Live data sync", "Full documentation"]
        }
      ]
    },
    work: {
      label: "Selected Work",
      title: "Recent projects",
      projects: [
        {
          name: "Torre Group",
          type: "Web",
          status: "Live",
          year: "2024",
          desc: "Engineered the 2026 platform redesign for Torre Group, creating a unified corporate digital presence and an upgraded layout for Torre Home to streamline client engagement and property showcases.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"]
        },
        {
          name: "Spindare",
          type: "Mobile",
          status: "In Development",
          year: "2025–2026",
          desc: "Co-founding and leading product development for Spindare, a native iOS social app built entirely in Swift and SwiftUI. iOS launch planned for September 2026.",
          stack: ["Swift", "SwiftUI", "iOS", "Supabase", "Clerk"]
        },
        {
          name: "TravelMe",
          type: "Mobile",
          status: "Coming Soon",
          year: "2026",
          desc: "An app that turns a single message into a full trip itinerary. Currently in development.",
          stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"]
        },
        {
          name: "Onyx Freight Co.",
          type: "FiveM Server",
          status: "Live",
          year: "2026",
          desc: "Realistic, high-performance FiveM server based on Qbox with an ETS2-style trucking system and a 30+ job economy.",
          stack: ["Qbox", "Lua", "MariaDB", "oxmysql"]
        }
      ]
    },
    process: {
      label: "How it works",
      title: "How a project runs",
      steps: [
        { n: "01", title: "We talk", desc: "A 30-minute call about what you need and when you need it. No commitment." },
        { n: "02", title: "You get a proposal", desc: "A written scope with a price and a delivery date, in your inbox within 24 hours." },
        { n: "03", title: "I build it", desc: "You get progress updates and working previews as I go, and you can reach me directly the whole time." },
        { n: "04", title: "You go live", desc: "I hand over the code, the accounts, and the documentation, plus 30 days of support." }
      ]
    },
    funnel: {
      label: "Start a Project",
      title: "Tell me about your project",
      sub: "Fill in the form below and I'll come back to you with a clear plan within 24 hours.",
      cta: "Start the conversation",
      fields: {
        name: "Your name", namePh: "Your full name",
        email: "Business email", emailPh: "you@company.com",
        company: "Company or project name", companyPh: "Acme Ltd or your project name",
        service: "What do you need?",
        serviceOptions: ["Mobile App", "Landing Page", "Web Platform", "Custom Backend", "Not sure yet"],
        budget: "Budget",
        budgetOptions: ["Under €500", "€500 – €1,500", "€1,500 – €3,000", "€3,000+", "Not sure yet"],
        timeline: "When do you need it?",
        timelineOptions: ["As soon as possible", "Within a month", "2–3 months", "No rush"],
        description: "Tell me about the project",
        descriptionPh: "What are you building, who is it for, and what does success look like for you?",
        submit: "Send my project brief",
        submitting: "Sending..."
      },
      success: { title: "Got it. I'll be in touch.", sub: "I'll review your brief and send you a clear proposal within 24 hours." }
    },
    about: {
      label: "About",
      title: "Kristian Gjergji",
      sub: "Developer · Builder · Founder",
      bio: [
        "I'm a self-employed developer based between Kosovo and Italy. I build mobile apps, websites, and web platforms for startups and business owners.",
        "Right now I'm co-leading product development on Spindare, a social app with hundreds of screens and an iOS launch planned for September 2026.",
        "Through KIQA DEV I work directly with founders and business owners, handling the whole build from first design to launch, so they don't have to coordinate several agencies or freelancers."
      ],
      skills: [
        { name: "Mobile", items: ["Swift", "SwiftUI", "iOS", "Xcode", "App Store Deployment"] },
        { name: "Client Mobile Services", items: ["React Native", "Expo", "EAS Build", "iOS / Android"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Data", items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Real-time sync"] },
        { name: "Tools", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Now", role: "Co-Founder & Lead Developer, Spindare", desc: "Co-leading the product build for a social rewards app: hundreds of screens, a shared design system, and an iOS launch set for September 2026." },
        { year: "2024–Now", role: "Founder, KIQA DEV", desc: "Running my own development practice, working directly with startups and business owners across Italy and Kosovo." },
        { year: "2022–Now", role: "Self-Taught Developer", desc: "Started from zero in 2022 and spent the years since building products that shipped." }
      ],
      values: [
        { title: "I build, not just plan", desc: "I'd rather put something working in front of you in two weeks than spend months planning the perfect version." },
        { title: "I commit to a date", desc: "The delivery date goes in the proposal before you pay anything. If something is going to slip, you hear it from me early, not on the deadline." },
        { title: "I keep it simple", desc: "Clean solutions beat clever ones. I build things that are easy to understand, maintain, and grow." },
        { title: "I see it through", desc: "Once I take on a project I stay on it through launch, and you always know where it stands." }
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
      sub: "Notes from projects I've worked on: what went wrong, what worked, and what I'd do differently.",
      readMore: "Read post",
      minRead: "min read",
      noPosts: "No posts in this category yet.",
      latestNotes: "Latest notes",
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
        { slug: "auth-flow-48-hours", category: "Architecture", title: "Why I rebuilt Spindare's login system in 48 hours", excerpt: "The old setup worked fine until it didn't. An honest account of the decision, the rebuild, and what I'd do differently.", date: "Mar 14, 2026", read: 9 },
        { slug: "supabase-vs-firebase", category: "Backend", title: "Supabase vs Firebase for a social feed: what I found after testing both properly", excerpt: "I needed live updates for a large number of users at the same time. Both tools promised it. Only one delivered.", date: "Feb 22, 2026", read: 11 },
        { slug: "react-native-design-system", category: "Design", title: "How we built a design system for a mobile app with hundreds of screens", excerpt: "When your app has hundreds of components and a small team, having a shared set of rules isn't optional. This is how we did it.", date: "Feb 8, 2026", read: 8 },
        { slug: "travelme-ai-weekend", category: "AI", title: "How I built TravelMe's AI trip planner in a weekend", excerpt: "One message, a full itinerary. I had a weekend and an OpenAI API key. This is what I built, what surprised me, and what didn't work.", date: "Jun 12, 2026", read: 6 },
        { slug: "travelme-openai-vs-gemini", category: "AI", title: "Why I chose OpenAI over Gemini for TravelMe's recommendations engine", excerpt: "I tested both models for two weeks. The answer wasn't about price. It came down to what happens when you tell the model someone has a dietary restriction.", date: "Jun 20, 2026", read: 8 },
        { slug: "travelme-when-ai-is-wrong", category: "AI", title: "The hardest part of building an AI travel app: when the AI is confident and wrong", excerpt: "A restaurant that closed two years ago. Visa requirements that are out of date. The AI says it with full confidence. Here's how I'm handling it.", date: "Jun 25, 2026", read: 7 }
      ]
    },
    contact: {
      label: "Contact",
      title: "Get in touch",
      sub: "Tell me about your project and I'll get back to you within 24 hours.",
      detailsTitle: "Contact details",
      bookTitle: "Prefer to book directly?",
      bookDesc: "Discord is the fastest way to reach me.",
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
        greeting: "Hi, I'm the KIQA intake assistant. Three quick questions and I'll pass this straight to Kristian.",
        qService: "What kind of work do you need?",
        qTimeline: "What's your timeline?",
        qDescription: "Tell me a bit about the project.",
        descriptionPh: "What are you building, and what does a good result look like?",
        qName: "Great. What's your name?",
        namePh: "Your full name",
        qMethod: "Last thing. How should Kristian reach you?",
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
    footer: { tagline: "Fixed prices and fixed delivery dates.", legal: "© 2026 KIQA DEV. All rights reserved." },
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
      ctaSub: "Tell me what you need and I'll send you a scope and a price.",
      ctaButton: "Start a project"
    }
  },
  it: {
    nav: { home: "Home", services: "Servizi", portfolio: "Lavori", blog: "Articoli", about: "Chi sono", contact: "Contatti", quote: "Inizia un progetto" },
    hero: { badge: "Disponibile per nuovi progetti · Kosovo / Italia", h1Line1: "App e siti web,", h1Line2: "online in poche settimane.", h1Line3: "Prezzo fisso,", h1Line4: "concordato in anticipo.", sub: "Sono Kristian, sviluppatore freelance tra Kosovo e Italia. Creo app mobile, landing page e piattaforme web per fondatori e piccole imprese. Hai un unico referente e una data di consegna messa per iscritto.", cta1: "Parlami del tuo progetto", cta2: "Guarda i miei lavori", available: "Disponibile per nuovi progetti da agosto 2026" },
    services: {
      label: "Servizi", title: "Cosa costruisco e quanto costa", sub: "Ogni progetto viene preventivato in anticipo con una data di consegna. Se durante il lavoro cambia lo scopo, ti dico quanto costa prima di procedere.",
      getProposal: "Richiedi un preventivo per questo servizio",
      ctaTitle: "Non sai quale scegliere?",
      ctaSub: "Raccontami il tuo progetto e ti consiglio l'ambito e il prezzo giusti.",
      items: [
        { name: "App Mobile", tagline: "Dalla prima schermata a entrambi gli store in 6 settimane.", price: "Da €799", timeline: "6 settimane", desc: "Design, sviluppo e pubblicazione gestiti dall'inizio alla fine. Un prezzo fisso e un unico referente per tutte e sei le settimane.", features: ["React Native", "iOS & Android", "Supabase", "Pubblicazione App Store & Play Store", "Notifiche push", "30 giorni di supporto post-lancio"] },
        { name: "Landing Page", tagline: "Una pagina costruita per trasformare le visite in richieste. Online in 7 giorni.", price: "Da €299", timeline: "7 giorni", desc: "Una pagina singola e veloce con i tuoi testi, il tuo brand e un modulo di contatto funzionante. Consegnata in 7 giorni sul tuo dominio.", features: ["Next.js", "Grafica 3D & animazioni", "Ottimizzata per i motori di ricerca", "Veloce su ogni dispositivo", "Vercel + Cloudflare", "Pronta per un CMS"] },
        { name: "Piattaforma Web", tagline: "Account, pagamenti e dashboard. Online in 3 settimane.", price: "Da €1.299", timeline: "3 settimane", desc: "Account utenti, fatturazione, un pannello di amministrazione e un database che regge traffico reale. Pubblicato e consegnato alla fine della terza settimana.", features: ["Next.js", "Supabase / PostgreSQL", "Account utenti & login", "Dashboard admin", "Aggiornamenti in tempo reale", "Deploy incluso"] },
        { name: "Backend Personalizzato", tagline: "Un'API e un database per un prodotto che hai già. 2 settimane.", price: "Da €499", timeline: "2 settimane", desc: "Un'API documentata, un database Postgres e l'autenticazione, pronti per il tuo frontend esistente. Ricevi il repository e gli accessi al deploy.", features: ["Node.js", "PostgreSQL", "Gestione accessi", "Archiviazione file", "Sincronizzazione dati live", "Documentazione completa"] }
      ]
    },
    work: {
      label: "Lavori Selezionati",
      title: "Progetti recenti",
      projects: [
        {
          name: "Torre Group",
          type: "Web",
          status: "Live",
          year: "2024",
          desc: "Ho progettato il redesign 2026 della piattaforma di Torre Group, creando una presenza digitale aziendale unificata e un layout aggiornato per Torre Home per semplificare il coinvolgimento dei clienti e la presentazione degli immobili.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"]
        },
        {
          name: "Spindare",
          type: "Mobile",
          status: "In Sviluppo",
          year: "2025–2026",
          desc: "Co-fondatore e responsabile dello sviluppo prodotto per Spindare, un'app social nativa iOS costruita interamente in Swift e SwiftUI. Lancio iOS previsto per settembre 2026.",
          stack: ["Swift", "SwiftUI", "iOS", "Supabase", "Clerk"]
        },
        {
          name: "TravelMe",
          type: "Mobile",
          status: "In Arrivo",
          year: "2026",
          desc: "Un'app che trasforma un singolo messaggio in un itinerario di viaggio completo. Attualmente in sviluppo.",
          stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"]
        },
        {
          name: "Onyx Freight Co.",
          type: "FiveM Server",
          status: "Live",
          year: "2026",
          desc: "Server FiveM realistico e ad alte prestazioni basato su Qbox, con un sistema di autotrasporto in stile ETS2 e un'economia di oltre 30 lavori.",
          stack: ["Qbox", "Lua", "MariaDB", "oxmysql"]
        }
      ]
    },
    process: {
      label: "Come funziona",
      title: "Come si svolge un progetto",
      steps: [
        { n: "01", title: "Parliamo", desc: "Una chiamata di 30 minuti su cosa ti serve e quando ne hai bisogno. Senza impegno." },
        { n: "02", title: "Ricevi una proposta", desc: "Uno scopo scritto con prezzo e data di consegna, nella tua inbox entro 24 ore." },
        { n: "03", title: "Lo costruisco", desc: "Ricevi aggiornamenti e anteprime funzionanti mentre procedo, e puoi contattarmi direttamente per tutta la durata." },
        { n: "04", title: "Vai live", desc: "Ti consegno il codice, gli account e la documentazione, più 30 giorni di supporto." }
      ]
    },
    funnel: { label: "Inizia un Progetto", title: "Parlami del tuo progetto", sub: "Compila il modulo e ti rispondo con un piano chiaro entro 24 ore.", cta: "Inizia la conversazione", fields: { name: "Il tuo nome", namePh: "Nome completo", email: "Email aziendale", emailPh: "tu@azienda.com", company: "Azienda o nome del progetto", companyPh: "Acme Srl o nome del progetto", service: "Cosa ti serve?", serviceOptions: ["App Mobile", "Landing Page", "Piattaforma Web", "Backend Personalizzato", "Non sono sicuro"], budget: "Budget", budgetOptions: ["Meno di €500", "€500 – €1.500", "€1.500 – €3.000", "€3.000+", "Non sono sicuro"], timeline: "Quando ne hai bisogno?", timelineOptions: ["Il prima possibile", "Entro un mese", "2–3 mesi", "Nessuna fretta"], description: "Descrivimi il progetto", descriptionPh: "Cosa stai costruendo, per chi è, e come si presenta un buon risultato per te?", submit: "Invia il mio brief", submitting: "Invio in corso..." }, success: { title: "Ricevuto. Ti rispondo presto.", sub: "Esaminerò il tuo brief e ti invierò una proposta chiara entro 24 ore." } },
    about: {
      label: "Chi sono",
      title: "Kristian Gjergji",
      sub: "Sviluppatore · Builder · Fondatore",
      bio: [
        "Sono uno sviluppatore freelance con base tra il Kosovo e l'Italia. Creo app mobile, siti web e piattaforme web per startup e imprenditori.",
        "In questo momento sto co-guidando lo sviluppo di Spindare, un'app social con centinaia di schermate e un lancio su iOS previsto per settembre 2026.",
        "Attraverso KIQA DEV lavoro direttamente con fondatori e imprenditori, gestendo l'intera realizzazione dal primo design alla messa online, così non devono coordinare più agenzie o freelancer."
      ],
      skills: [
        { name: "Mobile", items: ["Swift", "SwiftUI", "iOS", "Xcode", "App Store Deployment"] },
        { name: "Servizi Mobile per Clienti", items: ["React Native", "Expo", "EAS Build", "iOS / Android"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Dati", items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Sincronizzazione real-time"] },
        { name: "Strumenti", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Oggi", role: "Co-Fondatore & Lead Developer, Spindare", desc: "Co-guida dello sviluppo prodotto per un'app social di ricompense: centinaia di schermate, un design system condiviso e lancio iOS previsto a settembre 2026." },
        { year: "2024–Oggi", role: "Fondatore, KIQA DEV", desc: "Gestisco la mia attività di sviluppo, lavorando direttamente con startup e imprenditori in Italia e Kosovo." },
        { year: "2022–Oggi", role: "Sviluppatore Autodidatta", desc: "Partito da zero nel 2022 e da allora dedicato a costruire prodotti che sono stati pubblicati." }
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
      sub: "Appunti da progetti su cui ho lavorato: cosa è andato storto, cosa ha funzionato e cosa farei diversamente.",
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
        { slug: "auth-flow-48-hours", category: "Architecture", title: "Perché ho ricostruito il sistema di login di Spindare in 48 ore", excerpt: "Il vecchio sistema funzionava bene, finché non ha smesso. Un resoconto onesto della decisione, della ricostruzione e di cosa farei diversamente.", date: "14 Mar 2026", read: 9 },
        { slug: "supabase-vs-firebase", category: "Backend", title: "Supabase vs Firebase per un feed social: cosa ho scoperto testandoli entrambi seriamente", excerpt: "Avevo bisogno di aggiornamenti in tempo reale per molti utenti contemporaneamente. Entrambi lo promettevano. Solo uno ha mantenuto.", date: "22 Feb 2026", read: 11 },
        { slug: "react-native-design-system", category: "Design", title: "Come abbiamo costruito un design system per un'app mobile con centinaia di schermate", excerpt: "Quando la tua app ha centinaia di componenti e un piccolo team, avere un set condiviso di regole non è facoltativo. Ecco come abbiamo fatto.", date: "8 Feb 2026", read: 8 },
        { slug: "travelme-ai-weekend", category: "AI", title: "Come ho costruito il pianificatore di viaggi AI di TravelMe in un weekend", excerpt: "Un messaggio, un itinerario completo. Avevo un weekend e una chiave API OpenAI. Ecco cosa ho costruito, cosa mi ha sorpreso e cosa non ha funzionato.", date: "12 Giu 2026", read: 6 },
        { slug: "travelme-openai-vs-gemini", category: "AI", title: "Perché ho scelto OpenAI al posto di Gemini per il motore di raccomandazioni di TravelMe", excerpt: "Ho testato entrambi i modelli per due settimane. La risposta non riguardava il prezzo, ma cosa succede quando dici al modello di una restrizione alimentare.", date: "20 Giu 2026", read: 8 },
        { slug: "travelme-when-ai-is-wrong", category: "AI", title: "La parte più difficile di un'app di viaggi AI: quando l'AI è sicura e sbaglia", excerpt: "Un ristorante chiuso da due anni. Requisiti per il visto non aggiornati. L'AI lo dice con piena sicurezza. Ecco come lo sto gestendo.", date: "25 Giu 2026", read: 7 }
      ]
    },
    contact: { label: "Contatti", title: "Scrivimi", sub: "Parlami del tuo progetto e ti rispondo entro 24 ore.",
      detailsTitle: "Dettagli di contatto",
      bookTitle: "Preferisci prenotare direttamente?",
      bookDesc: "Per un contatto immediato, Discord è il canale più veloce.",
      form: { name: "Il tuo nome", namePh: "Nome completo", email: "Email", emailPh: "tu@esempio.com", subject: "Oggetto", subjectPh: "Richiesta progetto", message: "Messaggio", messagePh: "Raccontami del tuo progetto...", send: "Invia messaggio", sending: "Invio in corso...", sent: "Messaggio inviato.", sentSub: "Ti rispondo entro 24 ore.", another: "Invia un altro messaggio" },
      chat: { intro: "Modulo rapido", greeting: "Ciao, sono l'assistente di raccolta di KIQA. Tre domande veloci e passo tutto a Kristian.", qService: "Di cosa hai bisogno?", qTimeline: "Quando ne hai bisogno?", qDescription: "Raccontami un po' del progetto.", descriptionPh: "Cosa stai costruendo e come si presenta un buon risultato?", qName: "Perfetto. Come ti chiami?", namePh: "Nome completo", qMethod: "Ultima cosa. Come deve contattarti Kristian?", methodEmail: "Email", methodPhone: "Telefono", emailPh: "tu@esempio.com", phonePh: "+39 3XX XXX XXXX", submit: "Invia a Kristian", sending: "Invio in corso...", typing: "sta scrivendo", summaryIntro: "Ecco cosa ho raccolto:", restart: "Ricomincia", switchMethod: "Passa a",
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
    hero: { badge: "I disponueshëm për projekte të reja · Kosovë / Itali", h1Line1: "Aplikacione dhe faqe web,", h1Line2: "online për shumë pak javë.", h1Line3: "Çmim i saktë,", h1Line4: "rënë dakord nga fillimi.", sub: "Jam Kristiani, zhvillues i pavarur mes Kosovës dhe Italisë. Ndërtoj aplikacione mobile, landing page dhe platforma web për themelues dhe biznese të vogla. Ke një pikë të vetme kontakti dhe një datë dorëzimi me shkrim.", cta1: "Tregomë për projektin tënd", cta2: "Shiko punët e mia", available: "Duke pranuar projekte të reja nga gushti 2026" },
    services: {
      label: "Shërbimet",
      title: "Çfarë ndërtoj dhe sa kushton",
      sub: "Çdo projekt kuotohet që në fillim me një datë dorëzimi. Nëse qëllimi ndryshon gjatë punës, të them sa kushton para se ta bëj.",
      getProposal: "Merr një ofertë për këtë shërbim",
      ctaTitle: "Nuk je i sigurt cilin të zgjedhësh?",
      ctaSub: "Më trego për projektin tënd dhe do të të rekomandoj fushëveprimin dhe çmimin e duhur.",
      items: [
        { name: "Aplikacion Mobil", tagline: "Nga ekrani i parë te të dy dyqanet për 6 javë.", price: "Nga €799", timeline: "6 javë", desc: "Dizajni, zhvillimi dhe dorëzimi në dyqane, të trajtuara nga fillimi në fund. Një çmim fiks dhe një pikë kontakti për të gjashtë javët.", features: ["React Native", "iOS & Android", "Supabase", "Dorëzim në App Store & Play Store", "Njoftime push", "30 ditë mbështetje pas lansimit"] },
        { name: "Landing Page", tagline: "Një faqe e ndërtuar për të kthyer vizitat në kërkesa. Online për 7 ditë.", price: "Nga €299", timeline: "7 ditë", desc: "Një faqe e vetme dhe e shpejtë me tekstet e tua, markën tënde dhe një formular kontakti funksional. Dorëzuar për 7 ditë në domenin tënd.", features: ["Next.js", "Vizualizime 3D & animacione", "Optimizuar për motorët e kërkimit", "E shpejtë në çdo pajisje", "Vercel + Cloudflare", "E gatshme për CMS"] },
        { name: "Platformë Web", tagline: "Llogari, pagesa dhe panele. Online për 3 javë.", price: "Nga €1,299", timeline: "3 javë", desc: "Llogari përdoruesish, faturim, një panel administrimi dhe një bazë të dhënash që mban trafik real. E publikuar dhe e dorëzuar në fund të javës së tretë.", features: ["Next.js", "Supabase / PostgreSQL", "Llogari përdoruesish & login", "Panel administratori", "Përditësime në kohë reale", "Publikim i përfshirë"] },
        { name: "Backend i Personalizuar", tagline: "Një API dhe bazë të dhënash për një produkt që e ke tashmë. 2 javë.", price: "Nga €499", timeline: "2 javë", desc: "Një API e dokumentuar, një bazë të dhënash Postgres dhe autentikimi, gati për frontend-in tënd ekzistues. Merr repozitorin dhe aksesin e publikimit.", features: ["Node.js", "PostgreSQL", "Login & menaxhim përdoruesish", "Ruajtje skedarësh", "Sinkronizim të dhënash live", "Dokumentacion i plotë"] }
      ]
    },
    work: {
      label: "Punë të Zgjedhura",
      title: "Projekte të fundit",
      projects: [
        {
          name: "Torre Group",
          type: "Web",
          status: "Live",
          year: "2024",
          desc: "Projektova ridizajnimin 2026 të platformës për Torre Group, duke krijuar një prani të unifikuar dixhitale korporative dhe një dizajn të përmirësuar për Torre Home për të thjeshtuar angazhimin e klientëve dhe prezantimin e pronave.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"]
        },
        {
          name: "Spindare",
          type: "Mobile",
          status: "Në Zhvillim",
          year: "2025–2026",
          desc: "Bashkë-themelues dhe udhëheqës i zhvillimit të produktit për Spindare, një aplikacion social nativ për iOS i ndërtuar tërësisht në Swift dhe SwiftUI. Lansimi në iOS parashikohet për shtator 2026.",
          stack: ["Swift", "SwiftUI", "iOS", "Supabase", "Clerk"]
        },
        {
          name: "TravelMe",
          type: "Mobile",
          status: "Së Shpejti",
          year: "2026",
          desc: "Një aplikacion që e kthen një mesazh të vetëm në një itinerar të plotë udhëtimi. Aktualisht në zhvillim.",
          stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"]
        },
        {
          name: "Onyx Freight Co.",
          type: "FiveM Server",
          status: "Live",
          year: "2026",
          desc: "Server FiveM realist me performancë të lartë, i bazuar në Qbox me një sistem transporti si ETS2 dhe një ekonomi me mbi 30 punë.",
          stack: ["Qbox", "Lua", "MariaDB", "oxmysql"]
        }
      ]
    },
    process: {
      label: "Si funksionon",
      title: "Si zhvillohet një projekt",
      steps: [
        { n: "01", title: "Flasim", desc: "Një telefonatë 30-minutëshe për çfarë të nevojitet dhe kur e ke nevojë. Pa asnjë detyrim." },
        { n: "02", title: "Merr një propozim", desc: "Një qëllim i shkruar me çmim dhe datë dorëzimi, në inbox-in tënd brenda 24 orëve." },
        { n: "03", title: "E ndërtoj", desc: "Merr përditësime dhe pamje funksionale ndërsa punoj, dhe mund të më kontaktosh drejtpërdrejt gjatë gjithë kohës." },
        { n: "04", title: "Shkon live", desc: "Të dorëzoj kodin, llogaritë dhe dokumentacionin, plus 30 ditë mbështetje." }
      ]
    },
    funnel: { label: "Fillo një Projekt", title: "Tregomë për projektin tënd", sub: "Plotëso formularin dhe do të të kthehem me një plan të qartë brenda 24 orëve.", cta: "Fillo bisedën", fields: { name: "Emri yt", namePh: "Emri i plotë", email: "Email biznesi", emailPh: "ti@kompania.com", company: "Kompania ose emri i projektit", companyPh: "Emri i kompanisë", service: "Çfarë ke nevojë?", serviceOptions: ["Aplikacion Mobil", "Landing Page", "Platformë Web", "Backend i Personalizuar", "Nuk jam i sigurt"], budget: "Buxheti", budgetOptions: ["Nën €500", "€500 – €1,500", "€1,500 – €3,000", "€3,000+", "Nuk jam i sigurt"], timeline: "Kur ke nevojë?", timelineOptions: ["Sa më shpejt", "Brenda një muaji", "2–3 muaj", "Pa ngutje"], description: "Tregomë për projektin", descriptionPh: "Çfarë po ndërton dhe për kend është?", submit: "Dërgo brifin tim", submitting: "Duke dërguar..." }, success: { title: "E mora. Do të kontaktoj shpejt.", sub: "Do ta shqyrtoj brifin tënd brenda 24 orëve." } },
    about: {
      label: "Rreth meje",
      title: "Kristian Gjergji",
      sub: "Zhvillues · Ndërtues · Themelues",
      bio: [
        "Jam një zhvillues i pavarur me bazë mes Kosovës dhe Italisë. Ndërtoj aplikacione mobile, faqe web dhe platforma web për startup-e dhe pronarë biznesi.",
        "Tani jam duke bashkë-udhëhequr zhvillimin e produktit në Spindare, një aplikacion social me qindra ekrane dhe lansim në iOS të planifikuar për shtator 2026.",
        "Përmes KIQA DEV punoj drejtpërdrejt me themelues dhe pronarë biznesi, duke trajtuar të gjithë ndërtimin nga dizajni i parë deri te publikimi, kështu që nuk u duhet të koordinojnë disa agjenci apo freelancer-ë."
      ],
      skills: [
        { name: "Mobile", items: ["Swift", "SwiftUI", "iOS", "Xcode", "App Store Deployment"] },
        { name: "Shërbime Mobile për Klientë", items: ["React Native", "Expo", "EAS Build", "iOS / Android"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Të dhëna", items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Sinkronizim real-time"] },
        { name: "Mjete", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Tani", role: "Bashkë-themelues & Zhvillues kryesor, Spindare", desc: "Bashkëdrejtim i ndërtimit të produktit për një aplikacion social shpërblimesh: qindra ekrane, një design system i përbashkët dhe lansim në iOS në shtator 2026." },
        { year: "2024–Tani", role: "Themelues, KIQA DEV", desc: "Drejtoj praktikën time të zhvillimit, duke punuar drejtpërdrejt me startup-e dhe pronarë biznesi në Itali dhe Kosovë." },
        { year: "2022–Tani", role: "Zhvillues Vetë-mësuar", desc: "Fillova nga zeroja në 2022 dhe që atëherë kam ndërtuar produkte që janë publikuar." }
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
      sub: "Shënime nga projekte ku kam punuar: çfarë shkoi keq, çfarë funksionoi dhe çfarë do të bëja ndryshe.",
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
        { slug: "auth-flow-48-hours", category: "Architecture", title: "Pse e rindërtova sistemin e login-it të Spindare-s brenda 48 orësh", excerpt: "Sistemi i vjetër funksiononte mirë derisa nuk funksionoi më. Një rrëfim i sinqertë i vendimit, rindërtimit dhe çfarë do të bëja ndryshe.", date: "14 Mar 2026", read: 9 },
        { slug: "supabase-vs-firebase", category: "Backend", title: "Supabase kundrejt Firebase për një feed social: çfarë zbulova pasi i testova të dy seriozisht", excerpt: "Kisha nevojë për përditësime në kohë reale për shumë përdorues njëkohësisht. Të dy e premtuan. Vetëm njëri e mbajti.", date: "22 Shk 2026", read: 11 },
        { slug: "react-native-design-system", category: "Design", title: "Si ndërtuam një design system për një aplikacion mobil me qindra ekrane", excerpt: "Kur aplikacioni yt ka qindra komponentë dhe një ekip të vogël, të kesh një set rregullash të përbashkëta nuk është opsionale. Kështu e bëmë.", date: "8 Shk 2026", read: 8 },
        { slug: "travelme-ai-weekend", category: "AI", title: "Si e ndërtova planifikuesin e udhëtimeve AI të TravelMe brenda një fundjave", excerpt: "Një mesazh, një itinerar i plotë. Kisha një fundjave dhe një çelës API OpenAI. Ja çfarë ndërtova, çfarë më befasoi dhe çfarë nuk funksionoi.", date: "12 Qer 2026", read: 6 },
        { slug: "travelme-openai-vs-gemini", category: "AI", title: "Pse zgjodha OpenAI në vend të Gemini për motorin e rekomandimeve të TravelMe", excerpt: "I testova të dy modelet për dy javë. Përgjigjja nuk kishte të bënte me çmimin, por me çfarë ndodh kur i thua modelit për një kufizim ushqimor.", date: "20 Qer 2026", read: 8 },
        { slug: "travelme-when-ai-is-wrong", category: "AI", title: "Pjesa më e vështirë e ndërtimit të një app udhëtimesh AI: kur AI-ja është e sigurt dhe gabon", excerpt: "Një restorant i mbyllur dy vite më parë. Kërkesat për vizë që janë të vjetruara. AI-ja e thotë me besim të plotë. Ja si po e trajtoj.", date: "25 Qer 2026", read: 7 }
      ]
    },
    contact: { label: "Kontakti", title: "Kontaktomë", sub: "Tregomë për projektin tënd dhe do të kthehem brenda 24 orëve.",
      detailsTitle: "Detajet e kontaktit",
      bookTitle: "Preferon të rezervosh direkt?",
      bookDesc: "Për kontakt të menjëhershëm, Discord është kanali më i shpejtë.",
      form: { name: "Emri yt", namePh: "Emri i plotë", email: "Adresa email", emailPh: "ti@shembull.com", subject: "Subjekti", subjectPh: "Kërkesë projekti", message: "Mesazhi", messagePh: "Tregomë për projektin tënd...", send: "Dërgo mesazhin", sending: "Duke dërguar...", sent: "Mesazhi u dërgua.", sentSub: "Do të kthehem brenda 24 orëve.", another: "Dërgo një mesazh tjetër" },
      chat: { intro: "Formular i shpejtë", greeting: "Përshëndetje, jam asistenti i pritjes së KIQA. Tri pyetje të shpejta dhe ia dërgoj Kristianit.", qService: "Çfarë pune ke nevojë?", qTimeline: "Kur ke nevojë?", qDescription: "Më trego pak për projektin.", descriptionPh: "Çfarë po ndërton dhe si duket një rezultat i mirë?", qName: "Bukur. Si e ke emrin?", namePh: "Emri i plotë", qMethod: "Gjë e fundit. Si duhet të të kontaktojë Kristiani?", methodEmail: "Email", methodPhone: "Telefon", emailPh: "ti@shembull.com", phonePh: "+383 4X XXX XXX", submit: "Dërgo te Kristiani", sending: "Duke dërguar...", typing: "duke shkruar", summaryIntro: "Ja çfarë kam mbledhur:", restart: "Fillo nga fillimi", switchMethod: "Kalo te",
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
    hero: { badge: "Verfügbar für neue Projekte · Kosovo / Italien", h1Line1: "Apps und Websites,", h1Line2: "live in wenigen Wochen.", h1Line3: "Festpreis,", h1Line4: "vorab vereinbart.", sub: "Ich bin Kristian, freiberuflicher Entwickler zwischen Kosovo und Italien. Ich baue mobile Apps, Landing Pages und Web-Plattformen für Gründer und kleine Unternehmen. Du hast einen Ansprechpartner und einen schriftlich zugesagten Liefertermin.", cta1: "Erzähl mir von deinem Projekt", cta2: "Meine Projekte ansehen", available: "Neue Projekte ab August 2026" },
    services: {
      label: "Leistungen", title: "Was ich baue und was es kostet", sub: "Jedes Projekt wird vorab mit einem Liefertermin kalkuliert. Ändert sich der Umfang während der Arbeit, sage ich dir vorher, was es kostet.",
      getProposal: "Angebot für diese Leistung anfordern",
      ctaTitle: "Nicht sicher, was passt?",
      ctaSub: "Erzähl mir von deinem Projekt und ich empfehle dir den passenden Umfang und Preis.",
      items: [
        { name: "Mobile App", tagline: "Vom ersten Screen in beide App Stores in 6 Wochen.", price: "Ab €799", timeline: "6 Wochen", desc: "Design, Entwicklung und Store-Einreichung von Anfang bis Ende. Ein Festpreis und ein Ansprechpartner für alle sechs Wochen.", features: ["React Native", "iOS & Android", "Supabase", "App Store & Play Store Einreichung", "Push-Benachrichtigungen", "30 Tage Support nach Launch"] },
        { name: "Landing Page", tagline: "Eine Seite, die Besucher zu Anfragen macht. Live in 7 Tagen.", price: "Ab €299", timeline: "7 Tage", desc: "Eine schnelle Einzelseite mit deinen Texten, deiner Marke und einem funktionierenden Kontaktformular. In 7 Tagen auf deiner eigenen Domain.", features: ["Next.js", "3D-Grafik & Animationen", "Suchmaschinenoptimiert", "Schnell auf allen Geräten", "Vercel + Cloudflare", "CMS-bereit"] },
        { name: "Web-Plattform", tagline: "Konten, Zahlungen und Dashboards. Live in 3 Wochen.", price: "Ab €1.299", timeline: "3 Wochen", desc: "Benutzerkonten, Abrechnung, ein Admin-Dashboard und eine Datenbank, die echtem Traffic standhält. Am Ende der dritten Woche deployt und übergeben.", features: ["Next.js", "Supabase / PostgreSQL", "Benutzerkonten & Login", "Admin-Dashboard", "Echtzeit-Updates", "Deployment inklusive"] },
        { name: "Individuelles Backend", tagline: "Eine API und Datenbank für ein Produkt, das du schon hast. 2 Wochen.", price: "Ab €499", timeline: "2 Wochen", desc: "Eine dokumentierte API, eine Postgres-Datenbank und Authentifizierung, bereit für dein bestehendes Frontend. Du bekommst das Repository und die Deployment-Zugänge.", features: ["Node.js", "PostgreSQL", "Login & Nutzerverwaltung", "Dateispeicherung", "Live-Datensynchronisation", "Vollständige Dokumentation"] }
      ]
    },
    work: {
      label: "Ausgewählte Projekte",
      title: "Aktuelle Projekte",
      projects: [
        {
          name: "Torre Group",
          type: "Web",
          status: "Live",
          year: "2024",
          desc: "Habe das 2026er Plattform-Redesign für Torre Group umgesetzt: ein einheitlicher digitaler Unternehmensauftritt und ein überarbeitetes Layout für Torre Home, um Kundenkontakt und Immobilienpräsentation zu vereinfachen.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"]
        },
        {
          name: "Spindare",
          type: "Mobile",
          status: "In Entwicklung",
          year: "2025–2026",
          desc: "Mitgründer und Produktverantwortlicher für Spindare, eine native iOS-Social-App, vollständig in Swift und SwiftUI gebaut. iOS-Launch geplant für September 2026.",
          stack: ["Swift", "SwiftUI", "iOS", "Supabase", "Clerk"]
        },
        {
          name: "TravelMe",
          type: "Mobile",
          status: "Demnächst",
          year: "2026",
          desc: "Eine App, die aus einer einzigen Nachricht eine vollständige Reiseroute macht. Aktuell in Entwicklung.",
          stack: ["React Native", "OpenAI API", "Node.js", "MongoDB"]
        },
        {
          name: "Onyx Freight Co.",
          type: "FiveM Server",
          status: "Live",
          year: "2026",
          desc: "Realistischer, leistungsstarker FiveM-Server basierend auf Qbox mit einem Lkw-System im ETS2-Stil und einer Wirtschaft mit über 30 Jobs.",
          stack: ["Qbox", "Lua", "MariaDB", "oxmysql"]
        }
      ]
    },
    process: {
      label: "So funktioniert's",
      title: "So läuft ein Projekt ab",
      steps: [
        { n: "01", title: "Wir reden", desc: "Ein 30-minütiges Gespräch darüber, was du brauchst und wann. Unverbindlich." },
        { n: "02", title: "Du bekommst ein Angebot", desc: "Ein schriftlicher Umfang mit Preis und Liefertermin, innerhalb von 24 Stunden in deinem Postfach." },
        { n: "03", title: "Ich baue es", desc: "Du bekommst Fortschritts-Updates und lauffähige Vorschauen, während ich arbeite, und erreichst mich die ganze Zeit direkt." },
        { n: "04", title: "Du gehst live", desc: "Ich übergebe den Code, die Konten und die Dokumentation, plus 30 Tage Support." }
      ]
    },
    funnel: { label: "Projekt starten", title: "Erzähl mir von deinem Projekt", sub: "Füll das Formular aus und ich melde mich innerhalb von 24 Stunden mit einem klaren Plan.", cta: "Gespräch starten", fields: { name: "Dein Name", namePh: "Vollständiger Name", email: "Geschäftliche E-Mail", emailPh: "du@unternehmen.de", company: "Unternehmen oder Projektname", companyPh: "Muster GmbH", service: "Was brauchst du?", serviceOptions: ["Mobile App", "Landing Page", "Web-Plattform", "Individuelles Backend", "Noch unsicher"], budget: "Budget", budgetOptions: ["Unter €500", "€500 – €1.500", "€1.500 – €3.000", "€3.000+", "Noch unsicher"], timeline: "Wann brauchst du es?", timelineOptions: ["So schnell wie möglich", "Innerhalb eines Monats", "2–3 Monate", "Kein Zeitdruck"], description: "Beschreib mir das Projekt", descriptionPh: "Was baust du, für wen ist es und wie sieht Erfolg für dich aus?", submit: "Brief absenden", submitting: "Wird gesendet..." }, success: { title: "Erhalten. Ich melde mich bald.", sub: "Ich werde dein Brief prüfen und dir innerhalb von 24 Stunden einen klaren Vorschlag schicken." } },
    about: {
      label: "Über mich",
      title: "Kristian Gjergji",
      sub: "Entwickler · Builder · Gründer",
      bio: [
        "Ich bin ein selbstständiger Entwickler mit Basis zwischen Kosovo und Italien. Ich baue mobile Apps, Websites und Web-Plattformen für Startups und Unternehmer.",
        "Gerade leite ich gemeinsam die Produktentwicklung bei Spindare, einer Social-App mit hunderten Bildschirmen und einem geplanten iOS-Launch im September 2026.",
        "Über KIQA DEV arbeite ich direkt mit Gründern und Unternehmern und übernehme den gesamten Bau vom ersten Design bis zum Go-Live, damit sie nicht mehrere Agenturen oder Freelancer koordinieren müssen."
      ],
      skills: [
        { name: "Mobile", items: ["Swift", "SwiftUI", "iOS", "Xcode", "App Store Deployment"] },
        { name: "Mobile Kundenprojekte", items: ["React Native", "Expo", "EAS Build", "iOS / Android"] },
        { name: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
        { name: "Backend & Daten", items: ["Supabase", "PostgreSQL", "Node.js", "REST APIs", "Echtzeit-Synchronisation"] },
        { name: "Werkzeuge", items: ["Git", "Vercel", "Cloudflare", "Figma", "Stream Chat"] }
      ],
      experience: [
        { year: "2025–Jetzt", role: "Mitgründer & Lead Developer, Spindare", desc: "Mitleitung des Produktbaus für eine Social-Rewards-App: hunderte Screens, ein gemeinsames Design-System und iOS-Launch im September 2026." },
        { year: "2024–Jetzt", role: "Gründer, KIQA DEV", desc: "Ich führe meine eigene Entwicklungspraxis und arbeite direkt mit Startups und Unternehmern in Italien und im Kosovo." },
        { year: "2022–Jetzt", role: "Autodidaktischer Entwickler", desc: "2022 bei null angefangen und seitdem Produkte gebaut, die auch veröffentlicht wurden." }
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
      sub: "Notizen aus Projekten, an denen ich gearbeitet habe: was schief ging, was funktionierte und was ich anders machen würde.",
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
        { slug: "auth-flow-48-hours", category: "Architecture", title: "Warum ich Spindares Login-System in 48 Stunden neu gebaut habe", excerpt: "Das alte System funktionierte gut, bis es das nicht mehr tat. Ein ehrlicher Bericht über die Entscheidung, den Umbau und was ich anders machen würde.", date: "14. Mär 2026", read: 9 },
        { slug: "supabase-vs-firebase", category: "Backend", title: "Supabase vs Firebase für einen Social Feed: was ich nach ordentlichem Testen beider herausfand", excerpt: "Ich brauchte Live-Updates für eine große Anzahl gleichzeitiger Nutzer. Beide Tools versprachen es. Nur eines hielt das Versprechen.", date: "22. Feb 2026", read: 11 },
        { slug: "react-native-design-system", category: "Design", title: "Wie wir ein Design-System für eine mobile App mit hunderten Bildschirmen gebaut haben", excerpt: "Wenn deine App hunderte Komponenten und ein kleines Team hat, ist ein gemeinsames Regelwerk keine Option. So haben wir es gemacht.", date: "8. Feb 2026", read: 8 },
        { slug: "travelme-ai-weekend", category: "AI", title: "Wie ich TravelMes KI-Reiseplaner an einem Wochenende gebaut habe", excerpt: "Eine Nachricht, ein kompletter Reiseplan. Ich hatte ein Wochenende und einen OpenAI-API-Schlüssel. Das habe ich gebaut, was mich überrascht hat und was nicht funktionierte.", date: "12. Jun 2026", read: 6 },
        { slug: "travelme-openai-vs-gemini", category: "AI", title: "Warum ich OpenAI statt Gemini für TravelMes Empfehlungsmaschine gewählt habe", excerpt: "Ich habe beide Modelle zwei Wochen lang getestet. Die Antwort hatte nichts mit dem Preis zu tun, sondern damit, was passiert, wenn man dem Modell von einer Ernährungseinschränkung erzählt.", date: "20. Jun 2026", read: 8 },
        { slug: "travelme-when-ai-is-wrong", category: "AI", title: "Das Schwierigste beim Bau einer KI-Reise-App: wenn die KI selbstbewusst und falsch ist", excerpt: "Ein Restaurant, das vor zwei Jahren geschlossen hat. Visa-Anforderungen, die veraltet sind. Die KI sagt es mit vollem Selbstvertrauen. So gehe ich damit um.", date: "25. Jun 2026", read: 7 }
      ]
    },
    contact: { label: "Kontakt", title: "Schreib mir", sub: "Erzähl mir von deinem Projekt und ich melde mich innerhalb von 24 Stunden.",
      detailsTitle: "Kontaktdaten",
      bookTitle: "Lieber direkt buchen?",
      bookDesc: "Für sofortige Kontaktaufnahme ist Discord der schnellste Kanal.",
      form: { name: "Dein Name", namePh: "Vollständiger Name", email: "E-Mail-Adresse", emailPh: "du@beispiel.de", subject: "Betreff", subjectPh: "Projektanfrage", message: "Nachricht", messagePh: "Erzähl mir von deinem Projekt...", send: "Nachricht senden", sending: "Wird gesendet...", sent: "Nachricht gesendet.", sentSub: "Ich melde mich innerhalb von 24 Stunden.", another: "Weitere Nachricht senden" },
      chat: { intro: "Kurzer Fragebogen", greeting: "Hallo, ich bin der KIQA-Intake-Assistent. Drei kurze Fragen, dann leite ich alles an Kristian weiter.", qService: "Was für eine Arbeit brauchst du?", qTimeline: "Wie ist dein Zeitrahmen?", qDescription: "Erzähl mir kurz vom Projekt.", descriptionPh: "Was baust du und wie sieht ein gutes Ergebnis aus?", qName: "Schön. Wie heißt du?", namePh: "Vollständiger Name", qMethod: "Letzte Frage. Wie soll Kristian dich erreichen?", methodEmail: "E-Mail", methodPhone: "Telefon", emailPh: "du@beispiel.de", phonePh: "+49 1XX XXXX XXXX", submit: "An Kristian senden", sending: "Wird gesendet...", typing: "schreibt", summaryIntro: "Das habe ich notiert:", restart: "Neu starten", switchMethod: "Wechseln zu",
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

  const finalT = merged[lang];

  return (
    <I18nContext.Provider value={{ t: finalT, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLanguage() {
  return useContext(I18nContext);
}
